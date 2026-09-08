import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const subscribers = await db.subscriber.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ success: true, subscribers })
  } catch (error) {
    console.error("[Admin Subscribers GET]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
