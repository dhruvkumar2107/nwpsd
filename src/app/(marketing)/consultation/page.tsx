import type { Metadata } from "next";
import { Shield, Award, Users, Globe, CheckCircle2 } from "lucide-react";
import ConsultationWizard from "@/components/marketing/consultation-wizard";

export const metadata: Metadata = {
  title: "Free Consultation | Unitide Educations",
  description:
    "Get a personalized growth strategy for your educational institution. Take our quick assessment and schedule a free consultation with our experts.",
};

const TRUST_ITEMS = [
  {
    icon: Shield,
    title: "Confidential & Secure",
    description:
      "Your information is protected under strict NDAs. We never share institutional data with third parties.",
  },
  {
    icon: Award,
    title: "15+ Years Experience",
    description:
      "Our team has guided 500+ institutions through accreditation, growth, and international expansion.",
  },
  {
    icon: Users,
    title: "Dedicated Advisor",
    description:
      "You'll be matched with a senior consultant who specializes in your institution's specific needs.",
  },
  {
    icon: Globe,
    title: "Pan-India & Global Reach",
    description:
      "From tier-1 cities to rural institutions, and partners across 30+ countries worldwide.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Complete the Assessment",
    description: "Answer a few quick questions about your institution and goals.",
  },
  {
    step: "02",
    title: "Receive Your Snapshot",
    description: "Get a tailored summary of recommended service areas instantly.",
  },
  {
    step: "03",
    title: "Book a Free Call",
    description:
      "Schedule a no-obligation consultation with a senior education consultant.",
  },
  {
    step: "04",
    title: "Start Your Journey",
    description:
      "Receive a custom roadmap and begin your institution's transformation.",
  },
];

export default function ConsultationPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0]">
      {/* Hero */}
      <section className="relative bg-[#0a1628] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(200,164,78,0.08),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c8a44e]/15 text-[#c8a44e] text-sm font-medium mb-6 border border-[#c8a44e]/20">
            <CheckCircle2 className="w-4 h-4" />
            Free — No Obligation
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Your Institution Deserves
            <br />
            <span className="text-[#c8a44e]">a Clear Path Forward</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Answer four quick questions and receive a personalized growth
            snapshot — recommended strategies, accreditation guidance, and a
            roadmap tailored to your institution&apos;s unique stage and
            ambitions.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <p className="text-center text-sm font-semibold text-[#c8a44e] uppercase tracking-wider mb-3">
          How It Works
        </p>
        <h2 className="text-center text-2xl md:text-3xl font-bold text-[#0a1628] mb-12">
          Four Simple Steps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#c8a44e]/10 border border-[#c8a44e]/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-[#c8a44e]">
                  {item.step}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[#0a1628] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#0a1628]/60 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Wizard */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <ConsultationWizard />
      </section>

      {/* Trust */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20 border-t border-[#0a1628]/8">
        <p className="text-center text-sm font-semibold text-[#c8a44e] uppercase tracking-wider mb-3">
          Why Unitide Educations
        </p>
        <h2 className="text-center text-2xl md:text-3xl font-bold text-[#0a1628] mb-12">
          Trusted by Institutions Across India
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 border border-[#0a1628]/5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#c8a44e]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#c8a44e]" />
                </div>
                <h3 className="text-base font-semibold text-[#0a1628] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#0a1628]/55 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-[#0a1628] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-lg md:text-xl text-white/70 italic leading-relaxed mb-6">
            &ldquo;Unitide Educations helped us achieve NAAC A+ accreditation in the
            first attempt. Their strategic roadmap was instrumental in aligning
            our processes with the highest standards.&rdquo;
          </p>
          <div>
            <p className="font-semibold text-white">
              Dr. Rajesh Kumar, Vice Chancellor
            </p>
            <p className="text-sm text-white/40 mt-1">
              National Institute of Technology, Bhopal
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
