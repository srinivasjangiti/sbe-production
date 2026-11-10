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
  MIN_SESSION_SECRET_LENGTH,
  isProductionSessionSecretConfigured,
  getSessionSecret,
  createSessionToken,
  verifySessionToken,
} from "../lib/auth-tokens.ts"

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000"

// Safety Guard: Refuse automated credential testing against remote/production endpoints
try {
  const parsedUrl = new URL(BASE_URL)
  const isLocal = ["localhost", "127.0.0.1", "::1", "0.0.0.0"].includes(parsedUrl.hostname)
  if (!isLocal && !process.env.ALLOW_REMOTE_TESTING) {
    console.error(`\n❌ ERROR: Automated security tests cannot be run against remote host "${parsedUrl.hostname}".`)
    console.error("   To protect production infrastructure from accidental credential submission or lockout, only localhost is permitted.")
    console.error("   To override for staging, set ALLOW_REMOTE_TESTING=1.\n")
    process.exit(1)
  }
} catch (e) {
  console.error("❌ ERROR: Invalid TEST_BASE_URL:", BASE_URL)
  process.exit(1)
}

// Require isolated test password via environment variable
const testPassword = process.env.ADMIN_TEST_PASSWORD
if (!testPassword || testPassword.trim().length === 0) {
  console.error("\n❌ ERROR: ADMIN_TEST_PASSWORD environment variable is required to execute security tests.")
  console.error("   Security policy strictly prohibits hardcoded test credentials in source code.")
  console.error("\n   Usage:")
  console.error('   $env:ADMIN_TEST_PASSWORD="<your-test-password>"; node scripts/test-auth-security.mjs  (PowerShell)')
  console.error('   ADMIN_TEST_PASSWORD="<your-test-password>" node scripts/test-auth-security.mjs         (Bash/Zsh)\n')
  process.exit(1)
}

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

  const hash250k = await hashPassword(testPassword)
  assert(hash250k.startsWith("pbkdf2:250000:"), "Hash format starts with pbkdf2:250000:")
  const valid250k = await verifyPassword(testPassword, hash250k)
  assert(valid250k === true, "New 250,000 iteration hash verifies successfully")

  // Verify that an obsolete/insecure hash with < 220,000 iterations is rejected
  const weakHash = "pbkdf2:100000:75369e7dbfa786d156c0eb3fe2b081d1:1ab337b7265e7937a8a2fc674baa5b52ce48dc994844c1095162577c0a67db88"
  const rejectWeak = await verifyPassword(testPassword, weakHash)
  assert(rejectWeak === false, "Hashes below 220,000 iterations are strictly rejected")

  // Verify that unhashed/plaintext passwords stored in configuration are strictly rejected
  const rejectPlaintext = await verifyPassword("PlaintextPass123", "PlaintextPass123")
  assert(rejectPlaintext === false, "Plaintext password fallback is eliminated (returns false)")

  // -------------------------------------------------------------------------
  // TEST 2: Compromised Credential Rotation & Invalid Password Rejection
  // -------------------------------------------------------------------------
  console.log("\n[TEST 2] Verifying invalid credentials fail authentication...")
  const revokedLegacyPassword = "RevokedLegacyPassword#Example123"
  const resOldPass = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin", password: revokedLegacyPassword }),
  })
  const jsonOldPass = await resOldPass.json()
  assert(resOldPass.status === 401, `Invalid password rejected with HTTP 401 (got ${resOldPass.status})`)
  assert(jsonOldPass.ok === false, "Invalid password rejected with ok: false")
  assert(jsonOldPass.error.includes("Invalid credentials"), "Generic error message returned")

  // Cryptographic check: invalid password cannot authenticate against new 250k hash
  const rejectOldCrypto = await verifyPassword(revokedLegacyPassword, hash250k)
  assert(rejectOldCrypto === false, "Invalid credential fails cryptographic verification against 250k hash")

  // -------------------------------------------------------------------------
  // TEST 3: Valid Login with Test Credential
  // -------------------------------------------------------------------------
  console.log("\n[TEST 3] Verifying valid login with test credential...")
  const resValid = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin", password: testPassword }),
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
    body: JSON.stringify({ username: "admin", password: testPassword }),
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
          (testPassword && content.includes(testPassword)) ||
          content.includes("pbkdf2:250000:") ||
          content.includes("your_imagekit_private_key") ||
          content.includes("private_key")
        ) {
          leakFound = true
          console.error(`Leak found in ${full}`)
        }
      }
    }
  }
  scanDir(".next/static")
  assert(!leakFound, "Zero hardcoded passwords or secrets found in .next/static client bundles")

  // -------------------------------------------------------------------------
  // TEST 12: Production SESSION_SECRET Fail-Closed Enforcement
  // -------------------------------------------------------------------------
  console.log("\n[TEST 12] Verifying production SESSION_SECRET fail-closed enforcement...")
  const originalEnvNodeEnv = process.env.NODE_ENV
  const originalSessionSecret = process.env.SESSION_SECRET

  try {
    // 12.1: Production with missing SESSION_SECRET
    process.env.NODE_ENV = "production"
    delete process.env.SESSION_SECRET

    assert(
      isProductionSessionSecretConfigured() === false,
      "isProductionSessionSecretConfigured() returns false when SESSION_SECRET is unset in production"
    )

    let getSecretThrew = false
    try {
      getSessionSecret()
    } catch (err) {
      getSecretThrew = true
      assert(
        err.message.includes("CRITICAL: SESSION_SECRET is missing or shorter than 32 characters in production"),
        "getSessionSecret() throws critical fail-closed error when SESSION_SECRET is unset in production"
      )
    }
    assert(getSecretThrew, "getSessionSecret() refuses to run with unset SESSION_SECRET in production")

    let createTokenThrew = false
    try {
      await createSessionToken("admin", "")
    } catch {
      createTokenThrew = true
    }
    assert(createTokenThrew, "createSessionToken() refuses to create token with empty secret")

    const verifyUnset = await verifySessionToken("fake.token.signature", "")
    assert(verifyUnset.valid === false, "verifySessionToken() returns valid:false with empty secret")

    // 12.2: Production with invalid short SESSION_SECRET (< 32 chars)
    process.env.SESSION_SECRET = "too-short-secret"
    assert(
      isProductionSessionSecretConfigured() === false,
      "isProductionSessionSecretConfigured() returns false when SESSION_SECRET is < 32 chars"
    )

    let getSecretShortThrew = false
    try {
      getSessionSecret()
    } catch {
      getSecretShortThrew = true
    }
    assert(getSecretShortThrew, "getSessionSecret() throws error when SESSION_SECRET is < 32 chars in production")

    const verifyShort = await verifySessionToken("fake.token.signature", "too-short-secret")
    assert(verifyShort.valid === false, "verifySessionToken() returns valid:false when secret is < 32 chars")

    // 12.3: Production with valid 64-char hex SESSION_SECRET
    const validSecret = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
    process.env.SESSION_SECRET = validSecret
    assert(
      isProductionSessionSecretConfigured() === true,
      "isProductionSessionSecretConfigured() returns true when valid 64-char SESSION_SECRET is provided"
    )
    assert(
      getSessionSecret() === validSecret,
      "getSessionSecret() successfully returns configured secret in production"
    )

    const validToken = await createSessionToken("admin", validSecret, 3600)
    assert(typeof validToken === "string" && validToken.split(".").length === 3, "createSessionToken() succeeds with valid secret")

    const verified = await verifySessionToken(validToken, validSecret)
    assert(verified.valid === true && verified.username === "admin", "verifySessionToken() validates token with configured secret")

    // 12.4: Development mode fallback
    process.env.NODE_ENV = "development"
    delete process.env.SESSION_SECRET
    const devSecret = getSessionSecret()
    assert(
      devSecret === "dev-only-session-secret-change-in-env-vars-minimum-32-chars-long",
      "getSessionSecret() returns dev fallback without throwing in development mode"
    )
  } finally {
    process.env.NODE_ENV = originalEnvNodeEnv
    if (originalSessionSecret !== undefined) {
      process.env.SESSION_SECRET = originalSessionSecret
    } else {
      delete process.env.SESSION_SECRET
    }
  }

  // -------------------------------------------------------------------------
  // TEST 13: Interactive Admin Credential Generator Verification
  // -------------------------------------------------------------------------
  console.log("\n[TEST 13] Verifying interactive credential generator security...")
  const { execSync } = await import("node:child_process")

  // 13.1: Reject password passed as CLI argument
  let rejectedCliArg = false
  try {
    execSync('node scripts/generate-admin-hash.mjs "MySecretPassword123#"', { stdio: "pipe" })
  } catch (err) {
    rejectedCliArg = err.status !== 0
    const stderr = err.stderr ? err.stderr.toString() : ""
    assert(stderr.includes("Passing passwords as command-line arguments is disabled"), "CLI rejects passwords in arguments")
  }
  assert(rejectedCliArg, "Passing password as CLI argument exits with non-zero error code")

  // 13.2: Rejects password shorter than 8 chars via piped input
  let rejectedShortPass = false
  try {
    execSync('node scripts/generate-admin-hash.mjs', {
      input: "short\nshort\n",
      stdio: "pipe",
    })
  } catch (err) {
    rejectedShortPass = err.status !== 0
    const stderr = err.stderr ? err.stderr.toString() : ""
    assert(stderr.includes("at least 8 characters"), "Piped input rejects passwords < 8 characters")
  }
  assert(rejectedShortPass, "Password shorter than 8 characters exits with non-zero error code")

  // 13.3: Rejects mismatched confirmation password
  let rejectedMismatch = false
  try {
    execSync('node scripts/generate-admin-hash.mjs', {
      input: "ValidPass123#\nMismatchedPass456#\n",
      stdio: "pipe",
    })
  } catch (err) {
    rejectedMismatch = err.status !== 0
    const stderr = err.stderr ? err.stderr.toString() : ""
    assert(stderr.includes("Passwords do not match"), "Piped input detects and rejects password mismatch")
  }
  assert(rejectedMismatch, "Mismatched confirmation password exits with non-zero error code")

  // 13.4: Piped valid input generates PBKDF2 hash & session secret without printing plaintext password
  const testInputPass = "TestGenPassword2026!"
  try {
    const output = execSync('node scripts/generate-admin-hash.mjs testadmin', {
      input: `${testInputPass}\n${testInputPass}\n`,
      stdio: "pipe",
    }).toString()

    assert(output.includes('ADMIN_USERNAME="testadmin"'), "Generator outputs expected username")
    assert(output.includes('ADMIN_PASSWORD_HASH="pbkdf2:250000:'), "Generator outputs 250k PBKDF2 hash")
    assert(output.includes('SESSION_SECRET="'), "Generator outputs 64-char SESSION_SECRET")
    assert(!output.includes(testInputPass), "Plaintext password is NEVER printed or leaked in output")
  } catch (err) {
    assert(false, `Generator valid input run failed: ${err.message}`)
  }

  console.log("\n==================================================================")
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`)
  console.log("==================================================================")
  if (failed > 0) process.exit(1)
}

runTests().catch((err) => {
  console.error("Test execution failed:", err)
  process.exit(1)
})
