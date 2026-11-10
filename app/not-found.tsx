"use client"

import Link from "next/link"
import { Home, ArrowLeft, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/whatsapp-icon"

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
      {/* Large 404 */}
      <p className="text-[120px] md:text-[160px] font-black text-primary/10 leading-none select-none mb-2">
        404
      </p>

      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
        Page Not Found
      </h1>
      <p className="text-muted-foreground text-sm md:text-base max-w-md mb-8 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Try browsing our properties or
        getting in touch with us directly.
      </p>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        <Link href="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        </Link>
        <Link href="/buy">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Browse Properties
          </Button>
        </Link>
      </div>

      {/* Quick contact */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href="https://wa.me/917767805544"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-colors hover:opacity-90 bg-[#25D366]"
        >
          <WhatsAppIcon className="h-4 w-4 fill-current" />
          WhatsApp Us
        </a>
        <a
          href="tel:7767805544"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-border text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
        >
          <Phone className="h-4 w-4" />
          7767805544
        </a>
      </div>
    </main>
  )
}
