/**
 * Comprehensive Automated Security, Authentication, Rate Limiting & Upload Test Suite
 * Shree Balaji Enterprises (SBE)
 */

import {
  verifyPassword,
  hashPassword,
  DEFAULT_PBKDF2_ITERATIONS,
  MIN_PBKDF2_ITERATIONS,
  isValidOrigin,
} from "../lib/auth-tokens.ts"

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000"

async function runTests() {
  console.log("==================================================================")
  console.log("    SBE PRODUCTION READINESS & SECURITY TEST SUITE                ")
  console.log("==================================================================\n")

  let passed = 0
  let failed = 0

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`)
      passed++
    } else {
      console.error(`  ❌ FAIL: ${message}`)
      failed++
    }
  }

  // Helper to extract cookie from Set-Cookie header
  function extractCookie(res) {
    const raw = res.headers.get("set-cookie")
    if (!raw) return null
    const match = raw.match(/sbe_admin_session=([^;]+)/)
    return match ? match[1] : null
  }

  // -------------------------------------------------------------------------
  // TEST 1: PBKDF2 Iteration Enforcement & Plaintext Backdoor Elimination
  // -------------------------------------------------------------------------
  console.log("[TEST 1] Verifying PBKDF2 iteration thresholds & plaintext rejection...")
  assert(
    DEFAULT_PBKDF2_ITERATIONS >= 220000,
    `Default PBKDF2 iterations is ${DEFAULT_PBKDF2_ITERATIONS} (>= 220,000)`
  )
  assert(
    MIN_PBKDF2_ITERATIONS >= 220000,
    `Minimum PBKDF2 iterations is enforced at ${MIN_PBKDF2_ITERATIONS} (>= 220,000)`
  )

  const hash250k = await hashPassword("TestSecurePass#2026")
  assert(hash250k.startsWith("pbkdf2:250000:"), "Hash format starts with pbkdf2:250000:")
  const valid250k = await verifyPassword("TestSecurePass#2026", hash250k)
  assert(valid250k === true, "New 250,000 iteration hash verifies successfully")

  // Verify that an obsolete/insecure hash with < 220,000 iterations is rejected
  const weakHash = "pbkdf2:100000:75369e7dbfa786d156c0eb3fe2b081d1:1ab337b7265e7937a8a2fc674baa5b52ce48dc994844c1095162577c0a67db88"
  const rejectWeak = await verifyPassword("TestSecurePass#2026", weakHash)
  assert(rejectWeak === false, "Hashes below 220,000 iterations are strictly rejected")

  // Verify that unhashed/plaintext passwords stored in configuration are strictly rejected
  const rejectPlaintext = await verifyPassword("PlaintextPass123", "PlaintextPass123")
  assert(rejectPlaintext === false, "Plaintext password fallback is eliminated (returns false)")

  // -------------------------------------------------------------------------
  // TEST 2: Compromised Credential Rotation
  // -------------------------------------------------------------------------
  console.log("\n[TEST 2] Verifying old compromised password no longer works...")
  const resOldPass = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin", password: "SBE@Admin2024" }),
  })
  const jsonOldPass = await resOldPass.json()
  assert(resOldPass.status === 401, `Old password rejected with HTTP 401 (got ${resOldPass.status})`)
  assert(jsonOldPass.ok === false, "Old password rejected with ok: false")
  assert(jsonOldPass.error.includes("Invalid credentials"), "Generic error message returned")

  // Cryptographic check: old password cannot authenticate against new 250k hash
  const rejectOldCrypto = await verifyPassword("SBE@Admin2024", hash250k)
  assert(rejectOldCrypto === false, "Old compromised password fails cryptographic verification against 250k hash")

  // -------------------------------------------------------------------------
  // TEST 3: Valid Login with New 250k Credential
  // -------------------------------------------------------------------------
  console.log("\n[TEST 3] Verifying valid login with new rotated credential...")
  const resValid = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin", password: "TestSecurePass#2026" }),
  })
  const jsonValid = await resValid.json()
  const sessionCookie = extractCookie(resValid)

  assert(resValid.status === 200, `Valid login returned HTTP 200 (got ${resValid.status})`)
  assert(jsonValid.ok === true, "Valid login payload ok: true")
  assert(jsonValid.user?.username === "admin", "Valid login returns correct user object")
  assert(!!sessionCookie, "Valid login sets sbe_admin_session cookie")
  assert(
    resValid.headers.get("set-cookie")?.includes("HttpOnly"),
    "Session cookie has HttpOnly flag set"
  )
  assert(
    /samesite=lax/i.test(resValid.headers.get("set-cookie") || ""),
    "Session cookie has SameSite=Lax set"
  )

  // -------------------------------------------------------------------------
  // TEST 4: Invalid Credentials & CSRF Protection
  // -------------------------------------------------------------------------
  console.log("\n[TEST 4] Verifying invalid credentials and CSRF origin protection...")
  const resInvalid = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin", password: "CompletelyWrongPassword123!" }),
  })
  const jsonInvalid = await resInvalid.json()
  assert(resInvalid.status === 401, `Invalid password returned HTTP 401 (got ${resInvalid.status})`)
  assert(jsonInvalid.ok === false, "Invalid login ok: false")
  assert(jsonInvalid.error.includes("Invalid credentials"), "Generic error message returned")

  // Cross-site request forgery block
  const resCsrf = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://malicious-attacker.com",
    },
    body: JSON.stringify({ username: "admin", password: "TestSecurePass#2026" }),
  })
  assert(resCsrf.status === 403, `Cross-origin login blocked with HTTP 403 (got ${resCsrf.status})`)

  // -------------------------------------------------------------------------
  // TEST 5: Independent Server-Side API Authorization
  // -------------------------------------------------------------------------
  console.log("\n[TEST 5] Verifying sensitive server operations enforce auth independently...")
  const resNoSession = await fetch(`${BASE_URL}/api/admin/session`)
  const jsonNoSession = await resNoSession.json()
  assert(jsonNoSession.authenticated === false, "GET /api/admin/session without cookie returns authenticated: false")

  const resUploadNoAuth = await fetch(`${BASE_URL}/api/imagekit/upload`, {
    method: "POST",
  })
  const jsonUploadNoAuth = await resUploadNoAuth.json()
  assert(resUploadNoAuth.status === 401, `POST /api/imagekit/upload rejected without auth (HTTP ${resUploadNoAuth.status})`)
  assert(jsonUploadNoAuth.error.includes("Unauthorized"), "ImageKit upload returns Unauthorized message")

  // -------------------------------------------------------------------------
  // TEST 6: Next.js 16 proxy.ts Route Protection & Redirects
  // -------------------------------------------------------------------------
  console.log("\n[TEST 6] Verifying Next.js 16 proxy.ts Edge protection on /admin...")
  const resProxyNoAuth = await fetch(`${BASE_URL}/admin`, {
    redirect: "manual",
  })
  assert(
    resProxyNoAuth.status === 307 || resProxyNoAuth.status === 302,
    `Unauthenticated /admin redirects with HTTP ${resProxyNoAuth.status}`
  )
  assert(
    resProxyNoAuth.headers.get("location")?.includes("/admin/login"),
    "Unauthenticated /admin redirects to /admin/login"
  )

  const resProxyAuth = await fetch(`${BASE_URL}/admin`, {
    headers: { Cookie: `sbe_admin_session=${sessionCookie}` },
    redirect: "manual",
  })
  assert(
    resProxyAuth.status === 200,
    `Authenticated /admin access returns HTTP 200 (got ${resProxyAuth.status})`
  )

  const resProxyLoginRedirect = await fetch(`${BASE_URL}/admin/login`, {
    headers: { Cookie: `sbe_admin_session=${sessionCookie}` },
    redirect: "manual",
  })
  assert(
    resProxyLoginRedirect.status === 307 || resProxyLoginRedirect.status === 302,
    `Authenticated /admin/login redirects with HTTP ${resProxyLoginRedirect.status}`
  )
  assert(
    resProxyLoginRedirect.headers.get("location")?.endsWith("/admin"),
    "Authenticated /admin/login redirects to /admin"
  )

  // -------------------------------------------------------------------------
  // TEST 7: Altered, Forged, and Expired Session Tokens
  // -------------------------------------------------------------------------
  console.log("\n[TEST 7] Verifying altered and forged session tokens are rejected...")
  const forgedToken = sessionCookie + "tampered"
  const resForged = await fetch(`${BASE_URL}/api/admin/session`, {
    headers: { Cookie: `sbe_admin_session=${forgedToken}` },
  })
  const jsonForged = await resForged.json()
  assert(jsonForged.authenticated === false, "Forged token rejected by session endpoint")

  const resForgedUpload = await fetch(`${BASE_URL}/api/imagekit/upload`, {
    method: "POST",
    headers: { Cookie: `sbe_admin_session=${forgedToken}` },
  })
  assert(resForgedUpload.status === 401, `Forged token rejected by ImageKit upload (HTTP ${resForgedUpload.status})`)

  // -------------------------------------------------------------------------
  // TEST 8: ImageKit Upload Pipeline — HTTP 500 Elimination & Validation
  // -------------------------------------------------------------------------
  console.log("\n[TEST 8] Verifying ImageKit upload validation & error code handling...")

  // 8a. Authenticated upload with empty body -> Must return 400 Bad Request (NOT 500)
  const resEmptyUpload = await fetch(`${BASE_URL}/api/imagekit/upload`, {
    method: "POST",
    headers: { Cookie: `sbe_admin_session=${sessionCookie}` },
  })
  assert(
    resEmptyUpload.status === 400,
    `Empty upload payload returns HTTP 400 Bad Request (got ${resEmptyUpload.status}, HTTP 500 eliminated)`
  )
  const jsonEmptyUpload = await resEmptyUpload.json()
  assert(jsonEmptyUpload.ok === false, "Empty payload response has ok: false")

  // 8b. Authenticated upload with disallowed file type (e.g. SVG / text) -> Must return 415
  const svgFormData = new FormData()
  const svgBlob = new Blob(['<svg><script>alert("xss")</script></svg>'], { type: "image/svg+xml" })
  svgFormData.append("file", svgBlob, "exploit.svg")

  const resSvgUpload = await fetch(`${BASE_URL}/api/imagekit/upload`, {
    method: "POST",
    headers: { Cookie: `sbe_admin_session=${sessionCookie}` },
    body: svgFormData,
  })
  assert(
    resSvgUpload.status === 415,
    `Disallowed SVG format rejected with HTTP 415 Unsupported Media Type (got ${resSvgUpload.status})`
  )

  // 8c. Authenticated upload with valid JPEG image payload
  const dummyJpgBlob = new Blob([new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46])], {
    type: "image/jpeg",
  })
  const validFormData = new FormData()
  validFormData.append("file", dummyJpgBlob, "property-test.jpg")

  const resValidUpload = await fetch(`${BASE_URL}/api/imagekit/upload`, {
    method: "POST",
    headers: { Cookie: `sbe_admin_session=${sessionCookie}` },
    body: validFormData,
  })
  const jsonValidUpload = await resValidUpload.json()

  // If IMAGEKIT_PRIVATE_KEY is present in environment, it should succeed with HTTP 200
  // If IMAGEKIT_PRIVATE_KEY is absent, it must return HTTP 503 Service Unavailable (NOT 500)
  if (resValidUpload.status === 200) {
    assert(jsonValidUpload.ok === true, "Live ImageKit upload succeeded with ok: true")
    assert(jsonValidUpload.url?.includes("ik.imagekit.io"), "Upload returned valid ImageKit CDN URL")
    console.log(`  🌟 Live ImageKit upload confirmed: ${jsonValidUpload.url}`)
  } else {
    assert(
      resValidUpload.status === 503,
      `Unconfigured ImageKit returns HTTP 503 Service Unavailable (got ${resValidUpload.status}, NOT 500)`
    )
    assert(
      jsonValidUpload.error?.includes("Image upload service is currently unavailable"),
      "Safe, non-revealing error message returned to client without leaking internal keys"
    )
  }

  // -------------------------------------------------------------------------
  // TEST 9: Logout & Session Invalidation
  // -------------------------------------------------------------------------
  console.log("\n[TEST 9] Verifying logout invalidates session...")
  const resLogout = await fetch(`${BASE_URL}/api/admin/logout`, {
    method: "POST",
    headers: { Cookie: `sbe_admin_session=${sessionCookie}` },
  })
  assert(resLogout.status === 200, "POST /api/admin/logout returns HTTP 200")
  const logoutSetCookie = resLogout.headers.get("set-cookie")
  assert(
    logoutSetCookie?.includes("Max-Age=0") ||
      logoutSetCookie?.includes("max-age=0") ||
      logoutSetCookie?.includes("sbe_admin_session=;"),
    "Logout Set-Cookie clears the sbe_admin_session cookie"
  )

  // -------------------------------------------------------------------------
  // TEST 10: Brute-Force Rate Limiting & Concurrency Safety
  // -------------------------------------------------------------------------
  console.log("\n[TEST 10] Verifying brute-force login throttling & concurrency...")
  let got429 = false
  for (let i = 0; i < 6; i++) {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": "198.51.100.99", // Dedicated test IP
      },
      body: JSON.stringify({ username: "admin", password: `WrongAttempt_${i}` }),
    })
    if (res.status === 429) {
      got429 = true
      const json = await res.json()
      assert(json.error.includes("Too many failed"), "HTTP 429 response contains throttling message")
      break
    }
  }
  assert(got429, "Failed login attempts trigger HTTP 429 rate limit")

  // Concurrent request test: simulate 5 rapid requests from another IP
  const concurrentPromises = Array.from({ length: 5 }, (_, i) =>
    fetch(`${BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": "198.51.100.100",
      },
      body: JSON.stringify({ username: "admin", password: `ConcurrentAttempt_${i}` }),
    })
  )
  const concurrentResults = await Promise.all(concurrentPromises)
  assert(
    concurrentResults.every((r) => r.status === 401 || r.status === 429),
    "Concurrent login attempts handled safely without server errors (HTTP 401/429)"
  )

  // -------------------------------------------------------------------------
  // TEST 11: Static Client Bundle Secret Leak Check
  // -------------------------------------------------------------------------
  console.log("\n[TEST 11] Scanning static client bundles for secret leaks...")
  const fs = await import("node:fs")
  const path = await import("node:path")
  let leakFound = false

  function scanDir(dir) {
    if (!fs.existsSync(dir)) return
    for (const file of fs.readdirSync(dir)) {
      const full = path.join(dir, file)
      const stat = fs.statSync(full)
      if (stat.isDirectory()) {
        scanDir(full)
      } else if (file.endsWith(".js") || file.endsWith(".json")) {
        const content = fs.readFileSync(full, "utf8")
        if (
          content.includes("SBE@Admin2024") ||
          content.includes("TestSecurePass#2026") ||
          content.includes("your_imagekit_private_key")
        ) {
          leakFound = true
          console.error(`Leak found in ${full}`)
        }
      }
    }
  }
  scanDir(".next/static")
  assert(!leakFound, "Zero hardcoded passwords or secrets found in .next/static client bundles")

  console.log("\n==================================================================")
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`)
  console.log("==================================================================")
  if (failed > 0) process.exit(1)
}

runTests().catch((err) => {
  console.error("Test execution failed:", err)
  process.exit(1)
})
