import { getServerSession } from "next-auth"
import { redirect, notFound } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { EngagementStatusBadge } from "@/components/portal/engagement-status-badge"
import { ProgressTimeline } from "@/components/portal/progress-timeline"
import { DocumentList } from "@/components/portal/document-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

export default async function EngagementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/login")

  const engagement = await db.engagement.findFirst({
    where: { id, clientId: session.user.id },
    include: { documents: true },
  })

  if (!engagement) notFound()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ink">{engagement.title}</h1>
            <p className="text-ink-light mt-1">
              {engagement.pillar} &middot; Started{" "}
              {format(new Date(engagement.startDate), "MMM d, yyyy")}
            </p>
          </div>
          <EngagementStatusBadge status={engagement.status} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressTimeline currentStatus={engagement.status} />
        </CardContent>
      </Card>

      {engagement.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-ink-light whitespace-pre-wrap">{engagement.notes}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Documents</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DocumentList
            documents={engagement.documents.map((d) => ({
              ...d,
              uploadedAt: d.uploadedAt,
              engagementTitle: undefined,
            }))}
          />
        </CardContent>
      </Card>

      {engagement.targetDate && (
        <Card>
          <CardContent className="py-4 flex items-center justify-between">
            <span className="text-sm font-medium text-ink">Target Completion</span>
            <span className="text-sm text-ink-light">
              {format(new Date(engagement.targetDate), "MMMM d, yyyy")}
            </span>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
