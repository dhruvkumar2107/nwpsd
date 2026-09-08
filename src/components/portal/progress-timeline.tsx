import { clsx } from "clsx"
import { Check } from "lucide-react"
import type { EngagementStatus } from "@/types"

const phases: { status: EngagementStatus; label: string }[] = [
  { status: "DISCOVERY", label: "Discovery" },
  { status: "STRATEGY", label: "Strategy" },
  { status: "MOU_DRAFTING", label: "MOU Drafting" },
  { status: "REGULATORY_FILING", label: "Regulatory Filing" },
  { status: "APPROVED", label: "Approved" },
  { status: "LIVE", label: "Live" },
]

const statusIndex: Record<EngagementStatus, number> = {
  DISCOVERY: 0,
  STRATEGY: 1,
  MOU_DRAFTING: 2,
  REGULATORY_FILING: 3,
  APPROVED: 4,
  LIVE: 5,
}

export function ProgressTimeline({ currentStatus }: { currentStatus: string }) {
  const currentIdx = statusIndex[currentStatus as EngagementStatus] ?? 0

  return (
    <div className="flex items-center w-full">
      {phases.map((phase, idx) => {
        const isCompleted = idx < currentIdx
        const isCurrent = idx === currentIdx

        return (
          <div key={phase.status} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  "h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-colors",
                  isCompleted && "bg-primary border-primary text-white",
                  isCurrent && "border-accent bg-accent/10 text-accent",
                  !isCompleted && !isCurrent && "border-surface-alt bg-white text-ink-light"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : idx + 1}
              </div>
              <span
                className={clsx(
                  "text-xs mt-1.5 font-medium whitespace-nowrap",
                  isCurrent ? "text-accent" : isCompleted ? "text-primary" : "text-ink-light"
                )}
              >
                {phase.label}
              </span>
            </div>
            {idx < phases.length - 1 && (
              <div
                className={clsx(
                  "h-0.5 flex-1 mx-2 mt-[-18px]",
                  idx < currentIdx ? "bg-primary" : "bg-surface-alt"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
