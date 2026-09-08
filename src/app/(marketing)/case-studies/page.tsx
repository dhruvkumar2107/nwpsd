import { Hero } from "@/components/marketing/hero";
import { CTASection } from "@/components/marketing/cta-section";
import { CaseStudyGrid } from "@/components/marketing/case-study-grid";
import { getAllMdxContent } from "@/lib/mdx";
import type { CaseStudy } from "@/types";

export default function CaseStudiesPage() {
  const caseStudies = getAllMdxContent<CaseStudy & Record<string, unknown>>("case-studies").map((cs) => ({
    slug: cs.slug,
    frontmatter: cs.frontmatter,
  }));

  return (
    <>
      <Hero
        headline="Case Studies"
        subhead="Real results from institutions we've helped transform through strategic internationalization."
        primaryCta={{ label: "Discuss Your Goals", href: "/contact" }}
        secondaryCta={{ label: "Our Services", href: "/what-we-do" }}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CaseStudyGrid caseStudies={caseStudies} />
        </div>
      </section>

      <CTASection
        headline="Want Similar Results for Your Institution?"
        subhead="Let's discuss how we can help you achieve your internationalization goals."
        ctaLabel="Get Started"
        ctaHref="/contact"
      />
    </>
  );
}
