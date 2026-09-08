"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

/* ─── Data ─── */

interface MegaMenuItem {
  title: string;
  href: string;
  description: string;
}

interface DropdownItem {
  label: string;
  href: string;
}

const services: MegaMenuItem[] = [
  {
    title: "Internationalization Strategy",
    href: "/what-we-do/internationalization-strategy",
    description:
      "End-to-end strategic consulting for institutions seeking to globalize their academic offerings.",
  },
  {
    title: "MoU Compliance & Management",
    href: "/what-we-do/mou-compliance",
    description:
      "Streamlined memorandum of understanding lifecycle management and regulatory compliance.",
  },
  {
    title: "Accreditation Support",
    href: "/what-we-do/accreditation-support",
    description:
      "Expert guidance through NAAC, NBA, UGC-DEB, and international accreditation processes.",
  },
  {
    title: "Branding & Admissions",
    href: "/what-we-do/branding-admissions",
    description:
      "Strategic institutional branding and international student recruitment solutions.",
  },
  {
    title: "FHEI & Twinning Programs",
    href: "/what-we-do/fhei-twinning-setup",
    description:
      "Specialized setup and compliance support for FHEI collaborations and twinning frameworks.",
  },
];

const internationalRegions: MegaMenuItem[] = [
  {
    title: "UK & Europe",
    href: "/international/uk-europe",
    description:
      "Partnerships with Russell Group universities and European research institutions.",
  },
  {
    title: "North America",
    href: "/international/north-america",
    description:
      "Strategic alliances with top-tier US and Canadian institutions for twinning and research.",
  },
  {
    title: "Asia-Pacific",
    href: "/international/asia-pacific",
    description:
      "Collaboration frameworks with leading universities in Singapore, Australia, and Japan.",
  },
];

const collaborationPillars: MegaMenuItem[] = [
  {
    title: "Joint Degree Programs",
    href: "/international/joint-degrees",
    description:
      "Design and implement accredited joint and dual degree programs with global partners.",
  },
  {
    title: "Research Partnerships",
    href: "/international/research",
    description:
      "Establish cross-border research collaborations and co-publishing frameworks.",
  },
  {
    title: "Student Mobility",
    href: "/international/student-mobility",
    description:
      "Structured exchange programs, credit transfer systems, and global immersion experiences.",
  },
];

const insightsItems: DropdownItem[] = [
  { label: "Articles", href: "/insights" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Reports", href: "/insights/reports" },
];

const aboutItems: DropdownItem[] = [
  { label: "Our Story", href: "/about" },
  { label: "Team", href: "/about/team" },
  { label: "Partners", href: "/about/partners" },
];

/* ─── Animation Variants ─── */

const menuVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: 6,
    scale: 0.98,
    transition: { duration: 0.15, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const mobileMenuVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

const mobileOverlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

/* ─── Mega Menu Content: Services ─── */

function ServicesMegaMenu() {
  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-1">
      <div>
        <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
          Our Expertise
        </p>
        <div className="space-y-0.5">
          {services.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-dim/60"
            >
              <span className="block font-sans text-sm font-semibold text-primary transition-colors group-hover:text-accent">
                {item.title}
              </span>
              <span className="mt-0.5 block font-sans text-xs leading-relaxed text-ink-muted">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-l border-border pl-12">
        <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
          How We Work
        </p>
        <div className="mb-6 space-y-3">
          <div className="rounded-lg bg-surface-dim/50 p-4">
            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-primary">
              Discovery
            </p>
            <p className="mt-1 font-sans text-xs leading-relaxed text-ink-muted">
              We audit your institution's current standing, goals, and readiness for
              international collaboration.
            </p>
          </div>
          <div className="rounded-lg bg-surface-dim/50 p-4">
            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-primary">
              Strategy & Execution
            </p>
            <p className="mt-1 font-sans text-xs leading-relaxed text-ink-muted">
              A tailored roadmap with clear milestones, compliance checkpoints, and stakeholder
              alignment.
            </p>
          </div>
          <div className="rounded-lg bg-surface-dim/50 p-4">
            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-primary">
              Ongoing Partnership
            </p>
            <p className="mt-1 font-sans text-xs leading-relaxed text-ink-muted">
              Continuous monitoring, reporting, and strategic adjustments to ensure sustained success.
            </p>
          </div>
        </div>
        <Link
          href="/how-we-work"
          className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          Learn about our process
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

/* ─── Mega Menu Content: International Collaboration ─── */

function InternationalMegaMenu() {
  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-1">
      <div>
        <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
          Regions
        </p>
        <div className="space-y-0.5">
          {internationalRegions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-dim/60"
            >
              <span className="block font-sans text-sm font-semibold text-primary transition-colors group-hover:text-accent">
                {item.title}
              </span>
              <span className="mt-0.5 block font-sans text-xs leading-relaxed text-ink-muted">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-l border-border pl-12">
        <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
          Collaboration Pillars
        </p>
        <div className="space-y-0.5">
          {collaborationPillars.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-dim/60"
            >
              <span className="block font-sans text-sm font-semibold text-primary transition-colors group-hover:text-accent">
                {item.title}
              </span>
              <span className="mt-0.5 block font-sans text-xs leading-relaxed text-ink-muted">
                {item.description}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-5 rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="font-sans text-xs font-semibold text-primary">Global Network</p>
          <p className="mt-1 font-sans text-xs leading-relaxed text-ink-muted">
            50+ institutional partnerships across 12 countries, enabling seamless cross-border
            academic mobility.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Dropdown Content ─── */

function DropdownMenu({ items }: { items: DropdownItem[] }) {
  return (
    <div className="min-w-[200px] py-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group flex items-center gap-2 rounded-md px-4 py-2 font-sans text-sm text-primary transition-colors hover:bg-surface-dim/60 hover:text-accent"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

/* ─── Mobile Accordion Item ─── */

function MobileAccordion({
  label,
  href,
  children,
  isActive,
}: {
  label: string;
  href?: string;
  children?: React.ReactNode;
  isActive?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      {children ? (
        <>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={clsx(
              "flex w-full items-center justify-between py-3.5 font-sans text-base font-medium transition-colors",
              isActive ? "text-accent" : "text-white/90"
            )}
          >
            {label}
            <ChevronDown
              className={clsx(
                "h-4 w-4 text-white/50 transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-2 pl-3">{children}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link
          href={href!}
          className={clsx(
            "block py-3.5 font-sans text-base font-medium transition-colors",
            isActive ? "text-accent" : "text-white/90"
          )}
        >
          {label}
        </Link>
      )}
    </div>
  );
}

function MobileSubLink({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description?: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg py-2 pl-3 transition-colors hover:bg-white/5"
    >
      <span className="block font-sans text-sm font-medium text-white/80">{label}</span>
      {description && (
        <span className="mt-0.5 block font-sans text-xs leading-relaxed text-white/40">
          {description}
        </span>
      )}
    </Link>
  );
}

/* ─── Main Nav Component ─── */

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menuTimeout, setMenuTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const isScrolled = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", isScrolled, { passive: true });
    isScrolled();
    return () => window.removeEventListener("scroll", isScrolled);
  }, [isScrolled]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (menuTimeout) clearTimeout(menuTimeout);
    };
  }, [menuTimeout]);

  const handleMenuEnter = useCallback(
    (menu: string) => {
      if (menuTimeout) clearTimeout(menuTimeout);
      setActiveMenu(menu);
    },
    [menuTimeout]
  );

  const handleMenuLeave = useCallback(() => {
    const timeout = setTimeout(() => setActiveMenu(null), 150);
    setMenuTimeout(timeout);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isLinkActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border bg-white/85 shadow-[0_1px_3px_rgba(0,0,0,0.04)] backdrop-blur-xl"
            : "bg-white/60 backdrop-blur-sm"
        )}
      >
        <nav
          ref={navRef}
          className={clsx(
            "mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8",
            scrolled ? "h-16" : "h-[72px]"
          )}
        >
          {/* ── Logo ── */}
          <Link href="/" className="group relative flex flex-col items-start">
            <span
              className="font-display text-xl font-bold tracking-tight text-primary transition-colors group-hover:text-accent sm:text-[22px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Unitide Educations
            </span>
            <span className="mt-[3px] h-[1.5px] w-8 bg-accent transition-all duration-300 group-hover:w-12" />
          </Link>

          {/* ── Desktop Navigation ── */}
          <div className="hidden items-center gap-1 lg:flex">
            {/* Services — Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter("services")}
              onMouseLeave={handleMenuLeave}
            >
              <button
                type="button"
                className={clsx(
                  "flex items-center gap-1 rounded-lg px-3 py-2 font-sans text-[13px] font-medium transition-colors",
                  activeMenu === "services"
                    ? "text-accent"
                    : "text-primary hover:text-accent"
                )}
              >
                Services
                <ChevronDown
                  className={clsx(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    activeMenu === "services" && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {activeMenu === "services" && (
                  <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3"
                  >
                    <div className="rounded-xl border border-border bg-white p-6 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)]">
                      <ServicesMegaMenu />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* International Collaboration — Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter("international")}
              onMouseLeave={handleMenuLeave}
            >
              <button
                type="button"
                className={clsx(
                  "flex items-center gap-1 rounded-lg px-3 py-2 font-sans text-[13px] font-medium transition-colors",
                  activeMenu === "international"
                    ? "text-accent"
                    : "text-primary hover:text-accent"
                )}
              >
                International
                <ChevronDown
                  className={clsx(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    activeMenu === "international" && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {activeMenu === "international" && (
                  <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3"
                  >
                    <div className="rounded-xl border border-border bg-white p-6 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)]">
                      <InternationalMegaMenu />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Insights — Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter("insights")}
              onMouseLeave={handleMenuLeave}
            >
              <button
                type="button"
                className={clsx(
                  "flex items-center gap-1 rounded-lg px-3 py-2 font-sans text-[13px] font-medium transition-colors",
                  activeMenu === "insights"
                    ? "text-accent"
                    : "text-primary hover:text-accent"
                )}
              >
                Insights
                <ChevronDown
                  className={clsx(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    activeMenu === "insights" && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {activeMenu === "insights" && (
                  <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
                  >
                    <div className="rounded-xl border border-border bg-white py-2 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)]">
                      <DropdownMenu items={insightsItems} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About — Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter("about")}
              onMouseLeave={handleMenuLeave}
            >
              <button
                type="button"
                className={clsx(
                  "flex items-center gap-1 rounded-lg px-3 py-2 font-sans text-[13px] font-medium transition-colors",
                  activeMenu === "about"
                    ? "text-accent"
                    : "text-primary hover:text-accent"
                )}
              >
                About
                <ChevronDown
                  className={clsx(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    activeMenu === "about" && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {activeMenu === "about" && (
                  <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
                  >
                    <div className="rounded-xl border border-border bg-white py-2 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)]">
                      <DropdownMenu items={aboutItems} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact — Direct Link */}
            <Link
              href="/contact"
              className={clsx(
                "rounded-lg px-3 py-2 font-sans text-[13px] font-medium transition-colors",
                isLinkActive("/contact") ? "text-accent" : "text-primary hover:text-accent"
              )}
            >
              Contact
            </Link>
          </div>

          {/* ── Desktop CTA + Mobile Toggle ── */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button asChild variant="accent" size="sm" className="rounded-lg px-5">
                <Link href="/contact">
                  Schedule Consultation
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-primary transition-colors hover:bg-surface-dim lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* ── Top accent line ── */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              variants={mobileOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-40 bg-primary/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-x-0 bottom-0 top-0 z-40 overflow-y-auto bg-primary lg:hidden"
            >
              <div className="flex h-full flex-col">
                {/* Mobile Header */}
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <Link
                    href="/"
                    className="flex flex-col items-start"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span
                      className="font-display text-lg font-bold text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Unitide Educations
                    </span>
                    <span className="mt-[2px] h-[1.5px] w-6 bg-accent" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {/* Services */}
                  <MobileAccordion label="Services" isActive={pathname.startsWith("/what-we-do")}>
                    {services.map((item) => (
                      <MobileSubLink
                        key={item.href}
                        href={item.href}
                        label={item.title}
                        description={item.description}
                      />
                    ))}
                    <Link
                      href="/how-we-work"
                      className="mt-2 inline-flex items-center gap-1.5 pl-3 font-sans text-xs font-semibold text-accent transition-colors hover:text-accent-hover"
                      onClick={() => setMobileOpen(false)}
                    >
                      Our Process
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </MobileAccordion>

                  {/* International */}
                  <MobileAccordion
                    label="International Collaboration"
                    isActive={pathname.startsWith("/international")}
                  >
                    <p className="mb-1 pl-3 pt-1 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                      Regions
                    </p>
                    {internationalRegions.map((item) => (
                      <MobileSubLink
                        key={item.href}
                        href={item.href}
                        label={item.title}
                        description={item.description}
                      />
                    ))}
                    <p className="mb-1 mt-3 pl-3 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                      Pillars
                    </p>
                    {collaborationPillars.map((item) => (
                      <MobileSubLink
                        key={item.href}
                        href={item.href}
                        label={item.title}
                        description={item.description}
                      />
                    ))}
                  </MobileAccordion>

                  {/* Insights */}
                  <MobileAccordion
                    label="Insights"
                    isActive={pathname.startsWith("/insights") || pathname.startsWith("/case-studies")}
                  >
                    {insightsItems.map((item) => (
                      <MobileSubLink key={item.href} href={item.href} label={item.label} />
                    ))}
                  </MobileAccordion>

                  {/* About */}
                  <MobileAccordion label="About" isActive={pathname.startsWith("/about")}>
                    {aboutItems.map((item) => (
                      <MobileSubLink key={item.href} href={item.href} label={item.label} />
                    ))}
                  </MobileAccordion>

                  {/* Contact */}
                  <div className="border-b border-white/10">
                    <Link
                      href="/contact"
                      className={clsx(
                        "block py-3.5 font-sans text-base font-medium transition-colors",
                        isLinkActive("/contact") ? "text-accent" : "text-white/90"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      Contact
                    </Link>
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="border-t border-white/10 px-5 py-5">
                  <Button
                    asChild
                    variant="accent"
                    size="lg"
                    className="w-full justify-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link href="/contact">
                      Schedule Consultation
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="mt-3 text-center font-sans text-xs text-white/30">
                    Free 30-minute strategic consultation
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-[72px]" />
    </>
  );
}
