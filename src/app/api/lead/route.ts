import { NextResponse } from "next/server"
import { LeadFormSchema } from "@/lib/schema"
import { db } from "@/lib/db"
import { sendEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = LeadFormSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, phone } = parsed.data

    const existingLead = await db.lead.findFirst({ where: { email } })

    const lead = existingLead
      ? await db.lead.update({
          where: { id: existingLead.id },
          data: { name, phone },
        })
      : await db.lead.create({
          data: { name, email, phone, source: "CONTACT" },
        })

    if (process.env.RESEND_API_KEY) {
      await sendEmail({
        to: email,
        subject: "Thanks for reaching out - Unitide Educations",
        html: `<p>Hi ${name},</p><p>Thanks for your interest in Unitide Educations. Our team will get back to you within 24 hours.</p><p>Best,<br/>The Unitide Team</p>`,
      })
    }

    return NextResponse.json({ success: true, leadId: lead.id })
  } catch (error) {
    console.error("[Lead API]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
