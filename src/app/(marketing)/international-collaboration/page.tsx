"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp, Globe, Users, BookOpen, FlaskConical } from "lucide-react";

const regions = [
  { name: "Europe", count: 12, countries: "Germany, France, Italy, Spain, Netherlands, Sweden" },
  { name: "North America", count: 8, countries: "USA, Canada" },
  { name: "Australia & New Zealand", count: 6, countries: "Australia, New Zealand" },
  { name: "United Kingdom", count: 9, countries: "England, Scotland, Wales" },
  { name: "Asia-Pacific", count: 7, countries: "Singapore, Japan, South Korea, Malaysia" },
  { name: "Middle East", count: 3, countries: "UAE, Saudi Arabia, Qatar" },
];

const pillars = [
  {
    icon: Users,
    title: "Student Mobility",
    description: "Structured exchange programs enabling students to study abroad for one semester or a full academic year. Credit transfer mechanisms ensure seamless academic progression.",
    details: [
      "Semester and year-long exchange programs",
      "Summer and winter school opportunities",
      "Virtual exchange and collaborative online international learning (COIL)",
      "Internship placements with international organizations",
    ],
  },
  {
    icon: BookOpen,
    title: "Faculty Mobility",
    description: "Faculty exchange, visiting professorships, and collaborative teaching initiatives that bring global perspectives to your campus and send your faculty to the world stage.",
    details: [
      "Visiting professor and guest lecturer programs",
      "Faculty research sabbaticals at partner institutions",
      "Joint curriculum development initiatives",
      "International teaching assistant placements",
    ],
  },
  {
    icon: Globe,
    title: "Academic Exchange",
    description: "Joint degree programs, dual certificates, and articulation agreements that expand the academic offerings available to your students.",
    details: [
      "Dual degree and twinning programs",
      "Articulation agreements for seamless credit transfer",
      "Joint certificate and diploma programs",
      "Pathway programs for international student recruitment",
    ],
  },
  {
    icon: FlaskConical,
    title: "Research & Innovation",
    description: "Cross-border research partnerships, collaborative grant applications, and knowledge transfer initiatives that drive institutional research output.",
    details: [
      "Joint research projects with international teams",
      "Collaborative grant applications (Horizon Europe, DST-INT, etc.)",
      "Research paper co-authorship and publication",
      "Innovation and technology transfer partnerships",
    ],
  },
];

const partnershipTypes = [
  { title: "MoU Partnerships", description: "Formal Memoranda of Understanding establishing the framework for institutional collaboration across academic, research, and cultural dimensions." },
  { title: "Consortium Memberships", description: "Membership in international education consortia providing access to networks, resources, and collaborative opportunities." },
  { title: "Bilateral Agreements", description: "Country-specific bilateral education agreements that facilitate government-sponsored exchange programs." },
  { title: "Industry Partnerships", description: "Collaborations with multinational corporations for joint research, internships, and placement opportunities." },
];

export default function InternationalCollaborationPage() {
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);

  return (
    <main>
      <section className="relative overflow-hidden bg-primary py-24 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent blur-[150px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <p className="font-sans text-sm uppercase tracking-[0.2em] text-accent">Global Reach</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Building Global Academic<br />Partnerships
          </h1>
          <p className="mt-6 max-w-3xl font-sans text-lg text-gray-300">
            In an interconnected world, the boundaries of education must extend beyond borders.
            Unitide Educations bridges institutions across continents, creating meaningful partnerships
            that enrich academic experiences and drive global innovation.
          </p>
          <div className="mt-10 flex items-center gap-8">
            <div>
              <p className="font-display text-4xl font-bold text-accent">45+</p>
              <p className="mt-1 font-sans text-sm text-gray-400">Global Partners</p>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div>
              <p className="font-display text-4xl font-bold text-accent">15+</p>
              <p className="mt-1 font-sans text-sm text-gray-400">Countries</p>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div>
              <p className="font-display text-4xl font-bold text-accent">6</p>
              <p className="mt-1 font-sans text-sm text-gray-400">Continents</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-primary">Our Global Network</h2>
          <p className="mt-4 max-w-2xl font-sans text-gray-600">
            Our partnerships span six continents, connecting Indian institutions with leading
            universities and research centers worldwide.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regions.map((region) => (
              <div
                key={region.name}
                className="group rounded-sm border border-gray-200 bg-white p-8 transition-all hover:border-accent hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold text-primary">{region.name}</h3>
                  <span className="rounded-full bg-accent/10 px-3 py-1 font-sans text-sm font-semibold text-accent">
                    {region.count} partners
                  </span>
                </div>
                <p className="mt-4 font-sans text-sm text-gray-500">{region.countries}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-primary">Four Pillars of Internationalization</h2>
          <p className="mt-4 max-w-2xl font-sans text-gray-600">
            Our approach to international partnerships is built on four core pillars that ensure
            comprehensive and sustainable global engagement.
          </p>
          <div className="mt-12 space-y-4">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              const isExpanded = expandedPillar === i;
              return (
                <div
                  key={i}
                  className="rounded-sm border border-gray-200 transition-all hover:border-accent/30"
                >
                  <button
                    onClick={() => setExpandedPillar(isExpanded ? null : i)}
                    className="flex w-full items-center gap-6 p-8 text-left"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/5">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold text-primary">{pillar.title}</h3>
                      <p className="mt-1 font-sans text-sm text-gray-600">{pillar.description}</p>
                    </div>
                    <div className="shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-accent" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="border-t border-gray-100 px-8 pb-8 pt-6">
                      <ul className="space-y-3">
                        {pillar.details.map((detail, j) => (
                          <li key={j} className="flex items-start gap-3 font-sans text-sm text-gray-600">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-primary">Partnership Types</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {partnershipTypes.map((type, i) => (
              <div key={i} className="rounded-sm bg-white p-8 shadow-sm">
                <h3 className="font-display text-xl font-bold text-primary">{type.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Ready to Go Global?
          </h2>
          <p className="mt-6 font-sans text-lg text-gray-300">
            Partner with us to connect your institution with the world&apos;s leading
            universities and research centers.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-accent px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-accent/90"
            >
              Start a Partnership
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services/international-partnerships"
              className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:border-white/40"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
