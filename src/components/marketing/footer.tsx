"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, ArrowUp } from "lucide-react";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

const services = [
  { label: "Strategic Planning", href: "/what-we-do/strategic-planning" },
  { label: "International Partnerships", href: "/what-we-do/international-partnerships" },
  { label: "NEP 2020", href: "/what-we-do/nep-2020" },
  { label: "Accreditation", href: "/what-we-do/accreditation" },
  { label: "Admissions & Branding", href: "/what-we-do/admissions-branding" },
  { label: "Regulatory Compliance", href: "/what-we-do/regulatory-compliance" },
];

const insights = [
  { label: "Articles", href: "/insights" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Reports", href: "/insights/reports" },
  { label: "Resources", href: "/insights/resources" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/about/team" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const socials = [
  { Icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: XIcon, href: "https://x.com", label: "X" },
  { Icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { Icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
      setEmail("");
    } catch {
      setSubmitted(false);
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Animated gradient border */}
      <div className="absolute inset-x-0 top-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>

      <div style={{ backgroundColor: COLORS.primary }}>
        {/* Newsletter Section */}
        <div className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
                Stay Ahead of Higher Education
              </h2>
              <p className="mt-3 text-sm text-white/50 sm:text-base">
                Get strategic insights, policy updates, and expert analysis delivered to your inbox.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-accent/10 border border-accent/20"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-accent">
                    Thank you for subscribing. Check your inbox for a confirmation.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
                >
                  <div className="relative flex-1 sm:max-w-sm">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-5 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent focus:bg-white/8"
                    />
                  </div>
                  <MagneticWrapper strength={0.1}>
                    <button
                      type="submit"
                      className="h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-primary transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20"
                    >
                      Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </MagneticWrapper>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid gap-10 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Brand Column */}
            <motion.div className="lg:col-span-1" variants={staggerItem}>
              <Link href="/" className="inline-block group">
                <span className="font-display text-2xl font-bold text-accent" style={{ fontFamily: "var(--font-display)" }}>
                  Unitide
                </span>
                <span className="h-[1.5px] block w-8 bg-accent/40 mt-1 transition-all duration-300 group-hover:w-12 group-hover:bg-accent" />
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
                Empowering institutions with strategic advisory, regulatory expertise, and the vision to lead in global higher education.
              </p>

              <div className="mt-6 flex items-center gap-3">
                {socials.map(({ Icon, href, label }) => (
                  <MagneticWrapper key={label} strength={0.2}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-white/40 transition-all duration-300 hover:border-accent/40 hover:text-accent hover:bg-accent/5"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </MagneticWrapper>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div variants={staggerItem}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Services
              </h3>
              <ul className="mt-5 space-y-3">
                {services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 transition-colors duration-200 hover:text-accent animated-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Insights */}
            <motion.div variants={staggerItem}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Insights
              </h3>
              <ul className="mt-5 space-y-3">
                {insights.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 transition-colors duration-200 hover:text-accent animated-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div variants={staggerItem}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Company
              </h3>
              <ul className="mt-5 space-y-3">
                {company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 transition-colors duration-200 hover:text-accent animated-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={staggerItem}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Contact
              </h3>
              <ul className="mt-5 space-y-4">
                <li>
                  <a
                    href="mailto:hello@unitide.in"
                    className="flex items-start gap-3 text-sm text-white/40 transition-colors hover:text-accent group"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent/50 group-hover:text-accent transition-colors" />
                    hello@unitide.in
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919876543210"
                    className="flex items-start gap-3 text-sm text-white/40 transition-colors hover:text-accent group"
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent/50 group-hover:text-accent transition-colors" />
                    +91 98765 43210
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-sm text-white/40">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent/50" />
                    <span>New Delhi, India</span>
                  </div>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-xs text-white/30">
                &copy; {new Date().getFullYear()} Unitide Educations Education Advisory. All rights reserved.
              </p>
              <div className="flex items-center gap-5">
                <Link
                  href="/privacy-policy"
                  className="text-xs text-white/30 transition-colors hover:text-white/60"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-service"
                  className="text-xs text-white/30 transition-colors hover:text-white/60"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookie-policy"
                  className="text-xs text-white/30 transition-colors hover:text-white/60"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-xl glass-dark flex items-center justify-center text-white/60 transition-colors hover:text-accent hover:border-accent/30 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}

const COLORS = {
  primary: "#0a1628",
  accent: "#c8a44e",
};
