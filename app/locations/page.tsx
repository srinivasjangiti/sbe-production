import Link from "next/link"
import {
  MapPin,
  ArrowRight,
  Building2,
  Home,
  TrendingUp,
  Train,
  Trees,
  Landmark,
  Warehouse,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/whatsapp-icon"

const locations = [
  {
    id: "ambernath",
    name: "Ambernath",
    region: "Thane District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Ambarnath_Shiva_Temple_1.jpg/960px-Ambarnath_Shiva_Temple_1.jpg",
    tagline: "Our Home Ground",
    description:
      "Ambernath is where Shree Balaji Enterprises was founded. A vibrant mix of residential pockets, industrial zones and emerging new projects — all within Central Railway reach.",
    highlights: ["Residential Flats", "Industrial Sheds", "Bungalows", "Plots & Land"],
    badge: "HQ",
    badgeClass: "bg-primary text-primary-foreground",
    searchQuery: "Ambernath",
    distance: "65 km from CST",
    icon: Building2,
  },
  {
    id: "badlapur",
    name: "Badlapur",
    region: "Thane District",
    image: "/images/badlapur.jpg",
    imgClass: "object-[center_30%]",
    tagline: "Nature's Address",
    description:
      "Surrounded by hills, rivers and open greenery — Badlapur is the go-to for affordable 1-3 BHK flats and scenic farmhouses. Ideal for first-time homebuyers.",
    highlights: ["1 & 2 BHK Flats", "Farmhouses", "Gated Projects", "Plots"],
    badge: "Affordable",
    badgeClass: "bg-foreground text-background",
    searchQuery: "Badlapur",
    distance: "72 km from CST",
    icon: Trees,
  },
  {
    id: "ulhasnagar",
    name: "Ulhasnagar",
    region: "Thane District",
    image:
      "https://images.pexels.com/photos/14436470/pexels-photo-14436470.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tagline: "Budget-Friendly Urban Hub",
    description:
      "One of the most affordable urban markets in the MMR. Ulhasnagar is dense, commercial-forward and packed with value for investors and end-users alike.",
    highlights: ["Budget Flats", "Shops & Offices", "Commercial Spaces", "Resale Deals"],
    badge: "Budget Hub",
    badgeClass: "bg-foreground text-background",
    searchQuery: "Ulhasnagar",
    distance: "59 km from CST",
    icon: Building2,
  },
  {
    id: "kalyan",
    name: "Kalyan",
    region: "Thane District",
    image: "/images/kalyan.jpg",
    tagline: "The Growth Corridor",
    description:
      "A major rail junction and Tier-2 urban centre, Kalyan is expanding fast. New residential projects, malls and highways are driving strong appreciation.",
    highlights: ["New Projects", "Residential", "Commercial", "Plots"],
    badge: "High Growth",
    badgeClass: "bg-foreground text-background",
    searchQuery: "Kalyan",
    distance: "54 km from CST",
    icon: TrendingUp,
  },
  {
    id: "dombivli",
    name: "Dombivli",
    region: "Thane District",
    image: "/images/dombivli.jpg",
    tagline: "Planned & Peaceful",
    description:
      "Known for its clean, well-planned layout and middle-class residential character, Dombivli offers great value with excellent schools, hospitals and railways.",
    highlights: ["2 & 3 BHK Flats", "Row Houses", "Societies", "Resale"],
    badge: "Family Favourite",
    badgeClass: "bg-foreground text-background",
    searchQuery: "Dombivli",
    distance: "52 km from CST",
    icon: Home,
  },
  {
    id: "thane",
    name: "Thane",
    region: "Thane District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Talao_Pali_%28425538069%29.jpg/960px-Talao_Pali_%28425538069%29.jpg",
    tagline: "The City of Lakes",
    description:
      "Thane blends premium high-rises with serene lakeside living. Well-connected, well-developed and well-loved — it's one of Maharashtra's fastest-growing cities.",
    highlights: ["Premium Flats", "Luxury Projects", "Offices", "Shops"],
    badge: "Premium",
    badgeClass: "bg-foreground text-background",
    searchQuery: "Thane",
    distance: "34 km from CST",
    icon: Landmark,
  },
  {
    id: "mumbai",
    name: "Mumbai",
    region: "Mumbai District",
    image: "/images/mumbai.jpg",
    tagline: "The Maximum City",
    description:
      "India's commercial capital — where every square foot is prime. We assist with residential, commercial and investment properties across Mumbai's diverse neighbourhoods.",
    highlights: ["Premium Flats", "Commercial Offices", "Showrooms", "Investment"],
    badge: "Iconic",
    badgeClass: "bg-foreground text-background",
    searchQuery: "Mumbai",
    distance: "City",
    icon: Landmark,
  },
  {
    id: "navi-mumbai",
    name: "Navi Mumbai",
    region: "Raigad District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Vashi_Skyline.jpg/960px-Vashi_Skyline.jpg",
    tagline: "India's Planned Dream City",
    description:
      "Wide roads, green belts and a meticulously planned layout make Navi Mumbai one of the most liveable cities in the country. Airport incoming, values are rising.",
    highlights: ["New Launches", "IT Offices", "Premium Flats", "Plots"],
    badge: "Rapid Growth",
    badgeClass: "bg-foreground text-background",
    searchQuery: "Navi Mumbai",
    distance: "15 km from CST",
    icon: TrendingUp,
  },
  {
    id: "panvel",
    name: "Panvel",
    region: "Raigad District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Viewing_Panvel_from_Karnala_hills_%285444402729%29.jpg/960px-Viewing_Panvel_from_Karnala_hills_%285444402729%29.jpg",
    tagline: "Gateway to Konkan",
    description:
      "Panvel is a booming investment destination thanks to the upcoming Navi Mumbai International Airport. Strategic location at expressway and railway junctions.",
    highlights: ["Affordable Flats", "Plots", "New Projects", "Commercial"],
    badge: "Airport Zone",
    badgeClass: "bg-foreground text-background",
    searchQuery: "Panvel",
    distance: "35 km from CST",
    icon: Train,
  },
  {
    id: "titwala",
    name: "Titwala",
    region: "Thane District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Ganesh_Talav%2C_Titwala_05.jpg/960px-Ganesh_Talav%2C_Titwala_05.jpg",
    tagline: "Spiritual & Serene",
    description:
      "A quaint temple town on the Central Railway with some of the most affordable property rates in the MMR. Ideal for budget buyers and investors looking for low-entry plots.",
    highlights: ["Budget Flats", "Plots", "Row Houses", "Agricultural Land"],
    badge: "Ultra Affordable",
    badgeClass: "bg-foreground text-background",
    searchQuery: "Titwala",
    distance: "58 km from CST",
    icon: Home,
  },
  {
    id: "khopoli",
    name: "Khopoli",
    region: "Raigad District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Mumbai_Pune_expressway.jpg/960px-Mumbai_Pune_expressway.jpg",
    tagline: "Industrial Belt & Getaway",
    description:
      "Adjacent to the Mumbai-Pune Expressway, Khopoli is home to several MIDC industrial estates alongside hill resorts and farmhouse destinations.",
    highlights: ["Industrial Plots", "Warehouses", "Farmhouses", "MIDC Units"],
    badge: "Industrial",
    badgeClass: "bg-foreground text-background",
    searchQuery: "Khopoli",
    distance: "83 km from CST",
    icon: Warehouse,
  },
  {
    id: "karjat",
    name: "Karjat",
    region: "Raigad District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Kondana.jpg/960px-Kondana.jpg",
    tagline: "Mumbai's Weekend Escape",
    description:
      "Lush valleys, rivers and cool air make Karjat the premier second-home destination for Mumbaikars. Farm plots, bungalows and eco-resorts are in high demand.",
    highlights: ["Farmhouses", "Bungalows", "Agricultural Plots", "Resorts"],
    badge: "Second Home",
    badgeClass: "bg-foreground text-background",
    searchQuery: "Karjat",
    distance: "95 km from CST",
    icon: Trees,
  },
  {
    id: "murbad",
    name: "Murbad",
    region: "Thane District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Sunset_Sunrise_Bhimashankar_Wildlife_Sanctuary_Pune_%281%29_02.jpg/960px-Sunset_Sunrise_Bhimashankar_Wildlife_Sanctuary_Pune_%281%29_02.jpg",
    tagline: "Countryside at Low Prices",
    description:
      "Murbad offers large land parcels and affordable agricultural plots for those looking to invest in the fringe of MMR. Peaceful, green and growing steadily.",
    highlights: ["Agricultural Land", "NA Plots", "Farmhouses", "Industrial Land"],
    badge: "Emerging",
    badgeClass: "bg-foreground text-background",
    searchQuery: "Murbad",
    distance: "82 km from CST",
    icon: Trees,
  },
  {
    id: "vasai",
    name: "Vasai",
    region: "Palghar District",
    image: "/images/vasai.jpg",
    tagline: "Heritage Meets Growth",
    description:
      "Vasai blends Portuguese-era heritage with rapid modern development. Affordable flats, spacious bungalows and excellent road connectivity make it a smart buy.",
    highlights: ["Bungalows", "Affordable Flats", "Plots", "New Projects"],
    badge: "Growing Fast",
    badgeClass: "bg-foreground text-background",
    searchQuery: "Vasai",
    distance: "55 km from CST",
    icon: Home,
  },
  {
    id: "mira-road",
    name: "Mira Road",
    region: "Thane District",
    image: "/images/mira.jpg",
    tagline: "Suburban Sweet Spot",
    description:
      "One of Mumbai's most popular suburban destinations, Mira Road offers well-planned residential societies, great amenities and strong Western Railway connectivity.",
    highlights: ["2 & 3 BHK Flats", "Gated Societies", "Commercial", "Resale"],
    badge: "Well Connected",
    badgeClass: "bg-foreground text-background",
    searchQuery: "Mira Road",
    distance: "45 km from CST",
    icon: Train,
  },
]

export default function LocationsPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Real Estate Markets Served by Shree Balaji Enterprises",
    description: "Key real estate investment and residential locations across the Mumbai Metropolitan Region (MMR).",
    numberOfItems: locations.length,
    itemListElement: locations.map((loc, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: loc.name,
      description: loc.description,
      url: `https://shreebalajienterprises.live/locations#${loc.id}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {/* ── LOCATION DISCOVERY INTRODUCTION ───────────────── */}
      <section className="pt-10 md:pt-14 pb-8 md:pb-10">
        <div className="mx-auto max-w-[1440px] px-4 text-center">
          <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-3">Explore Locations</p>
          <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-3">
            Find Your City,<br />
            <span className="text-muted-foreground font-light italic">Find Your Home.</span>
          </h1>
          <p className="text-[15px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Click on any location below to browse available properties. Don&apos;t see yours?{" "}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              Contact us
            </Link>{" "}
            — we cover more areas every day.
          </p>
        </div>
      </section>

      {/* ── LOCATIONS GRID ────────────────────────────────── */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1440px] px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => {
              const Icon = loc.icon
              const isHQ = loc.badge === "HQ"
              return (
                <div
                  key={loc.id}
                  id={loc.id}
                  className="group relative flex flex-col rounded-2xl overflow-hidden border border-border/80 bg-card shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.09)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 scroll-mt-24"
                >
                  {/* Image Container */}
                  <Link
                    href={`/buy?q=${encodeURIComponent(loc.searchQuery)}`}
                    className="block relative h-56 sm:h-60 overflow-hidden bg-muted"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={loc.image}
                      alt={`${loc.name} real estate — Shree Balaji Enterprises`}
                      className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${(loc as any).imgClass ?? ""}`}
                    />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 z-10 pointer-events-none">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${
                          isHQ
                            ? "bg-primary text-primary-foreground ring-1 ring-white/30"
                            : "backdrop-blur-md bg-white/95 dark:bg-neutral-900/90 text-neutral-900 dark:text-neutral-100 border border-black/5 dark:border-white/10"
                        }`}
                      >
                        {loc.badge}
                      </span>
                    </div>

                    {/* Floating Distance Chip */}
                    <div className="absolute top-3 right-3 z-10 pointer-events-none">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium backdrop-blur-md bg-black/60 text-white shadow-sm">
                        {loc.distance.includes("km") ? (
                          <Train className="h-3 w-3 opacity-80" />
                        ) : (
                          <MapPin className="h-3 w-3 opacity-80" />
                        )}
                        {loc.distance}
                      </span>
                    </div>
                  </Link>

                  {/* Card Body */}
                  <div className="flex flex-col flex-1 p-5">
                    {/* Eyebrow Tagline with Icon */}
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span>{loc.tagline}</span>
                    </div>

                    {/* City Title */}
                    <Link
                      href={`/buy?q=${encodeURIComponent(loc.searchQuery)}`}
                      className="block group-hover:text-primary transition-colors"
                    >
                      <h3 className="text-2xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {loc.name}
                      </h3>
                    </Link>

                    {/* Region / District */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mt-1 mb-3">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground/80 shrink-0" />
                      <span>{loc.region}</span>
                    </div>

                    {/* Description */}
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                      {loc.description}
                    </p>

                    {/* Property Highlights */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {loc.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-muted/60 text-foreground/85 border border-border/50 hover:bg-muted transition-colors"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* CTA row */}
                    <div className="flex items-center gap-2.5 mt-auto pt-3.5 border-t border-border/70">
                      <Link
                        href={`/buy?q=${encodeURIComponent(loc.searchQuery)}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-3 bg-primary text-primary-foreground rounded-lg text-xs font-bold shadow-xs hover:bg-primary/90 transition-all group/btn"
                      >
                        <span>Buy</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                      </Link>
                      <Link
                        href={`/rent?q=${encodeURIComponent(loc.searchQuery)}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-3 border border-primary/20 bg-background hover:bg-primary/5 hover:border-primary/40 text-foreground rounded-lg text-xs font-bold transition-all group/btn"
                      >
                        <span>Rent</span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover/btn:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────── */}
      <section className="py-12 border-t border-b border-border bg-card">
        <div className="mx-auto max-w-[1440px] px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
            {[
              { value: "13+", label: "Cities Covered", sub: "Across Maharashtra" },
              { value: "500+", label: "Properties Sold", sub: "Across MMR" },
              { value: "65+", label: "Km Radius", sub: "From Ambernath" },
              { value: "15+", label: "Years Local Know-How", sub: "Established 2016" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center py-8 px-4 gap-0.5 text-center bg-card"
              >
                <p className="text-3xl md:text-4xl font-black text-foreground">{s.value}</p>
                <p className="text-sm font-semibold text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────── */}
      <section className="py-20 bg-foreground">
        <div className="mx-auto max-w-[1440px] px-4 text-center">
          <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-4">
            Need Local Guidance?
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-5">
            Not Sure Which Area<br />
            <span className="text-primary">Is Right for You?</span>
          </h2>
          <p className="text-[15px] text-white/60 max-w-xl mx-auto leading-relaxed mb-8">
            With 15+ years of boots-on-the-ground experience across the MMR (Established 2016), we&apos;ll help you find
            the area that fits your budget, lifestyle and commute — for free, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/917767805544?text=Hi%2C%20I%20need%20help%20choosing%20the%20right%20location%20for%20my%20property%20search."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white transition-opacity shadow-xs"
            >
              <WhatsAppIcon className="h-4 w-4 fill-current shrink-0" />
              WhatsApp Us
            </a>
            <Link href="/contact">
              <Button
                size="lg"
                className="h-12 px-8 text-sm font-bold"
              >
                Contact Our Team <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
