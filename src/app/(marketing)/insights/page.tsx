import Link from "next/link";
import { Hero } from "@/components/marketing/hero";
import { CTASection } from "@/components/marketing/cta-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllMdxContent } from "@/lib/mdx";
import type { Insight } from "@/types";

export default function InsightsPage() {
  const insights = getAllMdxContent<Insight & Record<string, unknown>>("insights");

  return (
    <>
      <Hero
        headline="Insights"
        subhead="Expert analysis on Indian higher education regulations, internationalization strategies, and institutional best practices."
        primaryCta={{ label: "Subscribe to Updates", href: "/contact" }}
        secondaryCta={{ label: "Our Services", href: "/what-we-do" }}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight) => (
              <Link key={insight.slug} href={`/insights/${insight.slug}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2">
                      {insight.frontmatter.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="default">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="mt-3">{insight.frontmatter.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-ink-light line-clamp-3">
                      {insight.frontmatter.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-ink-light">
                      <span>{insight.frontmatter.readingTime} read</span>
                      <span>{new Date(insight.frontmatter.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Need Expert Guidance?"
        subhead="Schedule a consultation with our team to discuss your institution's specific challenges."
        ctaLabel="Get in Touch"
        ctaHref="/contact"
      />
    </>
  );
}
