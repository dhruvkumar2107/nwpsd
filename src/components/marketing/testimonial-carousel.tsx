"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  institution: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Unitide transformed our approach to international partnerships. Their understanding of UGC regulations saved us months of compliance headaches.",
    author: "Dr. Priya Sharma",
    role: "Pro-Vice-Chancellor",
    institution: "University of Delhi",
  },
  {
    quote: "The twinning program they helped us launch is now our most sought-after international pathway. 92% student progression rate speaks for itself.",
    author: "Dr. Rajesh Kumar",
    role: "Director, International Affairs",
    institution: "Somaiya Vidyavihar University",
  },
  {
    quote: "Our NAAC A++ accreditation wouldn't have been possible without Unitide's structured approach to documentation and mock assessments.",
    author: "Dr. Meera Patel",
    role: "IQAC Director",
    institution: "Manipal Academy of Higher Education",
  },
];

export function TestimonialCarousel() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-ink sm:text-4xl">
          What Our Clients Say
        </h2>
        <div className="mt-12">
          <Card className="mx-auto max-w-3xl">
            <CardContent className="p-8">
              <blockquote className="text-lg text-ink-light italic">
                &ldquo;{testimonials[active].quote}&rdquo;
              </blockquote>
              <div className="mt-6">
                <div className="font-semibold text-ink">{testimonials[active].author}</div>
                <div className="text-sm text-ink-light">
                  {testimonials[active].role}, {testimonials[active].institution}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === active ? "bg-primary" : "bg-surface-alt"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
