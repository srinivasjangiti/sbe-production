import { NextRequest, NextResponse } from "next/server"
import {
  timingSafeEqualStr,
  verifyPassword,
  createSessionToken,
  getSessionSecret,
  checkRateLimit,
  recordFailedAttempt,
  clearFailedAttempts,
  isValidOrigin,
} from "@/lib/auth-tokens"

// Helper to extract client IP for rate limiting
function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  return req.headers.get("x-real-ip") || "127.0.0.1"
}

export async function POST(req: NextRequest) {
  // 1. CSRF Protection
  if (!isValidOrigin(req.headers.get("origin"), req.headers.get("host"))) {
    return NextResponse.json({ ok: false, error: "Cross-site request blocked." }, { status: 403 })
  }

  // 2. Rate Limiting / Brute-force throttling
  const ip = getClientIp(req)
  const rateLimit = await checkRateLimit(ip)
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: `Too many failed login attempts. Please wait ${rateLimit.retryAfterSeconds} seconds before trying again.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds ?? 60),
        },
      }
    )
  }

  // 3. Parse Body
  let body: { username?: string; password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request payload." }, { status: 400 })
  }

  const inputUsername = (body.username ?? "admin").trim()
  const inputPassword = body.password ?? ""

  if (!inputPassword) {
    return NextResponse.json({ ok: false, error: "Password is required." }, { status: 400 })
  }

  // 4. Server Credentials Configuration
  const expectedUsername = (process.env.ADMIN_USERNAME || "admin").trim()
  const expectedPasswordHash = process.env.ADMIN_PASSWORD_HASH?.trim()

  if (!expectedPasswordHash) {
    // Failsafe: Server credentials have not been configured
    return NextResponse.json(
      {
        ok: false,
        error: "Server authentication credentials not configured. Please contact the administrator.",
      },
      { status: 500 }
    )
  }

  // 5. Verification (Timing-safe comparison)
  const isUsernameValid = timingSafeEqualStr(inputUsername.toLowerCase(), expectedUsername.toLowerCase())
  const isPasswordValid = await verifyPassword(inputPassword, expectedPasswordHash)

  // Artificial jitter to mitigate timing analysis
  await new Promise((r) => setTimeout(r, 100))

  if (!isUsernameValid || !isPasswordValid) {
    await recordFailedAttempt(ip)
    return NextResponse.json(
      { ok: false, error: "Invalid credentials. Please try again." },
      { status: 401 }
    )
  }

  // 6. Successful Authentication: Reset rate limiter and issue signed session cookie
  await clearFailedAttempts(ip)

  const sessionToken = await createSessionToken(
    expectedUsername,
    getSessionSecret(),
    28800 // 8 hours
  )

  const response = NextResponse.json(
    { ok: true, user: { username: expectedUsername } },
    { status: 200 }
  )

  // Configure strict HttpOnly session cookie
  response.cookies.set("sbe_admin_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 28800, // 8 hours in seconds
  })

  return response
}

