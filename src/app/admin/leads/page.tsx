"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Building2,
  MoreHorizontal,
  Eye,
  CheckCircle2,
  Clock,
  Circle,
  ArrowUpDown,
  ExternalLink,
  User,
  Calendar,
} from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  institution: string;
  serviceInterest: string;
  status: "new" | "contacted" | "converted";
  date: string;
  source: string;
  message: string;
}

const initialLeads: Lead[] = [
  {
    id: 1,
    name: "Aarav Mehta",
    email: "aarav.mehta@email.com",
    phone: "+91 98765 43210",
    institution: "University of Toronto",
    serviceInterest: "Admission Consulting",
    status: "new",
    date: "2026-09-07",
    source: "Website Form",
    message: "Interested in MS in Computer Science for Fall 2027.",
  },
  {
    id: 2,
    name: "Sneha Kapoor",
    email: "sneha.k@email.com",
    phone: "+91 87654 32109",
    institution: "University of Melbourne",
    serviceInterest: "Visa Assistance",
    status: "contacted",
    date: "2026-09-06",
    source: "Referral",
    message: "Needs help with Australian student visa process.",
  },
  {
    id: 3,
    name: "Rohit Sharma",
    email: "rohit.s@email.com",
    phone: "+91 76543 21098",
    institution: "King's College London",
    serviceInterest: "SOP Review",
    status: "new",
    date: "2026-09-06",
    source: "Website Form",
    message: "Looking for SOP review and editing services.",
  },
  {
    id: 4,
    name: "Priya Nair",
    email: "priya.n@email.com",
    phone: "+91 65432 10987",
    institution: "National University of Singapore",
    serviceInterest: "Admission Consulting",
    status: "converted",
    date: "2026-09-05",
    source: "LinkedIn",
    message: "Wants complete admission package for NUS MBA.",
  },
  {
    id: 5,
    name: "Kabir Singh",
    email: "kabir.s@email.com",
    phone: "+91 54321 09876",
    institution: "TU Munich",
    serviceInterest: "Scholarship Guidance",
    status: "contacted",
    date: "2026-09-04",
    source: "Website Form",
    message: "Seeking scholarship opportunities in Germany.",
  },
  {
    id: 6,
    name: "Ananya Reddy",
    email: "ananya.r@email.com",
    phone: "+91 43210 98765",
    institution: "Stanford University",
    serviceInterest: "Admission Consulting",
    status: "new",
    date: "2026-09-03",
    source: "Google Ads",
    message: "Aspiring to pursue PhD in Artificial Intelligence.",
  },
  {
    id: 7,
    name: "Vikram Desai",
    email: "vikram.d@email.com",
    phone: "+91 32109 87654",
    institution: "ETH Zurich",
    serviceInterest: "Document Preparation",
    status: "contacted",
    date: "2026-09-02",
    source: "Website Form",
    message: "Needs assistance with application documents.",
  },
  {
    id: 8,
    name: "Meera Joshi",
    email: "meera.j@email.com",
    phone: "+91 21098 76543",
    institution: "Columbia University",
    serviceInterest: "Admission Consulting",
    status: "converted",
    date: "2026-09-01",
    source: "Referral",
    message: "Successfully enrolled for Fall 2026 MS program.",
  },
  {
    id: 9,
    name: "Arjun Patel",
    email: "arjun.p@email.com",
    phone: "+91 10987 65432",
    institution: "University of Warwick",
    serviceInterest: "Visa Assistance",
    status: "new",
    date: "2026-08-30",
    source: "Website Form",
    message: "Requires help with UK Tier 4 visa application.",
  },
  {
    id: 10,
    name: "Diya Menon",
    email: "diya.m@email.com",
    phone: "+91 09876 54321",
    institution: "University of Sydney",
    serviceInterest: "Scholarship Guidance",
    status: "new",
    date: "2026-08-28",
    source: "Instagram",
    message: "Looking for merit-based scholarships in Australia.",
  },
];

const statusConfig: Record<
  string,
  { color: string; bg: string; ring: string; icon: React.ElementType }
> = {
  new: {
    color: "text-blue-700",
    bg: "bg-blue-50",
    ring: "ring-blue-600/20",
    icon: Circle,
  },
  contacted: {
    color: "text-amber-700",
    bg: "bg-amber-50",
    ring: "ring-amber-600/20",
    icon: Clock,
  },
  converted: {
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    ring: "ring-emerald-600/20",
    icon: CheckCircle2,
  },
};

const statusFilters = ["all", "new", "contacted", "converted"];

export default function LeadsPage() {
  const [leads] = useState<Lead[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [sortField, setSortField] = useState<keyof Lead>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const filteredLeads = leads
    .filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.institution.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        activeStatus === "all" || lead.status === activeStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return 0;
    });

  const statusCounts = {
    all: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

  const toggleSort = (field: keyof Lead) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0d1117]">Leads</h1>
          <p className="mt-1 text-sm text-black/50">
            Track and manage your prospective student inquiries
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-[#c8a44e] bg-[#c8a44e]/10 px-4 py-2.5 text-sm font-medium text-[#c8a44e] transition-all hover:bg-[#c8a44e] hover:text-[#0a1628]">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statusFilters.map((status) => {
          const count = statusCounts[status as keyof typeof statusCounts];
          const config = status !== "all" ? statusConfig[status] : null;
          return (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`rounded-xl border p-4 text-left transition-all ${
                activeStatus === status
                  ? "border-[#c8a44e] bg-[#c8a44e]/5 shadow-sm"
                  : "border-black/5 bg-white hover:shadow-sm"
              }`}
            >
              <p className="text-xs font-medium uppercase tracking-wider text-black/40">
                {status === "all" ? "Total Leads" : status}
              </p>
              <p
                className={`mt-1 text-2xl font-bold ${
                  config?.color || "text-[#0d1117]"
                }`}
              >
                {count}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/30" />
          <input
            type="text"
            placeholder="Search by name, email, or institution..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-black/10 bg-white py-2.5 pl-10 pr-4 text-sm text-[#0d1117] placeholder-black/30 transition-colors focus:border-[#c8a44e] focus:outline-none focus:ring-1 focus:ring-[#c8a44e]"
          />
        </div>
      </div>

      <div className="rounded-xl border border-black/5 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/5 text-left">
                <th className="px-6 py-4">
                  <button
                    onClick={() => toggleSort("name")}
                    className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-black/40 hover:text-black/60"
                  >
                    Lead
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                  Institution
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                  Service Interest
                </th>
                <th className="px-6 py-4">
                  <button
                    onClick={() => toggleSort("status")}
                    className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-black/40 hover:text-black/60"
                  >
                    Status
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                  Source
                </th>
                <th className="px-6 py-4">
                  <button
                    onClick={() => toggleSort("date")}
                    className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-black/40 hover:text-black/60"
                  >
                    Date
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredLeads.map((lead) => {
                const config = statusConfig[lead.status];
                const StatusIcon = config.icon;
                return (
                  <tr
                    key={lead.id}
                    className="transition-colors hover:bg-black/[0.02]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0a1628]/5 text-[11px] font-bold text-[#0a1628]">
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[#0d1117]">
                            {lead.name}
                          </p>
                          <p className="truncate text-xs text-black/40">
                            {lead.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-black/60">
                        <Building2 className="h-3.5 w-3.5 text-black/30" />
                        <span className="truncate max-w-[180px]">
                          {lead.institution}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-black/[0.03] px-2.5 py-0.5 text-xs font-medium text-black/60">
                        {lead.serviceInterest}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${config.bg} ${config.color} ${config.ring}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {lead.status.charAt(0).toUpperCase() +
                          lead.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-black/50">
                      {lead.source}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-black/40">
                        <Calendar className="h-3 w-3" />
                        {lead.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="rounded-md p-1.5 text-black/30 transition-colors hover:bg-black/5 hover:text-[#0a1628]"
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <a
                          href={`mailto:${lead.email}`}
                          className="rounded-md p-1.5 text-black/30 transition-colors hover:bg-black/5 hover:text-[#c8a44e]"
                          title="Send email"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                        <a
                          href={`tel:${lead.phone}`}
                          className="rounded-md p-1.5 text-black/30 transition-colors hover:bg-black/5 hover:text-emerald-600"
                          title="Call"
                        >
                          <Phone className="h-4 w-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <User className="mx-auto h-10 w-10 text-black/10" />
                    <p className="mt-2 text-sm font-medium text-black/40">
                      No leads found
                    </p>
                    <p className="mt-1 text-xs text-black/30">
                      Try adjusting your search or filter criteria
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-black/5 px-6 py-3">
          <p className="text-xs text-black/40">
            Showing {filteredLeads.length} of {leads.length} leads
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="rounded-md border border-black/10 px-3 py-1.5 text-xs font-medium text-black/40"
            >
              Previous
            </button>
            <button className="rounded-md bg-[#0a1628] px-3 py-1.5 text-xs font-medium text-white">
              1
            </button>
            <button className="rounded-md border border-black/10 px-3 py-1.5 text-xs font-medium text-black/40">
              Next
            </button>
          </div>
        </div>
      </div>

      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0a1628] text-sm font-bold text-white">
                  {selectedLead.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0d1117]">
                    {selectedLead.name}
                  </h3>
                  <p className="text-sm text-black/50">
                    {selectedLead.institution}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="rounded-lg p-1.5 text-black/30 transition-colors hover:bg-black/5 hover:text-black/60"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 rounded-xl bg-black/[0.02] p-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-black/30" />
                <span className="text-black/60">{selectedLead.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-black/30" />
                <span className="text-black/60">{selectedLead.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="h-4 w-4 text-black/30" />
                <span className="text-black/60">
                  {selectedLead.serviceInterest}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-black/30" />
                <span className="text-black/60">{selectedLead.date}</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-1 text-xs font-medium text-black/40">Message</p>
              <p className="rounded-lg border border-black/5 bg-white p-3 text-sm text-black/70">
                {selectedLead.message}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={`mailto:${selectedLead.email}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0a1628] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0a1628]/90"
              >
                <Mail className="h-4 w-4" />
                Reply via Email
              </a>
              <a
                href={`tel:${selectedLead.phone}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-black/10 py-2.5 text-sm font-medium text-[#0d1117] transition-colors hover:bg-black/[0.02]"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
