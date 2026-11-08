"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Plus, Minus, Maximize2, Building, Home, CheckCircle2 } from "lucide-react"
import type { PropertyData } from "@/lib/data"

export function MapView({ properties }: { properties: PropertyData[] }) {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null)

  return (
    <div className="relative w-full h-full bg-[#f4f7f9] dark:bg-[#1a1f26] overflow-hidden select-none">
      {/* Map background with architectural grid pattern */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="sbe-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border/40" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sbe-grid)" />
        {/* Highway lines connecting Ambernath, Badlapur, Kalyan */}
        <path d="M 0 180 Q 200 240 400 210 T 800 260" fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" className="dark:stroke-slate-800" />
        <path d="M 0 180 Q 200 240 400 210 T 800 260" fill="none" stroke="#fde047" strokeWidth="3" strokeDasharray="8 8" className="opacity-70" />
        
        {/* Secondary transit corridor */}
        <path d="M 120 0 Q 180 200 260 400 T 320 800" fill="none" stroke="#e2e8f0" strokeWidth="8" className="dark:stroke-slate-800" />
        <path d="M 120 0 Q 180 200 260 400 T 320 800" fill="none" stroke="#94a3b8" strokeWidth="1.5" className="opacity-40" />

        {/* Green reserve parks */}
        <rect x="28%" y="15%" width="16%" height="12%" fill="#86efac" rx="16" opacity="0.35" />
        <rect x="62%" y="45%" width="18%" height="14%" fill="#86efac" rx="20" opacity="0.35" />
        <rect x="10%" y="60%" width="14%" height="16%" fill="#86efac" rx="18" opacity="0.35" />

        {/* Locality labels */}
        <text x="18%" y="24%" className="text-[12px] font-black fill-muted-foreground/60 tracking-widest uppercase">Ambernath West</text>
        <text x="32%" y="42%" className="text-[12px] font-black fill-muted-foreground/60 tracking-widest uppercase">Ambernath East</text>
        <text x="65%" y="30%" className="text-[12px] font-black fill-muted-foreground/60 tracking-widest uppercase">Badlapur MIDC</text>
        <text x="14%" y="72%" className="text-[12px] font-black fill-muted-foreground/60 tracking-widest uppercase">Dombivli East</text>
      </svg>

      {/* Property pins positioned across the map */}
      {properties.map((property, index) => {
        const positions = [
          { left: "24%", top: "28%" },
          { left: "36%", top: "38%" },
          { left: "42%", top: "25%" },
          { left: "28%", top: "45%" },
          { left: "32%", top: "52%" },
          { left: "68%", top: "34%" },
          { left: "74%", top: "42%" },
          { left: "18%", top: "68%" },
          { left: "22%", top: "78%" },
          { left: "48%", top: "40%" },
          { left: "55%", top: "30%" },
          { left: "30%", top: "62%" },
          { left: "64%", top: "50%" },
        ]
        const pos = positions[index % positions.length]
        const isHovered = hoveredPin === property.id

        return (
          <div
            key={property.id}
            className={`absolute transform -translate-x-1/2 -translate-y-full transition-all ${
              isHovered ? "z-30 scale-110" : "z-10 hover:z-20 hover:scale-105"
            }`}
            style={{ left: pos.left, top: pos.top }}
            onMouseEnter={() => setHoveredPin(property.id)}
            onMouseLeave={() => setHoveredPin(null)}
          >
            <Link href={`/buy/${property.id}`} className="block">
              <div
                className={`px-3 py-1.5 rounded-full text-xs font-black shadow-lg transition-all border flex items-center gap-1.5 ${
                  isHovered
                    ? "bg-primary text-primary-foreground border-primary scale-105"
                    : "bg-card text-foreground border-border hover:border-primary/50"
                }`}
              >
                <span>{property.price}</span>
              </div>
            </Link>

            {/* Hover preview tooltip */}
            {isHovered && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-card rounded-xl shadow-2xl border border-border p-3 min-w-[220px] max-w-[260px] z-40 pointer-events-none">
                <p className="text-xs font-bold text-primary uppercase tracking-wider">{property.city}</p>
                <p className="text-sm font-extrabold text-foreground truncate mt-0.5">{property.address}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {property.beds > 0 ? `${property.beds} BHK · ` : ""}{property.type || "Property"}
                  {property.sqft !== "On Request" ? ` · ${property.sqft} sqft` : ""}
                </p>
                <p className="text-xs font-bold text-foreground mt-1.5">{property.price}</p>
              </div>
            )}
          </div>
        )
      })}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-20">
        <button className="p-2.5 bg-card/90 backdrop-blur-md rounded-xl shadow-md border border-border hover:bg-card text-foreground transition-all" aria-label="Zoom in">
          <Plus className="h-4 w-4" />
        </button>
        <button className="p-2.5 bg-card/90 backdrop-blur-md rounded-xl shadow-md border border-border hover:bg-card text-foreground transition-all" aria-label="Zoom out">
          <Minus className="h-4 w-4" />
        </button>
      </div>

      {/* Map Attribution Bar */}
      <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-border/70 text-[11px] font-medium text-muted-foreground flex items-center gap-1.5 shadow-sm z-20">
        <MapPin className="h-3 w-3 text-primary" />
        <span>MMR Verified Zone · Shree Balaji Enterprises</span>
      </div>
    </div>
  )
}
