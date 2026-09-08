import { NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"

const NewsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().optional(),
  institution: z.string().optional(),
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

    const { email, name, institution } = parsed.data

    const existingSubscriber = await db.subscriber.findUnique({ where: { email } })

    let subscriber
    if (existingSubscriber) {
      subscriber = await db.subscriber.update({
        where: { email },
        data: {
          name: name ?? existingSubscriber.name,
          institution: institution ?? existingSubscriber.institution,
          active: true,
        },
      })
    } else {
      subscriber = await db.subscriber.create({
        data: { email, name, institution },
      })
    }

    return NextResponse.json({ success: true, subscriberId: subscriber.id })
  } catch (error) {
    console.error("[Newsletter API]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
