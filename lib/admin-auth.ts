// Client-side authentication helpers for admin interface
// All credential verification and session management is performed securely on the server via /api/admin/*

export interface LoginResult {
  ok: boolean
  error?: string
  user?: { username: string }
}

export async function login(password: string, username = "admin"): Promise<LoginResult> {
  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    const data = await res.json()
    if (res.ok && data.ok) {
      return { ok: true, user: data.user }
    }

    return {
      ok: false,
      error: data.error || "Invalid credentials. Please try again.",
    }
  } catch {
    return {
      ok: false,
      error: "Unable to connect to authentication service. Please check your connection.",
    }
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch("/api/admin/logout", {
      method: "POST",
    })
  } catch {
    // Ignore network failure on logout
  }

  // Clear any legacy client tokens if they exist in browser storage
  if (typeof window !== "undefined") {
    localStorage.removeItem("sbe_admin_auth")
    sessionStorage.removeItem("sbe_admin_auth")
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/session", {
      method: "GET",
      cache: "no-store",
    })
    if (!res.ok) return false
    const data = await res.json()
    return !!data.authenticated
  } catch {
    return false
  }
}
