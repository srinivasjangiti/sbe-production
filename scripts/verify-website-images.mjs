import { buyProperties } from "../lib/data.ts"

const BASE_URL = "http://localhost:3000"

async function verifyAll() {
  console.log("==================================================================")
  console.log("    SBE REAL PROPERTY PHOTOGRAPHS HTTP VERIFICATION SUITE         ")
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

  // 1. Verify Public Catalog & Homepage
  console.log("[PHASE 1] Checking Core Pages...")
  const resHome = await fetch(`${BASE_URL}/`)
  assert(resHome.status === 200, `Homepage / returned HTTP 200 (got ${resHome.status})`)

  const resBuy = await fetch(`${BASE_URL}/buy`)
  assert(resBuy.status === 200, `Catalog /buy returned HTTP 200 (got ${resBuy.status})`)

  // 2. Verify all property detail pages
  console.log("\n[PHASE 2] Checking All 13 Property Detail Routes...")
  for (const property of buyProperties) {
    const detailUrl = `${BASE_URL}/buy/${property.id}`
    const resDetail = await fetch(detailUrl)
    assert(
      resDetail.status === 200,
      `Property #${property.id} (${property.address}, ${property.city}) returned HTTP 200`
    )
  }

  // 3. Verify all real photograph URLs load with HTTP 200
  console.log("\n[PHASE 3] Checking All Local Property Photograph URLs...")
  let imageCount = 0
  const testedUrls = new Set()

  for (const property of buyProperties) {
    const urls = [property.image, ...(property.images || [])]
    for (const u of urls) {
      if (u.startsWith("/images/properties/")) {
        if (!testedUrls.has(u)) {
          testedUrls.add(u)
          const resImg = await fetch(`${BASE_URL}${u}`)
          assert(
            resImg.status === 200,
            `Photo ${u} returned HTTP 200 (${resImg.headers.get("content-type")})`
          )
          imageCount++
        }
      }
    }
  }

  console.log(`\nVerified ${imageCount} unique real photograph URLs via HTTP.`)
  console.log("\n==================================================================")
  console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`)
  console.log("==================================================================")

  if (failed > 0) process.exit(1)
}

verifyAll().catch((err) => {
  console.error("Verification failed:", err)
  process.exit(1)
})

