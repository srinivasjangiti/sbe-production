"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { useTrendingProperties } from "@/hooks/use-properties"
import { Button } from "@/components/ui/button"
import type { PropertyData } from "@/lib/data"

const DECK_DEPTH = 3
const LAYER_OFFSET = 10
const LAYER_SCALE = 0.03
const ANIM_MS = 480

// ---------------------------------------------------------------------------
// Placeholder skeleton shown in background deck layers
// ---------------------------------------------------------------------------
function PlaceholderCard() {
  return (
    <div className="flex flex-col md:flex-row h-full w-full rounded-xl border border-border bg-muted/40 overflow-hidden">
      <div className="h-44 w-full md:h-full md:w-[45%] md:shrink-0 bg-muted animate-pulse" />
      <div className="flex-1 p-4 md:p-6 flex flex-col gap-3">
        <div className="h-5 w-28 bg-muted rounded animate-pulse" />
        <div className="h-4 w-44 bg-muted rounded animate-pulse mt-1" />
        <div className="h-3 w-32 bg-muted rounded animate-pulse" />
        <div className="flex-1" />
        <div className="flex gap-2 mt-2">
          <div className="flex-1 h-9 bg-muted rounded-lg animate-pulse" />
          <div className="flex-1 h-9 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Single property card content
// ---------------------------------------------------------------------------
function PropertyCard({ prop }: { prop: PropertyData }) {
  return (
    <div className="flex flex-col md:flex-row h-full w-full rounded-xl border border-border shadow-md bg-card overflow-hidden">
      <div className="relative h-44 w-full md:h-full md:w-[45%] md:shrink-0">
        <Image
          src={prop.image}
          alt={prop.address}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 576px"
          draggable={false}
        />
        {prop.tag && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-md">
            {prop.tag}
          </span>
        )}
      </div>
      <div className="flex-1 p-4 md:p-6 flex flex-col justify-between min-w-0">
        <div>
          <p className="text-xl font-black text-primary mb-1 truncate">{prop.price}</p>
          <p className="text-sm font-semibold text-foreground truncate">{prop.address}</p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1 mb-3">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {prop.city}
          </p>
          {prop.description && (
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-3">
              {prop.description}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-border/50">
          <Link
            href={`/buy/${prop.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all shadow-sm"
          >
            <span>Explore Property</span>
          </Link>
          <a
            href={`https://wa.me/917767805544?text=${encodeURIComponent(
              `Hi, I am interested in the property at ${prop.address}, ${prop.city} priced at ${prop.price}. Please share more details.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white active:scale-95 transition-all shadow-xs flex items-center justify-center shrink-0"
            title="Chat on WhatsApp"
          >
            <WhatsAppIcon className="h-4 w-4 fill-current" />
          </a>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component — two-card crossfade, no phase state machine
// ---------------------------------------------------------------------------
export function TrendingHomes() {
  const trendingProps = useTrendingProperties()
  const total = trendingProps.length
  const [current, setCurrent] = useState(0)
  const [exiting, setExiting] = useState<{ index: number; dir: "left" | "right" } | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  if (total === 0) return null

  const navigate = (dir: "left" | "right") => {
    if (exiting) return
    const next = dir === "left" ? (current + 1) % total : (current - 1 + total) % total
    setExiting({ index: current, dir })
    setCurrent(next)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setExiting(null), ANIM_MS + 50)
  }

  const topProp = trendingProps[current]

  // Background deck layers (depth 1, 2…) — always the cards after current
  const bgLayers = Array.from({ length: DECK_DEPTH - 1 }, (_, i) => {
    const depth = i + 1
    const idx = (current + depth) % total
    const offsetPx = depth * LAYER_OFFSET
    const scale = 1 - depth * LAYER_SCALE
    return { depth, prop: trendingProps[idx], offsetPx, scale }
  })

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-3">New Listings</p>
            <h2 className="text-2xl md:text-4xl font-black text-foreground">Trending Properties</h2>
            <p className="text-sm text-muted-foreground mt-1.5">Our latest listings in {topProp.city}</p>
          </div>
          {total > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("right")}
                disabled={!!exiting}
                className="p-2 rounded-full border border-border hover:bg-muted transition-colors disabled:opacity-40"
                aria-label="Previous property"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              <span className="text-sm text-muted-foreground select-none w-12 text-center">
                {current + 1}&nbsp;/&nbsp;{total}
              </span>
              <button
                onClick={() => navigate("left")}
                disabled={!!exiting}
                className="p-2 rounded-full border border-border hover:bg-muted transition-colors disabled:opacity-40"
                aria-label="Next property"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
            </div>
          )}
        </div>

        {/* Deck */}
        <div
          className="relative overflow-visible h-[480px] md:h-[320px]"
        >
          {/* Background ghost layers */}
          {[...bgLayers].reverse().map(({ depth, prop, offsetPx, scale }) => (
            <div
              key={`bg-${depth}`}
              className="absolute inset-0"
              style={{
                transform: `translateY(${offsetPx}px) translateX(${offsetPx}px) scale(${scale})`,
                opacity: 1 - depth * 0.2,
                zIndex: DECK_DEPTH - depth,
              }}
            >
              <PropertyCard prop={prop} />
            </div>
          ))}

          {/* Outgoing card (animates out) */}
          {exiting && (
            <div
              key={`exit-${exiting.index}`}
              className={`absolute inset-0 ${exiting.dir === "left" ? "card-exit-left" : "card-exit-right"}`}
              style={{ zIndex: DECK_DEPTH + 1 }}
            >
              <PropertyCard prop={trendingProps[exiting.index]} />
            </div>
          )}

          {/* Incoming card (animates in) */}
          <div
            key={`enter-${current}`}
            className={`absolute inset-0 ${exiting ? (exiting.dir === "left" ? "card-enter-right" : "card-enter-left") : ""}`}
            style={{ zIndex: DECK_DEPTH }}
          >
            <PropertyCard prop={topProp} />
          </div>
        </div>

      </div>
    </section>
  )
}

