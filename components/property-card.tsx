"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ChevronLeft, ChevronRight, MessageCircle, MapPin, ArrowRight, Camera } from "lucide-react"
import type { PropertyData } from "@/lib/data"

export function PropertyCard({ property }: { property: PropertyData }) {
  const [saved, setSaved] = useState(false)
  const [activeImgIndex, setActiveImgIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const detailHref = property.isRental
    ? `/rent/${property.id}`
    : `/buy/${property.id}`

  const images = property.images && property.images.length > 0
    ? property.images
    : [property.image]

  const handleNextImg = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrevImg = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSaved(!saved)
  }

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const msg = encodeURIComponent(
      `Hello Anju ji, I am interested in ${property.address}, ${property.city} (${property.price}). Please share more details and floor plans.`
    )
    window.open(`https://wa.me/917767805544?text=${msg}`, "_blank")
  }

  // Single status badge logic: never display duplicate "FOR SALE For Sale"
  const statusBadge = (() => {
    if (property.tag && !["for sale", "for rent"].includes(property.tag.toLowerCase())) {
      return property.tag
    }
    return property.isRental ? "For Rent" : "For Sale"
  })()

  // Format property type label
  const typeLabel = property.type || (property.isRental ? "Rental" : "Apartment")

  // Specs: show only what actually exists — never fabricate
  const specs: string[] = []
  if (property.beds > 0) specs.push(`${property.beds} BHK`)
  if (property.baths > 0) specs.push(`${property.baths} ${property.baths === 1 ? "Bath" : "Baths"}`)
  if (property.sqft && property.sqft !== "On Request") specs.push(`${property.sqft} sqft`)

  return (
    <article
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-border/70 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Photo Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted select-none">
        <Link href={detailHref} className="block w-full h-full">
          <Image
            src={images[activeImgIndex]}
            alt={`${property.address}, ${property.city}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* Single Status Badge */}
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-neutral-900/80 text-white backdrop-blur-md shadow-xs">
            {statusBadge}
          </span>
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleSave}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all active:scale-90 shadow-xs"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              saved
                ? "fill-rose-500 text-rose-500"
                : "text-white stroke-[2]"
            }`}
          />
        </button>

        {/* Photo Count Tag */}
        {images.length > 1 && (
          <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-medium backdrop-blur-xs">
              <Camera className="h-3 w-3" />
              {activeImgIndex + 1}/{images.length}
            </span>
          </div>
        )}

        {/* In-Card Carousel Arrows */}
        {images.length > 1 && isHovered && (
          <div className="hidden sm:flex items-center justify-between absolute inset-x-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <button
              type="button"
              onClick={handlePrevImg}
              aria-label="Previous image"
              className="pointer-events-auto p-1.5 rounded-full bg-white/95 text-neutral-800 hover:bg-white hover:scale-105 shadow-md transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNextImg}
              aria-label="Next image"
              className="pointer-events-auto p-1.5 rounded-full bg-white/95 text-neutral-800 hover:bg-white hover:scale-105 shadow-md transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Listing Content Body */}
      <div className="flex flex-col flex-1 p-6">
        {/* Marketplace Price */}
        <p className="text-2xl font-bold text-foreground tracking-tight">
          {property.price === "Contact for Price" ? "Price on Request" : property.price}
        </p>

        {/* Clean Typographic Specs Line */}
        <p className="text-[13px] font-medium text-muted-foreground mt-1.5 tracking-normal">
          {specs.length > 0 ? (
            specs.join("  ·  ")
          ) : (
            `${typeLabel}  ·  ${property.locality || property.city}`
          )}
        </p>

        {/* Property Title / Address */}
        <Link href={detailHref} className="block mt-4 group/title">
          <h3 className="text-lg font-semibold text-foreground tracking-tight leading-snug group-hover/title:text-primary transition-colors line-clamp-1">
            {property.address}
          </h3>
        </Link>

        {/* Locality */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground/75 shrink-0" />
          <span className="truncate">
            {property.locality ? `${property.locality}, ` : ""}{property.city}
          </span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 mt-6 border-t border-border/60">
          <Link
            href={detailHref}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-primary transition-colors"
          >
            <span>View Property</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            onClick={handleWhatsApp}
            title="Chat on WhatsApp"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1 px-2 rounded-md hover:bg-emerald-500/10"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </article>
  )
}
