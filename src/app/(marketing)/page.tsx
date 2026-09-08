"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Globe,
  GraduationCap,
  Award,
  BookOpen,
  Users,
  Landmark,
  Shield,
  BarChart3,
  Handshake,
  TrendingUp,
  Lightbulb,
  Target,
  Search,
  Wrench,
  CheckCircle,
  ChevronRight,
  Quote,
  Clock,
  Calendar,
  Star,
  MapPin,
  Building,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useRef, useState, useEffect, useMemo } from "react";

const COLORS = {
  primary: "#0a1628",
  accent: "#c8a44e",
  surface: "#f7f5f0",
  ink: "#0d1117",
};

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold" style={{ color: COLORS.accent }}>
      {count}{suffix}
    </div>
  );
}

function WorldMapSVG() {
  return (
    <svg
      viewBox="0 0 1200 600"
      className="absolute inset-0 w-full h-full opacity-[0.07]"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simplified world map outlines */}
      <ellipse cx="600" cy="300" rx="550" ry="250" fill="none" stroke={COLORS.accent} strokeWidth="0.5" />
      <ellipse cx="600" cy="300" rx="400" ry="180" fill="none" stroke={COLORS.accent} strokeWidth="0.3" />
      <ellipse cx="600" cy="300" rx="250" ry="100" fill="none" stroke={COLORS.accent} strokeWidth="0.2" />

      {/* Connection lines from India to global destinations */}
      <line x1="720" y1="320" x2="200" y2="180" stroke={COLORS.accent} strokeWidth="0.8" strokeDasharray="4 4">
        <animate attributeName="strokeDashoffset" from="8" to="0" dur="2s" repeatCount="indefinite" />
      </line>
      <line x1="720" y1="320" x2="150" y2="220" stroke={COLORS.accent} strokeWidth="0.6" strokeDasharray="4 4">
        <animate attributeName="strokeDashoffset" from="8" to="0" dur="2.5s" repeatCount="indefinite" />
      </line>
      <line x1="720" y1="320" x2="350" y2="420" stroke={COLORS.accent} strokeWidth="0.6" strokeDasharray="4 4">
        <animate attributeName="strokeDashoffset" from="8" to="0" dur="3s" repeatCount="indefinite" />
      </line>
      <line x1="720" y1="320" x2="550" y2="150" stroke={COLORS.accent} strokeWidth="0.7" strokeDasharray="4 4">
        <animate attributeName="strokeDashoffset" from="8" to="0" dur="2.2s" repeatCount="indefinite" />
      </line>
      <line x1="720" y1="320" x2="900" y2="200" stroke={COLORS.accent} strokeWidth="0.5" strokeDasharray="4 4">
        <animate attributeName="strokeDashoffset" from="8" to="0" dur="2.8s" repeatCount="indefinite" />
      </line>
      <line x1="720" y1="320" x2="850" y2="380" stroke={COLORS.accent} strokeWidth="0.5" strokeDasharray="4 4">
        <animate attributeName="strokeDashoffset" from="8" to="0" dur="3.2s" repeatCount="indefinite" />
      </line>

      {/* City dots */}
      <circle cx="720" cy="320" r="4" fill={COLORS.accent} opacity="0.8">
        <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="180" r="2.5" fill={COLORS.accent} opacity="0.6" />
      <circle cx="150" cy="220" r="2" fill={COLORS.accent} opacity="0.5" />
      <circle cx="350" cy="420" r="2" fill={COLORS.accent} opacity="0.5" />
      <circle cx="550" cy="150" r="2.5" fill={COLORS.accent} opacity="0.6" />
      <circle cx="900" cy="200" r="2" fill={COLORS.accent} opacity="0.5" />
      <circle cx="850" cy="380" r="2" fill={COLORS.accent} opacity="0.5" />
    </svg>
  );
}

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { className: "absolute top-[15%] left-[10%] w-20 h-20 border border-[#c8a44e]/10 rounded-full", delay: 0 },
        { className: "absolute top-[25%] right-[15%] w-16 h-16 border border-[#c8a44e]/10 rotate-45", delay: 0.5 },
        { className: "absolute bottom-[20%] left-[20%] w-12 h-12 border border-[#c8a44e]/10 rotate-12", delay: 1 },
        { className: "absolute bottom-[30%] right-[10%] w-24 h-24 border border-[#c8a44e]/10 rounded-full", delay: 1.5 },
        { className: "absolute top-[60%] left-[60%] w-8 h-8 border border-[#c8a44e]/10 rotate-45", delay: 0.8 },
      ].map((shape, i) => (
        <motion.div
          key={i}
          className={shape.className}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: COLORS.primary }}>
      <WorldMapSVG />
      <FloatingShapes />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-6" style={{ color: COLORS.accent }}>
            Unitide Educations
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8" style={{ color: "#ffffff", fontFamily: "'Playfair Display', Georgia, serif" }}>
            Building Institutions That<br />Compete With the World.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            Strategic advisory and transformation consulting for higher education institutions
            aspiring to global excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#c8a44e]/20"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 text-sm font-semibold tracking-wider uppercase border-2 transition-all duration-300 hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "#ffffff" }}
            >
              Explore Our Expertise
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6" style={{ color: "rgba(255,255,255,0.4)" }} />
        </motion.div>
      </div>
    </section>
  );
}

function TrustBar() {
  const stats = [
    { value: 12, suffix: "+", label: "Years of Experience" },
    { value: 80, suffix: "+", label: "Institutions Supported" },
    { value: 45, suffix: "+", label: "International Partnerships" },
    { value: 200, suffix: "+", label: "Strategic Projects" },
    { value: 15, suffix: "+", label: "Countries Connected" },
  ];

  return (
    <section className="relative py-16 md:py-20" style={{ backgroundColor: COLORS.surface }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center relative">
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              <p className="text-sm mt-2 tracking-wider uppercase" style={{ color: COLORS.ink, opacity: 0.6 }}>
                {stat.label}
              </p>
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12" style={{ backgroundColor: "rgba(200,164,78,0.2)" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesExplorer() {
  const services = [
    {
      num: "01",
      title: "Strategic Planning",
      desc: "Institutional visioning, long-term roadmaps, and strategic blueprints for sustainable growth.",
      slug: "strategic-planning",
      icon: Target,
    },
    {
      num: "02",
      title: "International Partnerships",
      desc: "Building meaningful academic alliances with universities across six continents.",
      slug: "international-partnerships",
      icon: Globe,
    },
    {
      num: "03",
      title: "NEP 2020 Implementation",
      desc: "End-to-end guidance for seamless implementation of the National Education Policy.",
      slug: "nep-2020-implementation",
      icon: Landmark,
    },
    {
      num: "04",
      title: "Accreditation & Ranking",
      desc: "Strategic positioning and compliance frameworks for NAAC, NIRF, and global rankings.",
      slug: "accreditation-ranking",
      icon: Award,
    },
    {
      num: "05",
      title: "Admissions & Branding",
      desc: "Institutional branding, enrollment strategy, and student recruitment frameworks.",
      slug: "admissions-branding",
      icon: TrendingUp,
    },
    {
      num: "06",
      title: "Regulatory Compliance",
      desc: "Navigating UGC, AICTE, and state regulatory requirements with precision.",
      slug: "regulatory-compliance",
      icon: Shield,
    },
  ];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: COLORS.accent }}>
            What We Do
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: COLORS.ink, fontFamily: "'Playfair Display', Georgia, serif" }}>
            Our Expertise
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: "rgba(13,17,23,0.6)" }}>
            Six pillars of advisory excellence that drive institutional transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.num} href={`/services/${service.slug}`}>
              <motion.div
                className="group p-8 border-l-4 transition-all duration-300 cursor-pointer h-full"
                style={{
                  borderColor: "transparent",
                  backgroundColor: COLORS.surface,
                }}
                whileHover={{
                  y: -4,
                  borderColor: COLORS.accent,
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-sm font-bold tracking-wider" style={{ color: COLORS.accent }}>
                    {service.num}
                  </span>
                  <service.icon className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.primary }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.ink }}>
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(13,17,23,0.6)" }}>
                  {service.desc}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all" style={{ color: COLORS.accent }}>
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function InternationalSection() {
  const regions = [
    { name: "Europe", flag: "EU", stats: "15+ Partner Universities", opportunities: "Research collaborations, student exchange programs" },
    { name: "USA & Canada", flag: "US", stats: "12+ Partner Universities", opportunities: "Joint degree programs, faculty mobility" },
    { name: "Australia & NZ", flag: "AU", stats: "8+ Partner Universities", opportunities: "Credit transfer, research partnerships" },
    { name: "United Kingdom", flag: "UK", stats: "10+ Partner Universities", opportunities: "Validation agreements, twinning programs" },
    { name: "Asia-Pacific", flag: "AP", stats: "7+ Partner Universities", opportunities: "Technology transfer, skill development" },
    { name: "Middle East", flag: "ME", stats: "5+ Partner Universities", opportunities: "Campus establishment, advisory roles" },
  ];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: COLORS.primary }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: COLORS.accent }}>
            Global Reach
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#ffffff", fontFamily: "'Playfair Display', Georgia, serif" }}>
            Global Collaboration, Local Impact
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.6)" }}>
            Building meaningful academic partnerships that transcend borders and create lasting institutional value.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {regions.map((region, i) => (
            <motion.div
              key={i}
              className="p-6 border transition-all duration-300"
              style={{ borderColor: "rgba(200,164,78,0.15)", backgroundColor: "rgba(255,255,255,0.03)" }}
              whileHover={{ borderColor: COLORS.accent, backgroundColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "rgba(200,164,78,0.15)", color: COLORS.accent }}>
                  {region.flag}
                </div>
                <h3 className="text-lg font-bold" style={{ color: "#ffffff" }}>
                  {region.name}
                </h3>
              </div>
              <p className="text-sm font-semibold mb-2" style={{ color: COLORS.accent }}>
                {region.stats}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {region.opportunities}
              </p>
            </motion.div>
          ))}
        </div>

        <Link
          href="/international-collaboration"
          className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105"
          style={{ border: `2px solid ${COLORS.accent}`, color: COLORS.accent }}
        >
          Build Your Global Strategy
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

function FourPillars() {
  const [active, setActive] = useState<number | null>(null);

  const pillars = [
    {
      num: "01",
      title: "Student Mobility",
      desc: "Facilitating seamless international student exchange and credit transfer programs that enrich academic experiences and build global citizens.",
      details: "Our student mobility programs have helped over 2,000 students gain international exposure across 15+ countries, with structured semester exchanges, summer schools, and articulation agreements.",
    },
    {
      num: "02",
      title: "Faculty Mobility",
      desc: "Enabling faculty to teach, research, and collaborate internationally, strengthening institutional research capabilities.",
      details: "We have facilitated 200+ faculty exchange visits, guest lectureships, and joint supervision arrangements with leading global institutions.",
    },
    {
      num: "03",
      title: "Academic & Knowledge Exchange",
      desc: "Creating frameworks for curriculum development, pedagogical innovation, and academic resource sharing.",
      details: "Our knowledge exchange programs include joint curriculum design, shared digital libraries, co-developed MOOCs, and academic quality benchmarking initiatives.",
    },
    {
      num: "04",
      title: "Research & Innovation",
      desc: "Building collaborative research ecosystems that attract funding, talent, and produce impactful outcomes.",
      details: "We have established 30+ international research clusters, facilitated joint grant applications, and supported the creation of innovation hubs across partner institutions.",
    },
  ];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: COLORS.surface }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: COLORS.accent }}>
            Framework
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: COLORS.ink, fontFamily: "'Playfair Display', Georgia, serif" }}>
            The Four Pillars of Internationalization
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              className="cursor-pointer"
              onClick={() => setActive(active === i ? null : i)}
              layout
            >
              <div
                className="p-8 h-full border-t-4 transition-all duration-300"
                style={{
                  borderColor: active === i ? COLORS.accent : "rgba(200,164,78,0.15)",
                  backgroundColor: active === i ? "#ffffff" : "rgba(255,255,255,0.5)",
                }}
              >
                <span className="text-5xl font-bold block mb-4" style={{ color: COLORS.accent, fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {pillar.num}
                </span>
                <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.ink }}>
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(13,17,23,0.6)" }}>
                  {pillar.desc}
                </p>
                <motion.div
                  initial={false}
                  animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm leading-relaxed pt-4 border-t" style={{ color: "rgba(13,17,23,0.7)", borderColor: "rgba(200,164,78,0.2)" }}>
                    {pillar.details}
                  </p>
                </motion.div>
                <div className="mt-4">
                  <ChevronDown
                    className="w-5 h-5 transition-transform duration-300"
                    style={{
                      color: COLORS.accent,
                      transform: active === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodologySection() {
  const steps = [
    { num: "01", title: "Discover", desc: "Deep-dive assessment of institutional landscape", icon: Search },
    { num: "02", title: "Diagnose", desc: "Identify gaps, opportunities, and quick wins", icon: BarChart3 },
    { num: "03", title: "Design", desc: "Craft bespoke strategies and implementation roadmaps", icon: Lightbulb },
    { num: "04", title: "Implement", desc: "Execute with precision through embedded advisory", icon: Wrench },
    { num: "05", title: "Measure", desc: "Track impact, refine, and ensure sustained growth", icon: CheckCircle },
  ];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: COLORS.accent }}>
            How We Work
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: COLORS.ink, fontFamily: "'Playfair Display', Georgia, serif" }}>
            Our Approach
          </h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px" style={{ backgroundColor: "rgba(200,164,78,0.2)" }} />

          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full border-2 relative z-10" style={{ borderColor: COLORS.accent, backgroundColor: "#ffffff" }}>
                  <step.icon className="w-6 h-6" style={{ color: COLORS.accent }} />
                </div>
                <span className="text-xs font-bold tracking-wider block mb-2" style={{ color: COLORS.accent }}>
                  {step.num}
                </span>
                <h3 className="text-lg font-bold mb-2" style={{ color: COLORS.ink }}>
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(13,17,23,0.6)" }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudiesSection() {
  const cases = [
    {
      title: "Comprehensive Internationalization Strategy",
      institution: "University of Excellence, Mumbai",
      metric: "3x",
      metricLabel: "increase in international student enrollment",
      outcome: "Designed and implemented a 5-year internationalization roadmap resulting in 15 new international partnerships and a 200% increase in global visibility.",
    },
    {
      title: "NEP 2020 Implementation Roadmap",
      institution: "National Institute of Technology, Pune",
      metric: "100%",
      metricLabel: "policy compliance achieved",
      outcome: "Guided complete NEP 2020 compliance including CBC establishment, multidisciplinary framework design, and academic bank integration.",
    },
    {
      title: "Accreditation & Ranking Transformation",
      institution: "State University, Hyderabad",
      metric: "Top 50",
      metricLabel: "NIRF ranking achieved",
      outcome: "Strategic positioning across quality parameters resulting in a 30-position jump in NIRF rankings within two cycles.",
    },
  ];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: COLORS.surface }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: COLORS.accent }}>
              Impact
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: COLORS.ink, fontFamily: "'Playfair Display', Georgia, serif" }}>
              Proven Impact
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold mt-4 md:mt-0 transition-all hover:gap-3"
            style={{ color: COLORS.accent }}
          >
            View all case studies
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              className="p-8 border transition-all duration-300"
              style={{ borderColor: "rgba(200,164,78,0.15)", backgroundColor: "#ffffff" }}
              whileHover={{ y: -4, borderColor: COLORS.accent }}
            >
              <div className="mb-6">
                <span className="text-4xl font-bold" style={{ color: COLORS.accent, fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {c.metric}
                </span>
                <p className="text-xs tracking-wider uppercase mt-1" style={{ color: COLORS.accent }}>
                  {c.metricLabel}
                </p>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: COLORS.ink }}>
                {c.title}
              </h3>
              <p className="text-xs tracking-wider uppercase mb-4" style={{ color: "rgba(13,17,23,0.5)" }}>
                {c.institution}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(13,17,23,0.6)" }}>
                {c.outcome}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Unitide Educations transformed our approach to internationalization. Their strategic clarity and deep understanding of regulatory frameworks made what seemed impossible, achievable.",
      name: "Dr. Rajesh Kumar",
      designation: "Vice Chancellor",
      institution: "University of Excellence, Mumbai",
    },
    {
      quote: "Their NEP 2020 implementation guidance was nothing short of exceptional. They brought structure, clarity, and a vision that aligned perfectly with our institutional goals.",
      name: "Prof. Meera Sharma",
      designation: "Pro-Chancellor, Academic Affairs",
      institution: "National Institute of Technology, Pune",
    },
    {
      quote: "The accreditation strategy they designed delivered measurable results in record time. Our NIRF ranking improved by 30 positions within two cycles.",
      name: "Dr. Anil Reddy",
      designation: "Registrar",
      institution: "State University, Hyderabad",
    },
  ];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: COLORS.accent }}>
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: COLORS.ink, fontFamily: "'Playfair Display', Georgia, serif" }}>
            Trusted by Institutional Leaders
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 relative" style={{ backgroundColor: COLORS.surface }}>
              <Quote className="w-10 h-10 absolute top-6 right-6 opacity-10" style={{ color: COLORS.accent }} />
              <p className="text-sm leading-relaxed mb-8 relative z-10 italic" style={{ color: "rgba(13,17,23,0.7)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-bold" style={{ color: COLORS.ink }}>
                  {t.name}
                </p>
                <p className="text-xs" style={{ color: "rgba(13,17,23,0.5)" }}>
                  {t.designation}
                </p>
                <p className="text-xs mt-1" style={{ color: COLORS.accent }}>
                  {t.institution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: COLORS.primary }}>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-5" style={{ backgroundColor: COLORS.accent }} />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full opacity-5" style={{ backgroundColor: COLORS.accent }} />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "#ffffff", fontFamily: "'Playfair Display', Georgia, serif" }}>
          Ready to Transform Your Institution?
        </h2>
        <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
          Let&apos;s discuss your institution&apos;s next stage of growth. Every great transformation begins with a conversation.
        </p>
        <Link
          href="/contact"
          className="inline-block px-10 py-5 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#c8a44e]/20"
          style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
        >
          Schedule a Consultation
        </Link>
      </div>
    </section>
  );
}

function InsightsSection() {
  const articles = [
    {
      category: "Policy & Reform",
      title: "Implementing NEP 2020: A Roadmap for Institutional Leaders",
      excerpt: "A comprehensive guide to navigating the National Education Policy 2020 implementation, from CBC framework design to multidisciplinary curriculum transformation.",
      date: "Aug 15, 2026",
      readTime: "8 min read",
    },
    {
      category: "Internationalization",
      title: "Building Meaningful International Academic Partnerships",
      excerpt: "Beyond MoUs — how to create sustainable international partnerships that deliver real value for faculty, students, and institutional reputation.",
      date: "Aug 02, 2026",
      readTime: "6 min read",
    },
    {
      category: "Accreditation",
      title: "NAAC Accreditation: Strategic Positioning for Top Grades",
      excerpt: "Lessons from institutions that achieved NAAC A+ grades — quality metrics, evidence portfolio design, and institutional culture alignment.",
      date: "Jul 20, 2026",
      readTime: "10 min read",
    },
  ];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: COLORS.surface }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: COLORS.accent }}>
              Knowledge
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: COLORS.ink, fontFamily: "'Playfair Display', Georgia, serif" }}>
              Latest Insights
            </h2>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold mt-4 md:mt-0 transition-all hover:gap-3"
            style={{ color: COLORS.accent }}
          >
            View all insights
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <Link key={i} href="/insights">
              <motion.div
                className="p-6 transition-all duration-300 h-full"
                style={{ backgroundColor: "#ffffff" }}
                whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(10,22,40,0.08)" }}
              >
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase mb-4" style={{ backgroundColor: "rgba(200,164,78,0.1)", color: COLORS.accent }}>
                  {article.category}
                </span>
                <h3 className="text-lg font-bold mb-3 leading-tight" style={{ color: COLORS.ink }}>
                  {article.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(13,17,23,0.6)" }}>
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs" style={{ color: "rgba(13,17,23,0.4)" }}>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesExplorer />
      <InternationalSection />
      <FourPillars />
      <MethodologySection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <CTASection />
      <InsightsSection />
    </>
  );
}