import { NextResponse } from "next/server"
import { ReadinessAnswersSchema } from "@/lib/schema"
import { db } from "@/lib/db"
import { calculateScore } from "@/lib/scoring"
import { sendEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = ReadinessAnswersSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { answers, lead } = parsed.data

    const existingLead = await db.lead.findFirst({ where: { email: lead.email } })

    const dbLead = existingLead
      ? await db.lead.update({
          where: { id: existingLead.id },
          data: { name: lead.name, phone: lead.phone },
        })
      : await db.lead.create({
          data: {
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            source: "READINESS_SCORE",
          },
        })

    const result = calculateScore(answers)

    const submission = await db.readinessSubmission.create({
      data: {
        leadId: dbLead.id,
        answers: JSON.stringify(answers),
        score: result.score,
        band: result.band,
      },
    })

    if (process.env.RESEND_API_KEY) {
      await sendEmail({
        to: lead.email,
        subject: `Your Internationalization Readiness Score: ${result.score}/100`,
        html: `<p>Hi ${lead.name},</p><p>Your internationalization readiness score is <strong>${result.score}/100</strong> (Band: ${result.band}).</p><p>Here's your breakdown:</p><ul><li>Policy: ${result.subScores.policy}%</li><li>Partnerships: ${result.subScores.partnerships}%</li><li>Accreditation: ${result.subScores.accreditation}%</li><li>Faculty: ${result.subScores.faculty}%</li><li>Budget: ${result.subScores.budget}%</li><li>Leadership: ${result.subScores.leadership}%</li></ul><p>Best,<br/>The Unitide Team</p>`,
      })
    }

    return NextResponse.json({
      score: result.score,
      band: result.band,
      subScores: result.subScores,
      submissionId: submission.id,
    })
  } catch (error) {
    console.error("[Readiness Score API]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
