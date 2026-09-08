import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Settings,
  Users,
  Mail,
  Star,
  Handshake,
  Megaphone,
  LogOut,
  GraduationCap,
  ChevronRight,
  Shield,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Articles", href: "/admin/articles", icon: FileText },
  { label: "Case Studies", href: "/admin/case-studies", icon: Briefcase },
  { label: "Services", href: "/admin/services", icon: Megaphone },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Partners", href: "/admin/partners", icon: Handshake },
  { label: "Leads", href: "/admin/leads", icon: Mail },
  { label: "Subscribers", href: "/admin/subscribers", icon: Megaphone },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f5f0]">
      <aside className="flex w-64 flex-col bg-[#0a1628] text-white shadow-2xl">
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#c8a44e]">
            <GraduationCap className="h-6 w-6 text-[#0a1628]" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wide">Nyay Saathis</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#c8a44e]">
              Admin Panel
            </p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/40">
            Navigation
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-white/50 group-hover:text-[#c8a44e]" />
                    <span>{item.label}</span>
                    <ChevronRight className="ml-auto h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <Shield className="h-4 w-4 text-[#c8a44e]" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-white/90">
                {session.user?.name || "Admin User"}
              </p>
              <p className="truncate text-[10px] text-white/40">
                {session.user?.email || "admin@nyaysaathis.com"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-black/5 bg-white px-8 py-4 shadow-sm">
          <div>
            <p className="text-xs text-black/50">Welcome back,</p>
            <h2 className="text-sm font-semibold text-[#0d1117]">
              {session.user?.name || "Admin"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-8 items-center rounded-full bg-[#0a1628]/5 px-3">
              <span className="text-xs font-medium text-[#0d1117]">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
