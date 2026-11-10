import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Building2,
  Home,
  KeyRound,
  Calculator,
  Compass,
  ExternalLink,
  MessageCircle,
} from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { WhatsAppIcon } from "@/components/whatsapp-icon"

export const metadata: Metadata = {
  title: "About Us | Shree Balaji Enterprises — Real Estate Practice, Ambernath & MMR",
  description:
    "Founded in 2016 by Anju Jangiti (MahaRERA: A51700023633), Shree Balaji Enterprises is an independent real estate advisory practice providing property buying, renting, selling, and home loan guidance across Ambernath and the Mumbai Metropolitan Region.",
  openGraph: {
    title: "About Us | Shree Balaji Enterprises",
    description:
      "A decade of ground truth, verified titles, and personal property guidance in Ambernath and the Mumbai Metropolitan Region since 2016.",
    url: "https://shreebalajienterprises.live/about",
  },
}

const WHATSAPP_NUMBER = "917767805544"
const PHONE_DISPLAY = "+91 77678 05544"
const OFFICE_ADDRESS = "Shop No. 6, Vallabh Building, Avdhoot Residency, Near Sarvodaya Nagar, Chikhloli, Ambernath (West) 421505"
const OFFICE_MAPS_URL = "https://share.google/wXb6cKV7lpMgo9P4c"

const servicesList = [
  {
    title: "Property Acquisition & Buying",
    scope: "Residential apartments, independent houses, and commercial units across Ambernath, Badlapur, Kalyan, and Dombivli.",
    description:
      "We assist buyers through every stage: understanding true market price benchmarks, screening properties for clear title history, verifying statutory RERA approvals, and negotiating transparent purchase terms.",
    href: "/buy",
    linkText: "Explore Available Properties",
    icon: Home,
  },
  {
    title: "Rental & Tenancy Facilitation",
    scope: "Verified family homes, retail shops, and commercial offices.",
    description:
      "We connect tenants with legitimate owners, draft legally binding leave-and-license agreements, coordinate police verification paperwork, and ensure registered tenancy documentation.",
    href: "/rent",
    linkText: "Browse Rental Listings",
    icon: KeyRound,
  },
  {
    title: "Property Valuation & Owner Representation",
    scope: "Individual sellers, landlords, and commercial property owners.",
    description:
      "We evaluate properties based on actual registrar rates rather than inflated speculative broker asking prices, market listings to pre-screened buyers, and coordinate final deed execution at the sub-registrar office.",
    href: "/sell",
    linkText: "Request Property Valuation",
    icon: Building2,
  },
  {
    title: "Home Loan & Documentation Advisory",
    scope: "Salaried professionals, self-employed applicants, and first-time buyers.",
    description:
      "Navigating bank eligibility, CIBIL compliance, document assembly, and sanction coordination across nationalized and private financial institutions to ensure smooth loan disbursement.",
    href: "/home-loans",
    linkText: "View Home Loan Guidance",
    icon: Calculator,
  },
  {
    title: "Local Market & Infrastructure Intelligence",
    scope: "Central Railway corridor, MIDC industrial belts, and upcoming growth pockets.",
    description:
      "Providing unvarnished ground intelligence on drinking water schedules, road widenings, railway commuter frequency, and municipal viability across Ambernath and neighboring micro-markets.",
    href: "/locations",
    linkText: "Explore Location Guide",
    icon: Compass,
  },
]

const operatingPrinciples = [
  {
    title: "Title & Regulatory Due Diligence",
    text: "Before introducing any property to a client, we verify the builder's MahaRERA registration, commencement certificates, and land title chain. If a project has legal ambiguities or unresolved litigation, we advise our clients against it.",
  },
  {
    title: "Documented & Transparent Terms",
    text: "No hidden broker margins, no artificially inflated owner rates, and no undocumented charges. All brokerage fees, government stamp duty calculations, and registration expenses are stated clearly in writing from day one.",
  },
  {
    title: "Ground Reality Over Marketing Slogans",
    text: "We evaluate neighborhoods based on actual commuter realities, municipal water pressure, and school proximity—never on builder brochures. We tell buyers what living in an area actually entails day-to-day.",
  },
  {
    title: "Presence Through Sub-Registrar Execution",
    text: "Our representation does not end when a property is selected. We personally accompany our clients through bank loan documentation, stamp duty payments, and final deed registration at the local sub-registrar office.",
  },
]

export default function AboutPage() {
  return (
    <article className="min-h-screen bg-background text-foreground selection:bg-primary/15 selection:text-foreground">

      {/* ── 1. Company Introduction: Balanced 2-Column Editorial Opening ── */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 border-b border-border/70">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Natural English Introduction (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary font-semibold">
                Company Profile &middot; Shree Balaji Enterprises
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-foreground leading-[1.12]">
                Real Estate Guidance Grounded in Local Market Experience.
              </h1>

              <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Shree Balaji Enterprises is an established real estate practice founded in 2016 by Anju Jangiti in Ambernath West. We assist families, individuals, and business owners with buying, leasing, selling, and property documentation across Ambernath and the Mumbai Metropolitan Region.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Operating under Maharashtra RERA registration (Certificate No. A51700023633), our work focuses on title verification, honest market pricing, and personal representation from initial property viewings to final deed registration.
                </p>
              </div>

              {/* Single Primary Action + Recognizable WhatsApp Button */}
              <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-xs"
                >
                  <span>Speak With Our Advisory Desk</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Anju ji, I would like to consult regarding property in Ambernath / MMR.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-[0.98]"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-current shrink-0" />
                  <span>Chat on WhatsApp: {PHONE_DISPLAY}</span>
                </a>
              </div>

            </div>

            {/* Right Column: Authentic Local Market Landmark (5 cols) */}
            <div className="lg:col-span-5">
              <figure className="space-y-2.5">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-xl overflow-hidden border border-border/80 bg-muted">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Ambarnath_Shiva_Temple_1.jpg/960px-Ambarnath_Shiva_Temple_1.jpg"
                    alt="The 11th-century Ambarnath Shiva Temple — the historical landmark of Ambernath, Maharashtra"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <figcaption className="text-xs text-muted-foreground leading-relaxed">
                  Historic Ambernath — the home ground and founding location of Shree Balaji Enterprises since 2016. Our office is located in Chikhloli, Ambernath West.
                </figcaption>
              </figure>
            </div>

          </div>

        </div>
      </section>

      {/* ── 2. The Company Story: The Central Editorial Narrative ── */}
      <section className="py-20 sm:py-28 border-b border-border/70 bg-card/30">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-2">
              Our Origins &amp; Background
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
              The Story of Shree Balaji Enterprises.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Story Chapters */}
            <div className="lg:col-span-8 space-y-8 text-base text-muted-foreground leading-relaxed">
              
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground tracking-tight">
                  1. Beginning in Ambernath West
                </h3>
                <p>
                  Shree Balaji Enterprises began operations in 2016 in Ambernath West. At the time, the eastern suburban belt of the Mumbai Metropolitan Region was undergoing rapid residential development. Working-class and middle-income families from central Mumbai and Thane were increasingly moving along the Central Railway line to find quality housing within reach of their budgets.
                </p>
                <p>
                  However, the local property market was frequently characterized by unorganized brokerage, informal documentation, and speculative pricing. For first-time homebuyers who had committed their life savings toward a down payment, the transaction process was stressful and fraught with uncertainty.
                </p>
              </div>

              <div className="pt-6 border-t border-border/60 space-y-3">
                <h3 className="text-lg font-bold text-foreground tracking-tight">
                  2. Building an On-Ground Advisory Practice
                </h3>
                <p>
                  Anju Jangiti established Shree Balaji Enterprises to offer a different experience: an accessible, locally based advisory practice where clients receive straightforward information on property titles, municipal water schedules, and realistic pricing before making any financial commitment.
                </p>
                <p>
                  Rather than functioning as a remote listings catalog, the firm maintained a daily presence on the ground. Every property recommended was personally visited, building approvals were cross-referenced with municipal plans, and title history was examined with professional care.
                </p>
              </div>

              <div className="pt-6 border-t border-border/60 space-y-3">
                <h3 className="text-lg font-bold text-foreground tracking-tight">
                  3. Statutory RERA Accreditation &amp; Regional Growth
                </h3>
                <p>
                  In 2018, following the enactment of the Real Estate (Regulation and Development) Act, Shree Balaji Enterprises obtained its formal MahaRERA real estate agent registration under <span className="font-mono text-foreground font-semibold">Certificate No. A51700023633</span>. This reinforced our foundational operating standard: complete statutory compliance, honest disclosures, and consumer protection.
                </p>
                <p>
                  Over subsequent years, client requests led our advisory work naturally to extend into adjoining residential hubs—including Badlapur, Kalyan, Dombivli, and Ulhasnagar. Today, operating from our chambers at Avdhoot Residency in Chikhloli, we continue to serve property buyers, tenants, and owners with the same grounded, personal attention.
                </p>
              </div>

            </div>

            {/* Sidebar Context Card */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="p-6 rounded-xl border border-border/80 bg-background space-y-4">
                <p className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                  Founder&rsquo;s Perspective
                </p>
                <blockquote className="font-serif italic text-base sm:text-lg text-foreground leading-snug">
                  &ldquo;For an everyday family, buying a home is not just an investment—it is their family&rsquo;s security. If a title has complications or municipal approvals are delayed, we advise our clients to walk away. Real trust is built by the deals you advise against, not just the ones you close.&rdquo;
                </blockquote>
                <div className="pt-3 border-t border-border/60 text-xs">
                  <p className="font-bold text-foreground">Anju Jangiti</p>
                  <p className="text-muted-foreground">Founder &amp; Principal Broker</p>
                  <p className="text-[11px] font-mono text-muted-foreground mt-0.5">MahaRERA: A51700023633</p>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-border/60 bg-muted/40 text-xs text-muted-foreground space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">Registered Chambers</p>
                  <a
                    href={OFFICE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                  >
                    <span>View on Google Maps</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
                <p className="leading-relaxed">
                  {OFFICE_ADDRESS}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <p className="text-primary font-mono font-medium">
                    Helpline: {PHONE_DISPLAY}
                  </p>
                  <a
                    href={OFFICE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    <MapPin className="h-3 w-3 text-primary shrink-0" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── 3. Founder & Leadership ─────────────────────────────────── */}
      <section className="py-20 sm:py-28 border-b border-border/70">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-2">
              Leadership &amp; Personal Responsibility
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Direct, Accessible Broker Representation.
            </h2>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl border border-border/80 bg-card/40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Brand Crest & Details */}
              <div className="lg:col-span-4 flex flex-col items-center text-center p-6 rounded-xl bg-background border border-border/70">
                <div className="relative w-32 h-20 mb-3 flex items-center justify-center">
                  <BrandLogo className="h-14 w-auto aspect-[820/528]" priority />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Anju Jangiti
                </h3>
                <p className="text-xs text-primary font-semibold mt-0.5">
                  Founder &amp; Principal Broker
                </p>
                <div className="mt-3 pt-3 border-t border-border/60 w-full text-center text-xs text-muted-foreground space-y-0.5">
                  <p className="font-mono text-[11px]">MahaRERA: A51700023633</p>
                  <p className="text-[11px]">Firm Founded 2016 &middot; Ambernath West</p>
                </div>
              </div>

              {/* Bio & Practical Role */}
              <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p className="text-foreground font-medium">
                  Anju Jangiti leads Shree Balaji Enterprises with personal oversight on all property transactions, regulatory disclosures, and developer verifications.
                </p>
                <p>
                  With ten years of daily ground presence across Ambernath, Badlapur, and the Central Railway corridor, Anju works directly with homebuyers, commercial tenants, and property owners. Rather than routing clients through junior call-center agents, consultations on title reviews, loan eligibility, and price negotiations are handled directly with leadership.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Anju ji, I would like to consult with you regarding property in Ambernath / MMR.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all shadow-xs"
                  >
                    <WhatsAppIcon className="h-4 w-4 fill-current shrink-0" />
                    <span>Direct WhatsApp with Anju Jangiti</span>
                  </a>
                  <span className="text-border">&bull;</span>
                  <a
                    href={`tel:${PHONE_DISPLAY.replace(/[^0-9+]/g, "")}`}
                    className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                  >
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    <span>Office Line: {PHONE_DISPLAY}</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── 4. What We Do: The 5 Core Practice Areas ────────────────── */}
      <section className="py-20 sm:py-28 border-b border-border/70 bg-card/20">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-2">
              Our Services
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              What We Actually Help Our Clients With.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
              Every service is conducted with verified documentation, RERA transparency, and personal presence from search to deed execution.
            </p>
          </div>

          {/* Editorial Service Directory (Not Identical Card Grids) */}
          <div className="divide-y divide-border/80 border-y border-border/80">
            {servicesList.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                  <div className="lg:col-span-1 flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">
                      0{index + 1}.
                    </span>
                    <Icon className="h-5 w-5 text-muted-foreground/70" />
                  </div>

                  <div className="lg:col-span-4 space-y-1">
                    <h3 className="text-lg font-bold text-foreground tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono">
                      {service.scope}
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="lg:col-span-2 lg:text-right pt-2 lg:pt-0">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      <span>{service.linkText}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── 5. Operating Standards & Principles ─────────────────────── */}
      <section className="py-20 sm:py-28 border-b border-border/70">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-2">
              Our Principles
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Four Practical Commitments in Every Transaction.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
              These principles reflect how we actually conduct property viewings, legal due diligence, and buyer representation.
            </p>
          </div>

          {/* 2x2 Clean Hairline Grid (No rounded icon cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
            {operatingPrinciples.map((item, idx) => (
              <div key={item.title} className="pt-6 border-t border-border/80 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-primary">
                    0{idx + 1}.
                  </span>
                  <h3 className="text-lg font-bold text-foreground tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. Geographic Presence & Office Seat ────────────────────── */}
      <section className="py-20 sm:py-28 border-b border-border/70 bg-card/25">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Geographic Coverage
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Daily Ground Presence Across Ambernath &amp; MMR.
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Hyper-local knowledge is central to our work. We live and operate in Ambernath West, tracking train frequency, upcoming road widening projects, drinking water schedules, and municipal infrastructure across each neighborhood.
              </p>
              <div className="pt-2">
                <Link
                  href="/locations"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:underline"
                >
                  <span>View Our Comprehensive MMR Location Guide</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="p-6 rounded-xl border border-border/80 bg-background space-y-2">
                <p className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                  Headquarters &middot; Home Ground
                </p>
                <h3 className="text-base font-bold text-foreground">
                  Ambernath (East &amp; West)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Deep familiarity with residential pockets, Chikhloli, Pale Gaon, Morivali, and the Anand Nagar MIDC commercial zone.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border/80 bg-background space-y-2">
                <p className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                  First-Home Corridor
                </p>
                <h3 className="text-base font-bold text-foreground">
                  Badlapur (East &amp; West)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Advisory for value-conscious homebuyers in Katrap, Belavali, and Shirgaon with natural greenery and established schools.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border/80 bg-background space-y-2">
                <p className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                  Express Rail Junctions
                </p>
                <h3 className="text-base font-bold text-foreground">
                  Kalyan &amp; Dombivli
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Assisting with major rail junction accessibility, commercial hubs, and integrated township communities along Kalyan-Shilphata.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border/80 bg-background space-y-2">
                <p className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                  Wider Region
                </p>
                <h3 className="text-base font-bold text-foreground">
                  Greater MMR Consultations
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Assisting relocating families and commercial investors evaluating verified residential opportunities across Thane and Navi Mumbai.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── 7. Statutory Accreditation & Verification ───────────────── */}
      <section className="py-20 sm:py-24 border-b border-border/70 bg-muted/30">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto">
            
            <div className="mb-6">
              <p className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Statutory Governance &middot; Official Accreditation
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                Verified MahaRERA Registration.
              </h2>
            </div>

            <div className="rounded-2xl border border-border bg-background shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-l-4 border-l-primary p-7 sm:p-9 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-border/70">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                      Maharashtra Real Estate Regulatory Authority
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="text-xs text-muted-foreground font-medium">
                        Agent Registration:
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded border border-primary/25">
                        A51700023633
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://maharera.mahaonline.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs shrink-0"
                >
                  <span>Verify on MahaRERA Portal</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* 3 Prominent Metric Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Registered Firm
                  </p>
                  <p className="text-base font-bold text-foreground mt-1">
                    Shree Balaji Enterprises
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Real Estate Brokerage
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Principal Broker
                  </p>
                  <p className="text-base font-bold text-foreground mt-1">
                    Anju Jangiti
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Founder &amp; License Holder
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Established &middot; Location
                  </p>
                  <p className="text-base font-bold text-foreground mt-1">
                    2016 &middot; Ambernath (West)
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Thane District, Maharashtra
                  </p>
                </div>
              </div>

              {/* Regulatory Notice */}
              <div className="pt-5 border-t border-border/70 text-xs text-muted-foreground leading-relaxed">
                <p>
                  MahaRERA registration confirms that Shree Balaji Enterprises operates in strict compliance with the Real Estate (Regulation and Development) Act, 2016. All property representations, advertising standards, and transaction disclosures are conducted pursuant to statutory Maharashtra RERA guidelines. Registration does not constitute an outcome guarantee on market transactions.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── 8. Concluding Section: Natural Invitation to Connect ────── */}
      <section className="py-20 sm:py-28 bg-card">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
              Discuss Your Property Plans With Our Team.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Whether you are looking for your first home in Ambernath, planning to sell a flat, renting a commercial storefront, or navigating home loan paperwork, our advisory desk is available to assist.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-xs"
              >
                <span>Contact Our Office</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Shree Balaji Enterprises, I would like to consult with your advisory desk.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold transition-all shadow-xs active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-4 w-4 fill-current shrink-0" />
                <span>Chat on WhatsApp: {PHONE_DISPLAY}</span>
              </a>

              <Link
                href="/buy"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg border border-border/80 bg-background hover:bg-muted text-foreground text-sm font-semibold transition-all"
              >
                <span>Browse Active Inventory</span>
              </Link>
            </div>

            {/* Direct Coordinates */}
            <div className="pt-8 mt-6 border-t border-border/70 flex flex-col items-center justify-center gap-3 text-xs sm:text-sm text-muted-foreground text-center">
              <a
                href={OFFICE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-wrap items-center justify-center gap-2 max-w-full hover:text-primary transition-colors group"
                title="View Shree Balaji Enterprises on Google Maps"
              >
                <MapPin className="h-4 w-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span className="underline-offset-4 group-hover:underline">{OFFICE_ADDRESS}</span>
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

    </article>
  )
}
