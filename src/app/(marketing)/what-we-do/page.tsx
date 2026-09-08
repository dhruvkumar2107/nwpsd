import { Hero } from "@/components/marketing/hero";
import { PillarCard } from "@/components/marketing/pillar-card";
import { CTASection } from "@/components/marketing/cta-section";
import type { Pillar } from "@/types";

const pillars: Pillar[] = [
  { slug: "internationalization-strategy", title: "Internationalization Strategy", description: "End-to-end strategic consulting for Indian institutions seeking to globalize their academic offerings, research partnerships, and campus experience.", icon: "Globe" },
  { slug: "mou-compliance", title: "MoU Compliance & Management", description: "Streamlined memorandum of understanding lifecycle management—from drafting to regulatory compliance with UGC and AICTE collaboration frameworks.", icon: "FileCheck" },
  { slug: "accreditation-support", title: "Accreditation Support", description: "Expert guidance through NAAC, NBA, UGC-DEB, and international accreditation processes with proven frameworks for successful outcomes.", icon: "Award" },
  { slug: "branding-admissions", title: "Branding & Admissions", description: "Strategic institutional branding and international student recruitment solutions designed for Indian universities expanding their global reach.", icon: "Megaphone" },
  { slug: "fhei-twinning-setup", title: "FHEI & Twinning Program Setup", description: "Specialized setup and compliance support for Foreign Higher Education Institution (FHEI) collaborations and twinning program frameworks in India.", icon: "Building2" },
];

export default function WhatWeDoPage() {
  return (
    <>
      <Hero
        headline="What We Do"
        subhead="Five specialized pillars covering every aspect of institutional internationalization—from strategy to compliance."
        primaryCta={{ label: "Talk to an Expert", href: "/contact" }}
        secondaryCta={{ label: "See Our Results", href: "/case-studies" }}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-ink sm:text-4xl">Our Five Pillars</h2>
            <p className="mt-4 text-lg text-ink-light">
              Each pillar addresses a critical dimension of institutional internationalization. Together,
              they provide end-to-end support from initial strategy through regulatory compliance and
              ongoing management.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <PillarCard key={pillar.slug} pillar={pillar} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Not Sure Which Pillar You Need?"
        subhead="Book a free consultation and we'll help you identify the right approach for your institution."
        ctaLabel="Book a Consultation"
        ctaHref="/contact"
      />
    </>
  );
}
