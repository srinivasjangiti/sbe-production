"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  Building2,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Home,
  Menu,
  X,
  ChevronRight,
  Star,
  TrendingUp,
  Tag,
  KeyRound,
  List,
} from "lucide-react"
import { logout } from "@/lib/admin-auth"
import { cn } from "@/lib/utils"
import { BrandLogo } from "@/components/brand-logo"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true, group: null },
  { href: "/admin/properties", label: "All Properties", icon: List, group: "Listings", exact: false },
  { href: "/admin/featured", label: "Featured", icon: Star, group: "Listings" },
  { href: "/admin/trending", label: "Trending", icon: TrendingUp, group: "Listings" },
  { href: "/admin/buy", label: "For Sale", icon: Tag, group: "Listings" },
  { href: "/admin/rent-listings", label: "For Rent", icon: KeyRound, group: "Listings" },
  { href: "/admin/agents", label: "Agents", icon: Users, group: null },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare, group: null },
  { href: "/admin/settings", label: "Settings", icon: Settings, group: null },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    await logout()
    router.push("/admin/login")
  }

  function isActive(item: (typeof navItems)[0]) {
    if (item.exact) return pathname === item.href
    // Prevent /admin/properties matching /admin/buy, /admin/rent-listings etc.
    if (item.href === "/admin/properties") return pathname === "/admin/properties" || pathname.startsWith("/admin/properties/")
    return pathname.startsWith(item.href)
  }

  const SidebarContent = () => {
    const groups = Array.from(new Set(navItems.map(i => i.group)))
    return (
    <div className="flex h-full flex-col bg-[#0f172a] text-white">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
        <BrandLogo className="h-8 w-auto aspect-[820/528] -ml-1" />
        <div className="min-w-0">
          <p className="text-sm font-bold leading-tight truncate">Shree Balaji</p>
          <p className="text-[11px] text-slate-400 leading-tight">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {groups.map((group) => {
          const items = navItems.filter(i => i.group === group)
          return (
            <div key={group ?? "_top"} className="mb-1">
              {group && (
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 pt-3 pb-1">{group}</p>
              )}
              <div className="space-y-0.5">
                {items.map((item) => {
                  const active = isActive(item)
                  const isSubItem = group === "Listings" && item.href !== "/admin/properties"
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg text-sm font-medium transition-colors group",
                        isSubItem ? "px-3 py-2 pl-5" : "px-3 py-2.5",
                        active
                          ? "bg-primary text-white"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <item.icon className={cn(
                        "flex-shrink-0",
                        isSubItem ? "h-3.5 w-3.5" : "h-4 w-4",
                        active ? "text-white" : "text-slate-400 group-hover:text-white"
                      )} />
                      <span>{item.label}</span>
                      {active && <ChevronRight className="h-3 w-3 ml-auto" />}
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Home className="h-4 w-4 text-slate-400" />
          <span>View Site</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-4 w-4 text-slate-400" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-60 lg:fixed lg:inset-y-0 lg:z-40 border-r border-white/5">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0f172a] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-primary flex items-center justify-center">
            <Building2 className="h-4 w-4 text-white" />
          </div>
          <span className="text-white text-sm font-bold">SBE Admin</span>
        </div>
        <button onClick={() => setMobileOpen(true)} className="text-white p-1" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 h-full flex flex-col shadow-xl">
            <SidebarContent />
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
