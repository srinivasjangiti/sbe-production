"use client"

import { TrendingUp, Shield, Users, Calculator } from "lucide-react"
import { InView } from "@/components/core/in-view"
import { AnimatedGroup } from "@/components/core/animated-group"

const features = [
  {
    icon: Shield,
    title: "RERA Registered",
    description: "Reg No: A51700023633. Complete transparency and legal compliance guaranteed in every transaction.",
  },
  {
    icon: Users,
    title: "1000+ Happy Clients",
    description: "Trusted by families across the Mumbai Metropolitan Region for their property needs.",
  },
  {
    icon: TrendingUp,
    title: "15+ Years Experience",
    description: "Deep local market knowledge ensuring you get the best deals on residential, commercial and industrial properties (Established 2016).",
  },
  {
    icon: Calculator,
    title: "Home Loan Assistance",
    description: "Partnerships with leading banks to get you the lowest interest rates and fast approvals.",
  },
]

export function ValueProposition() {
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
          <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-4">Why Choose Us</p>
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-3">
            Your Trusted Real Estate Partner
          </h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-lg text-pretty">
            Shree Balaji Enterprises – RERA registered agency serving Mumbai Metropolitan Region for 15+ years (Established 2016)
          </p>
        </InView>

        <InView once viewOptions={{ margin: "0px 0px -50px 0px" }}>
          <AnimatedGroup
            preset="scale"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-3 p-6 rounded-2xl border border-border/80 bg-card shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-black text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </AnimatedGroup>
        </InView>
      </div>
    </section>
  )
}
