// Server and Edge compatible authentication, session token, and rate limiting utility
// Uses standard Web Crypto API (crypto.subtle) - supported in Edge and Node runtime
import { Redis } from "@upstash/redis"

const ENCODER = new TextEncoder()
const DECODER = new TextDecoder()

// Convert Uint8Array to base64url string
export function toBase64Url(uint8: Uint8Array): string {
  let binary = ""
  const len = uint8.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8[i])
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

// Convert base64url string to Uint8Array
export function fromBase64Url(str: string): Uint8Array {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/")
  while (base64.length % 4) {
    base64 += "="
  }
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

// Constant-time string comparison to prevent timing attacks
export function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

// CSRF validation helper for state-changing requests
export function isValidOrigin(origin: string | null, host: string | null): boolean {
  if (!origin) return true // Non-browser clients or direct API calls with auth
  if (!host) return false
  try {
    const originUrl = new URL(origin)
    return originUrl.host === host
  } catch {
    return false
  }
}

let ephemeralSecret: string | null = null

// Session secret resolver
export function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET
  if (secret && secret.length >= 32) {
    return secret
  }
  if (process.env.NODE_ENV === "production") {
    // In production, NEVER fall back to a static hardcoded key
    if (!ephemeralSecret) {
      const bytes = crypto.getRandomValues(new Uint8Array(32))
      ephemeralSecret = Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
      console.error(
        "CRITICAL SECURITY ALERT: SESSION_SECRET is not configured or too short (<32 chars) in production! Using an ephemeral random secret. Add a 64-character SESSION_SECRET to Vercel."
      )
    }
    return ephemeralSecret
  }
  // Safe development-only fallback
  return "dev-only-session-secret-change-in-env-vars-minimum-32-chars-long"
}

// Get HMAC key from secret
async function getHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    ENCODER.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  )
}

// Create a cryptographically signed session token
export async function createSessionToken(
  username: string,
  secret: string,
  expiresInSeconds = 28800 // 8 hours default
): Promise<string> {
  const header = toBase64Url(ENCODER.encode(JSON.stringify({ alg: "HS256", typ: "JWT" })))
  const now = Math.floor(Date.now() / 1000)
  const randomBytes = crypto.getRandomValues(new Uint8Array(16))

  const payload = toBase64Url(
    ENCODER.encode(
      JSON.stringify({
        sub: username,
        iat: now,
        exp: now + expiresInSeconds,
        jti: toBase64Url(randomBytes),
      })
    )
  )

  const data = `${header}.${payload}`
  const key = await getHmacKey(secret)
  const signature = await crypto.subtle.sign("HMAC", key, ENCODER.encode(data))
  const signatureBase64 = toBase64Url(new Uint8Array(signature))

  return `${data}.${signatureBase64}`
}

// Verify a session token
export async function verifySessionToken(
  token: string,
  secret: string
): Promise<{ valid: boolean; username?: string; expired?: boolean }> {
  if (!token || typeof token !== "string") {
    return { valid: false }
  }

  const parts = token.split(".")
  if (parts.length !== 3) {
    return { valid: false }
  }

  const [headerStr, payloadStr, signatureStr] = parts
  const data = `${headerStr}.${payloadStr}`

  try {
    const key = await getHmacKey(secret)
    const signature = fromBase64Url(signatureStr)
    const isValid = await crypto.subtle.verify("HMAC", key, signature, ENCODER.encode(data))

    if (!isValid) {
      return { valid: false }
    }

    const payloadJson = DECODER.decode(fromBase64Url(payloadStr))
    const payload = JSON.parse(payloadJson)
    const now = Math.floor(Date.now() / 1000)

    if (payload.exp && payload.exp < now) {
      return { valid: false, expired: true }
    }

    return { valid: true, username: payload.sub }
  } catch {
    return { valid: false }
  }
}

// Hash password with PBKDF2 (SHA-512, 250,000 iterations - exceeding OWASP 220k minimum)
export const DEFAULT_PBKDF2_ITERATIONS = 250000
export const MIN_PBKDF2_ITERATIONS = 220000

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    ENCODER.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  )

  const iterations = DEFAULT_PBKDF2_ITERATIONS
  const derived = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations, hash: "SHA-512" },
    keyMaterial,
    256 // 32 bytes = 256 bits
  )

  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
  const hashHex = Array.from(new Uint8Array(derived))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")

  return `pbkdf2:${iterations}:${saltHex}:${hashHex}`
}

// Verify password against stored PBKDF2 hash
export async function verifyPassword(
  password: string,
  storedHashOrPlain: string
): Promise<boolean> {
  if (!storedHashOrPlain || !password) {
    return false
  }

  const parts = storedHashOrPlain.split(":")
  if (parts.length === 4 && parts[0] === "pbkdf2") {
    const iterations = parseInt(parts[1], 10)
    // Enforce at least 220,000 iterations for PBKDF2-HMAC-SHA512
    if (isNaN(iterations) || iterations < MIN_PBKDF2_ITERATIONS) {
      return false
    }

    const saltMatch = parts[2].match(/.{1,2}/g)
    if (!saltMatch) return false
    const salt = new Uint8Array(saltMatch.map((b) => parseInt(b, 16)))

    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      ENCODER.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    )

    const derived = await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt, iterations, hash: "SHA-512" },
      keyMaterial,
      256
    )

    const derivedHex = Array.from(new Uint8Array(derived))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")

    return timingSafeEqualStr(derivedHex, parts[3])
  }

  // Plaintext passwords and unhashed strings are strictly rejected
  return false
}

// ---------------------------------------------------------------------------
// Rate Limiter: Upstash Redis (Distributed) with In-Memory Local Fallback
// ---------------------------------------------------------------------------
interface RateLimitEntry {
  count: number
  firstAttempt: number
}

const loginAttempts = new Map<string, RateLimitEntry>()
const MAX_FAILED_ATTEMPTS = 5
const LOCKOUT_WINDOW_SECONDS = 15 * 60 // 15 minutes = 900 seconds
const LOCKOUT_WINDOW_MS = LOCKOUT_WINDOW_SECONDS * 1000

let redisInstance: Redis | null = null

function getRedis(): Redis | null {
  if (redisInstance) return redisInstance

  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (url && token) {
    try {
      redisInstance = new Redis({ url, token })
      return redisInstance
    } catch (err) {
      console.warn("Failed to initialize Upstash Redis client:", err)
      return null
    }
  }
  return null
}

export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean
  retryAfterSeconds?: number
  isDistributed: boolean
}> {
  const redis = getRedis()

  if (redis) {
    try {
      const key = `sbe:ratelimit:failed:${ip}`
      const count = await redis.get<number>(key)

      if (count && count >= MAX_FAILED_ATTEMPTS) {
        let ttl = await redis.ttl(key)
        if (ttl <= 0) ttl = 60
        return { allowed: false, retryAfterSeconds: ttl, isDistributed: true }
      }
      return { allowed: true, isDistributed: true }
    } catch (err) {
      console.warn("Upstash Redis rate-limit check failed; falling back to in-memory store:", err)
    }
  }

  // In-memory fallback for local dev / offline mode
  const now = Date.now()
  const entry = loginAttempts.get(ip)

  if (!entry) {
    return { allowed: true, isDistributed: false }
  }

  // If window expired, reset
  if (now - entry.firstAttempt > LOCKOUT_WINDOW_MS) {
    loginAttempts.delete(ip)
    return { allowed: true, isDistributed: false }
  }

  if (entry.count >= MAX_FAILED_ATTEMPTS) {
    const remainingMs = entry.firstAttempt + LOCKOUT_WINDOW_MS - now
    const retryAfterSeconds = Math.ceil(Math.max(remainingMs, 0) / 1000)
    return { allowed: false, retryAfterSeconds, isDistributed: false }
  }

  return { allowed: true, isDistributed: false }
}

export async function recordFailedAttempt(ip: string): Promise<void> {
  const redis = getRedis()

  if (redis) {
    try {
      const key = `sbe:ratelimit:failed:${ip}`
      const count = await redis.incr(key)
      if (count === 1) {
        await redis.expire(key, LOCKOUT_WINDOW_SECONDS)
      } else {
        const ttl = await redis.ttl(key)
        if (ttl < 0) {
          await redis.expire(key, LOCKOUT_WINDOW_SECONDS)
        }
      }
    } catch (err) {
      console.warn("Failed to record failed attempt in Upstash Redis:", err)
    }
  }

  const now = Date.now()
  const entry = loginAttempts.get(ip)

  if (!entry || now - entry.firstAttempt > LOCKOUT_WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now })
  } else {
    entry.count += 1
  }

  // Cleanup old entries periodically if map grows large (using forEach for universal compatibility)
  if (loginAttempts.size > 1000) {
    loginAttempts.forEach((val, key) => {
      if (now - val.firstAttempt > LOCKOUT_WINDOW_MS) {
        loginAttempts.delete(key)
      }
    })
  }
}

export async function clearFailedAttempts(ip: string): Promise<void> {
  const redis = getRedis()

  if (redis) {
    try {
      const key = `sbe:ratelimit:failed:${ip}`
      await redis.del(key)
    } catch (err) {
      console.warn("Failed to clear failed attempts in Upstash Redis:", err)
    }
  }

  loginAttempts.delete(ip)
}
