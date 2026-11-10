"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Phone,
  MapPin,
  ChevronRight,
  Check,
} from "lucide-react"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { saveInquiry, nextInquiryId } from "@/lib/admin-store"

const WHATSAPP_NUMBER = "917767805544"
const PHONE_DISPLAY = "+91 77678 05544"

// ── 4-Stage Selling Protocol (Editorial Timeline) ────────────────────
const sellingRoadmap = [
  {
    step: "01",
    title: "Property Inspection & Valuation",
    description:
      "We inspect your property in person, verify usable carpet area, assess natural light and maintenance condition, and benchmark realistic pricing against recent registered Sub-Registrar transactions in your immediate micro-pocket.",
  },
  {
    step: "02",
    title: "Strategic Presentation & Paperwork",
    description:
      "We curate accurate property details, floor plans, and photography. Simultaneously, we examine the title chain, society NOC requirements, and tax clearance to ensure your asset is transaction-ready.",
  },
  {
    step: "03",
    title: "Screened Buyer Matching & Viewings",
    description:
      "Instead of exposing your home to casual visitors, we match your listing directly with pre-screened buyers and families actively searching in our verified MMR network. Viewings are scheduled strictly around your family's routine.",
  },
  {
    step: "04",
    title: "Price Negotiation & Sub-Registrar Deed",
    description:
      "Our senior advisors manage offer discussions to protect your target value. We draft the agreement for sale, compute stamp duty, coordinate bank releases if under mortgage, and accompany you through biometric deed registration.",
  },
]

// ── Geographic Service Corridors ──────────────────────────────────────
const serviceCorridors = [
  {
    locality: "Ambernath (East & West)",
    role: "Head Office & Home Ground",
    summary:
      "Resale apartments in established societies near the railway station, independent bungalows in Shiv Mandir and green belts, and MIDC commercial/industrial units.",
  },
  {
    locality: "Badlapur (East & West)",
    role: "Affordable Family Housing",
    summary:
      "Fast-moving resale flats in gated residential townships, river-adjacent complexes, and scenic weekend second homes with clear title documentation.",
  },
  {
    locality: "Ulhasnagar",
    role: "Commercial & High-Velocity Retail",
    summary:
      "High-street retail shops, commercial showrooms, furniture market corridors, and established cooperative housing societies.",
  },
  {
    locality: "Kalyan & Dombivli",
    role: "Central MMR Urban Corridor",
    summary:
      "Modern township resales, established family societies near railway junctions, and appreciating office and retail assets.",
  },
  {
    locality: "Titwala & Central Corridors",
    role: "Transit-Oriented Growth Nodes",
    summary:
      "Appreciating suburban residential developments, budget first-home resales, and clear-title residential land parcels.",
  },
]

// ── Frequently Asked Seller Questions ─────────────────────────────────
const sellerFaqs = [
  {
    q: "How much does the property valuation cost?",
    a: "Our property valuation is 100% free with zero obligation. An experienced consultant visits your property, reviews recent registered sales comps in your immediate building or locality, and provides an honest market appraisal.",
  },
  {
    q: "What documents are required to initiate the sale?",
    a: "To begin, we need a copy of your registered Agreement for Sale, Society Share Certificate, and latest Property Tax receipt. If your property is currently mortgaged, we coordinate with your lending institution to obtain the List of Original Documents (LOD).",
  },
  {
    q: "How long does it typically take to find a verified buyer?",
    a: "Properties priced in line with current market comps in Ambernath and Badlapur typically secure serious buyer offers within 30 to 60 days. Overpriced listings linger; our valuation is designed to protect your value without stalling.",
  },
  {
    q: "When is brokerage paid?",
    a: "Brokerage is payable strictly upon the successful conclusion of the transaction and execution of the registered sale deed at the Sub-Registrar office. We charge zero upfront fees for marketing, photography, or client consultations.",
  },
  {
    q: "Can you help sell a commercial shop, industrial shed, or land parcel?",
    a: "Yes. Alongside residential resales, Shree Balaji Enterprises actively handles commercial shops, corporate office floors, MIDC industrial plots, and clear-title NA land parcels across Thane district.",
  },
]

export default function SellPage() {
  // Form State
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("Ambernath East")
  const [propertyType, setPropertyType] = useState("Residential Flat")
  const [carpetArea, setCarpetArea] = useState("")
  const [expectedPrice, setExpectedPrice] = useState("")
  const [notes, setNotes] = useState("")

  // Form Status State
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Accordion State for FAQs
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx))
  }

  // Validation
  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {}
    if (!name.trim()) {
      newErrors.name = "Please provide your full name."
    }
    const cleanPhone = phone.replace(/[^0-9]/g, "")
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Form Submission
  const handleSubmitValuation = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    const inquiryDetails = [
      `Asset: ${propertyType} in ${city}`,
      carpetArea ? `Area: ${carpetArea.trim()}` : null,
      expectedPrice ? `Target Price: ${expectedPrice.trim()}` : "Target: Market Comps",
      notes ? `Notes: ${notes.trim()}` : null,
    ]
      .filter(Boolean)
      .join(" | ")

    // Save to LocalStorage for admin dashboard visibility
    try {
      saveInquiry({
        id: nextInquiryId(),
        name: name.trim(),
        phone: phone.trim(),
        email: "",
        interest: `Sell Property – ${propertyType} (${city})`,
        message: inquiryDetails,
        status: "new",
        date: new Date().toISOString(),
      })
    } catch {
      // Graceful fallback if storage is restricted
    }

    // Direct WhatsApp message formatting
    const msg = [
      "Hello Anju ji & Shree Balaji Enterprises,",
      "I would like to request a Free Property Valuation for selling my property:",
      `• Owner Name: ${name.trim()}`,
      `• Contact: ${phone.trim()}`,
      `• Location: ${city}`,
      `• Property Type: ${propertyType}`,
      carpetArea ? `• Carpet Area: ${carpetArea.trim()}` : null,
      expectedPrice ? `• Expected Price: ${expectedPrice.trim()}` : "• Expected Price: Advise on current comps",
      notes ? `• Additional Details: ${notes.trim()}` : null,
      "",
      "Please review and contact me with market comp details.",
    ]
      .filter(Boolean)
      .join("\n")

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank")

    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleResetForm = () => {
    setName("")
    setPhone("")
    setCarpetArea("")
    setExpectedPrice("")
    setNotes("")
    setSubmitted(false)
    setErrors({})
  }

  const scrollToValuation = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById("valuation-desk")
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleDirectWhatsApp = () => {
    const msg =
      "Hello Anju ji, I am planning to sell my property in Ambernath / MMR. Please advise on current market valuation and procedure."
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Breadcrumb Navigation ──────────────────────────────────── */}
      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
            <span className="text-foreground font-medium">Sell Your Property</span>
          </nav>
        </div>
      </div>

      {/* ── 1. Hero Section: Editorial & Authentic Real Estate ──────── */}
      <header className="pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-border/80">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Typographic Narrative */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/40 px-3.5 py-1 text-xs text-muted-foreground mb-6">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span className="font-medium text-foreground">MahaRERA Registered A51700023633</span>
                <span className="text-muted-foreground/40">·</span>
                <span>Est. 2016</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-[52px] font-black tracking-tight text-foreground leading-[1.08] mb-6">
                Your Next Chapter{" "}
                <span className="text-muted-foreground font-light italic">Starts Here.</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                A real-estate transaction represents years of family equity. We provide verified property valuations based on actual registered Sub-Registrar comps, connect you directly with screened buyers, and manage legal conveyance from title check to final deed execution across Ambernath, Badlapur, and the wider MMR corridor.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#valuation-desk"
                  onClick={scrollToValuation}
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all shadow-xs"
                >
                  <span>Request Free Property Valuation</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-current shrink-0" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>

              {/* Factual Footnote */}
              <p className="text-xs text-muted-foreground/80 mt-6">
                Zero upfront fees. Valuation, photography, and marketing are complimentary. Brokerage applies strictly upon registered deed completion.
              </p>
            </div>

            {/* Right Column: Authentic Local Real Estate Photography */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border/80 bg-muted shadow-sm">
                <Image
                  src="/images/properties/ambernath/tharwani-ariana/whatsapp-image-2026-10-30-at-12.48.19-am.jpg"
                  alt="Authentic residential architecture in Ambernath - Shree Balaji Enterprises"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="p-3 rounded-lg bg-background/95 backdrop-blur-md border border-border/80 text-xs shadow-xs">
                    <p className="font-semibold text-foreground">
                      Local Property Advisory Desk
                    </p>
                    <a
                      href="https://share.google/wXb6cKV7lpMgo9P4c"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-muted-foreground hover:text-primary transition-colors block mt-0.5 group"
                      title="Open in Google Maps"
                    >
                      <span className="group-hover:underline">Shop No. 6, Vallabh Building, Avdhoot Residency, Near Sarvodaya Nagar, Chikhloli, Ambernath (West) 421505</span>
                      <span className="text-primary font-medium ml-1">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ── 2. The Valuation Desk: Editorial Explanation & Form ─────── */}
      <section id="valuation-desk" className="py-16 sm:py-24 border-b border-border/80 scroll-mt-8">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Column: The Editorial Valuation Philosophy */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-2">
                  Market Appraisal
                </p>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-tight">
                  Why Realistic Valuation is the Entire Strategy.
                </h2>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                In suburban real estate, inflated initial quotes are the primary cause of stagnant listings. When a property sits on portals for months, buyers assume underlying legal or physical flaws, forcing deep distress discounts later.
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Shree Balaji Enterprises calculates target pricing grounded in actual executed reality rather than aspirational portal claims:
              </p>

              {/* Editorial Breakdown */}
              <div className="space-y-4 pt-2 border-t border-border/70 text-xs">
                <div>
                  <h3 className="font-bold text-foreground text-sm mb-1">
                    1. Registered Sub-Registrar Comps
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We reference actual executed and stamp-duty paid sale deed values in your immediate building or street, not speculative asking prices.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground text-sm mb-1">
                    2. Usable Carpet &amp; Physical Efficiency
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    RERA carpet area measurement, building age, society maintenance track record, floor height, and road frontage determine true liveability value.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground text-sm mb-1">
                    3. Live Buyer Absorption Velocity
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We match your configuration directly against verified buyer inquiries actively looking in Ambernath and the Central MMR corridor right now.
                  </p>
                </div>
              </div>

              {/* Direct Telephone Strip */}
              <div className="pt-4 border-t border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="text-muted-foreground">Prefer an immediate phone consultation?</span>
                <a
                  href={`tel:${PHONE_DISPLAY.replace(/[^0-9+]/g, "")}`}
                  className="font-bold text-primary hover:underline inline-flex items-center gap-1.5"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Clean Business Valuation Form */}
            <div className="lg:col-span-7">
              <div className="border border-border/80 rounded-2xl bg-card p-6 sm:p-8 shadow-xs">
                
                {submitted ? (
                  <div className="py-10 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                      <Check className="h-6 w-6 stroke-[2.5]" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Valuation Request Registered
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
                      Thank you, <span className="font-semibold text-foreground">{name}</span>. Your property valuation request has been logged. Anju Sharma and our local comp specialist will review recent registered sales for your property and contact you at <span className="font-semibold text-foreground">{phone}</span> shortly.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleDirectWhatsApp}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold transition-all shadow-xs"
                      >
                        <WhatsAppIcon className="h-3.5 w-3.5 fill-current shrink-0" />
                        <span>Continue on WhatsApp</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground border border-border/80 rounded-lg hover:bg-muted transition-colors"
                      >
                        Submit Another Property
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="border-b border-border/60 pb-4 mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">
                        Request a Free Property Valuation
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Please provide basic details about your property. All information is held in strict professional confidence.
                      </p>
                    </div>

                    <form onSubmit={handleSubmitValuation} className="space-y-4">
                      {/* Row 1: Name & Mobile Number */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">
                            Owner / Representative Name <span className="text-destructive">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ramesh Patil"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value)
                              if (errors.name) setErrors({ ...errors, name: undefined })
                            }}
                            className={`w-full px-3 py-2 text-xs border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                              errors.name ? "border-destructive" : "border-border"
                            }`}
                          />
                          {errors.name && (
                            <p className="text-[11px] text-destructive mt-1">{errors.name}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">
                            Mobile Number <span className="text-destructive">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. 98765 43210"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value)
                              if (errors.phone) setErrors({ ...errors, phone: undefined })
                            }}
                            className={`w-full px-3 py-2 text-xs border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                              errors.phone ? "border-destructive" : "border-border"
                            }`}
                          />
                          {errors.phone && (
                            <p className="text-[11px] text-destructive mt-1">{errors.phone}</p>
                          )}
                        </div>
                      </div>

                      {/* Row 2: Location & Property Category */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">
                            Property Locality <span className="text-destructive">*</span>
                          </label>
                          <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          >
                            <option value="Ambernath East">Ambernath (East)</option>
                            <option value="Ambernath West">Ambernath (West)</option>
                            <option value="Badlapur East">Badlapur (East)</option>
                            <option value="Badlapur West">Badlapur (West)</option>
                            <option value="Ulhasnagar">Ulhasnagar</option>
                            <option value="Kalyan">Kalyan</option>
                            <option value="Dombivli">Dombivli</option>
                            <option value="Titwala">Titwala</option>
                            <option value="Thane">Thane</option>
                            <option value="Other MMR Location">Other MMR Location</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">
                            Property Type <span className="text-destructive">*</span>
                          </label>
                          <select
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          >
                            <option value="Residential Flat">Residential Flat (1 / 2 / 3 BHK)</option>
                            <option value="Independent Bungalow">Independent Bungalow / Villa</option>
                            <option value="Row House">Row House</option>
                            <option value="Commercial Shop">Commercial Retail Shop</option>
                            <option value="Office Space">Commercial Office Space</option>
                            <option value="Industrial Shed / MIDC">Industrial Shed / MIDC Unit</option>
                            <option value="NA Plot / Land">NA Residential Plot / Land</option>
                          </select>
                        </div>
                      </div>

                      {/* Row 3: Carpet Area & Target Price */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">
                            Carpet Area / Size (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 650 sq.ft or 2 BHK"
                            value={carpetArea}
                            onChange={(e) => setCarpetArea(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">
                            Expected Valuation (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. ₹45 Lakh (or Advise on Comps)"
                            value={expectedPrice}
                            onChange={(e) => setExpectedPrice(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>
                      </div>

                      {/* Row 4: Society & Notes */}
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">
                          Building / Society Name &amp; Key Details (Optional)
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Near Shiv Mandir, 3rd floor, lift available, ready OC received..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                        />
                      </div>

                      {/* Submit Action */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all shadow-xs disabled:opacity-70 mt-2"
                      >
                        <span>{isSubmitting ? "Submitting Request..." : "Request Valuation & Callback"}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>

                      <p className="text-[11px] text-muted-foreground text-center pt-1">
                        🔒 Confidential inquiry. We do not sell or share contact numbers with third parties.
                      </p>
                    </form>
                  </>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. How We Help You Sell: Editorial Process Timeline ─────── */}
      <section className="py-16 sm:py-24 border-b border-border/80 bg-muted/10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12 sm:mb-16">
            <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-2">
              The Selling Protocol
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-3">
              How We Help You Sell Your Property.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              From our first walk-through to the biometric registration at the Sub-Registrar office, every milestone is managed with personal oversight and procedural rigor.
            </p>
          </div>

          {/* Connected Horizontal Timeline (Desktop) & Clean Sequence (Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 relative">
            {sellingRoadmap.map((item, idx) => (
              <div key={item.step} className="relative flex flex-col pt-4 border-t-2 border-border/80">
                {/* Stage Indicator */}
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-mono text-2xl font-black text-primary">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Stage {idx + 1}
                  </span>
                </div>

                <h3 className="text-base font-bold text-foreground mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. Business Strengths: Asymmetric Editorial Composition ─── */}
      <section className="py-16 sm:py-24 border-b border-border/80">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left 5 Cols: Introduction & Architectural Visual */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-2">
                  Institutional Grounding
                </p>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-tight">
                  Why Property Owners Work With Us.
                </h2>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Real estate representation requires local credibility, legal accuracy, and authentic buyer relationships. We operate as an established local agency, not a faceless tech platform or an unorganized roadside broker.
              </p>

              {/* Supporting Authentic Architecture Visual */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-border/80 bg-muted">
                <Image
                  src="/images/properties/ambernath/empire-centrum/whatsapp-image-2026-10-25-at-5.49.53-pm-1.jpg"
                  alt="Established real estate practice in Ambernath"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <p className="text-[11px] text-muted-foreground italic">
                Representing residential and commercial properties across Ambernath, Badlapur, and MMR since 2016.
              </p>
            </div>

            {/* Right 7 Cols: 4 Deep Editorial Capabilities */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-foreground">
                  Sub-Registrar Ground Comp Intelligence
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Suburban micro-markets vary dramatically between adjacent societies. Because our team is based physically in Ambernath, we monitor actual executed deeds and know what properties are legitimately selling for today.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-foreground">
                  Active Network of Screened Buyers
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We maintain ongoing relationships with hundreds of local families, business owners, and verified investors with pre-approved banking finances. Viewings are limited to serious, qualified home seekers.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-foreground">
                  MahaRERA Statutory Compliance
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Operating strictly under MahaRERA Agency Registration No. A51700023633. We adhere to Maharashtra regulatory standards: transparent agency terms, clear written communication, and complete statutory legitimacy.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-foreground">
                  End-to-End Legal Conveyance
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Selling property involves comprehensive documentation. Our advisory team coordinates 30-year title searches, society NOCs, encumbrance clearances, sale deed drafting, and physical Sub-Registrar appointments.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. Geographic Service Corridors (Simplified Typographic Index) ─ */}
      <section className="py-16 sm:py-24 border-b border-border/80 bg-muted/10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-border/60">
            <div>
              <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-2">
                Geographic Coverage
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                Where We Actively Represent Sellers.
              </h2>
            </div>
            <Link
              href="/locations"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline self-start sm:self-auto"
            >
              <span>Explore All Location Guides</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Clean Editorial List with Dividers */}
          <div className="divide-y divide-border/60">
            {serviceCorridors.map((corridor) => (
              <div
                key={corridor.locality}
                className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 items-start"
              >
                <div className="md:col-span-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                    <h3 className="text-sm font-bold text-foreground">
                      {corridor.locality}
                    </h3>
                  </div>
                  <p className="text-[11px] font-medium text-muted-foreground pl-5.5 mt-0.5">
                    {corridor.role}
                  </p>
                </div>
                <div className="md:col-span-8 pl-5.5 md:pl-0">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {corridor.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Markets Note */}
          <div className="mt-8 pt-6 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>
              Looking to sell in Thane, Navi Mumbai, or other MMR growth nodes? We regularly advise clients with broader regional portfolios.
            </p>
            <a
              href="#valuation-desk"
              onClick={scrollToValuation}
              className="text-primary font-semibold hover:underline shrink-0"
            >
              Request Assessment &rarr;
            </a>
          </div>

        </div>
      </section>

      {/* ── 6. Seller FAQs: Clean Accessible Accordion ───────────────── */}
      <section className="py-16 sm:py-24 border-b border-border/80">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-2">
              Common Questions
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-3">
              Frequently Asked Seller Questions.
            </h2>
            <p className="text-sm text-muted-foreground">
              Clear, transparent answers to practical questions property owners have before listing.
            </p>
          </div>

          {/* Accessible Accordion Component */}
          <div className="divide-y divide-border/80 border-y border-border/80">
            {sellerFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div key={faq.q} className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-foreground hover:text-primary transition-colors py-1 focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pt-2.5 pb-2 text-xs sm:text-sm text-muted-foreground leading-relaxed pr-6 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── 7. Final Advisory Section: Considered Editorial Narrative ─ */}
      <section className="py-16 sm:py-24 bg-muted/15">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em]">
              Start the Conversation
            </p>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight leading-tight">
              Thinking About Selling Your Property?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Whether you are ready to sell now or exploring options for the coming months, a confidential discussion with Anju Sharma and our local advisory desk gives you genuine market clarity.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="#valuation-desk"
                onClick={scrollToValuation}
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all shadow-xs"
              >
                <span>Request a Property Valuation</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="inline-flex items-center justify-center gap-2.5 h-11 px-5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
              >
                <WhatsAppIcon className="h-4 w-4 fill-current shrink-0" />
                <span>WhatsApp Advisory Desk</span>
              </button>
            </div>

            {/* Direct Office & Telephone Details */}
            <div className="pt-8 mt-6 border-t border-border/70 flex flex-col items-center justify-center gap-3 text-xs text-muted-foreground text-center">
              <a
                href="https://share.google/wXb6cKV7lpMgo9P4c"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-wrap items-center justify-center gap-2 max-w-full hover:text-primary transition-colors group"
                title="View Shree Balaji Enterprises on Google Maps"
              >
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span className="underline-offset-4 group-hover:underline">Shop No. 6, Vallabh Building, Avdhoot Residency, Near Sarvodaya Nagar, Chikhloli, Ambernath (West) 421505</span>
                <span className="text-[11px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <span>Get Directions</span>
                  <span>&rarr;</span>
                </span>
              </a>
              <div className="flex items-center justify-center gap-2 font-medium">
                <span className="text-muted-foreground/80 font-normal">Direct Helpline:</span>
                <a
                  href={`tel:${PHONE_DISPLAY.replace(/[^0-9+]/g, "")}`}
                  className="whitespace-nowrap text-foreground hover:text-primary transition-colors font-semibold"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  )
}
