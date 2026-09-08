import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { EngagementStatusBadge } from "@/components/portal/engagement-status-badge"
import { ProgressTimeline } from "@/components/portal/progress-timeline"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/login")

  const engagements = await db.engagement.findMany({
    where: { clientId: session.user.id },
    include: { documents: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
        <p className="text-ink-light mt-1">Overview of your engagements with Unitide</p>
      </div>

      {engagements.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-ink-light">No engagements yet. Contact us to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {engagements.map((engagement) => (
            <Link key={engagement.id} href={`/portal/engagements/${engagement.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{engagement.title}</CardTitle>
                      <p className="text-sm text-ink-light mt-1">
                        {engagement.pillar} &middot; Started{" "}
                        {format(new Date(engagement.startDate), "MMM d, yyyy")}
                      </p>
                    </div>
                    <EngagementStatusBadge status={engagement.status} />
                  </div>
                </CardHeader>
                <CardContent>
                  <ProgressTimeline currentStatus={engagement.status} />
                  <div className="flex items-center gap-4 mt-4 text-sm text-ink-light">
                    <span>{engagement.documents.length} documents</span>
                    {engagement.targetDate && (
                      <span>Target: {format(new Date(engagement.targetDate), "MMM d, yyyy")}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
