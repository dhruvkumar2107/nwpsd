"use client";

import Link from "next/link";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
  TrendingUp,
  Lightbulb,
  Target,
  Search,
  Wrench,
  CheckCircle,
  Quote,
  Clock,
  Calendar,
  Sparkles,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

const COLORS = {
  primary: "#0a1628",
  accent: "#c8a44e",
  surface: "#f7f5f0",
  ink: "#0d1117",
};

/* ═══════════════════════════════════════════
   HERO SECTION — Cinematic Experience
   ═══════════════════════════════════════════ */

function GlobeSVG({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const institutions = [
    { x: 280, y: 180, label: "London" },
    { x: 200, y: 200, label: "Manchester" },
    { x: 160, y: 280, label: "New York" },
    { x: 140, y: 320, label: "Boston" },
    { x: 320, y: 350, label: "Dubai" },
    { x: 360, y: 200, label: "Singapore" },
    { x: 340, y: 280, label: "Melbourne" },
    { x: 260, y: 240, label: "New Delhi" },
  ];

  const connections = [
    [260, 240, 280, 180],
    [260, 240, 200, 200],
    [260, 240, 160, 280],
    [260, 240, 140, 320],
    [260, 240, 320, 350],
    [260, 240, 360, 200],
    [260, 240, 340, 280],
  ];

  return (
    <svg
      viewBox="0 0 500 500"
      className="absolute inset-0 w-full h-full"
      style={{
        transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`,
        transition: "transform 0.3s ease-out",
      }}
    >
      {/* Globe rings */}
      {[180, 140, 100].map((r, i) => (
        <ellipse
          key={`ring-${i}`}
          cx="250"
          cy="250"
          rx={r}
          ry={r * 0.6}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="0.4"
          opacity={0.15 - i * 0.03}
        />
      ))}

      {/* Latitude lines */}
      {[-60, -20, 20, 60].map((offset, i) => (
        <ellipse
          key={`lat-${i}`}
          cx="250"
          cy={250 + offset}
          rx={160 - Math.abs(offset) * 0.8}
          ry={20}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="0.3"
          opacity={0.08}
        />
      ))}

      {/* Longitude arcs */}
      {[0, 45, 90, 135].map((angle, i) => (
        <ellipse
          key={`lon-${i}`}
          cx="250"
          cy="250"
          rx={40 + i * 10}
          ry={160}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="0.3"
          opacity={0.06}
          transform={`rotate(${angle} 250 250)`}
        />
      ))}

      {/* Connection lines with animation */}
      {connections.map(([x1, y1, x2, y2], i) => (
        <line
          key={`conn-${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={COLORS.accent}
          strokeWidth="0.6"
          strokeDasharray="4 6"
          opacity="0.3"
        >
          <animate
            attributeName="strokeDashoffset"
            from="10"
            to="0"
            dur={`${2 + i * 0.3}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}

      {/* Institution nodes */}
      {institutions.map((inst, i) => (
        <g key={`inst-${i}`}>
          {/* Pulse ring */}
          <circle cx={inst.x} cy={inst.y} r="8" fill="none" stroke={COLORS.accent} strokeWidth="0.5" opacity="0.3">
            <animate attributeName="r" values="4;12;4" dur={`${3 + i * 0.2}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur={`${3 + i * 0.2}s`} repeatCount="indefinite" />
          </circle>
          {/* Node */}
          <circle cx={inst.x} cy={inst.y} r="3" fill={COLORS.accent} opacity="0.8">
            <animate attributeName="r" values="2.5;3.5;2.5" dur={`${2 + i * 0.15}s`} repeatCount="indefinite" />
          </circle>
          {/* Glow */}
          <circle cx={inst.x} cy={inst.y} r="6" fill={COLORS.accent} opacity="0.1" />
        </g>
      ))}

      {/* Central hub (India) */}
      <circle cx="260" cy="240" r="10" fill={COLORS.accent} opacity="0.15">
        <animate attributeName="r" values="8;14;8" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="260" cy="240" r="5" fill={COLORS.accent} opacity="0.9" />
      <circle cx="260" cy="240" r="2" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}

function HeroParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        left: `${(i * 37 + 13) % 100}%`,
        top: `${(i * 53 + 7) % 100}%`,
        durationY: -30 - (i % 5) * 8,
        duration: 4 + (i % 4),
        delay: (i % 5) * 0.8,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p: { left: string; top: string; durationY: number; duration: number; delay: number }, i: number) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] rounded-full bg-accent/40"
          style={{ left: p.left, top: p.top }}
          animate={{
            y: [0, p.durationY, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y: yPos });
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero"
      style={{ opacity, scale }}
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient mesh */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(200,164,78,0.08) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(44,74,124,0.15) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 20, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <GlobeSVG mousePosition={mousePosition} />
      <HeroParticles />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
            Higher Education Advisory
          </span>
        </motion.div>

        {/* Headline — word by word */}
        <div className="mb-8">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#ffffff" }}
          >
            {"Building Institutions That Compete With the World."
              .split(" ")
              .map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={isLoaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.5 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ marginRight: "0.3em" }}
                >
                  {word}
                </motion.span>
              ))}
          </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.6)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Strategic advisory and transformation consulting for higher education institutions
          aspiring to global excellence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticWrapper strength={0.15}>
            <Link
              href="/contact"
              className="group magnetic-btn px-8 py-4 text-sm font-semibold tracking-wider uppercase bg-accent text-primary rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Schedule a Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </MagneticWrapper>
          <MagneticWrapper strength={0.15}>
            <Link
              href="/services"
              className="group magnetic-btn px-8 py-4 text-sm font-semibold tracking-wider uppercase border-2 border-white/20 text-white rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-white/30"
            >
              <span className="flex items-center gap-2">
                Explore Our Expertise
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </MagneticWrapper>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/30">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-2 rounded-full bg-accent"
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════
   TRUST BAR — Living Statistics
   ═══════════════════════════════════════════ */

function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
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
    <div ref={ref} className="text-4xl md:text-5xl font-bold tabular-nums" style={{ color: COLORS.accent }}>
      {prefix}{count}{suffix}
    </div>
  );
}

function MiniSparkline({ data, color = COLORS.accent }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 24;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="opacity-40">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrustBar() {
  const stats = [
    { value: 12, suffix: "+", label: "Years", context: "of dedicated advisory", trend: [8, 9, 10, 11, 12], trendLabel: "+20% annually" },
    { value: 80, suffix: "+", label: "Institutions", context: "transformed globally", trend: [45, 55, 65, 75, 80], trendLabel: "+78% over 3 years" },
    { value: 45, suffix: "+", label: "Partnerships", context: "across 15 countries", trend: [20, 28, 35, 40, 45], trendLabel: "+125% growth" },
    { value: 200, suffix: "+", label: "Projects", context: "delivered successfully", trend: [80, 120, 160, 190, 200], trendLabel: "+150% scaling" },
    { value: 15, suffix: "+", label: "Countries", context: "connected worldwide", trend: [6, 8, 10, 13, 15], trendLabel: "+150% reach" },
  ];

  return (
    <section className="relative py-16 md:py-20 overflow-hidden" style={{ backgroundColor: COLORS.surface }}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(${COLORS.accent} 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center group cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              <p className="text-sm font-semibold mt-2 tracking-wider uppercase" style={{ color: COLORS.ink }}>
                {stat.label}
              </p>
              <p className="text-xs mt-1" style={{ color: "rgba(13,17,23,0.5)" }}>
                {stat.context}
              </p>

              {/* Mini sparkline */}
              <div className="mt-3 flex items-center justify-center gap-2">
                <MiniSparkline data={stat.trend} />
                <span className="text-[10px] font-semibold text-accent">{stat.trendLabel}</span>
              </div>

              {/* Hover methodology reveal */}
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-[10px] text-ink-muted italic">
                  Verified institutional data
                </p>
              </div>

              {i < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12" style={{ backgroundColor: "rgba(200,164,78,0.15)" }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SERVICES — Interactive Ecosystem
   ═══════════════════════════════════════════ */

function ServicesExplorer() {
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    {
      num: "01",
      title: "Strategic Planning",
      desc: "Institutional visioning, long-term roadmaps, and strategic blueprints for sustainable growth.",
      slug: "strategic-planning",
      icon: Target,
      metrics: "95% implementation success",
    },
    {
      num: "02",
      title: "International Partnerships",
      desc: "Building meaningful academic alliances with universities across six continents.",
      slug: "international-partnerships",
      icon: Globe,
      metrics: "50+ active partnerships",
    },
    {
      num: "03",
      title: "NEP 2020 Implementation",
      desc: "End-to-end guidance for seamless implementation of the National Education Policy.",
      slug: "nep-2020-implementation",
      icon: Landmark,
      metrics: "30+ institutions guided",
    },
    {
      num: "04",
      title: "Accreditation & Ranking",
      desc: "Strategic positioning and compliance frameworks for NAAC, NIRF, and global rankings.",
      slug: "accreditation-ranking",
      icon: Award,
      metrics: "Average 15-position NIRF jump",
    },
    {
      num: "05",
      title: "Admissions & Branding",
      desc: "Institutional branding, enrollment strategy, and student recruitment frameworks.",
      slug: "admissions-branding",
      icon: TrendingUp,
      metrics: "40% avg enrollment increase",
    },
    {
      num: "06",
      title: "Regulatory Compliance",
      desc: "Navigating UGC, AICTE, and state regulatory requirements with precision.",
      slug: "regulatory-compliance",
      icon: Shield,
      metrics: "100% compliance achieved",
    },
  ];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <motion.p
            className="text-sm tracking-[0.3em] uppercase mb-4 font-semibold"
            style={{ color: COLORS.accent }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What We Do
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: COLORS.ink } as React.CSSProperties}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            Our Expertise
          </motion.h2>
          <motion.p
            className="text-lg max-w-2xl"
            style={{ color: "rgba(13,17,23,0.6)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Six pillars of advisory excellence that drive institutional transformation.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/services/${service.slug}`}>
                <motion.div
                  className="group relative p-8 h-full rounded-xl transition-all duration-500 cursor-pointer overflow-hidden hover-glow"
                  style={{
                    backgroundColor: activeService === i ? "#ffffff" : COLORS.surface,
                    border: `1px solid ${activeService === i ? "rgba(200,164,78,0.3)" : "transparent"}`,
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 20px 60px -15px rgba(10,22,40,0.12)",
                  }}
                  onMouseEnter={() => setActiveService(i)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  {/* Top accent line */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeService === i ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />

                  <div className="flex items-start justify-between mb-6">
                    <span className="text-sm font-bold tracking-wider" style={{ color: COLORS.accent }}>
                      {service.num}
                    </span>
                    <motion.div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: activeService === i ? COLORS.accent : "rgba(200,164,78,0.1)",
                      }}
                      animate={{
                        rotate: activeService === i ? 0 : 0,
                        scale: activeService === i ? 1.1 : 1,
                      }}
                    >
                      <service.icon
                        className="w-5 h-5 transition-colors duration-300"
                        style={{ color: activeService === i ? "#ffffff" : COLORS.primary }}
                      />
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 transition-colors" style={{ color: COLORS.ink }}>
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(13,17,23,0.6)" }}>
                    {service.desc}
                  </p>

                  {/* Metrics reveal on hover */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: activeService === i ? 1 : 0,
                      height: activeService === i ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t" style={{ borderColor: "rgba(200,164,78,0.15)" }}>
                      <p className="text-xs font-semibold" style={{ color: COLORS.accent }}>
                        {service.metrics}
                      </p>
                    </div>
                  </motion.div>

                  <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300 mt-4" style={{ color: COLORS.accent }}>
                    Learn more
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   INTERNATIONAL — Interactive World Map
   ═══════════════════════════════════════════ */

function InternationalSection() {
  const [activeRegion, setActiveRegion] = useState<number | null>(null);

  const regions = [
    {
      name: "Europe",
      flag: "EU",
      stats: "15+ Partner Universities",
      opportunities: "Research collaborations, student exchange programs",
      partners: ["University of Oxford", "ETH Zurich", "Sorbonne University"],
      programs: ["Joint PhD Programs", "Semester Exchange", "Faculty Mobility"],
    },
    {
      name: "USA & Canada",
      flag: "US",
      stats: "12+ Partner Universities",
      opportunities: "Joint degree programs, faculty mobility",
      partners: ["MIT", "Stanford University", "University of Toronto"],
      programs: ["Dual Degrees", "Research Collaborations", "Summer Programs"],
    },
    {
      name: "Australia & NZ",
      flag: "AU",
      stats: "8+ Partner Universities",
      opportunities: "Credit transfer, research partnerships",
      partners: ["University of Melbourne", "University of Sydney", "University of Auckland"],
      programs: ["Credit Transfer", "Research Clusters", "Industry Partnerships"],
    },
    {
      name: "United Kingdom",
      flag: "UK",
      stats: "10+ Partner Universities",
      opportunities: "Validation agreements, twinning programs",
      partners: ["University of Manchester", "King's College London", "University of Edinburgh"],
      programs: ["Validation Agreements", "Twinning Programs", "Articulation"],
    },
    {
      name: "Asia-Pacific",
      flag: "AP",
      stats: "7+ Partner Universities",
      opportunities: "Technology transfer, skill development",
      partners: ["National University of Singapore", "Tsinghua University", "University of Tokyo"],
      programs: ["Tech Transfer", "Skill Development", "Cultural Exchange"],
    },
    {
      name: "Middle East",
      flag: "ME",
      stats: "5+ Partner Universities",
      opportunities: "Campus establishment, advisory roles",
      partners: ["Khalifa University", "KAUST", "American University of Dubai"],
      programs: ["Campus Setup", "Advisory", "Executive Education"],
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: COLORS.primary }}>
      {/* Background globe */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg viewBox="0 0 1200 600" className="w-full h-full">
          <ellipse cx="600" cy="300" rx="500" ry="250" fill="none" stroke={COLORS.accent} strokeWidth="0.5" />
          <ellipse cx="600" cy="300" rx="350" ry="175" fill="none" stroke={COLORS.accent} strokeWidth="0.3" />
          <ellipse cx="600" cy="300" rx="200" ry="100" fill="none" stroke={COLORS.accent} strokeWidth="0.2" />
          {[0, 30, 60, 90, 120, 150].map((angle, i) => (
            <ellipse key={i} cx="600" cy="300" rx={100 + i * 60} ry={250} fill="none" stroke={COLORS.accent} strokeWidth="0.15" opacity="0.3" transform={`rotate(${angle} 600 300)`} />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: COLORS.accent }}>
            Global Reach
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#ffffff", fontFamily: "'Playfair Display', Georgia, serif" }}>
            Global Collaboration, Local Impact
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.6)" }}>
            Building meaningful academic partnerships that transcend borders and create lasting institutional value.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {regions.map((region, i) => (
            <motion.div
              key={i}
              className="group relative p-6 rounded-xl transition-all duration-500 cursor-pointer overflow-hidden"
              style={{
                borderColor: activeRegion === i ? COLORS.accent : "rgba(200,164,78,0.12)",
                backgroundColor: activeRegion === i ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${activeRegion === i ? COLORS.accent : "rgba(200,164,78,0.12)"}`,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onMouseEnter={() => setActiveRegion(i)}
              onMouseLeave={() => setActiveRegion(null)}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="w-10 h-10 flex items-center justify-center text-xs font-bold rounded-lg"
                  style={{
                    backgroundColor: activeRegion === i ? COLORS.accent : "rgba(200,164,78,0.15)",
                    color: activeRegion === i ? COLORS.primary : COLORS.accent,
                  }}
                  animate={{ scale: activeRegion === i ? 1.1 : 1 }}
                >
                  {region.flag}
                </motion.div>
                <h3 className="text-lg font-bold" style={{ color: "#ffffff" }}>
                  {region.name}
                </h3>
              </div>

              <p className="text-sm font-semibold mb-2" style={{ color: COLORS.accent }}>
                {region.stats}
              </p>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                {region.opportunities}
              </p>

              {/* Expanded details */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: activeRegion === i ? 1 : 0,
                  height: activeRegion === i ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-white/10">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-2">
                    Key Partners
                  </p>
                  <div className="space-y-1 mb-3">
                    {region.partners.map((partner) => (
                      <p key={partner} className="text-xs text-white/60">{partner}</p>
                    ))}
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-2">
                    Programs
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {region.programs.map((program) => (
                      <span key={program} className="px-2 py-0.5 rounded text-[10px] bg-accent/10 text-accent">
                        {program}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/international-collaboration"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wider uppercase rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/10"
            style={{ border: `2px solid ${COLORS.accent}`, color: COLORS.accent }}
          >
            Build Your Global Strategy
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOUR PILLARS — Storytelling Experience
   ═══════════════════════════════════════════ */

function FourPillars() {
  const [active, setActive] = useState<number | null>(null);

  const pillars = [
    {
      num: "01",
      title: "Student Mobility",
      desc: "Facilitating seamless international student exchange and credit transfer programs that enrich academic experiences and build global citizens.",
      details: "Our student mobility programs have helped over 2,000 students gain international exposure across 15+ countries, with structured semester exchanges, summer schools, and articulation agreements.",
      metric: "2,000+",
      metricLabel: "Students placed globally",
      icon: GraduationCap,
    },
    {
      num: "02",
      title: "Faculty Mobility",
      desc: "Enabling faculty to teach, research, and collaborate internationally, strengthening institutional research capabilities.",
      details: "We have facilitated 200+ faculty exchange visits, guest lectureships, and joint supervision arrangements with leading global institutions.",
      metric: "200+",
      metricLabel: "Faculty exchanges facilitated",
      icon: Users,
    },
    {
      num: "03",
      title: "Academic & Knowledge Exchange",
      desc: "Creating frameworks for curriculum development, pedagogical innovation, and academic resource sharing.",
      details: "Our knowledge exchange programs include joint curriculum design, shared digital libraries, co-developed MOOCs, and academic quality benchmarking initiatives.",
      metric: "50+",
      metricLabel: "Joint curricula developed",
      icon: BookOpen,
    },
    {
      num: "04",
      title: "Research & Innovation",
      desc: "Building collaborative research ecosystems that attract funding, talent, and produce impactful outcomes.",
      details: "We have established 30+ international research clusters, facilitated joint grant applications, and supported the creation of innovation hubs across partner institutions.",
      metric: "30+",
      metricLabel: "Research clusters established",
      icon: Lightbulb,
    },
  ];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: COLORS.surface }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: COLORS.accent }}>
            Framework
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: COLORS.ink, fontFamily: "'Playfair Display', Georgia, serif" }}>
            The Four Pillars of Internationalization
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              className="cursor-pointer"
              onClick={() => setActive(active === i ? null : i)}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <motion.div
                className="relative p-8 h-full rounded-xl transition-all duration-500 overflow-hidden"
                style={{
                  borderColor: active === i ? COLORS.accent : "rgba(200,164,78,0.12)",
                  backgroundColor: active === i ? "#ffffff" : "rgba(255,255,255,0.5)",
                  border: `1px solid ${active === i ? COLORS.accent : "rgba(200,164,78,0.12)"}`,
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 40px -10px rgba(10,22,40,0.08)",
                }}
              >
                {/* Active indicator */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ backgroundColor: COLORS.accent }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: active === i ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl font-bold" style={{ color: COLORS.accent, fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {pillar.num}
                  </span>
                  <pillar.icon className="w-5 h-5" style={{ color: COLORS.accent, opacity: 0.5 }} />
                </div>

                <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.ink }}>
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(13,17,23,0.6)" }}>
                  {pillar.desc}
                </p>

                {/* Metric */}
                <div className="mb-4">
                  <span className="text-2xl font-bold" style={{ color: COLORS.accent }}>
                    {pillar.metric}
                  </span>
                  <p className="text-xs mt-1" style={{ color: "rgba(13,17,23,0.5)" }}>
                    {pillar.metricLabel}
                  </p>
                </div>

                {/* Expandable details */}
                <motion.div
                  initial={false}
                  animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-sm leading-relaxed pt-4 border-t" style={{ color: "rgba(13,17,23,0.7)", borderColor: "rgba(200,164,78,0.2)" }}>
                    {pillar.details}
                  </p>
                </motion.div>

                <motion.div
                  className="mt-4 flex items-center gap-1 text-sm font-semibold"
                  style={{ color: COLORS.accent }}
                  animate={{ y: active === i ? 0 : 0 }}
                >
                  {active === i ? "Show less" : "Read more"}
                  <motion.div
                    animate={{ rotate: active === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   METHODOLOGY — Horizontal Journey
   ═══════════════════════════════════════════ */

function MethodologySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-60%"]);

  const steps = [
    {
      num: "01",
      title: "Discover",
      desc: "Deep-dive assessment of institutional landscape, stakeholder interviews, and competitive analysis.",
      icon: Search,
      details: "We conduct comprehensive audits covering academic programs, governance structures, regulatory compliance, and market positioning to establish a clear baseline.",
    },
    {
      num: "02",
      title: "Diagnose",
      desc: "Identify gaps, opportunities, and quick wins through data-driven analysis.",
      icon: BarChart3,
      details: "Using proprietary frameworks and benchmarking against global standards, we identify strategic opportunities and prioritize improvement areas.",
    },
    {
      num: "03",
      title: "Design",
      desc: "Craft bespoke strategies and implementation roadmaps tailored to institutional goals.",
      icon: Lightbulb,
      details: "Our team develops detailed action plans with clear milestones, resource requirements, KPIs, and risk mitigation strategies.",
    },
    {
      num: "04",
      title: "Implement",
      desc: "Execute with precision through embedded advisory and hands-on support.",
      icon: Wrench,
      details: "We work alongside institutional teams to execute strategies, providing real-time guidance, training, and quality assurance at every stage.",
    },
    {
      num: "05",
      title: "Measure",
      desc: "Track impact, refine approaches, and ensure sustained institutional growth.",
      icon: CheckCircle,
      details: "Continuous monitoring with dashboards, quarterly reviews, and strategic adjustments ensure long-term success and measurable outcomes.",
    },
  ];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#ffffff" }} ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: COLORS.accent }}>
            How We Work
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: COLORS.ink, fontFamily: "'Playfair Display', Georgia, serif" }}>
            Our Approach
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: "rgba(13,17,23,0.6)" }}>
            A proven five-phase methodology refined over 200+ institutional engagements.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll container */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-8 px-6 md:px-12"
          style={{ x }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-[320px] md:w-[400px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="relative p-8 rounded-2xl h-full" style={{ backgroundColor: COLORS.surface }}>
                {/* Step indicator */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(200,164,78,0.1)" }}
                  >
                    <step.icon className="w-6 h-6" style={{ color: COLORS.accent }} />
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-wider block" style={{ color: COLORS.accent }}>
                      STEP {step.num}
                    </span>
                    <h3 className="text-xl font-bold" style={{ color: COLORS.ink }}>
                      {step.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(13,17,23,0.6)" }}>
                  {step.desc}
                </p>

                <p className="text-xs leading-relaxed" style={{ color: "rgba(13,17,23,0.4)" }}>
                  {step.details}
                </p>

                {/* Connector */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px" style={{ backgroundColor: "rgba(200,164,78,0.2)" }} />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Progress indicator */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="relative h-1 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(200,164,78,0.1)" }}>
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              backgroundColor: COLORS.accent,
              scaleX: scrollYProgress,
              transformOrigin: "left",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CASE STUDIES — Documentary Style
   ═══════════════════════════════════════════ */

function CaseStudiesSection() {
  const [expandedStudy, setExpandedStudy] = useState<number | null>(null);

  const cases = [
    {
      title: "Comprehensive Internationalization Strategy",
      institution: "University of Excellence, Mumbai",
      metric: "3x",
      metricLabel: "increase in international student enrollment",
      outcome: "Designed and implemented a 5-year internationalization roadmap resulting in 15 new international partnerships and a 200% increase in global visibility.",
      problem: "Low international visibility and outdated global engagement strategy",
      intervention: "Complete strategic overhaul with new partnership frameworks",
      results: ["15 new partnerships established", "3x international enrollment", "Top 100 QS ranking achieved"],
      duration: "18 months",
    },
    {
      title: "NEP 2020 Implementation Roadmap",
      institution: "National Institute of Technology, Pune",
      metric: "100%",
      metricLabel: "policy compliance achieved",
      outcome: "Guided complete NEP 2020 compliance including CBC establishment, multidisciplinary framework design, and academic bank integration.",
      problem: "Complex regulatory requirements with tight implementation deadline",
      intervention: "Phased implementation with embedded advisory support",
      results: ["Full NEP 2020 compliance", "CBC framework operational", "Multidisciplinary programs launched"],
      duration: "12 months",
    },
    {
      title: "Accreditation & Ranking Transformation",
      institution: "State University, Hyderabad",
      metric: "Top 50",
      metricLabel: "NIRF ranking achieved",
      outcome: "Strategic positioning across quality parameters resulting in a 30-position jump in NIRF rankings within two cycles.",
      problem: "Stagnant ranking despite strong academic programs",
      intervention: "Data-driven quality improvement across all NIRF parameters",
      results: ["30-position NIRF jump", "NAAC A+ grade achieved", "Research output doubled"],
      duration: "24 months",
    },
  ];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: COLORS.surface }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: COLORS.accent }}>
              Impact
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: COLORS.ink, fontFamily: "'Playfair Display', Georgia, serif" }}>
              Proven Impact
            </h2>
          </motion.div>
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
              className="group relative rounded-2xl overflow-hidden transition-all duration-500"
              style={{ backgroundColor: "#ffffff" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, boxShadow: "0 20px 60px -15px rgba(10,22,40,0.1)" }}
              onClick={() => setExpandedStudy(expandedStudy === i ? null : i)}
            >
              {/* Header gradient */}
              <div className="h-2" style={{ background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.primary})` }} />

              <div className="p-8">
                {/* Metric */}
                <div className="mb-6">
                  <span className="text-5xl font-bold" style={{ color: COLORS.accent, fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {c.metric}
                  </span>
                  <p className="text-xs tracking-wider uppercase mt-1 font-semibold" style={{ color: COLORS.accent }}>
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

                {/* Expandable details */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedStudy === i ? "auto" : 0,
                    opacity: expandedStudy === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 mt-6 border-t" style={{ borderColor: "rgba(200,164,78,0.15)" }}>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: COLORS.accent }}>Challenge</p>
                        <p className="text-xs" style={{ color: "rgba(13,17,23,0.6)" }}>{c.problem}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: COLORS.accent }}>Intervention</p>
                        <p className="text-xs" style={{ color: "rgba(13,17,23,0.6)" }}>{c.intervention}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: COLORS.accent }}>Results</p>
                        <ul className="space-y-1">
                          {c.results.map((result, j) => (
                            <li key={j} className="flex items-center gap-2 text-xs" style={{ color: "rgba(13,17,23,0.6)" }}>
                              <CheckCircle className="w-3 h-3 text-accent flex-shrink-0" />
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(13,17,23,0.4)" }}>
                        <Clock className="w-3 h-3" />
                        Duration: {c.duration}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="flex items-center gap-2 text-sm font-semibold mt-4 group-hover:gap-3 transition-all" style={{ color: COLORS.accent }}>
                  {expandedStudy === i ? "Show less" : "View case study"}
                  <motion.div
                    animate={{ rotate: expandedStudy === i ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIALS — Premium Carousel
   ═══════════════════════════════════════════ */

function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const testimonials = [
    {
      quote: "Unitide Educations transformed our approach to internationalization. Their strategic clarity and deep understanding of regulatory frameworks made what seemed impossible, achievable.",
      name: "Dr. Rajesh Kumar",
      designation: "Vice Chancellor",
      institution: "University of Excellence, Mumbai",
      outcome: "3x international enrollment increase",
      duration: "3-year partnership",
    },
    {
      quote: "Their NEP 2020 implementation guidance was nothing short of exceptional. They brought structure, clarity, and a vision that aligned perfectly with our institutional goals.",
      name: "Prof. Meera Sharma",
      designation: "Pro-Chancellor, Academic Affairs",
      institution: "National Institute of Technology, Pune",
      outcome: "100% NEP compliance achieved",
      duration: "12-month engagement",
    },
    {
      quote: "The accreditation strategy they designed delivered measurable results in record time. Our NIRF ranking improved by 30 positions within two cycles.",
      name: "Dr. Anil Reddy",
      designation: "Registrar",
      institution: "State University, Hyderabad",
      outcome: "30-position NIRF ranking jump",
      duration: "2-year partnership",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: COLORS.accent }}>
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: COLORS.ink, fontFamily: "'Playfair Display', Georgia, serif" }}>
            Trusted by Institutional Leaders
          </h2>
        </motion.div>

        <div className="relative">
          {/* Featured testimonial */}
          <div className="relative overflow-hidden rounded-2xl" style={{ backgroundColor: COLORS.surface }}>
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-accent/20" />

            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Quote className="w-12 h-12 mb-6 opacity-15" style={{ color: COLORS.accent }} />

                  <blockquote className="text-xl md:text-2xl leading-relaxed mb-8" style={{ color: COLORS.ink, fontFamily: "'Playfair Display', Georgia, serif" }}>
                    &ldquo;{testimonials[active].quote}&rdquo;
                  </blockquote>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-center gap-4">
                      {/* Avatar placeholder */}
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold" style={{ backgroundColor: "rgba(200,164,78,0.15)", color: COLORS.accent }}>
                        {testimonials[active].name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold" style={{ color: COLORS.ink }}>
                          {testimonials[active].name}
                        </p>
                        <p className="text-sm" style={{ color: "rgba(13,17,23,0.5)" }}>
                          {testimonials[active].designation}
                        </p>
                        <p className="text-sm font-semibold" style={{ color: COLORS.accent }}>
                          {testimonials[active].institution}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs font-semibold" style={{ color: COLORS.accent }}>
                          {testimonials[active].outcome}
                        </p>
                        <p className="text-xs" style={{ color: "rgba(13,17,23,0.4)" }}>
                          {testimonials[active].duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="relative h-2 rounded-full transition-all duration-300"
                style={{
                  width: active === i ? 40 : 8,
                  backgroundColor: active === i ? COLORS.accent : "rgba(200,164,78,0.2)",
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CTA — Strategic Consultation
   ═══════════════════════════════════════════ */

function CTASection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: COLORS.primary }}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-5"
          style={{ backgroundColor: COLORS.accent }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-5"
          style={{ backgroundColor: COLORS.accent }}
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            Start Your Transformation
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "#ffffff", fontFamily: "'Playfair Display', Georgia, serif" }}>
            Ready to Transform Your Institution?
          </h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            Let&apos;s discuss your institution&apos;s next stage of growth. Every great transformation begins with a conversation.
          </p>

          <MagneticWrapper strength={0.15}>
            <Link
              href="/contact"
              className="group magnetic-btn inline-flex items-center gap-2 px-10 py-5 text-sm font-semibold tracking-wider uppercase bg-accent text-primary rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Schedule a Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </MagneticWrapper>

          <p className="mt-6 text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
            Free 30-minute strategic consultation • No commitment required
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   INSIGHTS — Premium Editorial
   ═══════════════════════════════════════════ */

function InsightsSection() {
  const articles = [
    {
      category: "Policy & Reform",
      title: "Implementing NEP 2020: A Roadmap for Institutional Leaders",
      excerpt: "A comprehensive guide to navigating the National Education Policy 2020 implementation, from CBC framework design to multidisciplinary curriculum transformation.",
      date: "Aug 15, 2026",
      readTime: "8 min read",
      featured: true,
    },
    {
      category: "Internationalization",
      title: "Building Meaningful International Academic Partnerships",
      excerpt: "Beyond MoUs — how to create sustainable international partnerships that deliver real value for faculty, students, and institutional reputation.",
      date: "Aug 02, 2026",
      readTime: "6 min read",
      featured: false,
    },
    {
      category: "Accreditation",
      title: "NAAC Accreditation: Strategic Positioning for Top Grades",
      excerpt: "Lessons from institutions that achieved NAAC A+ grades — quality metrics, evidence portfolio design, and institutional culture alignment.",
      date: "Jul 20, 2026",
      readTime: "10 min read",
      featured: false,
    },
  ];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: COLORS.surface }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: COLORS.accent }}>
              Knowledge
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: COLORS.ink, fontFamily: "'Playfair Display', Georgia, serif" }}>
              Latest Insights
            </h2>
          </motion.div>
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
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link href="/insights">
                <motion.div
                  className="group relative rounded-2xl overflow-hidden h-full transition-all duration-500"
                  style={{ backgroundColor: "#ffffff" }}
                  whileHover={{ y: -6, boxShadow: "0 20px 60px -15px rgba(10,22,40,0.1)" }}
                >
                  {/* Category gradient bar */}
                  <div
                    className="h-1"
                    style={{
                      background: i === 0
                        ? `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.primary})`
                        : i === 1
                        ? `linear-gradient(90deg, #2c4a7c, #3b6494)`
                        : `linear-gradient(90deg, #16a34a, #22c55e)`,
                    }}
                  />

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full"
                        style={{
                          backgroundColor: "rgba(200,164,78,0.1)",
                          color: COLORS.accent,
                        }}
                      >
                        {article.category}
                      </span>
                      {article.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-primary text-white">
                          <Sparkles className="w-2.5 h-2.5" />
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold mb-3 leading-tight group-hover:text-accent transition-colors" style={{ color: COLORS.ink }}>
                      {article.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(13,17,23,0.6)" }}>
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
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
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" style={{ color: COLORS.accent }} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */

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
