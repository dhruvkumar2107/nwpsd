import { NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"

const ArticleCreateSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().optional(),
  authorId: z.string().min(1, "Author ID is required"),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).default([]),
  readingTime: z.number().int().positive().optional(),
  published: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  ogImage: z.string().optional(),
  canonicalUrl: z.string().optional(),
  order: z.number().int().default(0),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") ?? "1", 10)
    const limit = parseInt(searchParams.get("limit") ?? "20", 10)
    const search = searchParams.get("search") ?? ""
    const skip = (page - 1) * limit

    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { excerpt: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}

    const [articles, total] = await Promise.all([
      db.article.findMany({
        where,
        include: {
          author: { select: { id: true, name: true, email: true } },
          category: { select: { id: true, name: true, slug: true } },
        },
        orderBy: { updatedAt: "desc" },
        skip,
        take: limit,
      }),
      db.article.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("[Admin Articles GET]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = ArticleCreateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = parsed.data

    const existingSlug = await db.article.findUnique({ where: { slug: data.slug } })
    if (existingSlug) {
      return NextResponse.json(
        { error: "An article with this slug already exists" },
        { status: 409 }
      )
    }

    const article = await db.article.create({
      data: {
        ...data,
        publishedAt: data.published ? new Date() : null,
      },
      include: {
        author: { select: { id: true, name: true, email: true } },
        category: { select: { id: true, name: true, slug: true } },
      },
    })

    return NextResponse.json({ success: true, article }, { status: 201 })
  } catch (error) {
    console.error("[Admin Articles POST]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
