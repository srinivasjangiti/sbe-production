"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Heart, Share2, ChevronLeft, ChevronRight, MapPin,
  BedDouble, Bath, Maximize, Calendar, Home, Check,
  Grid, X, Phone, Mail, Shield, Building2, CheckCircle2,
  Clock, ArrowRight, MessageCircle
} from "lucide-react"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { formatAddress } from "@/lib/data"
import { getPropertyById, getSimilarProperties, saveInquiry, nextInquiryId } from "@/lib/admin-store"
import { PropertyData } from "@/lib/data"
import { AnimatePresence, motion } from "motion/react"

export function PropertyDetailClient({
  initialProperty,
  initialSimilar,
  id,
  type
}: {
  initialProperty?: PropertyData
  initialSimilar: PropertyData[]
  id: number
  type: "buy" | "rent"
}) {
  const [property, setProperty] = useState<PropertyData | undefined>(initialProperty)
  const [similar, setSimilar] = useState<PropertyData[]>(initialSimilar)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [selectedDayIdx, setSelectedDayIdx] = useState(0)

  useEffect(() => {
    const prop = getPropertyById(id)
    if (prop) setProperty(prop)
    const sim = getSimilarProperties(id, type)
    if (sim.length) setSimilar(sim)
  }, [id, type])

  // Visit day options
  const today = new Date()
  const fmt = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })
  const tourDays = [today, new Date(today.getTime() + 86400000), new Date(today.getTime() + 172800000)]

  // Lightbox keyboard shortcuts
  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!property) return
      const images = property.images || [property.image]
      if (e.key === "Escape") setLightboxIndex(null)
      if (e.key === "ArrowRight") setLightboxIndex((prev) => ((prev ?? 0) + 1) % images.length)
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => ((prev ?? 0) - 1 + images.length) % images.length)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIndex, property])

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <h1 className="text-xl font-bold text-foreground mb-2">Property Not Found</h1>
        <p className="text-sm text-muted-foreground mb-6">The listing you requested could not be located.</p>
        <Link href={`/${type}`}>
          <Button>View All Properties</Button>
        </Link>
      </div>
    )
  }

  const images = property.images && property.images.length > 0
    ? property.images
    : [property.image]

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: property.address,
          text: `${property.address} in ${property.city} - Shree Balaji Enterprises`,
          url: window.location.href,
        })
        return
      } catch {}
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleWhatsAppInquiry = () => {
    if (contactName.trim() || contactPhone.trim()) {
      saveInquiry({
        id: nextInquiryId(),
        name: contactName || "Website Visitor",
        phone: contactPhone,
        email: "",
        interest: `${property.address}, ${property.city}`,
        message: `Preferred inspection day: ${fmt(tourDays[selectedDayIdx])}`,
        status: "new",
        date: new Date().toISOString(),
      })
    }

    const dayText = fmt(tourDays[selectedDayIdx])
    const msg = encodeURIComponent(
      `Hello Anju ji,\nI am interested in ${property.address}, ${property.city} (${property.price}).\n` +
      `Name: ${contactName || "Interested Buyer"}\n` +
      `Phone: ${contactPhone || "Not provided"}\n` +
      `Preferred site visit day: ${dayText}\n` +
      `Please share the floor plan and property details.`
    )
    window.open(`https://wa.me/917767805544?text=${msg}`, "_blank")
  }

  return (
    <>
      <main className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6 pb-24">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
            <nav className="flex items-center gap-1.5 truncate">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link href={`/${type}`} className="hover:text-foreground capitalize">{type}</Link>
              <span>/</span>
              <span className="text-foreground font-medium truncate">{property.city}</span>
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium text-foreground transition-colors"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>{copied ? "Link Copied" : "Share"}</span>
              </button>
              <button
                type="button"
                onClick={() => setSaved(!saved)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium text-foreground transition-colors"
              >
                <Heart className={`h-3.5 w-3.5 ${saved ? "fill-rose-500 text-rose-500" : ""}`} />
                <span>{saved ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
            {property.address}
          </h1>

          <div className="flex items-center gap-2 mt-1.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">★ 5.0</span>
            <span>·</span>
            <span>{property.city}, Maharashtra</span>
            <span>·</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">RERA A51700023633</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* AIRBNB 5-PHOTO GRID                                                       */}
        {/* ========================================================================= */}
        <div className="mb-10">
          {images.length >= 5 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden h-[360px] md:h-[460px] relative">
              {/* Photo 1 (Big Left) */}
              <div
                onClick={() => setLightboxIndex(0)}
                className="md:col-span-2 relative h-full overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-800"
              >
                <Image
                  src={images[0]}
                  alt={`${property.address} - Photo 1`}
                  fill
                  className="object-cover hover:brightness-95 transition-all"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Photos 2 & 3 */}
              <div className="hidden md:flex flex-col gap-2 h-full">
                <div
                  onClick={() => setLightboxIndex(1)}
                  className="relative flex-1 overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-800"
                >
                  <Image
                    src={images[1]}
                    alt={`${property.address} - Photo 2`}
                    fill
                    className="object-cover hover:brightness-95 transition-all"
                    sizes="25vw"
                  />
                </div>
                <div
                  onClick={() => setLightboxIndex(2)}
                  className="relative flex-1 overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-800"
                >
                  <Image
                    src={images[2]}
                    alt={`${property.address} - Photo 3`}
                    fill
                    className="object-cover hover:brightness-95 transition-all"
                    sizes="25vw"
                  />
                </div>
              </div>

              {/* Photos 4 & 5 */}
              <div className="hidden md:flex flex-col gap-2 h-full">
                <div
                  onClick={() => setLightboxIndex(3)}
                  className="relative flex-1 overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-800"
                >
                  <Image
                    src={images[3]}
                    alt={`${property.address} - Photo 4`}
                    fill
                    className="object-cover hover:brightness-95 transition-all"
                    sizes="25vw"
                  />
                </div>
                <div
                  onClick={() => setLightboxIndex(4)}
                  className="relative flex-1 overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-800"
                >
                  <Image
                    src={images[4]}
                    alt={`${property.address} - Photo 5`}
                    fill
                    className="object-cover hover:brightness-95 transition-all"
                    sizes="25vw"
                  />
                </div>
              </div>

              {/* Show All Photos Button */}
              <button
                type="button"
                onClick={() => setLightboxIndex(0)}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/95 text-neutral-900 text-xs font-semibold shadow-md border border-neutral-200 hover:bg-white active:scale-95 transition-all"
              >
                <Grid className="h-4 w-4" />
                <span>Show all {images.length} photos</span>
              </button>
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden h-[340px] md:h-[440px] bg-neutral-100 dark:bg-neutral-800">
              <Image
                src={images[0]}
                alt={property.address}
                fill
                className="object-cover cursor-pointer"
                onClick={() => setLightboxIndex(0)}
                priority
              />
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => setLightboxIndex(0)}
                  className="absolute bottom-4 right-4 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/95 text-neutral-900 text-xs font-semibold shadow-md border border-neutral-200 hover:bg-white"
                >
                  <Grid className="h-4 w-4" />
                  <span>Show all {images.length} photos</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* TWO-COLUMN DETAILS & CONTACT LAYOUT                                       */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Info Column (Left 65%) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* Real Estate Consultant Header */}
            <div className="flex items-center justify-between py-4 border-b border-border">
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Listing managed by {property.listingAgent?.name || "Anju Jangiti"}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Shree Balaji Enterprises · Licensed RERA Real Estate Consultant (Est. 2016)
                </p>
              </div>
              <div className="relative h-12 w-12 rounded-full overflow-hidden border border-border shrink-0">
                <Image
                  src={property.listingAgent?.image || "/images/logo.png"}
                  alt={property.listingAgent?.name || "Anju Jangiti"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Quick Specs Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 border-b border-border text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Type</p>
                <p className="font-semibold text-foreground capitalize mt-0.5">
                  {property.type || "Apartment"}
                </p>
              </div>
              {property.beds > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground">Bedrooms</p>
                  <p className="font-semibold text-foreground mt-0.5">
                    {property.beds} BHK
                  </p>
                </div>
              )}
              {property.baths > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground">Bathrooms</p>
                  <p className="font-semibold text-foreground mt-0.5">
                    {property.baths} Bath{property.baths > 1 ? "s" : ""}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground">Carpet Area</p>
                <p className="font-semibold text-foreground mt-0.5">
                  {property.sqft !== "On Request" ? `${property.sqft} sqft` : "On Request"}
                </p>
              </div>
            </div>

            {/* About the Listing */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">About this property</h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {property.description}
              </p>
              {property.daysOnMarket !== undefined && (
                <p className="text-xs text-muted-foreground mt-2">
                  Listed {property.daysOnMarket === 0 ? "today" : `${property.daysOnMarket} days ago`}
                </p>
              )}
            </div>

            {/* Amenities / What this place offers */}
            {property.features && property.features.length > 0 && (
              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-bold text-foreground mb-3">Amenities & Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5 text-sm text-neutral-800 dark:text-neutral-200">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location & Neighborhood */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-lg font-bold text-foreground mb-1">Locality</h3>
              <p className="text-xs text-neutral-500 mb-4">
                {property.address}, {property.city}, Maharashtra
              </p>
              <div className="p-4 rounded-xl border border-border bg-neutral-50 dark:bg-neutral-900/50 text-xs text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">Nearby Transit & Essentials:</p>
                <p>• Connected to local railway station and highway corridors</p>
                <p>• Schools, markets, and medical centers within 10–15 minutes</p>
              </div>
            </div>
          </div>

          {/* Sticky Inspection & Inquiry Card (Right 35%) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-20">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-md space-y-5">
              {/* Price Line */}
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-medium">Price</p>
                  <p className="text-2xl font-bold text-foreground">{property.price}</p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md">
                  No Brokerage on New Projects
                </span>
              </div>

              {/* Inquiry Inputs */}
              <div className="space-y-3 pt-2 border-t border-border">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Select a Site Visit Day
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {tourDays.map((d, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedDayIdx(i)}
                        className={`py-1.5 px-1 text-center rounded-md text-xs font-medium border transition-colors ${
                          selectedDayIdx === i
                            ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 border-neutral-900 dark:border-neutral-100 font-semibold"
                            : "bg-background text-neutral-700 dark:text-neutral-300 border-border hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        }`}
                      >
                        {fmt(d)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Enquire via WhatsApp</span>
                </button>

                <a
                  href="tel:7767805544"
                  className="w-full py-2.5 px-4 rounded-xl border border-border hover:bg-neutral-50 dark:hover:bg-neutral-900 text-foreground text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-neutral-500" />
                  <span>Call Agent: +91 77678 05544</span>
                </a>
              </div>

              {/* Genuine Trust Facts */}
              <div className="text-[11px] text-muted-foreground space-y-1 pt-2 border-t border-border">
                <p>• Verified MahaRERA Agency: A51700023633</p>
                <p>• Free site visit and doorstep consultation</p>
                <p>• Direct builder inventory pricing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Listings Section */}
        {similar.length > 0 && (
          <section className="mt-20 pt-10 border-t border-border">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Other properties in {property.city}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 text-white border-b border-white/10">
              <span className="text-xs font-medium">
                Photo {lightboxIndex + 1} of {images.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 relative flex items-center justify-center p-4">
              <div className="relative w-full max-w-4xl h-[70vh]">
                <Image
                  src={images[lightboxIndex]}
                  alt={`${property.address} - Photo ${lightboxIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((prev) => ((prev ?? 0) - 1 + images.length) % images.length)}
                    className="absolute left-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((prev) => ((prev ?? 0) + 1) % images.length)}
                    className="absolute right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
