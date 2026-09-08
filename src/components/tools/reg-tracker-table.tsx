"use client"

import { useState, useMemo } from "react"
import type { Regulation } from "@/types"
import { format } from "date-fns"
import { Search, Filter, X } from "lucide-react"

export function RegTrackerTable({ data }: { data: Regulation[] }) {
  const [search, setSearch] = useState("")
  const [authority, setAuthority] = useState("ALL")
  const [tagFilter, setTagFilter] = useState("ALL")

  const authorities = useMemo(() => {
    const set = new Set(data.map((r) => r.authority))
    return ["ALL", ...Array.from(set).sort()]
  }, [data])

  const allTags = useMemo(() => {
    const set = new Set(data.flatMap((r) => r.tags))
    return ["ALL", ...Array.from(set).sort()]
  }, [data])

  const filtered = useMemo(() => {
    return data.filter((reg) => {
      const matchesSearch =
        !search ||
        reg.title.toLowerCase().includes(search.toLowerCase()) ||
        reg.summary.toLowerCase().includes(search.toLowerCase())
      const matchesAuthority = authority === "ALL" || reg.authority === authority
      const matchesTag = tagFilter === "ALL" || reg.tags.includes(tagFilter)
      return matchesSearch && matchesAuthority && matchesTag
    })
  }, [data, search, authority, tagFilter])

  const hasFilters = search || authority !== "ALL" || tagFilter !== "ALL"

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-light" />
          <input
            type="text"
            placeholder="Search regulations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-surface-alt rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-light" />
            <select
              value={authority}
              onChange={(e) => setAuthority(e.target.value)}
              className="pl-9 pr-8 py-2 border border-surface-alt rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer"
            >
              {authorities.map((a) => (
                <option key={a} value={a}>
                  {a === "ALL" ? "All Authorities" : a}
                </option>
              ))}
            </select>
          </div>
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="px-3 py-2 border border-surface-alt rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer"
          >
            {allTags.map((t) => (
              <option key={t} value={t}>
                {t === "ALL" ? "All Topics" : t}
              </option>
            ))}
          </select>
          {hasFilters && (
            <button
              onClick={() => {
                setSearch("")
                setAuthority("ALL")
                setTagFilter("ALL")
              }}
              className="flex items-center gap-1 px-3 py-2 text-sm text-ink-light hover:text-ink cursor-pointer"
            >
              <X className="h-4 w-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-alt">
              <th className="text-left py-3 px-4 font-medium text-ink-light">Title</th>
              <th className="text-left py-3 px-4 font-medium text-ink-light">Authority</th>
              <th className="text-left py-3 px-4 font-medium text-ink-light">Date</th>
              <th className="text-left py-3 px-4 font-medium text-ink-light">Tags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-alt">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-ink-light">
                  No regulations match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((reg) => (
                <tr key={reg.id} className="hover:bg-surface/50 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-medium text-ink">{reg.title}</p>
                    <p className="text-xs text-ink-light mt-0.5 line-clamp-1">{reg.summary}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {reg.authority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-ink-light whitespace-nowrap">
                    {format(new Date(reg.effectiveDate), "MMM d, yyyy")}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {reg.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex px-2 py-0.5 rounded-full text-xs bg-surface-alt text-ink-light"
                        >
                          {tag}
                        </span>
                      ))}
                      {reg.tags.length > 3 && (
                        <span className="text-xs text-ink-light">
                          +{reg.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-ink-light mt-3">
        Showing {filtered.length} of {data.length} regulations
      </p>
    </div>
  )
}
