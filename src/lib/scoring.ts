import { ReadinessAnswer, ReadinessResult } from "@/types"

const WEIGHTS = {
  policy: 0.2,
  partnerships: 0.2,
  accreditation: 0.15,
  faculty: 0.15,
  budget: 0.15,
  leadership: 0.15,
}

const QUESTION_CATEGORIES: Record<string, keyof typeof WEIGHTS> = {
  q1: "policy",
  q2: "policy",
  q3: "partnerships",
  q4: "partnerships",
  q5: "accreditation",
  q6: "accreditation",
  q7: "faculty",
  q8: "faculty",
  q9: "budget",
  q10: "leadership",
}

export function calculateScore(answers: ReadinessAnswer[]): ReadinessResult {
  const categoryTotals: Record<string, { sum: number; count: number }> = {
    policy: { sum: 0, count: 0 },
    partnerships: { sum: 0, count: 0 },
    accreditation: { sum: 0, count: 0 },
    faculty: { sum: 0, count: 0 },
    budget: { sum: 0, count: 0 },
    leadership: { sum: 0, count: 0 },
  }

  for (const answer of answers) {
    const category = QUESTION_CATEGORIES[answer.questionId]
    if (category) {
      categoryTotals[category].sum += answer.value
      categoryTotals[category].count += 1
    }
  }

  const subScores = {
    policy: 0,
    partnerships: 0,
    accreditation: 0,
    faculty: 0,
    budget: 0,
    leadership: 0,
  }

  for (const [key, val] of Object.entries(categoryTotals)) {
    if (val.count > 0) {
      subScores[key as keyof typeof subScores] = Math.round(
        (val.sum / (val.count * 4)) * 100
      )
    }
  }

  const weightedScore = Math.round(
    subScores.policy * WEIGHTS.policy +
      subScores.partnerships * WEIGHTS.partnerships +
      subScores.accreditation * WEIGHTS.accreditation +
      subScores.faculty * WEIGHTS.faculty +
      subScores.budget * WEIGHTS.budget +
      subScores.leadership * WEIGHTS.leadership
  )

  const score = Math.min(100, Math.max(0, weightedScore))

  let band: ReadinessResult["band"]
  if (score >= 75) band = "Leading"
  else if (score >= 50) band = "Advanced"
  else if (score >= 25) band = "Developing"
  else band = "Beginner"

  return { score, band, subScores }
}
