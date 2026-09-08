import Link from "next/link";
import {
  FileText,
  Mail,
  Users,
  Phone,
  Plus,
  Eye,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Briefcase,
  GraduationCap,
} from "lucide-react";

const stats = [
  {
    label: "Total Articles",
    value: 24,
    change: "+3 this month",
    trend: "up",
    icon: FileText,
    color: "bg-blue-50 text-blue-600",
    accent: "border-l-blue-500",
  },
  {
    label: "Total Leads",
    value: 186,
    change: "+12 this week",
    trend: "up",
    icon: Mail,
    color: "bg-emerald-50 text-emerald-600",
    accent: "border-l-emerald-500",
  },
  {
    label: "Total Subscribers",
    value: 1024,
    change: "+48 this month",
    trend: "up",
    icon: Users,
    color: "bg-violet-50 text-violet-600",
    accent: "border-l-violet-500",
  },
  {
    label: "Consultations",
    value: 42,
    change: "-2 from last month",
    trend: "down",
    icon: Phone,
    color: "bg-amber-50 text-amber-600",
    accent: "border-l-amber-500",
  },
];

const recentLeads = [
  {
    id: 1,
    name: "Aarav Mehta",
    email: "aarav.mehta@email.com",
    institution: "University of Toronto",
    service: "Admission Consulting",
    status: "new",
    date: "2026-09-07",
  },
  {
    id: 2,
    name: "Sneha Kapoor",
    email: "sneha.k@email.com",
    institution: "University of Melbourne",
    service: "Visa Assistance",
    status: "contacted",
    date: "2026-09-06",
  },
  {
    id: 3,
    name: "Rohit Sharma",
    email: "rohit.s@email.com",
    institution: "King's College London",
    service: "SOP Review",
    status: "new",
    date: "2026-09-06",
  },
  {
    id: 4,
    name: "Priya Nair",
    email: "priya.n@email.com",
    institution: "National University of Singapore",
    service: "Admission Consulting",
    status: "converted",
    date: "2026-09-05",
  },
  {
    id: 5,
    name: "Kabir Singh",
    email: "kabir.s@email.com",
    institution: "TU Munich",
    service: "Scholarship Guidance",
    status: "contacted",
    date: "2026-09-04",
  },
];

const statusStyles: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 ring-blue-600/20",
  contacted: "bg-amber-50 text-amber-700 ring-amber-600/20",
  converted: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0d1117]">Dashboard</h1>
        <p className="mt-1 text-sm text-black/50">
          Overview of your consulting practice
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`rounded-xl border border-black/5 bg-white p-6 shadow-sm ${stat.accent} border-l-4 transition-shadow hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-black/50">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-[#0d1117]">
                    {stat.value}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs font-medium">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span
                      className={
                        stat.trend === "up" ? "text-emerald-600" : "text-red-500"
                      }
                    >
                      {stat.change}
                    </span>
                  </p>
                </div>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg ${stat.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#0d1117]">Recent Leads</h3>
            <Link
              href="/admin/leads"
              className="text-xs font-medium text-[#c8a44e] hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5 text-left">
                  <th className="pb-3 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                    Name
                  </th>
                  <th className="pb-3 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                    Institution
                  </th>
                  <th className="pb-3 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                    Service
                  </th>
                  <th className="pb-3 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                    Status
                  </th>
                  <th className="pb-3 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="text-sm transition-colors hover:bg-black/[0.02]">
                    <td className="py-3">
                      <div>
                        <p className="font-medium text-[#0d1117]">{lead.name}</p>
                        <p className="text-xs text-black/40">{lead.email}</p>
                      </div>
                    </td>
                    <td className="py-3 text-black/60">{lead.institution}</td>
                    <td className="py-3 text-black/60">{lead.service}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${statusStyles[lead.status]}`}
                      >
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-black/40">{lead.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-[#0d1117]">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/admin/articles/new"
                className="flex items-center gap-3 rounded-lg border border-[#c8a44e]/20 bg-[#c8a44e]/5 px-4 py-3 text-sm font-medium text-[#c8a44e] transition-all hover:bg-[#c8a44e] hover:text-[#0a1628]"
              >
                <Plus className="h-4 w-4" />
                New Article
                <ArrowRight className="ml-auto h-3.5 w-3.5" />
              </Link>
              <Link
                href="/admin/case-studies"
                className="flex items-center gap-3 rounded-lg border border-black/10 bg-black/[0.02] px-4 py-3 text-sm font-medium text-[#0d1117] transition-all hover:bg-[#0d1117] hover:text-white"
              >
                <Briefcase className="h-4 w-4" />
                New Case Study
                <ArrowRight className="ml-auto h-3.5 w-3.5" />
              </Link>
              <Link
                href="/admin/leads"
                className="flex items-center gap-3 rounded-lg border border-black/10 bg-black/[0.02] px-4 py-3 text-sm font-medium text-[#0d1117] transition-all hover:bg-[#0d1117] hover:text-white"
              >
                <Eye className="h-4 w-4" />
                View Leads
                <ArrowRight className="ml-auto h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-[#0a1628] bg-[#0a1628] p-6 text-white shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-[#c8a44e]" />
              <h3 className="text-sm font-semibold">Consultation Summary</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">This Month</span>
                <span className="font-semibold">14 booked</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#c8a44e]"
                  style={{ width: "70%" }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-white/40">
                <span>14 of 20 goal</span>
                <span>70%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
