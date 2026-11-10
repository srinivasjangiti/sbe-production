import { Metadata } from "next"
import Link from "next/link"
import { HeroSection } from "@/components/hero-section"
import { ExploreTypes } from "@/components/explore-types"
import { FeaturedListings } from "@/components/featured-listings"
import { ValueProposition } from "@/components/value-proposition"
import { Testimonials } from "@/components/testimonials"
import { PopularSearches } from "@/components/popular-searches"
import { ArrowRight, BookOpen, Sparkles } from "lucide-react"
import { InView } from "@/components/core/in-view"
import { WhatsAppIcon } from "@/components/whatsapp-icon"

export const metadata: Metadata = {
  title: "Shree Balaji Enterprises — Real Estate in Ambernath & MMR",
  description:
    "RERA-registered real estate agency in Ambernath (Established 2016, MahaRERA: A51700023633). View verified properties for sale and rent across Ambernath, Badlapur, Thane, and MMR.",
  alternates: {
    canonical: "https://shreebalajienterprises.live",
  },
  openGraph: {
    title: "Shree Balaji Enterprises — Real Estate in Ambernath & MMR",
    description: "Browse verified residential and commercial properties in Ambernath, Badlapur, and MMR.",
    url: "https://shreebalajienterprises.live",
    images: [
      {
        url: "https://shreebalajienterprises.live/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Shree Balaji Enterprises Real Estate in Ambernath",
      },
    ],
  },
}

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": "https://shreebalajienterprises.live/#realestateagent",
    name: "Shree Balaji Enterprises",
    legalName: "Shree Balaji Enterprises",
    url: "https://shreebalajienterprises.live",
    logo: "https://shreebalajienterprises.live/images/logo.png",
    image: "https://shreebalajienterprises.live/images/hero-bg.jpg",
    description:
      "RERA-registered real estate agency in Ambernath (Established 2016, MahaRERA: A51700023633). Assisting clients with buying, selling, and renting residential, commercial, and industrial properties.",
    foundingDate: "2016",
    founder: {
      "@type": "Person",
      name: "Anju Jangiti",
    },
    telephone: ["+917767805544", "+919168588575"],
    email: "shreebalajienterprisesamb@gmail.com",
    priceRange: "₹₹ - ₹₹₹₹",
    hasMap: "https://share.google/wXb6cKV7lpMgo9P4c",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Shop No. 6, Vallabh Building, Avdhoot Residency, Near Sarvodaya Nagar, Chikhloli, Ambernath-West",
      addressLocality: "Ambernath",
      addressRegion: "Maharashtra",
      postalCode: "421505",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.197,
      longitude: 73.191,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Ambernath" },
      { "@type": "City", name: "Badlapur" },
      { "@type": "City", name: "Ulhasnagar" },
      { "@type": "City", name: "Kalyan" },
      { "@type": "City", name: "Dombivli" },
      { "@type": "City", name: "Thane" },
      { "@type": "City", name: "Mumbai" },
      { "@type": "City", name: "Navi Mumbai" },
      { "@type": "City", name: "Panvel" },
    ],
    identifier: {
      "@type": "PropertyValue",
      name: "MahaRERA Registration Number",
      value: "A51700023633",
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=100091469033284",
      "https://share.google/wXb6cKV7lpMgo9P4c",
    ],
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://shreebalajienterprises.live",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
        <HeroSection />
        <ExploreTypes />
        <FeaturedListings />
        <ValueProposition />
        <Testimonials />
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-[1440px] px-4">
            <InView
              once
              viewOptions={{ margin: "0px 0px -60px 0px" }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-10 shadow-sm"
            >
              <div className="absolute right-[-4rem] top-[-4rem] h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
                    <Sparkles className="h-3.5 w-3.5" />
                    Published Paper
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-3">
                    Read the research paper on the MMR corridor
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                    Explore the published paper covering local market dynamics, the firm's
                    operating model, and the Next.js architecture powering the site.
                  </p>
                </div>
                <div className="flex md:justify-end">
                  <Link
                    href="/research-paper"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-foreground px-6 text-sm font-bold text-background transition-all hover:opacity-90 active:scale-[0.98]"
                  >
                    Open Paper <BookOpen className="h-4 w-4" />
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </InView>
          </div>
        </section>
        <PopularSearches />

        {/* ── CTA Strip ─────────────────────────────────── */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-4">
            <InView
              once
              viewOptions={{ margin: "0px 0px -60px 0px" }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative overflow-hidden bg-foreground rounded-3xl px-8 md:px-16 py-16 md:py-20"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="max-w-lg">
                  <h2 className="text-3xl md:text-5xl font-black text-background leading-tight mb-4">
                    Ready to find<br />your next home?
                  </h2>
                  <p className="text-background/50 text-sm leading-relaxed">
                    Over 500 properties sold. 1000+ happy families (Established 2016). Talk to our team today &mdash; free, no pressure.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link
                    href="/buy"
                    className="inline-flex h-12 items-center justify-center px-8 text-sm font-bold bg-primary text-primary-foreground rounded-lg hover:opacity-90 active:scale-[0.98] transition-all"
                  >
                    Browse Properties
                  </Link>
                  <a
                    href="https://wa.me/917767805544?text=Hi%2C%20I%20want%20to%20buy%20or%20sell%20a%20property.%20Please%20help."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center px-8 text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg active:scale-[0.98] transition-all gap-2 shadow-xs"
                  >
                    <WhatsAppIcon className="h-4 w-4 fill-current shrink-0" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </InView>
          </div>
        </section>
      </main>
    </>
  )
}
