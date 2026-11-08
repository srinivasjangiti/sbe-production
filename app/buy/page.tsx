"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Map, List, X, Home, MapPin, Building, Briefcase, Key } from "lucide-react"
import { PropertyCard } from "@/components/property-card"
import { SearchFilters } from "@/components/search-filters"
import { MapView } from "@/components/map-view"
import { useBuyProperties } from "@/hooks/use-properties"
import { AnimatedGroup } from "@/components/core/animated-group"

const LOCALITY_FILTERS = [
  { label: "All Properties", query: "" },
  { label: "Ambernath", query: "Ambernath" },
  { label: "Badlapur", query: "Badlapur" },
  { label: "Dombivli", query: "Dombivli" },
  { label: "Kalyan", query: "Kalyan" },
  { label: "Commercial", query: "Commercial" },
  { label: "Apartments", query: "Apartment" },
  { label: "Ready to Move", query: "Ready to Move" },
]

function BuyPageContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "")
  const [activeFilter, setActiveFilter] = useState(searchParams.get("q") ?? "")
  const [showMap, setShowMap] = useState(false)
  const buyProperties = useBuyProperties()

  const handleFilterClick = (q: string) => {
    setActiveFilter(q)
    setSearchQuery(q)
  }

  const filtered = searchQuery.trim()
    ? buyProperties.filter((p) => {
        const haystack = [
          p.address,
          p.city,
          p.state ?? "",
          p.description ?? "",
          p.type ?? "",
          p.tag ?? "",
          ...(p.features ?? [])
        ].join(" ").toLowerCase()
        return searchQuery.toLowerCase().split(" ").every((word) => haystack.includes(word))
      })
    : buyProperties

  return (
    <div className="min-h-screen bg-background">
      {/* Clean, Non-AI Filter & Search Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setActiveFilter(e.target.value)
                }}
                placeholder="Search by project or locality (e.g. Ambernath, Badlapur)..."
                className="w-full pl-10 pr-9 py-2 text-sm rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveFilter("")
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* View Switcher */}
            <div className="hidden lg:flex items-center gap-1 border border-border rounded-lg p-0.5 bg-background">
              <button
                type="button"
                onClick={() => setShowMap(false)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  !showMap
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="h-3.5 w-3.5" />
                <span>List</span>
              </button>
              <button
                type="button"
                onClick={() => setShowMap(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  showMap
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Map className="h-3.5 w-3.5" />
                <span>Map</span>
              </button>
            </div>
          </div>

          {/* Locality Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-4 pb-1">
            {LOCALITY_FILTERS.map((item) => {
              const isSelected = activeFilter.toLowerCase() === item.query.toLowerCase()
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleFilterClick(item.query)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    isSelected
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <SearchFilters />

      {/* Main Container */}
      <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6 pb-24">
        {/* Results Count Line */}
        <div className="mb-6 flex items-baseline justify-between">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {filtered.length} {filtered.length === 1 ? "property" : "properties"} available
            {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
          </p>
        </div>

        {showMap ? (
          /* Split View with Map */
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                  {filtered.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center text-muted-foreground text-sm">
                  No properties found for this search.
                </div>
              )}
            </div>
            <div className="hidden lg:block lg:w-1/2 sticky top-20 h-[calc(100vh-120px)] rounded-2xl overflow-hidden border border-border">
              <MapView properties={filtered} />
            </div>
          </div>
        ) : (
          /* Clean 4-Column Grid */
          filtered.length > 0 ? (
            <AnimatedGroup
              key={searchQuery}
              preset="fade"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-9"
            >
              {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </AnimatedGroup>
          ) : (
            <div className="py-24 text-center">
              <p className="text-base font-semibold text-foreground mb-1">No properties found</p>
              <p className="text-sm text-muted-foreground mb-4">Try clearing your filters to view all listings.</p>
              <button
                type="button"
                onClick={() => handleFilterClick("")}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90"
              >
                Clear Filters
              </button>
            </div>
          )
        )}
      </main>

      {/* Floating Map Toggle (Mobile & Tablet) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
        <button
          type="button"
          onClick={() => setShowMap(!showMap)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold text-xs shadow-xl active:scale-95 transition-transform"
        >
          {showMap ? <List className="h-4 w-4" /> : <Map className="h-4 w-4" />}
          <span>{showMap ? "Show List" : "Show Map"}</span>
        </button>
      </div>
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
