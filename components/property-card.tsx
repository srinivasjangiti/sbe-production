"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ChevronLeft, ChevronRight, MessageCircle, MapPin, ArrowRight, Bed, Bath, Maximize2, Camera, Building2, CheckCircle2 } from "lucide-react"
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

  return (
    <article
      className="group relative flex flex-col rounded-xl overflow-hidden border border-border/80 bg-card shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 h-full"
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
      <div className="flex flex-col flex-1 p-4">
        {/* Marketplace Price Line */}
        <div className="flex items-baseline justify-between gap-2 mb-1.5">
          <span className="text-xl font-bold text-foreground tracking-tight">
            {property.price}
          </span>
          <span className="text-[11px] font-medium text-muted-foreground bg-muted/70 px-2 py-0.5 rounded">
            {typeLabel}
          </span>
        </div>

        {/* Property Title / Address */}
        <Link href={detailHref} className="block group-hover:text-primary transition-colors">
          <h3 className="text-base font-semibold text-foreground leading-snug line-clamp-1 group-hover:text-primary transition-colors">
            {property.address}
          </h3>
        </Link>

        {/* Locality with Map Pin */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1 mb-3">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground/80 shrink-0" />
          <span className="truncate">{property.city}, Maharashtra</span>
        </div>

        {/* Real Estate Specifications Strip - Non-fabricated & relevant */}
        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-lg bg-muted/40 border border-border/60 text-xs mb-3.5 mt-auto">
          {property.beds > 0 ? (
            <>
              <div className="flex items-center gap-1.5 text-muted-foreground truncate">
                <Bed className="h-3.5 w-3.5 text-foreground/70 shrink-0" />
                <span className="font-semibold text-foreground text-[11px]">
                  {property.beds} BHK
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground truncate">
                <Bath className="h-3.5 w-3.5 text-foreground/70 shrink-0" />
                <span className="font-semibold text-foreground text-[11px]">
                  {property.baths > 0 ? `${property.baths} Bath` : "Bath on req."}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground truncate">
                <Maximize2 className="h-3.5 w-3.5 text-foreground/70 shrink-0" />
                <span className="font-semibold text-foreground text-[11px] truncate">
                  {property.sqft && property.sqft !== "On Request" ? `${property.sqft} sqft` : "Area on req."}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5 text-muted-foreground truncate">
                <Building2 className="h-3.5 w-3.5 text-foreground/70 shrink-0" />
                <span className="font-semibold text-foreground text-[11px] truncate">
                  {property.category === "commercial" || property.type?.toLowerCase().includes("office") || property.type?.toLowerCase().includes("shop")
                    ? (property.type || "Commercial")
                    : (property.features?.[0] || "Residential")}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground truncate">
                <Maximize2 className="h-3.5 w-3.5 text-foreground/70 shrink-0" />
                <span className="font-semibold text-foreground text-[11px] truncate">
                  {property.sqft && property.sqft !== "On Request" ? `${property.sqft} sqft` : "Area on req."}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground truncate">
                <CheckCircle2 className="h-3.5 w-3.5 text-foreground/70 shrink-0" />
                <span className="font-semibold text-foreground text-[11px] truncate">
                  {property.features?.[2] || property.features?.[1] || "Ready to Move"}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-2 pt-2.5 border-t border-border/60">
          <Link
            href={detailHref}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-3 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs"
          >
            <span>View Details</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
          <button
            type="button"
            onClick={handleWhatsApp}
            title="Chat on WhatsApp"
            className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 border border-emerald-600/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-semibold transition-all"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>
        </div>
      </div>
    </article>
  )
}
