import Link from "next/link";
import { ArrowRight, Target, Heart, Lightbulb, Globe, GraduationCap } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We pursue the highest standards in everything we do, from strategic recommendations to implementation support, ensuring measurable outcomes for every engagement.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "Our advice is always honest, transparent, and in the best interest of the institution. We build trust through ethical practices and consistent delivery.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We stay ahead of industry trends, leveraging cutting-edge research and global best practices to bring transformative solutions to Indian higher education.",
  },
  {
    icon: Globe,
    title: "Impact",
    description: "Every initiative is measured by its lasting impact on institutional quality, student outcomes, and the broader educational ecosystem.",
  },
];

const team = [
  {
    name: "Dr. Arvind Mehta",
    designation: "Founder & Chief Executive Officer",
    bio: "With over 25 years in higher education policy and consulting, Dr. Mehta has advised 80+ institutions across India. A former UGC committee member, he brings unparalleled regulatory expertise and strategic vision.",
  },
  {
    name: "Prof. Sunita Sharma",
    designation: "Director, Academic Advisory",
    bio: "A former Dean at Jawaharlal Nehru University, Prof. Sharmaspecializes in curriculum design, NEP 2020 implementation, and accreditation strategies. She has mentored over 50 institutions through NAAC and NIRF processes.",
  },
  {
    name: "Rajesh Venkatesh",
    designation: "Head, International Partnerships",
    bio: "Rajesh has spent 15 years building academic bridges between India and the world. He has facilitated partnerships with 45+ institutions across 15 countries and manages all international collaboration programs.",
  },
  {
    name: "Dr. Priya Nair",
    designation: "Director, Research & Analytics",
    bio: "Dr. Nair leads our data-driven approach to consulting. A PhD from IIM Bangalore, she specializes in institutional analytics, benchmarking studies, and evidence-based strategy development.",
  },
];

const partners = [
  "Manipal Academy of Higher Education",
  "Amity University",
  "Lovely Professional University",
  "Chandigarh University",
  "SRM Institute of Science and Technology",
  "VIT University",
  "KL University",
  "Sharda University",
  "Graphic Era University",
  "NITTE University",
];

const stats = [
  { value: "12+", label: "Years of Experience" },
  { value: "80+", label: "Institutions Served" },
  { value: "45+", label: "Global Partnerships" },
  { value: "15+", label: "Countries Reached" },
];

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-primary py-24 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent blur-[150px]" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <p className="font-sans text-sm uppercase tracking-[0.2em] text-accent">About Us</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Shaping the Future of<br />Higher Education
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-lg text-gray-300">
            For over a decade, Unitide Educations has been the trusted partner for higher education
            institutions seeking transformative growth and sustainable excellence.
          </p>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="font-sans text-sm uppercase tracking-[0.2em] text-accent">Our Story</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-primary md:text-4xl">
                From Vision to Impact
              </h2>
              <div className="mt-8 space-y-6 font-sans text-gray-600 leading-relaxed">
                <p>
                  Founded in 2012, Unitide Educations was born from a simple yet powerful belief:
                  every Indian institution of higher education deserves access to world-class
                  strategic consulting. Our founders, seasoned professionals from IITs, IIMs,
                  and leading global universities, saw a critical gap between the aspirations
                  of Indian institutions and the expert guidance available to them.
                </p>
                <p>
                  Over the past 12 years, we have grown from a boutique advisory firm to one
                  of India&apos;s most respected higher education consulting practices. Our journey
                  has been defined by deep partnerships, measurable outcomes, and an unwavering
                  commitment to the institutions we serve.
                </p>
                <p>
                  Today, with a team of 30+ consultants, researchers, and subject matter experts,
                  we serve institutions across every state in India and maintain partnerships
                  with leading universities in 15+ countries. Our mission remains unchanged:
                  to empower every institution we work with to achieve its highest potential.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="rounded-sm bg-white p-8 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                    <GraduationCap className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-primary">Our Mission</h3>
                  </div>
                </div>
                <p className="mt-4 font-sans text-sm text-gray-600 leading-relaxed">
                  To provide exceptional, evidence-based consulting that empowers higher education
                  institutions to achieve academic excellence, regulatory compliance, and sustainable growth.
                </p>
              </div>
              <div className="rounded-sm bg-white p-8 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                    <Target className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-primary">Our Vision</h3>
                  </div>
                </div>
                <p className="mt-4 font-sans text-sm text-gray-600 leading-relaxed">
                  To be the most trusted partner for higher education transformation in India,
                  recognized for our integrity, expertise, and measurable impact on institutional quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="font-sans text-sm uppercase tracking-[0.2em] text-accent">Our Values</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-primary md:text-4xl">What We Stand For</h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/5">
                    <Icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-primary">{value.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="font-sans text-sm uppercase tracking-[0.2em] text-accent">Our Team</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-primary md:text-4xl">Leadership</h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="rounded-sm bg-white p-8 shadow-sm">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/5">
                  <span className="font-display text-2xl font-bold text-accent">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold text-primary">{member.name}</h3>
                <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-wider text-accent">
                  {member.designation}
                </p>
                <p className="mt-4 font-sans text-sm leading-relaxed text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-4xl font-bold text-accent md:text-5xl">{stat.value}</p>
                <p className="mt-2 font-sans text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="font-sans text-sm uppercase tracking-[0.2em] text-accent">Trusted By</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-primary">Our Partners</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {partners.map((partner) => (
              <div
                key={partner}
                className="flex h-24 items-center justify-center rounded-sm border border-gray-200 p-4 transition-colors hover:border-accent/30"
              >
                <p className="text-center font-sans text-sm font-semibold text-gray-500">{partner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Partner With Us</h2>
          <p className="mt-6 font-sans text-lg text-gray-300">
            Join the growing community of institutions that trust Unitide Educations
            for their strategic transformation.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-sm bg-accent px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-accent/90"
          >
            Get in Touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
