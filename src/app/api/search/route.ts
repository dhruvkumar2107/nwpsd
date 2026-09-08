import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get("q")

    if (!q || q.trim().length === 0) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      )
    }

    const searchTerm = q.trim()

    const [articles, services, caseStudies] = await Promise.all([
      db.article.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { excerpt: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          publishedAt: true,
        },
        orderBy: { publishedAt: "desc" },
        take: 10,
      }),
      db.service.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
        },
        orderBy: { order: "asc" },
        take: 10,
      }),
      db.caseStudy.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { client: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          slug: true,
          title: true,
          client: true,
          coverImage: true,
        },
        orderBy: { publishedAt: "desc" },
        take: 10,
      }),
    ])

    const results = {
      articles: { items: articles, count: articles.length },
      services: { items: services, count: services.length },
      caseStudies: { items: caseStudies, count: caseStudies.length },
      totalResults: articles.length + services.length + caseStudies.length,
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error("[Search API]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
