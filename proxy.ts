import { NextResponse, type NextRequest } from "next/server"
import { verifySessionToken, getSessionSecret } from "@/lib/auth-tokens"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Handling the Admin Login Page
  if (pathname === "/admin/login") {
    const token = request.cookies.get("sbe_admin_session")?.value
    if (token) {
      const verified = await verifySessionToken(token, getSessionSecret())
      if (verified.valid) {
        // User is already logged in, redirect to admin dashboard
        return NextResponse.redirect(new URL("/admin", request.url))
      }
    }
    return NextResponse.next()
  }

  // 2. Protecting All Other Admin Routes (/admin, /admin/properties, etc.)
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("sbe_admin_session")?.value
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    const verified = await verifySessionToken(token, getSessionSecret())
    if (!verified.valid) {
      const loginUrl = new URL("/admin/login", request.url)
      const response = NextResponse.redirect(loginUrl)
      // Clear invalid/expired cookie
      response.cookies.delete("sbe_admin_session")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

