"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import {
  Search,
  X,
  Building2,
  LayoutGrid,
  Map,
  ShieldCheck,
  Phone,
  ArrowRight,
  MessageCircle,
} from "lucide-react"
import { RentListingCard } from "@/components/rent-listing-card"
import { RentFilters, DEFAULT_RENT_FILTERS, type RentFilterState } from "@/components/rent-filters"
import { MapView } from "@/components/map-view"
import { useRentProperties } from "@/hooks/use-properties"
import { saveInquiry, nextInquiryId } from "@/lib/admin-store"
import { CURATED_RENT_PROPERTIES } from "@/lib/rent-data"

function RentPageContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") ?? ""
  const initialLocation = searchParams.get("location") ?? ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [hoveredPropertyId, setHoveredPropertyId] = useState<number | null>(null)
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null)

  const [filters, setFilters] = useState<RentFilterState>({
    ...DEFAULT_RENT_FILTERS,
    location: initialLocation,
  })

  // Advisory Inquiry Form State
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [preferredLocality, setPreferredLocality] = useState("")
  const [monthlyBudget, setMonthlyBudget] = useState("")
  const [enquirySuccess, setEnquirySuccess] = useState(false)

  // Get properties from admin store (localStorage)
  const liveAdminRentals = useRentProperties()

  // Merge admin store properties with curated baseline so the marketplace is always populated
  const allProperties = useMemo(() => {
    if (liveAdminRentals && liveAdminRentals.length > 0) {
      const adminIds = new Set(liveAdminRentals.map((p) => p.id))
      const combined = [
        ...liveAdminRentals,
        ...CURATED_RENT_PROPERTIES.filter((p) => !adminIds.has(p.id)),
      ]
      return combined
    }
    return CURATED_RENT_PROPERTIES
  }, [liveAdminRentals])

  const handleResetFilters = () => {
    setSearchQuery("")
    setFilters(DEFAULT_RENT_FILTERS)
  }

  // Multi-dimensional Rental Filter Engine
  const filtered = useMemo(() => {
    let result = allProperties.slice()

    // 1. Text Search Query
    if (searchQuery.trim()) {
      const words = searchQuery.toLowerCase().trim().split(/\s+/)
      result = result.filter((p) => {
        const fullText = [
          p.address,
          p.city,
          p.locality ?? "",
          p.state ?? "",
          p.type ?? "",
          p.tag ?? "",
          p.description ?? "",
          ...(p.features ?? []),
        ]
          .join(" ")
          .toLowerCase()
        return words.every((word) => fullText.includes(word))
      })
    }

    // 2. Location Filter
    if (filters.location) {
      const loc = filters.location.toLowerCase()
      if (loc === "other") {
        result = result.filter(
          (p) => !["ambernath", "badlapur", "dombivli", "kalyan"].includes(p.city.toLowerCase())
        )
      } else {
        result = result.filter(
          (p) =>
            p.city.toLowerCase() === loc ||
            p.address.toLowerCase().includes(loc) ||
            (p.locality && p.locality.toLowerCase().includes(loc)) ||
            (p.description && p.description.toLowerCase().includes(loc))
        )
      }
    }

    // 3. Monthly Rent Filter
    if (filters.rentOnRequestOnly) {
      result = result.filter((p) => !p.priceNum || p.price.toLowerCase().includes("request"))
    } else {
      if (filters.rentMin) {
        const minVal = Number(filters.rentMin)
        result = result.filter((p) => typeof p.priceNum === "number" && p.priceNum >= minVal)
      }
      if (filters.rentMax) {
        const maxVal = Number(filters.rentMax)
        result = result.filter((p) => typeof p.priceNum === "number" && p.priceNum <= maxVal)
      }
    }

    // 4. Bedrooms Filter
    if (filters.bedsMin) {
      const minBeds = Number(filters.bedsMin)
      result = result.filter((p) => p.beds >= minBeds)
    }

    // 5. Bathrooms Filter
    if (filters.bathsMin) {
      const minBaths = Number(filters.bathsMin)
      result = result.filter((p) => p.baths >= minBaths)
    }

    // 6. Property Type Filter
    if (filters.propertyType.length > 0) {
      result = result.filter((p) => {
        return filters.propertyType.some((type) => {
          const t = type.toLowerCase()
          if (t.includes("apartment")) {
            return (
              p.type?.toLowerCase().includes("apartment") ||
              p.features?.some((f) => f.toLowerCase().includes("bhk") || f.toLowerCase().includes("flat"))
            )
          }
          if (t.includes("commercial") || t.includes("shop")) {
            return (
              p.category === "commercial" ||
              p.type?.toLowerCase().includes("commercial") ||
              p.type?.toLowerCase().includes("shop") ||
              p.type?.toLowerCase().includes("office")
            )
          }
          if (t.includes("industrial")) {
            return (
              p.category === "industrial" ||
              p.type?.toLowerCase().includes("industrial") ||
              p.type?.toLowerCase().includes("shed")
            )
          }
          if (t.includes("house") || t.includes("villa")) {
            return (
              p.type?.toLowerCase().includes("house") ||
              p.type?.toLowerCase().includes("villa") ||
              p.type?.toLowerCase().includes("bungalow")
            )
          }
          return p.type?.toLowerCase() === t
        })
      })
    }

    // 7. Furnishing Status Filter
    if (filters.furnishing.length > 0) {
      result = result.filter((p) => {
        if (!p.furnishing) return false
        return filters.furnishing.some((f) =>
          p.furnishing?.toLowerCase().includes(f.toLowerCase())
        )
      })
    }

    // 8. Availability Filter
    if (filters.availability.length > 0) {
      result = result.filter((p) => {
        const avail = (p.availableFrom || "").toLowerCase()
        return filters.availability.some((a) => {
          if (a === "Immediate") return avail.includes("immediate") || avail.includes("ready")
          if (a === "15-days") return avail.includes("15") || avail.includes("immediate")
          if (a === "30-days") return avail.includes("30") || avail.includes("15") || avail.includes("immediate")
          return true
        })
      })
    }

    // 9. Security Deposit Filter
    if (filters.depositRange) {
      result = result.filter((p) => {
        if (!p.securityDeposit) return true
        const num = parseInt(p.securityDeposit.replace(/[^0-9]/g, ""), 10)
        if (isNaN(num)) return true
        if (filters.depositRange === "under-50k") return num < 50000
        if (filters.depositRange === "50k-100k") return num >= 50000 && num <= 100000
        if (filters.depositRange === "above-100k") return num > 100000
        return true
      })
    }

    // 10. Carpet Area Filter
    if (filters.sqftRange) {
      result = result.filter((p) => {
        const sqftNum = parseInt((p.sqft || "").replace(/[^0-9]/g, ""), 10)
        if (isNaN(sqftNum)) return false
        if (filters.sqftRange === "under-500") return sqftNum < 500
        if (filters.sqftRange === "500-1000") return sqftNum >= 500 && sqftNum <= 1000
        if (filters.sqftRange === "1000-1500") return sqftNum >= 1000 && sqftNum <= 1500
        if (filters.sqftRange === "1500-plus") return sqftNum >= 1500
        return true
      })
    }

    // 11. Amenities Filter
    if (filters.amenities.length > 0) {
      result = result.filter((p) => {
        const feats = (p.features || []).map((f) => f.toLowerCase())
        return filters.amenities.every((amenity) => {
          const aLower = amenity.toLowerCase()
          if (aLower.includes("security")) {
            return feats.some((f) => f.includes("security") || f.includes("cctv") || f.includes("gated"))
          }
          if (aLower.includes("elevator") || aLower.includes("lift")) {
            return feats.some((f) => f.includes("lift") || f.includes("elevator"))
          }
          if (aLower.includes("power")) {
            return feats.some((f) => f.includes("power") || f.includes("backup"))
          }
          if (aLower.includes("parking")) {
            return feats.some((f) => f.includes("parking"))
          }
          if (aLower.includes("water")) {
            return feats.some((f) => f.includes("water"))
          }
          if (aLower.includes("clubhouse")) {
            return feats.some((f) => f.includes("clubhouse") || f.includes("gym"))
          }
          return false
        })
      })
    }

    // 12. Sorting
    result.sort((a, b) => {
      if (filters.sortBy === "Rent: Low to High") {
        const rentA = a.priceNum ?? Infinity
        const rentB = b.priceNum ?? Infinity
        return rentA - rentB
      }
      if (filters.sortBy === "Rent: High to Low") {
        const rentA = a.priceNum ?? -1
        const rentB = b.priceNum ?? -1
        return rentB - rentA
      }
      if (filters.sortBy === "Newest First") {
        const daysA = a.daysOnMarket ?? 999
        const daysB = b.daysOnMarket ?? 999
        if (daysA !== daysB) return daysA - daysB
        return b.id - a.id
      }
      // Default: "Featured"
      if (a.isFeatured && !b.isFeatured) return -1
      if (!a.isFeatured && b.isFeatured) return 1
      return b.id - a.id
    })

    return result
  }, [allProperties, searchQuery, filters])

  // Check if any filter is active
  const isAnyFilterActive = Boolean(
    searchQuery ||
    filters.location ||
    filters.rentMin ||
    filters.rentMax ||
    filters.rentOnRequestOnly ||
    filters.bedsMin ||
    filters.bathsMin ||
    filters.propertyType.length > 0 ||
    filters.furnishing.length > 0 ||
    filters.availability.length > 0 ||
    filters.depositRange ||
    filters.sqftRange ||
    filters.amenities.length > 0
  )

  // Formatted location display
  const locationDisplay =
    filters.location === "Other" ? "other MMR locations" : filters.location

  // Handle Enquiry submission
  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() && !phone.trim()) return

    saveInquiry({
      id: nextInquiryId(),
      name: name.trim() || "Prospective Tenant",
      phone: phone.trim(),
      email: "",
      interest: `Rental Enquiry – ${preferredLocality.trim() || "MMR Region"}`,
      message: `Monthly Budget: ${monthlyBudget.trim() || "Flexible"}`,
      status: "new",
      date: new Date().toISOString(),
    })

    const msg = `Hi Shree Balaji Enterprises, I am looking for a rental property.%0AName: ${encodeURIComponent(
      name.trim()
    )}%0APhone: ${encodeURIComponent(phone.trim())}%0APreferred Area: ${encodeURIComponent(
      preferredLocality.trim() || "MMR Region"
    )}%0AMonthly Budget: ${encodeURIComponent(monthlyBudget.trim() || "Flexible")}`

    window.open(`https://wa.me/917767805544?text=${msg}`, "_blank")
    setEnquirySuccess(true)
    setTimeout(() => setEnquirySuccess(false), 5000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ── Editorial Header (Restrained, Typographic Elegance) ─── */}
      <header className="pt-2.5 sm:pt-3.5 pb-4 sm:pb-5">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
            {/* Title & Introduction */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-1 sm:mb-1.5">
                Rental Marketplace
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-foreground tracking-tight leading-tight">
                Find Properties <span className="font-serif italic text-muted-foreground">for Rent.</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl leading-relaxed">
                Explore residential, commercial and industrial rental properties across Ambernath, Badlapur, Kalyan and the Mumbai Metropolitan Region.
              </p>
            </div>

            {/* Search Bar & View Mode Toggle */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search locality, project or landmark..."
                  className="w-full pl-9 pr-8 h-10 text-[13px] rounded-md border border-border/80 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* List / Map View Toggle */}
              <div className="inline-flex items-center p-0.5 rounded-md border border-border/80 bg-muted/40 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="Switch to list view"
                  className={`h-9 px-3 text-xs font-medium rounded inline-flex items-center gap-1.5 transition-colors ${
                    viewMode === "list"
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span>List</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("map")}
                  aria-label="Switch to map view"
                  className={`h-9 px-3 text-xs font-medium rounded inline-flex items-center gap-1.5 transition-colors ${
                    viewMode === "map"
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Map className="h-3.5 w-3.5" />
                  <span>Map</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Single Unified Rental Filter Toolbar ─────────────── */}
      <RentFilters
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleResetFilters}
      />

      {/* ── Rental Marketplace Content ───────────────────────── */}
      <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 pb-28">
        {/* Results Summary Line */}
        <div className="mb-8 flex items-baseline justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "rental property" : "rental properties"}
            {locationDisplay && <span> in <span className="text-foreground font-medium">{locationDisplay}</span></span>}
            {searchQuery && <span> matching &ldquo;<span className="text-foreground font-medium">{searchQuery}</span>&rdquo;</span>}
          </p>
          {isAnyFilterActive && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-primary hover:underline font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* ── View Mode: List or Map ─────────────────────────── */}
        {viewMode === "list" ? (
          filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filtered.map((property) => (
                <RentListingCard
                  key={property.id}
                  property={property}
                  onHover={setHoveredPropertyId}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 px-6 text-center max-w-lg mx-auto bg-card border border-border/80 rounded-xl shadow-xs">
              <Building2 className="h-10 w-10 mx-auto mb-3 text-muted-foreground/40 stroke-[1.5]" />
              <p className="text-base font-semibold text-foreground mb-1.5">
                {locationDisplay
                  ? `No published rentals in ${locationDisplay} right now`
                  : "No matching rental properties found"}
              </p>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {locationDisplay
                  ? `Shree Balaji Enterprises actively represents verified residential and commercial rental vacancies across ${locationDisplay} and the MMR. Contact our advisory desk for upcoming move-ins.`
                  : "We couldn't find rental properties matching your current filters. Try broadening your criteria or submit your requirements below."}
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 text-xs font-semibold bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          )
        ) : (
          /* ── Map Mode: Split Screen ───────────────────────── */
          <div className="border border-border/80 rounded-xl overflow-hidden bg-card shadow-xs flex flex-col lg:flex-row h-[700px]">
            {/* Scrollable Sidebar with Compact Rental Cards */}
            <div className="w-full lg:w-[420px] shrink-0 border-b lg:border-b-0 lg:border-r border-border/80 flex flex-col h-1/2 lg:h-full">
              <div className="p-3.5 border-b border-border/80 bg-muted/20 flex items-center justify-between shrink-0">
                <p className="text-xs font-semibold text-foreground">
                  {filtered.length} Rentals on Map
                </p>
                <span className="text-[11px] text-muted-foreground">
                  Hover or select to view pin
                </span>
              </div>
              <div className="overflow-y-auto flex-1 divide-y divide-border/60">
                {filtered.map((property) => (
                  <RentListingCard
                    key={`map-sidebar-${property.id}`}
                    property={property}
                    compact={true}
                    highlighted={hoveredPropertyId === property.id || selectedPropertyId === property.id}
                    onHover={setHoveredPropertyId}
                  />
                ))}
              </div>
            </div>

            {/* Interactive Genuine Map View */}
            <div className="flex-1 relative h-1/2 lg:h-full">
              <MapView
                properties={filtered}
                hoveredId={hoveredPropertyId}
                selectedId={selectedPropertyId}
                onHoverProperty={setHoveredPropertyId}
                onSelectProperty={setSelectedPropertyId}
                baseUrl="/rent"
              />
            </div>
          </div>
        )}

        {/* ── Refined Rental Advisory Consultation Section ─────── */}
        <section className="mt-20 pt-12 border-t border-border/80">
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Context & Trust */}
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Custom Rental Advisory</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-normal text-foreground tracking-tight leading-snug">
                  Can&apos;t find your exact{" "}
                  <span className="font-serif italic text-muted-foreground">rental specifications?</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We frequently assist corporate tenants, families, and businesses across Ambernath, Badlapur, Kalyan, and Dombivli with unlisted vacancies and lease agreements.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    <span>+91 77678 05544</span>
                  </div>
                  <span className="hidden sm:inline text-border">|</span>
                  <span>RERA Reg: A51700023633</span>
                </div>
              </div>

              {/* Right Column: Clean Inline Inquiry Form */}
              <div className="lg:col-span-7">
                <form
                  onSubmit={handleEnquiry}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-muted/20 p-5 rounded-xl border border-border/60"
                >
                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
                      Preferred Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ambernath East / Dombivli"
                      value={preferredLocality}
                      onChange={(e) => setPreferredLocality(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
                      Monthly Budget (₹)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹10,000 – ₹15,000"
                      value={monthlyBudget}
                      onChange={(e) => setMonthlyBudget(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-1 flex items-center justify-between">
                    <p className="text-[11px] text-muted-foreground">
                      Zero brokerage surprise &middot; Verified landlord titles
                    </p>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-xs"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Submit Rental Enquiry</span>
                    </button>
                  </div>

                  {enquirySuccess && (
                    <div className="sm:col-span-2 pt-1">
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium text-center">
                        Enquiry saved successfully. Redirecting to WhatsApp advisory desk...
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default function RentPage() {
  return (
    <Suspense>
      <RentPageContent />
    </Suspense>
  )
}
