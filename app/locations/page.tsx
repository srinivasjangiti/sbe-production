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
            {locations.map((loc) => (
              <div
                key={loc.id}
                id={loc.id}
                className="group relative flex flex-col rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 scroll-mt-24"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={loc.image}
                    alt={`${loc.name} real estate — Shree Balaji Enterprises`}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${(loc as any).imgClass ?? ""}`}
                  />

                  {/* Badge */}
                  <span
                    className={`absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-sm ${loc.badgeClass}`}
                  >
                    {loc.badge}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-black text-foreground leading-tight">{loc.name}</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="text-xs text-muted-foreground font-medium">{loc.region}</span>
                      </div>
                    </div>
                    <span className="shrink-0 text-[11px] font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full mt-0.5 whitespace-nowrap">
                      {loc.distance}
                    </span>
                  </div>

                  <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-1">
                    {loc.tagline}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                    {loc.description}
                  </p>

                  {/* Property type pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {loc.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center px-2.5 py-1 bg-muted rounded-full text-[11px] font-semibold text-muted-foreground"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* CTA row */}
                  <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border">
                    <Link
                      href={`/buy?q=${encodeURIComponent(loc.searchQuery)}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors"
                    >
                      Buy
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href={`/rent?q=${encodeURIComponent(loc.searchQuery)}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border border-primary text-primary rounded-lg text-xs font-bold hover:bg-primary/10 transition-colors"
                    >
                      Rent
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-sm font-bold bg-primary text-primary-foreground transition-opacity hover:opacity-90"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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
