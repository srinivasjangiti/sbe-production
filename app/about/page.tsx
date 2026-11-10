import Image from "next/image"
import Link from "next/link"
import {
  Shield,
  MapPin,
  Phone,
  Mail,
  Award,
  CheckCircle2,
  Building2,
  Heart,
  Star,
  Users,
  Clock,
  ArrowRight,
  Handshake,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const milestones = [
  {
    year: "2016",
    title: "Established in Ambernath West",
    desc: "Founded by Anju Jangiti with one desk, one phone, and one mission: make property transactions transparent, legally ironclad, and stress-free for everyday homebuyers.",
  },
  {
    year: "2018",
    title: "Official MahaRERA Registration",
    desc: "Accredited under Maharashtra Real Estate Regulatory Authority (A51700023633), cementing our commitment to statutory compliance and consumer protection.",
  },
  {
    year: "2022",
    title: "Corridor Expansion Across MMR",
    desc: "Expanded advisory operations across Kalyan, Badlapur, Ulhasnagar, and Thane to meet escalating demand for quality residential flats and MIDC industrial spaces.",
  },
  {
    year: "2026",
    title: "1,000+ Families Successfully Settled",
    desc: "Surpassed 1,000 happy homeowners and 500+ completed transactions with 15+ years of accumulated local expertise.",
  },
]

const pillars = [
  {
    icon: Shield,
    title: "Statutory RERA Governance",
    desc: "Registration A51700023633 guarantees all transactions strictly adhere to Maharashtra RERA norms, ensuring title sanctity and zero litigation exposure.",
  },
  {
    icon: Building2,
    title: "Hyper-Local Market Mastery",
    desc: "15+ years of daily ground presence in Ambernath, Badlapur, and Kalyan ensures accurate price discovery, neighborhood trend forecasting, and MIDC insights.",
  },
  {
    icon: Heart,
    title: "Client-First Transparency",
    desc: "Zero hidden commissions, zero artificial markups. We represent our clients' best interests with clear, documented terms from search to sub-registrar deed registration.",
  },
  {
    icon: Handshake,
    title: "End-to-End Handholding",
    desc: "From initial property shortlisting and site visits to multi-bank loan sanctions, title search, stamp duty processing, and key handover.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Editorial Header ─────────────────────────────────── */}
      <section className="pt-12 sm:pt-16 pb-12 border-b border-border bg-gradient-to-b from-card/80 to-background">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4 border border-primary/20">
              <Shield className="h-3.5 w-3.5" />
              Company Profile &bull; Established 2016 &bull; MahaRERA A51700023633
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-[1.12] mb-5">
              A Decade of Trust in the Mumbai Metropolitan Region
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              Founded in 2016 by Anju Jangiti, Shree Balaji Enterprises was built on a foundational conviction: buying a home should be an honest, transparent, and celebratory milestone, not an intimidating ordeal. Over 15+ years of boots-on-the-ground experience, we have guided more than 1,000 families to their ideal properties.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/contact">
                <Button size="lg" className="h-11 px-6 text-xs sm:text-sm font-bold gap-2">
                  Visit Our Office <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/buy">
                <Button size="lg" variant="outline" className="h-11 px-6 text-xs sm:text-sm font-bold bg-card border-border/80 hover:bg-muted">
                  Explore Active Inventory
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Corporate Milestones Counter ─────────────────────── */}
      <section className="py-8 border-b border-border bg-card">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <p className="text-3xl sm:text-4xl font-black text-foreground">15+</p>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Years Local Experience</p>
              <p className="text-[11px] text-muted-foreground/80 mt-0.5">Established 2016</p>
            </div>
            <div className="p-4">
              <p className="text-3xl sm:text-4xl font-black text-foreground">500+</p>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Properties Transacted</p>
              <p className="text-[11px] text-muted-foreground/80 mt-0.5">Residential &amp; Commercial</p>
            </div>
            <div className="p-4">
              <p className="text-3xl sm:text-4xl font-black text-foreground">1,000+</p>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Happy Families</p>
              <p className="text-[11px] text-muted-foreground/80 mt-0.5">Settled Across MMR</p>
            </div>
            <div className="p-4">
              <p className="text-3xl sm:text-4xl font-black text-foreground">100%</p>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">RERA Compliance</p>
              <p className="text-[11px] text-muted-foreground/80 mt-0.5">MahaRERA: A51700023633</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Founder Spotlight & Narrative ────────────────────── */}
      <section className="py-14 sm:py-20 border-b border-border">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Founder Letter / Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <p className="text-primary text-xs font-extrabold uppercase tracking-widest">
                Leadership &amp; Origins
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                A Personal Message from Our Founder
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  &ldquo;When I started Shree Balaji Enterprises in Ambernath-West opposite Shiv Mandir Road, the local property market was plagued by informational asymmetry, speculative brokerage, and convoluted legal processes. Everyday working families who had saved for decades were frequently exposed to distress and uncertainty.&rdquo;
                </p>
                <p>
                  &ldquo;My objective was simple: build a consultancy grounded in uncompromising statutory integrity, complete transparency, and genuine empathy. We examine every property title with the thoroughness we would expect for our own families. We tell our clients the truth about connectivity, municipal approvals, and resale viability.&rdquo;
                </p>
                <p>
                  &ldquo;Ten years later, seeing the generational wealth and security our clients have built in Ambernath, Badlapur, and across Maharashtra remains the single greatest reward of this work.&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center gap-4">
                <div>
                  <p className="text-base font-bold text-foreground">Anju Jangiti</p>
                  <p className="text-xs text-primary font-semibold">Founder &amp; Principal Consultant</p>
                  <p className="text-[11px] text-muted-foreground font-mono">MahaRERA Registration: A51700023633</p>
                </div>
              </div>
            </div>

            {/* Founder Credentials Card */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-4 pb-5 mb-5 border-b border-border/80">
                  <div className="h-16 w-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center p-2 shrink-0">
                    <Image
                      src="/images/logo.png"
                      alt="Shree Balaji Enterprises"
                      width={60}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Shree Balaji Enterprises</h3>
                    <p className="text-xs text-muted-foreground">Operating in MMR Since 2016</p>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold mt-1">
                      <Star className="h-3.5 w-3.5 fill-amber-500" />
                      <span>5.0 &bull; 1,000+ Satisfied Families</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/90">
                      <strong>Office:</strong> Shop No. 6, Vallabh Building, Avdhoot Residency, Opp. Shiv Mandir Road, Ambernath-West 421505
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-foreground/90">Direct Helpline: +91 77678 05544</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-foreground/90">shreebalajienterprisesamb@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-foreground/90">Open 7 Days: 9:00 AM &ndash; 9:00 PM</span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-border/80">
                  <a
                    href="https://wa.me/917767805544?text=Hi%20Anju%20ji,%20I%20would%20like%20to%20consult%20with%20you%20regarding%20property%20opportunities%20in%20MMR."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all shadow-xs"
                  >
                    Direct WhatsApp with Anju Jangiti
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Journey Milestones (Vertical Narrative Timeline) ── */}
      <section className="py-14 sm:py-20 border-b border-border bg-muted/20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-primary text-xs font-extrabold uppercase tracking-widest mb-2">
              Chronicle of Growth
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Our Journey Over the Last Decade
            </h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              From an independent local desk to an institutional advisory firm spanning 13+ cities across the Mumbai Metropolitan Region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m) => (
              <div key={m.year} className="p-6 rounded-xl border border-border bg-card">
                <span className="inline-block px-3 py-1 rounded-md text-xs font-mono font-bold bg-primary/10 text-primary mb-3">
                  {m.year}
                </span>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {m.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Foundational Operating Principles ────────────────── */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-primary text-xs font-extrabold uppercase tracking-widest mb-2">
              Institutional Values
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              The Four Principles That Guide Every Deal
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="p-6 rounded-xl border border-border bg-card">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}