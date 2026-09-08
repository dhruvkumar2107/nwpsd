"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts"

interface ScoreResult {
  score: number
  band: string
  subScores: Record<string, number>
}

const bandColors: Record<string, { bg: string; text: string; border: string }> = {
  Leading: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  Advanced: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  Developing: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  Beginner: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
}

export function ScoreReportCard({
  result,
  leadName,
}: {
  result: ScoreResult
  leadName: string
}) {
  const bandStyle = bandColors[result.band] || bandColors.Beginner

  const chartData = Object.entries(result.subScores).map(([key, value]) => ({
    category: key.charAt(0).toUpperCase() + key.slice(1),
    score: value,
    fullMark: 100,
  }))

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <p className="text-sm text-ink-light">Hi {leadName}, here&apos;s your score</p>
          <div className="mt-2">
            <span className="text-5xl font-bold text-primary">{result.score}</span>
            <span className="text-lg text-ink-light">/100</span>
          </div>
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${bandStyle.bg} ${bandStyle.text} ${bandStyle.border} mt-2`}
          >
            {result.band}
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="#eef1f6" />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 12, fill: "#1a1a2e" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#e8a838"
                  fill="#e8a838"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {Object.entries(result.subScores).map(([key, value]) => (
              <div key={key} className="text-center p-3 bg-surface rounded-lg">
                <p className="text-xs text-ink-light capitalize">{key}</p>
                <p className="text-lg font-semibold text-ink">{value}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-4 text-center">
          <p className="text-sm text-ink-light mb-3">
            Want a personalized action plan? Our team can help you improve your score.
          </p>
          <Button asChild>
            <a href="/contact">Talk to an Expert</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
