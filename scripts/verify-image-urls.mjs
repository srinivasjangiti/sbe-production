import fs from "node:fs"
import path from "node:path"

const content = fs.readFileSync("scripts/generated-properties.txt", "utf8")
const matches = [...content.matchAll(/"(\/images\/properties\/[^"]+)"/g)].map((m) => m[1])

console.log("Total URL references extracted:", matches.length)
let missing = 0

for (const relUrl of matches) {
  const filePath = path.join(process.cwd(), "public", relUrl.replace(/^\//, ""))
  if (!fs.existsSync(filePath)) {
    console.error("Missing file:", filePath)
    missing++
  }
}

console.log(`Validation complete: ${matches.length - missing} verified on disk, ${missing} missing.`)

