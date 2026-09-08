"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  GraduationCap,
  Briefcase,
  School,
  Users,
  Landmark,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    title: "What type of institution are you?",
    options: [
      { label: "University", icon: GraduationCap },
      { label: "College", icon: Building2 },
      { label: "Professional Institute", icon: Briefcase },
      { label: "School", icon: School },
      { label: "Corporate Training", icon: Users },
      { label: "Government Body", icon: Landmark },
    ],
  },
  {
    title: "What stage is your institution at?",
    options: [
      { label: "Planning Phase", icon: Building2 },
      { label: "Newly Established (0-3 years)", icon: School },
      { label: "Growing (3-10 years)", icon: GraduationCap },
      { label: "Established (10+ years)", icon: Landmark },
      { label: "Seeking Accreditation", icon: Briefcase },
      { label: "International Expansion", icon: Users },
    ],
  },
  {
    title: "What is your biggest challenge?",
    options: [
      { label: "Student Enrollment", icon: Users },
      { label: "Faculty Quality", icon: GraduationCap },
      { label: "Accreditation", icon: CheckCircle2 },
      { label: "International Partnerships", icon: Building2 },
      { label: "Regulatory Compliance", icon: Landmark },
      { label: "Brand Building", icon: Sparkles },
      { label: "Research Output", icon: Briefcase },
      { label: "Digital Transformation", icon: School },
    ],
  },
  {
    title: "What outcome are you targeting?",
    options: [
      { label: "Increased Enrollment", icon: Users },
      { label: "NAAC/NIRF Accreditation", icon: CheckCircle2 },
      { label: "International Collaborations", icon: Building2 },
      { label: "NEP 2020 Compliance", icon: Landmark },
      { label: "Better Placements", icon: Briefcase },
      { label: "Research Grants", icon: GraduationCap },
      { label: "Institutional Ranking", icon: Sparkles },
      { label: "Global Recognition", icon: School },
    ],
  },
];

const SERVICE_MAP: Record<string, string[]> = {
  "Student Enrollment": [
    "Student Recruitment Strategy",
    "Enrollment Marketing",
    "Digital Admissions Funnel",
  ],
  "Faculty Quality": [
    "Faculty Development Programs",
    "Recruitment Advisory",
    "Teaching Excellence Frameworks",
  ],
  Accreditation: [
    "NAAC Accreditation Support",
    "NIRF Ranking Strategy",
    "Quality Assurance Consulting",
  ],
  "International Partnerships": [
    "Global Collaborations",
    "Twining Program Design",
    "International Student Recruitment",
  ],
  "Regulatory Compliance": [
    "UGC/UGC Compliance",
    "NEP 2020 Implementation",
    "Governance Advisory",
  ],
  "Brand Building": [
    "Institutional Branding",
    "Digital Marketing Strategy",
    "Reputation Management",
  ],
  "Research Output": [
    "Research Strategy Consulting",
    "Grant Writing Support",
    "Publication Strategy",
  ],
  "Digital Transformation": [
    "EdTech Integration",
    "Digital Infrastructure Planning",
    "Smart Campus Advisory",
  ],
};

function getRecommendedServices(challenge: string): string[] {
  return SERVICE_MAP[challenge] || [
    "Strategic Consulting",
    "Institutional Development",
    "Growth Advisory",
  ];
}

export default function ConsultationWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = useCallback(
    (value: string) => {
      const next = [...answers];
      next[step] = value;
      setAnswers(next);
    },
    [step, answers]
  );

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const currentStep = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  const consultationParams = new URLSearchParams({
    institution: answers[0] || "",
    stage: answers[1] || "",
    challenge: answers[2] || "",
    goal: answers[3] || "",
  });

  const services = getRecommendedServices(answers[2] || "");

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress bar */}
      {!showResult && (
        <div className="mb-10">
          <div className="flex justify-between mb-3 text-sm font-medium text-[#0a1628]/60">
            <span>
              Step {step + 1} of {STEPS.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-[#c8a44e]/15 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#c8a44e] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-3">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  i < step
                    ? "bg-[#c8a44e]"
                    : i === step
                    ? "bg-[#0a1628]"
                    : "bg-[#c8a44e]/20"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-[#0a1628] mb-8 text-center">
              {currentStep.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentStep.options.map((option) => {
                const Icon = option.icon;
                const isSelected = answers[step] === option.label;
                return (
                  <button
                    key={option.label}
                    onClick={() => handleSelect(option.label)}
                    className={`group relative flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all duration-300 ${
                      isSelected
                        ? "border-[#c8a44e] bg-[#c8a44e]/10 shadow-lg shadow-[#c8a44e]/10"
                        : "border-[#0a1628]/10 bg-white hover:border-[#c8a44e]/40 hover:bg-[#c8a44e]/5"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-lg transition-colors duration-300 ${
                        isSelected
                          ? "bg-[#c8a44e] text-white"
                          : "bg-[#0a1628]/5 text-[#0a1628]/60 group-hover:bg-[#c8a44e]/20 group-hover:text-[#0a1628]"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-base font-medium transition-colors duration-300 ${
                        isSelected ? "text-[#0a1628]" : "text-[#0a1628]/70"
                      }`}
                    >
                      {option.label}
                    </span>
                    {isSelected && (
                      <motion.div
                        layoutId="check"
                        className="absolute top-3 right-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#c8a44e]" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-10">
              <button
                onClick={handleBack}
                disabled={step === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-[#0a1628]/50 hover:text-[#0a1628] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!answers[step]}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#0a1628] text-white hover:bg-[#0a1628]/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                {step === STEPS.length - 1 ? "See Results" : "Next"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-[#c8a44e]/20 shadow-xl shadow-[#c8a44e]/5 p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#c8a44e] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0a1628]">
                Your Growth Snapshot
              </h2>
            </div>

            <div className="space-y-6">
              {/* Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Institution", value: answers[0] },
                  { label: "Stage", value: answers[1] },
                  { label: "Challenge", value: answers[2] },
                  { label: "Goal", value: answers[3] },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#f7f5f0] rounded-xl p-4 border border-[#c8a44e]/10"
                  >
                    <p className="text-xs font-medium text-[#0a1628]/50 uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-base font-semibold text-[#0a1628]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recommended services */}
              <div>
                <h3 className="text-lg font-semibold text-[#0a1628] mb-4">
                  Recommended Service Areas
                </h3>
                <div className="flex flex-wrap gap-3">
                  {services.map((svc) => (
                    <span
                      key={svc}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c8a44e]/10 text-[#0a1628] text-sm font-medium border border-[#c8a44e]/20"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#c8a44e]" />
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href={`/contact?${consultationParams.toString()}`}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#c8a44e] text-white font-semibold hover:bg-[#c8a44e]/90 transition-all shadow-lg shadow-[#c8a44e]/20"
                >
                  Schedule a Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleRestart}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-[#0a1628]/15 text-[#0a1628] font-medium hover:bg-[#0a1628]/5 transition-all"
                >
                  Start Over
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
