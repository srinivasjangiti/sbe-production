"use client"

import Link from "next/link"
import { Home, Building2, Trees, Building, Warehouse, TentTree } from "lucide-react"
import { InView } from "@/components/core/in-view"
import { AnimatedGroup } from "@/components/core/animated-group"

const homeTypes = [
  { icon: Home, label: "Residential", count: "Flats, Bungalows, Villas", href: "/buy?q=Residential" },
  { icon: Building2, label: "Apartments", count: "1/2/3 BHK Flats", href: "/buy?q=Apartment" },
  { icon: Building, label: "Commercial", count: "Shops, Offices, Showrooms", href: "/buy?q=Commercial" },
  { icon: Warehouse, label: "Industrial", count: "Warehouses, Godowns", href: "/buy?q=Industrial" },
  { icon: Trees, label: "Row Houses", count: "Villas & Row Houses", href: "/buy?q=Row+House" },
  { icon: TentTree, label: "Plots & Land", count: "Residential & Commercial", href: "/buy?q=Plot" },
]

export function ExploreTypes() {
  return (
    <section className="py-14 md:py-20 bg-muted/40">
      <div className="mx-auto max-w-[1440px] px-4">
        <InView
          once
          viewOptions={{ margin: "0px 0px -40px 0px" }}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-4">Browse by Type</p>
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-3">
            Property Types We Deal In
          </h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-lg">
            Residential, Commercial &amp; Industrial properties across Mumbai Metropolitan Region
          </p>
        </InView>

        <InView once viewOptions={{ margin: "0px 0px -60px 0px" }}>
          <AnimatedGroup
            preset="blur-slide"
            className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
          >
            {homeTypes.map((type) => (
              <Link
                key={type.label}
                href={type.href}
                className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 bg-card rounded-2xl border border-border/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-primary/40 hover:shadow-[0_12px_24px_rgba(0,0,0,0.07)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 group"
              >
                <type.icon className="h-7 w-7 md:h-8 md:w-8 text-primary group-hover:scale-110 transition-transform" />
                <div className="text-center">
                  <p className="text-xs md:text-sm font-semibold text-foreground">{type.label}</p>
                  <p className="hidden sm:block text-xs text-muted-foreground mt-0.5">{type.count}</p>
                </div>
              </Link>
            ))}
          </AnimatedGroup>
        </InView>
      </div>
    </section>
  )
}
