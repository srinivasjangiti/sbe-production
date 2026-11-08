"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react"
import { motion } from "motion/react"
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

  return (
    <article
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={detailHref} className="block w-full">
        {/* Photo Container */}
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-3 select-none">
          <Image
            src={images[activeImgIndex]}
            alt={`${property.address}, ${property.city}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />

          {/* Genuine Status Badge */}
          {property.tag && (
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white/95 text-neutral-900 dark:bg-neutral-900/90 dark:text-neutral-100 shadow-sm backdrop-blur-xs">
                {property.tag}
              </span>
            </div>
          )}

          {/* Heart Button */}
          <button
            type="button"
            onClick={handleSave}
            aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 z-10 p-2 rounded-full transition-transform active:scale-90"
          >
            <Heart
              className={`h-5 w-5 drop-shadow-md transition-colors ${
                saved
                  ? "fill-rose-500 text-rose-500"
                  : "fill-black/30 text-white stroke-[2]"
              }`}
            />
          </button>

          {/* In-Card Carousel Arrows (Airbnb style on hover) */}
          {images.length > 1 && isHovered && (
            <div className="hidden sm:flex items-center justify-between absolute inset-x-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <button
                type="button"
                onClick={handlePrevImg}
                aria-label="Previous image"
                className="pointer-events-auto p-1.5 rounded-full bg-white/90 text-neutral-800 hover:bg-white hover:scale-105 shadow-md transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNextImg}
                aria-label="Next image"
                className="pointer-events-auto p-1.5 rounded-full bg-white/90 text-neutral-800 hover:bg-white hover:scale-105 shadow-md transition-all"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Carousel Pagination Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1 z-10 pointer-events-none">
              {images.slice(0, 5).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    activeImgIndex === i
                      ? "w-3 bg-white"
                      : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Listing Information (Clean, Authentic, Human) */}
        <div className="space-y-1">
          {/* Location & Star */}
          <div className="flex items-center justify-between text-[15px] font-semibold text-neutral-900 dark:text-neutral-100">
            <span className="truncate">{property.city}, Maharashtra</span>
            <span className="flex items-center gap-1 text-xs font-medium text-neutral-700 dark:text-neutral-300">
              ★ 5.0
            </span>
          </div>

          {/* Project Title */}
          <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
            {property.address}
          </p>

          {/* Specs / Configuration */}
          <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
            {property.beds > 0
              ? `${property.beds} BHK · ${property.baths} Bath · ${property.sqft !== "On Request" ? `${property.sqft} sqft` : "Spacious Layout"}`
              : property.type
                ? `${property.type} · Prime Location`
                : "Commercial / Residential"}
          </p>

          {/* Price & Action Row */}
          <div className="pt-1 flex items-center justify-between">
            <p className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-100">
              {property.price}
            </p>

            {/* Quick WhatsApp Link */}
            <button
              type="button"
              onClick={handleWhatsApp}
              className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </Link>
    </article>
  )
}
