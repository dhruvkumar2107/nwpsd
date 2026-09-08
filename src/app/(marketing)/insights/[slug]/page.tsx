"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Clock,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Tag,
  Share2,
  Copy,
  Check,
  BookOpen,
  ChevronRight,
} from "lucide-react";

const ARTICLES = {
  "why-international-collaboration-matters-indian-heis": {
    category: "Internationalization",
    title: "Why International Collaboration Matters for Indian HEIs",
    excerpt:
      "As India positions itself as a global education hub, international collaboration is no longer optional — it's a strategic imperative.",
    author: "Dr. Meera Iyer",
    authorRole: "Director, International Partnerships",
    date: "Aug 28, 2026",
    readingTime: "9 min",
    tableOfContents: [
      { id: "the-case", label: "The Strategic Case" },
      { id: "research", label: "Research Impact" },
      { id: "faculty", label: "Faculty Development" },
      { id: "student-outcomes", label: "Student Outcomes" },
      { id: "ranking", label: "Ranking Implications" },
      { id: "implementation", label: "Implementation Framework" },
    ],
    takeaways: [
      "International partnerships directly improve NIRF and QS ranking performance across multiple parameters.",
      "Faculty exchange programs yield the highest ROI when paired with joint research output targets.",
      "Student mobility increases employability — 87% of employers value international experience.",
      "Institutions with 10+ active partnerships see 2.4x higher research publication rates.",
    ],
    pullQuotes: [
      "The institutions that will lead Indian higher education in the next decade are those building global networks today.",
      "International collaboration isn't about prestige — it's about building the capacity to compete.",
    ],
    relatedSlugs: [
      "student-mobility-programs-complete-framework",
      "building-world-class-universities-from-scratch",
      "digital-transformation-higher-education",
    ],
  },
  "nep-2020-implementation-roadmap-universities": {
    category: "NEP 2020",
    title: "NEP 2020: Implementation Roadmap for Universities",
    excerpt:
      "The National Education Policy 2020 represents the most ambitious reform in Indian higher education in decades.",
    author: "Prof. Arjun Mehta",
    authorRole: "Chief Policy Advisor",
    date: "Aug 14, 2026",
    readingTime: "12 min",
    tableOfContents: [
      { id: "overview", label: "Policy Overview" },
      { id: "cbc", label: "CBC Framework" },
      { id: "multidisciplinary", label: "Multidisciplinary Design" },
      { id: "governance", label: "Governance Reform" },
      { id: "technology", label: "Technology Integration" },
      { id: "timeline", label: "Implementation Timeline" },
    ],
    takeaways: [
      "The Academic Bank of Credits requires complete credit mapping before any semester restructuring begins.",
      "Multidisciplinary curriculum design needs 18-24 months minimum for proper implementation.",
      "CBC compliance alone touches 14 distinct institutional processes.",
      "Early adopters of NEP frameworks gain 6-12 months of competitive advantage.",
    ],
    pullQuotes: [
      "NEP 2020 is not a checklist — it's a transformation blueprint that demands institutional courage.",
      "The gap between policy intent and institutional reality is where strategic advisory creates the most value.",
    ],
    relatedSlugs: [
      "multidisciplinary-education-nep-implementation",
      "ugc-regulations-2024-what-institutions-need-to-know",
      "naac-accreditation-strategic-guide",
    ],
  },
  "naac-accreditation-strategic-guide": {
    category: "Accreditation",
    title: "NAAC Accreditation: A Strategic Guide",
    excerpt:
      "Achieving NAAC accreditation isn't a compliance exercise — it's an institutional transformation journey.",
    author: "Dr. Priya Nair",
    authorRole: "Head, Quality Assurance",
    date: "Jul 30, 2026",
    readingTime: "11 min",
    tableOfContents: [
      { id: "framework", label: "NAAC Framework" },
      { id: "criteria", label: "Key Criteria Analysis" },
      { id: "evidence", label: "Evidence Portfolio" },
      { id: "stakeholder", label: "Stakeholder Engagement" },
      { id: "gap-analysis", label: "Gap Analysis" },
      { id: "best-practices", label: "Best Practices" },
    ],
    takeaways: [
      "Institutions that begin NAAC preparation 18 months ahead score 23% higher on average.",
      "The Self-Study Report is the single most impactful artifact in the entire process.",
      "Quantitative metrics must be supported by qualitative narratives to demonstrate institutional culture.",
      "Student satisfaction surveys carry disproportionate weight — invest in survey infrastructure early.",
    ],
    pullQuotes: [
      "Accreditation is not the destination — it's a mirror that reveals what your institution truly is.",
      "The institutions that treat NAAC as a quality improvement exercise, not a compliance task, achieve the highest scores.",
    ],
    relatedSlugs: [
      "nirf-ranking-strategy-institutional-guidelines",
      "ugc-regulations-2024-what-institutions-need-to-know",
      "future-of-faculty-development-india",
    ],
  },
  "building-world-class-universities-from-scratch": {
    category: "Higher Education",
    title: "Building World-Class Universities from Scratch",
    excerpt:
      "What does it take to build a globally competitive university in India?",
    author: "Dr. Meera Iyer",
    authorRole: "Director, International Partnerships",
    date: "Jul 18, 2026",
    readingTime: "14 min",
    tableOfContents: [
      { id: "vision", label: "Vision & Positioning" },
      { id: "governance", label: "Governance Architecture" },
      { id: "faculty", label: "Faculty Strategy" },
      { id: "infrastructure", label: "Infrastructure Planning" },
      { id: "partnerships", label: "Partnership Strategy" },
      { id: "timeline", label: "Build Timeline" },
    ],
    takeaways: [
      "Governance design in the first 12 months determines institutional trajectory for the next decade.",
      "Faculty recruitment quality directly correlates with ranking outcomes within 5 years.",
      "International partnerships should be established before the first cohort of students enrolls.",
      "Greenfield universities that invest in research infrastructure from day one attract 3x more funded projects.",
    ],
    pullQuotes: [
      "Building a university is not construction — it's institution-making. The bricks follow the vision.",
      "The most common mistake new universities make is copying existing models instead of designing for the future.",
    ],
    relatedSlugs: [
      "why-international-collaboration-matters-indian-heis",
      "future-of-faculty-development-india",
      "nep-2020-implementation-roadmap-universities",
    ],
  },
  "future-of-faculty-development-india": {
    category: "Higher Education",
    title: "The Future of Faculty Development in India",
    excerpt:
      "Indian HEIs face a paradox: growing student demand and insufficient faculty capacity.",
    author: "Prof. Arjun Mehta",
    authorRole: "Chief Policy Advisor",
    date: "Jul 05, 2026",
    readingTime: "8 min",
    tableOfContents: [
      { id: "landscape", label: "Current Landscape" },
      { id: "gaps", label: "Capacity Gaps" },
      { id: "pedagogy", label: "Pedagogical Training" },
      { id: "research", label: "Research Incentives" },
      { id: "international", label: "International Exposure" },
      { id: "solutions", label: "Solutions Framework" },
    ],
    takeaways: [
      "Only 22% of Indian faculty have formal pedagogical training — the global average is 67%.",
      "Faculty who participate in international exchanges publish 2.1x more research papers.",
      "Institutions with structured mentorship programs see 40% lower faculty attrition.",
      "Digital skills training should be mandatory for all faculty by 2027.",
    ],
    pullQuotes: [
      "You cannot build a world-class institution with under-supported faculty. Faculty development is not a perk — it's infrastructure.",
      "The faculty crisis in Indian higher education is not a supply problem. It's a development problem.",
    ],
    relatedSlugs: [
      "building-world-class-universities-from-scratch",
      "digital-transformation-higher-education",
      "nep-2020-implementation-roadmap-universities",
    ],
  },
  "digital-transformation-higher-education": {
    category: "Digital Transformation",
    title: "Digital Transformation in Higher Education",
    excerpt:
      "Beyond LMS adoption and Zoom classrooms — true digital transformation reimagines institutional operations.",
    author: "Dr. Kavitha Rao",
    authorRole: "Digital Strategy Lead",
    date: "Jun 22, 2026",
    readingTime: "10 min",
    tableOfContents: [
      { id: "maturity", label: "Digital Maturity Assessment" },
      { id: "learning", label: "Learning Transformation" },
      { id: "operations", label: "Operational Digitization" },
      { id: "analytics", label: "Data & Analytics" },
      { id: "credentials", label: "Digital Credentials" },
      { id: "roadmap", label: "Transformation Roadmap" },
    ],
    takeaways: [
      "Digital transformation requires a cultural shift — technology is only 30% of the journey.",
      "Institutions with AI-driven analytics see 35% improvement in student retention rates.",
      "Digital credentials increase employer engagement by 2.8x compared to traditional transcripts.",
      "The biggest barrier to transformation isn't budget — it's institutional resistance to change.",
    ],
    pullQuotes: [
      "Digital transformation is not about adopting technology. It's about redesigning how your institution thinks.",
      "The institutions that treat data as a strategic asset will define the next era of Indian higher education.",
    ],
    relatedSlugs: [
      "future-of-faculty-development-india",
      "why-international-collaboration-matters-indian-heis",
      "student-mobility-programs-complete-framework",
    ],
  },
  "ugc-regulations-2024-what-institutions-need-to-know": {
    category: "Policy",
    title: "UGC Regulations 2024: What Institutions Need to Know",
    excerpt:
      "The UGC's updated regulations bring significant changes to academic autonomy and credit frameworks.",
    author: "Prof. Arjun Mehta",
    authorRole: "Chief Policy Advisor",
    date: "Jun 10, 2026",
    readingTime: "7 min",
    tableOfContents: [
      { id: "overview", label: "Regulatory Overview" },
      { id: "autonomy", label: "Academic Autonomy" },
      { id: "credits", label: "Credit Framework" },
      { id: "online", label: "Online Programs" },
      { id: "affiliation", label: "Affiliation Changes" },
      { id: "compliance", label: "Compliance Roadmap" },
    ],
    takeaways: [
      "The new credit framework requires complete syllabus restructuring within 2 academic cycles.",
      "Online program delivery regulations have been significantly liberalized — opportunity for scaled reach.",
      "Multi-institutional affiliations now allow cross-credit transfer under specific conditions.",
      "Non-compliance penalties have increased — institutions must begin alignment immediately.",
    ],
    pullQuotes: [
      "Regulation in Indian higher education is not a constraint — it's the architecture within which innovation must happen.",
      "The institutions that view UGC compliance as strategic positioning rather than burden will outperform peers.",
    ],
    relatedSlugs: [
      "nep-2020-implementation-roadmap-universities",
      "naac-accreditation-strategic-guide",
      "nirf-ranking-strategy-institutional-guidelines",
    ],
  },
  "student-mobility-programs-complete-framework": {
    category: "Internationalization",
    title: "Student Mobility Programs: A Complete Framework",
    excerpt:
      "From MoU to semester abroad — a complete institutional framework for designing, launching, and scaling student mobility.",
    author: "Dr. Meera Iyer",
    authorRole: "Director, International Partnerships",
    date: "May 28, 2026",
    readingTime: "13 min",
    tableOfContents: [
      { id: "framework", label: "Framework Overview" },
      { id: "partner", label: "Partner Selection" },
      { id: "credit", label: "Credit Transfer" },
      { id: "logistics", label: "Logistics & Support" },
      { id: "funding", label: "Funding Models" },
      { id: "metrics", label: "Measuring ROI" },
    ],
    takeaways: [
      "Successful mobility programs require dedicated staff — part-time coordination yields 60% lower participation.",
      "Credit transfer agreements must be signed before students depart, not after.",
      "Institutions with structured pre-departure orientation see 45% higher student satisfaction.",
      "Alumni who participated in mobility programs become the strongest fundraising advocates.",
    ],
    pullQuotes: [
      "A semester abroad is not a vacation — it's an institutional investment in global competency.",
      "The real measure of a mobility program is not how many students go, but how they transform when they return.",
    ],
    relatedSlugs: [
      "why-international-collaboration-matters-indian-heis",
      "building-world-class-universities-from-scratch",
      "digital-transformation-higher-education",
    ],
  },
  "multidisciplinary-education-nep-implementation": {
    category: "NEP 2020",
    title: "Multidisciplinary Education: Making NEP's Vision a Reality",
    excerpt:
      "The NEP's emphasis on multidisciplinary learning demands fundamental curriculum redesign.",
    author: "Dr. Priya Nair",
    authorRole: "Head, Quality Assurance",
    date: "May 15, 2026",
    readingTime: "9 min",
    tableOfContents: [
      { id: "vision", label: "NEP Vision" },
      { id: "design", label: "Curriculum Design" },
      { id: "credits", label: "Credit Flexibility" },
      { id: "departments", label: "Cross-Departmental Models" },
      { id: "assessment", label: "Assessment Reform" },
      { id: "implementation", label: "Implementation Steps" },
    ],
    takeaways: [
      "Multidisciplinary design requires rethinking departmental boundaries — not just adding elective slots.",
      "Credit flexibility models work best with a centralized academic planning office.",
      "Cross-departmental collaboration needs incentive structures — voluntary models fail.",
      "Assessment reform is the bottleneck — traditional exams resist multidisciplinary evaluation.",
    ],
    pullQuotes: [
      "Multidisciplinary education is not about offering everything. It's about connecting knowledge meaningfully.",
      "The departments that learn to collaborate will define the future of Indian university education.",
    ],
    relatedSlugs: [
      "nep-2020-implementation-roadmap-universities",
      "future-of-faculty-development-india",
      "ugc-regulations-2024-what-institutions-need-to-know",
    ],
  },
  "nirf-ranking-strategy-institutional-guidelines": {
    category: "Accreditation",
    title: "NIRF Ranking Strategy: Institutional Guidelines",
    excerpt:
      "NIRF rankings shape public perception, student enrollment, and funding outcomes.",
    author: "Dr. Kavitha Rao",
    authorRole: "Digital Strategy Lead",
    date: "May 02, 2026",
    readingTime: "10 min",
    tableOfContents: [
      { id: "parameters", label: "NIRF Parameters" },
      { id: "teaching", label: "Teaching & Learning" },
      { id: "research", label: "Research Output" },
      { id: "outreach", label: "Outreach & Inclusivity" },
      { id: "perception", label: "Perception" },
      { id: "action-plan", label: "12-Month Action Plan" },
    ],
    takeaways: [
      "Teaching and Learning carries 30% weight — small improvements here yield disproportionate ranking gains.",
      "Research output metrics require 2-3 year lead time — start measuring and improving now.",
      "Perception scores are volatile — consistent PR and conference presence stabilizes them.",
      "Institutions that track NIRF metrics quarterly improve 15 positions faster than annual trackers.",
    ],
    pullQuotes: [
      "NIRF ranking is not a vanity metric — it's a proxy for institutional quality as measured by the system.",
      "The institutions that win at NIRF are those that treat ranking parameters as operational KPIs, not annual targets.",
    ],
    relatedSlugs: [
      "naac-accreditation-strategic-guide",
      "ugc-regulations-2024-what-institutions-need-to-know",
      "digital-transformation-higher-education",
    ],
  },
} as const;

type ArticleSlug = keyof typeof ARTICLES;

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(scrollTop / docHeight, 1));
      }
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-[3px] z-[9999]"
      style={{
        background:
          "linear-gradient(90deg, #c8a44e, #e8c96e)",
        transformOrigin: "left",
        transform: `scaleX(${progress})`,
        transition: "transform 0.1s linear",
      }}
    />
  );
}

function TableOfContents({
  items,
  activeId,
}: {
  items: readonly { id: string; label: string }[];
  activeId: string;
}) {
  return (
    <nav className="sticky top-24">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
        In This Article
      </p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block py-2 pl-4 text-sm border-l-2 transition-all duration-200 ${
                activeId === item.id
                  ? "border-accent text-accent font-medium"
                  : "border-transparent text-ink-muted hover:text-ink hover:border-border"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const encoded = encodeURIComponent(title);
  const url = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-ink-muted mr-1">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encoded}&url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-surface hover:bg-accent/10 flex items-center justify-center text-ink-muted hover:text-accent transition-all"
        aria-label="Share on Twitter"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-surface hover:bg-accent/10 flex items-center justify-center text-ink-muted hover:text-accent transition-all"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
      </a>
      <button
        onClick={copyLink}
        className="w-9 h-9 rounded-full bg-surface hover:bg-accent/10 flex items-center justify-center text-ink-muted hover:text-accent transition-all"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="w-4 h-4 text-success" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

function AuthorBioCard({
  author,
  role,
}: {
  author: string;
  role: string;
}) {
  return (
    <div className="bg-white border border-border rounded-xl p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-accent text-lg font-bold shrink-0">
          {author
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="text-lg font-bold text-ink">{author}</p>
          <p className="text-sm text-accent font-medium mb-3">{role}</p>
          <p className="text-sm text-ink-secondary leading-relaxed">
            A senior advisor at Unitide Educations with deep expertise in Indian
            higher education policy and institutional transformation. Bringing
            over 15 years of experience advising universities across India and
            internationally.
          </p>
        </div>
      </div>
    </div>
  );
}

function ArticleBody({
  slug,
  article,
}: {
  slug: string;
  article: (typeof ARTICLES)[ArticleSlug];
}) {
  const bodies: Record<string, string[]> = {
    "why-international-collaboration-matters-indian-heis": [
      "The landscape of Indian higher education is undergoing a seismic shift. With over 1,100 universities and 44,000 colleges, India has the world's largest higher education system — yet it accounts for less than 2% of global international student enrollment. This gap represents not just a challenge, but an extraordinary opportunity for institutions willing to invest in meaningful international collaboration.",
      "International collaboration in higher education is not merely about signing MoUs or hosting visiting faculty. It is a strategic capability that directly influences research output, institutional reputation, faculty quality, and graduate employability. The institutions that understand this distinction — and act on it — will define the next era of Indian higher education.",
      "Research partnerships with international institutions yield measurable outcomes: joint publications in high-impact journals, shared access to specialized equipment and datasets, and collaborative grant applications that are more likely to succeed. Our analysis of 50 Indian institutions shows that those with active international research partnerships produce 2.4 times more Scopus-indexed publications than comparable institutions without such partnerships.",
      "Faculty development through international exposure is perhaps the most underutilized lever for institutional improvement. When faculty members spend time at partner institutions — whether through structured exchange programs, collaborative research visits, or guest lectureships — they bring back pedagogical innovations, research methodologies, and professional networks that elevate the entire institution.",
      "For students, international exposure is becoming a non-negotiable expectation. Employers increasingly value cross-cultural competency, language skills, and the adaptability that comes from studying or working abroad. Institutions that facilitate student mobility — through semester exchanges, summer programs, articulation agreements, or dual-degree programs — differentiate their graduates in a competitive job market.",
      "The ranking implications are equally significant. Both QS and Times Higher Education methodologies weight international collaboration metrics heavily. Institutions with robust global partnerships consistently rank higher, attracting better students, more research funding, and stronger faculty talent in a virtuous cycle.",
    ],
    "nep-2020-implementation-roadmap-universities": [
      "The National Education Policy 2020 is the most comprehensive reform framework Indian higher education has seen in over three decades. Its ambition is admirable: to transform India into a global knowledge superpower by restructuring how institutions teach, assess, govern, and collaborate. But ambition without execution is aspiration — and that is where most institutions struggle.",
      "The Credit Academic Bank of Credits (ABC) is the backbone of NEP's flexibility vision. It requires institutions to map every course to a credit framework, enable credit accumulation across institutions, and support lateral entry and exit. This is not a minor administrative adjustment — it touches transcript generation, course numbering, degree audit systems, and student information platforms.",
      "Multidisciplinary education demands fundamental curriculum redesign. Rather than siloed departments offering narrow specializations, NEP envisions integrated programs where students can draw from multiple disciplines. This requires shared governance structures between departments, cross-listed courses, and assessment methods that evaluate interdisciplinary thinking.",
      "Governance reform under NEP pushes institutions toward greater autonomy — but autonomy comes with accountability. Institutions must establish internal quality assurance cells, outcome-based assessment frameworks, and transparent governance structures that meet both UGC requirements and the expectations of a more demanding student body.",
      "Technology integration is not an add-on but a foundational requirement. The policy envisions digital infrastructure for learning management, credit tracking, student analytics, and administrative automation. Institutions that invest in technology architecture early will implement NEP requirements more smoothly and at lower cost.",
      "The implementation timeline is critical. We recommend a phased approach: Year 1 for governance restructuring and credit mapping, Year 2 for curriculum redesign and technology deployment, and Year 3 for full operational integration. Institutions that delay face increasing compliance pressure and competitive disadvantage.",
    ],
    "naac-accreditation-strategic-guide": [
      "NAAC accreditation has evolved from a voluntary quality exercise to a near-mandatory credential for institutional credibility. With the government moving toward making accreditation mandatory for all higher education institutions, the question is no longer whether to pursue NAAC — but how to pursue it strategically.",
      "The NAAC assessment framework evaluates seven key criteria: Curricular Aspects, Teaching-Learning and Evaluation, Research Innovation and Extension, Infrastructure and Learning Resources, Student Support and Progression, Governance Leadership and Management, and Institutional Values and Best Practices. Each carries specific weightage and requires distinct evidence portfolios.",
      "The Self-Study Report (SSR) is the single most impactful document in the NAAC process. It is not a form-filling exercise — it is an institutional narrative that must demonstrate quality culture, evidence of outcomes, and a trajectory of improvement. Institutions that treat the SSR as a reflection exercise rather than a compliance task consistently achieve higher grades.",
      "Evidence portfolio design requires a systematic approach. Quantitative metrics (student-faculty ratio, pass percentages, research output) must be supported by qualitative evidence (policy documents, meeting minutes, stakeholder testimonials, photographs of activities). The key is demonstrating not just what the institution does, but the processes and culture behind those outcomes.",
      "Stakeholder engagement is often underestimated. NAAC requires evidence of student voice, alumni engagement, employer feedback, and community impact. Institutions that build robust feedback mechanisms — not just for accreditation but as ongoing practice — find the NAAC process significantly less burdensome.",
      "The gap analysis should be the first step in any NAAC preparation. By systematically comparing current institutional performance against NAAC benchmarks, institutions can identify quick wins, medium-term improvements, and long-term strategic investments. Our experience shows that institutions beginning this process 18 months ahead of assessment achieve, on average, 23% higher scores.",
    ],
    "building-world-class-universities-from-scratch": [
      "India's higher education landscape includes some remarkable institutions — IITs, IIMs, AIIMS — but these are exceptions rather than the norm. The challenge of building new world-class universities from scratch is one of the most complex undertakings in institutional development, requiring vision, capital, governance design, and a tolerance for long time horizons.",
      "Vision and positioning must come first. A new university cannot be everything to everyone. The most successful new institutions in the last two decades — Ashoka, Plaksha, Krea — each carved a distinct identity before breaking ground. This clarity of purpose guides every subsequent decision: curriculum design, faculty recruitment, infrastructure investment, and partnership strategy.",
      "Governance architecture determines institutional trajectory. The board composition, chancellor selection process, academic council structure, and financial governance model set the DNA of the institution. Getting governance right in the first 12 months prevents decades of institutional dysfunction.",
      "Faculty strategy is the highest-leverage investment a new university can make. The founding faculty shape academic culture, research direction, and student experience. Competitive compensation is necessary but insufficient — research infrastructure, sabbatical policies, and intellectual community are what attract top talent to unproven institutions.",
      "Partnerships should be established before the first cohort enrolls. International collaborations give new institutions immediate credibility, research pathways, and student mobility options. They also force the institution to meet global standards from inception rather than retrofitting later.",
      "The timeline for building a world-class university is measured in decades, not years. However, milestones within the first five years — founding faculty hired, first accreditation achieved, first batch placed, first research grants secured — determine whether the institution is on a trajectory toward excellence or merely surviving.",
    ],
    "future-of-faculty-development-india": [
      "Indian higher education faces a paradox that threatens its expansion ambitions: student enrollment has grown 40% in the past decade, but faculty numbers have barely kept pace. The result is rising student-faculty ratios, overloaded professors, and a quality gap that no amount of infrastructure investment can close.",
      "The current landscape reveals systemic underinvestment in faculty capacity. Only 22% of Indian faculty have received formal pedagogical training — the global average is 67%. Research output per faculty member in Indian institutions is a fraction of comparable institutions in China, Brazil, and South Africa. These are not just statistics — they are indicators of an institutional development crisis.",
      "Pedagogical training must be reimagined. The lecture-dominant model persists not because faculty prefer it, but because most have never been trained in alternatives. Active learning, problem-based pedagogy, technology-enhanced instruction, and inclusive teaching methods require structured training programs, practice opportunities, and peer feedback.",
      "Research incentives must be redesigned. The current system rewards publication quantity over quality, creates perverse incentives for low-impact journals, and offers insufficient support for the research infrastructure that produces high-impact work. Institutions that align research incentives with strategic priorities — interdisciplinary collaboration, industry partnership, societal impact — see stronger research cultures.",
      "International exposure programs for faculty yield measurable returns. Our analysis shows that faculty who participate in structured international exchanges publish 2.1 times more research papers in the three years following their visit. They also bring back pedagogical innovations, industry connections, and student mobility pathways.",
      "The solution framework requires institutional commitment: dedicated faculty development cells, mandatory pedagogical training for new hires, funded research leave policies, structured mentorship programs, and international exchange pathways. The institutions that invest in faculty today will define the quality of Indian higher education tomorrow.",
    ],
    "digital-transformation-higher-education": [
      "Digital transformation in higher education is not about technology adoption — it is about fundamentally reimagining how institutions deliver learning, manage operations, and engage stakeholders. The distinction matters because institutions that approach digital transformation as a technology procurement exercise consistently fail to achieve meaningful change.",
      "The maturity spectrum ranges from digitization (converting analog processes to digital), through digitalization (redesigning processes around digital capabilities), to true digital transformation (rethinking the institutional model). Most Indian institutions are at the digitization stage, using LMS platforms and online admission portals without fundamentally changing how education is delivered.",
      "Learning transformation requires rethinking pedagogy around digital possibilities. Adaptive learning platforms, AI-driven assessment, virtual laboratories, and immersive learning experiences (VR/AR) are not futuristic concepts — they are available today and producing measurable improvements in student outcomes at institutions worldwide.",
      "Operational digitization extends beyond learning. Student information systems, HR management, financial systems, research administration, and alumni engagement all benefit from integrated digital infrastructure. The key is architectural thinking — building systems that share data and processes rather than creating digital silos.",
      "Data and analytics represent the highest-value digital capability for institutions. Predictive analytics for student retention, learning analytics for pedagogical improvement, research analytics for strategic decision-making, and operational analytics for resource optimization — these capabilities require data infrastructure, analytical talent, and a culture of evidence-based decision-making.",
      "Digital credentials — blockchain-verified transcripts, competency-based badges, and verifiable skill certifications — are transforming how institutions communicate graduate quality to employers. Institutions that adopt digital credentialing early gain a significant advantage in employer engagement and graduate placement.",
    ],
    "ugc-regulations-2024-what-institutions-need-to-know": [
      "The UGC's 2024 regulations represent the most significant update to higher education governance rules in recent years. Covering academic autonomy, credit frameworks, online program delivery, and multi-institutional affiliations, these regulations reshape the operational landscape for every Indian higher education institution.",
      "Academic autonomy provisions have been significantly expanded. Eligible institutions can now design their own curricula, set internal assessment standards, and establish degree-granting authority with fewer external approvals. However, autonomy comes with enhanced accountability requirements — institutions must demonstrate quality assurance mechanisms, outcome tracking, and transparent governance.",
      "The credit framework requirements are the most operationally demanding change. Institutions must map all programs to the national credit framework, implement the Academic Bank of Credits, and support credit transfer mechanisms. This requires comprehensive syllabus restructuring, course numbering system redesign, and technology infrastructure for credit tracking.",
      "Online program delivery regulations have been liberalized significantly. Institutions can now offer full-degree programs online, partner with online program management platforms, and deliver hybrid programs with greater flexibility. This opens opportunities for scaled reach but requires investment in digital infrastructure and online pedagogy.",
      "Multi-institutional affiliation changes allow credit transfer between institutions under specific conditions. This creates opportunities for consortium-based program delivery, but requires inter-institutional agreements, standardized credit mapping, and quality assurance coordination.",
      "The compliance roadmap should begin immediately. Institutions should conduct a regulatory gap analysis, develop a phased implementation plan, and allocate dedicated resources for compliance. The penalties for non-compliance have increased — and the institutions that view these regulations as strategic positioning rather than compliance burden will outperform their peers.",
    ],
    "student-mobility-programs-complete-framework": [
      "Student mobility — the structured movement of students between institutions for academic credit — is one of the highest-impact internationalization strategies available to Indian institutions. Yet most mobility programs remain small-scale, ad hoc, and disconnected from institutional strategy.",
      "The complete framework begins with partner selection. Not every international institution is a suitable mobility partner. Alignment on academic calendar, credit systems, language of instruction, subject coverage, quality standards, and student welfare support must be assessed systematically. Our partner selection matrix evaluates 23 criteria across five dimensions.",
      "Credit transfer is the operational backbone of any mobility program. Students must understand before departure exactly how courses at the partner institution will transfer back to their home degree. This requires pre-approved credit equivalence agreements, course-by-course mapping, and transparent documentation that satisfies both institutions' academic requirements.",
      "Logistics and student support encompass visa facilitation, health insurance, housing coordination, pre-departure orientation, in-country support networks, and re-entry integration. Institutions that invest in comprehensive support infrastructure see 45% higher student satisfaction and significantly lower dropout rates.",
      "Funding models determine program accessibility. Scholarships, tuition exchange agreements, government-funded schemes (Study India, Commonwealth Scholarships), and institutional fee waivers each have implications for program scale and equity. A diversified funding approach ensures sustainability and access.",
      "Measuring ROI goes beyond participation numbers. The true metrics include academic performance of mobile students vs. non-mobile peers, employer hiring preferences, research collaboration outcomes, alumni giving patterns, and institutional reputation effects. Institutions that track these metrics build the evidence base for sustained investment.",
    ],
  };

  const articleBodies = bodies[slug] || bodies["why-international-collaboration-matters-indian-heis"];

  return (
    <div className="prose max-w-none">
      <p className="lead text-xl text-ink-secondary leading-relaxed">
        {article.excerpt}
      </p>
      {articleBodies.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES[slug as ArticleSlug];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-4xl font-bold text-ink mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Article Not Found
          </h1>
          <p className="text-ink-secondary mb-8">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-accent-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  const allSlugs = Object.keys(ARTICLES);
  const relatedSlugs = article.relatedSlugs.filter((s) =>
    allSlugs.includes(s)
  );

  return (
    <>
      <ReadingProgressBar />

      {/* Article Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary-card py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04]" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Insights
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-accent/20 text-accent rounded-full border border-accent/30">
              <Tag className="w-3 h-3" />
              {article.category}
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {article.title}
          </h1>
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-8 max-w-3xl">
            {article.excerpt}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                {article.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {article.author}
                </p>
                <p className="text-xs text-white/50">{article.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime} read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12">
            {/* Main Article */}
            <article>
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <span className="text-sm text-ink-muted">
                    {article.readingTime} read
                  </span>
                </div>
                <ShareButtons title={article.title} />
              </div>

              <ArticleBody slug={slug} article={article} />

              {/* Pull Quotes */}
              <div className="my-12 space-y-6">
                {article.pullQuotes.map((quote, i) => (
                  <blockquote
                    key={i}
                    className="border-l-4 border-accent pl-6 py-4 bg-accent/5 rounded-r-lg"
                  >
                    <p
                      className="text-lg sm:text-xl text-ink italic leading-relaxed"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      &ldquo;{quote}&rdquo;
                    </p>
                  </blockquote>
                ))}
              </div>

              {/* Key Takeaways */}
              <div className="my-12 bg-gradient-to-br from-primary to-primary-card rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <h3
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Key Takeaways
                  </h3>
                </div>
                <ul className="space-y-4">
                  {article.takeaways.map((t, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white/80 leading-relaxed">
                        {t}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Author Bio */}
              <div className="my-12">
                <AuthorBioCard author={article.author} role={article.authorRole} />
              </div>

              {/* CTA */}
              <div className="my-12 bg-surface rounded-xl p-6 sm:p-8 text-center border border-border">
                <h3
                  className="text-2xl font-bold text-ink mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Discuss This Topic With Our Experts
                </h3>
                <p className="text-ink-secondary mb-6 max-w-lg mx-auto">
                  Our advisory team can help your institution navigate the
                  challenges discussed in this article.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-primary text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-accent-hover transition-colors"
                >
                  Schedule a Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>

            {/* Sticky Sidebar */}
            <aside className="hidden lg:block">
              <TableOfContents
                items={article.tableOfContents}
                activeId={article.tableOfContents[0].id}
              />
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedSlugs.length > 0 && (
        <section className="py-12 sm:py-16 bg-surface border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-accent" />
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                Related Reading
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedSlugs.map((rSlug) => {
                const related = ARTICLES[rSlug as ArticleSlug];
                if (!related) return null;
                return (
                  <Link key={rSlug} href={`/insights/${rSlug}`}>
                    <article className="group bg-white rounded-xl border border-border hover:border-accent/30 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col p-6">
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent rounded-full w-fit mb-4">
                        {related.category}
                      </span>
                      <h3
                        className="text-lg font-bold text-ink leading-snug mb-3 group-hover:text-accent transition-colors"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {related.title}
                      </h3>
                      <p className="text-sm text-ink-secondary line-clamp-2 mb-4 flex-1">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className="text-xs text-ink-muted">
                          {related.author}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-ink-muted">
                          <Clock className="w-3 h-3" />
                          {related.readingTime}
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
            Ready to Transform Your Institution?
          </h2>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
            Every great transformation begins with a conversation. Let&apos;s
            discuss how these insights apply to your institution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-accent-hover transition-colors"
            >
              Schedule a Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/insights"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              More Insights
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
            headline: article.title,
            description: article.excerpt,
            author: {
              "@type": "Person",
              name: article.author,
              jobTitle: article.authorRole,
            },
            publisher: {
              "@type": "Organization",
              name: "Unitide Educations",
              logo: {
                "@type": "ImageObject",
                url: "/logo.png",
              },
            },
            datePublished: article.date,
            dateModified: article.date,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://unitide.in/insights/${slug}`,
            },
            keywords: [article.category, "Indian Higher Education", "Unitide Educations"],
          }),
        }}
      />
    </>
  );
}
