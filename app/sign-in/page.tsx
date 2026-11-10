"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, User, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/brand-logo"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { saveInquiry, nextInquiryId } from "@/lib/admin-store"

export default function SignInPage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [time, setTime] = useState("")
  const [interest, setInterest] = useState("Buy")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return
    saveInquiry({
      id: nextInquiryId(),
      name,
      phone,
      email: "",
      interest: `Callback Request – ${interest}`,
      message: `Best time to call: ${time || "Anytime"}`,
      status: "new",
      date: new Date().toISOString(),
    })
    const msg = encodeURIComponent(`Hi, I would like to request a callback.\nName: ${name}\nPhone: ${phone}\nBest time to call: ${time || "Anytime"}\nInterested in: ${interest}`)
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
                <h2 className="text-lg font-bold text-foreground mb-2">WhatsApp Opened!</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Your details have been pre-filled in WhatsApp. Just send the message and our team will call you back within a few hours.
                </p>
                <Link href="/">
                  <Button variant="outline" className="w-full">Back to Home</Button>
                </Link>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-foreground text-center mb-1">Request a Callback</h1>
                <p className="text-sm text-muted-foreground text-center mb-8">Share your details and we will call you back</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="cb-name" className="block text-sm font-semibold text-foreground mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        id="cb-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        required
                        className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cb-phone" className="block text-sm font-semibold text-foreground mb-1.5">Mobile Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        id="cb-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your mobile number"
                        required
                        className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cb-time" className="block text-sm font-semibold text-foreground mb-1.5">Best Time to Call</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <select
                        id="cb-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                      >
                        <option value="">Any time</option>
                        <option>Morning (9AM – 12PM)</option>
                        <option>Afternoon (12PM – 4PM)</option>
                        <option>Evening (4PM – 7PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">I am interested in</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Buy", "Sell", "Rent"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setInterest(opt)}
                          className={`py-2.5 text-sm font-semibold rounded-md border transition-colors ${interest === opt ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary"}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full py-3 h-auto text-sm font-semibold mt-2 bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xs">
                    <WhatsAppIcon className="h-4 w-4 mr-2 fill-current" />
                    Request Callback via WhatsApp
                  </Button>
                </form>
              </>
            )}
          </div>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Want to register your property requirements?{" "}
            <Link href="/sign-up" className="font-semibold text-primary hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
