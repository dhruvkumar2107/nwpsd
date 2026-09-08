import { NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"

const ArticleUpdateSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1).optional(),
  featuredImage: z.string().optional(),
  authorId: z.string().min(1).optional(),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  readingTime: z.number().int().positive().optional(),
  published: z.boolean().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  ogImage: z.string().optional(),
  canonicalUrl: z.string().optional(),
  order: z.number().int().optional(),
})

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const article = await db.article.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true, email: true } },
        category: { select: { id: true, name: true, slug: true } },
      },
    })

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, article })
  } catch (error) {
    console.error("[Admin Article GET]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const parsed = ArticleUpdateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const existing = await db.article.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    const data = parsed.data

    if (data.slug && data.slug !== existing.slug) {
      const slugExists = await db.article.findUnique({ where: { slug: data.slug } })
      if (slugExists) {
        return NextResponse.json(
          { error: "An article with this slug already exists" },
          { status: 409 }
        )
      }
    }

    const article = await db.article.update({
      where: { id },
      data: {
        ...data,
        publishedAt: data.published && !existing.publishedAt ? new Date() : existing.publishedAt,
      },
      include: {
        author: { select: { id: true, name: true, email: true } },
        category: { select: { id: true, name: true, slug: true } },
      },
    })

    return NextResponse.json({ success: true, article })
  } catch (error) {
    console.error("[Admin Article PUT]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existing = await db.article.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    await db.article.delete({ where: { id } })

    return NextResponse.json({ success: true, message: "Article deleted" })
  } catch (error) {
    console.error("[Admin Article DELETE]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
