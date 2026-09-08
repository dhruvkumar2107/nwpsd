import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

interface SendEmailParams {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail({
  to,
  subject,
  html,
  from = "Unitide Educations <noreply@unitide.in>",
}: SendEmailParams) {
  if (!resend) {
    console.log("[Email] Resend API key not configured. Skipping email send.")
    console.log("[Email] Would have sent:", { to, subject })
    return { success: true, skipped: true }
  }

  try {
    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
    })
    return { success: true, data: result }
  } catch (error) {
    console.error("[Email] Failed to send:", error)
    return { success: false, error }
  }
}
