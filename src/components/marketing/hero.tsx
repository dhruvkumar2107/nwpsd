import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroProps {
  headline: string;
  subhead: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function Hero({
  headline,
  subhead,
  primaryCta = { label: "Get Started", href: "/contact" },
  secondaryCta = { label: "See How We Work", href: "/how-we-work" },
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark py-20 sm:py-28">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mt-6 text-lg text-white/80 sm:text-xl">{subhead}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="accent" size="lg">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="border border-white/20 text-white hover:bg-white/10">
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
    </section>
  );
}
