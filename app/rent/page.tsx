"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Building2, Building, Warehouse, X, MapPin, ArrowRight, ShieldCheck, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/property-card"
import { saveInquiry, nextInquiryId } from "@/lib/admin-store"
import { useRentProperties } from "@/hooks/use-properties"
import { AnimatedGroup } from "@/components/core/animated-group"

const rentalTypes = [
  { icon: Building2, label: "Residential" },
  { icon: Building, label: "Commercial" },
  { icon: Warehouse, label: "Industrial" },
]

const QUICK_RENT_CITIES = [
  "All",
  "Ambernath",
  "Badlapur",
  "Ulhasnagar",
  "Kalyan",
  "Dombivli",
  "Thane",
]

function RentPageContent() {
  const searchParams = useSearchParams()
  const [activeType, setActiveType] = useState("All")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "")
  const [activeCity, setActiveCity] = useState(searchParams.get("q") ?? "All")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [rentArea, setRentArea] = useState("")
  const [budget, setBudget] = useState("")
  const [enquirySuccess, setEnquirySuccess] = useState(false)

  const allRentProperties = useRentProperties()

  const handleCityClick = (city: string) => {
    setActiveCity(city)
    if (city === "All") {
      setSearchQuery("")
    } else {
      setSearchQuery(city)
    }
  }

  const filtered = allRentProperties.filter((p) => {
    const matchType =
      activeType === "All" ||
      (p.category ?? "").toLowerCase() === activeType.toLowerCase() ||
      (p.type ?? "").toLowerCase().includes(activeType.toLowerCase())

    const q = searchQuery.trim().toLowerCase()
    const matchSearch =
      !q || [p.address, p.city, p.state ?? "", p.description ?? ""].join(" ").toLowerCase().includes(q)

    return matchType && matchSearch
  })

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() && !phone.trim()) return

    saveInquiry({
      id: nextInquiryId(),
      name: name.trim() || "Anonymous",
      phone: phone.trim(),
      email: "",
      interest: `Rental – ${activeType !== "All" ? activeType : "Any type"} in ${rentArea.trim() || "MMR"}`,
      message: `Budget: ${budget.trim() || "Not specified"}`,
      status: "new",
      date: new Date().toISOString(),
    })

    const msg = `Hi Shree Balaji Enterprises, I am looking for a rental property.%0AName: ${encodeURIComponent(name.trim())}%0APhone: ${encodeURIComponent(phone.trim())}%0APreferred Area: ${encodeURIComponent(rentArea.trim() || "MMR")}%0AMonthly Budget: ${encodeURIComponent(budget.trim() || "Flexible")}%0AType: ${encodeURIComponent(activeType)}`
    window.open(`https://wa.me/917767805544?text=${msg}`, "_blank")
    setEnquirySuccess(true)
    setTimeout(() => setEnquirySuccess(false), 5000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ── Rental Marketplace Search & Header ───────────── */}
      <section className="pt-6 sm:pt-8 pb-5 border-b border-border bg-card/60">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  Properties for Rent
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                  {filtered.length} Listed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                Verified flats, commercial shops, and industrial units across Ambernath, Badlapur, Kalyan &amp; MMR.
              </p>
            </div>

            {/* Rental Search Input */}
            <div className="w-full lg:w-80">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search city, area or property..."
                  className="w-full pl-9.5 pr-8 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("")
                      setActiveCity("All")
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Rental Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-border/60">
            {/* Category selection */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mr-1 shrink-0">
                Type:
              </span>
              <button
                onClick={() => setActiveType("All")}
                className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                  activeType === "All"
                    ? "bg-foreground text-background shadow-xs"
                    : "bg-muted/70 text-foreground/80 hover:bg-muted border border-border/50"
                }`}
              >
                All Types
              </button>
              {rentalTypes.map((type) => (
                <button
                  key={type.label}
                  onClick={() => setActiveType(type.label)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                    activeType === type.label
                      ? "bg-foreground text-background shadow-xs"
                      : "bg-muted/70 text-foreground/80 hover:bg-muted border border-border/50"
                  }`}
                >
                  <type.icon className="h-3 w-3" />
                  <span>{type.label}</span>
                </button>
              ))}
            </div>

            {/* City selection */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mr-1 shrink-0">
                City:
              </span>
              {QUICK_RENT_CITIES.map((city) => {
                const isSelected = activeCity.toLowerCase() === city.toLowerCase()
                return (
                  <button
                    key={city}
                    onClick={() => handleCityClick(city)}
                    className={`px-2.5 py-0.5 rounded text-xs font-medium whitespace-nowrap transition-all ${
                      isSelected
                        ? "bg-primary text-primary-foreground font-bold shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {city}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Listings Column */}
          <div className="flex-1">
            <div className="mb-6 flex items-baseline justify-between border-b border-border/50 pb-3">
              <p className="text-sm font-medium text-muted-foreground">
                Showing <span className="font-bold text-foreground">{filtered.length}</span> rental{filtered.length !== 1 ? "s" : ""}
                {searchQuery && <span> in <span className="text-foreground font-semibold">&ldquo;{searchQuery}&rdquo;</span></span>}
                {activeType !== "All" && <span> · <span className="text-foreground font-semibold">{activeType}</span></span>}
              </p>
              {(searchQuery || activeType !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setActiveType("All")
                    setActiveCity("All")
                  }}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="py-24 text-center bg-card rounded-2xl border border-border/80 max-w-lg mx-auto p-8 shadow-xs">
                <Building2 className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40" />
                <p className="text-lg font-black text-foreground mb-1">No rentals match your criteria</p>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  We frequently add new rental listings. Submit an enquiry on the right or reset your filters to see all available properties.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveType("All")
                    setActiveCity("All")
                  }}
                  className="px-5 py-2.5 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs"
                >
                  View All Rentals
                </button>
              </div>
            ) : (
              <AnimatedGroup
                key={activeType + searchQuery}
                preset="fade"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </AnimatedGroup>
            )}
          </div>

          {/* Sticky Enquiry Card */}
          <div className="lg:w-[360px] shrink-0">
            <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] sticky top-24">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-primary mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Zero Brokerage Surprise</span>
              </div>
              <h2 className="text-xl font-black text-foreground tracking-tight mb-1">
                Looking for a Rental?
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                Can&apos;t find your exact specification? Share your requirements and our team will match you with upcoming listings.
              </p>

              <form onSubmit={handleEnquiry} className="flex flex-col gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Preferred Area / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ambernath East, Badlapur"
                    value={rentArea}
                    onChange={(e) => setRentArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Monthly Budget (₹)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹8,000 – ₹15,000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 text-xs font-bold mt-2 shadow-xs gap-2"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span>Submit Rental Enquiry</span>
                </Button>
              </form>

              {enquirySuccess && (
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-3 text-center">
                  ✅ Enquiry submitted! Redirecting to WhatsApp...
                </p>
              )}

              <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <PhoneCall className="h-3.5 w-3.5 text-primary" />
                  <span>Call: +91 77678 05544</span>
                </span>
                <span>Response in &lt;2 hrs</span>
              </div>
            </div>
          </div>
        </div>
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
