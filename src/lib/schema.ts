import { z } from "zod"

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  institution: z.string().min(2, "Institution name is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ContactFormData = z.infer<typeof ContactFormSchema>

export const LeadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
})

export type LeadFormData = z.infer<typeof LeadFormSchema>

export const ReadinessAnswersSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string(),
      value: z.number().min(0).max(4),
    })
  ),
  lead: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
  }),
})

export type ReadinessSubmissionData = z.infer<typeof ReadinessAnswersSchema>
