import { NextRequest, NextResponse } from "next/server"
import { isValidOrigin } from "@/lib/auth-tokens"

export async function POST(req: NextRequest) {
  // CSRF Protection
  if (!isValidOrigin(req.headers.get("origin"), req.headers.get("host"))) {
    return NextResponse.json({ ok: false, error: "Cross-site request blocked." }, { status: 403 })
  }

  const response = NextResponse.json({ ok: true }, { status: 200 })

  // Expire and clear the session cookie
  response.cookies.set("sbe_admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })

  return response
}

