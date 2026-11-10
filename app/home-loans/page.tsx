"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  Calculator,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { saveInquiry, nextInquiryId } from "@/lib/admin-store"

const bankPartners = [
  {
    name: "State Bank of India",
    logo: "/images/banks/sbi.svg",
    rate: "8.35% – 8.75%",
    ltv: "Up to 90%",
    tenure: "30 Years",
    feature: "Lowest rates for government & PSU employees; zero hidden fees.",
  },
  {
    name: "HDFC Bank",
    logo: "/images/banks/hdfc.svg",
    rate: "8.45% – 9.00%",
    ltv: "Up to 85%",
    tenure: "30 Years",
    feature: "Fast digital sanction, doorstep verification, and customized top-ups.",
  },
  {
    name: "ICICI Bank",
    logo: "/images/banks/icici.svg",
    rate: "8.50% – 9.10%",
    ltv: "Up to 85%",
    tenure: "30 Years",
    feature: "Instant provisional sanctions and pre-approved project integration.",
  },
  {
    name: "Axis Bank",
    logo: "/images/banks/axis.svg",
    rate: "8.55% – 9.15%",
    ltv: "Up to 85%",
    tenure: "30 Years",
    feature: "12 EMI waivers on timely repayments with Shubh Aarambh loans.",
  },
  {
    name: "LIC Housing Finance",
    logo: "/images/banks/lic-hfl.svg",
    rate: "8.40% – 8.90%",
    ltv: "Up to 85%",
    tenure: "30 Years",
    feature: "Favorable underwriting for pension holders and long-term borrowers.",
  },
  {
    name: "PNB Housing Finance",
    logo: "/images/banks/pnb-hfl.webp",
    rate: "8.60% – 9.25%",
    ltv: "Up to 80%",
    tenure: "30 Years",
    feature: "Flexible income assessment models for self-employed entrepreneurs.",
  },
]

const WHATSAPP = "917767805544"

export default function HomeLoansPage() {
  // Calculator state
  const [loanAmount, setLoanAmount] = useState(3500000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [loanTenureYears, setLoanTenureYears] = useState(20)

  // Intake Form state
  const [loanType, setLoanType] = useState("New Home Purchase")
  const [employment, setEmployment] = useState("Salaried")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)

  // Interactive EMI computation
  const { emi, totalInterest, totalPayable } = useMemo(() => {
    const P = loanAmount
    const r = interestRate / 12 / 100
    const n = loanTenureYears * 12
    if (r === 0) {
      const e = Math.round(P / n)
      return { emi: e, totalInterest: 0, totalPayable: P }
    }
    const factor = Math.pow(1 + r, n)
    const monthly = Math.round((P * r * factor) / (factor - 1))
    const total = monthly * n
    const interest = total - P
    return { emi: monthly, totalInterest: interest, totalPayable: total }
  }, [loanAmount, interestRate, loanTenureYears])

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val)
  }

  const handleSubmitLoanInquiry = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() && !phone.trim()) return

    saveInquiry({
      id: nextInquiryId(),
      name: name.trim() || "Loan Applicant",
      phone: phone.trim(),
      email: "",
      interest: `Home Loan – ${loanType} (${employment})`,
      message: `Required Amount: ₹${(loanAmount / 100000).toFixed(1)} Lakhs | Calculated EMI: ₹${emi.toLocaleString("en-IN")}/mo`,
      status: "new",
      date: new Date().toISOString(),
    })

    const msg = `Hi Shree Balaji Enterprises, I need home loan guidance.%0AName: ${encodeURIComponent(name.trim())}%0APhone: ${encodeURIComponent(phone.trim())}%0ALoan Type: ${encodeURIComponent(loanType)}%0AEmployment: ${encodeURIComponent(employment)}%0AAmount: ${encodeURIComponent(`₹${(loanAmount / 100000).toFixed(1)} Lakhs`)}`
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank")

    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const directWhatsApp = () => {
    const msg = encodeURIComponent("Hi Shree Balaji Enterprises, I need help getting a home loan with the best interest rate. Please guide me.")
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Financial Services Header ───────────────────────── */}
      <section className="pt-10 sm:pt-14 pb-12 border-b border-border bg-gradient-to-b from-card/80 to-background">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4 border border-primary/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              Institutional Mortgage Advisory &bull; RERA A51700023633
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-[1.12] mb-4">
              Home Loan &amp; Mortgage Advisory Services
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              Compare home loan interest rates across 6+ nationalized and private banking partners. We evaluate your CIBIL profile, structure your application, and secure sanctions with ₹0 borrower fees.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={directWhatsApp} className="h-11 px-6 text-xs sm:text-sm font-bold gap-2">
                Consult Loan Advisor via WhatsApp
              </Button>
              <a href="#emi-calculator" className="text-xs sm:text-sm font-semibold text-primary hover:underline px-3 py-2">
                Calculate Monthly EMI &darr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive EMI Calculator & Application Form ───── */}
      <section id="emi-calculator" className="py-14 sm:py-20 border-b border-border bg-card/30 scroll-mt-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Calculator Column (7 cols) */}
            <div className="lg:col-span-7 rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/80">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Interactive EMI Calculator</h2>
                </div>
                <span className="text-xs text-muted-foreground font-mono">Live Estimates</span>
              </div>

              {/* Sliders */}
              <div className="space-y-6">
                {/* Loan Amount */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold uppercase tracking-wider text-muted-foreground">Loan Amount</span>
                    <span className="text-base font-black text-foreground">{formatCurrency(loanAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="15000000"
                    step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                    <span>₹5 Lakhs</span>
                    <span>₹75 Lakhs</span>
                    <span>₹1.5 Crores</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold uppercase tracking-wider text-muted-foreground">Annual Interest Rate</span>
                    <span className="text-base font-black text-foreground">{interestRate}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="7.0"
                    max="13.0"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                    <span>7.0%</span>
                    <span>9.5%</span>
                    <span>13.0%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold uppercase tracking-wider text-muted-foreground">Loan Tenure</span>
                    <span className="text-base font-black text-foreground">{loanTenureYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={loanTenureYears}
                    onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                    <span>5 Years</span>
                    <span>15 Years</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>

              {/* Calculated Results Block */}
              <div className="mt-8 pt-6 border-t border-border/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">Monthly EMI</p>
                  <p className="text-xl sm:text-2xl font-black text-primary">{formatCurrency(emi)}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Per Month</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/40 border border-border/60">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Total Interest</p>
                  <p className="text-base sm:text-lg font-bold text-foreground">{formatCurrency(totalInterest)}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Payable Over Tenure</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/40 border border-border/60">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Total Payment</p>
                  <p className="text-base sm:text-lg font-bold text-foreground">{formatCurrency(totalPayable)}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Principal + Interest</p>
                </div>
              </div>
            </div>

            {/* Quick Pre-Approval Desk Form (5 cols) */}
            <div className="lg:col-span-5 rounded-xl border border-border bg-card p-6 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-border/80">
                <h3 className="text-base font-bold text-foreground">Apply for Bank Pre-Approval</h3>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                  ₹0 Service Fee
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                Submit your profile. We approach multiple lenders simultaneously to negotiate your optimal rate and terms.
              </p>

              <form onSubmit={handleSubmitLoanInquiry} className="flex flex-col gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Loan Purpose
                  </label>
                  <select
                    value={loanType}
                    onChange={(e) => setLoanType(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                  >
                    <option value="New Home Purchase">New Home Purchase (Flats/Villas)</option>
                    <option value="Balance Transfer">Balance Transfer &amp; Top-Up</option>
                    <option value="Plot + Construction">Plot + Construction Loan</option>
                    <option value="Commercial Loan">Commercial Property Loan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Employment Category
                  </label>
                  <select
                    value={employment}
                    onChange={(e) => setEmployment(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                  >
                    <option value="Salaried">Salaried (Private / MNC / Govt)</option>
                    <option value="Self-Employed Professional">Self-Employed Professional</option>
                    <option value="Business Owner">Business Owner / Partner / Director</option>
                    <option value="NRI">NRI Borrower</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nilesh Joshi"
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

                <Button type="submit" className="w-full h-10 text-xs font-bold mt-1">
                  Submit Loan Pre-Approval Request
                </Button>
              </form>

              {submitted && (
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-2.5 text-center">
                  ✅ Request submitted. Our loan officer will contact you with bank comparison options.
                </p>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── Partner Bank Comparison Matrix ─────────────────── */}
      <section className="py-14 sm:py-20 border-b border-border">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-primary text-xs font-extrabold uppercase tracking-widest mb-2">
              Lender Benchmarking
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Compare Lending Partners &amp; Indicative Interest Rates
            </h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Indicative floating home loan interest rates as of 2026. Final sanction terms depend on CIBIL score, property approval, and employment profile.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-xs">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-muted/60 border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 px-4">Lender / Institution</th>
                  <th className="py-3 px-4">Indicative Rate</th>
                  <th className="py-3 px-4">Max Funding (LTV)</th>
                  <th className="py-3 px-4">Max Tenure</th>
                  <th className="py-3 px-4">Key Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {bankPartners.map((b) => (
                  <tr key={b.name} className="hover:bg-muted/20">
                    <td className="py-3.5 px-4 font-bold text-foreground flex items-center gap-2.5">
                      <div className="h-6 w-12 bg-white rounded border border-border/60 flex items-center justify-center p-1 overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={b.logo} alt={b.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <span>{b.name}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-primary">{b.rate}</td>
                    <td className="py-3.5 px-4 text-foreground/80">{b.ltv}</td>
                    <td className="py-3.5 px-4 text-foreground/80">{b.tenure}</td>
                    <td className="py-3.5 px-4 text-muted-foreground max-w-xs">{b.feature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Document Checklist: Salaried vs Business ────────── */}
      <section className="py-14 sm:py-20 border-b border-border bg-muted/20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-primary text-xs font-extrabold uppercase tracking-widest mb-2">
              Statutory Underwriting
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Required Documents for Fast-Track Sanction
            </h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              We review and organize your dossier beforehand to prevent query delays or bank file rejections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Salaried */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border/80">
                <Briefcase className="h-4.5 w-4.5 text-primary" />
                <h3 className="text-base font-bold text-foreground">For Salaried Individuals</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-foreground/85">
                {[
                  "Last 3 months salary slips with official company seal",
                  "Form 16 / Income Tax Returns for the last 2 financial years",
                  "6 months continuous salary account bank statements",
                  "PAN Card, Aadhaar Card, and current address verification",
                  "Copy of Employee ID card and appointment letter",
                  "Allotment letter or draft agreement of the property to be purchased",
                ].map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Self-Employed */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border/80">
                <Building2 className="h-4.5 w-4.5 text-primary" />
                <h3 className="text-base font-bold text-foreground">For Self-Employed &amp; Business Owners</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-foreground/85">
                {[
                  "Last 3 financial years ITR with detailed Computation of Income",
                  "Audited Balance Sheet and Profit & Loss accounts certified by a CA",
                  "12 months current account bank statements for business entity",
                  "GST Registration certificate and last 12 months GST returns",
                  "Business profile, proof of existence (Udyam / Shop Act / MoA)",
                  "PAN Card, Aadhaar Card, and property chain documents",
                ].map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Loan Consultation CTA ───────────────────────────── */}
      <section className="py-14 sm:py-18 bg-card/60">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-2xl bg-foreground text-background">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                Need Help Selecting the Right Bank?
              </h2>
              <p className="text-sm text-background/70 leading-relaxed">
                Our loan advisory team provides free consultation, CIBIL score checks, and doorstep documentation pickup across Ambernath, Badlapur &amp; MMR.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button size="lg" onClick={directWhatsApp} className="h-11 px-6 text-xs sm:text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                WhatsApp Loan Advisor
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-11 px-6 text-xs sm:text-sm font-bold bg-transparent border-background/30 text-background hover:bg-background/10">
                  Visit Registered Office
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}