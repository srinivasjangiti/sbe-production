"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Search, Pencil, Trash2, Eye, Building2, Star, TrendingUp } from "lucide-react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { getBuyProperties, deleteProperty, saveProperty } from "@/lib/admin-store"
import { PropertyData } from "@/lib/data"

const STATUS_COLORS: Record<string, string> = {
  "for-sale": "text-emerald-700 bg-emerald-50 border-emerald-200",
  sold: "text-slate-600 bg-slate-100 border-slate-200",
  pending: "text-amber-700 bg-amber-50 border-amber-200",
}

export default function AdminBuyPage() {
  const authed = useAdminAuth()
  const [mounted, setMounted] = useState(false)
  const [properties, setProperties] = useState<PropertyData[]>([])
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<number | null>(null)

  function loadData() { setProperties(getBuyProperties()) }

  useEffect(() => { setMounted(true); loadData() }, [])

  if (!mounted || !authed) return null

  const filtered = properties.filter(p => {
    const q = search.toLowerCase()
    return !q || p.address.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || (p.type ?? "").toLowerCase().includes(q)
  })

  function handleDelete() {
    if (deleteId == null) return
    deleteProperty(deleteId, "buy")
    setDeleteId(null)
    loadData()
  }

  function toggleFeatured(p: PropertyData) { saveProperty({ ...p, isFeatured: !p.isFeatured }, "buy"); loadData() }
  function toggleTrending(p: PropertyData) { saveProperty({ ...p, isTrending: !p.isTrending }, "buy"); loadData() }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">For Sale Listings</h1>
          <p className="text-slate-500 text-sm mt-0.5">{properties.length} buy listings</p>
        </div>
        <Link
          href="/admin/properties/new?type=buy"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" /> Add For Sale Listing
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by address, city, type…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <Building2 className="h-10 w-10 mb-3 opacity-30" />
            <p className="font-semibold">No for-sale listings found</p>
            <p className="text-sm mt-1">Click &ldquo;Add For Sale Listing&rdquo; to create one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">Property</th>
                  <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">City</th>
                  <th className="text-left px-5 py-3 font-semibold">Price</th>
                  <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">Status</th>
                  <th className="text-center px-3 py-3 font-semibold hidden xl:table-cell" title="Featured"><Star className="h-3.5 w-3.5 mx-auto" /></th>
                  <th className="text-center px-3 py-3 font-semibold hidden xl:table-cell" title="Trending"><TrendingUp className="h-3.5 w-3.5 mx-auto" /></th>
                  <th className="text-right px-5 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                          {p.image && <img src={p.image} alt={p.address} className="h-full w-full object-cover" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 truncate max-w-[160px]">{p.address}</p>
                          <p className="text-xs text-slate-400">ID #{p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 hidden md:table-cell">{p.city}</td>
                    <td className="px-5 py-3.5 font-semibold text-slate-800">{p.price}</td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${STATUS_COLORS[p.status ?? "for-sale"] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
                        {p.status?.replace("-", " ") ?? "—"}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-center hidden xl:table-cell">
                      <button onClick={() => toggleFeatured(p)} title={p.isFeatured ? "Remove from Featured" : "Add to Featured"}
                        className={`p-1.5 rounded-lg transition-colors ${p.isFeatured ? "text-amber-500 bg-amber-50 hover:bg-amber-100" : "text-slate-300 hover:text-amber-400 hover:bg-amber-50"}`}>
                        <Star className={`h-4 w-4 ${p.isFeatured ? "fill-amber-500" : ""}`} />
                      </button>
                    </td>
                    <td className="px-3 py-3.5 text-center hidden xl:table-cell">
                      <button onClick={() => toggleTrending(p)} title={p.isTrending ? "Remove from Trending" : "Add to Trending"}
                        className={`p-1.5 rounded-lg transition-colors ${p.isTrending ? "text-emerald-600 bg-emerald-50 hover:bg-emerald-100" : "text-slate-300 hover:text-emerald-500 hover:bg-emerald-50"}`}>
                        <TrendingUp className="h-4 w-4" />
                      </button>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link href={`/buy/${p.id}`} target="_blank"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors" title="View listing">
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link href={`/admin/properties/buy-${p.id}/edit`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button onClick={() => setDeleteId(p.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full z-10">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mx-auto mb-4">
              <Trash2 className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-center text-slate-800">Delete Property?</h3>
            <p className="text-sm text-slate-500 text-center mt-2">This action cannot be undone.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-semibold text-white transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
