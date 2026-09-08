"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScoreReportCard } from "./score-report-card"

const questions = [
  {
    id: "q1",
    category: "policy",
    question: "Do you have a formal internationalization policy?",
    options: ["No", "In development", "Yes", "Comprehensive & reviewed annually"],
  },
  {
    id: "q2",
    category: "partnerships",
    question: "How many active MoUs do you have with foreign institutions?",
    options: ["None", "1-3", "4-7", "8 or more"],
  },
  {
    id: "q3",
    category: "accreditation",
    question: "What is your current accreditation status?",
    options: ["Not yet applied", "Applied, awaiting", "NAAC/NBA accredited", "NAAC A grade or above"],
  },
  {
    id: "q4",
    category: "faculty",
    question: "Do you have faculty exchange programs?",
    options: ["None", "Planned", "Active with 1-2 partners", "Active with multiple partners"],
  },
  {
    id: "q5",
    category: "budget",
    question: "Do you have a dedicated budget for internationalization?",
    options: ["None", "Partial / ad hoc", "Substantial annual budget", "Dedicated center with budget"],
  },
  {
    id: "q6",
    category: "leadership",
    question: "What is the leadership commitment level to internationalization?",
    options: ["Neutral", "Supportive", "Champion", "International office with mandate"],
  },
  {
    id: "q7",
    category: "faculty",
    question: "What is your international student enrollment trend?",
    options: ["None", "Stable (flat)", "Growing", "Significant growth year-on-year"],
  },
  {
    id: "q8",
    category: "partnerships",
    question: "Do you have a credit transfer framework?",
    options: ["None", "Working on it", "Established for select partners", "Full ABC integration"],
  },
  {
    id: "q9",
    category: "policy",
    question: "Do you participate in global ranking systems?",
    options: ["No", "Planning to", "Yes, submitted data", "Ranked in top tiers"],
  },
  {
    id: "q10",
    category: "leadership",
    question: "Do you have a technology platform for international collaboration?",
    options: ["None", "Partial (email-based)", "Yes (LMS + video)", "Integrated platform"],
  },
]

interface LeadInfo {
  name: string
  email: string
  phone?: string
}

interface ScoreResult {
  score: number
  band: string
  subScores: Record<string, number>
  submissionId: string
}

export function ReadinessQuiz() {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [lead, setLead] = useState<LeadInfo | null>(null)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [result, setResult] = useState<ScoreResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const question = questions[currentQ]
  const isLastQuestion = currentQ === questions.length - 1
  const allAnswered = Object.keys(answers).length === questions.length

  function handleAnswer(value: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
  }

  function handleNext() {
    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1)
    }
  }

  function handlePrev() {
    if (currentQ > 0) {
      setCurrentQ((prev) => prev - 1)
    }
  }

  function handleFinish() {
    if (allAnswered) {
      setShowLeadForm(true)
    }
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = (formData.get("phone") as string) || undefined

    setLead({ name, email, phone })
    setLoading(true)
    setError("")

    try {
      const answersArray = Object.entries(answers).map(([questionId, value]) => ({
        questionId,
        value,
      }))

      const res = await fetch("/api/readiness-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: answersArray,
          lead: { name, email, phone },
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to calculate score")
      }

      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (result && lead) {
    return <ScoreReportCard result={result} leadName={lead.name} />
  }

  if (showLeadForm) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Get Your Full Report</CardTitle>
          <p className="text-sm text-ink-light">
            Enter your details to receive your detailed readiness report.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLeadSubmit} className="space-y-4">
            {error && (
              <div className="bg-danger/10 text-danger text-sm px-4 py-2.5 rounded-lg">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="lead-name" className="block text-sm font-medium text-ink mb-1.5">
                Full Name
              </label>
              <input
                id="lead-name"
                name="name"
                type="text"
                required
                className="w-full px-3 py-2 border border-surface-alt rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="lead-email" className="block text-sm font-medium text-ink mb-1.5">
                Email Address
              </label>
              <input
                id="lead-email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-surface-alt rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="lead-phone" className="block text-sm font-medium text-ink mb-1.5">
                Phone (optional)
              </label>
              <input
                id="lead-phone"
                name="phone"
                type="tel"
                className="w-full px-3 py-2 border border-surface-alt rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Calculating..." : "Get My Score"}
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-ink-light">
            Question {currentQ + 1} of {questions.length}
          </span>
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {question.category}
          </span>
        </div>
        <div className="w-full bg-surface-alt rounded-full h-1.5">
          <div
            className="bg-accent h-1.5 rounded-full transition-all"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
        <CardTitle className="text-lg mt-4">{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
                answers[question.id] === idx
                  ? "border-accent bg-accent/10 text-ink"
                  : "border-surface-alt bg-white text-ink hover:border-primary/30 hover:bg-surface"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-surface-alt">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={currentQ === 0}
          >
            Back
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={handleFinish}
              disabled={!allAnswered}
            >
              Get Score
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={answers[question.id] === undefined}
            >
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
