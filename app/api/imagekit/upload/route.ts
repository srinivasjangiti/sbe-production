import { NextRequest, NextResponse } from "next/server"
import { verifySessionToken, getSessionSecret, isValidOrigin } from "@/lib/auth-tokens"

const IK_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload"

// Strict whitelist of safe raster image MIME types
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
])

// Strict whitelist of allowed file extensions
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"])

// Maximum upload file size: 15 MB
const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024

export async function POST(req: NextRequest) {
  // 1. CSRF Protection for state-changing upload
  if (!isValidOrigin(req.headers.get("origin"), req.headers.get("host"))) {
    return NextResponse.json({ ok: false, error: "Cross-site request blocked." }, { status: 403 })
  }

  // 2. Enforce Server-Side Admin Authentication
  const token = req.cookies.get("sbe_admin_session")?.value
  if (!token) {
    return NextResponse.json({ ok: false, error: "Unauthorized. Admin session required." }, { status: 401 })
  }

  let session: { valid: boolean; username?: string } = { valid: false }
  try {
    session = await verifySessionToken(token, getSessionSecret())
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized. Authentication service unavailable." }, { status: 401 })
  }
  if (!session.valid) {
    return NextResponse.json({ ok: false, error: "Unauthorized. Invalid or expired admin session." }, { status: 401 })
  }

  // 3. Parse Multipart Form Data
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid multipart form data." }, { status: 400 })
  }

  // 4. Validate File Parameter
  const file = formData.get("file")
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ ok: false, error: "No file provided in the upload request." }, { status: 400 })
  }

  // Validate non-empty file
  if (file.size === 0) {
    return NextResponse.json({ ok: false, error: "Uploaded file is empty (0 bytes)." }, { status: 400 })
  }

  // 5. Validate MIME Type
  const mimeType = (file.type || "").toLowerCase().trim()
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    return NextResponse.json(
      { ok: false, error: "Invalid image format. Allowed formats: JPEG, PNG, WebP, AVIF." },
      { status: 415 }
    )
  }

  // 6. Validate File Size
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      { ok: false, error: "File exceeds the maximum allowed size limit of 15 MB." },
      { status: 413 }
    )
  }

  // 7. Sanitize File Name and Extension
  const rawName = (file instanceof File ? file.name : "upload.jpg").trim()
  const lastDot = rawName.lastIndexOf(".")
  const ext = lastDot >= 0 ? rawName.slice(lastDot).toLowerCase() : ".jpg"

  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json(
      { ok: false, error: "Invalid file extension. Allowed extensions: .jpg, .jpeg, .png, .webp, .avif." },
      { status: 415 }
    )
  }

  const baseName = lastDot > 0 ? rawName.slice(0, lastDot) : "photo"
  const sanitizedBase = baseName.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 60) || "photo"
  const safeFileName = `${sanitizedBase}${ext}`

  // 8. Validate Server-Side ImageKit Configuration
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY?.trim()
  if (!privateKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "Image upload service is currently unavailable. Image storage service is not configured on the server.",
      },
      { status: 503 }
    )
  }

  // 9. Forward to ImageKit via REST API with Base64 encoding
  try {
    const arrayBuffer = await file.arrayBuffer()
    const base64File = Buffer.from(arrayBuffer).toString("base64")

    const ikBody = new FormData()
    ikBody.append("file", base64File)
    ikBody.append("fileName", safeFileName)
    ikBody.append("folder", "/properties")
    ikBody.append("useUniqueFileName", "true")

    // ImageKit uses HTTP Basic Auth: privateKey as username, empty password
    const credentials = Buffer.from(`${privateKey}:`).toString("base64")

    const ikRes = await fetch(IK_UPLOAD_URL, {
      method: "POST",
      headers: { Authorization: `Basic ${credentials}` },
      body: ikBody,
    })

    if (!ikRes.ok) {
      let upstreamMessage = "ImageKit upload failed."
      try {
        const errJson = await ikRes.json()
        if (errJson && typeof errJson.message === "string") {
          upstreamMessage = errJson.message
        }
      } catch {
        // Fallback to generic upstream error
      }
      console.error(`ImageKit API returned HTTP ${ikRes.status}: ${upstreamMessage}`)
      return NextResponse.json({ ok: false, error: upstreamMessage }, { status: 502 })
    }

    const data = await ikRes.json()

    // Return optimized CDN URL with responsive transformations
    const url = `${data.url}?tr=w-800,h-600,q-85,fo-auto`

    return NextResponse.json({
      ok: true,
      url,
      fileId: data.fileId,
      name: data.name,
    })
  } catch (error) {
    console.error("Unhandled ImageKit upload exception:", error)
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred while communicating with the image storage service." },
      { status: 502 }
    )
  }
}
