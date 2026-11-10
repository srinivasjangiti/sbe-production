import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy & Client Data Notice",
  description:
    "Statutory Privacy Policy and Client Data Protection Notice of Shree Balaji Enterprises (MahaRERA: A51700023633). Institutional data governance standards for property advisory across MMR.",
  alternates: {
    canonical: "https://shreebalajienterprises.live/privacy",
  },
}

export default function PrivacyPolicyPage() {
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
        name: "Privacy Policy",
        item: "https://shreebalajienterprises.live/privacy",
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
            <span>Shree Balaji Enterprises &bull; Legal Compliance</span>
            <span className="text-foreground font-semibold">MahaRERA Reg. No: A51700023633</span>
          </div>

          <div className="mt-8 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-foreground leading-[1.15]">
              Privacy Policy &amp; Client Data Protection Notice
            </h1>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              This statutory notice establishes the institutional protocols governing the collection, custody, processing, and protection of client and transactional data by Shree Balaji Enterprises across residential, commercial, and industrial property advisory.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-border/60 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs text-muted-foreground font-mono">
            <span>Document Ref: <strong>SBE-DP-2026</strong></span>
            <span>Jurisdiction: <strong>Maharashtra, India</strong></span>
            <span>Effective Date: <strong>May 1, 2026</strong></span>
            <span>Audit Status: <strong>Statutory Compliant</strong></span>
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
                Notice Index
              </div>

              <nav className="space-y-1 text-xs">
                {[
                  { id: "entity", label: "1.0 Institutional Framework & Scope" },
                  { id: "categories", label: "2.0 Data Classification & Collection" },
                  { id: "matrix", label: "3.0 Statutory Disclosure Matrix" },
                  { id: "non-syndication", label: "4.0 Non-Syndication & Zero-Spam Covenant" },
                  { id: "banking", label: "5.0 Mortgage & Financial Intermediation" },
                  { id: "security", label: "6.0 Information Security & Custody" },
                  { id: "rights", label: "7.0 Statutory Data Subject Rights" },
                  { id: "grievance", label: "8.0 Grievance Redressal & Designated Desk" },
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
                  <Link href="/terms" className="text-foreground hover:underline font-medium block">
                    Terms of Advisory &rarr;
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
            <section id="entity" className="scroll-mt-28 space-y-4">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Section 1.0</span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Institutional Framework &amp; Scope
              </h2>
              <div className="text-sm leading-relaxed text-foreground/80 space-y-3 font-normal">
                <p>
                  Shree Balaji Enterprises (&ldquo;the Firm&rdquo;) is an established real estate advisory firm operating pursuant to the provisions of the Real Estate (Regulation and Development) Act, 2016 (RERA), under Maharashtra Real Estate Regulatory Authority <strong>Certificate No. A51700023633</strong>, having its principal brokerage chambers at Shop No. 6, Avdhoot Residency, Near Sarvodaya Nagar, Chikhloli, Ambernath (West), Maharashtra 421505.
                </p>
                <p>
                  This Privacy Notice governs all client engagements, portal interactions (via <code>shreebalajienterprises.live</code>), transaction consultations, site viewings, and regulatory submissions conducted under our agency authority across the Mumbai Metropolitan Region (MMR).
                </p>
              </div>
            </section>

            {/* Section 2.0 */}
            <section id="categories" className="scroll-mt-28 space-y-4 pt-6 border-t border-border/60">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Section 2.0</span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Data Classification &amp; Collection
              </h2>
              <div className="text-sm leading-relaxed text-foreground/80 space-y-3">
                <p>
                  In the performance of licensed real estate brokerage, the Firm processes information strictly under voluntary disclosure and statutory mandates. The classes of personal data collected encompass:
                </p>
                <ul className="space-y-2.5 pl-4 border-l border-border/80 text-xs sm:text-sm">
                  <li>
                    <strong>Client Identification &amp; Contact:</strong> Legal name, mobile phone number, residential address, and email coordinates supplied during advisory intake.
                  </li>
                  <li>
                    <strong>Property Search Parameters:</strong> Capital allocation budget, target micro-market (e.g., Ambernath, Badlapur, Kalyan, Thane), unit typology (1/2/3 BHK, commercial office, industrial shed), and execution timeframe.
                  </li>
                  <li>
                    <strong>Statutory KYC &amp; Verification Documents:</strong> Permanent Account Number (PAN), Aadhaar, or corporate entity authorization, gathered strictly during transaction drafting or agreement registration as prescribed by Maharashtra revenue authorities.
                  </li>
                  <li>
                    <strong>Technical &amp; Telemetry Data:</strong> Standard server logs, anonymized page request analytics, and protocol telemetry required for network resilience, processed without individual biometric or tracking linkage.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3.0: Data Disclosure Matrix */}
            <section id="matrix" className="scroll-mt-28 space-y-4 pt-6 border-t border-border/60">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Section 3.0</span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Statutory Disclosure Matrix
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Data transmission is restricted exclusively to authorized counterparties directly requisite for transaction execution, detailed under the institutional matrix below:
              </p>

              <div className="overflow-x-auto mt-4 border border-border/80 rounded-lg">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border/80 bg-muted/40 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      <th className="p-3">Purpose</th>
                      <th className="p-3">Data Classes</th>
                      <th className="p-3">Authorized Recipient</th>
                      <th className="p-3">Statutory Basis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-foreground/85">
                    <tr>
                      <td className="p-3 font-medium">Site Viewings</td>
                      <td className="p-3">Name, Mobile Phone</td>
                      <td className="p-3">Project Developer Desk</td>
                      <td className="p-3 text-muted-foreground">Premises Access Security</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Mortgage Processing</td>
                      <td className="p-3">Income Statements, KYC</td>
                      <td className="p-3">Scheduled Banks (SBI, HDFC, ICICI)</td>
                      <td className="p-3 text-muted-foreground">Direct Client Consent</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Agreement for Sale</td>
                      <td className="p-3">Aadhaar, PAN, Address</td>
                      <td className="p-3">Sub-Registrar Office / Legal Drafter</td>
                      <td className="p-3 text-muted-foreground">MahaRERA &amp; Registration Act</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Statutory Audit</td>
                      <td className="p-3">Transaction Dossier</td>
                      <td className="p-3">MahaRERA / Revenue Dept.</td>
                      <td className="p-3 text-muted-foreground">Mandatory Legal Obligation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 4.0 */}
            <section id="non-syndication" className="scroll-mt-28 space-y-4 pt-6 border-t border-border/60">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Section 4.0</span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Non-Syndication &amp; Zero-Spam Covenant
              </h2>
              <div className="text-sm leading-relaxed text-foreground/80 space-y-3">
                <p>
                  Shree Balaji Enterprises enforces an absolute ban on third-party commercial exploitation of client records:
                </p>
                <ul className="space-y-2 pl-4 border-l border-border/80 text-xs sm:text-sm">
                  <li>
                    <strong>Zero Data Brokering:</strong> We do not sell, license, lease, or monetize client rosters, contact coordinates, or financial parameters to marketing consortia, lead aggregators, or unauthorized third parties.
                  </li>
                  <li>
                    <strong>Direct Advisor Channel:</strong> Communications regarding shortlisted property files are handled exclusively by licensed consultants of our chambers.
                  </li>
                  <li>
                    <strong>Opt-Out Protocol:</strong> Clients may terminate property search engagement at any time by issuing a direct instruction via WhatsApp or email, triggering immediate dormancy of active outreach.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 5.0 */}
            <section id="banking" className="scroll-mt-28 space-y-4 pt-6 border-t border-border/60">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Section 5.0</span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Mortgage &amp; Financial Intermediation
              </h2>
              <div className="text-sm leading-relaxed text-foreground/80 space-y-3">
                <p>
                  Where a client commissions our firm for Home Loan Assistance, our facilitation operates under formal channel partner authorizations with recognized financial institutions (including State Bank of India, HDFC Bank, ICICI Bank, Bank of Baroda, and LIC Housing Finance).
                </p>
                <p>
                  Client financial files, salary slips, bank statements, and tax returns are transmitted via secure direct channels solely to accredited banking officers. Our firm retains zero local credit repositories post-disbursement.
                </p>
              </div>
            </section>

            {/* Section 6.0 */}
            <section id="security" className="scroll-mt-28 space-y-4 pt-6 border-t border-border/60">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Section 6.0</span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Information Security &amp; Custody
              </h2>
              <div className="text-sm leading-relaxed text-foreground/80 space-y-3">
                <p>
                  The Firm implements defense-in-depth technical and procedural controls designed to safeguard confidential client dossiers:
                </p>
                <p>
                  Digital communications across our web portal are protected via Transport Layer Security (TLS 1.3 encryption). Internal databases and inquiry stores are subject to role-based access restrictions limited to principal partners. Physical transaction binders are archived in locked archives subject to statutory retention cycles (minimum 8 years under Indian financial audit statutes).
                </p>
              </div>
            </section>

            {/* Section 7.0 */}
            <section id="rights" className="scroll-mt-28 space-y-4 pt-6 border-t border-border/60">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Section 7.0</span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Statutory Data Subject Rights
              </h2>
              <div className="text-sm leading-relaxed text-foreground/80 space-y-3">
                <p>
                  Under the Digital Personal Data Protection Act (DPDPA) and Indian legal framework, clients retain formal rights over their information:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 border border-border/70 rounded-lg bg-card text-xs space-y-1">
                    <p className="font-semibold text-foreground">Right of Access &amp; Summary</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Receive confirmation of whether personal data is processed, alongside a comprehensive summary of shared counterparties.
                    </p>
                  </div>
                  <div className="p-4 border border-border/70 rounded-lg bg-card text-xs space-y-1">
                    <p className="font-semibold text-foreground">Right of Rectification</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Obtain immediate correction of misleading, inaccurate, or incomplete contact and transaction records.
                    </p>
                  </div>
                  <div className="p-4 border border-border/70 rounded-lg bg-card text-xs space-y-1">
                    <p className="font-semibold text-foreground">Right of Erasure</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Demand purge of inquiry and personal files, subject only to mandatory MahaRERA and tax retention mandates.
                    </p>
                  </div>
                  <div className="p-4 border border-border/70 rounded-lg bg-card text-xs space-y-1">
                    <p className="font-semibold text-foreground">Right of Grievance Redressal</p>
                    <p className="text-muted-foreground leading-relaxed">
                      File formal complaints directly with our designated compliance officer with response mandated within 48 business hours.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8.0: Grievance Officer */}
            <section id="grievance" className="scroll-mt-28 space-y-4 pt-6 border-t border-border/60">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Section 8.0</span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Grievance Redressal &amp; Designated Desk
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                For statutory data rights enforcement, privacy notices, or regulatory inquiries, contact the designated compliance principal:
              </p>

              <div className="p-6 border border-border/80 rounded-lg bg-muted/20 space-y-2 text-xs leading-relaxed">
                <p className="font-semibold text-sm text-foreground">Principal Compliance Office &bull; Shree Balaji Enterprises</p>
                <p className="text-muted-foreground">MahaRERA Broker Registration Certificate: <strong>A51700023633</strong></p>
                <p className="text-muted-foreground">Chambers: Shop No. 6, Avdhoot Residency, Near Sarvodaya Nagar, Chikhloli, Ambernath (West), Maharashtra 421505</p>
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
