import { NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"

const CaseStudyCreateSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  client: z.string().optional(),
  country: z.string().optional(),
  programType: z.string().optional(),
  challenge: z.string().optional(),
  approach: z.string().optional(),
  outcome: z.string().optional(),
  metrics: z.string().optional(),
  coverImage: z.string().optional(),
  published: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
})

export async function GET() {
  try {
    const caseStudies = await db.caseStudy.findMany({
      orderBy: { updatedAt: "desc" },
    })

    return NextResponse.json({ success: true, caseStudies })
  } catch (error) {
    console.error("[Admin Case Studies GET]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = CaseStudyCreateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = parsed.data

    const existingSlug = await db.caseStudy.findUnique({ where: { slug: data.slug } })
    if (existingSlug) {
      return NextResponse.json(
        { error: "A case study with this slug already exists" },
        { status: 409 }
      )
    }

    const caseStudy = await db.caseStudy.create({
      data: {
        ...data,
        publishedAt: data.published ? new Date() : null,
      },
    })

    return NextResponse.json({ success: true, caseStudy }, { status: 201 })
  } catch (error) {
    console.error("[Admin Case Studies POST]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
