"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Handshake,
  FileCheck2,
  Calculator,
  PhoneCall,
  Clock,
  Award,
  Building2,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { InView } from "@/components/core/in-view"
import { AnimatedGroup } from "@/components/core/animated-group"
import { saveInquiry, nextInquiryId } from "@/lib/admin-store"

const steps = [
  {
    n: "01",
    icon: Calculator,
    title: "Free Valuation",
    body: "We visit, inspect your property, and provide an honest market price based on recent neighborhood sales — no inflation, no obligation.",
  },
  {
    n: "02",
    icon: Users,
    title: "Buyer Matching",
    body: "We match your property to pre-qualified buyers and families actively searching in our verified private network across MMR.",
  },
  {
    n: "03",
    icon: Handshake,
    title: "Fair Negotiation",
    body: "Our experienced brokers handle every offer, counter-offer, and price discussion on your behalf to protect your target value.",
  },
  {
    n: "04",
    icon: FileCheck2,
    title: "Registration & Close",
    body: "We manage all paperwork, title checks, agreement drafting, stamp duty and sub-registrar registration end-to-end.",
  },
]

const sellerBenefits = [
  {
    icon: ShieldCheck,
    title: "Zero Upfront Cost",
    desc: "Valuation, listing, and marketing are 100% free. You only pay standard brokerage upon successful deal completion.",
  },
  {
    icon: Users,
    title: "500+ Active Buyer Network",
    desc: "Immediate access to genuine families and investors seeking homes in Ambernath, Badlapur, Kalyan and across MMR.",
  },
  {
    icon: FileCheck2,
    title: "End-to-End Legal Paperwork",
    desc: "From title clearance and RERA verification to sub-registrar deed registration, our team manages all documentation.",
  },
  {
    icon: Clock,
    title: "Fast Average Turnaround",
    desc: "Accurate realistic pricing combined with targeted buyer matching leads to faster closures without months of waiting.",
  },
]

const WHATSAPP = "917767805544"

export default function SellPage() {
  const [propertyType, setPropertyType] = useState("Residential Flat")
  const [city, setCity] = useState("Ambernath")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [expectedPrice, setExpectedPrice] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmitValuation = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() && !phone.trim()) return

    saveInquiry({
      id: nextInquiryId(),
      name: name.trim() || "Property Seller",
      phone: phone.trim(),
      email: "",
      interest: `Sell Property – ${propertyType} in ${city}`,
      message: `Expected Price: ${expectedPrice.trim() || "Market Rate"}`,
      status: "new",
      date: new Date().toISOString(),
    })

    const msg = `Hi Shree Balaji Enterprises, I want to sell my property.%0AName: ${encodeURIComponent(name.trim())}%0APhone: ${encodeURIComponent(phone.trim())}%0AProperty: ${encodeURIComponent(propertyType)} in ${encodeURIComponent(city)}%0AExpected Price: ${encodeURIComponent(expectedPrice.trim() || "To be discussed")}`
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank")

    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const directWhatsApp = () => {
    const msg = encodeURIComponent("Hi Shree Balaji Enterprises, I'd like to sell my property. Please get in touch for a free valuation.")
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Corporate Service Header & Valuation Intake ──────── */}
      <section className="pt-10 sm:pt-14 pb-14 border-b border-border bg-gradient-to-b from-card/80 to-background">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Authoritative Advisory Presentation */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4 border border-primary/20">
                <ShieldCheck className="h-3.5 w-3.5" />
                MahaRERA Registered A51700023633 · Established 2016
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-[1.12] mb-5">
                Sell Your Property at Maximum Market Value with Proven Local Advisory
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                Over 500+ residential, commercial, and industrial properties successfully transacted across Ambernath, Badlapur, Kalyan and the wider Mumbai Metropolitan Region. We provide honest market appraisals, pre-qualified buyer matching, and complete legal conveyance from title verification to sub-registrar deed registration.
              </p>

              {/* Advisory Credential Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 pt-2 border-t border-border/80">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-foreground">500+</p>
                  <p className="text-xs font-semibold text-muted-foreground mt-0.5">Properties Transacted</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-foreground">₹0</p>
                  <p className="text-xs font-semibold text-muted-foreground mt-0.5">Upfront Listing Fee</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-foreground">15+ Yrs</p>
                  <p className="text-xs font-semibold text-muted-foreground mt-0.5">Hyper-Local Authority</p>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" onClick={directWhatsApp} className="h-11 px-6 text-xs sm:text-sm font-bold gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Instant Valuation via WhatsApp
                </Button>
                <a href="#valuation-form" className="text-xs sm:text-sm font-semibold text-primary hover:underline px-3 py-2">
                  Submit Online Request &darr;
                </a>
              </div>
            </div>

            {/* Right Column: Valuation Intake Desk */}
            <div id="valuation-form" className="lg:col-span-5 scroll-mt-24">
              <div className="rounded-xl border border-border bg-card p-6 sm:p-7 shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-border/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Seller Advisory Desk
                  </span>
                  <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2.5 py-0.5 rounded">
                    100% Free &bull; Confidential
                  </span>
                </div>

                <h2 className="text-xl font-bold text-foreground mb-1">
                  Request Free Property Valuation
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                  Submit your property specifics. An experienced senior consultant will assess recent regional comps and guide you on target pricing.
                </p>

                <form onSubmit={handleSubmitValuation} className="flex flex-col gap-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Asset Class
                      </label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                      >
                        <option value="Residential Flat">Residential Flat</option>
                        <option value="Independent Bungalow">Bungalow / Villa</option>
                        <option value="Row House">Row House</option>
                        <option value="Commercial Shop / Office">Commercial Shop</option>
                        <option value="Industrial Shed / Godown">Industrial Shed</option>
                        <option value="NA Plot / Land">NA Land Parcel</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        City / Locality
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                      >
                        <option value="Ambernath">Ambernath</option>
                        <option value="Badlapur">Badlapur</option>
                        <option value="Ulhasnagar">Ulhasnagar</option>
                        <option value="Kalyan">Kalyan</option>
                        <option value="Dombivli">Dombivli</option>
                        <option value="Thane">Thane</option>
                        <option value="Titwala">Titwala</option>
                        <option value="Other MMR">Other MMR Area</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patil"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
                      className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Expected Valuation (₹ Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹55 Lakh (or Market Comps)"
                      value={expectedPrice}
                      onChange={(e) => setExpectedPrice(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <Button type="submit" className="w-full h-10 text-xs font-bold mt-1">
                    Submit for Valuation &amp; Callback
                  </Button>
                </form>

                {submitted && (
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-2.5 text-center">
                    ✅ Inquiry registered. Our local advisor will contact you shortly.
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Comparison Matrix: Why Owners Work With SBE ─────── */}
      <section className="py-14 sm:py-20 bg-muted/30 border-b border-border">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-primary text-xs font-extrabold uppercase tracking-widest mb-2">
              Comparative Analysis
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Why Homeowners &amp; Landlords Choose Shree Balaji Enterprises
            </h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Real estate transactions represent life savings. Here is how our professional statutory framework protects your asset compared to unorganized local operators.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-xs">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-muted/60 border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 px-4">Service Feature</th>
                  <th className="py-3 px-4 text-primary font-extrabold">Shree Balaji Enterprises</th>
                  <th className="py-3 px-4 text-muted-foreground">Unorganized Local Brokers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr className="hover:bg-muted/20">
                  <td className="py-3.5 px-4 font-semibold text-foreground">Property Valuation &amp; Pricing</td>
                  <td className="py-3.5 px-4 text-foreground/90 font-medium">
                    Verified against recent sub-registrar registered sale deeds and localized demand indices.
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground">
                    Arbitrary quotes to win listings, followed by prolonged dead listing cycles.
                  </td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="py-3.5 px-4 font-semibold text-foreground">Buyer Screening</td>
                  <td className="py-3.5 px-4 text-foreground/90 font-medium">
                    100% pre-qualified families &amp; investors with pre-approved banking credit.
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground">
                    Unfiltered visitors disrupting your family&apos;s privacy without verification.
                  </td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="py-3.5 px-4 font-semibold text-foreground">Legal &amp; Conveyance Support</td>
                  <td className="py-3.5 px-4 text-foreground/90 font-medium">
                    Complete 30-year title verification, sale deed drafting, stamp duty &amp; registration.
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground">
                    Zero legal responsibility; buyer and seller left to negotiate registry alone.
                  </td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="py-3.5 px-4 font-semibold text-foreground">Fee Transparency</td>
                  <td className="py-3.5 px-4 text-foreground/90 font-medium">
                    Zero advance fees. Standard, documented brokerage charged only upon successful closure.
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground">
                    Hidden commissions, advance processing charges, or side-margin cuts.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 4-Stage Selling Roadmap ─────────────────────────── */}
      <section className="py-14 sm:py-20 border-b border-border">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-primary text-xs font-extrabold uppercase tracking-widest mb-2">
              Execution Protocol
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Our 4-Stage Property Selling Roadmap
            </h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              From our first walk-through to the sub-registrar counter, every milestone is managed with institutional precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="flex flex-col p-5 rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-mono font-black text-primary">
                    {s.n}
                  </span>
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <s.icon className="h-4.5 w-4.5" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Asset Classes Represented ───────────────────────── */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-primary text-xs font-extrabold uppercase tracking-widest mb-2">
                Inventory Portfolio
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Property Categories We Specialize In
              </h2>
            </div>
            <Link href="/contact" className="text-xs font-bold text-primary hover:underline">
              Schedule Property Inspection &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Residential Resales", desc: "1, 2, 3 BHK Flats, Gated Townships & Luxury Penthouses across MMR." },
              { title: "Commercial Spaces", desc: "High-street retail shops, prime showrooms, and corporate office floors." },
              { title: "Industrial & MIDC", desc: "Warehouses, logistics godowns, and industrial factory plots in MIDC zones." },
              { title: "Plots & Land", desc: "Clear-title NA residential plots, agricultural land parcels, and farmhouses." },
            ].map((c) => (
              <div key={c.title} className="p-4 rounded-lg border border-border bg-card/60">
                <h3 className="text-sm font-bold text-foreground mb-1">{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 border-t border-border bg-card/40">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 sm:p-12 rounded-2xl bg-foreground text-background">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                Find Out What Your Property is Worth Today
              </h2>
              <p className="text-sm text-background/70 leading-relaxed">
                No advance fees. No obligation. An authentic, data-backed conversation about your property and current buyer demand.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button size="lg" onClick={directWhatsApp} className="h-11 px-6 text-xs sm:text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                WhatsApp Consultation
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-11 px-6 text-xs sm:text-sm font-bold bg-transparent border-background/30 text-background hover:bg-background/10">
                  Visit Office
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
