import { NextRequest, NextResponse } from "next/server"
import { verifySessionToken, getSessionSecret } from "@/lib/auth-tokens"

export async function GET(req: NextRequest) {
  const token = req.cookies.get("sbe_admin_session")?.value

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 200 })
  }

  try {
    const result = await verifySessionToken(token, getSessionSecret())

    if (!result.valid) {
      const res = NextResponse.json({ authenticated: false }, { status: 200 })
      // Clear stale or invalid token cookie
      res.cookies.set("sbe_admin_session", "", { path: "/", maxAge: 0 })
      return res
    }

    return NextResponse.json(
      { authenticated: true, user: { username: result.username } },
      { status: 200 }
    )
  } catch {
    // Fail closed: If secret is invalid or unconfigured, report unauthenticated
    const res = NextResponse.json({ authenticated: false }, { status: 200 })
    res.cookies.set("sbe_admin_session", "", { path: "/", maxAge: 0 })
    return res
  }
}

