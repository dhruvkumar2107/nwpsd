import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash("demo1234", 12)

  const admin = await prisma.user.upsert({
    where: { email: "admin@unitide.in" },
    update: {},
    create: {
      email: "admin@unitide.in",
      passwordHash,
      name: "Admin User",
      role: "ADMIN",
    },
  })

  const client = await prisma.user.upsert({
    where: { email: "demo@university.edu" },
    update: {},
    create: {
      email: "demo@university.edu",
      passwordHash,
      name: "Dr. Priya Sharma",
      role: "CLIENT",
    },
  })

  const engagement1 = await prisma.engagement.upsert({
    where: { id: "demo-engagement-1" },
    update: {},
    create: {
      id: "demo-engagement-1",
      clientId: client.id,
      title: "NAAC Accreditation Preparation",
      pillar: "accreditation-support",
      status: "STRATEGY",
      startDate: new Date("2026-01-15"),
      targetDate: new Date("2026-06-30"),
      notes: "Working on Criterion 1-5 documentation for NAAC submission.",
    },
  })

  const engagement2 = await prisma.engagement.upsert({
    where: { id: "demo-engagement-2" },
    update: {},
    create: {
      id: "demo-engagement-2",
      clientId: client.id,
      title: "MoU with University of Melbourne",
      pillar: "mou-compliance",
      status: "MOU_DRAFTING",
      startDate: new Date("2026-03-01"),
      targetDate: new Date("2026-08-15"),
      notes: "Drafting MoU for student exchange and faculty collaboration program.",
    },
  })

  await prisma.document.createMany({
    data: [
      {
        engagementId: engagement1.id,
        name: "NAAC Self-Study Report Draft",
        url: "/documents/naac-ssr-draft.pdf",
        type: "PDF",
      },
      {
        engagementId: engagement1.id,
        name: "Criterion 1 - Curricular Aspects",
        url: "/documents/criterion-1.pdf",
        type: "PDF",
      },
      {
        engagementId: engagement2.id,
        name: "MoU Draft - University of Melbourne",
        url: "/documents/mou-melbourne-draft.pdf",
        type: "PDF",
      },
      {
        engagementId: engagement2.id,
        name: "Collaboration Framework Document",
        url: "/documents/collaboration-framework.docx",
        type: "DOCX",
      },
    ],
  })

  console.log("Seed completed:", { admin: admin.email, client: client.email })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
