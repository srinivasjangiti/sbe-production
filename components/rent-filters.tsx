"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, SlidersHorizontal, MapPin, X, Check, ArrowUpDown } from "lucide-react"

export interface RentFilterState {
  location: string
  rentMin: string
  rentMax: string
  rentOnRequestOnly: boolean
  bedsMin: string
  bathsMin: string
  propertyType: string[]
  furnishing: string[]
  availability: string[]
  depositRange: string
  sqftRange: string
  amenities: string[]
  sortBy: string
}

export const DEFAULT_RENT_FILTERS: RentFilterState = {
  location: "",
  rentMin: "",
  rentMax: "",
  rentOnRequestOnly: false,
  bedsMin: "",
  bathsMin: "",
  propertyType: [],
  furnishing: [],
  availability: [],
  depositRange: "",
  sqftRange: "",
  amenities: [],
  sortBy: "Featured",
}

interface RentFiltersProps {
  filters: RentFilterState
  onFilterChange: (filters: RentFilterState) => void
  onReset?: () => void
}

export function RentFilters({
  filters,
  onFilterChange,
  onReset,
}: RentFiltersProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  // Local state for custom monthly rent inputs (in Rupees)
  const [inputMin, setInputMin] = useState<string>("")
  const [inputMax, setInputMax] = useState<string>("")
  const [rentError, setRentError] = useState<string>("")

  // Dynamic viewport bounding & smart drop direction
  const [maxDropdownHeight, setMaxDropdownHeight] = useState<number>(440)
  const [dropDirection, setDropDirection] = useState<"down" | "up">("down")

  // Sync inputs when rent filters change
  useEffect(() => {
    setInputMin(filters.rentMin || "")
    setInputMax(filters.rentMax || "")
  }, [filters.rentMin, filters.rentMax])

  // Calculate available space in viewport in real-time
  useEffect(() => {
    if (!activeDropdown || !navRef.current) return

    const updateDimensions = () => {
      if (!navRef.current) return
      const rect = navRef.current.getBoundingClientRect()
      // Buffer from bottom of viewport so popovers never touch screen edge or taskbar
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
        setRentError("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      window.removeEventListener("scroll", updateDimensions)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeDropdown])

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
    setRentError("")
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
    setRentError("")
  }

  const updateFilter = <K extends keyof RentFilterState>(key: K, value: RentFilterState[K]) => {
    const next = { ...filters, [key]: value }
    onFilterChange(next)
  }

  const toggleArrayFilter = (
    key: "propertyType" | "furnishing" | "availability" | "amenities",
    value: string
  ) => {
    const current = filters[key]
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    updateFilter(key, next)
  }

  // MMR Localities for Rentals
  const locations = [
    { label: "All Locations", value: "" },
    { label: "Ambernath", value: "Ambernath" },
    { label: "Badlapur", value: "Badlapur" },
    { label: "Dombivli", value: "Dombivli" },
    { label: "Kalyan", value: "Kalyan" },
    { label: "Ulhasnagar", value: "Ulhasnagar" },
    { label: "Thane", value: "Thane" },
    { label: "Navi Mumbai", value: "Navi Mumbai" },
    { label: "Mumbai", value: "Mumbai" },
    { label: "Bhiwandi", value: "Bhiwandi" },
    { label: "Titwala", value: "Titwala" },
    { label: "Karjat", value: "Karjat" },
    { label: "Panvel", value: "Panvel" },
    { label: "Other Locations", value: "Other" },
  ]

  // Monthly Rent Presets (formatted for rentals)
  const rentPresets = [
    { label: "All Rents", min: "", max: "", onRequest: false },
    { label: "Under ₹10k / mo", min: "", max: "10000", onRequest: false },
    { label: "₹10k – ₹15k / mo", min: "10000", max: "15000", onRequest: false },
    { label: "₹15k – ₹25k / mo", min: "15000", max: "25000", onRequest: false },
    { label: "₹25k – ₹40k / mo", min: "25000", max: "40000", onRequest: false },
    { label: "₹40k+ / mo", min: "40000", max: "", onRequest: false },
    { label: "Rent on Request", min: "", max: "", onRequest: true, span2: true },
  ]

  // Property types supported in rental marketplace
  const propertyTypes = [
    { label: "Apartment / Flat", value: "Apartment" },
    { label: "Villa / Bungalow / Row House", value: "House" },
    { label: "Commercial Shop / Showroom", value: "Shop" },
    { label: "Office Space", value: "Commercial" },
    { label: "Industrial Shed / Warehouse", value: "Industrial" },
    { label: "Penthouse", value: "Penthouse" },
  ]

  // Furnishing status
  const furnishingOptions = [
    { label: "Fully Furnished", value: "Furnished" },
    { label: "Semi-Furnished", value: "Semi-Furnished" },
    { label: "Unfurnished", value: "Unfurnished" },
  ]

  // Availability
  const availabilityOptions = [
    { label: "Immediate / Ready", value: "Immediate" },
    { label: "Within 15 Days", value: "15-days" },
    { label: "Within 30 Days", value: "30-days" },
  ]

  // Security deposit range
  const depositOptions = [
    { label: "Any Deposit", value: "" },
    { label: "Under ₹50,000", value: "under-50k" },
    { label: "₹50k – ₹1 Lakh", value: "50k-100k" },
    { label: "₹1 Lakh+", value: "above-100k" },
  ]

  // Carpet area
  const areaOptions = [
    { label: "Any Area", value: "" },
    { label: "Under 500 sqft", value: "under-500" },
    { label: "500 – 1,000 sqft", value: "500-1000" },
    { label: "1,000 – 1,500 sqft", value: "1000-1500" },
    { label: "1,500+ sqft", value: "1500-plus" },
  ]

  // Rental amenities
  const amenityOptions = [
    { label: "Gated Security / CCTV", value: "Security" },
    { label: "Lift / Elevator", value: "Elevator" },
    { label: "Power Backup", value: "Power Backup" },
    { label: "Reserved Parking", value: "Parking" },
    { label: "24x7 Water Supply", value: "Water" },
    { label: "Clubhouse & Gym", value: "Clubhouse" },
  ]

  // Sort options
  const sortOptions = [
    { label: "Featured", value: "Featured" },
    { label: "Newest First", value: "Newest First" },
    { label: "Rent: Low to High", value: "Rent: Low to High" },
    { label: "Rent: High to Low", value: "Rent: High to Low" },
  ]

  // Apply custom monthly rent input
  const handleApplyCustomRent = (e: React.FormEvent) => {
    e.preventDefault()
    const minVal = inputMin ? Number(inputMin) : 0
    const maxVal = inputMax ? Number(inputMax) : Infinity

    if (minVal < 0 || (inputMax && maxVal < 0)) {
      setRentError("Rent must be a positive number")
      return
    }

    if (inputMin && inputMax && minVal > maxVal) {
      setRentError("Min rent cannot exceed Max rent")
      return
    }

    setRentError("")
    onFilterChange({
      ...filters,
      rentMin: inputMin ? String(minVal) : "",
      rentMax: inputMax ? String(maxVal) : "",
      rentOnRequestOnly: false,
    })
    closeDropdown()
  }

  // Active status checks
  const isLocationActive = Boolean(filters.location)
  const isRentActive = Boolean(filters.rentMin || filters.rentMax || filters.rentOnRequestOnly)
  const isBedsBathsActive = Boolean(filters.bedsMin || filters.bathsMin)
  const isTypeActive = filters.propertyType.length > 0
  const moreFiltersCount = [
    filters.furnishing.length > 0,
    filters.availability.length > 0,
    Boolean(filters.depositRange),
    Boolean(filters.sqftRange),
    filters.amenities.length > 0,
  ].filter(Boolean).length

  // Rent button label
  const rentLabel = (() => {
    if (filters.rentOnRequestOnly) return "Rent on Request"
    if (filters.rentMin && filters.rentMax) {
      const minK = Math.round(Number(filters.rentMin) / 1000)
      const maxK = Math.round(Number(filters.rentMax) / 1000)
      return `₹${minK}k – ₹${maxK}k / mo`
    }
    if (filters.rentMax) {
      const maxK = Math.round(Number(filters.rentMax) / 1000)
      return `Under ₹${maxK}k / mo`
    }
    if (filters.rentMin) {
      const minK = Math.round(Number(filters.rentMin) / 1000)
      return `From ₹${minK}k / mo`
    }
    return "Monthly Rent"
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
    if (filters.propertyType.length === 1) {
      const match = propertyTypes.find((t) => t.value === filters.propertyType[0])
      return match ? match.label.split(" / ")[0] : filters.propertyType[0]
    }
    if (filters.propertyType.length > 1) {
      return `Type (${filters.propertyType.length})`
    }
    return "Property Type"
  })()

  return (
    <nav
      ref={navRef}
      aria-label="Rental marketplace filters"
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
              aria-label="Filter by locality"
              className={`h-9 px-3 inline-flex items-center gap-1.5 text-[13px] font-medium rounded-md border transition-colors whitespace-nowrap ${
                isLocationActive
                  ? "bg-foreground text-background border-foreground font-semibold"
                  : "bg-background text-foreground/85 border-border/80 hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              <MapPin className="h-3.5 w-3.5 shrink-0 opacity-70" />
              <span>{isLocationActive ? filters.location : "Location"}</span>
              <ChevronDown
                className={`h-3 w-3 opacity-60 transition-transform ${
                  activeDropdown === "location" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeDropdown === "location" && (
              <div
                style={{ maxHeight: `${Math.min(maxDropdownHeight, 360)}px` }}
                className={`absolute ${
                  dropDirection === "up" ? "bottom-full mb-1.5" : "top-full mt-1.5"
                } left-0 bg-card border border-border rounded-md shadow-xl p-1.5 z-50 w-[240px] max-w-[calc(100vw-2rem)] overflow-y-auto animate-in fade-in zoom-in-95 duration-100`}
              >
                <div className="flex items-center justify-between px-2.5 py-1 text-[11px] font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-card z-10 border-b border-border/50">
                  <span>MMR Localities</span>
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
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── 2. MONTHLY RENT FILTER ────────────────── */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => toggleDropdown("rent")}
              aria-expanded={activeDropdown === "rent"}
              aria-label="Filter by monthly rent"
              className={`h-9 px-3 inline-flex items-center gap-1.5 text-[13px] font-medium rounded-md border transition-colors whitespace-nowrap ${
                isRentActive
                  ? "bg-foreground text-background border-foreground font-semibold"
                  : "bg-background text-foreground/85 border-border/80 hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              <span>{rentLabel}</span>
              <ChevronDown
                className={`h-3 w-3 opacity-60 transition-transform ${
                  activeDropdown === "rent" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeDropdown === "rent" && (
              <div
                style={{ maxHeight: `${maxDropdownHeight}px` }}
                className={`absolute ${
                  dropDirection === "up" ? "bottom-full mb-1.5" : "top-full mt-1.5"
                } left-0 bg-card border border-border rounded-lg shadow-xl p-3.5 z-50 w-[300px] sm:w-[320px] max-w-[calc(100vw-2rem)] overflow-y-auto animate-in fade-in zoom-in-95 duration-100`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    Monthly Rent (₹ / Month)
                  </p>
                  {isRentActive && (
                    <button
                      type="button"
                      onClick={() => {
                        onFilterChange({
                          ...filters,
                          rentMin: "",
                          rentMax: "",
                          rentOnRequestOnly: false,
                        })
                        setInputMin("")
                        setInputMax("")
                        closeDropdown()
                      }}
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Min / Max Rent Inputs */}
                <form onSubmit={handleApplyCustomRent} className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="0"
                        step="500"
                        placeholder="Min ₹"
                        value={inputMin}
                        onChange={(e) => {
                          setInputMin(e.target.value)
                          setRentError("")
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                      />
                    </div>
                    <span className="text-muted-foreground text-xs font-medium shrink-0">–</span>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="0"
                        step="500"
                        placeholder="Max ₹"
                        value={inputMax}
                        onChange={(e) => {
                          setInputMax(e.target.value)
                          setRentError("")
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
                  {rentError && (
                    <p className="text-[11px] text-destructive font-medium">{rentError}</p>
                  )}
                </form>

                {/* Quick Monthly Rent Tiers */}
                <div className="pt-2.5 border-t border-border/80">
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Rent Tiers
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {rentPresets.map((preset) => {
                      const isSelected = preset.onRequest
                        ? filters.rentOnRequestOnly
                        : !filters.rentOnRequestOnly &&
                          filters.rentMin === preset.min &&
                          filters.rentMax === preset.max

                      return (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => {
                            onFilterChange({
                              ...filters,
                              rentMin: preset.min,
                              rentMax: preset.max,
                              rentOnRequestOnly: preset.onRequest,
                            })
                            closeDropdown()
                          }}
                          className={`px-2 py-1.5 text-xs rounded-md border text-center transition-colors font-medium truncate ${
                            preset.span2 ? "col-span-2" : ""
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
              <ChevronDown
                className={`h-3 w-3 opacity-60 transition-transform ${
                  activeDropdown === "beds" ? "rotate-180" : ""
                }`}
              />
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
                <div className="grid grid-cols-5 gap-1.5 mb-3">
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
                        key={opt.label}
                        type="button"
                        onClick={() => updateFilter("bedsMin", opt.val)}
                        className={`h-8 rounded text-[11px] sm:text-xs font-medium border transition-colors whitespace-nowrap flex items-center justify-center ${
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

                <div className="flex items-center justify-between mb-2 pt-2 border-t border-border/80">
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
              <ChevronDown
                className={`h-3 w-3 opacity-60 transition-transform ${
                  activeDropdown === "propertyType" ? "rotate-180" : ""
                }`}
              />
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
                      onClick={() => updateFilter("propertyType", [])}
                      className="text-primary hover:underline lowercase font-normal"
                    >
                      clear
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  {propertyTypes.map((type) => {
                    const isChecked = filters.propertyType.includes(type.value)
                    return (
                      <label
                        key={type.value}
                        className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-muted/70 cursor-pointer text-[13px] text-foreground transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleArrayFilter("propertyType", type.value)}
                            className="h-3.5 w-3.5 rounded border-border text-primary focus:ring-0 accent-foreground cursor-pointer"
                          />
                          <span>{type.label}</span>
                        </div>
                      </label>
                    )
                  })}
                </div>
                <div className="mt-2.5 pt-2 border-t border-border flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => updateFilter("propertyType", [])}
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

          {/* ── 5. MORE FILTERS (Rental-Specific) ──────── */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => toggleDropdown("moreFilters")}
              aria-expanded={activeDropdown === "moreFilters"}
              aria-label="More rental filters"
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
              <ChevronDown
                className={`h-3 w-3 opacity-60 transition-transform ${
                  activeDropdown === "moreFilters" ? "rotate-180" : ""
                }`}
              />
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
                    Additional Rental Filters
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

                {/* Scrollable Categories — with modern sleek scrollbar */}
                <div className="p-5 space-y-5 overflow-y-auto flex-1 min-h-0 modern-scrollbar">
                  {/* Furnishing Status */}
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Furnishing Status
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

                  {/* Availability */}
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Availability
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {availabilityOptions.map((opt) => {
                        const isSelected = filters.availability.includes(opt.value)
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => toggleArrayFilter("availability", opt.value)}
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

                  {/* Security Deposit */}
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Security Deposit
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {depositOptions.map((opt) => {
                        const isSelected = filters.depositRange === opt.value
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => updateFilter("depositRange", opt.value)}
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

                  {/* Amenities */}
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

                {/* Sticky Footer Actions */}
                <div className="px-5 py-3 border-t border-border/80 bg-card shrink-0 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onFilterChange({
                        ...filters,
                        furnishing: [],
                        availability: [],
                        depositRange: "",
                        sqftRange: "",
                        amenities: [],
                      })
                      closeDropdown()
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground hover:underline font-medium"
                  >
                    Clear extra filters
                  </button>
                  <div className="flex-1" />
                  <button
                    type="button"
                    onClick={closeDropdown}
                    className="px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={closeDropdown}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-foreground text-background hover:bg-foreground/90 rounded-md transition-colors shadow-xs"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Clear All Button */}
          {(isLocationActive || isRentActive || isBedsBathsActive || isTypeActive || moreFiltersCount > 0) && (
            <button
              type="button"
              onClick={onReset}
              className="h-9 px-2.5 text-xs text-muted-foreground hover:text-foreground font-medium flex items-center gap-1 transition-colors shrink-0"
              title="Reset all filters"
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
              aria-label="Sort rental properties"
              className="h-9 px-3 inline-flex items-center gap-1.5 text-[13px] font-medium rounded-md border border-border/80 bg-background text-foreground/85 hover:border-foreground/40 hover:text-foreground transition-colors whitespace-nowrap"
            >
              <ArrowUpDown className="h-3.5 w-3.5 opacity-60" />
              <span>Sort: {filters.sortBy}</span>
              <ChevronDown
                className={`h-3 w-3 opacity-60 transition-transform ${
                  activeDropdown === "sort" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeDropdown === "sort" && (
              <div
                style={{ maxHeight: `${Math.min(maxDropdownHeight, 300)}px` }}
                className={`absolute ${
                  dropDirection === "up" ? "bottom-full mb-1.5" : "top-full mt-1.5"
                } right-0 bg-card border border-border rounded-md shadow-xl p-1 z-50 min-w-[190px] overflow-y-auto animate-in fade-in zoom-in-95 duration-100`}
              >
                <p className="text-[11px] font-medium text-muted-foreground px-2.5 py-1 uppercase tracking-wider">
                  Sort Rentals
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
        <div className="fixed inset-0 z-30 bg-transparent" onClick={closeDropdown} />
      )}
    </nav>
  )
}

