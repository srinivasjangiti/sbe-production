"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, User, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/brand-logo"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { saveInquiry, nextInquiryId } from "@/lib/admin-store"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [propType, setPropType] = useState("")
  const [budget, setBudget] = useState("")
  const [location, setLocation] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return
    saveInquiry({
      id: nextInquiryId(),
      name,
      phone,
      email,
      interest: propType || "Property Requirement",
      message: `Budget: ${budget || "Not specified"} | Location: ${location || "Not specified"} | ${message}`.trim(),
      status: "new",
      date: new Date().toISOString(),
    })
    const msg = encodeURIComponent(
      `Hi, I want to register my property requirement.\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nProperty Type: ${propType || "Not specified"}\nBudget: ${budget || "Not specified"}\nPreferred Location: ${location}\nMessage: ${message}`
    )
    window.open(`https://wa.me/917767805544?text=${msg}`, "_blank")
    setSubmitted(true)
  }

  return (
    <>
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" aria-label="Shree Balaji Enterprises Home" className="flex items-center gap-0.5 text-xl font-bold tracking-tight">
              <BrandLogo className="h-9 w-auto aspect-[820/528] -ml-1.5" />
              <span className="text-[20px] font-bold leading-none tracking-tight">
                <span className="text-amber-500">Shree </span><span className="text-primary">Balaji</span><span className="text-foreground"> Enterprises</span>
              </span>
            </Link>
          </div>

          {/* Card */}
          <div className="bg-card border border-border rounded-xl p-8">
            {submitted ? (
              <div className="text-center py-4">
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mx-auto mb-4">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current text-primary" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <h2 className="text-lg font-bold text-foreground mb-2">Requirement Sent!</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Your requirement has been sent via WhatsApp. Our team will reach out to you with matching properties.
                </p>
                <Link href="/">
                  <Button variant="outline" className="w-full">Back to Home</Button>
                </Link>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-foreground text-center mb-1">Register Your Requirement</h1>
                <p className="text-sm text-muted-foreground text-center mb-6">Tell us what you are looking for and we will find the best match</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="su-name" className="block text-sm font-semibold text-foreground mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input id="su-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" required className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="su-phone" className="block text-sm font-semibold text-foreground mb-1.5">Mobile Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input id="su-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your mobile number" required className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="su-email" className="block text-sm font-semibold text-foreground mb-1.5">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input id="su-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="su-type" className="block text-sm font-semibold text-foreground mb-1.5">Property Type</label>
                    <select id="su-type" value={propType} onChange={(e) => setPropType(e.target.value)} className="w-full px-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option value="">Select property type</option>
                      <option>Residential – Flat / Apartment</option>
                      <option>Residential – Bungalow / Villa</option>
                      <option>Residential Plot</option>
                      <option>Commercial Office Space</option>
                      <option>Commercial Shop</option>
                      <option>Industrial / Warehouse</option>
                      <option>Agricultural Land</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="su-budget" className="block text-sm font-semibold text-foreground mb-1.5">Budget (₹)</label>
                    <input id="su-budget" type="text" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. 30 Lakhs – 60 Lakhs" className="w-full px-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>

                  <div>
                    <label htmlFor="su-loc" className="block text-sm font-semibold text-foreground mb-1.5">Preferred Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input id="su-loc" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Ambernath West, Badlapur..." className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="su-msg" className="block text-sm font-semibold text-foreground mb-1.5">Additional Requirements</label>
                    <textarea id="su-msg" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Number of BHK, specific amenities, timeline..." rows={3} className="w-full px-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none" />
                  </div>

                  <Button type="submit" className="w-full py-3 h-auto text-sm font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xs">
                    <WhatsAppIcon className="h-4 w-4 mr-2 fill-current" />
                    Send Requirement via WhatsApp
                  </Button>
                </form>
              </>
            )}
          </div>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Just need a quick callback?{" "}
            <Link href="/sign-in" className="font-semibold text-primary hover:underline">
              Request here
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
