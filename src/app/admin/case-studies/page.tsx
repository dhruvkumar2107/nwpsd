"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Briefcase,
  Globe,
  Calendar,
  ExternalLink,
  MapPin,
} from "lucide-react";

interface CaseStudy {
  id: number;
  title: string;
  client: string;
  country: string;
  university: string;
  status: "draft" | "published" | "archived";
  date: string;
  image: string;
  category: string;
}

const initialCaseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "From Mumbai to MIT: Aditya's Journey to a Full Scholarship",
    client: "Aditya Patel",
    country: "United States",
    university: "MIT",
    status: "published",
    date: "2026-08-15",
    image: "/images/case-study-1.jpg",
    category: "Masters",
  },
  {
    id: 2,
    title: "Securing a PhD Position at Oxford",
    client: "Dr. Meera Singh",
    country: "United Kingdom",
    university: "University of Oxford",
    status: "published",
    date: "2026-08-10",
    image: "/images/case-study-2.jpg",
    category: "PhD",
  },
  {
    id: 3,
    title: "Transitioning to Data Science at University of Toronto",
    client: "Rohit Menon",
    country: "Canada",
    university: "University of Toronto",
    status: "published",
    date: "2026-07-28",
    image: "/images/case-study-3.jpg",
    category: "Masters",
  },
  {
    id: 4,
    title: "MBA at London Business School with Scholarship",
    client: "Sneha Kapoor",
    country: "United Kingdom",
    university: "London Business School",
    status: "draft",
    date: "2026-07-20",
    image: "/images/case-study-4.jpg",
    category: "MBA",
  },
  {
    id: 5,
    title: "Undergraduate Admission at University of Melbourne",
    client: "Arjun Reddy",
    country: "Australia",
    university: "University of Melbourne",
    status: "published",
    date: "2026-07-15",
    image: "/images/case-study-5.jpg",
    category: "Bachelors",
  },
  {
    id: 6,
    title: "MS in Computer Science at TU Munich",
    client: "Priya Nair",
    country: "Germany",
    university: "TU Munich",
    status: "archived",
    date: "2026-06-30",
    image: "/images/case-study-6.jpg",
    category: "Masters",
  },
  {
    id: 7,
    title: "LLM at National University of Singapore",
    client: "Vikram Desai",
    country: "Singapore",
    university: "NUS",
    status: "draft",
    date: "2026-06-25",
    image: "/images/case-study-7.jpg",
    category: "Masters",
  },
];

const statusStyles: Record<string, string> = {
  draft: "bg-amber-50 text-amber-700 ring-amber-600/20",
  published: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  archived: "bg-gray-50 text-gray-600 ring-gray-500/20",
};

const countries = [
  "All Countries",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "Singapore",
  "France",
];

export default function CaseStudiesPage() {
  const [caseStudies] = useState<CaseStudy[]>(initialCaseStudies);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCaseStudies = caseStudies.filter((cs) => {
    const matchesSearch =
      cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.university.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry =
      selectedCountry === "All Countries" || cs.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0d1117]">Case Studies</h1>
          <p className="mt-1 text-sm text-black/50">
            Showcase your successful student placements
          </p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="flex items-center gap-2 rounded-lg bg-[#0a1628] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#0a1628]/90 hover:shadow-md"
        >
          <Plus className="h-4 w-4" />
          New Case Study
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-black/40">
                Published
              </p>
              <p className="mt-1 text-2xl font-bold text-emerald-600">
                {caseStudies.filter((cs) => cs.status === "published").length}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
              <Briefcase className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-black/40">
                Drafts
              </p>
              <p className="mt-1 text-2xl font-bold text-amber-600">
                {caseStudies.filter((cs) => cs.status === "draft").length}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
              <Briefcase className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-black/40">
                Countries
              </p>
              <p className="mt-1 text-2xl font-bold text-[#0d1117]">
                {new Set(caseStudies.map((cs) => cs.country)).size}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#c8a44e]/10">
              <Globe className="h-5 w-5 text-[#c8a44e]" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/30" />
          <input
            type="text"
            placeholder="Search by title, client, or university..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-black/10 bg-white py-2.5 pl-10 pr-4 text-sm text-[#0d1117] placeholder-black/30 transition-colors focus:border-[#c8a44e] focus:outline-none focus:ring-1 focus:ring-[#c8a44e]"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-black/60 transition-colors hover:bg-black/[0.02]"
        >
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      {showFilters && (
        <div className="rounded-lg border border-black/5 bg-white p-3 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedCountry === country
                    ? "bg-[#0a1628] text-white"
                    : "bg-black/[0.03] text-black/60 hover:bg-black/[0.06]"
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCaseStudies.map((cs) => (
          <div
            key={cs.id}
            className="group overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="relative h-44 bg-gradient-to-br from-[#0a1628] to-[#0a1628]/80">
              <div className="absolute inset-0 flex items-center justify-center">
                <GraduationCap className="h-16 w-16 text-[#c8a44e]/20" />
              </div>
              <div className="absolute right-3 top-3">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${statusStyles[cs.status]}`}
                >
                  {cs.status.charAt(0).toUpperCase() + cs.status.slice(1)}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-[#0d1117] backdrop-blur-sm">
                <MapPin className="h-3 w-3" />
                {cs.country}
              </div>
            </div>
            <div className="p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-[#c8a44e]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#c8a44e]">
                  {cs.category}
                </span>
              </div>
              <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-[#0d1117] group-hover:text-[#c8a44e]">
                {cs.title}
              </h3>
              <div className="space-y-1.5 text-xs text-black/50">
                <div className="flex items-center gap-2">
                  <Globe className="h-3 w-3" />
                  <span>{cs.university}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  <span>{cs.date}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-black/5 pt-4">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-black/10 py-2 text-xs font-medium text-black/60 transition-colors hover:bg-black/[0.02]">
                  <Eye className="h-3.5 w-3.5" />
                  View
                </button>
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-black/10 py-2 text-xs font-medium text-black/60 transition-colors hover:bg-black/[0.02]">
                  <Edit className="h-3.5 w-3.5" />
                  Edit
                </button>
                <button className="flex items-center justify-center rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCaseStudies.length === 0 && (
        <div className="rounded-xl border border-black/5 bg-white py-16 text-center shadow-sm">
          <Briefcase className="mx-auto h-12 w-12 text-black/10" />
          <p className="mt-3 text-sm font-medium text-black/40">
            No case studies found
          </p>
          <p className="mt-1 text-xs text-black/30">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}

function GraduationCap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 6 3 12 0v-5" />
    </svg>
  );
}
