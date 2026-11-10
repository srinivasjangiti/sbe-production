import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Advisory & Brokerage",
  description:
    "Institutional Terms of Advisory and Real Estate Brokerage for Shree Balaji Enterprises (MahaRERA: A51700023633). Governing client representation, inspections, and transactions across MMR.",
  alternates: {
    canonical: "https://shreebalajienterprises.live/terms",
  },
}

export default function TermsPage() {
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Terms of Advisory & Brokerage",
        item: "https://shreebalajienterprises.live/terms",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* ── Institutional Document Header ──────────────────────────── */}
      <header className="border-b border-border/80 bg-card/60">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-8 pt-12 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground pb-4 border-b border-border/60">
            <span>Shree Balaji Enterprises &bull; Brokerage Chambers</span>
            <span className="text-foreground font-semibold">MahaRERA Reg. No: A51700023633</span>
          </div>

          <div className="mt-8 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-foreground leading-[1.15]">
              Terms of Advisory &amp; Brokerage Services
            </h1>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              These institutional terms establish the contractual framework, representation boundaries, and advisory standards governing real estate viewings, transaction intermediation, and advisory engagements with Shree Balaji Enterprises.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-border/60 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs text-muted-foreground font-mono">
            <span>Gazette Ref: <strong>SBE-TOA-2026</strong></span>
            <span>Statute: <strong>Real Estate (RERA) Act, 2016</strong></span>
            <span>Forum: <strong>Thane District, Maharashtra</strong></span>
            <span>Status: <strong>Legally Binding</strong></span>
          </div>
        </div>
      </header>

      {/* ── Document Architecture ──────────────────────────────────── */}
      <div className="mx-auto max-w-[1140px] px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Table of Contents Index (Sticky Minimalist Typography) */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground pb-2 border-b border-border/80">
                Terms Index
              </div>

              <nav className="space-y-1 text-xs">
                {[
                  { id: "preamble", label: "1.0 Regulatory Framework & Acceptance" },
                  { id: "agency", label: "2.0 Scope of Advisory & Brokerage Agency" },
                  { id: "inventory", label: "3.0 Property Data & Price Integrity" },
                  { id: "inspections", label: "4.0 Site Viewings & Premises Protocol" },
                  { id: "mortgage", label: "5.0 Home Loan & Financial Facilitation" },
                  { id: "diligence", label: "6.0 Mandatory Client Due Diligence" },
                  { id: "intellectual", label: "7.0 Proprietary Data & IP Protection" },
                  { id: "liability", label: "8.0 Limitation of Liability & Indemnity" },
                  { id: "jurisdiction", label: "9.0 Governing Law & Judicial Jurisdiction" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block py-1.5 text-muted-foreground hover:text-foreground transition-colors leading-snug"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="pt-6 border-t border-border/60 space-y-3 text-xs">
                <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Related Governance</p>
                <div>
                  <Link href="/privacy" className="text-foreground hover:underline font-medium block">
                    Privacy Policy &rarr;
                  </Link>
                </div>
                <div>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground block">
                    Contact Advisory Office &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Legal Content */}
          <main className="lg:col-span-8 space-y-14">

            {/* Section 1.0 */}
            <section id="preamble" className="scroll-mt-28 space-y-4">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Section 1.0</span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Regulatory Framework &amp; Acceptance
              </h2>
              <div className="text-sm leading-relaxed text-foreground/80 space-y-3">
                <p>
                  These Terms of Advisory and Brokerage Services (&ldquo;Terms&rdquo;) constitute a formal agreement between Shree Balaji Enterprises (&ldquo;the Firm&rdquo;, &ldquo;Brokerage&rdquo;), registered under Maharashtra Real Estate Regulatory Authority <strong>(MahaRERA Reg. No: A51700023633)</strong>, and any party accessing our digital portal, scheduling property viewings, or executing real estate engagements (&ldquo;Client&rdquo;, &ldquo;Purchaser&rdquo;, or &ldquo;Lessee&rdquo;).
                </p>
                <p>
                  Initiating an inquiry, inspecting premises, or retaining the Firm for transaction advisory constitutes unconditional acceptance of these Terms. If you do not accept these provisions, you must immediately discontinue use of our channels.
                </p>
              </div>
            </section>

            {/* Section 2.0 */}
            <section id="agency" className="scroll-mt-28 space-y-4 pt-6 border-t border-border/60">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Section 2.0</span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Scope of Advisory &amp; Brokerage Agency
              </h2>
              <div className="text-sm leading-relaxed text-foreground/80 space-y-3">
                <p>
                  Shree Balaji Enterprises acts strictly within the statutory capacity of a certified Real Estate Agent as codified under Section 9 and Section 10 of the Real Estate (Regulation and Development) Act, 2016:
                </p>
                <ul className="space-y-2.5 pl-4 border-l border-border/80 text-xs sm:text-sm">
                  <li>
                    <strong>Non-Principal Capacity:</strong> Unless expressly declared in an executed memorandum of understanding, the Firm operates as an independent transaction broker and does not hold proprietary title, equity ownership, or construction liability in third-party development projects.
                  </li>
                  <li>
                    <strong>Agency Representation:</strong> We facilitate introductions, coordinate accompanied inspections, relay verified developer collateral, and assist with statutory agreement documentation between principals.
                  </li>
                  <li>
                    <strong>Statutory Compliance:</strong> In all project representations, our chambers mandate the presentation of project MahaRERA registration numbers on marketing dossiers.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3.0 */}
            <section id="inventory" className="scroll-mt-28 space-y-4 pt-6 border-t border-border/60">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Section 3.0</span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Property Data &amp; Price Integrity Protocol
              </h2>
              <div className="text-sm leading-relaxed text-foreground/80 space-y-3">
                <p>
                  Inventory metrics published across our digital listings (including carpet areas, floor elevations, sanction drawings, and base consideration figures) reflect collateral provided by registered developers or verified individual title holders.
                </p>
                <p>
                  While our chambers implement strict quality verification, real estate considerations, unit availability, and statutory levies (including Maharashtra Stamp Duty, Registration Charges, and Goods &amp; Services Tax) remain subject to developer revision and municipal notification. Binding commercial terms are established solely via the formal Developer Allotment Letter or Registered Agreement for Sale.
                </p>
              </div>
            </section>

            {/* Section 4.0 */}
            <section id="inspections" className="scroll-mt-28 space-y-4 pt-6 border-t border-border/60">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Section 4.0</span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Site Viewings &amp; Premises Protocol
              </h2>
              <div className="text-sm leading-relaxed text-foreground/80 space-y-3">
                <p>
                  Physical inspections of residential developments, commercial suites, and land parcels are conducted under strict corporate protocols:
                </p>
                <ul className="space-y-2.5 pl-4 border-l border-border/80 text-xs sm:text-sm">
                  <li>
                    <strong>Accompanied Escort:</strong> Inspections are conducted under the supervision of authorized consultants of the Firm during daylight hours (09:00 &ndash; 19:00 IST).
                  </li>
                  <li>
                    <strong>Construction Safety:</strong> On active construction sites, clients must adhere to developer security protocols, hardhat mandates, and designated viewing corridors.
                  </li>
                  <li>
                    <strong>Zero Consultation Retainer:</strong> The Firm imposes zero advance fees or consultation charges simply to review portfolio listings or participate in preliminary site viewings.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 5.0 */}
            <section id="mortgage" className="scroll-mt-28 space-y-4 pt-6 border-t border-border/60">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Section 5.0</span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Home Loan &amp; Financial Facilitation
              </h2>
              <div className="text-sm leading-relaxed text-foreground/80 space-y-3">
                <p>
                  Mortgage guidance rendered by the Firm represents administrative facilitation connecting purchasers with recognized banking partners (including SBI, HDFC Bank, ICICI Bank, and LIC Housing Finance).
                </p>
                <p>
                  Loan pre-qualifications, interest margins, processing fees, and final disbursement commitments reside under the sovereign underwriting jurisdiction of the respective financial institution. The Firm gives no warranty regarding lender credit approvals.
                </p>
              </div>
            </section>

            {/* Section 6.0 */}
            <section id="diligence" className="scroll-mt-28 space-y-4 pt-6 border-t border-border/60">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Section 6.0</span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Mandatory Client Due Diligence
              </h2>
              <div className="text-sm leading-relaxed text-foreground/80 space-y-3">
                <p>
                  Prior to releasing earnest money, token remittances, or executing legally binding contracts:
                </p>
                <p className="p-4 border border-border/80 rounded-lg bg-muted/20 text-xs leading-relaxed">
                  <strong>Statutory Caveat:</strong> Every purchaser is advised to retain an independent legal advocate to examine Title Search Reports, Non-Encumbrance Certificates, Commencement Certificates (CC), Occupancy Certificates (OC), and statutory project filings recorded on the Maharashtra Real Estate Regulatory Authority portal (<code>maharera.mahaonline.gov.in</code>).
                </p>
              </div>
            </section>

            {/* Section 7.0 */}
            <section id="intellectual" className="scroll-mt-28 space-y-4 pt-6 border-t border-border/60">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Section 7.0</span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Proprietary Data &amp; IP Protection
              </h2>
              <div className="text-sm leading-relaxed text-foreground/80 space-y-3">
                <p>
                  All architectural photography, curated narrative property analyses, structural schematics, brand marks, and digital assets published on <code>shreebalajienterprises.live</code> constitute intellectual property protected under Indian copyright statutes.
                </p>
                <p>
                  Automated scraping, programmatic aggregation, commercial redistribution, or competitive replication of our listings database without prior written authorization will invoke immediate civil injunctive proceedings and criminal copyright claims.
                </p>
              </div>
            </section>

            {/* Section 8.0 */}
            <section id="liability" className="scroll-mt-28 space-y-4 pt-6 border-t border-border/60">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Section 8.0</span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Limitation of Liability &amp; Indemnity
              </h2>
              <div className="text-sm leading-relaxed text-foreground/80 space-y-3">
                <p>
                  To the maximum extent permitted by applicable Indian jurisprudence, Shree Balaji Enterprises, its partners, and licensed agents shall not be liable for any indirect, incidental, consequential, or punitive damages resulting from developer construction delays, force majeure events, municipal zoning revisions, or financing rejections.
                </p>
                <p>
                  The aggregate liability of the Firm arising out of any specific advisory transaction shall be strictly confined to the brokerage commission received by the Firm for that designated transaction.
                </p>
              </div>
            </section>

            {/* Section 9.0 */}
            <section id="jurisdiction" className="scroll-mt-28 space-y-4 pt-6 border-t border-border/60">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Section 9.0</span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Governing Law &amp; Judicial Jurisdiction
              </h2>
              <div className="text-sm leading-relaxed text-foreground/80 space-y-3">
                <p>
                  These Terms and any contractual relationships formed under them are governed exclusively by the laws of India and the State of Maharashtra.
                </p>
                <p>
                  Any disputes, arbitration proceedings, or legal actions arising out of our brokerage services shall be submitted to the exclusive territorial jurisdiction of the competent civil and commercial courts within the District of Thane / Kalyan, Maharashtra.
                </p>
              </div>

              <div className="mt-6 p-6 border border-border/80 rounded-lg bg-muted/20 space-y-2 text-xs leading-relaxed">
                <p className="font-semibold text-sm text-foreground">Principal Office &bull; Shree Balaji Enterprises</p>
                <p className="text-muted-foreground">MahaRERA Registration Certificate: <strong>A51700023633</strong></p>
                <p className="text-muted-foreground">
                  Chambers:{" "}
                  <a
                    href="https://share.google/wXb6cKV7lpMgo9P4c"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-foreground"
                  >
                    Shop No. 6, Vallabh Building, Avdhoot Residency, Near Sarvodaya Nagar, Chikhloli, Ambernath (West), Maharashtra 421505
                  </a>
                </p>
                <div className="pt-2 flex flex-wrap gap-x-6 gap-y-1 text-foreground">
                  <span>Telephone: <a href="tel:7767805544" className="hover:underline font-mono">+91 7767805544</a></span>
                  <span>Email: <a href="mailto:shreebalajienterprisesamb@gmail.com" className="hover:underline font-mono">shreebalajienterprisesamb@gmail.com</a></span>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  )
}
