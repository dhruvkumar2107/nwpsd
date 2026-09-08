import Link from "next/link";
import { Hero } from "@/components/marketing/hero";
import { StatBand } from "@/components/marketing/stat-band";
import { PillarCard } from "@/components/marketing/pillar-card";
import { CTASection } from "@/components/marketing/cta-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllMdxContent } from "@/lib/mdx";
import type { Pillar, CaseStudy, Regulation } from "@/types";

const pillars: Pillar[] = [
  { slug: "internationalization-strategy", title: "Internationalization Strategy", description: "End-to-end strategic consulting for Indian institutions seeking to globalize their academic offerings.", icon: "Globe" },
  { slug: "mou-compliance", title: "MoU Compliance & Management", description: "Streamlined memorandum of understanding lifecycle management from drafting to regulatory compliance.", icon: "FileCheck" },
  { slug: "accreditation-support", title: "Accreditation Support", description: "Expert guidance through NAAC, NBA, UGC-DEB, and international accreditation processes.", icon: "Award" },
  { slug: "branding-admissions", title: "Branding & Admissions", description: "Strategic institutional branding and international student recruitment solutions.", icon: "Megaphone" },
  { slug: "fhei-twinning-setup", title: "FHEI & Twinning Program Setup", description: "Specialized setup and compliance support for FHEI collaborations and twinning programs.", icon: "Building2" },
];

const processSteps = [
  { phase: "Discovery", duration: "2-4 weeks", description: "Institutional audit and gap analysis" },
  { phase: "Strategy", duration: "4-6 weeks", description: "Roadmap development and partner matching" },
  { phase: "Drafting", duration: "6-8 weeks", description: "MoU drafting and regulatory filing" },
  { phase: "Approval", duration: "8-12 weeks", description: "Regulatory review and compliance" },
];

export default function HomePage() {
  const caseStudies = getAllMdxContent<CaseStudy & Record<string, unknown>>("case-studies").slice(0, 3);
  const regulations = getAllMdxContent<Record<string, unknown>>("regulations")
    .map((r) => r.frontmatter as unknown as Regulation)
    .slice(0, 3);

  return (
    <>
      <Hero
        headline="The execution partner for Indian higher-ed internationalization"
        subhead="From strategy to signed MoU — we help Indian institutions build compliant, impactful global partnerships."
        primaryCta={{ label: "Schedule a Consultation", href: "/contact" }}
        secondaryCta={{ label: "See How We Work", href: "/how-we-work" }}
      />

      <StatBand />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">Our Expertise</h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-light">
            Five specialized pillars covering every aspect of institutional internationalization.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <PillarCard key={pillar.slug} pillar={pillar} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">How We Work</h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-light">
            A structured, four-phase approach from initial discovery to regulatory approval.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Card key={step.phase}>
                <CardHeader>
                  <Badge variant="outline" className="w-fit">
                    Phase {i + 1}
                  </Badge>
                  <CardTitle className="mt-2">{step.phase}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-ink-light">{step.description}</p>
                  <p className="mt-2 text-xs font-medium text-primary">{step.duration}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="secondary">
              <Link href="/how-we-work">Learn More About Our Process</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">Featured Case Studies</h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-light">
            Real results from institutions we&apos;ve helped transform.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <Link key={cs.slug} href={`/case-studies/${cs.slug}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <Badge variant="success" className="w-fit">
                      {cs.frontmatter.metric}
                    </Badge>
                    <CardTitle className="mt-2">{cs.frontmatter.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-ink-light">{cs.frontmatter.client}</p>
                    <p className="mt-1 text-xs text-ink-light">{cs.frontmatter.country}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="secondary">
              <Link href="/case-studies">View All Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>

      {regulations.length > 0 && (
        <section className="bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink sm:text-4xl">Regulation Tracker</h2>
            <p className="mt-4 max-w-2xl text-lg text-ink-light">
              Stay updated on the latest UGC and AICTE regulations affecting your institution.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {regulations.map((reg) => (
                <Card key={reg.id}>
                  <CardHeader>
                    <Badge variant="outline" className="w-fit">
                      {reg.authority}
                    </Badge>
                    <CardTitle className="mt-2 text-base">{reg.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-ink-light line-clamp-2">{reg.summary}</p>
                    <p className="mt-2 text-xs text-ink-light">
                      Effective: {new Date(reg.effectiveDate).toLocaleDateString("en-IN")}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
