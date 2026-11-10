"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Phone,
  MapPin,
  ChevronRight,
  Check,
  FileText,
  Lock,
} from "lucide-react"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { saveInquiry, nextInquiryId } from "@/lib/admin-store"

const WHATSAPP_NUMBER = "917767805544"
const PHONE_DISPLAY = "+91 77678 05544"

// ── 5-Stage Home Loan Assistance Process (Natural Human Language) ────
const loanProcessSteps = [
  {
    step: "01",
    title: "Initial Consultation & Property Budgeting",
    description:
      "We begin by understanding the specific property you are considering, your targeted purchase timeline, and your available savings to establish a comfortable borrowing framework.",
    deliverable: "Target borrowing budget",
  },
  {
    step: "02",
    title: "Income & Credit Assessment",
    description:
      "We review your net monthly income, existing loan commitments, and credit profile to estimate an achievable borrowing range before you pay earnest booking money to a seller or builder.",
    deliverable: "Initial eligibility check",
  },
  {
    step: "03",
    title: "Document Preparation",
    description:
      "Our team provides a clear checklist for your employment type, reviews your KYC documents, salary slips or business returns, and verifies property title papers so your file is ready for underwriting.",
    deliverable: "Completed document file",
  },
  {
    step: "04",
    title: "Bank Application & Follow-up",
    description:
      "We assist you in submitting your file to the most suitable public or private lending institutions, coordinating directly with bank underwriters and legal advocates to resolve questions promptly.",
    deliverable: "Application submitted to lenders",
  },
  {
    step: "05",
    title: "Sanction & Loan Disbursement",
    description:
      "Once your sanction letter arrives, we help you understand the terms, oversee the bank's technical valuation of the property, and assist through stamp duty registration and final disbursement.",
    deliverable: "Disbursement and property registration",
  },
]

// ── Documentation Guidelines (4 Clear Expandable Categories) ─────────
const documentationGroups = [
  {
    id: "kyc",
    category: "Identity & Address Documents",
    notes: "Basic KYC documentation required for all primary applicants and co-applicants.",
    items: [
      "PAN Card (mandatory for financial verification, credit bureau checks, and tax records)",
      "Aadhaar Card, Valid Passport, or Voter ID for proof of identity and citizenship",
      "Current address proof (Registered Rent Agreement, Utility Bill, or Bank Statement)",
      "Recent passport-sized color photographs of all applicants",
    ],
  },
  {
    id: "salaried",
    category: "Salaried Applicants",
    notes: "For applicants employed with private corporate firms, MNCs, PSUs, or government departments.",
    items: [
      "Last 3 months' original salary slips bearing official company seal or digital signature",
      "Form 16 (Part A & B) and Income Tax Returns for the last 2 assessment years",
      "Last 6 months' continuous bank statement of the primary salary account",
      "Official company appointment letter, confirmation letter, or valid employee ID card",
    ],
  },
  {
    id: "self-employed",
    category: "Self-Employed & Business Applicants",
    notes: "For proprietors, partners, consultants, medical professionals, and enterprise directors.",
    items: [
      "Last 3 financial years' Income Tax Returns with complete Computation of Income",
      "Audited Balance Sheet and Profit & Loss statement certified by a Chartered Accountant",
      "Last 12 months' operative bank account statements (Current and Savings)",
      "Proof of business registration (GST Certificate, Udyam Aadhaar, Shop Act License, or MoA)",
    ],
  },
  {
    id: "property",
    category: "Property & Title Documents",
    notes: "Requirements depend on whether the purchase is a resale home or builder allotment.",
    items: [
      "Draft Agreement for Sale or Allotment Letter from the developer or seller",
      "Approved building plan copy and Commencement Certificate (CC)",
      "Previous chain agreements and registered Index II documents (for resale transactions)",
      "Society Share Certificate, Society NOC, and latest municipal tax receipts",
    ],
  },
]

// ── Eligibility Considerations (Editorial, Qualified Figures) ────────
const eligibilityFactors = [
  {
    title: "Monthly Income & Existing EMIs",
    explanation:
      "Lenders benchmark your repayment capacity using the Fixed Obligation to Income Ratio (FOIR). Most banks generally prefer that your total monthly loan commitments—including existing vehicle or personal loans—remain between 40% and 50% of your verifiable net household income, though specific limits vary by institution and income bracket.",
  },
  {
    title: "Credit Profile & CIBIL Score",
    explanation:
      "A CIBIL score of 750 or above typically qualifies borrowers for smoother processing and preferred interest rates. However, approval is still practical for scores between 650 and 740, often by adding an earning co-applicant or opting for specialized housing finance programs.",
  },
  {
    title: "Loan-to-Value (LTV) Norms",
    explanation:
      "Under prevailing statutory guidelines, lending institutions generally fund between 75% and 90% of a property's registered agreement value, depending on the property cost bracket. The remaining amount represents the buyer's own down payment and registration expenses.",
  },
  {
    title: "Property Approvals & Title Clarity",
    explanation:
      "Banks evaluate the legal and structural standing of the property independently. Properties with clear 30-year chain deeds, Occupancy Certificates (OC), and municipal building permissions progress through technical verification with fewer queries.",
  },
]

// ── Frequently Asked Home Loan Questions ─────────────────────────────
const loanFaqs = [
  {
    q: "Does Shree Balaji Enterprises charge any fee for loan assistance?",
    a: "No. Our home loan guidance and document coordination services are completely free for property buyers. We charge zero advisory fees, processing commissions, or consultation costs.",
  },
  {
    q: "Is Shree Balaji Enterprises a bank or direct lender?",
    a: "No. Shree Balaji Enterprises is a licensed real-estate consultancy (MahaRERA: A51700023633). We act solely as a local facilitation partner, helping buyers organize paperwork and coordinate with recognized banks and housing finance companies. Final loan sanctions and terms are determined solely by the lending institution.",
  },
  {
    q: "What CIBIL score is generally needed for a home loan?",
    a: "A CIBIL score of 750 and above is considered healthy by most lending institutions. If your score is between 650 and 740, approval is still very possible, though banks may ask for a higher down payment or an earning co-applicant.",
  },
  {
    q: "Can self-employed individuals with cash or seasonal income apply?",
    a: "Yes. Many housing finance institutions evaluate self-employed applicants using banking turnover models, GST return volumes, and gross business receipts rather than strict salaried payslips. We guide you on organizing the appropriate financial records.",
  },
  {
    q: "How long does the home loan sanction process take in Ambernath?",
    a: "For properties with clear title and complete documentation, provisional sanction typically takes 5 to 7 business days. Technical valuation and final disbursement generally conclude within 10 to 15 business days thereafter.",
  },
  {
    q: "What is an APF (Approved Project Financial) number?",
    a: "An APF code indicates that a developer's project has already been legally and technically vetted by major banks. Purchasing a home in an APF-approved project speeds up individual loan approvals significantly because the master property title is pre-cleared.",
  },
]

export default function HomeLoansPage() {
  // ── Calculator State ───────────────────────────────────────────────
  const [loanAmount, setLoanAmount] = useState<number>(3500000)
  const [interestRate, setInterestRate] = useState<number>(8.5)
  const [tenureYears, setTenureYears] = useState<number>(20)

  // ── Intake Form State ──────────────────────────────────────────────
  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [city, setCity] = useState<string>("Ambernath East")
  const [propertyValue, setPropertyValue] = useState<string>("")
  const [desiredLoan, setDesiredLoan] = useState<string>("")
  const [employmentType, setEmploymentType] = useState<string>("Salaried")
  const [notes, setNotes] = useState<string>("")

  // Form Validation & Status
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  // Accordion States
  const [openDocGroups, setOpenDocGroups] = useState<number[]>([0])
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  const toggleDocGroup = (idx: number) => {
    setOpenDocGroups((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    )
  }

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx))
  }

  // ── Mathematically Accurate Standard Compound Reducing Balance EMI ─
  const { emi, totalInterest, totalPayable } = useMemo(() => {
    const P = loanAmount
    const r = interestRate / 12 / 100
    const n = tenureYears * 12
    if (r === 0 || n === 0) {
      const e = Math.round(P / n)
      return { emi: e, totalInterest: 0, totalPayable: P }
    }
    const factor = Math.pow(1 + r, n)
    const monthly = Math.round((P * r * factor) / (factor - 1))
    const total = monthly * n
    const interest = total - P
    return { emi: monthly, totalInterest: interest, totalPayable: total }
  }, [loanAmount, interestRate, tenureYears])

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val)
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

  // Handle Form Submission
  const handleSubmitGuidance = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    const inquiryDetails = [
      `Employment: ${employmentType}`,
      `Location: ${city}`,
      propertyValue ? `Property Value: ${propertyValue.trim()}` : null,
      desiredLoan ? `Desired Loan: ${desiredLoan.trim()}` : `Calculated Amount: ₹${(loanAmount / 100000).toFixed(1)}L`,
      notes ? `Specifics: ${notes.trim()}` : null,
      `Estimated EMI: ₹${emi.toLocaleString("en-IN")}/mo`,
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
        interest: `Home Loan Assistance – ${employmentType} (${city})`,
        message: inquiryDetails,
        status: "new",
        date: new Date().toISOString(),
      })
    } catch {
      // Graceful fallback
    }

    // Direct WhatsApp message formatting
    const msg = [
      "Hello Anju ji & Shree Balaji Enterprises,",
      "I would like to request Free Home Loan Guidance for my property purchase:",
      `• Applicant Name: ${name.trim()}`,
      `• Mobile: ${phone.trim()}`,
      `• Employment Type: ${employmentType}`,
      `• Property Location: ${city}`,
      propertyValue ? `• Approx Property Value: ${propertyValue.trim()}` : null,
      desiredLoan ? `• Desired Loan: ${desiredLoan.trim()}` : `• Calculated Loan: ₹${(loanAmount / 100000).toFixed(1)} Lakhs`,
      notes ? `• Details / Notes: ${notes.trim()}` : null,
      "",
      "Please advise on eligibility considerations and document requirements.",
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
    setPropertyValue("")
    setDesiredLoan("")
    setNotes("")
    setSubmitted(false)
    setErrors({})
  }

  const scrollToEnquiry = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById("loan-enquiry")
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const applyCalculatedLoan = (e: React.MouseEvent) => {
    e.preventDefault()
    setDesiredLoan(`₹${(loanAmount / 100000).toFixed(1)} Lakhs`)
    const el = document.getElementById("loan-enquiry")
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleDirectWhatsApp = () => {
    const msg =
      "Hello Anju ji, I am purchasing a property in Ambernath / MMR and need guidance with home loan eligibility and documentation."
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-foreground">
      {/* ── Breadcrumb Navigation ──────────────────────────────────── */}
      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
            <span className="text-foreground font-medium">Home Loan Assistance</span>
          </nav>
        </div>
      </div>

      {/* ── 1. Hero Section: Confident, Art-Directed, Uncluttered ──── */}
      <header className="py-20 sm:py-28 lg:py-32 border-b border-border/80">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Heading & Service Overview */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              <h1 className="text-4xl sm:text-6xl md:text-[62px] font-black tracking-tight text-foreground leading-[1.08]">
                Your Home Loan,{" "}
                <span className="text-primary font-serif italic font-normal">Handled For You.</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl font-normal">
                We help property buyers understand their borrowing capacity, prepare the necessary paperwork, and coordinate with banks across the Mumbai Metropolitan Region—from first application to final disbursement.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#loan-enquiry"
                  onClick={scrollToEnquiry}
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-xs"
                >
                  <span>Get Free Loan Guidance</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold transition-all shadow-xs"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-current shrink-0" />
                  <span>WhatsApp Advisory Desk</span>
                </button>
              </div>

              {/* Service Highlights */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-border/60 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Free service for property buyers</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Documentation support</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Multi-bank coordination</span>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Architectural Photography */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border/80 bg-muted shadow-sm">
                <Image
                  src="/images/mortgage-hero.jpg"
                  alt="Home loan and mortgage guidance in Ambernath - Shree Balaji Enterprises"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ── 2. Loan Assistance: Editorial Split (No Generic Cards) ─── */}
      <section className="py-20 sm:py-28 lg:py-32 border-b border-border/80">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left 5 Cols: Introduction & Advisory Stance */}
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              <p className="text-primary text-xs font-bold uppercase tracking-[0.25em]">
                How We Help
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-foreground tracking-tight leading-[1.15]">
                Financial Guidance for Property Buyers.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Purchasing a home is often the largest financial commitment a family makes. As your local property partner, we manage the loan coordination free of charge so your purchase remains on track from day one.
              </p>
            </div>

            {/* Right 7 Cols: The 4 Services in an Editorial Stack */}
            <div className="lg:col-span-7 space-y-10 sm:space-y-12">
              
              <div className="pb-10 border-b border-border/70 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-primary tracking-wider uppercase">01</span>
                  <span className="h-px flex-1 bg-border/60" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  Borrowing Capacity &amp; Eligibility
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Before you commit funds to a seller or builder, we review your net household income, ongoing commitments, and credit profile to calculate a realistic, sustainable loan amount.
                </p>
              </div>

              <div className="pb-10 border-b border-border/70 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-primary tracking-wider uppercase">02</span>
                  <span className="h-px flex-1 bg-border/60" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  Documentation Assistance
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Missing paperwork is the most common cause of bank delays. We help you compile every required record—from salary slips and Form 16s to prior property agreements and municipal approvals.
                </p>
              </div>

              <div className="pb-10 border-b border-border/70 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-primary tracking-wider uppercase">03</span>
                  <span className="h-px flex-1 bg-border/60" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  Bank Coordination
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Different housing finance companies suit different applicant profiles. We coordinate directly with public and private lenders based on processing timelines, loan-to-value limits, and your employment background.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-primary tracking-wider uppercase">04</span>
                  <span className="h-px flex-1 bg-border/60" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  Registration and Disbursement Support
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Our assistance continues until funds are released. We coordinate with the bank&apos;s legal panel for title verification, review draft loan agreements, and accompany you through Sub-Registrar registration and disbursement.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── 3. Loan Process: Spacious Connected Vertical Timeline ──── */}
      <section className="py-20 sm:py-28 lg:py-32 border-b border-border/80 bg-muted/10">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-16 sm:mb-24">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">
              Step-by-Step
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-foreground tracking-tight leading-[1.15] mb-4">
              How the Loan Process Works.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              A structured, transparent path designed to eliminate uncertainty and keep your property purchase moving forward smoothly.
            </p>
          </div>

          {/* Spacious Vertical Timeline */}
          <div className="max-w-4xl mx-auto space-y-14 sm:space-y-16 relative before:absolute before:left-5 sm:before:left-7 before:top-4 before:bottom-4 before:w-px before:bg-border/80">
            {loanProcessSteps.map((item, idx) => (
              <div key={item.step} className="relative flex items-start gap-6 sm:gap-10 group">
                
                {/* Step Number Circle */}
                <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-full bg-card border-2 border-primary/40 group-hover:border-primary flex items-center justify-center shrink-0 z-10 shadow-xs transition-colors">
                  <span className="font-mono text-xs sm:text-sm font-bold text-primary">
                    {item.step}
                  </span>
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-1 sm:pt-2.5">
                  <div className="flex flex-wrap items-center gap-3 mb-2.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                      {item.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                      Stage {idx + 1}
                    </span>
                  </div>

                  <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                    {item.description}
                  </p>

                  <p className="text-xs text-muted-foreground/80 mt-3 flex items-center gap-1.5">
                    <span>Outcome:</span>
                    <span className="font-medium text-foreground">{item.deliverable}</span>
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. EMI Calculator: Featured Financial Planning Tool ────── */}
      <section id="loan-calculator" className="py-20 sm:py-28 lg:py-32 border-b border-border/80 scroll-mt-8">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-14 sm:mb-18">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">
              Financial Planning
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-foreground tracking-tight leading-[1.15] mb-4">
              Estimate Your Monthly Installment.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Model different borrowing amounts, prevailing interest rates, and loan tenures to understand your monthly commitments before applying.
            </p>
          </div>

          {/* Calculator Feature Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Left 7 Columns: Interactive Sliders */}
            <div className="lg:col-span-7 p-8 sm:p-12 rounded-2xl border border-border/80 bg-card shadow-xs space-y-10">
              <div>
                <h3 className="text-lg font-bold text-foreground">Loan Parameters</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Adjust sliders to model your borrowing requirements.</p>
              </div>

              {/* Slider 1: Loan Amount */}
              <div className="space-y-3.5">
                <div className="flex items-baseline justify-between">
                  <label htmlFor="loan-amount-slider" className="text-sm font-semibold text-foreground">
                    Loan Amount
                  </label>
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-primary">
                    {formatCurrency(loanAmount)}
                  </span>
                </div>
                <input
                  id="loan-amount-slider"
                  aria-label="Loan Amount in Rupees"
                  type="range"
                  min="500000"
                  max="15000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-lg"
                />
                <div className="flex justify-between text-xs text-muted-foreground font-mono">
                  <span>₹5 Lakhs</span>
                  <span>₹75 Lakhs</span>
                  <span>₹1.5 Crores</span>
                </div>
              </div>

              {/* Slider 2: Interest Rate */}
              <div className="space-y-3.5">
                <div className="flex items-baseline justify-between">
                  <label htmlFor="interest-rate-slider" className="text-sm font-semibold text-foreground">
                    Expected Interest Rate
                  </label>
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-primary">
                    {interestRate.toFixed(1)}% p.a.
                  </span>
                </div>
                <input
                  id="interest-rate-slider"
                  aria-label="Annual Interest Rate percentage"
                  type="range"
                  min="7.5"
                  max="12.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-lg"
                />
                <div className="flex justify-between text-xs text-muted-foreground font-mono">
                  <span>7.5%</span>
                  <span>9.5%</span>
                  <span>12.0%</span>
                </div>
              </div>

              {/* Slider 3: Loan Tenure */}
              <div className="space-y-3.5">
                <div className="flex items-baseline justify-between">
                  <label htmlFor="tenure-years-slider" className="text-sm font-semibold text-foreground">
                    Loan Tenure
                  </label>
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-primary">
                    {tenureYears} Years ({tenureYears * 12} Mos)
                  </span>
                </div>
                <input
                  id="tenure-years-slider"
                  aria-label="Loan Tenure in Years"
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-lg"
                />
                <div className="flex justify-between text-xs text-muted-foreground font-mono">
                  <span>5 Years</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-muted-foreground/90 leading-relaxed border-t border-border/60">
                Calculated using standard reducing balance methodology. Early installments predominantly cover interest; principal amortization accelerates across the second half of the tenure.
              </div>
            </div>

            {/* Right 5 Columns: Output Summary Panel */}
            <div className="lg:col-span-5 p-8 sm:p-12 rounded-2xl border border-border/80 bg-muted/25 flex flex-col justify-between space-y-10">
              
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Estimated Monthly EMI
                </p>
                <p className="text-4xl sm:text-5xl font-mono font-black text-primary leading-tight">
                  {formatCurrency(emi)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Per month for {tenureYears} years at {interestRate.toFixed(1)}% p.a.
                </p>

                {/* Financial Breakdown Rows */}
                <div className="space-y-4 pt-8 mt-8 border-t border-border/70 text-sm sm:text-base">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Principal Borrowed</span>
                    <span className="font-mono font-bold text-foreground">{formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Interest Payable</span>
                    <span className="font-mono font-bold text-foreground">{formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border/60 text-base sm:text-lg">
                    <span className="font-semibold text-foreground">Total Amount Payable</span>
                    <span className="font-mono font-bold text-foreground">{formatCurrency(totalPayable)}</span>
                  </div>
                </div>
              </div>

              {/* Action Button & Subtle Footnote */}
              <div className="space-y-4 pt-4 border-t border-border/70">
                <button
                  type="button"
                  onClick={applyCalculatedLoan}
                  className="w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-all shadow-xs"
                >
                  <span>Apply With This Estimate</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-xs text-muted-foreground leading-relaxed text-center">
                  * Note: Computed values are illustrative estimates. Final interest rates and repayment schedules are determined independently by the sanctioning lender.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── 5. Documentation: Spacious, Readable Accordion ─────────── */}
      <section className="py-20 sm:py-28 lg:py-32 border-b border-border/80 bg-muted/10">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-14 sm:mb-18">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">
              Document Checklist
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-foreground tracking-tight leading-[1.15] mb-4">
              Required Documents by Applicant Type.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Having your documents ready in advance speeds up the loan sanction process. Select your applicant category below to review the standard checklist.
            </p>
          </div>

          {/* 4 Clean Editorial Accordion Groups */}
          <div className="max-w-4xl mx-auto space-y-4">
            {documentationGroups.map((group, idx) => {
              const isOpen = openDocGroups.includes(idx)
              return (
                <div
                  key={group.id}
                  className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleDocGroup(idx)}
                    aria-expanded={isOpen}
                    className="w-full p-7 sm:p-8 flex items-center justify-between text-left gap-6 hover:bg-muted/20 transition-colors focus:outline-none"
                  >
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                        {group.category}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {group.notes}
                      </p>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-7 sm:px-8 pb-8 pt-3 border-t border-border/60 animate-in fade-in duration-200">
                      <ul className="space-y-4 pt-2">
                        {group.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-3.5 text-base text-foreground/90">
                            <FileText className="h-4 w-4 text-primary shrink-0 mt-1" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-border/70 text-xs text-muted-foreground text-center">
            * Note: Exact document requirements are determined by the specific lending institution. If you need assistance obtaining certified municipal copies or chain deeds, our team guides you during the property conveyance process.
          </div>

        </div>
      </section>

      {/* ── 6. Eligibility: Editorial 2-Column Split (No Icon Grids) ─ */}
      <section className="py-20 sm:py-28 lg:py-32 border-b border-border/80">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-16 sm:mb-20">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">
              Eligibility Factors
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-foreground tracking-tight leading-[1.15] mb-4">
              What Banks Look at When Evaluating Your Application.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Lenders evaluate risk across your personal financial profile and the legal standing of the property. Understanding these fundamentals helps you structure your application for the most favorable terms.
            </p>
          </div>

          {/* Balanced Editorial 2-Column Grid with Subtle Dividers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 sm:gap-y-16 pt-6 border-t border-border/70">
            {eligibilityFactors.map((factor, idx) => (
              <div key={factor.title} className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-primary tracking-wider uppercase">0{idx + 1}</span>
                  <span className="h-px flex-1 bg-border/60" />
                </div>

                <h3 className="text-xl font-bold text-foreground tracking-tight">
                  {factor.title}
                </h3>

                <p className="text-base text-muted-foreground leading-relaxed">
                  {factor.explanation}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. Enquiry Form: Spacious 2-Column Layout ──────────────── */}
      <section id="loan-enquiry" className="py-20 sm:py-28 lg:py-32 border-b border-border/80 scroll-mt-8 bg-muted/15">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Reassurance & Direct Contact */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">
                  Free Advisory Desk
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-foreground tracking-tight leading-[1.15]">
                  Request Free Home Loan Guidance.
                </h2>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed">
                Whether you have already selected a home in Ambernath or are simply exploring your budget before beginning site visits, our advisory team is here to help.
              </p>

              <div className="space-y-4 pt-6 border-t border-border/70 text-sm text-foreground/90">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <p>
                    <span className="font-semibold text-foreground">Zero Advisory Fees:</span> Our loan assistance is 100% complimentary for home buyers.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <p>
                    <span className="font-semibold text-foreground">Confidential &amp; Secure:</span> We never request bank passwords, OTPs, or confidential account credentials.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <p>
                    <span className="font-semibold text-foreground">Direct Local Assistance:</span> Coordinated in person by Anju Sharma and our senior property team in Ambernath.
                  </p>
                </div>
              </div>

              {/* Direct Telephone Line */}
              <div className="pt-6 border-t border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                <span className="text-muted-foreground">Prefer an immediate call?</span>
                <a
                  href={`tel:${PHONE_DISPLAY.replace(/[^0-9+]/g, "")}`}
                  className="font-bold text-primary hover:underline inline-flex items-center gap-1.5"
                >
                  <Phone className="h-4 w-4" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Clean Grouped Form */}
            <div className="lg:col-span-7">
              <div className="border border-border/80 rounded-2xl bg-card p-8 sm:p-12 shadow-xs">
                
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                      <Check className="h-7 w-7 stroke-[2.5]" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Guidance Request Received
                    </h3>
                    <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed mb-8">
                      Thank you, <span className="font-semibold text-foreground">{name}</span>. Your home loan guidance request has been logged. Anju Sharma and our advisory team will review your parameters and contact you at <span className="font-semibold text-foreground">{phone}</span> shortly.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={handleDirectWhatsApp}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold transition-all shadow-xs"
                      >
                        <WhatsAppIcon className="h-4 w-4 fill-current shrink-0" />
                        <span>Continue on WhatsApp</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="w-full sm:w-auto px-5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground border border-border/80 rounded-lg hover:bg-muted transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="border-b border-border/60 pb-5 mb-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                        Request Free Loan Assistance
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Please provide basic parameters about your purchase. We do not require sensitive bank credentials.
                      </p>
                    </div>

                    <form onSubmit={handleSubmitGuidance} className="space-y-6">
                      
                      {/* Group 1: Personal Details */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                          1. Personal Information
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-foreground mb-1.5">
                              Applicant Full Name <span className="text-destructive">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Nilesh Joshi"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value)
                                if (errors.name) setErrors({ ...errors, name: undefined })
                              }}
                              className={`w-full h-12 px-3.5 text-sm border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                                errors.name ? "border-destructive" : "border-border"
                              }`}
                            />
                            {errors.name && (
                              <p className="text-xs text-destructive mt-1">{errors.name}</p>
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
                              className={`w-full h-12 px-3.5 text-sm border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                                errors.phone ? "border-destructive" : "border-border"
                              }`}
                            />
                            {errors.phone && (
                              <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Group 2: Property & Locality */}
                      <div className="pt-4 border-t border-border/60">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                          2. Property Details
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-foreground mb-1.5">
                              Property Locality <span className="text-destructive">*</span>
                            </label>
                            <select
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              className="w-full h-12 px-3.5 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            >
                              <option value="Ambernath East">Ambernath (East)</option>
                              <option value="Ambernath West">Ambernath (West)</option>
                              <option value="Badlapur East">Badlapur (East)</option>
                              <option value="Badlapur West">Badlapur (West)</option>
                              <option value="Ulhasnagar">Ulhasnagar</option>
                              <option value="Kalyan">Kalyan</option>
                              <option value="Dombivli">Dombivli</option>
                              <option value="Titwala">Titwala</option>
                              <option value="Other MMR Location">Other MMR Location</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-foreground mb-1.5">
                              Approx Property Cost (Optional)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. ₹45 Lakh"
                              value={propertyValue}
                              onChange={(e) => setPropertyValue(e.target.value)}
                              className="w-full h-12 px-3.5 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Group 3: Loan Requirements */}
                      <div className="pt-4 border-t border-border/60">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                          3. Loan Requirements
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-foreground mb-1.5">
                              Desired Loan Amount (Optional)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. ₹35 Lakh"
                              value={desiredLoan}
                              onChange={(e) => setDesiredLoan(e.target.value)}
                              className="w-full h-12 px-3.5 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-foreground mb-1.5">
                              Employment Category <span className="text-destructive">*</span>
                            </label>
                            <select
                              value={employmentType}
                              onChange={(e) => setEmploymentType(e.target.value)}
                              className="w-full h-12 px-3.5 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            >
                              <option value="Salaried">Salaried (Private / MNC / Govt)</option>
                              <option value="Self-Employed Professional">Self-Employed Professional (Doctor, CA, Architect)</option>
                              <option value="Business Owner">Business Owner / Partner / Director</option>
                              <option value="NRI Borrower">Non-Resident Indian (NRI)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Group 4: Additional Specifics (Optional) */}
                      <div className="pt-4 border-t border-border/60">
                        <label className="block text-xs font-semibold text-foreground mb-1.5">
                          Questions or Special Scenarios (Optional)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="e.g. Co-applicant query, balance transfer from existing bank, or self-employed turnover scenario..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none leading-relaxed"
                        />
                      </div>

                      {/* Submit Action */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-xs disabled:opacity-70"
                        >
                          <Lock className="h-4 w-4 opacity-80" />
                          <span>{isSubmitting ? "Submitting Request..." : "Get Free Loan Guidance"}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>

                        <p className="text-xs text-muted-foreground text-center pt-3">
                          🔒 Confidential inquiry. We do not sell or share contact numbers with third parties.
                        </p>
                      </div>

                    </form>
                  </>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 8. Frequently Asked Questions: Clean Reading Container ── */}
      <section className="py-20 sm:py-28 lg:py-32 border-b border-border/80">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          
          <div className="text-center mb-16 sm:mb-20">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">
              Common Questions
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight leading-tight mb-4">
              Frequently Asked Questions.
            </h2>
            <p className="text-base text-muted-foreground">
              Clear, transparent answers to practical home loan questions for property buyers in Ambernath and the MMR.
            </p>
          </div>

          {/* Accessible Accordion Component */}
          <div className="divide-y divide-border/80 border-y border-border/80">
            {loanFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div key={faq.q} className="py-7">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left font-bold text-lg sm:text-xl text-foreground hover:text-primary transition-colors focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pt-3.5 pb-1 text-base text-muted-foreground leading-relaxed pr-6 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-12 text-center text-sm text-muted-foreground">
            Have a specific scenario not answered here?{" "}
            <button
              type="button"
              onClick={handleDirectWhatsApp}
              className="text-primary font-semibold hover:underline"
            >
              Ask our advisory desk on WhatsApp &rarr;
            </button>
          </div>

        </div>
      </section>

      {/* ── 9. Final Advisory Section: Natural Conclusion ──────────── */}
      <section className="py-24 sm:py-32 bg-card">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-foreground tracking-tight leading-tight">
              Have Questions About Your Property Loan?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Whether you are deciding on your borrowing budget or ready to coordinate with banks, our advisory desk is available to assist property buyers across Ambernath and the Mumbai Metropolitan Region.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <a
                href="#loan-enquiry"
                onClick={scrollToEnquiry}
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-xs"
              >
                <span>Get Free Loan Guidance</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold transition-all shadow-xs"
              >
                <WhatsAppIcon className="h-4 w-4 fill-current shrink-0" />
                <span>WhatsApp Advisory Desk</span>
              </button>
            </div>

            {/* Direct Office & Telephone Details */}
            <div className="pt-8 mt-8 border-t border-border/70 flex flex-col items-center justify-center gap-3 text-xs sm:text-sm text-muted-foreground text-center">
              <a
                href="https://share.google/wXb6cKV7lpMgo9P4c"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-wrap items-center justify-center gap-2 max-w-full hover:text-primary transition-colors group"
                title="View Shree Balaji Enterprises on Google Maps"
              >
                <MapPin className="h-4 w-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
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
