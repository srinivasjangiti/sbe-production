"use client"

import { motion } from "motion/react"
import { WhatsAppIcon } from "@/components/whatsapp-icon"

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/917767805544?text=Hello%20Shree%20Balaji%20Enterprises%2C%20I%20wish%20to%20inquire%20regarding%20property%20advisory."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.85, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-xl shadow-[#25D366]/25 transition-all duration-200 px-4 py-2.5 border border-white/20 group"
      aria-label="Direct Client Advisory on WhatsApp"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
      </span>
      <WhatsAppIcon className="h-4.5 w-4.5 fill-current shrink-0 group-hover:scale-110 transition-transform" />
      <span className="text-xs font-bold tracking-wide whitespace-nowrap">
        Chat on WhatsApp
      </span>
    </motion.a>
  )
}
