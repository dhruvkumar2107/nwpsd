"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Globe,
  GraduationCap,
  Award,
  Building,
  Clock,
  CheckCircle,
  Target,
  Lightbulb,
  BarChart3,
  Quote,
} from "lucide-react";

const CASE_STUDIES = {
  "university-of-delhi-melbourne-exchange": {
    institution: "University of Delhi",
    country: "Australia",
    flag: "AU",
    programType: "Student Exchange",
    tagline:
      "Building a multi-department student exchange framework with the University of Melbourne",
    challengeTitle: "The Challenge",
    challenge:
      "India's largest university system, serving over 600,000 students across 90+ affiliated colleges, lacked a structured pathway for undergraduate students to gain meaningful international exposure. While individual colleges had informal arrangements, there was no university-wide framework that could operate at scale, maintain academic equivalence, and ensure equitable access across disciplines.",
    challengePoints: [
      "No standardized credit transfer mechanism across departments",
      "Inconsistent quality assurance for partner institution selection",
      "Limited funding infrastructure for student mobility",
      "Regulatory complexity across multiple affiliated colleges",
    ],
    approachTitle: "Our Approach",
    approach:
      "We conducted a comprehensive institutional readiness assessment, designed a scalable exchange framework, and built the partnerships necessary to make student mobility a core feature of the University of Delhi's academic offering.",
    timeline: [
      {
        phase: "Phase 1",
        title: "Discovery & Assessment",
        duration: "Months 1-3",
        description:
          "Stakeholder interviews across 15 departments, regulatory landscape mapping, financial modeling for exchange programs, and benchmarking against peer institutions.",
      },
      {
        phase: "Phase 2",
        title: "Framework Design",
        duration: "Months 4-8",
        description:
          "Credit equivalence mapping for 120+ courses, partner institution evaluation and selection, student selection criteria development, and funding model design.",
      },
      {
        phase: "Phase 3",
        title: "Partnership Building",
        duration: "Months 9-12",
        description:
          "MoU negotiation with University of Melbourne, pilot program design, visa and logistics support framework, and pre-departure orientation curriculum.",
      },
      {
        phase: "Phase 4",
        title: "Launch & Scale",
        duration: "Months 13-18",
        description:
          "Pilot cohort of 40 students, monitoring and evaluation framework deployment, feedback integration, and expansion planning for additional departments.",
      },
    ],
    outcomeTitle: "The Outcome",
    outcomes: [
      {
        metric: "340+",
        label: "Students exchanged over 5 years",
      },
      {
        metric: "92%",
        label: "Student satisfaction rate",
      },
      {
        metric: "35%",
        label: "Increase in international placements",
      },
      {
        metric: "120+",
        label: "Courses with mapped credit equivalence",
      },
    ],
    narrative:
      "The exchange framework has become a defining feature of Delhi University's academic identity. Students from Commerce, Political Science, Environmental Studies, and now Engineering departments participate in structured semester exchanges. The program has attracted media attention, inspired similar frameworks at other Indian universities, and significantly enhanced the University's positioning in national and international rankings.",
    learnings: [
      "University-wide frameworks require top-level administrative champion — the Vice Chancellor's office must be directly involved.",
      "Credit equivalence mapping is the most time-consuming and critical step — invest in dedicated academic coordination.",
      "Student selection criteria must balance merit, diversity, and financial need to ensure equitable access.",
      "Pre-departure orientation significantly impacts student outcomes — cultural preparation matters as much as academic preparation.",
    ],
    relatedSlugs: [
      "manipal-academy-naac-accreditation",
      "somaiya-vidyavihar-uk-twinning",
    ],
  },
  "manipal-academy-naac-accreditation": {
    institution: "Manipal Academy of Higher Education",
    country: "India",
    flag: "IN",
    programType: "Accreditation",
    tagline:
      "Achieving NAAC A++ grade while preparing for international ranking submissions",
    challengeTitle: "The Challenge",
    challenge:
      "MAHE, one of India's premier private universities with 30+ programs and 28,000+ students, sought to achieve the highest NAAC grade (A++) while simultaneously preparing for QS World University Rankings submissions. The dual objective required quality improvement across all 7 NAAC criteria while building research capacity and internationalization metrics.",
    challengePoints: [
      "Fragmented quality assurance processes across multiple constituent colleges",
      "Research output below potential relative to institutional capacity",
      "Inconsistent student feedback and outcome tracking mechanisms",
      "Need to demonstrate quality culture rather than just compliance",
    ],
    approachTitle: "Our Approach",
    approach:
      "We designed a parallel-track quality transformation program — one focused on NAAC criteria compliance and evidence portfolio, the other on building the research and internationalization infrastructure required for global rankings.",
    timeline: [
      {
        phase: "Phase 1",
        title: "Gap Analysis",
        duration: "Months 1-2",
        description:
          "Comprehensive NAAC gap analysis across all 7 criteria, research output audit, stakeholder satisfaction baseline survey, and NIRF parameter benchmarking.",
      },
      {
        phase: "Phase 2",
        title: "Quality Infrastructure",
        duration: "Months 3-8",
        description:
          "IQAC restructuring, evidence repository design, automated data collection systems, faculty development programs, and student outcome tracking platform deployment.",
      },
      {
        phase: "Phase 3",
        title: "Evidence Portfolio",
        duration: "Months 9-14",
        description:
          "Self-Study Report drafting, quantitative data validation, qualitative evidence curation, stakeholder testimonial collection, and mock assessment.",
      },
      {
        phase: "Phase 4",
        title: "Assessment & Ranking",
        duration: "Months 15-18",
        description:
          "NAAC peer team visit coordination, post-visit response management, QS ranking data submission, and institutional positioning strategy.",
      },
    ],
    outcomeTitle: "The Outcome",
    outcomes: [
      {
        metric: "A++",
        label: "NAAC grade achieved first attempt",
      },
      {
        metric: "42",
        label: "QS Asia ranking positions improved",
      },
      {
        metric: "3x",
        label: "Research publication increase",
      },
      {
        metric: "95%",
        label: "Stakeholder satisfaction score",
      },
    ],
    narrative:
      "MAHE achieved the NAAC A++ grade within the first assessment cycle — a rare accomplishment for an institution of its scale. The quality transformation simultaneously positioned MAHE for QS World University Rankings, resulting in a 42-position improvement in the QS Asia rankings. The evidence portfolio and quality assurance systems built during the process continue to drive institutional improvement.",
    learnings: [
      "NAAC preparation should begin 18+ months before the assessment window — last-minute compliance shows in the evidence quality.",
      "The Self-Study Report must tell a coherent institutional narrative, not just present data points.",
      "Faculty engagement is critical — quality is demonstrated through culture, not just documentation.",
      "Simultaneous NIRF and NAAC preparation creates synergies but requires careful project management.",
    ],
    relatedSlugs: [
      "nirf-ranking-strategy-institutional-guidelines",
      "somaiya-vidyavihar-uk-twinning",
    ],
  },
  "somaiya-vidyavihar-uk-twinning": {
    institution: "Somaiya Vidyavihar University",
    country: "United Kingdom",
    flag: "UK",
    programType: "Twinning Program",
    tagline:
      "Creating 2+2 twinning pathways with four leading UK universities",
    challengeTitle: "The Challenge",
    challenge:
      "Somaiya Vidyavihar, a multi-campus university in Mumbai with strengths in engineering, management, and liberal arts, wanted to create structured 2+2 twinning pathways that would allow students to complete the first two years in India and the final two years at partner UK universities — earning a UK degree at a fraction of the cost.",
    challengePoints: [
      "Diverse program portfolio requiring individual credit alignment with different UK institutions",
      "Regulatory complexity across UGC, UUK, and individual university academic boards",
      "Quality assurance frameworks to ensure Indian students meet UK academic standards",
      "Financial modeling to make programs affordable while maintaining sustainability",
    ],
    approachTitle: "Our Approach",
    approach:
      "We conducted partner institution mapping, designed credit transfer frameworks for 6 programs, negotiated institutional agreements, and built the student support infrastructure required for successful twinning outcomes.",
    timeline: [
      {
        phase: "Phase 1",
        title: "Partner Mapping",
        duration: "Months 1-3",
        description:
          "UK university landscape analysis, institutional compatibility assessment, program-level alignment evaluation, and financial viability modeling.",
      },
      {
        phase: "Phase 2",
        title: "Credit Framework",
        duration: "Months 4-8",
        description:
          "Course-by-course credit equivalence mapping, curriculum gap analysis, module alignment with UK partner requirements, and quality assurance protocol design.",
      },
      {
        phase: "Phase 3",
        title: "Agreement Negotiation",
        duration: "Months 9-14",
        description:
          "MoU and articulation agreement drafting, academic calendar synchronization, student selection criteria finalization, and fee structure negotiation.",
      },
      {
        phase: "Phase 4",
        title: "Launch & Operations",
        duration: "Months 15-18",
        description:
          "Student recruitment campaign, pre-departure support system, visa application guidance, and ongoing monitoring framework.",
      },
    ],
    outcomeTitle: "The Outcome",
    outcomes: [
      {
        metric: "4",
        label: "UK partner universities",
      },
      {
        metric: "200+",
        label: "Students enrolled annually",
      },
      {
        metric: "6",
        label: "Program twinning pathways",
      },
      {
        metric: "88%",
        label: "Graduation completion rate",
      },
    ],
    narrative:
      "The twinning programs with University of Birmingham, Queen Mary University of London, University of Leeds, and Aston University have become one of India's most successful institutional twinning frameworks. Students earn globally recognized UK degrees while studying in India for the first two years — dramatically reducing the cost of international education while maintaining academic rigor.",
    learnings: [
      "Credit alignment must be completed before marketing begins — promises to students must be backed by institutional agreements.",
      "UK partner institutions require evidence of teaching quality — invest in faculty development aligned with UK pedagogical standards.",
      "Student support infrastructure for visa, accommodation, and transition must be built before the first cohort departs.",
      "Alumni tracking of twinning graduates provides the strongest evidence for program sustainability and expansion.",
    ],
    relatedSlugs: [
      "university-of-delhi-melbourne-exchange",
      "gujarat-maritime-university-international-collaboration",
    ],
  },
  "vit-branding-east-asia-partnerships": {
    institution: "VIT University",
    country: "Japan",
    flag: "JP",
    programType: "Branding & Partnerships",
    tagline:
      "Building institutional brand and research partnerships across East Asia",
    challengeTitle: "The Challenge",
    challenge:
      "VIT University, one of India's leading private universities known for engineering and technology programs, wanted to establish a brand presence in East Asian markets — particularly Japan and South Korea — while building research partnerships that would enhance its academic capabilities and global ranking position.",
    challengePoints: [
      "Limited brand recognition of Indian universities in East Asian markets",
      "No established institutional networks or partnership frameworks",
      "Cultural and language barriers in relationship building",
      "Need to differentiate from established Western and regional partnerships",
    ],
    approachTitle: "Our Approach",
    approach:
      "We developed a targeted East Asia engagement strategy combining institutional branding, partnership development, and research collaboration — leveraging India's growing economic relationship with the region and VIT's specific strengths in technology and engineering.",
    timeline: [
      {
        phase: "Phase 1",
        title: "Market Intelligence",
        duration: "Months 1-3",
        description:
          "East Asian higher education landscape analysis, institutional partner long-listing, cultural briefing, and brand positioning strategy development.",
      },
      {
        phase: "Phase 2",
        title: "Outreach & Networking",
        duration: "Months 4-8",
        description:
          "Delegation visits to Japan and South Korea, conference presentations, institutional meetings, and relationship building with university leadership.",
      },
      {
        phase: "Phase 3",
        title: "Partnership Design",
        duration: "Months 9-14",
        description:
          "Joint research lab establishment, faculty exchange agreements, student mobility framework, and co-funded research project development.",
      },
      {
        phase: "Phase 4",
        title: "Scale & Sustainability",
        duration: "Months 15-18",
        description:
          "Partnership operationalization, student recruitment in East Asia, joint conference hosting, and expansion planning for additional partnerships.",
      },
    ],
    outcomeTitle: "The Outcome",
    outcomes: [
      {
        metric: "12",
        label: "East Asian partnerships established",
      },
      {
        metric: "3",
        label: "Joint research labs created",
      },
      {
        metric: "28%",
        label: "Increase in East Asian enrollment",
      },
      {
        metric: "15+",
        label: "Joint publications produced",
      },
    ],
    narrative:
      "VIT's East Asia strategy transformed the institution's international profile. The 12 partnerships spanned Tohoku University, KAIST, Yonsei University, and other leading institutions. Three joint research labs — in AI, sustainable energy, and advanced materials — became hubs for collaborative research that attracted significant funding. The brand-building efforts resulted in a measurable increase in East Asian student enrollment and strengthened VIT's position in QS Asia rankings.",
    learnings: [
      "East Asian partnerships require sustained relationship investment — one delegation visit is not enough.",
      "Research collaboration is the most effective entry point for institutional partnerships in Japan and South Korea.",
      "Cultural competency training for institutional leadership significantly improves partnership development outcomes.",
      "Joint research labs create deeper institutional ties than student exchange alone — they embed collaboration in daily academic operations.",
    ],
    relatedSlugs: [
      "gujarat-maritime-university-international-collaboration",
      "cept-university-research-partnership",
    ],
  },
  "gujarat-maritime-university-international-collaboration": {
    institution: "Gujarat Maritime University",
    country: "Singapore",
    flag: "SG",
    programType: "International Collaboration",
    tagline:
      "Establishing global maritime partnerships for India's first maritime university",
    challengeTitle: "The Challenge",
    challenge:
      "Gujarat Maritime University, India's first dedicated maritime university, needed to establish international partnerships to build curriculum credibility, develop faculty expertise, and create industry connections in a niche, internationally regulated domain where India was underrepresented.",
    challengePoints: [
      "No established maritime higher education networks in India",
      "International maritime regulation requires globally benchmarked curricula",
      "Faculty with international maritime industry experience were scarce",
      "Student recruitment required global credibility and recognition",
    ],
    approachTitle: "Our Approach",
    approach:
      "We mapped the global maritime education landscape, identified strategic partners across multiple continents, designed curriculum benchmarking frameworks, and built the institutional relationships required to establish GMU as a credible player in maritime education.",
    timeline: [
      {
        phase: "Phase 1",
        title: "Landscape Mapping",
        duration: "Months 1-3",
        description:
          "Global maritime education institution mapping, IMO framework analysis, partner compatibility assessment, and curriculum benchmarking design.",
      },
      {
        phase: "Phase 2",
        title: "Partner Engagement",
        duration: "Months 4-8",
        description:
          "Delegation visits to Singapore, UK, and Norway, institutional meetings, MoU negotiations, and curriculum alignment discussions.",
      },
      {
        phase: "Phase 3",
        title: "Partnership Framework",
        duration: "Months 9-14",
        description:
          "Curriculum benchmarking implementation, faculty exchange agreement design, joint research project development, and industry partnership facilitation.",
      },
      {
        phase: "Phase 4",
        title: "Operationalization",
        duration: "Months 15-18",
        description:
          "Student mobility program launch, faculty exchange execution, joint research project initiation, and ongoing relationship management.",
      },
    ],
    outcomeTitle: "The Outcome",
    outcomes: [
      {
        metric: "8",
        label: "Global maritime partnerships",
      },
      {
        metric: "40%",
        label: "Faculty participating in exchanges",
      },
      {
        metric: "IMO",
        label: "Framework alignment achieved",
      },
      {
        metric: "3",
        label: "Joint research projects funded",
      },
    ],
    narrative:
      "GMU's partnership network spans Singapore Maritime Academy, IMO-affiliated institutions, and maritime universities across Europe and Asia. Curriculum benchmarking against international standards has enhanced program credibility. Faculty exchange agreements covering 40% of teaching staff have brought international expertise directly into classrooms. The partnerships have positioned GMU as India's most internationally connected maritime university.",
    learnings: [
      "Niche institutions benefit from deep partnerships over broad networks — quality of relationships matters more than quantity.",
      "IMO framework alignment provides immediate credibility — regulatory benchmarking accelerates institutional acceptance.",
      "Faculty exchanges are the most effective way to build teaching quality in specialized domains.",
      "Industry partnerships in maritime education are essential — the sector values practical competence alongside academic credentials.",
    ],
    relatedSlugs: [
      "vit-branding-east-asia-partnerships",
      "cept-university-research-partnership",
    ],
  },
  "cept-university-research-partnership": {
    institution: "CEPT University",
    country: "United Arab Emirates",
    flag: "AE",
    programType: "Research Partnership",
    tagline:
      "Building collaborative research in sustainable urbanism with Gulf institutions",
    challengeTitle: "The Challenge",
    challenge:
      "CEPT University, India's leading institution in architecture, planning, and design, wanted to establish collaborative research partnerships with Gulf-based universities to address shared challenges in urban development, sustainable infrastructure, and climate adaptation — a domain where both regions face significant and interconnected challenges.",
    challengePoints: [
      "Geographic distance complicating sustained research collaboration",
      "Different academic cultures and research methodology approaches",
      "Funding mechanisms for international research partnerships were underdeveloped",
      "Need for practical research outcomes, not just academic publications",
    ],
    approachTitle: "Our Approach",
    approach:
      "We designed a research partnership framework that identified shared thematic priorities, established joint funding mechanisms, and created operational structures for sustained collaborative research across institutions.",
    timeline: [
      {
        phase: "Phase 1",
        title: "Research Alignment",
        duration: "Months 1-3",
        description:
          "Institutional research strength mapping, thematic priority identification, partner university assessment, and funding landscape analysis.",
      },
      {
        phase: "Phase 2",
        title: "Partnership Building",
        duration: "Months 4-8",
        description:
          "Delegation exchanges, joint research workshop hosting, collaborative proposal development, and MoU negotiation with Khalifa University and AUS.",
      },
      {
        phase: "Phase 3",
        title: "Research Framework",
        duration: "Months 9-14",
        description:
          "Joint research project design, PhD supervision framework, shared data platform development, and conference co-organization.",
      },
      {
        phase: "Phase 4",
        title: "Execution & Scale",
        duration: "Months 15-18",
        description:
          "Research project initiation, joint publication pipeline development, industry engagement, and expansion planning.",
      },
    ],
    outcomeTitle: "The Outcome",
    outcomes: [
      {
        metric: "6",
        label: "Joint research projects funded",
      },
      {
        metric: "2",
        label: "International conferences hosted",
      },
      {
        metric: "8",
        label: "PhD students in joint supervision",
      },
      {
        metric: "12+",
        label: "Joint publications produced",
      },
    ],
    narrative:
      "The CEPT-Khalifa-AUS research partnership has become a model for India-Gulf academic collaboration in urban development. Six jointly funded research projects address shared challenges: coastal resilience, affordable housing, transit-oriented development, heritage conservation, climate-adaptive infrastructure, and water-sensitive urban design. Two international conferences have brought together researchers and practitioners from both regions, creating a community of practice that extends beyond institutional boundaries.",
    learnings: [
      "Research partnerships succeed when they address shared problems — the most durable collaborations are built on mutual need, not institutional prestige.",
      "Joint funding mechanisms must be established early — research cannot wait for bureaucratic processes.",
      "PhD supervision frameworks create the deepest institutional ties — they embed collaboration in the research training pipeline.",
      "Industry engagement validates research relevance — Gulf institutions value applied research outcomes alongside academic publications.",
    ],
    relatedSlugs: [
      "vit-branding-east-asia-partnerships",
      "gujarat-maritime-university-international-collaboration",
    ],
  },
} as const;

type CaseStudySlug = keyof typeof CASE_STUDIES;

const ALL_SLUGS = Object.keys(CASE_STUDIES) as CaseStudySlug[];

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = CASE_STUDIES[slug as CaseStudySlug];

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-4xl font-bold text-ink mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Case Study Not Found
          </h1>
          <p className="text-ink-secondary mb-8">
            The case study you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-accent-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  const relatedSlugs = study.relatedSlugs.filter((s): s is CaseStudySlug =>
    (ALL_SLUGS as string[]).includes(s)
  );

  const programIcon: Record<string, typeof Globe> = {
    "Student Exchange": GraduationCap,
    Accreditation: Award,
    "Twinning Program": Building,
    "Branding & Partnerships": Globe,
    "International Collaboration": Globe,
    "Research Partnership": Globe,
  };
  const Icon = programIcon[study.programType] || Globe;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary-card py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04]" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Case Studies
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-accent/20 text-accent rounded-full border border-accent/30">
              <Icon className="w-3 h-3" />
              {study.programType}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-white/70 bg-white/10 rounded-full">
              <Globe className="w-3 h-3" />
              {study.country}
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {study.institution}
          </h1>
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl">
            {study.tagline}
          </p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-10 sm:py-12 bg-surface border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {study.outcomes.map((o, i) => (
              <div key={i} className="text-center">
                <p
                  className="text-3xl sm:text-4xl font-bold text-accent"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {o.metric}
                </p>
                <p className="text-xs text-ink-muted uppercase tracking-wider mt-1">
                  {o.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Challenge */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-danger" />
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-ink"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {study.challengeTitle}
              </h2>
            </div>
            <p className="text-lg text-ink-secondary leading-relaxed mb-6">
              {study.challenge}
            </p>
            <div className="bg-surface rounded-xl p-6 border border-border">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4">
                Key Challenges
              </p>
              <ul className="space-y-3">
                {(study.challengePoints as readonly string[]).map((point: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-danger/10 flex items-center justify-center text-danger text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-ink-secondary">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Approach / Timeline */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-accent" />
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-ink"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {study.approachTitle}
              </h2>
            </div>
            <p className="text-lg text-ink-secondary leading-relaxed mb-8">
              {study.approach}
            </p>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-border" />
              <div className="space-y-8">
                {study.timeline.map((phase, i) => (
                  <div key={i} className="relative flex gap-6">
                    <div className="relative z-10 w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                    </div>
                    <div className="bg-white rounded-xl border border-border p-6 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-semibold tracking-wider uppercase text-accent">
                          {phase.phase}
                        </span>
                        <span className="text-xs text-ink-muted flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {phase.duration}
                        </span>
                      </div>
                      <h3
                        className="text-lg font-bold text-ink mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {phase.title}
                      </h3>
                      <p className="text-sm text-ink-secondary leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Outcome */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-success" />
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-ink"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {study.outcomeTitle}
              </h2>
            </div>
            <div className="bg-gradient-to-br from-primary to-primary-card rounded-xl p-6 sm:p-8 mb-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {study.outcomes.map((o, i) => (
                  <div key={i} className="text-center">
                    <p
                      className="text-3xl sm:text-4xl font-bold text-accent"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {o.metric}
                    </p>
                    <p className="text-xs text-white/60 uppercase tracking-wider mt-1">
                      {o.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-lg text-ink-secondary leading-relaxed">
              {study.narrative}
            </p>
          </div>

          {/* Key Learnings */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-ink"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Key Learnings
              </h2>
            </div>
            <div className="space-y-4">
              {study.learnings.map((learning, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white rounded-xl border border-border p-5"
                >
                  <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-sm font-bold shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {learning}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-surface rounded-xl p-6 sm:p-8 text-center border border-border">
            <h3
              className="text-2xl font-bold text-ink mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Discuss a Similar Engagement
            </h3>
            <p className="text-ink-secondary mb-6 max-w-lg mx-auto">
              Our advisory team can help your institution achieve similar
              results through tailored strategic consulting.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-primary text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-accent-hover transition-colors"
              >
                Schedule a Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-border text-ink text-sm font-semibold tracking-wider uppercase rounded-lg hover:border-accent hover:text-accent transition-all"
              >
                More Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedSlugs.length > 0 && (
        <section className="py-12 sm:py-16 bg-surface border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-accent" />
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                Related Case Studies
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedSlugs.map((rSlug) => {
                const related = CASE_STUDIES[rSlug];
                if (!related) return null;
                const RIcon = programIcon[related.programType] || Globe;
                return (
                  <Link key={rSlug} href={`/case-studies/${rSlug}`}>
                    <article className="group bg-white rounded-xl border border-border hover:border-accent/30 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent rounded-full">
                          <RIcon className="w-3 h-3" />
                          {related.programType}
                        </span>
                      </div>
                      <h3
                        className="text-xl font-bold text-ink leading-snug mb-3 group-hover:text-accent transition-colors"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {related.institution}
                      </h3>
                      <p className="text-sm text-ink-secondary line-clamp-2 mb-4 flex-1">
                        {related.tagline}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className="text-xs text-ink-muted flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {related.country}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-accent group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-card">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Want Similar Results for Your Institution?
          </h2>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
            Every institution&apos;s journey is unique. Let&apos;s discuss how
            our strategic advisory can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-accent text-primary text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-accent-hover transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-white/20 text-white text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${study.institution} — ${study.programType} Case Study`,
            description: study.tagline,
            author: {
              "@type": "Organization",
              name: "Nyay Saathis",
            },
            publisher: {
              "@type": "Organization",
              name: "Nyay Saathis",
              logo: {
                "@type": "ImageObject",
                url: "/logo.png",
              },
            },
            datePublished: "2026-08-01",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://nyaysaathis.com/case-studies/${slug}`,
            },
            about: {
              "@type": "Organization",
              name: study.institution,
            },
            keywords: [
              study.programType,
              study.country,
              "Indian Higher Education",
              "Nyay Saathis",
            ],
          }),
        }}
      />
    </>
  );
}
