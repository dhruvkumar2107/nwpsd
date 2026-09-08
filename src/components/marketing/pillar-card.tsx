import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Pillar } from "@/types";

const iconMap: Record<string, string> = {
  Globe: "🌍",
  FileCheck: "📋",
  Award: "🏆",
  Megaphone: "📢",
  Building2: "🏛️",
};

interface PillarCardProps {
  pillar: Pillar;
}

export function PillarCard({ pillar }: PillarCardProps) {
  return (
    <Link href={`/what-we-do/${pillar.slug}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="mb-2 text-3xl">{iconMap[pillar.icon] || "📚"}</div>
          <CardTitle>{pillar.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-ink-light">{pillar.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
