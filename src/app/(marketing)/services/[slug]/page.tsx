import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, ArrowUpRight } from "lucide-react";

const serviceData: Record<string, {
  number: string;
  title: string;
  description: string;
  fullDescription: string;
  outcomes: { title: string; detail: string }[];
  phases: { step: string; title: string; description: string }[];
  relatedServices: { title: string; slug: string }[];
}> = {
  "strategic-planning": {
    number: "01",
    title: "Strategic Planning",
    description: "DPR, feasibility studies, and master planning for institutions seeking sustainable growth.",
    fullDescription: "Our Strategic Planning service provides end-to-end consulting for institutions at every stage of their evolution. From Detailed Project Reports (DPRs) for new institutions to comprehensive master plans for existing campuses, we combine data-driven insights with deep domain expertise. Our team conducts thorough feasibility studies that assess market demand, financial viability, infrastructure requirements, and regulatory pathways, ensuring every recommendation is grounded in reality and aligned with your long-term vision.",
    outcomes: [
      { title: "Comprehensive DPR", detail: "Bankable Detailed Project Reports tailored for regulatory approvals and funding agencies" },
      { title: "Feasibility Studies", detail: "Data-backed market analysis, financial projections, and risk assessments" },
      { title: "Master Planning", detail: "Campus development blueprints integrating academic, residential, and recreational zones" },
      { title: "Growth Roadmap", detail: "5-10 year strategic plans with measurable milestones and KPIs" },
    ],
    phases: [
      { step: "Phase 1", title: "Discovery & Assessment", description: "Deep-dive into current state, institutional aspirations, market landscape, and competitive positioning." },
      { step: "Phase 2", title: "Research & Analysis", description: "Comprehensive data collection, benchmarking studies, stakeholder interviews, and SWOT analysis." },
      { step: "Phase 3", title: "Strategy Formulation", description: "Developing the strategic framework, identifying growth levers, and crafting the master plan." },
      { step: "Phase 4", title: "Implementation Support", description: "Roadmap execution, progress tracking, course corrections, and stakeholder alignment." },
    ],
    relatedServices: [
      { title: "NEP 2020 Implementation", slug: "nep-2020" },
      { title: "Accreditation & Ranking", slug: "accreditation-ranking" },
      { title: "Fundraising", slug: "fundraising" },
    ],
  },
  "international-partnerships": {
    number: "02",
    title: "International Partnerships",
    description: "Building global collaborations that enable student and faculty mobility across international borders.",
    fullDescription: "In an increasingly interconnected world, international partnerships are no longer a luxury but a necessity for institutions seeking global recognition. Unitide Educations facilitates meaningful collaborations with universities and institutions across six continents, enabling student exchanges, faculty mobility, joint degree programs, and collaborative research. Our extensive network spans over 45 institutional partnerships across 15+ countries, providing your students and faculty with unparalleled global exposure.",
    outcomes: [
      { title: "Global Network Access", detail: "Connections to 45+ partner institutions across 15+ countries" },
      { title: "Mobility Programs", detail: "Structured student and faculty exchange frameworks with credit transfer mechanisms" },
      { title: "Joint Programs", detail: "Dual degree, twinning, and articulation agreement development" },
      { title: "Research Collaborations", detail: "Cross-border research partnerships with funding opportunities" },
    ],
    phases: [
      { step: "Phase 1", title: "Strategic Mapping", description: "Identifying potential partners aligned with institutional goals, academic programs, and student demographics." },
      { step: "Phase 2", title: "Outreach & Engagement", description: "Formal communication, institutional presentations, and preliminary discussions with prospective partners." },
      { step: "Phase 3", title: "Agreement Development", description: "Drafting MOUs, articulation agreements, and operational frameworks for collaboration." },
      { step: "Phase 4", title: "Program Launch", description: "Student/faculty orientation, administrative setup, monitoring systems, and continuous improvement." },
    ],
    relatedServices: [
      { title: "NEP 2020 Implementation", slug: "nep-2020" },
      { title: "Strategic Planning", slug: "strategic-planning" },
      { title: "Accreditation & Ranking", slug: "accreditation-ranking" },
    ],
  },
  "nep-2020": {
    number: "03",
    title: "NEP 2020 Implementation",
    description: "Comprehensive guidance on academic reforms and curriculum redesign aligned with the National Education Policy.",
    fullDescription: "The National Education Policy 2020 represents the most transformative shift in Indian education in decades. Our NEP 2020 Implementation service guides institutions through every aspect of this transition — from adopting the four-year undergraduate framework and multidisciplinary approach to establishing Academic Bank of Credits (ABC), implementing the Choice Based Credit System (CBCS), and setting up multidisciplinary education and research universities. We ensure your institution not only complies with regulatory mandates but truly leverages NEP 2020 to enhance academic quality.",
    outcomes: [
      { title: "Curriculum Redesign", detail: "NEP-aligned curriculum with multidisciplinary approach and flexible learning paths" },
      { title: "CBCS Implementation", detail: "Choice Based Credit System setup with Academic Bank of Credits integration" },
      { title: "Faculty Readiness", detail: "Training programs for faculty on pedagogical shifts and outcome-based education" },
      { title: "Regulatory Filing", detail: "Complete documentation and filing support for regulatory approvals" },
    ],
    phases: [
      { step: "Phase 1", title: "Gap Analysis", description: "Assessing current academic structures against NEP 2020 requirements and identifying priority areas." },
      { step: "Phase 2", title: "Curriculum Development", description: "Redesigning programs, developing CBCS frameworks, and creating multidisciplinary pathways." },
      { step: "Phase 3", title: "Capacity Building", description: "Faculty training, infrastructure upgrades, and administrative system implementation." },
      { step: "Phase 4", title: "Implementation & Monitoring", description: "Phased rollout, student transition management, and quality assurance mechanisms." },
    ],
    relatedServices: [
      { title: "Strategic Planning", slug: "strategic-planning" },
      { title: "HR & Faculty Development", slug: "hr-faculty-development" },
      { title: "Accreditation & Ranking", slug: "accreditation-ranking" },
    ],
  },
  "accreditation-ranking": {
    number: "04",
    title: "Accreditation & Ranking",
    description: "Expert preparation for NAAC, NIRF, and global rankings with data-driven quality enhancement strategies.",
    fullDescription: "Accreditation and ranking are critical indicators of institutional quality and significantly impact student enrollment, funding opportunities, and brand reputation. Our Accreditation & Ranking service provides comprehensive preparation support for NAAC accreditation, NIRF ranking, and international rankings such as QS and Times Higher Education. We help institutions build a culture of quality through systematic data collection, metric improvement, and documentation excellence, ensuring they achieve and maintain the highest standards.",
    outcomes: [
      { title: "NAAC Preparation", detail: "End-to-end support for NAAC accreditation with focus on Quality Assurance (QA) and Quality Enhancement (QE)" },
      { title: "NIRF Optimization", detail: "Strategic improvement across all NIRF parameters — Teaching, Research, Outreach, Perception" },
      { title: "Data Analytics", detail: "Institutional data dashboards for continuous monitoring and improvement" },
      { title: "Global Rankings", detail: "QS/THE ranking preparation with benchmarking against international standards" },
    ],
    phases: [
      { step: "Phase 1", title: "Metric Assessment", description: "Comprehensive evaluation of current performance against accreditation and ranking criteria." },
      { step: "Phase 2", title: "Improvement Planning", description: "Developing targeted interventions for each metric with realistic timelines and resource allocation." },
      { step: "Phase 3", title: "Documentation & Filing", description: "Preparing SSRs, IQAC reports, NIRF data submissions, and supporting documentation." },
      { step: "Phase 4", title: "Mock Assessment", description: "Simulated assessments, feedback incorporation, and final preparation for peer review visits." },
    ],
    relatedServices: [
      { title: "Strategic Planning", slug: "strategic-planning" },
      { title: "NEP 2020 Implementation", slug: "nep-2020" },
      { title: "HR & Faculty Development", slug: "hr-faculty-development" },
    ],
  },
  "admissions-branding": {
    number: "05",
    title: "Admissions & Branding",
    description: "Strategic marketing, enrollment growth, and institutional branding to attract and retain quality students.",
    fullDescription: "In a competitive higher education landscape, attracting quality students requires more than academic programs — it demands a strong institutional brand and strategic enrollment management. Our Admissions & Branding service combines market research, digital marketing expertise, and brand strategy to position your institution prominently in the minds of prospective students, parents, and stakeholders. From crafting compelling institutional narratives to executing targeted recruitment campaigns, we help you build a sustainable enrollment pipeline.",
    outcomes: [
      { title: "Brand Strategy", detail: "Institutional positioning, visual identity, and messaging framework development" },
      { title: "Digital Marketing", detail: "SEO, social media, content marketing, and paid advertising campaigns" },
      { title: "Enrollment Growth", detail: "Lead generation, conversion optimization, and student recruitment strategies" },
      { title: "Stakeholder Communication", detail: "Parent engagement, alumni relations, and community outreach programs" },
    ],
    phases: [
      { step: "Phase 1", title: "Market Research", description: "Understanding target demographics, competitive landscape, and market positioning opportunities." },
      { step: "Phase 2", title: "Brand Development", description: "Creating brand identity, messaging frameworks, and visual communication systems." },
      { step: "Phase 3", title: "Campaign Execution", description: "Launching multi-channel marketing campaigns across digital and traditional platforms." },
      { step: "Phase 4", title: "Performance Optimization", description: "Analytics-driven refinement, A/B testing, and continuous campaign improvement." },
    ],
    relatedServices: [
      { title: "Strategic Planning", slug: "strategic-planning" },
      { title: "International Partnerships", slug: "international-partnerships" },
      { title: "Accreditation & Ranking", slug: "accreditation-ranking" },
    ],
  },
  "regulatory-compliance": {
    number: "06",
    title: "Regulatory Compliance",
    description: "End-to-end support for UGC, AICTE, and state government approvals and compliance requirements.",
    fullDescription: "Navigating the complex regulatory landscape of Indian higher education requires specialized expertise and up-to-the-minute knowledge of evolving guidelines. Our Regulatory Compliance service ensures your institution remains fully compliant with all applicable regulations from UGC, AICTE, state governments, and other regulatory bodies. We handle everything from initial approvals and affiliations to ongoing compliance management, helping you avoid penalties, maintain accreditation status, and operate with complete regulatory peace of mind.",
    outcomes: [
      { title: "Approval Management", detail: "New program approvals, intake increases, and regulatory filings handled end-to-end" },
      { title: "Compliance Audits", detail: "Internal audits and gap analysis against current regulatory requirements" },
      { title: "Policy Development", detail: "Institutional policies, governance frameworks, and standard operating procedures" },
      { title: "Liaison Support", detail: "Direct coordination with regulatory bodies on behalf of the institution" },
    ],
    phases: [
      { step: "Phase 1", title: "Regulatory Mapping", description: "Identifying all applicable regulations, deadlines, and compliance requirements for your institution." },
      { step: "Phase 2", title: "Gap Analysis", description: "Assessing current compliance status and identifying areas requiring immediate attention." },
      { step: "Phase 3", title: "Compliance Execution", description: "Implementing required changes, preparing documentation, and filing all regulatory submissions." },
      { step: "Phase 4", title: "Ongoing Management", description: "Continuous compliance monitoring, renewal management, and regulatory updates." },
    ],
    relatedServices: [
      { title: "Accreditation & Ranking", slug: "accreditation-ranking" },
      { title: "HR & Faculty Development", slug: "hr-faculty-development" },
      { title: "NEP 2020 Implementation", slug: "nep-2020" },
    ],
  },
  "hr-faculty-development": {
    number: "07",
    title: "HR & Faculty Development",
    description: "Faculty recruitment, training programs, and governance frameworks for academic excellence.",
    fullDescription: "The quality of an institution is fundamentally determined by the quality of its faculty and the strength of its governance structures. Our HR & Faculty Development service addresses the complete faculty lifecycle — from recruitment and onboarding to professional development and performance management. We design competency-based training programs, establish effective governance frameworks, and implement faculty evaluation systems that foster a culture of continuous improvement and academic excellence.",
    outcomes: [
      { title: "Faculty Recruitment", detail: "End-to-end hiring processes with competency-based assessment frameworks" },
      { title: "Training Programs", detail: "Pedagogical training, research skill development, and leadership workshops" },
      { title: "Performance Systems", detail: "KPI-driven evaluation frameworks and career progression pathways" },
      { title: "Governance Framework", detail: "Academic governance structures, committee charters, and decision-making protocols" },
    ],
    phases: [
      { step: "Phase 1", title: "Needs Assessment", description: "Evaluating current faculty capacity, skill gaps, and institutional governance effectiveness." },
      { step: "Phase 2", title: "Framework Design", description: "Creating recruitment criteria, training curricula, and governance structures." },
      { step: "Phase 3", title: "Implementation", description: "Executing recruitment drives, launching training programs, and establishing governance systems." },
      { step: "Phase 4", title: "Monitoring & Growth", description: "Performance tracking, continuous feedback loops, and iterative improvement." },
    ],
    relatedServices: [
      { title: "NEP 2020 Implementation", slug: "nep-2020" },
      { title: "Accreditation & Ranking", slug: "accreditation-ranking" },
      { title: "Strategic Planning", slug: "strategic-planning" },
    ],
  },
  "fundraising": {
    number: "08",
    title: "Fundraising",
    description: "CSR partnerships, government grants, and endowment strategies for institutional financial sustainability.",
    fullDescription: "Financial sustainability is the backbone of institutional excellence. Our Fundraising service helps institutions diversify their revenue streams through strategic CSR partnerships, government grants, alumni giving programs, and endowment development. We identify funding opportunities aligned with your institutional priorities, craft compelling proposals, and build relationships with corporate partners and philanthropic organizations. Our approach ensures long-term financial resilience while maintaining academic mission alignment.",
    outcomes: [
      { title: "CSR Partnerships", detail: "Corporate social responsibility partnerships with leading Indian and multinational corporations" },
      { title: "Government Grants", detail: "Identification and application support for UGC, AICTE, DST, and state government funding" },
      { title: "Alumni Giving", detail: "Alumni engagement programs, annual giving campaigns, and major gift strategies" },
      { title: "Endowment Development", detail: "Long-term endowment fund creation and management frameworks" },
    ],
    phases: [
      { step: "Phase 1", title: "Opportunity Mapping", description: "Identifying potential funders, grant programs, and corporate partnership opportunities." },
      { step: "Phase 2", title: "Proposal Development", description: "Crafting compelling proposals, business cases, and project reports for funders." },
      { step: "Phase 3", title: "Engagement & Cultivation", description: "Building relationships with corporate partners, government agencies, and alumni networks." },
      { step: "Phase 4", title: "Stewardship & Reporting", description: "Donor recognition, impact reporting, and long-term relationship management." },
    ],
    relatedServices: [
      { title: "Strategic Planning", slug: "strategic-planning" },
      { title: "Regulatory Compliance", slug: "regulatory-compliance" },
      { title: "Admissions & Branding", slug: "admissions-branding" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({ slug }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = serviceData[params.slug];
  if (!service) notFound();

  return (
    <main>
      <section className="relative overflow-hidden bg-primary py-24 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent blur-[150px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-sans text-sm text-accent transition-colors hover:text-accent/80"
          >
            ← Back to All Services
          </Link>
          <div className="mt-8 flex items-end gap-6">
            <span className="font-display text-8xl font-bold text-accent/30">{service.number}</span>
            <div>
              <p className="font-sans text-sm uppercase tracking-[0.2em] text-accent">Service</p>
              <h1 className="mt-2 font-display text-5xl font-bold md:text-6xl">{service.title}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl font-bold text-primary">Overview</h2>
              <p className="mt-6 font-sans text-lg leading-relaxed text-gray-600">{service.fullDescription}</p>
            </div>
            <div className="rounded-sm bg-white p-8 shadow-sm">
              <h3 className="font-display text-xl font-bold text-primary">Get Started</h3>
              <p className="mt-3 font-sans text-sm text-gray-600">
                Ready to discuss how {service.title.toLowerCase()} can benefit your institution?
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-accent/90"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-primary">Key Outcomes</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {service.outcomes.map((outcome, i) => (
              <div key={i} className="flex gap-4 rounded-sm border border-gray-100 p-6 transition-colors hover:border-accent/30">
                <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <h3 className="font-display text-lg font-bold text-primary">{outcome.title}</h3>
                  <p className="mt-2 font-sans text-sm text-gray-600">{outcome.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-primary">Our Process</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {service.phases.map((phase, i) => (
              <div key={i} className="relative">
                {i < 3 && (
                  <div className="absolute left-8 top-10 hidden h-px w-full bg-accent/30 md:block" />
                )}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent font-display text-xl font-bold text-primary">
                  {i + 1}
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-primary">{phase.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-gray-600">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-primary">Related Services</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {service.relatedServices.map((related) => (
              <Link
                key={related.slug}
                href={`/services/${related.slug}`}
                className="group flex items-center justify-between rounded-sm border border-gray-200 p-6 transition-all hover:border-accent hover:shadow-md"
              >
                <span className="font-display text-lg font-bold text-primary">{related.title}</span>
                <ArrowUpRight className="h-5 w-5 text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="font-display text-4xl font-bold">Ready to Begin?</h2>
          <p className="mt-6 font-sans text-lg text-gray-300">
            Our team of experts is ready to help your institution achieve its full potential.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-sm bg-accent px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-accent/90"
          >
            Schedule a Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
