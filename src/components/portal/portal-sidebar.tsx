"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { clsx } from "clsx"
import { LogOut, LayoutDashboard, FileText } from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard },
  { label: "Documents", href: "/portal/documents", icon: FileText },
]

export function PortalSidebar({ user }: { user?: { name?: string | null; email?: string | null } }) {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-primary flex flex-col">
      <div className="p-6 border-b border-primary-light">
        <Link href="/portal/dashboard" className="text-white font-bold text-lg tracking-tight">
          Unitide
        </Link>
        <p className="text-primary-light text-xs mt-1">Client Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-primary-light">
        {user && (
          <div className="mb-3 px-3">
            <p className="text-white text-sm font-medium truncate">{user.name || "User"}</p>
            <p className="text-white/60 text-xs truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
