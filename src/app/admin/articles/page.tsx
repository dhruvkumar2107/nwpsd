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
  MoreHorizontal,
  FileText,
  Calendar,
  User,
  Tag,
} from "lucide-react";

interface Article {
  id: number;
  title: string;
  author: string;
  category: string;
  status: "draft" | "published";
  date: string;
  excerpt: string;
  views: number;
}

const initialArticles: Article[] = [
  {
    id: 1,
    title: "How to Write a Winning Statement of Purpose",
    author: "Dr. Ananya Verma",
    category: "Admissions",
    status: "published",
    date: "2026-09-05",
    excerpt: "A comprehensive guide to crafting compelling SOPs for top universities.",
    views: 1243,
  },
  {
    id: 2,
    title: "Scholarships for Indian Students in Canada 2026",
    author: "Rajesh Kumar",
    category: "Scholarships",
    status: "published",
    date: "2026-09-03",
    excerpt: "Complete list of available scholarships for Indian students.",
    views: 987,
  },
  {
    id: 3,
    title: "Navigating UK Student Visa Process",
    author: "Priya Sharma",
    category: "Visa",
    status: "draft",
    date: "2026-09-01",
    excerpt: "Step-by-step guide to UK student visa application.",
    views: 0,
  },
  {
    id: 4,
    title: "Top 10 Universities for Data Science",
    author: "Dr. Ananya Verma",
    category: "Rankings",
    status: "published",
    date: "2026-08-28",
    excerpt: "Our curated list of the best data science programs worldwide.",
    views: 2156,
  },
  {
    id: 5,
    title: "Financial Planning for Study Abroad",
    author: "Rajesh Kumar",
    category: "Finance",
    status: "draft",
    date: "2026-08-25",
    excerpt: "Budgeting tips and financial aid options for international students.",
    views: 0,
  },
  {
    id: 6,
    title: "Australian Immigration Updates 2026",
    author: "Priya Sharma",
    category: "Visa",
    status: "published",
    date: "2026-08-22",
    excerpt: "Latest changes to Australian student immigration policies.",
    views: 756,
  },
  {
    id: 7,
    title: "GRE vs GMAT: Which Should You Take?",
    author: "Dr. Ananya Verma",
    category: "Test Prep",
    status: "published",
    date: "2026-08-20",
    excerpt: "Detailed comparison to help you choose the right standardized test.",
    views: 1890,
  },
  {
    id: 8,
    title: "Building a Strong Research Profile",
    author: "Rajesh Kumar",
    category: "Research",
    status: "draft",
    date: "2026-08-18",
    excerpt: "Tips for students aiming for research-based master's and PhD programs.",
    views: 0,
  },
];

const statusStyles: Record<string, string> = {
  draft: "bg-amber-50 text-amber-700 ring-amber-600/20",
  published: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
};

const categories = [
  "All",
  "Admissions",
  "Scholarships",
  "Visa",
  "Rankings",
  "Finance",
  "Test Prep",
  "Research",
];

export default function ArticlesPage() {
  const [articles] = useState<Article[]>(initialArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0d1117]">Articles</h1>
          <p className="mt-1 text-sm text-black/50">
            Manage your knowledge base articles and publications
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 rounded-lg bg-[#0a1628] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#0a1628]/90 hover:shadow-md"
        >
          <Plus className="h-4 w-4" />
          New Article
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/30" />
          <input
            type="text"
            placeholder="Search articles..."
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
        <div className="flex flex-wrap gap-2 rounded-lg border border-black/5 bg-white p-3 shadow-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#0a1628] text-white"
                  : "bg-black/[0.03] text-black/60 hover:bg-black/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="rounded-xl border border-black/5 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/5 text-left">
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                  Article
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                  Author
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                  Category
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                  Status
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                  Views
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                  Date
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredArticles.map((article) => (
                <tr
                  key={article.id}
                  className="transition-colors hover:bg-black/[0.02]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0a1628]/5">
                        <FileText className="h-5 w-5 text-[#0a1628]/60" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#0d1117]">
                          {article.title}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-black/40">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-black/60">
                      <User className="h-3.5 w-3.5 text-black/30" />
                      {article.author}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.03] px-2.5 py-0.5 text-xs font-medium text-black/60">
                      <Tag className="h-3 w-3" />
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${statusStyles[article.status]}`}
                    >
                      {article.status.charAt(0).toUpperCase() +
                        article.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-black/60">
                    {article.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-black/40">
                      <Calendar className="h-3 w-3" />
                      {article.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button className="rounded-md p-1.5 text-black/30 transition-colors hover:bg-black/5 hover:text-[#0a1628]">
                        <Eye className="h-4 w-4" />
                      </button>
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="rounded-md p-1.5 text-black/30 transition-colors hover:bg-black/5 hover:text-[#c8a44e]"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button className="rounded-md p-1.5 text-black/30 transition-colors hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredArticles.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <FileText className="mx-auto h-10 w-10 text-black/10" />
                    <p className="mt-2 text-sm font-medium text-black/40">
                      No articles found
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
            Showing {filteredArticles.length} of {articles.length} articles
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
    </div>
  );
}
