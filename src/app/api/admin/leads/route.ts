import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") ?? "1", 10)
    const limit = parseInt(searchParams.get("limit") ?? "20", 10)
    const status = searchParams.get("status")
    const skip = (page - 1) * limit

    const where = status
      ? { source: status as "READINESS_SCORE" | "CONTACT" | "NEWSLETTER" | "CONSULTATION" }
      : {}

    const [leads, total] = await Promise.all([
      db.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      db.lead.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("[Admin Leads GET]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
