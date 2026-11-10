"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ChevronLeft, ChevronRight, Camera, MapPin, ArrowRight } from "lucide-react"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import type { PropertyData } from "@/lib/data"

interface RentListingCardProps {
  property: PropertyData
  compact?: boolean
  highlighted?: boolean
  onHover?: (id: number | null) => void
}

export function RentListingCard({
  property,
  compact = false,
  highlighted = false,
  onHover,
}: RentListingCardProps) {
  const [saved, setSaved] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const href = `/rent/${property.id}`
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
      `Hello Anju ji, I am interested in renting ${property.address}, ${property.city} (${displayRent}). Please share more details and arrange a site visit.`
    )
    window.open(`https://wa.me/917767805544?text=${msg}`, "_blank")
  }

  // Format monthly rent display cleanly
  const displayRent = (() => {
    if (property.rentPrice) return property.rentPrice
    if (property.priceNum && property.priceNum < 500000) {
      return `₹${property.priceNum.toLocaleString("en-IN")} / mo`
    }
    if (property.price && property.price.toLowerCase().includes("/mo")) {
      return property.price
    }
    if (property.price && property.price !== "Contact for Price") {
      return `${property.price} / mo`
    }
    return "Rent on Request"
  })()

  // Meaningful tag or badge
  const badge = (() => {
    if (property.tag && !["for rent", "for sale"].includes(property.tag.toLowerCase())) {
      return property.tag
    }
    if (property.isFeatured) return "Featured Rental"
    if (property.furnishing) return property.furnishing
    return null
  })()

  // Specs: Beds, Baths, Area
  const specs: string[] = []
  if (property.beds > 0) specs.push(`${property.beds} BHK`)
  if (property.baths > 0) specs.push(`${property.baths} ${property.baths === 1 ? "Bath" : "Baths"}`)
  if (property.sqft && property.sqft !== "On Request") specs.push(`${property.sqft} sqft`)

  // Furnishing & Availability
  const statusDetails: string[] = []
  if (property.furnishing) statusDetails.push(property.furnishing)
  if (property.availableFrom) statusDetails.push(property.availableFrom)
  else statusDetails.push("Ready to Move")

  // ── Compact Card for Map Mode Sidebar ──────────────────────
  if (compact) {
    return (
      <Link
        href={href}
        className={`flex gap-3 px-4 py-3.5 transition-colors border-b border-border/60 ${
          highlighted ? "bg-primary/5" : "hover:bg-muted/40"
        }`}
        onMouseEnter={() => onHover?.(property.id)}
        onMouseLeave={() => onHover?.(null)}
      >
        <div className="relative w-24 h-18 rounded-md overflow-hidden bg-muted shrink-0">
          <Image
            src={images[0]}
            alt={property.address}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
        <div className="min-w-0 flex-1 flex flex-col justify-center gap-0.5">
          <p className="text-[15px] font-semibold text-foreground tracking-tight truncate">
            {displayRent}
          </p>
          <p className="text-[13px] font-medium text-foreground truncate">
            {property.address}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {property.locality ? `${property.locality}, ` : ""}{property.city}
            {specs.length > 0 ? ` · ${specs.join(" · ")}` : ""}
          </p>
          {statusDetails.length > 0 && (
            <p className="text-[11px] text-muted-foreground/80 truncate">
              {statusDetails.join(" · ")}
            </p>
          )}
        </div>
      </Link>
    )
  }

  // ── Full Card for Grid View ────────────────────────────────
  return (
    <article
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-border/80 bg-card shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 h-full"
      onMouseEnter={() => {
        setIsHovered(true)
        onHover?.(property.id)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        onHover?.(null)
      }}
    >
      {/* 1. Actual Rental Property Photograph */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted select-none">
        <Link href={href} className="block w-full h-full">
          <Image
            src={images[imgIndex]}
            alt={`${property.address}, ${property.city}`}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* Meaningful Badge Only */}
        {badge && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide backdrop-blur-md bg-white/95 dark:bg-neutral-900/90 text-neutral-900 dark:text-neutral-100 border border-black/5 dark:border-white/10 shadow-xs">
              {badge}
            </span>
          </div>
        )}

        {/* Save Wishlist Heart */}
        <button
          type="button"
          onClick={toggleSave}
          aria-label={saved ? "Remove from saved rentals" : "Save rental property"}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/30 hover:bg-black/55 text-white transition-all active:scale-90 shadow-xs"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              saved ? "fill-rose-500 text-rose-500" : "text-white"
            }`}
          />
        </button>

        {/* Photo Count */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium backdrop-blur-md bg-black/60 text-white shadow-xs">
              <Camera className="h-3 w-3" />
              {imgIndex + 1}/{images.length}
            </span>
          </div>
        )}

        {/* Gallery Navigation Arrows on Hover */}
        {images.length > 1 && isHovered && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="hidden sm:flex absolute left-2.5 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white/95 text-neutral-800 hover:bg-white hover:scale-105 shadow-md transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="hidden sm:flex absolute right-2.5 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white/95 text-neutral-800 hover:bg-white hover:scale-105 shadow-md transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* 2. Monthly Rental Price & Body */}
      <div className="flex flex-col flex-1 p-6">
        {/* Monthly Rent */}
        <p className="text-2xl font-bold tracking-tight text-foreground">
          {displayRent}
        </p>

        {/* Clean Typographic Specs Line — airy, readable, no cramped boxes */}
        <p className="text-[13px] font-medium text-muted-foreground mt-1.5 tracking-normal">
          {specs.length > 0 ? (
            `${specs.join("  ·  ")}${property.furnishing ? `  ·  ${property.furnishing}` : ""}`
          ) : (
            `${property.type || "Rental"}  ·  ${property.locality || property.city}${property.furnishing ? `  ·  ${property.furnishing}` : ""}`
          )}
        </p>

        {/* Property or Project Name */}
        <Link href={href} className="block mt-4 group/title">
          <h3 className="text-lg font-semibold text-foreground tracking-tight leading-snug group-hover/title:text-primary transition-colors line-clamp-1">
            {property.address}
          </h3>
        </Link>

        {/* Locality and City */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground/75 shrink-0" />
          <span className="truncate">
            {property.locality ? `${property.locality}, ` : ""}{property.city}
          </span>
        </div>

        {/* Refined Footer Action */}
        <div className="flex items-center justify-between pt-4 mt-6 border-t border-border/60">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-primary transition-colors"
          >
            <span>View Rental</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            onClick={openWhatsApp}
            title="Chat on WhatsApp"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 transition-colors py-1 px-2.5 rounded-md"
          >
            <WhatsAppIcon className="h-3.5 w-3.5 fill-[#25D366] shrink-0" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </article>
  )
}

