import { Hero } from "@/components/marketing/hero";
import { CTASection } from "@/components/marketing/cta-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const phases = [
  {
    phase: 1,
    title: "Discovery",
    duration: "2-4 weeks",
    description: "We conduct a thorough institutional audit, assessing your current internationalization footprint, existing partnerships, regulatory standing, and strategic goals.",
    activities: ["Institutional audit", "Stakeholder interviews", "Regulatory gap analysis", "Benchmark assessment"],
  },
  {
    phase: 2,
    title: "Strategy",
    duration: "4-6 weeks",
    description: "Based on the audit, we develop a tailored roadmap with clear milestones, resource requirements, and KPIs aligned with NAAC and NIRF parameters.",
    activities: ["Strategic roadmap", "Partner matching", "Budget planning", "Timeline development"],
  },
  {
    phase: 3,
    title: "Drafting & Filing",
    duration: "6-8 weeks",
    description: "Our team handles all documentation—from MoU drafting to regulatory submissions—ensuring full compliance with UGC and AICTE requirements.",
    activities: ["MoU drafting", "Regulatory submissions", "Credit framework design", "Compliance review"],
  },
  {
    phase: 4,
    title: "Approval",
    duration: "8-12 weeks",
    description: "We manage the regulatory approval process, respond to queries, and ensure all requirements are met for successful partnership launch.",
    activities: ["Regulatory follow-up", "Query response", "Compliance verification", "Final approval"],
  },
  {
    phase: 5,
    title: "Launch & Support",
    duration: "Ongoing",
    description: "Post-approval, we provide operational guidance, monitoring dashboards, and ongoing compliance support to ensure partnership success.",
    activities: ["Operations setup", "Performance monitoring", "Annual compliance", "Renewal management"],
  },
];

const faqs = [
  {
    question: "How long does the typical internationalization engagement take?",
    answer: "A typical engagement from initial consultation to signed MoU takes 4-6 months. However, the timeline varies based on the complexity of the partnership type, regulatory requirements, and the institution's existing infrastructure. Simple faculty exchange agreements can be completed in 8-10 weeks, while twinning programs or FHEI setups may take 12-18 months.",
  },
  {
    question: "Do you work with both public and private institutions?",
    answer: "Yes, we work with all types of Indian higher education institutions—state universities, deemed universities, private institutions, and autonomous colleges. Our regulatory expertise spans both UGC and AICTE frameworks, and we understand the unique compliance requirements for each institutional type.",
  },
  {
    question: "What regulatory approvals are needed for international partnerships?",
    answer: "The regulatory pathway depends on the partnership type. Most MoUs require only intimation to UGC under the Academic Collaboration Regulations 2022. However, twinning programs and dual-degree arrangements may require prior UGC approval. AICTE notification is needed for professional programs. State university partnerships often require state higher education council approval. We guide you through the exact requirements.",
  },
  {
    question: "How do you ensure MoU compliance with UGC regulations?",
    answer: "Every MoU we draft is reviewed against the complete UGC Academic Collaboration Regulations 2022 framework, including mandatory provisions for credit transfer, fee structures, student grievance redressal, intellectual property, and dispute resolution. We maintain updated templates that reflect the latest regulatory amendments and state-level requirements.",
  },
  {
    question: "What ongoing support do you provide after the partnership launches?",
    answer: "We provide comprehensive post-launch support including compliance monitoring dashboards, annual MoU review cycles, regulatory filing assistance for renewals, and performance tracking against partnership KPIs. Our clients also receive priority access to our regulatory update briefings and quarterly compliance webinars.",
  },
  {
    question: "Can you help with NAAC internationalization criteria?",
    answer: "Absolutely. Our accreditation support pillar specifically addresses NAAC Criterion 3 (Research, Innovation & Consultancy) and Criterion 5 (Student Support & Progression), which include internationalization metrics. We help institutions document international partnerships, credit transfer frameworks, and student mobility outcomes—all critical for NAAC scoring.",
  },
  {
    question: "What is your fee structure?",
    answer: "Our fees vary based on engagement scope and institutional size. We offer fixed-fee packages for specific deliverables (MoU drafting, accreditation support) and retainer-based models for ongoing advisory. Every engagement begins with a free initial consultation where we provide a transparent fee proposal. We also offer discounted rates for government-aided institutions.",
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <Hero
        headline="How We Work"
        subhead="A structured, five-phase approach from initial discovery to successful partnership launch."
        primaryCta={{ label: "Start Your Journey", href: "/contact" }}
        secondaryCta={{ label: "See Our Results", href: "/case-studies" }}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">Our Five-Phase Process</h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-light">
            Every engagement follows a proven methodology that minimizes risk and maximizes outcomes.
          </p>

          <div className="mt-12 space-y-8">
            {phases.map((phase) => (
              <Card key={phase.phase} className="overflow-visible">
                <div className="flex flex-col gap-6 p-6 sm:flex-row">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                    {phase.phase}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold text-ink">{phase.title}</h3>
                      <Badge variant="outline">{phase.duration}</Badge>
                    </div>
                    <p className="mt-2 text-ink-light">{phase.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {phase.activities.map((activity) => (
                        <Badge key={activity} variant="default">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">Frequently Asked Questions</h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-base">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-ink-light">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to Start?"
        subhead="Book a free consultation to discuss your institution's internationalization goals."
        ctaLabel="Book a Consultation"
        ctaHref="/contact"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
