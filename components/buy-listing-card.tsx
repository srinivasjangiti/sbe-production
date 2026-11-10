"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ChevronLeft, ChevronRight, MessageCircle, Camera } from "lucide-react"
import type { PropertyData } from "@/lib/data"

interface BuyListingCardProps {
  property: PropertyData
  compact?: boolean
  highlighted?: boolean
  onHover?: (id: number | null) => void
}

export function BuyListingCard({
  property,
  compact = false,
  highlighted = false,
  onHover,
}: BuyListingCardProps) {
  const [saved, setSaved] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const href = `/buy/${property.id}`
  const images = property.images?.length ? property.images : [property.image]

  const prev = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setImgIndex((i) => (i - 1 + images.length) % images.length)
  }
  const next = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setImgIndex((i) => (i + 1) % images.length)
  }
  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSaved(!saved)
  }
  const openWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const msg = encodeURIComponent(
      `Hello Anju ji, I am interested in ${property.address}, ${property.city} (${property.price}). Please share more details.`
    )
    window.open(`https://wa.me/917767805544?text=${msg}`, "_blank")
  }

  // Display "Price on Request" instead of repetitive "Contact for Price"
  const displayPrice =
    property.price === "Contact for Price" ? "Price on Request" : property.price

  // Show meaningful tag, or "Featured" badge if featured
  const tag = (() => {
    if (
      property.tag &&
      !["for sale", "for rent"].includes(property.tag.toLowerCase())
    ) {
      return property.tag
    }
    if (property.isFeatured) return "Featured"
    return null
  })()

  // Format type with first letter capitalized (e.g. "house" -> "House")
  const formattedType = property.type
    ? property.type.charAt(0).toUpperCase() + property.type.slice(1)
    : null

  // Specs: show only what actually exists — never fabricate
  const specs: string[] = []
  if (property.beds > 0) specs.push(`${property.beds} BHK`)
  if (property.baths > 0)
    specs.push(`${property.baths} ${property.baths === 1 ? "Bath" : "Baths"}`)
  if (property.sqft && property.sqft !== "On Request")
    specs.push(`${property.sqft} sqft`)

  // ── Compact card for map-mode sidebar ────────────────
  if (compact) {
    return (
      <Link
        href={href}
        className={`flex gap-3 px-4 py-3.5 transition-colors ${
          highlighted ? "bg-primary/5" : "hover:bg-muted/40"
        }`}
        onMouseEnter={() => onHover?.(property.id)}
        onMouseLeave={() => onHover?.(null)}
      >
        <div className="relative w-20 h-[56px] rounded overflow-hidden bg-muted shrink-0">
          <Image
            src={images[0]}
            alt={property.address}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div className="min-w-0 flex-1 flex flex-col justify-center gap-0.5">
          <p className="text-sm font-semibold text-foreground truncate">
            {displayPrice}
          </p>
          <p className="text-[13px] text-foreground truncate">
            {property.address}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {property.city}
            {specs.length > 0 ? ` · ${specs.join(" · ")}` : ""}
          </p>
        </div>
      </Link>
    )
  }

  // ── Full card for grid ───────────────────────────────
  return (
    <article
      className="group"
      onMouseEnter={() => {
        setIsHovered(true)
        onHover?.(property.id)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        onHover?.(null)
      }}
    >
      {/* ─ Photograph ─────────────────────────────────── */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted">
        <Link href={href} className="block w-full h-full">
          <Image
            src={images[imgIndex]}
            alt={`${property.address}, ${property.city}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* Meaningful tag only */}
        {tag && (
          <span className="absolute top-3 left-3 z-10 px-2 py-0.5 text-[11px] font-medium tracking-wide bg-white/90 text-neutral-800 rounded backdrop-blur-sm">
            {tag}
          </span>
        )}

        {/* Save */}
        <button
          type="button"
          onClick={toggleSave}
          aria-label={saved ? "Remove from saved" : "Save property"}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/25 hover:bg-black/45 text-white transition-colors"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              saved ? "fill-rose-500 text-rose-500" : "text-white"
            }`}
          />
        </button>

        {/* Photo count */}
        {images.length > 1 && (
          <span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] text-white bg-black/40 rounded backdrop-blur-sm">
            <Camera className="h-3 w-3" />
            {imgIndex + 1}/{images.length}
          </span>
        )}

        {/* Gallery arrows — visible on hover */}
        {images.length > 1 && isHovered && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-white/90 text-neutral-900 hover:bg-white shadow-sm transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-white/90 text-neutral-900 hover:bg-white shadow-sm transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* ─ Content — no container, just information ──── */}
      <div className="pt-3">
        <p className="text-[17px] font-semibold tracking-tight text-foreground leading-tight">
          {displayPrice}
        </p>

        <Link href={href}>
          <h3 className="text-[15px] font-medium text-foreground mt-0.5 group-hover:text-primary transition-colors leading-snug">
            {property.address}
          </h3>
        </Link>

        <p className="text-[13px] text-muted-foreground mt-0.5">
          {property.city}, Maharashtra
          {formattedType && property.beds === 0 ? ` · ${formattedType}` : ""}
        </p>

        {/* Show real specs, or first few features, or nothing */}
        {specs.length > 0 ? (
          <p className="text-[13px] text-muted-foreground mt-1">
            {specs.join(" · ")}
          </p>
        ) : property.features?.length ? (
          <p className="text-[13px] text-muted-foreground mt-1">
            {property.features.slice(0, 3).join(" · ")}
          </p>
        ) : null}

        {/* Actions — text links, not heavy buttons */}
        <div className="flex items-center gap-4 mt-3">
          <Link
            href={href}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View Details →
          </Link>
          <button
            type="button"
            onClick={openWhatsApp}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-emerald-600 transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </article>
  )
}

