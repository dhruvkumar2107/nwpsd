import type { Metadata } from "next"
import { ReadinessQuiz } from "@/components/tools/readiness-quiz"

export const metadata: Metadata = {
  title: "Internationalization Readiness Score | Unitide Educations",
  description:
    "Assess your institution's readiness for internationalization with our comprehensive 10-question readiness quiz.",
}

export default function ReadinessScorePage() {
  return (
    <div className="min-h-screen bg-surface py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-ink">Internationalization Readiness Score</h1>
          <p className="text-ink-light mt-2 max-w-xl mx-auto">
            Answer 10 quick questions to evaluate your institution&apos;s preparedness for
            internationalization and receive a personalized readiness report.
          </p>
        </div>
        <ReadinessQuiz />
      </div>
    </div>
  )
}
