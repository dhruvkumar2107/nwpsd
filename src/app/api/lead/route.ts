import { NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"
import { sendEmail } from "@/lib/email"

const LeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  institution: z.string().optional(),
  serviceInterest: z.string().optional(),
  message: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = LeadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, phone, institution, serviceInterest, message } = parsed.data

    const existingLead = await db.lead.findFirst({ where: { email } })

    const lead = existingLead
      ? await db.lead.update({
          where: { id: existingLead.id },
          data: { name, phone, company: institution, serviceInterest, message },
        })
      : await db.lead.create({
          data: { name, email, phone, company: institution, serviceInterest, message, source: "CONTACT" },
        })

    if (process.env.RESEND_API_KEY) {
      await sendEmail({
        to: email,
        subject: "Thanks for reaching out - Unitide Educations",
        html: `<p>Hi ${name},</p><p>Thanks for your interest in Unitide Educations. Our team will get back to you within 24 hours.</p><p>Best,<br/>The Unitide Educations Team</p>`,
      })
    }

    return NextResponse.json({ success: true, leadId: lead.id })
  } catch (error) {
    console.error("[Lead API]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
