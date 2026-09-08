"use client";

import { useEffect, useRef, useState } from "react";

interface StatsCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export default function StatsCounter({
  value,
  suffix = "",
  label,
}: StatsCounterProps) {
  const [display, setDisplay] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCount();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCount = () => {
    const duration = 2000;
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-[#c8a44e] tabular-nums">
        {display.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-sm md:text-base font-medium text-[#0a1628]/70">
        {label}
      </p>
    </div>
  );
}
