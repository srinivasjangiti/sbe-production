#!/usr/bin/env node
/**
 * Shree Balaji Enterprises — Admin Credential & Secret Generator
 *
 * Secure interactive credential generator.
 * Prompts for password via hidden terminal input without echoing characters
 * or recording credentials in shell history.
 *
 * Usage:
 *   node scripts/generate-admin-hash.mjs [username]
 */

import crypto from "node:crypto"
import readline from "node:readline"

// Check if user inadvertently supplied a password via command-line argument
if (process.argv[2] && process.argv[2].length > 15 && !process.argv[2].startsWith("-")) {
  console.error("\n❌ Error: Passing passwords as command-line arguments is disabled for security.")
  console.error("   Command-line arguments can be exposed in shell histories and process lists.")
  console.error("   Please run without password arguments to use the secure hidden terminal prompt.")
  console.error("\n   Usage: node scripts/generate-admin-hash.mjs [username]\n")
  process.exit(1)
}

const username = process.argv[2] || "admin"

let nonTtyIterator = null

// Prompt for hidden terminal input
function readHiddenInput(query) {
  return new Promise((resolve) => {
    process.stdout.write(query)

    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true)
      process.stdin.resume()
      process.stdin.setEncoding("utf8")

      let input = ""

      function onData(chunk) {
        chunk = String(chunk)
        for (let i = 0; i < chunk.length; i++) {
          const char = chunk[i]
          if (char === "\n" || char === "\r" || char === "\u0004") {
            process.stdin.setRawMode(false)
            process.stdin.pause()
            process.stdin.removeListener("data", onData)
            process.stdout.write("\n")
            resolve(input)
            return
          } else if (char === "\u0003") {
            // Handle Ctrl+C
            process.stdin.setRawMode(false)
            process.stdin.pause()
            process.stdin.removeListener("data", onData)
            process.stdout.write("\n")
            process.exit(130)
          } else if (char === "\b" || char === "\x7f") {
            // Handle Backspace
            if (input.length > 0) {
              input = input.slice(0, -1)
            }
          } else {
            input += char
          }
        }
      }

      process.stdin.on("data", onData)
    } else {
      // Non-interactive / piped input support using async iterator
      if (!nonTtyIterator) {
        const rl = readline.createInterface({
          input: process.stdin,
          terminal: false,
        })
        nonTtyIterator = rl[Symbol.asyncIterator]()
      }
      nonTtyIterator.next().then((res) => {
        resolve(res.done ? "" : res.value.trim())
      })
    }
  })
}

async function main() {
  console.log("\n==================================================================")
  console.log("   SHREE BALAJI ENTERPRISES — SECURE ADMIN CREDENTIAL GENERATOR   ")
  console.log("==================================================================")
  console.log("Enter credentials via the secure hidden prompt below (input will not echo).\n")

  const password = await readHiddenInput("Enter administrator password: ")
  if (!password || password.trim().length === 0) {
    console.error("❌ Error: Password cannot be empty.")
    process.exit(1)
  }

  if (password.length < 8) {
    console.error("❌ Error: Password must be at least 8 characters long for adequate security.")
    process.exit(1)
  }

  const confirm = await readHiddenInput("Confirm administrator password: ")
  if (password !== confirm) {
    console.error("❌ Error: Passwords do not match. Aborting.")
    process.exit(1)
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
  console.log("   CREDENTIALS GENERATED SUCCESSFULLY (PBKDF2-HMAC-SHA512 250k)   ")
  console.log("==================================================================")
  console.log("\nAdd the following environment variables to your Vercel Project Settings")
  console.log("and `.env.local` (NEVER commit `.env.local` to Git):\n")
  console.log(`ADMIN_USERNAME="${username}"`)
  console.log(`ADMIN_PASSWORD_HASH="${passwordHash}"`)
  console.log(`SESSION_SECRET="${sessionSecret}"`)
  console.log("\n==================================================================")
  console.log("✅ Keep these values confidential. Do not share or commit to source control.\n")
}

main().catch((err) => {
  console.error("Failed to generate credentials:", err)
  process.exit(1)
})
