import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { WhatsAppIcon } from "@/components/whatsapp-icon"

const footerSections = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Browse Properties", href: "/buy" },
      { label: "Rent Properties", href: "/rent" },
      { label: "Sell Your Property", href: "/sell" },
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Home Loans", href: "/home-loans" },
      { label: "Areas We Serve", href: "/locations" },
      { label: "Research Paper", href: "/research-paper" },
      { label: "RERA Information", href: "/about" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Ambernath (HQ)", href: "/locations#ambernath" },
      { label: "Badlapur", href: "/locations#badlapur" },
      { label: "Ulhasnagar", href: "/locations#ulhasnagar" },
      { label: "Kalyan & Dombivli", href: "/locations#kalyan" },
      { label: "Thane & Mumbai", href: "/locations#thane" },
      { label: "All Serviced Areas", href: "/locations" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-card mt-auto">
      <div className="mx-auto max-w-[1440px] px-4 py-12 md:py-16">
        {/* Footer links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold mb-4">{section.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-card/70 hover:text-card transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold mb-4">Contact</h3>
            <div className="flex flex-col divide-y divide-card/10">
              {[
                { href: "tel:7767805544", icon: Phone, label: "+91 7767805544", iconColor: "text-primary" },
                { href: "mailto:shreebalajienterprisesamb@gmail.com", icon: Mail, label: "Email Us", iconColor: "text-primary" },
                { href: "https://wa.me/917767805544", icon: WhatsAppIcon, label: "WhatsApp", external: true, iconColor: "text-[#25D366]" },
                { href: "https://share.google/wXb6cKV7lpMgo9P4c", icon: MapPin, label: "Get Directions", external: true, iconColor: "text-primary" },
              ].map(({ href, icon: Icon, label, external, iconColor }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-2.5 py-2.5 text-xs text-card/60 hover:text-card transition-colors group"
                >
                  <Icon className={`h-3.5 w-3.5 ${iconColor || "text-primary"} shrink-0`} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-card/20 pt-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-0.5" aria-label="Shree Balaji Enterprises">
              <BrandLogo className="h-9 w-auto aspect-[820/528] -ml-1.5" />
              <span className="text-[19px] sm:text-[20px] font-bold text-card leading-none tracking-tight whitespace-nowrap">
                <span className="text-amber-500">Shree</span> <span className="text-primary">Balaji</span> Enterprises
              </span>
            </Link>

            {/* Legal links & bottom contact button */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
              <Link href="/privacy" className="text-card/60 hover:text-card transition-colors">
                Privacy Policy
              </Link>
              <span className="text-card/30">&bull;</span>
              <Link href="/terms" className="text-card/60 hover:text-card transition-colors">
                Terms &amp; Conditions
              </Link>
              <span className="text-card/30">&bull;</span>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-card/25 bg-card/10 text-card hover:bg-card hover:text-foreground font-semibold transition-all shadow-xs"
              >
                <Phone className="h-3 w-3 text-primary" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-xs text-card/50 mt-6 leading-relaxed max-w-3xl">
            Shree Balaji Enterprises is a RERA registered real estate agency based in Ambernath, Maharashtra. We are committed to helping you buy, sell, and rent residential, commercial &amp; industrial properties across the Mumbai Metropolitan Region with complete transparency and legal compliance.
            RERA Reg No: A51700023633
          </p>
          <p className="text-xs text-card/40 mt-4">
            &copy; 2026 Shree Balaji Enterprises. All Rights Reserved. &bull;{" "}
            <a
              href="https://share.google/wXb6cKV7lpMgo9P4c"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-card underline-offset-2 hover:underline transition-colors"
            >
              Shop No. 6, Vallabh Bldg, Avdhoot Residency, Chikhloli, Ambernath-West, 421505
            </a>
          </p>
          <div className="mt-6 border-t border-card/10 pt-5 flex flex-col items-center gap-1 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-card/30 font-medium">Designed &amp; Developed by</p>
            <p className="text-base font-bold text-card/80 tracking-wide">
              <a href="mailto:srinivasajangiti@gmail.com" className="hover:text-primary transition-colors">Srinivas Jangiti</a>
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a href="tel:+918767505121" className="text-xs text-card/50 hover:text-primary transition-colors font-medium">+91 8767505121</a>
              <span className="w-1 h-1 rounded-full bg-card/20 inline-block" />
              <a href="mailto:srinivasajangiti@gmail.com" className="text-xs text-card/50 hover:text-primary transition-colors font-medium">srinivasajangiti@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
