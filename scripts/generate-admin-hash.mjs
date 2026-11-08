#!/usr/bin/env node
/**
 * Shree Balaji Enterprises — Admin Credential & Secret Generator
 *
 * Usage:
 *   node scripts/generate-admin-hash.mjs "YourSecurePasswordHere"
 *   node scripts/generate-admin-hash.mjs "YourSecurePasswordHere" "admin"
 */

import crypto from "node:crypto"

const password = process.argv[2]
const username = process.argv[3] || "admin"

if (!password) {
  console.error("\n❌ Error: Please provide a password to hash.")
  console.error("Usage: node scripts/generate-admin-hash.mjs \"<password>\" [username]\n")
  process.exit(1)
}

if (password.length < 8) {
  console.warn("\n⚠️ Warning: Password should be at least 8 characters long for strong security.")
}

// 1. Generate PBKDF2 hash using SHA-512 with 250,000 iterations (exceeding OWASP 220k minimum)
const salt = crypto.randomBytes(16)
const iterations = 250000
const derived = crypto.pbkdf2Sync(password, salt, iterations, 32, "sha512")

const saltHex = salt.toString("hex")
const hashHex = derived.toString("hex")
const passwordHash = `pbkdf2:${iterations}:${saltHex}:${hashHex}`

// 2. Generate cryptographically strong 32-byte (64-character) session secret
const sessionSecret = crypto.randomBytes(32).toString("hex")

console.log("\n==================================================================")
console.log("   SHREE BALAJI ENTERPRISES — SECURE ADMIN CREDENTIALS GENERATED   ")
console.log("==================================================================")
console.log("\nAdd the following environment variables to your Vercel Project Settings")
console.log("and `.env.local` (NEVER commit `.env.local` to Git):\n")
console.log(`ADMIN_USERNAME="${username}"`)
console.log(`ADMIN_PASSWORD_HASH="${passwordHash}"`)
console.log(`SESSION_SECRET="${sessionSecret}"`)
console.log("\n==================================================================")
console.log("✅ Keep these values confidential. Do not share or commit to source control.\n")
