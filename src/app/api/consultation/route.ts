import { NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"

const ConsultationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  institution: z.string().optional(),
  institutionType: z.string().optional(),
  designation: z.string().optional(),
  country: z.string().optional(),
  areaOfInterest: z.string().optional(),
  currentChallenge: z.string().optional(),
  expectedOutcome: z.string().optional(),
  preferredContact: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = ConsultationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const consultation = await db.consultation.create({
      data: parsed.data,
    })

    return NextResponse.json(
      { success: true, consultationId: consultation.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("[Consultation API]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
