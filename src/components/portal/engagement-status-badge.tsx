import { clsx } from "clsx"
import type { EngagementStatus } from "@/types"

const statusConfig: Record<EngagementStatus, { label: string; color: string }> = {
  DISCOVERY: { label: "Discovery", color: "bg-blue-100 text-blue-800" },
  STRATEGY: { label: "Strategy", color: "bg-yellow-100 text-yellow-800" },
  MOU_DRAFTING: { label: "MOU Drafting", color: "bg-purple-100 text-purple-800" },
  REGULATORY_FILING: { label: "Regulatory Filing", color: "bg-orange-100 text-orange-800" },
  APPROVED: { label: "Approved", color: "bg-green-100 text-green-800" },
  LIVE: { label: "Live", color: "bg-emerald-100 text-emerald-800" },
}

export function EngagementStatusBadge({ status }: { status: string }) {
  const config = statusConfig[status as EngagementStatus] || {
    label: status,
    color: "bg-gray-100 text-gray-800",
  }

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.color
      )}
    >
      {config.label}
    </span>
  )
}
