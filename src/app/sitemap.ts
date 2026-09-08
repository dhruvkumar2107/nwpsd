import { getAllMdxSlugs } from "@/lib/mdx"
import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  const staticPages = [
    "",
    "/what-we-do",
    "/how-we-work",
    "/case-studies",
    "/insights",
    "/tools/readiness-score",
    "/tools/regulation-tracker",
    "/about",
    "/contact",
  ]

  const pillars = getAllMdxSlugs("pillars")
  const caseStudies = getAllMdxSlugs("case-studies")
  const insights = getAllMdxSlugs("insights")

  const pages: MetadataRoute.Sitemap = [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...pillars.map((slug) => ({
      url: `${baseUrl}/what-we-do/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...caseStudies.map((slug) => ({
      url: `${baseUrl}/case-studies/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...insights.map((slug) => ({
      url: `${baseUrl}/insights/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ]

  return pages
}
