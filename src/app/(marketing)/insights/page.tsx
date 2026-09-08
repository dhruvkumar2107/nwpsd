"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Clock,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Tag,
  Mail,
  ChevronRight,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Higher Education",
  "Internationalization",
  "NEP 2020",
  "Accreditation",
  "Policy",
  "Digital Transformation",
] as const;

type Category = (typeof CATEGORIES)[number];

interface Article {
  slug: string;
  category: Category;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readingTime: string;
  featured?: boolean;
}

const ARTICLES: Article[] = [
  {
    slug: "why-international-collaboration-matters-indian-heis",
    category: "Internationalization",
    title: "Why International Collaboration Matters for Indian HEIs",
    excerpt:
      "As India positions itself as a global education hub, international collaboration is no longer optional — it's a strategic imperative. Institutions that invest in meaningful global partnerships see tangible benefits in research output, faculty quality, student employability, and institutional reputation.",
    author: "Dr. Meera Iyer",
    authorRole: "Director, International Partnerships",
    date: "Aug 28, 2026",
    readingTime: "9 min",
    featured: true,
  },
  {
    slug: "nep-2020-implementation-roadmap-universities",
    category: "NEP 2020",
    title: "NEP 2020: Implementation Roadmap for Universities",
    excerpt:
      "The National Education Policy 2020 represents the most ambitious reform in Indian higher education in decades. This roadmap distills the policy into actionable phases — from CBC framework design and multidisciplinary restructuring to academic bank integration and governance reform.",
    author: "Prof. Arjun Mehta",
    authorRole: "Chief Policy Advisor",
    date: "Aug 14, 2026",
    readingTime: "12 min",
  },
  {
    slug: "naac-accreditation-strategic-guide",
    category: "Accreditation",
    title: "NAAC Accreditation: A Strategic Guide",
    excerpt:
      "Achieving NAAC accreditation isn't a compliance exercise — it's an institutional transformation journey. This guide covers quality指标体系 design, evidence portfolio curation, stakeholder engagement, and the cultural shifts that separate A+ institutions from the rest.",
    author: "Dr. Priya Nair",
    authorRole: "Head, Quality Assurance",
    date: "Jul 30, 2026",
    readingTime: "11 min",
  },
  {
    slug: "building-world-class-universities-from-scratch",
    category: "Higher Education",
    title: "Building World-Class Universities from Scratch",
    excerpt:
      "What does it take to build a globally competitive university in India? From vision articulation and governance design to faculty recruitment and infrastructure planning — this case-driven analysis draws lessons from institutions that have done it successfully.",
    author: "Dr. Meera Iyer",
    authorRole: "Director, International Partnerships",
    date: "Jul 18, 2026",
    readingTime: "14 min",
  },
  {
    slug: "future-of-faculty-development-india",
    category: "Higher Education",
    title: "The Future of Faculty Development in India",
    excerpt:
      "Indian HEIs face a paradox: growing student demand and insufficient faculty capacity. This piece examines pedagogical training gaps, research incentive structures, international exposure programs, and how institutions can build a culture of continuous faculty development.",
    author: "Prof. Arjun Mehta",
    authorRole: "Chief Policy Advisor",
    date: "Jul 05, 2026",
    readingTime: "8 min",
  },
  {
    slug: "digital-transformation-higher-education",
    category: "Digital Transformation",
    title: "Digital Transformation in Higher Education",
    excerpt:
      "Beyond LMS adoption and Zoom classrooms — true digital transformation reimagines how institutions deliver learning, manage operations, and engage stakeholders. We explore AI-driven analytics, digital credentialing, and the infrastructure backbone required for scale.",
    author: "Dr. Kavitha Rao",
    authorRole: "Digital Strategy Lead",
    date: "Jun 22, 2026",
    readingTime: "10 min",
  },
  {
    slug: "ugc-regulations-2024-what-institutions-need-to-know",
    category: "Policy",
    title: "UGC Regulations 2024: What Institutions Need to Know",
    excerpt:
      "The UGC's updated regulations bring significant changes to academic autonomy, credit frameworks, online program delivery, and multi-institutional affiliations. This breakdown covers what changed, why it matters, and how institutions should prepare.",
    author: "Prof. Arjun Mehta",
    authorRole: "Chief Policy Advisor",
    date: "Jun 10, 2026",
    readingTime: "7 min",
  },
  {
    slug: "student-mobility-programs-complete-framework",
    category: "Internationalization",
    title: "Student Mobility Programs: A Complete Framework",
    excerpt:
      "From MoU to semester abroad — a complete institutional framework for designing, launching, and scaling student mobility programs. Covers credit transfer mechanisms, visa support, partner selection criteria, and measuring ROI on mobility initiatives.",
    author: "Dr. Meera Iyer",
    authorRole: "Director, International Partnerships",
    date: "May 28, 2026",
    readingTime: "13 min",
  },
  {
    slug: "multidisciplinary-education-nep-implementation",
    category: "NEP 2020",
    title: "Multidisciplinary Education: Making NEP's Vision a Reality",
    excerpt:
      "The NEP's emphasis on multidisciplinary learning demands fundamental curriculum redesign. This article walks through credit flexibility models, cross-departmental collaboration structures, and assessment reforms that make genuine multidisciplinary education achievable.",
    author: "Dr. Priya Nair",
    authorRole: "Head, Quality Assurance",
    date: "May 15, 2026",
    readingTime: "9 min",
  },
  {
    slug: "nirf-ranking-strategy-institutional-guidelines",
    category: "Accreditation",
    title: "NIRF Ranking Strategy: Institutional Guidelines",
    excerpt:
      "NIRF rankings shape public perception, student enrollment, and funding outcomes. This strategy guide analyzes each NIRF parameter, shares benchmarking data from top-ranked institutions, and outlines a 12-month action plan for meaningful ranking improvement.",
    author: "Dr. Kavitha Rao",
    authorRole: "Digital Strategy Lead",
    date: "May 02, 2026",
    readingTime: "10 min",
  },
];

const ITEMS_PER_PAGE = 6;

function CategoryFilter({
  active,
  onChange,
}: {
  active: Category;
  onChange: (c: Category) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 rounded-full ${
            active === cat
              ? "bg-accent text-primary shadow-md"
              : "bg-white text-ink-secondary border border-border hover:border-accent/40 hover:text-accent"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

function FeaturedArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/insights/${article.slug}`}>
      <article className="group relative overflow-hidden bg-primary rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary-card opacity-90" />
        <div className="relative p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-accent/20 text-accent rounded-full border border-accent/30">
              <Tag className="w-3 h-3" />
              {article.category}
            </span>
            <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-white/10 text-white/70 rounded-full">
              Featured
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 group-hover:text-accent transition-colors duration-300"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {article.title}
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-3xl">
            {article.excerpt}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">
                {article.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {article.author}
                </p>
                <p className="text-xs text-white/50">{article.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime} read
              </span>
            </div>
            <span className="ml-auto hidden sm:flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
              Read Article
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/insights/${article.slug}`}>
      <article className="group bg-white rounded-xl border border-border hover:border-accent/30 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="p-6 sm:p-8 flex flex-col flex-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent rounded-full w-fit mb-4">
            {article.category}
          </span>
          <h3
            className="text-xl sm:text-2xl font-bold text-ink leading-snug mb-3 group-hover:text-accent transition-colors duration-200"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {article.title}
          </h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-6 line-clamp-3 flex-1">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                {article.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-xs font-semibold text-ink">
                  {article.author}
                </p>
                <p className="text-[11px] text-ink-muted">{article.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-ink-muted">
              <Clock className="w-3 h-3" />
              {article.readingTime}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

function NewsletterCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-card relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-[15%] w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-10 right-[15%] w-48 h-48 rounded-full bg-accent/5 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/15 mb-6">
          <Mail className="w-7 h-7 text-accent" />
        </div>
        <h2
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Stay Ahead of the Curve
        </h2>
        <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
          Join 2,000+ institutional leaders receiving our monthly digest of
          policy updates, internationalization strategies, and accreditation
          insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          />
          <button className="px-6 py-3.5 bg-accent text-primary text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-accent-hover transition-colors duration-200 whitespace-nowrap">
            Subscribe
          </button>
        </div>
        <p className="text-xs text-white/30 mt-4">
          No spam. Unsubscribe anytime. Read by VCs, Registrars, and Deans
          across 500+ institutions.
        </p>
      </div>
    </section>
  );
}

export default function InsightsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const featuredArticle = ARTICLES.find((a) => a.featured)!;
  const nonFeatured = ARTICLES.filter((a) => !a.featured);

  const filteredArticles = useMemo(() => {
    let result = nonFeatured;
    if (activeCategory !== "All") {
      result = result.filter((a) => a.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery, nonFeatured]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary-card py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04]" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-4">
              Unitide Educations
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Insights &amp; Analysis
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl">
              Thought leadership on Indian higher education — policy analysis,
              internationalization strategy, accreditation guidance, and digital
              transformation insights from our senior advisory team.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-white border-b border-border sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics, authors..."
                className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-sm text-ink placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <CategoryFilter
                active={activeCategory}
                onChange={setActiveCategory}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-10 sm:py-14 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[2px] bg-accent" />
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
              Featured
            </p>
          </div>
          <FeaturedArticleCard article={featuredArticle} />
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-accent" />
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                All Articles
              </p>
            </div>
            <p className="text-sm text-ink-muted">
              {filteredArticles.length} article
              {filteredArticles.length !== 1 ? "s" : ""}
            </p>
          </div>

          {visibleArticles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {visibleArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-ink-secondary text-lg mb-2">
                No articles found matching your criteria.
              </p>
              <p className="text-ink-muted text-sm">
                Try adjusting your search or category filter.
              </p>
            </div>
          )}

          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-border text-ink text-sm font-semibold tracking-wider uppercase rounded-lg hover:border-accent hover:text-accent transition-all duration-200"
              >
                Load More Articles
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterCTA />

      {/* Back to top */}
      <section className="py-8 bg-surface border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
