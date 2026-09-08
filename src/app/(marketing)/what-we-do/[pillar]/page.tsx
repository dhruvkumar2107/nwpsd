import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Hero } from "@/components/marketing/hero";
import { CTASection } from "@/components/marketing/cta-section";
import { PillarCard } from "@/components/marketing/pillar-card";
import { getMdxContent } from "@/lib/mdx";
import type { Pillar } from "@/types";

const allPillars: Pillar[] = [
  { slug: "internationalization-strategy", title: "Internationalization Strategy", description: "End-to-end strategic consulting for Indian institutions seeking to globalize their academic offerings.", icon: "Globe" },
  { slug: "mou-compliance", title: "MoU Compliance & Management", description: "Streamlined memorandum of understanding lifecycle management from drafting to regulatory compliance.", icon: "FileCheck" },
  { slug: "accreditation-support", title: "Accreditation Support", description: "Expert guidance through NAAC, NBA, UGC-DEB, and international accreditation processes.", icon: "Award" },
  { slug: "branding-admissions", title: "Branding & Admissions", description: "Strategic institutional branding and international student recruitment solutions.", icon: "Megaphone" },
  { slug: "fhei-twinning-setup", title: "FHEI & Twinning Program Setup", description: "Specialized setup and compliance support for FHEI collaborations and twinning programs.", icon: "Building2" },
];

interface PillarFrontmatter {
  title: string;
  description: string;
  icon: string;
}

export function generateStaticParams() {
  return allPillars.map((p) => ({ pillar: p.slug }));
}

export default async function PillarPage({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar: slug } = await params;
  const data = getMdxContent<PillarFrontmatter & Record<string, unknown>>("pillars", slug);

  if (!data) notFound();

  const { frontmatter, content } = data;
  const relatedPillars = allPillars.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Hero
        headline={frontmatter.title}
        subhead={frontmatter.description}
        primaryCta={{ label: "Get Started", href: "/contact" }}
        secondaryCta={{ label: "All Services", href: "/what-we-do" }}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none prose-headings:text-ink prose-p:text-ink-light prose-a:text-primary">
            <MDXRemote source={content} />
          </article>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-ink">Related Services</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPillars.map((p) => (
              <PillarCard key={p.slug} pillar={p} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline={`Ready to Get Started with ${frontmatter.title}?`}
        subhead="Schedule a free consultation with our experts."
        ctaLabel="Book a Consultation"
        ctaHref="/contact"
      />
    </>
  );
}
