import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { PortalSidebar } from "@/components/portal/portal-sidebar"

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-surface">
      <PortalSidebar user={session.user} />
      <main className="ml-64 p-8">{children}</main>
    </div>
  )
}
