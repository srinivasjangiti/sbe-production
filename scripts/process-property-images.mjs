import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const SOURCE_ROOT = "C:\\Shree Balaji Enterprises\\Properties"
const DEST_ROOT = path.resolve("public/images/properties")

// Sanitize filename into web-safe format while preserving source stem
export function sanitizeFilename(filename, usedNames = new Set()) {
  const ext = path.extname(filename).toLowerCase()
  const base = path.basename(filename, ext)
  let clean = base
    .toLowerCase()
    .replace(/['"’]/g, "")
    .replace(/[,;]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[()]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

  if (!clean) clean = "photo"

  let finalName = clean + ".jpg"
  let counter = 1
  while (usedNames.has(finalName)) {
    finalName = `${clean}-${counter}.jpg`
    counter++
  }
  usedNames.add(finalName)
  return finalName
}

// Convert string to clean slug
export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/['"’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

// Discover all project folders
export function discoverProjects() {
  const categories = ["Commercial", "Residential"]
  const projects = []

  for (const cat of categories) {
    const catDir = path.join(SOURCE_ROOT, cat)
    if (!fs.existsSync(catDir)) continue

    const locations = fs.readdirSync(catDir, { withFileTypes: true })
    for (const loc of locations) {
      if (!loc.isDirectory()) continue
      const locDir = path.join(catDir, loc.name)
      const projectDirs = fs.readdirSync(locDir, { withFileTypes: true })

      for (const proj of projectDirs) {
        if (!proj.isDirectory()) continue
        const projDir = path.join(locDir, proj.name)
        const allFiles = fs.readdirSync(projDir, { withFileTypes: true })

        const imageFiles = allFiles
          .filter((f) => {
            if (f.isDirectory()) return false
            const ext = path.extname(f.name).toLowerCase()
            return [".jpg", ".jpeg", ".png", ".webp"].includes(ext)
          })
          .map((f) => f.name)
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))

        const otherFiles = allFiles
          .filter((f) => {
            if (f.isDirectory()) return false
            const ext = path.extname(f.name).toLowerCase()
            return ![".jpg", ".jpeg", ".png", ".webp"].includes(ext)
          })
          .map((f) => f.name)

        projects.push({
          category: cat.toLowerCase(),
          location: loc.name,
          locationSlug: slugify(loc.name),
          projectName: proj.name,
          projectSlug: slugify(proj.name),
          sourceDir: projDir,
          imageFiles,
          otherFiles,
        })
      }
    }
  }

  return projects
}

async function processAllImages() {
  const projects = discoverProjects()
  console.log(`Discovered ${projects.length} project folders.\n`)

  const manifest = []
  let totalProcessed = 0

  for (const proj of projects) {
    if (proj.imageFiles.length === 0) {
      manifest.push({
        category: proj.category,
        location: proj.location,
        projectName: proj.projectName,
        imagesFound: 0,
        imagesIntegrated: 0,
        primaryImage: null,
        gallery: [],
        status: "Empty (0 images found in source folder)",
      })
      continue
    }

    const targetDir = path.join(DEST_ROOT, proj.locationSlug, proj.projectSlug)
    fs.mkdirSync(targetDir, { recursive: true })

    const usedNames = new Set()
    const processedImages = []

    for (const imgName of proj.imageFiles) {
      const srcPath = path.join(proj.sourceDir, imgName)
      const targetFilename = sanitizeFilename(imgName, usedNames)
      const targetPath = path.join(targetDir, targetFilename)
      const relativeUrl = `/images/properties/${proj.locationSlug}/${proj.projectSlug}/${targetFilename}`

      // Optimize image: auto-rotate based on EXIF, resize gracefully if > 1920, write progressive JPEG at q: 85
      const imagePipeline = sharp(srcPath).rotate()
      const meta = await imagePipeline.metadata()

      let transformer = imagePipeline
      if (meta.width && meta.height && (meta.width > 1920 || meta.height > 1920)) {
        transformer = transformer.resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
      }

      await transformer.jpeg({ quality: 85, progressive: true }).toFile(targetPath)

      const outputMeta = await sharp(targetPath).metadata()
      const outputStat = fs.statSync(targetPath)

      const isLandscape = (outputMeta.width || 0) >= (outputMeta.height || 0)
      const ratio = outputMeta.width && outputMeta.height ? outputMeta.width / outputMeta.height : 1

      processedImages.push({
        sourceName: imgName,
        targetFilename,
        relativeUrl,
        width: outputMeta.width,
        height: outputMeta.height,
        ratio,
        isLandscape,
        sizeKB: Math.round(outputStat.size / 1024),
      })

      totalProcessed++
    }

    // Select the best primary image:
    // 1. Explicitly named cover/main
    // 2. Best landscape exterior shot (highest resolution landscape)
    // 3. Fallback to first image
    let primary = processedImages.find(
      (img) => img.sourceName.toLowerCase().includes("cover") || img.sourceName.toLowerCase().includes("main")
    )

    if (!primary) {
      // Find landscape image with good resolution (aspect ratio >= 1.0)
      const landscapes = processedImages.filter((img) => img.isLandscape && img.ratio >= 1.0)
      if (landscapes.length > 0) {
        // Choose the largest/clearest landscape shot
        landscapes.sort((a, b) => b.width * b.height - a.width * a.height)
        primary = landscapes[0]
      } else {
        primary = processedImages[0]
      }
    }

    // Gallery ordering: Primary image first, followed by remaining images in natural order
    const gallery = [
      primary.relativeUrl,
      ...processedImages.filter((img) => img.relativeUrl !== primary.relativeUrl).map((img) => img.relativeUrl),
    ]

    manifest.push({
      category: proj.category,
      location: proj.location,
      projectName: proj.projectName,
      imagesFound: proj.imageFiles.length,
      imagesIntegrated: processedImages.length,
      primaryImage: primary.relativeUrl,
      primaryImageDetails: primary,
      gallery,
      allImages: processedImages,
      status: "Integrated",
    })

    console.log(
      `✓ [${proj.location}] ${proj.projectName}: ${processedImages.length} images processed. Primary: ${primary.targetFilename} (${primary.width}x${primary.height})`
    )
  }

  console.log(`\n==================================================================`)
  console.log(`Total images processed and integrated: ${totalProcessed}`)
  console.log(`==================================================================`)

  // Save manifest to JSON for downstream verification and data generation
  fs.writeFileSync("scripts/properties-manifest.json", JSON.stringify(manifest, null, 2))
}

processAllImages().catch((err) => {
  console.error("Image processing error:", err)
  process.exit(1)
})
