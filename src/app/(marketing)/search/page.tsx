import type { Metadata } from "next";
import { Search, FileText, Briefcase, Building2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Search | Nyay Saathis",
  description: "Search articles, services, and case studies from Nyay Saathis.",
};

const MOCK_RESULTS = [
  {
    id: "1",
    title: "NAAC Accreditation: A Complete Roadmap for Indian Institutions",
    excerpt:
      "Step-by-step guide to achieving NAAC accreditation, from self-study report preparation to peer team visits.",
    type: "article" as const,
    url: "/blog/naac-accreditation-roadmap",
  },
  {
    id: "2",
    title: "NIRF Ranking Strategy Service",
    excerpt:
      "Data-driven consulting to improve your institution's NIRF ranking across all parameters.",
    type: "service" as const,
    url: "/services/nirf-ranking-strategy",
  },
  {
    id: "3",
    title: "How a Tier-2 College Achieved 40% Enrollment Growth",
    excerpt:
      "Case study on strategic enrollment management and digital marketing transformation.",
    type: "case-study" as const,
    url: "/case-studies/enrollment-growth-tier2",
  },
  {
    id: "4",
    title: "NEP 2020 Implementation Guide for Universities",
    excerpt:
      "Comprehensive guide to aligning your curriculum and governance with National Education Policy 2020.",
    type: "article" as const,
    url: "/blog/nep-2020-implementation",
  },
  {
    id: "5",
    title: "Faculty Development Programs",
    excerpt:
      "Tailored FDPs to enhance teaching quality, research output, and academic leadership.",
    type: "service" as const,
    url: "/services/faculty-development",
  },
  {
    id: "6",
    title: "International Partnership Success: IIT-Joint Degree Case Study",
    excerpt:
      "How an institution established a joint degree program with a European university.",
    type: "case-study" as const,
    url: "/case-studies/international-partnership",
  },
];

const TYPE_ICONS: Record<string, React.ElementType> = {
  article: FileText,
  service: Briefcase,
  "case-study": Building2,
};

const TYPE_LABELS: Record<string, string> = {
  article: "Articles",
  service: "Services",
  "case-study": "Case Studies",
};

const TYPE_COLORS: Record<string, string> = {
  article: "bg-blue-50 text-blue-600",
  service: "bg-amber-50 text-[#c8a44e]",
  "case-study": "bg-emerald-50 text-emerald-600",
};

function searchResults(q: string) {
  if (!q.trim()) return [];
  const lower = q.toLowerCase();
  return MOCK_RESULTS.filter(
    (r) =>
      r.title.toLowerCase().includes(lower) ||
      r.excerpt.toLowerCase().includes(lower) ||
      r.type.toLowerCase().includes(lower)
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = searchResults(q);

  const grouped = results.reduce(
    (acc: Record<string, typeof results>, r) => {
      (acc[r.type] = acc[r.type] || []).push(r);
      return acc;
    },
    {} as Record<string, typeof results>
  );

  return (
    <main className="min-h-screen bg-[#f7f5f0]">
      {/* Header */}
      <section className="bg-[#0a1628] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Search
          </h1>
          <form action="/search" method="get" className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c8a44e]" />
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search articles, services, case studies..."
              className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white text-[#0a1628] text-lg placeholder:text-[#0a1628]/30 focus:outline-none focus:ring-2 focus:ring-[#c8a44e]/40 shadow-xl"
              autoFocus
            />
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-3xl mx-auto px-6 py-10 md:py-14">
        {q.trim() === "" ? (
          <div className="text-center py-16">
            <Search className="w-14 h-14 text-[#0a1628]/10 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[#0a1628] mb-2">
              What are you looking for?
            </h2>
            <p className="text-[#0a1628]/50">
              Search across our articles, services, and case studies.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-14 h-14 text-[#0a1628]/10 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[#0a1628] mb-2">
              No results for &ldquo;{q}&rdquo;
            </h2>
            <p className="text-[#0a1628]/50 mb-6">
              Try adjusting your search terms or browse our services directly.
            </p>
            <a
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#c8a44e] text-white font-semibold hover:bg-[#c8a44e]/90 transition-colors"
            >
              Browse All Services
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div>
            <p className="text-sm text-[#0a1628]/50 mb-8">
              {results.length} result{results.length !== 1 ? "s" : ""} for
              &ldquo;{q}&rdquo;
            </p>

            {Object.entries(grouped).map(([type, items]) => {
              const Icon = TYPE_ICONS[type] || FileText;
              const colorClass = TYPE_COLORS[type] || "bg-gray-50 text-gray-600";
              return (
                <div key={type} className="mb-10">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-[#0a1628] mb-4">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${colorClass}`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    {TYPE_LABELS[type] || type}
                  </h2>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <a
                        key={item.id}
                        href={item.url}
                        className="group block bg-white rounded-xl p-5 border border-[#0a1628]/5 hover:border-[#c8a44e]/30 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-base font-semibold text-[#0a1628] group-hover:text-[#c8a44e] transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm text-[#0a1628]/50 mt-1.5 line-clamp-2">
                              {item.excerpt}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#0a1628]/20 group-hover:text-[#c8a44e] mt-1 shrink-0 transition-colors" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
