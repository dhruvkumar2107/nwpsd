import { Hero } from "@/components/marketing/hero";
import { CTASection } from "@/components/marketing/cta-section";
import { StatBand } from "@/components/marketing/stat-band";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const team = [
  {
    name: "Arjun Mehta",
    role: "Founder & CEO",
    bio: "Former NAAC peer reviewer with 15+ years in Indian higher education policy. Led internationalization initiatives at 3 state universities before founding Unitide.",
  },
  {
    name: "Dr. Sneha Kapoor",
    role: "Head of Regulatory Affairs",
    bio: "PhD in Education Policy from JNU. Expert in UGC and AICTE regulatory frameworks with deep experience in MoU compliance and accreditation processes.",
  },
  {
    name: "Rajesh Iyer",
    role: "Director, Partnerships",
    bio: "15-year career in international education across India, UK, and Australia. Built partnership networks connecting 200+ institutions globally.",
  },
  {
    name: "Priya Nair",
    role: "Head of Accreditation",
    bio: "Former IQAC director with successful NAAC A++ accreditation experience. Specializes in documentation, evidence building, and mock assessments.",
  },
];

const credentials = [
  { label: "150+ Institutions Served", variant: "success" as const },
  { label: "40+ Countries", variant: "success" as const },
  { label: "95% Client Retention", variant: "success" as const },
  { label: "NAAC A++ Success Rate: 90%", variant: "success" as const },
  { label: "UGC Regulatory Expertise", variant: "outline" as const },
  { label: "Former Peer Reviewers", variant: "outline" as const },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        headline="About Unitide Educations"
        subhead="We're a team of former regulators, accreditation experts, and international education specialists dedicated to transforming Indian higher education."
        primaryCta={{ label: "Meet Our Team", href: "/contact" }}
        secondaryCta={{ label: "Our Services", href: "/what-we-do" }}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-ink sm:text-4xl">Our Story</h2>
              <div className="mt-6 space-y-4 text-ink-light">
                <p>
                  Unitide Educations was founded with a simple observation: Indian higher education institutions
                  have ambitious internationalization goals, but lack the execution partner to turn strategy
                  into signed MoUs and compliant partnerships.
                </p>
                <p>
                  Our team brings together former NAAC peer reviewers, UGC regulatory experts, and
                  international education specialists who&apos;ve collectively helped over 150 institutions
                  across India navigate the complex landscape of global partnerships.
                </p>
                <p>
                  We don&apos;t just advise—we execute. From initial strategy through regulatory filing to
                  partnership launch, we manage the entire lifecycle so institutional leaders can focus
                  on academic priorities while we handle the compliance complexity.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-ink sm:text-4xl">Our Credentials</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {credentials.map((cred) => (
                  <Badge key={cred.label} variant={cred.variant} className="text-sm">
                    {cred.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatBand />

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">Our Team</h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-light">
            Meet the experts behind Unitide&apos;s success.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.name}>
                <CardHeader>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <CardTitle className="mt-3">{member.name}</CardTitle>
                  <p className="text-sm text-primary">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-ink-light">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Work With Us"
        subhead="Schedule a consultation to discuss how Unitide can support your institution's internationalization journey."
        ctaLabel="Get in Touch"
        ctaHref="/contact"
      />
    </>
  );
}
