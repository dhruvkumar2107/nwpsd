import Link from "next/link";
import { ArrowRight, BookOpen, Globe, GraduationCap, Award, Megaphone, Shield, Users, HandHeart } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Strategic Planning",
    description: "DPR, feasibility studies, and master planning for institutions seeking sustainable growth and academic excellence.",
    icon: BookOpen,
    slug: "strategic-planning",
  },
  {
    number: "02",
    title: "International Partnerships",
    description: "Building global collaborations that enable student and faculty mobility across international borders.",
    icon: Globe,
    slug: "international-partnerships",
  },
  {
    number: "03",
    title: "NEP 2020 Implementation",
    description: "Comprehensive guidance on academic reforms and curriculum redesign aligned with the National Education Policy.",
    icon: GraduationCap,
    slug: "nep-2020",
  },
  {
    number: "04",
    title: "Accreditation & Ranking",
    description: "Expert preparation for NAAC, NIRF, and global rankings with data-driven quality enhancement strategies.",
    icon: Award,
    slug: "accreditation-ranking",
  },
  {
    number: "05",
    title: "Admissions & Branding",
    description: "Strategic marketing, enrollment growth, and institutional branding to attract and retain quality students.",
    icon: Megaphone,
    slug: "admissions-branding",
  },
  {
    number: "06",
    title: "Regulatory Compliance",
    description: "End-to-end support for UGC, AICTE, and state government approvals and compliance requirements.",
    icon: Shield,
    slug: "regulatory-compliance",
  },
  {
    number: "07",
    title: "HR & Faculty Development",
    description: "Faculty recruitment, training programs, and governance frameworks for academic excellence.",
    icon: Users,
    slug: "hr-faculty-development",
  },
  {
    number: "08",
    title: "Fundraising",
    description: "CSR partnerships, government grants, and endowment strategies for institutional financial sustainability.",
    icon: HandHeart,
    slug: "fundraising",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-primary py-24 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent blur-[150px]" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <p className="font-sans text-sm uppercase tracking-[0.2em] text-accent">What We Do</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Our Expertise
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-lg text-gray-300">
            Eight decades of cumulative experience distilled into comprehensive consulting
            services designed to transform higher education institutions across India and beyond.
          </p>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative overflow-hidden rounded-sm border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-accent hover:shadow-lg"
                >
                  <div className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />
                  <span className="font-display text-4xl font-bold text-accent/30 transition-colors duration-300 group-hover:text-accent">
                    {service.number}
                  </span>
                  <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 transition-colors duration-300 group-hover:bg-accent/10">
                    <Icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-accent" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Ready to Transform Your Institution?
          </h2>
          <p className="mt-6 font-sans text-lg text-gray-300">
            Every institution has unique challenges. Let us craft a tailored strategy
            that aligns with your vision and goals.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-accent px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-primary transition-colors duration-300 hover:bg-accent/90"
            >
              Schedule a Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:border-white/40"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
