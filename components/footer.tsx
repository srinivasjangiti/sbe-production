import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
)

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
                { href: "tel:7767805544", icon: Phone, label: "+91 7767805544" },
                { href: "mailto:shreebalajienterprisesamb@gmail.com", icon: Mail, label: "Email Us" },
                { href: "https://wa.me/917767805544", icon: WhatsAppIcon, label: "WhatsApp", external: true },
                { href: "https://maps.app.goo.gl/xESVmiEK2GtM3XBDA", icon: MapPin, label: "Get Directions", external: true },
              ].map(({ href, icon: Icon, label, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-2.5 py-2.5 text-xs text-card/60 hover:text-card transition-colors group"
                >
                  <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
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
            &copy; 2026 Shree Balaji Enterprises. All Rights Reserved. &bull; Shop No. 6, Vallabh Bldg, Avdhoot Residency, Ambernath-West, 421505
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
