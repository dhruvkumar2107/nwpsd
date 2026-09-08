import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { DocumentList } from "@/components/portal/document-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DocumentsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/login")

  const engagements = await db.engagement.findMany({
    where: { clientId: session.user.id },
    include: { documents: true },
  })

  const allDocuments = engagements.flatMap((e) =>
    e.documents.map((d) => ({
      ...d,
      uploadedAt: d.uploadedAt,
      engagementTitle: e.title,
    }))
  )

  const sortedDocuments = allDocuments.sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  )

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink">Documents</h1>
        <p className="text-ink-light mt-1">
          All documents across your engagements ({sortedDocuments.length} total)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Documents</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DocumentList documents={sortedDocuments} />
        </CardContent>
      </Card>
    </div>
  )
}
