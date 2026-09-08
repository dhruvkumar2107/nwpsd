import type { Metadata } from "next"
import { RegTrackerTable } from "@/components/tools/reg-tracker-table"
import regulationsData from "@/content/regulations/regulations.json"
import type { Regulation } from "@/types"

export const metadata: Metadata = {
  title: "Regulation Tracker | Unitide Educations",
  description:
    "Stay up to date with UGC, AICTE, and state regulations affecting higher education internationalization in India.",
}

export default function RegulationTrackerPage() {
  const regulations = regulationsData as Regulation[]

  return (
    <div className="min-h-screen bg-surface py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-ink">Regulation Tracker</h1>
          <p className="text-ink-light mt-2 max-w-xl mx-auto">
            Monitor the latest UGC, AICTE, and state-level regulations that impact
            institutional internationalization.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-surface-alt shadow-sm p-6">
          <RegTrackerTable data={regulations} />
        </div>
      </div>
    </div>
  )
}
