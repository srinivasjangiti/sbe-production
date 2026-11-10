"use client"

import { Star, Quote } from "lucide-react"
import { InView } from "@/components/core/in-view"
import { AnimatedGroup } from "@/components/core/animated-group"

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Ambernath",
    rating: 5,
    text: "Shree Balaji Enterprises helped us find our dream home in Ambernath within our budget. Anju ji's expertise and patience made the entire process completely stress-free. We couldn't be happier!",
    type: "Bought Residential Property",
    initial: "R",
  },
  {
    name: "Priya Sharma",
    location: "Badlapur",
    rating: 5,
    text: "We were searching for a plot in Badlapur for over a year with no luck. After connecting with Shree Balaji Enterprises, we found the perfect property within a week. Transparent dealings and zero hidden charges.",
    type: "Purchased Plot",
    initial: "P",
  },
  {
    name: "Amit Mehta",
    location: "Ulhasnagar",
    rating: 5,
    text: "Sold my commercial property through Shree Balaji Enterprises at a great price. Complete documentation support throughout and the process from listing to registration was incredibly smooth.",
    type: "Sold Commercial Property",
    initial: "A",
  },
]

export function Testimonials() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4">
        <InView
          once
          viewOptions={{ margin: "0px 0px -40px 0px" }}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-4">Client Stories</p>
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-3">
            What Our Clients Say
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            Over 1000 happy families across Mumbai Metropolitan Region trust Shree Balaji Enterprises
          </p>
        </InView>

        <InView once viewOptions={{ margin: "0px 0px -50px 0px" }}>
          <AnimatedGroup
            preset="slide"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-card border border-border/80 rounded-2xl p-6 flex flex-col gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="h-6 w-6 text-primary/20 absolute -top-1 -left-1" aria-hidden="true" />
                  <p className="text-sm text-foreground leading-relaxed pl-4 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                {/* Person */}
                <div className="flex items-center gap-3 mt-auto pt-2 border-t border-border">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.type} · {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </AnimatedGroup>
        </InView>
      </div>
    </section>
  )
}
