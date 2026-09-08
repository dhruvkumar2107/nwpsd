import { NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"

const NewsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = NewsletterSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { email } = parsed.data

    const existingLead = await db.lead.findFirst({ where: { email } })

    const lead = existingLead
      ? existingLead
      : await db.lead.create({
          data: { name: email.split("@")[0], email, source: "NEWSLETTER" },
        })

    return NextResponse.json({ success: true, leadId: lead.id })
  } catch (error) {
    console.error("[Newsletter API]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
