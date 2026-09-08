export type UserRole = "ADMIN" | "CLIENT"

export type EngagementStatus =
  | "DISCOVERY"
  | "STRATEGY"
  | "MOU_DRAFTING"
  | "REGULATORY_FILING"
  | "APPROVED"
  | "LIVE"

export type LeadSource = "READINESS_SCORE" | "CONTACT" | "NEWSLETTER"

export interface Pillar {
  slug: string
  title: string
  description: string
  icon: string
}

export interface CaseStudy {
  slug: string
  title: string
  client: string
  country: string
  programType: string
  metric: string
  outcome: string
  coverImage?: string
}

export interface Insight {
  slug: string
  title: string
  excerpt: string
  tags: string[]
  readingTime: string
  publishedAt: string
  author: string
}

export interface Regulation {
  id: string
  title: string
  summary: string
  effectiveDate: string
  authority: string
  tags: string[]
  whyItMatters: string
}

export interface ReadinessAnswer {
  questionId: string
  value: number
}

export interface ReadinessResult {
  score: number
  band: "Beginner" | "Developing" | "Advanced" | "Leading"
  subScores: {
    policy: number
    partnerships: number
    accreditation: number
    faculty: number
    budget: number
    leadership: number
  }
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
