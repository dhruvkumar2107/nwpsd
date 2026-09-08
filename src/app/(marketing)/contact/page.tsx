"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ChevronDown,
  Globe,
  ExternalLink,
} from "lucide-react";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  institution: z.string().min(2, "Please enter your institution name"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const faqs = [
  {
    question: "How long does a typical consulting engagement last?",
    answer: "Our engagements range from 4-week focused advisory sessions to 12-month comprehensive transformation programs. The timeline depends on the scope, institutional readiness, and specific goals. During our initial consultation, we provide a detailed timeline tailored to your needs.",
  },
  {
    question: "What is your fee structure?",
    answer: "Our fees are customized based on the scope and complexity of the engagement. We offer fixed-fee projects, retainer-based advisory, and success-linked models. Contact us for a detailed proposal — we believe in complete transparency with no hidden costs.",
  },
  {
    question: "Do you work with smaller institutions or only large universities?",
    answer: "We work with institutions of all sizes — from emerging colleges with 500 students to established universities with 20,000+ students. Our approach is always tailored to the institution's current state, aspirations, and resources.",
  },
  {
    question: "How do you measure the success of your engagements?",
    answer: "Every engagement begins with clearly defined KPIs and success metrics. We provide regular progress reports and conduct post-engagement impact assessments. Our client satisfaction rate exceeds 95%, and we maintain long-term relationships with most of our clients.",
  },
  {
    question: "Can you help with urgent regulatory deadlines?",
    answer: "Yes. We understand that regulatory compliance often operates on strict timelines. We offer expedited consulting tracks for urgent requirements including last-minute NAAC preparations, AICTE approval deadlines, and compliance crisis management.",
  },
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSubmitted(true);
        reset();
      }
    } catch {
      // Silently handle error
    }
  };

  return (
    <main>
      <section className="relative overflow-hidden bg-primary py-24 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent blur-[150px]" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <p className="font-sans text-sm uppercase tracking-[0.2em] text-accent">Contact</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Let&apos;s Build Something<br />Together
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-lg text-gray-300">
            Whether you&apos;re seeking accreditation, planning expansion, or exploring
            international partnerships, our team is ready to help.
          </p>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="font-display text-3xl font-bold text-primary">Send Us a Message</h2>
              <p className="mt-3 font-sans text-gray-600">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="mt-10 rounded-sm border border-green-200 bg-green-50 p-8 text-center">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                  <h3 className="mt-4 font-display text-xl font-bold text-primary">Thank You!</h3>
                  <p className="mt-2 font-sans text-sm text-gray-600">
                    Your message has been received. Our team will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 font-sans text-sm font-semibold text-accent hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="font-sans text-sm font-medium text-primary">Full Name *</label>
                      <input
                        {...register("name")}
                        className="mt-2 w-full rounded-sm border border-gray-300 bg-white px-4 py-3 font-sans text-sm text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                        placeholder="Dr. Rajesh Kumar"
                      />
                      {errors.name && (
                        <p className="mt-1 font-sans text-xs text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="font-sans text-sm font-medium text-primary">Email Address *</label>
                      <input
                        {...register("email")}
                        type="email"
                        className="mt-2 w-full rounded-sm border border-gray-300 bg-white px-4 py-3 font-sans text-sm text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                        placeholder="rajesh@university.edu.in"
                      />
                      {errors.email && (
                        <p className="mt-1 font-sans text-xs text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="font-sans text-sm font-medium text-primary">Phone Number *</label>
                      <input
                        {...register("phone")}
                        className="mt-2 w-full rounded-sm border border-gray-300 bg-white px-4 py-3 font-sans text-sm text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && (
                        <p className="mt-1 font-sans text-xs text-red-500">{errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="font-sans text-sm font-medium text-primary">Institution Name *</label>
                      <input
                        {...register("institution")}
                        className="mt-2 w-full rounded-sm border border-gray-300 bg-white px-4 py-3 font-sans text-sm text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                        placeholder="University of Excellence"
                      />
                      {errors.institution && (
                        <p className="mt-1 font-sans text-xs text-red-500">{errors.institution.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="font-sans text-sm font-medium text-primary">Service of Interest *</label>
                    <div className="relative mt-2">
                      <select
                        {...register("service")}
                        className="w-full appearance-none rounded-sm border border-gray-300 bg-white px-4 py-3 font-sans text-sm text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                      >
                        <option value="">Select a service</option>
                        <option value="strategic-planning">Strategic Planning</option>
                        <option value="international-partnerships">International Partnerships</option>
                        <option value="nep-2020">NEP 2020 Implementation</option>
                        <option value="accreditation-ranking">Accreditation & Ranking</option>
                        <option value="admissions-branding">Admissions & Branding</option>
                        <option value="regulatory-compliance">Regulatory Compliance</option>
                        <option value="hr-faculty-development">HR & Faculty Development</option>
                        <option value="fundraising">Fundraising</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                    {errors.service && (
                      <p className="mt-1 font-sans text-xs text-red-500">{errors.service.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="font-sans text-sm font-medium text-primary">Message *</label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className="mt-2 w-full resize-none rounded-sm border border-gray-300 bg-white px-4 py-3 font-sans text-sm text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                      placeholder="Tell us about your institution and how we can help..."
                    />
                    {errors.message && (
                      <p className="mt-1 font-sans text-xs text-red-500">{errors.message.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-sm bg-accent px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-accent/90 disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div className="rounded-sm bg-white p-8 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-primary">Office</h3>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
                      <div>
                        <p className="font-sans text-sm font-medium text-primary">New Delhi, India</p>
                        <p className="mt-1 font-sans text-sm text-gray-600">
                          Suite 401, Tower B<br />
                          Unitech Greenwood<br />
                          Sector 82, Gurugram 122015
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="mt-1 h-5 w-5 shrink-0 text-accent" />
                      <div>
                        <p className="font-sans text-sm font-medium text-primary">Email</p>
                        <a href="mailto:contact@nyaysaathis.com" className="mt-1 block font-sans text-sm text-gray-600 hover:text-accent">
                          contact@nyaysaathis.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="mt-1 h-5 w-5 shrink-0 text-accent" />
                      <div>
                        <p className="font-sans text-sm font-medium text-primary">Phone</p>
                        <a href="tel:+911234567890" className="mt-1 block font-sans text-sm text-gray-600 hover:text-accent">
                          +91 12345 67890
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="mt-1 h-5 w-5 shrink-0 text-accent" />
                      <div>
                        <p className="font-sans text-sm font-medium text-primary">Hours</p>
                        <p className="mt-1 font-sans text-sm text-gray-600">
                          Monday – Friday: 9:00 AM – 6:00 PM<br />
                          Saturday: 10:00 AM – 2:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-sm bg-white p-8 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-primary">Location</h3>
                  <div className="mt-4 flex h-48 items-center justify-center rounded-sm bg-gray-100">
                    <div className="text-center">
                      <MapPin className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 font-sans text-sm text-gray-500">Google Maps</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-sm bg-white p-8 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-primary">Follow Us</h3>
                  <div className="mt-4 flex gap-4">
                    {[
                      { icon: LinkedinIcon, label: "LinkedIn" },
                      { icon: TwitterIcon, label: "Twitter" },
                      { icon: FacebookIcon, label: "Facebook" },
                      { icon: InstagramIcon, label: "Instagram" },
                    ].map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        aria-label={label}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary transition-colors hover:bg-accent hover:text-primary"
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="rounded-sm bg-primary p-12 text-center text-white">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Book a Free Consultation
            </h2>
            <p className="mt-4 font-sans text-gray-300">
              Schedule a 30-minute discovery call with our senior consultants to discuss
              your institution&apos;s specific needs and explore how we can help.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-accent/90"
            >
              Book Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-primary">Frequently Asked Questions</h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-sm border border-gray-200 bg-white transition-all hover:border-accent/30"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <h3 className="font-display text-lg font-bold text-primary">{faq.question}</h3>
                  {expandedFaq === i ? (
                    <ChevronDown className="h-5 w-5 shrink-0 text-accent" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-gray-400" />
                  )}
                </button>
                {expandedFaq === i && (
                  <div className="border-t border-gray-100 px-6 pb-6 pt-4">
                    <p className="font-sans text-sm leading-relaxed text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
