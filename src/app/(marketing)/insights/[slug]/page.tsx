import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Hero } from "@/components/marketing/hero";
import { CTASection } from "@/components/marketing/cta-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMdxContent, getAllMdxContent } from "@/lib/mdx";
import type { Insight } from "@/types";

export function generateStaticParams() {
  const slugs = getAllMdxContent<Insight & Record<string, unknown>>("insights");
  return slugs.map((i) => ({ slug: i.slug }));
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getMdxContent<Insight & Record<string, unknown>>("insights", slug);

  if (!data) notFound();

  const { frontmatter, content } = data;
  const allInsights = getAllMdxContent<Insight & Record<string, unknown>>("insights");
  const related = allInsights
    .filter((i) => i.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <Hero
        headline={frontmatter.title}
        subhead={frontmatter.excerpt}
        primaryCta={{ label: "Discuss This Topic", href: "/contact" }}
        secondaryCta={{ label: "All Insights", href: "/insights" }}
      />

      <article className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-light">
            <span>{frontmatter.author}</span>
            <span>·</span>
            <span>{new Date(frontmatter.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span>·</span>
            <span>{frontmatter.readingTime} read</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="prose prose-lg mt-10 max-w-none prose-headings:text-ink prose-p:text-ink-light prose-a:text-primary">
            <MDXRemote source={content} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-ink">Related Insights</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((insight) => (
                <Link key={insight.slug} href={`/insights/${insight.slug}`}>
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <CardHeader>
                      <div className="flex flex-wrap gap-2">
                        {insight.frontmatter.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="default">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="mt-2">{insight.frontmatter.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-ink-light line-clamp-2">
                        {insight.frontmatter.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: frontmatter.title,
            description: frontmatter.excerpt,
            author: {
              "@type": "Organization",
              name: frontmatter.author,
            },
            datePublished: frontmatter.publishedAt,
            publisher: {
              "@type": "Organization",
              name: "Unitide Educations",
            },
          }),
        }}
      />
    </>
  );
}
