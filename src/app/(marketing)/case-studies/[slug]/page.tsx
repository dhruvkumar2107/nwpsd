import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Hero } from "@/components/marketing/hero";
import { CTASection } from "@/components/marketing/cta-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMdxContent, getAllMdxContent } from "@/lib/mdx";
import type { CaseStudy } from "@/types";

export function generateStaticParams() {
  const slugs = getAllMdxContent<CaseStudy & Record<string, unknown>>("case-studies");
  return slugs.map((cs) => ({ slug: cs.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getMdxContent<CaseStudy & Record<string, unknown>>("case-studies", slug);

  if (!data) notFound();

  const { frontmatter, content } = data;
  const allCaseStudies = getAllMdxContent<CaseStudy & Record<string, unknown>>("case-studies");
  const related = allCaseStudies
    .filter((cs) => cs.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <Hero
        headline={frontmatter.title}
        subhead={`${frontmatter.client} — ${frontmatter.country}`}
        primaryCta={{ label: "Discuss a Similar Project", href: "/contact" }}
        secondaryCta={{ label: "All Case Studies", href: "/case-studies" }}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">{frontmatter.metric}</Badge>
            <Badge variant="outline">{frontmatter.programType}</Badge>
            <Badge variant="default">{frontmatter.country}</Badge>
          </div>

          <article className="prose prose-lg mt-8 max-w-none prose-headings:text-ink prose-p:text-ink-light prose-a:text-primary">
            <MDXRemote source={content} />
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-ink">Related Case Studies</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((cs) => (
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
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        headline="Ready to Write Your Success Story?"
        subhead="Let's discuss how we can help your institution achieve similar results."
        ctaLabel="Get Started"
        ctaHref="/contact"
      />
    </>
  );
}
