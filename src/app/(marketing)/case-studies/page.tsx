"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Globe,
  GraduationCap,
  Award,
  Building,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

const COUNTRIES = [
  "All Countries",
  "Australia",
  "United Kingdom",
  "Singapore",
  "Japan",
  "United Arab Emirates",
] as const;

const PROGRAM_TYPES = [
  "All Types",
  "Student Exchange",
  "Accreditation",
  "Twinning Program",
  "Branding & Partnerships",
  "International Collaboration",
  "Research Partnership",
] as const;

type Country = (typeof COUNTRIES)[number];
type ProgramType = (typeof PROGRAM_TYPES)[number];

interface CaseStudy {
  slug: string;
  institution: string;
  country: string;
  programType: string;
  challenge: string;
  metric: string;
  metricLabel: string;
  outcome: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "university-of-delhi-melbourne-exchange",
    institution: "University of Delhi",
    country: "Australia",
    programType: "Student Exchange",
    challenge:
      "India's largest university system needed a structured pathway for undergraduate students to gain international exposure across diverse academic disciplines.",
    metric: "340+",
    metricLabel: "students exchanged over 5 years",
    outcome:
      "Established a multi-department student exchange framework with the University of Melbourne spanning Commerce, Political Science, and Environmental Studies — resulting in a 92% student satisfaction rate and 35% increase in post-graduation international placements.",
  },
  {
    slug: "manipal-academy-naac-accreditation",
    institution: "Manipal Academy of Higher Education",
    country: "India",
    programType: "Accreditation",
    challenge:
      "MAHE sought to achieve NAAC A++ grade while simultaneously preparing for international ranking submissions — requiring parallel quality improvement across 30+ programs.",
    metric: "A++",
    metricLabel: "NAAC grade achieved",
    outcome:
      "Guided institutional transformation across 7 NAAC criteria over 18 months — achieving the highest NAAC grade within the first attempt and simultaneously improving QS Asia ranking by 42 positions.",
  },
  {
    slug: "somaiya-vidyavihar-uk-twinning",
    institution: "Somaiya Vidyavihar University",
    country: "United Kingdom",
    programType: "Twinning Program",
    challenge:
      "A multi-campus Indian university wanted to create 2+2 twinning pathways with UK universities for engineering and management students, requiring credit alignment and regulatory navigation.",
    metric: "4",
    metricLabel: "UK partner universities",
    outcome:
      "Designed and launched twinning programs with University of Birmingham, Queen Mary University of London, University of Leeds, and Aston University — enabling 200+ students annually to earn UK degrees while studying in India for the first two years.",
  },
  {
    slug: "vit-branding-east-asia-partnerships",
    institution: "VIT University",
    country: "Japan",
    programType: "Branding & Partnerships",
    challenge:
      "VIT aimed to strengthen its brand in East Asian markets while building research partnerships with leading Japanese and South Korean universities — an untested corridor for most Indian institutions.",
    metric: "12",
    metricLabel: "East Asian partnerships",
    outcome:
      "Developed a targeted East Asia engagement strategy resulting in 12 new institutional partnerships, 3 joint research labs, and a 28% increase in East Asian student enrollment within 3 academic years.",
  },
  {
    slug: "gujarat-maritime-university-international-collaboration",
    institution: "Gujarat Maritime University",
    country: "Singapore",
    programType: "International Collaboration",
    challenge:
      "India's first maritime-focused university needed global partnerships to establish curriculum credibility, faculty expertise, and industry connections in a niche, internationally regulated domain.",
    metric: "8",
    metricLabel: "global maritime partnerships",
    outcome:
      "Built partnerships with Singapore Maritime Academy, IMO-affiliated institutions, and 6 other global maritime universities — resulting in curriculum benchmarking against international standards and faculty exchange agreements covering 40% of teaching staff.",
  },
  {
    slug: "cept-university-research-partnership",
    institution: "CEPT University",
    country: "United Arab Emirates",
    programType: "Research Partnership",
    challenge:
      "A leading architecture and planning university in Ahmedabad wanted to establish collaborative research programs with Gulf-based institutions to address shared challenges in urban development and sustainable infrastructure.",
    metric: "6",
    metricLabel: "joint research projects",
    outcome:
      "Established a research partnership framework with Khalifa University and American University of Sharjah — resulting in 6 jointly funded research projects, 2 international conferences, and a shared PhD supervision program in sustainable urbanism.",
  },
];

const ITEMS_PER_PAGE = 6;

function CountryFilter({
  active,
  onChange,
}: {
  active: Country;
  onChange: (c: Country) => void;
}) {
  return (
    <div className="relative">
      <select
        value={active}
        onChange={(e) => onChange(e.target.value as Country)}
        className="appearance-none w-full sm:w-auto px-4 py-2.5 pr-10 bg-white border border-border rounded-lg text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all cursor-pointer"
      >
        {COUNTRIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
    </div>
  );
}

function ProgramTypeFilter({
  active,
  onChange,
}: {
  active: ProgramType;
  onChange: (p: ProgramType) => void;
}) {
  return (
    <div className="relative">
      <select
        value={active}
        onChange={(e) => onChange(e.target.value as ProgramType)}
        className="appearance-none w-full sm:w-auto px-4 py-2.5 pr-10 bg-white border border-border rounded-lg text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all cursor-pointer"
      >
        {PROGRAM_TYPES.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
    </div>
  );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const programIcon: Record<string, typeof Globe> = {
    "Student Exchange": GraduationCap,
    Accreditation: Award,
    "Twinning Program": Building,
    "Branding & Partnerships": Globe,
    "International Collaboration": Globe,
    "Research Partnership": Globe,
  };
  const Icon = programIcon[study.programType] || Globe;

  return (
    <Link href={`/case-studies/${study.slug}`}>
      <article className="group bg-white rounded-xl border border-border hover:border-accent/30 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="p-6 sm:p-8 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent rounded-full">
              <Icon className="w-3 h-3" />
              {study.programType}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-ink-muted bg-surface rounded-full">
              <Globe className="w-3 h-3" />
              {study.country}
            </span>
          </div>
          <h3
            className="text-xl sm:text-2xl font-bold text-ink leading-snug mb-3 group-hover:text-accent transition-colors duration-200"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {study.institution}
          </h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-6 line-clamp-2 flex-1">
            {study.challenge}
          </p>

          <div className="bg-surface rounded-lg p-4 mb-6">
            <div className="flex items-baseline gap-2">
              <span
                className="text-3xl font-bold text-accent"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {study.metric}
              </span>
              <span className="text-xs text-ink-muted uppercase tracking-wider">
                {study.metricLabel}
              </span>
            </div>
          </div>

          <p className="text-sm text-ink-secondary leading-relaxed mb-6 line-clamp-3">
            {study.outcome}
          </p>

          <div className="flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all mt-auto pt-4 border-t border-border">
            Read Full Case Study
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function CaseStudiesPage() {
  const [activeCountry, setActiveCountry] = useState<Country>("All Countries");
  const [activeProgramType, setActiveProgramType] =
    useState<ProgramType>("All Types");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredStudies = useMemo(() => {
    return CASE_STUDIES.filter((cs) => {
      if (activeCountry !== "All Countries" && cs.country !== activeCountry)
        return false;
      if (
        activeProgramType !== "All Types" &&
        cs.programType !== activeProgramType
      )
        return false;
      return true;
    });
  }, [activeCountry, activeProgramType]);

  const visibleStudies = filteredStudies.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStudies.length;

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
              Proven Impact,{"\n"}Measurable Results
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl">
              Real outcomes from institutions we&apos;ve helped transform
              through strategic internationalization, accreditation excellence,
              and institutional development.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-border sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="flex items-center gap-2 mr-4">
              <div className="w-6 h-[2px] bg-accent" />
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-accent whitespace-nowrap">
                Filter
              </p>
            </div>
            <CountryFilter active={activeCountry} onChange={setActiveCountry} />
            <ProgramTypeFilter
              active={activeProgramType}
              onChange={setActiveProgramType}
            />
            {(activeCountry !== "All Countries" ||
              activeProgramType !== "All Types") && (
              <button
                onClick={() => {
                  setActiveCountry("All Countries");
                  setActiveProgramType("All Types");
                }}
                className="text-xs text-ink-muted hover:text-accent transition-colors underline underline-offset-2"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-10 sm:py-12 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: "80+", label: "Institutions Served" },
              { value: "45+", label: "International Partnerships" },
              { value: "15+", label: "Countries Connected" },
              { value: "200+", label: "Strategic Projects" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p
                  className="text-3xl sm:text-4xl font-bold text-accent"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-ink-muted uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-accent" />
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                Case Studies
              </p>
            </div>
            <p className="text-sm text-ink-muted">
              {filteredStudies.length} case stud
              {filteredStudies.length !== 1 ? "ies" : "y"}
            </p>
          </div>

          {visibleStudies.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {visibleStudies.map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-ink-secondary text-lg mb-2">
                No case studies match your filters.
              </p>
              <button
                onClick={() => {
                  setActiveCountry("All Countries");
                  setActiveProgramType("All Types");
                }}
                className="text-accent text-sm font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-border text-ink text-sm font-semibold tracking-wider uppercase rounded-lg hover:border-accent hover:text-accent transition-all duration-200"
              >
                Load More Case Studies
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-primary to-primary-card relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-[15%] w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute bottom-10 right-[15%] w-48 h-48 rounded-full bg-accent/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to Write Your Own Success Story?
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help your institution achieve
            measurable results through strategic advisory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-accent text-primary text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-accent-hover transition-colors hover:scale-105"
            >
              Schedule a Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/insights"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-white/20 text-white text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-white/5 transition-colors"
            >
              Read Our Insights
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
