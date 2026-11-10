"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, SlidersHorizontal, MapPin, X, Check, ArrowUpDown } from "lucide-react"

export interface FilterState {
  location: string
  priceMin: string
  priceMax: string
  priceOnRequestOnly: boolean
  bedsMin: string
  bathsMin: string
  homeType: string[]
  possession: string[]
  furnishing: string[]
  amenities: string[]
  sqftRange: string
  sortBy: string
}

export const DEFAULT_FILTERS: FilterState = {
  location: "",
  priceMin: "",
  priceMax: "",
  priceOnRequestOnly: false,
  bedsMin: "",
  bathsMin: "",
  homeType: [],
  possession: [],
  furnishing: [],
  amenities: [],
  sqftRange: "",
  sortBy: "Featured",
}

interface SearchFiltersProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  onReset?: () => void
}

export function SearchFilters({
  filters,
  onFilterChange,
  onReset,
}: SearchFiltersProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  // Local state for custom price inputs (in Lakhs)
  const [inputMinLakh, setInputMinLakh] = useState<string>("")
  const [inputMaxLakh, setInputMaxLakh] = useState<string>("")
  const [priceError, setPriceError] = useState<string>("")

  // Dynamic viewport bounding & smart drop direction
  const [maxDropdownHeight, setMaxDropdownHeight] = useState<number>(440)
  const [dropDirection, setDropDirection] = useState<"down" | "up">("down")

  // Calculate available space in viewport in real-time
  useEffect(() => {
    if (!activeDropdown || !navRef.current) return

    const updateDimensions = () => {
      if (!navRef.current) return
      const rect = navRef.current.getBoundingClientRect()
      // Buffer from bottom of viewport so popovers never touch edge or taskbar
      const spaceBelow = window.innerHeight - rect.bottom - 16
      const spaceAbove = rect.top - 16

      if (spaceBelow < 260 && spaceAbove > spaceBelow) {
        setDropDirection("up")
        setMaxDropdownHeight(Math.max(200, Math.min(spaceAbove, 520)))
      } else {
        setDropDirection("down")
        setMaxDropdownHeight(Math.max(200, Math.min(spaceBelow, 520)))
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    window.addEventListener("scroll", updateDimensions, { passive: true })

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
        setPriceError("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      window.removeEventListener("scroll", updateDimensions)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeDropdown])

  // Sync price inputs when filters change
  useEffect(() => {
    if (filters.priceMin) {
      setInputMinLakh(String(Number(filters.priceMin) / 100000))
    } else {
      setInputMinLakh("")
    }
    if (filters.priceMax) {
      setInputMaxLakh(String(Number(filters.priceMax) / 100000))
    } else {
      setInputMaxLakh("")
    }
  }, [filters.priceMin, filters.priceMax])

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name))
    setPriceError("")
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
    setPriceError("")
  }

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const next = { ...filters, [key]: value }
    onFilterChange(next)
  }

  const toggleArrayFilter = (key: "homeType" | "possession" | "furnishing" | "amenities", value: string) => {
    const current = filters[key]
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    updateFilter(key, next)
  }

  // All key locations across MMR served by Shree Balaji Enterprises
  const locations = [
    { label: "All Locations", value: "", count: 13 },
    { label: "Ambernath", value: "Ambernath", count: 10 },
    { label: "Badlapur", value: "Badlapur", count: 1 },
    { label: "Dombivli", value: "Dombivli", count: 2 },
    { label: "Kalyan", value: "Kalyan" },
    { label: "Ulhasnagar", value: "Ulhasnagar" },
    { label: "Thane", value: "Thane" },
    { label: "Navi Mumbai", value: "Navi Mumbai" },
    { label: "Mumbai", value: "Mumbai" },
    { label: "Bhiwandi", value: "Bhiwandi" },
    { label: "Karjat", value: "Karjat" },
    { label: "Titwala", value: "Titwala" },
    { label: "Panvel", value: "Panvel" },
    { label: "Vasai-Virar", value: "Vasai-Virar" },
    { label: "Other Locations", value: "Other" },
  ]

  // Comprehensive property types
  const propertyTypes = [
    { label: "Apartment / Flat", value: "Apartment", count: 11 },
    { label: "Villa / Bungalow", value: "Villa" },
    { label: "House / Row House", value: "House", count: 1 },
    { label: "Commercial Shop / Showroom", value: "Shop" },
    { label: "Office Space", value: "Commercial", count: 1 },
    { label: "Industrial Shed / Warehouse", value: "Industrial" },
    { label: "Residential Plot / Land", value: "Plot" },
    { label: "Penthouse", value: "Penthouse" },
  ]

  // Comprehensive MMR price presets (compact 2-column format)
  const pricePresets = [
    { label: "All Prices", min: "", max: "", onRequest: false },
    { label: "Under ₹30L", min: "", max: "3000000", onRequest: false },
    { label: "₹30L – ₹50L", min: "3000000", max: "5000000", onRequest: false },
    { label: "₹50L – ₹75L", min: "5000000", max: "7500000", onRequest: false },
    { label: "₹75L – ₹1Cr", min: "7500000", max: "10000000", onRequest: false },
    { label: "₹1Cr – ₹1.5Cr", min: "10000000", max: "15000000", onRequest: false },
    { label: "₹1.5Cr – ₹2Cr", min: "15000000", max: "20000000", onRequest: false },
    { label: "₹2 Crore+", min: "20000000", max: "", onRequest: false },
    { label: "Price on Request", min: "", max: "", onRequest: true, span2: true },
  ]

  // Possession status
  const possessionOptions = [
    { label: "Ready to Move", value: "Ready to Move", count: 5 },
    { label: "Under Construction", value: "Under Construction" },
    { label: "New Launch", value: "New Launch", count: 2 },
  ]

  // Furnishing options
  const furnishingOptions = [
    { label: "Fully Furnished", value: "Furnished" },
    { label: "Semi-Furnished", value: "Semi-Furnished" },
    { label: "Unfurnished", value: "Unfurnished" },
  ]

  // Amenities
  const amenityOptions = [
    { label: "Gated Security / CCTV", value: "Security" },
    { label: "Clubhouse & Gym", value: "Clubhouse" },
    { label: "Swimming Pool", value: "Pool" },
    { label: "Lift / Elevator", value: "Elevator" },
    { label: "Power Backup", value: "Power Backup" },
    { label: "Children Play Area", value: "Play Area" },
    { label: "Garden / Park", value: "Garden" },
    { label: "Vastu Compliant", value: "Vastu" },
  ]

  // Carpet area options
  const areaOptions = [
    { label: "Any Area", value: "" },
    { label: "Under 500 sqft", value: "under-500" },
    { label: "500 – 1,000 sqft", value: "500-1000" },
    { label: "1,000 – 1,500 sqft", value: "1000-1500" },
    { label: "1,500 – 2,000 sqft", value: "1500-2000" },
    { label: "2,000+ sqft", value: "2000-plus" },
    { label: "Area on Request", value: "on-request" },
  ]

  // Sort options
  const sortOptions = [
    { label: "Featured", value: "Featured" },
    { label: "Newest First", value: "Newest First" },
    { label: "Price: Low to High", value: "Price: Low to High" },
    { label: "Price: High to Low", value: "Price: High to Low" },
  ]

  // Apply custom price input with validation
  const handleApplyCustomPrice = (e: React.FormEvent) => {
    e.preventDefault()
    const minVal = inputMinLakh ? Number(inputMinLakh) : 0
    const maxVal = inputMaxLakh ? Number(inputMaxLakh) : Infinity

    if (minVal < 0 || (inputMaxLakh && maxVal < 0)) {
      setPriceError("Price must be a positive number")
      return
    }

    if (inputMinLakh && inputMaxLakh && minVal > maxVal) {
      setPriceError("Min price cannot exceed Max price")
      return
    }

    setPriceError("")
    const minRupees = inputMinLakh ? String(minVal * 100000) : ""
    const maxRupees = inputMaxLakh ? String(maxVal * 100000) : ""

    onFilterChange({
      ...filters,
      priceMin: minRupees,
      priceMax: maxRupees,
      priceOnRequestOnly: false,
    })
    closeDropdown()
  }

  // Active status calculations
  const isLocationActive = Boolean(filters.location)
  const isPriceActive = Boolean(filters.priceMin || filters.priceMax || filters.priceOnRequestOnly)
  const isBedsBathsActive = Boolean(filters.bedsMin || filters.bathsMin)
  const isTypeActive = filters.homeType.length > 0
  const moreFiltersCount = [
    filters.possession.length > 0,
    filters.furnishing.length > 0,
    filters.amenities.length > 0,
    Boolean(filters.sqftRange),
  ].filter(Boolean).length

  // Price button label
  const priceLabel = (() => {
    if (filters.priceOnRequestOnly) return "Price on Request"
    if (filters.priceMin && filters.priceMax) {
      const minL = Number(filters.priceMin) / 100000
      const maxL = Number(filters.priceMax) / 100000
      return `₹${minL}L – ₹${maxL}L`
    }
    if (filters.priceMax) {
      const maxL = Number(filters.priceMax) / 100000
      return maxL >= 100 ? `Up to ₹${maxL / 100}Cr` : `Under ₹${maxL}L`
    }
    if (filters.priceMin) {
      const minL = Number(filters.priceMin) / 100000
      return minL >= 100 ? `From ₹${minL / 100}Cr` : `From ₹${minL}L`
    }
    return "Price"
  })()

  // Beds & Baths button label
  const bedsBathsLabel = (() => {
    if (filters.bedsMin && filters.bathsMin) {
      return `${filters.bedsMin}+ Beds, ${filters.bathsMin}+ Bath`
    }
    if (filters.bedsMin) return `${filters.bedsMin}+ BHK`
    if (filters.bathsMin) return `${filters.bathsMin}+ Bath`
    return "Beds & Baths"
  })()

  // Property Type button label
  const typeLabel = (() => {
    if (filters.homeType.length === 1) {
      const match = propertyTypes.find((t) => t.value === filters.homeType[0])
      return match ? match.label.split(" / ")[0] : filters.homeType[0]
    }
    if (filters.homeType.length > 1) {
      return `Type (${filters.homeType.length})`
    }
    return "Property Type"
  })()

  return (
    <nav
      ref={navRef}
      aria-label="Property discovery filters"
      className="border-y border-border/80 bg-background/95 sticky top-[60px] z-40 relative backdrop-blur-sm"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center gap-2 py-2.5 ${
            activeDropdown ? "overflow-visible" : "overflow-x-auto"
          } md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        >

          {/* ── 1. LOCATION FILTER ────────────────────── */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => toggleDropdown("location")}
              aria-expanded={activeDropdown === "location"}
              aria-label="Filter by location"
              className={`h-9 px-3 inline-flex items-center gap-1.5 text-[13px] font-medium rounded-md border transition-colors whitespace-nowrap ${
                isLocationActive
                  ? "bg-foreground text-background border-foreground font-semibold"
                  : "bg-background text-foreground/85 border-border/80 hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              <MapPin className="h-3.5 w-3.5 shrink-0 opacity-70" />
              <span>{isLocationActive ? filters.location : "Location"}</span>
              <ChevronDown className={`h-3 w-3 opacity-60 transition-transform ${activeDropdown === "location" ? "rotate-180" : ""}`} />
            </button>

            {activeDropdown === "location" && (
              <div
                style={{ maxHeight: `${Math.min(maxDropdownHeight, 360)}px` }}
                className={`absolute ${
                  dropDirection === "up" ? "bottom-full mb-1.5" : "top-full mt-1.5"
                } left-0 bg-card border border-border rounded-md shadow-xl p-1.5 z-50 w-[240px] max-w-[calc(100vw-2rem)] overflow-y-auto animate-in fade-in zoom-in-95 duration-100`}
              >
                <div className="flex items-center justify-between px-2.5 py-1 text-[11px] font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-card z-10 border-b border-border/50">
                  <span>MMR Locations</span>
                  {isLocationActive && (
                    <button
                      type="button"
                      onClick={() => {
                        updateFilter("location", "")
                        closeDropdown()
                      }}
                      className="text-primary hover:underline lowercase font-normal"
                    >
                      clear
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-0.5 mt-1">
                  {locations.map((loc) => {
                    const isSelected = filters.location === loc.value
                    return (
                      <button
                        key={loc.label}
                        type="button"
                        onClick={() => {
                          updateFilter("location", loc.value)
                          closeDropdown()
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 text-[13px] rounded transition-colors text-left ${
                          isSelected
                            ? "bg-foreground text-background font-medium"
                            : "text-foreground hover:bg-muted/70"
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
                          <span>{loc.label}</span>
                        </span>
                        {loc.count ? (
                          <span className={`text-xs ${isSelected ? "text-background/80" : "text-muted-foreground"}`}>
                            {loc.count}
                          </span>
                        ) : null}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── 2. PRICE FILTER ───────────────────────── */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => toggleDropdown("price")}
              aria-expanded={activeDropdown === "price"}
              aria-label="Filter by price"
              className={`h-9 px-3 inline-flex items-center gap-1.5 text-[13px] font-medium rounded-md border transition-colors whitespace-nowrap ${
                isPriceActive
                  ? "bg-foreground text-background border-foreground font-semibold"
                  : "bg-background text-foreground/85 border-border/80 hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              <span>{priceLabel}</span>
              <ChevronDown className={`h-3 w-3 opacity-60 transition-transform ${activeDropdown === "price" ? "rotate-180" : ""}`} />
            </button>

            {activeDropdown === "price" && (
              <div
                style={{ maxHeight: `${maxDropdownHeight}px` }}
                className={`absolute ${
                  dropDirection === "up" ? "bottom-full mb-1.5" : "top-full mt-1.5"
                } left-0 bg-card border border-border rounded-lg shadow-xl p-3.5 z-50 w-[300px] sm:w-[320px] max-w-[calc(100vw-2rem)] overflow-y-auto animate-in fade-in zoom-in-95 duration-100`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    Custom Range (₹ Lakh)
                  </p>
                  {isPriceActive && (
                    <button
                      type="button"
                      onClick={() => {
                        onFilterChange({
                          ...filters,
                          priceMin: "",
                          priceMax: "",
                          priceOnRequestOnly: false,
                        })
                        setInputMinLakh("")
                        setInputMaxLakh("")
                        closeDropdown()
                      }}
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Min / Max inputs — Compact Inline Row with Apply Button */}
                <form onSubmit={handleApplyCustomPrice} className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        placeholder="Min ₹L"
                        value={inputMinLakh}
                        onChange={(e) => {
                          setInputMinLakh(e.target.value)
                          setPriceError("")
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                      />
                    </div>
                    <span className="text-muted-foreground text-xs font-medium shrink-0">–</span>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        placeholder="Max ₹L"
                        value={inputMaxLakh}
                        onChange={(e) => {
                          setInputMaxLakh(e.target.value)
                          setPriceError("")
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs font-semibold bg-foreground text-background rounded hover:bg-foreground/90 transition-colors shrink-0 shadow-xs"
                    >
                      Apply
                    </button>
                  </div>

                  {priceError && (
                    <p className="text-[11px] text-destructive font-medium">{priceError}</p>
                  )}
                </form>

                {/* Quick Budget Tiers — Compact 2-Column Grid (No Overflow) */}
                <div className="pt-2.5 border-t border-border/80">
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Quick Budget Tiers
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {pricePresets.map((preset) => {
                      const isSelected =
                        preset.onRequest
                          ? filters.priceOnRequestOnly
                          : !filters.priceOnRequestOnly &&
                            filters.priceMin === preset.min &&
                            filters.priceMax === preset.max

                      return (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => {
                            onFilterChange({
                              ...filters,
                              priceMin: preset.min,
                              priceMax: preset.max,
                              priceOnRequestOnly: preset.onRequest,
                            })
                            closeDropdown()
                          }}
                          className={`px-2 py-1.5 text-xs rounded-md border text-center transition-colors font-medium truncate ${
                            (preset as { span2?: boolean }).span2 ? "col-span-2" : ""
                          } ${
                            isSelected
                              ? "bg-foreground text-background border-foreground font-semibold shadow-xs"
                              : "border-border/80 text-foreground/85 hover:bg-muted/70 hover:border-foreground/30"
                          }`}
                        >
                          {preset.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── 3. BEDS & BATHS FILTER ────────────────── */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => toggleDropdown("beds")}
              aria-expanded={activeDropdown === "beds"}
              aria-label="Filter by bedrooms and bathrooms"
              className={`h-9 px-3 inline-flex items-center gap-1.5 text-[13px] font-medium rounded-md border transition-colors whitespace-nowrap ${
                isBedsBathsActive
                  ? "bg-foreground text-background border-foreground font-semibold"
                  : "bg-background text-foreground/85 border-border/80 hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              <span>{bedsBathsLabel}</span>
              <ChevronDown className={`h-3 w-3 opacity-60 transition-transform ${activeDropdown === "beds" ? "rotate-180" : ""}`} />
            </button>

            {activeDropdown === "beds" && (
              <div
                style={{ maxHeight: `${maxDropdownHeight}px` }}
                className={`absolute ${
                  dropDirection === "up" ? "bottom-full mb-1.5" : "top-full mt-1.5"
                } left-0 bg-card border border-border rounded-md shadow-xl p-3 z-50 w-[310px] sm:w-[320px] max-w-[calc(100vw-2rem)] overflow-y-auto animate-in fade-in zoom-in-95 duration-100`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    Bedrooms
                  </p>
                  {filters.bedsMin && (
                    <button
                      type="button"
                      onClick={() => updateFilter("bedsMin", "")}
                      className="text-xs text-primary hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-1.5 mb-3.5">
                  {[
                    { label: "Any", val: "" },
                    { label: "1 BHK", val: "1" },
                    { label: "2 BHK", val: "2" },
                    { label: "3 BHK", val: "3" },
                    { label: "4+ BHK", val: "4" },
                  ].map((opt) => {
                    const isSelected = filters.bedsMin === opt.val
                    return (
                      <button
                        key={`bed-${opt.label}`}
                        type="button"
                        onClick={() => updateFilter("bedsMin", opt.val)}
                        className={`h-8 rounded text-[11px] sm:text-xs font-medium border transition-colors whitespace-nowrap flex items-center justify-center px-1 ${
                          isSelected
                            ? "bg-foreground text-background border-foreground font-semibold shadow-xs"
                            : "border-border text-foreground hover:bg-muted"
                        }`}
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>

                <div className="flex items-center justify-between mb-2 pt-2.5 border-t border-border/80">
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    Bathrooms
                  </p>
                  {filters.bathsMin && (
                    <button
                      type="button"
                      onClick={() => updateFilter("bathsMin", "")}
                      className="text-xs text-primary hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { label: "Any", val: "" },
                    { label: "1 Bath", val: "1" },
                    { label: "2 Baths", val: "2" },
                    { label: "3+ Baths", val: "3" },
                  ].map((opt) => {
                    const isSelected = filters.bathsMin === opt.val
                    return (
                      <button
                        key={`bath-${opt.label}`}
                        type="button"
                        onClick={() => updateFilter("bathsMin", opt.val)}
                        className={`h-8 rounded text-[11px] sm:text-xs font-medium border transition-colors whitespace-nowrap flex items-center justify-center px-1 ${
                          isSelected
                            ? "bg-foreground text-background border-foreground font-semibold shadow-xs"
                            : "border-border text-foreground hover:bg-muted"
                        }`}
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-border flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      onFilterChange({ ...filters, bedsMin: "", bathsMin: "" })
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
                  >
                    Reset Both
                  </button>
                  <button
                    type="button"
                    onClick={closeDropdown}
                    className="px-3.5 py-1.5 bg-foreground text-background text-xs font-semibold rounded hover:bg-foreground/90 transition-colors shadow-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── 4. PROPERTY TYPE FILTER ───────────────── */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => toggleDropdown("propertyType")}
              aria-expanded={activeDropdown === "propertyType"}
              aria-label="Filter by property type"
              className={`h-9 px-3 inline-flex items-center gap-1.5 text-[13px] font-medium rounded-md border transition-colors whitespace-nowrap ${
                isTypeActive
                  ? "bg-foreground text-background border-foreground font-semibold"
                  : "bg-background text-foreground/85 border-border/80 hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              <span>{typeLabel}</span>
              <ChevronDown className={`h-3 w-3 opacity-60 transition-transform ${activeDropdown === "propertyType" ? "rotate-180" : ""}`} />
            </button>

            {activeDropdown === "propertyType" && (
              <div
                style={{ maxHeight: `${Math.min(maxDropdownHeight, 360)}px` }}
                className={`absolute ${
                  dropDirection === "up" ? "bottom-full mb-1.5" : "top-full mt-1.5"
                } left-0 bg-card border border-border rounded-md shadow-xl p-3 z-50 w-[270px] max-w-[calc(100vw-2rem)] overflow-y-auto animate-in fade-in zoom-in-95 duration-100`}
              >
                <div className="flex items-center justify-between mb-1.5 px-1 text-[11px] font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-card z-10 border-b border-border/50 pb-1">
                  <span>Property Types</span>
                  {isTypeActive && (
                    <button
                      type="button"
                      onClick={() => updateFilter("homeType", [])}
                      className="text-primary hover:underline lowercase font-normal"
                    >
                      clear
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  {propertyTypes.map((type) => {
                    const isChecked = filters.homeType.includes(type.value)
                    return (
                      <label
                        key={type.value}
                        className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-muted/70 cursor-pointer text-[13px] text-foreground transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleArrayFilter("homeType", type.value)}
                            className="h-3.5 w-3.5 rounded border-border text-primary focus:ring-0 accent-foreground cursor-pointer"
                          />
                          <span>{type.label}</span>
                        </div>
                        {type.count ? (
                          <span className="text-xs text-muted-foreground font-normal">
                            {type.count}
                          </span>
                        ) : null}
                      </label>
                    )
                  })}
                </div>
                <div className="mt-2.5 pt-2 border-t border-border flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => updateFilter("homeType", [])}
                    className="text-xs text-muted-foreground hover:text-foreground px-1"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={closeDropdown}
                    className="px-3.5 py-1.5 bg-foreground text-background text-xs font-semibold rounded hover:bg-foreground/90 transition-colors shadow-xs"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── 5. MORE FILTERS ───────────────────────── */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => toggleDropdown("moreFilters")}
              aria-expanded={activeDropdown === "moreFilters"}
              aria-label="More filters"
              className={`h-9 px-3 inline-flex items-center gap-1.5 text-[13px] font-medium rounded-md border transition-colors whitespace-nowrap ${
                moreFiltersCount > 0
                  ? "bg-foreground text-background border-foreground font-semibold"
                  : "bg-background text-foreground/85 border-border/80 hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5 opacity-70" />
              <span>More Filters</span>
              {moreFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {moreFiltersCount}
                </span>
              )}
              <ChevronDown className={`h-3 w-3 opacity-60 transition-transform ${activeDropdown === "moreFilters" ? "rotate-180" : ""}`} />
            </button>

            {activeDropdown === "moreFilters" && (
              <div
                style={{ maxHeight: `${maxDropdownHeight}px` }}
                className={`absolute ${
                  dropDirection === "up" ? "bottom-full mb-1.5" : "top-full mt-1.5"
                } right-0 bg-card border border-border rounded-xl shadow-xl z-50 w-[420px] sm:w-[480px] max-w-[calc(100vw-2rem)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100`}
              >
                {/* Sticky Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-border/80 shrink-0 bg-card">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
                    Additional Filters
                  </p>
                  <button
                    type="button"
                    onClick={closeDropdown}
                    className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"
                    aria-label="Close more filters"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Scrollable Categories — Sleek Modern Scrollbar */}
                <div className="p-5 space-y-5 overflow-y-auto flex-1 min-h-0 modern-scrollbar">
                  {/* Possession Status */}
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Possession Status
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {possessionOptions.map((opt) => {
                        const isSelected = filters.possession.includes(opt.value)
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => toggleArrayFilter("possession", opt.value)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
                              isSelected
                                ? "bg-foreground text-background border-foreground font-semibold shadow-xs"
                                : "border-border text-foreground hover:bg-muted"
                            }`}
                          >
                            <span>{opt.label}</span>
                            {opt.count ? (
                              <span className={`text-[10px] ml-1 ${isSelected ? "text-background/80" : "text-muted-foreground"}`}>
                                ({opt.count})
                              </span>
                            ) : null}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Furnishing */}
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Furnishing
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {furnishingOptions.map((opt) => {
                        const isSelected = filters.furnishing.includes(opt.value)
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => toggleArrayFilter("furnishing", opt.value)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
                              isSelected
                                ? "bg-foreground text-background border-foreground font-semibold shadow-xs"
                                : "border-border text-foreground hover:bg-muted"
                            }`}
                          >
                            {opt.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Carpet Area */}
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Carpet Area
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {areaOptions.map((opt) => {
                        const isSelected = filters.sqftRange === opt.value
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => updateFilter("sqftRange", opt.value)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
                              isSelected
                                ? "bg-foreground text-background border-foreground font-semibold shadow-xs"
                                : "border-border text-foreground hover:bg-muted"
                            }`}
                          >
                            {opt.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Amenities & Features */}
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Amenities & Features
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {amenityOptions.map((opt) => {
                        const isSelected = filters.amenities.includes(opt.value)
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => toggleArrayFilter("amenities", opt.value)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                              isSelected
                                ? "bg-foreground text-background border-foreground font-semibold shadow-xs"
                                : "border-border text-foreground hover:bg-muted"
                            }`}
                          >
                            <span>{opt.label}</span>
                            {isSelected && <Check className="h-3 w-3 shrink-0" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Sticky Footer Actions — Always within viewport */}
                <div className="px-5 py-3 border-t border-border/80 bg-card shrink-0 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onFilterChange({
                        ...filters,
                        possession: [],
                        furnishing: [],
                        amenities: [],
                        sqftRange: "",
                      })
                    }}
                    className="flex-1 py-1.5 text-xs text-muted-foreground hover:text-foreground font-medium border border-border rounded-md hover:bg-muted transition-colors"
                  >
                    Clear Extra
                  </button>
                  <button
                    type="button"
                    onClick={closeDropdown}
                    className="flex-1 py-1.5 text-xs font-semibold text-background bg-foreground rounded-md hover:bg-foreground/90 transition-colors shadow-xs"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Clear All Reset */}
          {(isLocationActive || isPriceActive || isBedsBathsActive || isTypeActive || moreFiltersCount > 0) && (
            <button
              type="button"
              onClick={onReset}
              className="h-9 px-2.5 shrink-0 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              <span>Clear All</span>
            </button>
          )}

          {/* Right Spacer to naturally position Sort on the far right */}
          <div className="flex-1 min-w-[8px]" />

          {/* ── 6. SORT FILTER (Far Right Positioned) ── */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => toggleDropdown("sort")}
              aria-expanded={activeDropdown === "sort"}
              aria-label="Sort properties"
              className="h-9 px-3 inline-flex items-center gap-1.5 text-[13px] font-medium rounded-md border border-border/80 bg-background text-foreground/85 hover:border-foreground/40 hover:text-foreground transition-colors whitespace-nowrap"
            >
              <ArrowUpDown className="h-3.5 w-3.5 opacity-60" />
              <span>Sort: {filters.sortBy}</span>
              <ChevronDown className={`h-3 w-3 opacity-60 transition-transform ${activeDropdown === "sort" ? "rotate-180" : ""}`} />
            </button>

            {activeDropdown === "sort" && (
              <div
                style={{ maxHeight: `${Math.min(maxDropdownHeight, 300)}px` }}
                className={`absolute ${
                  dropDirection === "up" ? "bottom-full mb-1.5" : "top-full mt-1.5"
                } right-0 bg-card border border-border rounded-md shadow-xl p-1 z-50 min-w-[190px] overflow-y-auto animate-in fade-in zoom-in-95 duration-100`}
              >
                <p className="text-[11px] font-medium text-muted-foreground px-2.5 py-1 uppercase tracking-wider">
                  Sort Properties
                </p>
                <div className="flex flex-col gap-0.5">
                  {sortOptions.map((opt) => {
                    const isSelected = filters.sortBy === opt.value
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          updateFilter("sortBy", opt.value)
                          closeDropdown()
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 text-[13px] rounded transition-colors text-left ${
                          isSelected
                            ? "bg-foreground text-background font-medium"
                            : "text-foreground hover:bg-muted/70"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <Check className="h-3.5 w-3.5" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Click-away backdrop overlay */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-30 bg-transparent"
          onClick={closeDropdown}
        />
      )}
    </nav>
  )
}
