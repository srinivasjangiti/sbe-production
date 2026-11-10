"use client"

import React, { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Phone, Mail, MapPin, Check, Copy, ExternalLink, Send } from "lucide-react"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { saveInquiry, nextInquiryId } from "@/lib/admin-store"

const enquiryCategories = [
  { id: "residential", label: "Buy Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "disposition", label: "Sell Property" },
  { id: "tenancy", label: "Rent / Lease" },
  { id: "mortgage", label: "Home Loan" },
  { id: "inspection", label: "Site Visit" },
]

function ContactForm() {
  const searchParams = useSearchParams()
  const initialProp = searchParams.get("property") || searchParams.get("ref") || ""
  const initialType = searchParams.get("type") || ""

  const [category, setCategory] = useState("residential")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [specifications, setSpecifications] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState(false)

  useEffect(() => {
    if (initialType) {
      const match = enquiryCategories.find(
        (c) =>
          c.label.toLowerCase().includes(initialType.toLowerCase()) ||
          c.id === initialType.toLowerCase()
      )
      if (match) setCategory(match.id)
    }
    if (initialProp) {
      setSpecifications(`Enquiry regarding property: ${initialProp}`)
    }
  }, [initialProp, initialType])

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      "Shop No. 6, Vallabh Building, Avdhoot Residency, Near Sarvodaya Nagar, Chikhloli, Ambernath (West), Maharashtra 421505"
    )
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2500)
  }

  const handleSubmit = (e: React.FormEvent, viaWhatsApp = false) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return

    setIsSubmitting(true)
    const selectedCategory =
      enquiryCategories.find((c) => c.id === category)?.label || "General Enquiry"

    saveInquiry({
      id: nextInquiryId(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      interest: selectedCategory,
      message: specifications.trim() || "General enquiry.",
      status: "new",
      date: new Date().toISOString(),
    })

    if (viaWhatsApp) {
      const text = encodeURIComponent(
        `Hi Shree Balaji Enterprises,\n\nName: ${name.trim()}\nPhone: ${phone.trim()}${email ? `\nEmail: ${email.trim()}` : ""}\nInterest: ${selectedCategory}\nMessage: ${specifications.trim() || "Interested in your properties."}`
      )
      window.open(`https://wa.me/917767805544?text=${text}`, "_blank")
    }

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 300)
  }

  const handleReset = () => {
    setName("")
    setPhone("")
    setEmail("")
    setSpecifications("")
    setIsSubmitted(false)
  }

  return (
    <main className="min-h-screen bg-background text-foreground py-6 sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* ── Compact Introduction ─────────────────────────────────── */}
        <div className="mb-6 sm:mb-7">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Contact Us
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Have questions or need assistance? Reach out to our team in Ambernath or send us an enquiry below.
          </p>
        </div>

        {/* ── Clean Two-Column Layout ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Contact Details (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
            <h2 className="text-lg font-bold text-foreground">Get in Touch</h2>

            {/* Contact Details List */}
            <div className="space-y-4 text-sm">
              {/* Phone Numbers */}
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary mt-0.5">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <a href="tel:+917767805544" className="font-semibold text-foreground hover:text-primary transition-colors block">
                    +91 7767805544
                  </a>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary mt-0.5">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <a
                    href="mailto:shreebalajienterprisesamb@gmail.com"
                    className="font-semibold text-foreground hover:text-primary transition-colors block break-all"
                  >
                    shreebalajienterprisesamb@gmail.com
                  </a>
                </div>
              </div>

              {/* Full Office Address */}
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-foreground leading-relaxed">
                    Shop No. 6, Vallabh Building, Avdhoot Residency, Near Sarvodaya Nagar, Chikhloli, Ambernath (West), Maharashtra &ndash; 421505
                  </p>
                  
                  {/* Copy Address & Directions Actions */}
                  <div className="mt-2.5 flex flex-wrap gap-2 text-xs">
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="h-8 px-3 rounded-lg border border-border bg-background hover:bg-muted font-medium text-foreground inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                    <a
                      href="https://share.google/wXb6cKV7lpMgo9P4c"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 px-3 rounded-lg border border-border bg-background hover:bg-muted font-medium text-foreground inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Directions</span>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Action */}
            <a
              href="https://wa.me/917767805544?text=Hi%20Shree%20Balaji%20Enterprises%2C%20I%20would%20like%20to%20enquire%20about%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-10 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <WhatsAppIcon className="h-4 w-4 fill-current shrink-0" />
              <span>Chat on WhatsApp</span>
            </a>

            {/* Compact Map Preview */}
            <div className="rounded-xl border border-border overflow-hidden h-36 bg-muted relative group">
              <iframe
                src="https://maps.google.com/maps?q=19.1895593,73.2230161&z=17&output=embed"
                width="100%"
                height="100%"
                className="border-0 w-full h-full"
                allowFullScreen
                loading="lazy"
                title="Office Location Map"
              />
              <a
                href="https://share.google/wXb6cKV7lpMgo9P4c"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-background/90 backdrop-blur-sm border border-border/80 text-[11px] font-semibold text-foreground hover:text-primary shadow-xs transition-colors inline-flex items-center gap-1"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Discreet MahaRERA notice */}
            <p className="text-xs text-muted-foreground pt-0.5">
              MahaRERA Reg: <span className="font-semibold text-foreground font-mono">A51700023633</span>
            </p>
          </div>

          {/* Right Column: Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-foreground">Send an Enquiry</h2>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Thank You, {name}!
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                  Your enquiry has been received. Our team will contact you shortly on{" "}
                  <strong className="text-foreground">{phone}</strong>.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="h-8 px-3 border border-border rounded-lg hover:bg-muted font-medium text-foreground transition-colors cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                  <Link
                    href="/buy"
                    className="h-8 px-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium inline-flex items-center transition-colors"
                  >
                    Browse Properties &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
                
                {/* Interest Selection */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                    I am interested in
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {enquiryCategories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCategory(c.id)}
                        className={`h-9 px-2.5 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer flex items-center justify-center ${
                          category === c.id
                            ? "border-primary bg-primary text-primary-foreground shadow-xs"
                            : "border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Phone Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="contact-name" className="text-xs font-medium text-foreground block mb-1">
                      Your Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Sharma"
                      className="h-10 w-full px-3 border border-border rounded-lg bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="text-xs font-medium text-foreground block mb-1">
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-xs font-medium text-muted-foreground pointer-events-none">
                        +91
                      </span>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9876543210"
                        className="h-10 w-full pl-10 pr-3 border border-border rounded-lg bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="contact-email" className="text-xs font-medium text-foreground block mb-1">
                    Email Address <span className="text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-10 w-full px-3 border border-border rounded-lg bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                {/* Message / Requirements */}
                <div>
                  <label htmlFor="contact-message" className="text-xs font-medium text-foreground block mb-1">
                    Message / Requirements <span className="text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={specifications}
                    onChange={(e) => setSpecifications(e.target.value)}
                    placeholder="Tell us what you're looking for (e.g., 2 BHK in Ambernath-East, budget ₹45 Lakhs)..."
                    className="w-full p-3 border border-border rounded-lg bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none min-h-[80px]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-10 px-5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all shadow-xs inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? "Sending..." : "Submit Enquiry"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, true)}
                    className="h-10 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg text-sm font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <WhatsAppIcon className="h-4 w-4 fill-current shrink-0" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </main>
  )
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
          Loading contact page...
        </div>
      }
    >
      <ContactForm />
    </Suspense>
  )
}
