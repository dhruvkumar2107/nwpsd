import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  headline?: string;
  subhead?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function CTASection({
  headline = "Ready to Transform Your Institution?",
  subhead = "Schedule a free consultation with our internationalization experts.",
  ctaLabel = "Get Started",
  ctaHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="bg-accent py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{headline}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{subhead}</p>
        <div className="mt-8">
          <Button asChild variant="primary" size="lg">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
