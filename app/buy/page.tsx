"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search, X, Building2 } from "lucide-react"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { BuyListingCard } from "@/components/buy-listing-card"
import { SearchFilters, DEFAULT_FILTERS, type FilterState } from "@/components/search-filters"
import { useBuyProperties } from "@/hooks/use-properties"

function BuyPageContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") ?? ""
  const initialLocation = searchParams.get("location") ?? ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    location: initialLocation,
  })

  const buyProperties = useBuyProperties()

  const handleResetFilters = () => {
    setSearchQuery("")
    setFilters(DEFAULT_FILTERS)
  }

  // Real-time multi-dimensional filtering
  const filtered = useMemo(() => {
    let result = buyProperties.slice()

    // 1. Text Search Query
    if (searchQuery.trim()) {
      const queryWords = searchQuery.toLowerCase().trim().split(/\s+/)
      result = result.filter((p) => {
        const textToSearch = [
          p.address,
          p.city,
          p.state ?? "",
          p.type ?? "",
          p.tag ?? "",
          p.description ?? "",
          ...(p.features ?? []),
        ]
          .join(" ")
          .toLowerCase()
        return queryWords.every((word) => textToSearch.includes(word))
      })
    }

    // 2. Location Filter
    if (filters.location) {
      const loc = filters.location.toLowerCase()
      if (loc === "other") {
        result = result.filter(
          (p) => !["ambernath", "badlapur", "dombivli"].includes(p.city.toLowerCase())
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

    // 3. Price Filter
    if (filters.priceOnRequestOnly) {
      result = result.filter((p) => !p.priceNum || p.price === "Contact for Price")
    } else {
      if (filters.priceMin) {
        const min = Number(filters.priceMin)
        result = result.filter((p) => typeof p.priceNum === "number" && p.priceNum >= min)
      }
      if (filters.priceMax) {
        const max = Number(filters.priceMax)
        result = result.filter((p) => typeof p.priceNum === "number" && p.priceNum <= max)
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
    if (filters.homeType.length > 0) {
      result = result.filter((p) => {
        return filters.homeType.some((type) => {
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
              p.type?.toLowerCase().includes("office") ||
              p.type?.toLowerCase().includes("shop") ||
              p.tag?.toLowerCase() === "commercial"
            )
          }
          if (t.includes("house") || t.includes("villa") || t.includes("bungalow")) {
            return (
              p.type?.toLowerCase().includes("house") ||
              p.type?.toLowerCase().includes("villa") ||
              p.type?.toLowerCase().includes("bungalow")
            )
          }
          if (t.includes("industrial")) {
            return (
              p.category === "industrial" ||
              p.type?.toLowerCase().includes("industrial") ||
              p.type?.toLowerCase().includes("warehouse")
            )
          }
          if (t.includes("plot")) {
            return p.type?.toLowerCase().includes("plot") || p.type?.toLowerCase().includes("land")
          }
          if (t.includes("penthouse")) {
            return (
              p.type?.toLowerCase().includes("penthouse") ||
              p.features?.some((f) => f.toLowerCase().includes("skyline"))
            )
          }
          return false
        })
      })
    }

    // 7. Possession Status Filter (from More Filters)
    if (filters.possession.length > 0) {
      result = result.filter((p) => {
        return filters.possession.some((pos) => {
          const pLower = pos.toLowerCase()
          if (pLower.includes("ready")) {
            return (
              p.features?.some((f) => f.toLowerCase().includes("ready")) ||
              p.description?.toLowerCase().includes("ready to move")
            )
          }
          if (pLower.includes("launch")) {
            return (
              p.tag?.toLowerCase().includes("launch") ||
              p.features?.some((f) => f.toLowerCase().includes("launch"))
            )
          }
          if (pLower.includes("construction")) {
            return (
              p.tag?.toLowerCase().includes("construction") ||
              p.features?.some((f) => f.toLowerCase().includes("construction"))
            )
          }
          return false
        })
      })
    }

    // 8. Furnishing Filter
    if (filters.furnishing && filters.furnishing.length > 0) {
      result = result.filter((p) => {
        if (!p.furnishing) return true
        return filters.furnishing.some((f) =>
          p.furnishing?.toLowerCase().includes(f.toLowerCase())
        )
      })
    }

    // 9. Amenities Filter (from More Filters)
    if (filters.amenities.length > 0) {
      result = result.filter((p) => {
        const feats = (p.features || []).map((f) => f.toLowerCase())
        return filters.amenities.every((amenity) => {
          const aLower = amenity.toLowerCase()
          if (aLower.includes("security")) {
            return feats.some((f) => f.includes("security") || f.includes("gated"))
          }
          if (aLower.includes("clubhouse")) {
            return feats.some((f) => f.includes("clubhouse") || f.includes("gym"))
          }
          if (aLower.includes("pool")) {
            return feats.some((f) => f.includes("pool"))
          }
          if (aLower.includes("elevator") || aLower.includes("lift")) {
            return feats.some((f) => f.includes("lift") || f.includes("elevator"))
          }
          if (aLower.includes("power")) {
            return feats.some((f) => f.includes("power") || f.includes("backup"))
          }
          if (aLower.includes("play")) {
            return feats.some((f) => f.includes("play") || f.includes("children"))
          }
          if (aLower.includes("garden")) {
            return feats.some((f) => f.includes("garden") || f.includes("park"))
          }
          if (aLower.includes("vastu")) {
            return feats.some((f) => f.includes("vastu"))
          }
          return false
        })
      })
    }

    // 10. Carpet Area Filter (from More Filters)
    if (filters.sqftRange) {
      if (filters.sqftRange === "under-500") {
        result = result.filter((p) => {
          const n = parseInt(p.sqft.replace(/[^0-9]/g, ""), 10)
          return !isNaN(n) && n < 500
        })
      } else if (filters.sqftRange === "500-1000") {
        result = result.filter((p) => {
          const n = parseInt(p.sqft.replace(/[^0-9]/g, ""), 10)
          return !isNaN(n) && n >= 500 && n <= 1000
        })
      } else if (filters.sqftRange === "1000-1500") {
        result = result.filter((p) => {
          const n = parseInt(p.sqft.replace(/[^0-9]/g, ""), 10)
          return !isNaN(n) && n >= 1000 && n <= 1500
        })
      } else if (filters.sqftRange === "1500-2000") {
        result = result.filter((p) => {
          const n = parseInt(p.sqft.replace(/[^0-9]/g, ""), 10)
          return !isNaN(n) && n >= 1500 && n <= 2000
        })
      } else if (filters.sqftRange === "2000-plus") {
        result = result.filter((p) => {
          const n = parseInt(p.sqft.replace(/[^0-9]/g, ""), 10)
          return !isNaN(n) && n >= 2000
        })
      } else if (filters.sqftRange === "on-request") {
        result = result.filter((p) => p.sqft === "On Request")
      }
    }

    // 11. Sorting
    result.sort((a, b) => {
      if (filters.sortBy === "Price: Low to High") {
        const priceA = a.priceNum ?? Infinity
        const priceB = b.priceNum ?? Infinity
        return priceA - priceB
      }
      if (filters.sortBy === "Price: High to Low") {
        const priceA = a.priceNum ?? -1
        const priceB = b.priceNum ?? -1
        return priceB - priceA
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
  }, [buyProperties, searchQuery, filters])

  // Check if any filter is active
  const isAnyFilterActive = Boolean(
    searchQuery ||
    filters.location ||
    filters.priceMin ||
    filters.priceMax ||
    filters.priceOnRequestOnly ||
    filters.bedsMin ||
    filters.bathsMin ||
    filters.homeType.length > 0 ||
    filters.possession.length > 0 ||
    filters.furnishing.length > 0 ||
    filters.amenities.length > 0 ||
    filters.sqftRange
  )

  // Formatted location display for text strings
  const locationDisplay =
    filters.location === "Other" ? "other MMR locations" : filters.location

  return (
    <div className="min-h-screen bg-background">
      {/* ── Editorial Header (Compact, Human-Designed) ─── */}
      <header className="pt-8 sm:pt-10 pb-6">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            {/* Title & Introduction */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                Marketplace
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-foreground tracking-tight leading-tight">
                Find Properties <span className="font-serif italic text-muted-foreground">for Sale.</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl leading-relaxed">
                Explore homes, apartments and commercial properties across Ambernath, Badlapur, Kalyan and the Mumbai Metropolitan Region.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full lg:w-80">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search locality or project..."
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
            </div>
          </div>
        </div>
      </header>

      {/* ── Single Unified Filter Toolbar ───────────────── */}
      <SearchFilters
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleResetFilters}
      />

      {/* ── Marketplace Property Grid ───────────────────── */}
      <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 pb-28">
        {/* Results Summary Line */}
        <div className="mb-8 flex items-baseline justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "property" : "properties"}
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

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filtered.map((property) => (
              <BuyListingCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 px-6 text-center max-w-lg mx-auto bg-card border border-border/80 rounded-xl shadow-xs">
            <Building2 className="h-10 w-10 mx-auto mb-3 text-muted-foreground/40 stroke-[1.5]" />
            <p className="text-base font-semibold text-foreground mb-1.5">
              {locationDisplay
                ? `No published listings in ${locationDisplay} right now`
                : "No matching properties found"}
            </p>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {locationDisplay
                ? `Shree Balaji Enterprises actively represents verified residential and commercial opportunities across ${locationDisplay} and the MMR. Contact our advisory desk directly for upcoming and off-market options.`
                : "We couldn't find properties matching your current filter criteria. Try adjusting your parameters or contact our local team for unlisted inventory."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <a
                href={`https://wa.me/917767805544?text=${encodeURIComponent(
                  `Hello Anju ji, I am looking for properties in ${filters.location || "MMR"}. Please share available and upcoming options.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors shadow-xs"
              >
                <WhatsAppIcon className="h-3.5 w-3.5 fill-current shrink-0" />
                <span>Inquire on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-foreground border border-border rounded hover:bg-muted transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default function BuyPage() {
  return (
    <Suspense>
      <BuyPageContent />
    </Suspense>
  )
}
