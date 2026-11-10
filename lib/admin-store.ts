// Admin data store – persists additions/edits in localStorage
// On a static site this allows the admin to manage listings client-side.

import { buyProperties, rentalProperties, agents, PropertyData, AgentData } from "./data"

const BUY_KEY = "sbe_buy_properties"
const RENT_KEY = "sbe_rent_properties"
const AGENTS_KEY = "sbe_agents"
const INQUIRIES_KEY = "sbe_inquiries"
const SETTINGS_KEY = "sbe_settings"

// ─── helpers ──────────────────────────────────────────────────────────────
function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
function save<T>(key: string, data: T): void {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(data))
}

// ─── Properties ───────────────────────────────────────────────────────────
export function getBuyProperties(): PropertyData[] {
  const stored = load<PropertyData[]>(BUY_KEY, buyProperties)
  if (typeof window !== "undefined" && Array.isArray(stored)) {
    let changed = false
    const storedIds = new Set(stored.map((p) => p.id))
    const missing = buyProperties.filter((p) => !storedIds.has(p.id))
    let merged = missing.length > 0 ? [...stored, ...missing] : stored
    if (missing.length > 0) changed = true

    // Synchronize base property images if stale spreadsheet flyer is present in client localStorage
    merged = merged.map((p) => {
      if (
        p.id === 13 &&
        (p.image?.includes("whatsapp-image-2026-10-29-at-5.55.04-pm") ||
          p.images?.some((img) => img.includes("whatsapp-image-2026-10-29-at-5.55.04-pm")))
      ) {
        changed = true
        const fresh = buyProperties.find((b) => b.id === 13)
        return fresh ? { ...p, image: fresh.image, images: fresh.images } : p
      }
      return p
    })

    if (changed) {
      save(BUY_KEY, merged)
    }
    return merged
  }
  return stored
}
export function getRentProperties(): PropertyData[] {
  return load<PropertyData[]>(RENT_KEY, rentalProperties)
}
export function getAllProperties(): PropertyData[] {
  return [...getBuyProperties(), ...getRentProperties()]
}

export function saveProperty(p: PropertyData, type: "buy" | "rent"): void {
  const key = type === "buy" ? BUY_KEY : RENT_KEY
  const list = load<PropertyData[]>(key, type === "buy" ? buyProperties : rentalProperties)
  const idx = list.findIndex((x) => x.id === p.id)
  if (idx >= 0) {
    list[idx] = p
  } else {
    list.push(p)
  }
  save(key, list)
}

export function deleteProperty(id: number, type: "buy" | "rent"): void {
  const key = type === "buy" ? BUY_KEY : RENT_KEY
  const list = load<PropertyData[]>(key, type === "buy" ? buyProperties : rentalProperties)
  save(key, list.filter((x) => x.id !== id))
}

export function nextPropertyId(): number {
  const all = getAllProperties()
  return all.length > 0 ? Math.max(...all.map((p) => p.id)) + 1 : 1
}

export function getPropertyById(id: number): PropertyData | undefined {
  return getAllProperties().find((p) => p.id === id)
}

export function getPropertyType(id: number): "buy" | "rent" | undefined {
  if (getBuyProperties().some((p) => p.id === id)) return "buy"
  if (getRentProperties().some((p) => p.id === id)) return "rent"
  return undefined
}

export function getSimilarProperties(id: number, type: "buy" | "rent", count = 4): PropertyData[] {
  const list = type === "buy" ? getBuyProperties() : getRentProperties()
  return list.filter((p) => p.id !== id).slice(0, count)
}

// ─── Agents ───────────────────────────────────────────────────────────────
export function getAgents(): AgentData[] {
  return load<AgentData[]>(AGENTS_KEY, agents)
}
export function saveAgent(a: AgentData): void {
  const list = load<AgentData[]>(AGENTS_KEY, agents)
  const idx = list.findIndex((x) => x.id === a.id)
  if (idx >= 0) {
    list[idx] = a
  } else {
    list.push(a)
  }
  save(AGENTS_KEY, list)
}
export function deleteAgent(id: number): void {
  const list = load<AgentData[]>(AGENTS_KEY, agents)
  save(AGENTS_KEY, list.filter((x) => x.id !== id))
}
export function nextAgentId(): number {
  const list = getAgents()
  return list.length > 0 ? Math.max(...list.map((a) => a.id)) + 1 : 1
}

// ─── Inquiries ────────────────────────────────────────────────────────────
export interface Inquiry {
  id: number
  name: string
  phone: string
  email: string
  interest: string
  message: string
  status: "new" | "contacted" | "closed"
  date: string
}

// Purge any previously stored seed/mock inquiry data (emails ending in @example.com)
function purgeMockInquiries(): void {
  if (typeof window === "undefined") return
  const raw = localStorage.getItem(INQUIRIES_KEY)
  if (!raw) return
  try {
    const list = JSON.parse(raw) as Inquiry[]
    const cleaned = list.filter((i) => !i.email.endsWith("@example.com"))
    if (cleaned.length !== list.length) {
      save(INQUIRIES_KEY, cleaned)
    }
  } catch {
    // ignore parse errors
  }
}

export function getInquiries(): Inquiry[] {
  purgeMockInquiries()
  return load<Inquiry[]>(INQUIRIES_KEY, [])
}
export function saveInquiry(i: Inquiry): void {
  const list = getInquiries()
  const idx = list.findIndex((x) => x.id === i.id)
  if (idx >= 0) {
    list[idx] = i
  } else {
    list.push(i)
  }
  save(INQUIRIES_KEY, list)
}
export function deleteInquiry(id: number): void {
  save(INQUIRIES_KEY, getInquiries().filter((x) => x.id !== id))
}
export function nextInquiryId(): number {
  const list = getInquiries()
  return list.length > 0 ? Math.max(...list.map((i) => i.id)) + 1 : 1
}

// ─── Settings ─────────────────────────────────────────────────────────────
export interface SiteSettings {
  siteName: string
  phone: string
  email: string
  address: string
  whatsapp: string
  reraNo: string
  tagline: string
  heroTitle: string
  heroSubtitle: string
  enableWhatsAppButton: boolean
  enableAnalytics: boolean
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Shree Balaji Enterprises",
  phone: "7767805544",
  email: "anjujangiti@gmail.com",
  address: "Shop No. 6, Avdhoot Residency, Near Sarvodaya Nagar, Chikhloli, Ambernath (West) 421505",
  whatsapp: "917767805544",
  reraNo: "A51700023633",
  tagline: "Your Trusted Real Estate Partner",
  heroTitle: "Find Your Dream Property in Ambernath & MMR",
  heroSubtitle: "Trusted real estate expertise across Ambernath, Badlapur, Thane and Mumbai (Established 2016).",
  enableWhatsAppButton: true,
  enableAnalytics: true,
}

export function getSettings(): SiteSettings {
  return load<SiteSettings>(SETTINGS_KEY, DEFAULT_SETTINGS)
}
export function saveSettings(s: SiteSettings): void {
  save(SETTINGS_KEY, s)
}
