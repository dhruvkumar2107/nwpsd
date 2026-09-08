"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight, Search, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

/* ─── Data ─── */

interface MegaMenuItem {
  title: string;
  href: string;
  description: string;
  icon?: string;
}

interface DropdownItem {
  label: string;
  href: string;
}

const services: MegaMenuItem[] = [
  {
    title: "Internationalization Strategy",
    href: "/what-we-do/internationalization-strategy",
    description: "End-to-end strategic consulting for institutions seeking to globalize.",
  },
  {
    title: "MoU Compliance & Management",
    href: "/what-we-do/mou-compliance",
    description: "Streamlined memorandum lifecycle management and regulatory compliance.",
  },
  {
    title: "Accreditation Support",
    href: "/what-we-do/accreditation-support",
    description: "Expert guidance through NAAC, NBA, UGC-DEB, and international processes.",
  },
  {
    title: "Branding & Admissions",
    href: "/what-we-do/branding-admissions",
    description: "Strategic institutional branding and international student recruitment.",
  },
  {
    title: "FHEI & Twinning Programs",
    href: "/what-we-do/fhei-twinning-setup",
    description: "Specialized setup and compliance for FHEI collaborations and twinning.",
  },
];

const internationalRegions: MegaMenuItem[] = [
  {
    title: "UK & Europe",
    href: "/international/uk-europe",
    description: "Partnerships with Russell Group universities and European research institutions.",
  },
  {
    title: "North America",
    href: "/international/north-america",
    description: "Strategic alliances with top-tier US and Canadian institutions.",
  },
  {
    title: "Asia-Pacific",
    href: "/international/asia-pacific",
    description: "Collaboration frameworks with leading universities in Singapore, Australia, Japan.",
  },
];

const collaborationPillars: MegaMenuItem[] = [
  {
    title: "Joint Degree Programs",
    href: "/international/joint-degrees",
    description: "Design and implement accredited joint and dual degree programs.",
  },
  {
    title: "Research Partnerships",
    href: "/international/research",
    description: "Establish cross-border research collaborations and co-publishing frameworks.",
  },
  {
    title: "Student Mobility",
    href: "/international/student-mobility",
    description: "Structured exchange programs, credit transfer, and global immersion.",
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
  hidden: { opacity: 0, y: 8, scale: 0.98, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: 6,
    scale: 0.98,
    filter: "blur(2px)",
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.06 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const mobileMenuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const mobileDrawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/* ─── Search Overlay ─── */

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
      }
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-dark rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
                <Search className="w-5 h-5 text-white/40" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search services, insights, case studies..."
                  className="flex-1 bg-transparent text-white text-lg placeholder-white/30 outline-none"
                />
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-white/10 text-white/40 text-xs font-mono">
                  ESC
                </kbd>
              </div>
              <div className="px-6 py-4 max-h-[50vh] overflow-y-auto">
                {query.length > 0 ? (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">
                      Suggestions
                    </p>
                    {services
                      .filter((s) =>
                        s.title.toLowerCase().includes(query.toLowerCase())
                      )
                      .map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-accent transition-colors"
                        >
                          <span className="text-sm font-medium">{item.title}</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100" />
                        </Link>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-white/30">
                      Type to search across all content
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Mega Menu Content: Services ─── */

function ServicesMegaMenu() {
  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-1">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
          Our Expertise
        </p>
        <div className="space-y-0.5">
          {services.map((item) => (
            <motion.div key={item.href} variants={staggerItem}>
              <Link
                href={item.href}
                className="group block rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-surface-dim/60"
              >
                <span className="block font-sans text-sm font-semibold text-primary transition-colors group-hover:text-accent">
                  {item.title}
                </span>
                <span className="mt-0.5 block font-sans text-xs leading-relaxed text-ink-muted">
                  {item.description}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="border-l border-border pl-12"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
          How We Work
        </p>
        <div className="mb-6 space-y-3">
          {[
            { title: "Discovery", desc: "We audit your institution's current standing, goals, and readiness for international collaboration." },
            { title: "Strategy & Execution", desc: "A tailored roadmap with clear milestones, compliance checkpoints, and stakeholder alignment." },
            { title: "Ongoing Partnership", desc: "Continuous monitoring, reporting, and strategic adjustments to ensure sustained success." },
          ].map((step) => (
            <motion.div
              key={step.title}
              variants={staggerItem}
              className="rounded-lg bg-surface-dim/50 p-4 hover:bg-surface-dim transition-colors"
            >
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-primary">
                {step.title}
              </p>
              <p className="mt-1 font-sans text-xs leading-relaxed text-ink-muted">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div variants={staggerItem}>
          <Link
            href="/how-we-work"
            className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            Learn about our process
            <ArrowRight className="h-3 w-3" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Mega Menu Content: International Collaboration ─── */

function InternationalMegaMenu() {
  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-1">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
          Regions
        </p>
        <div className="space-y-0.5">
          {internationalRegions.map((item) => (
            <motion.div key={item.href} variants={staggerItem}>
              <Link
                href={item.href}
                className="group block rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-surface-dim/60"
              >
                <span className="block font-sans text-sm font-semibold text-primary transition-colors group-hover:text-accent">
                  {item.title}
                </span>
                <span className="mt-0.5 block font-sans text-xs leading-relaxed text-ink-muted">
                  {item.description}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="border-l border-border pl-12"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
          Collaboration Pillars
        </p>
        <div className="space-y-0.5">
          {collaborationPillars.map((item) => (
            <motion.div key={item.href} variants={staggerItem}>
              <Link
                href={item.href}
                className="group block rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-surface-dim/60"
              >
                <span className="block font-sans text-sm font-semibold text-primary transition-colors group-hover:text-accent">
                  {item.title}
                </span>
                <span className="mt-0.5 block font-sans text-xs leading-relaxed text-ink-muted">
                  {item.description}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div variants={staggerItem}>
          <div className="mt-5 rounded-lg border border-accent/20 bg-accent/5 p-4">
            <p className="font-sans text-xs font-semibold text-primary">Global Network</p>
            <p className="mt-1 font-sans text-xs leading-relaxed text-ink-muted">
              50+ institutional partnerships across 12 countries, enabling seamless cross-border
              academic mobility.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Dropdown Content ─── */

function DropdownMenu({ items }: { items: DropdownItem[] }) {
  return (
    <motion.div
      className="min-w-[200px] py-2"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {items.map((item) => (
        <motion.div key={item.href} variants={staggerItem}>
          <Link
            href={item.href}
            className="group flex items-center gap-2 rounded-md px-4 py-2 font-sans text-sm text-primary transition-colors hover:bg-surface-dim/60 hover:text-accent"
          >
            {item.label}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Active Pill Indicator ─── */

function ActivePill({ items, containerRef }: { items: { href: string }[]; containerRef: React.RefObject<HTMLDivElement | null> }) {
  const pathname = usePathname();
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const calculate = () => {
      if (!containerRef.current) return;
      const activeIndex = items.findIndex(
        (item) => pathname === item.href || pathname.startsWith(item.href + "/")
      );
      if (activeIndex === -1) {
        setPillStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const buttons = containerRef.current.querySelectorAll("[data-nav-item]");
      const activeButton = buttons[activeIndex] as HTMLElement;
      if (activeButton) {
        const rect = activeButton.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        setPillStyle({
          left: rect.left - containerRect.left,
          width: rect.width,
          opacity: 1,
        });
      }
    };
    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, [pathname, items, containerRef]);

  return (
    <motion.div
      className="absolute bottom-0 h-[2px] bg-accent rounded-full"
      animate={{
        left: pillStyle.left,
        width: pillStyle.width,
        opacity: pillStyle.opacity,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
    />
  );
}

/* ─── Mobile Drawer ─── */

function MobileDrawer({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sections = [
    {
      id: "services",
      label: "Services",
      items: services.map((s) => ({ label: s.title, href: s.href, description: s.description })),
      extra: { label: "Our Process", href: "/how-we-work" },
    },
    {
      id: "international",
      label: "International",
      groups: [
        { label: "Regions", items: internationalRegions.map((r) => ({ label: r.title, href: r.href, description: r.description })) },
        { label: "Pillars", items: collaborationPillars.map((p) => ({ label: p.title, href: p.href, description: p.description })) },
      ],
    },
    {
      id: "insights",
      label: "Insights",
      items: insightsItems.map((i) => ({ label: i.label, href: i.href })),
    },
    {
      id: "about",
      label: "About",
      items: aboutItems.map((a) => ({ label: a.label, href: a.href })),
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-primary/40 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.div
            variants={mobileDrawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-primary lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <Link href="/" onClick={onClose}>
                  <span className="font-display text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    Unitide
                  </span>
                </Link>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav Items */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {sections.map((section) => (
                  <div key={section.id} className="border-b border-white/10">
                    <button
                      onClick={() =>
                        setExpandedSection(expandedSection === section.id ? null : section.id)
                      }
                      className="flex w-full items-center justify-between py-4 font-sans text-base font-medium text-white/90"
                    >
                      {section.label}
                      <ChevronDown
                        className={clsx(
                          "h-4 w-4 text-white/50 transition-transform duration-200",
                          expandedSection === section.id && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {expandedSection === section.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-4 pl-3 space-y-1">
                            {section.items?.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className="block rounded-lg py-2 pl-3 transition-colors hover:bg-white/5"
                              >
                                <span className="block font-sans text-sm font-medium text-white/80">
                                  {item.label}
                                </span>
                                {"description" in item && item.description && (
                                  <span className="mt-0.5 block font-sans text-xs leading-relaxed text-white/40">
                                    {item.description}
                                  </span>
                                )}
                              </Link>
                            ))}
                            {section.groups?.map((group) => (
                              <div key={group.label} className="mt-3">
                                <p className="pl-3 mb-1 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                                  {group.label}
                                </p>
                                {group.items.map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className="block rounded-lg py-2 pl-3 transition-colors hover:bg-white/5"
                                  >
                                    <span className="block font-sans text-sm font-medium text-white/80">
                                      {item.label}
                                    </span>
                                    {item.description && (
                                      <span className="mt-0.5 block font-sans text-xs leading-relaxed text-white/40">
                                        {item.description}
                                      </span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            ))}
                            {section.extra && (
                              <Link
                                href={section.extra.href}
                                onClick={onClose}
                                className="mt-2 inline-flex items-center gap-1.5 pl-3 font-sans text-xs font-semibold text-accent"
                              >
                                {section.extra.label}
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Direct link */}
                <Link
                  href="/contact"
                  onClick={onClose}
                  className={clsx(
                    "block py-4 font-sans text-base font-medium",
                    pathname === "/contact" ? "text-accent" : "text-white/90"
                  )}
                >
                  Contact
                </Link>
              </div>

              {/* CTA */}
              <div className="border-t border-white/10 px-6 py-5">
                <Button asChild variant="accent" size="lg" className="w-full justify-center">
                  <Link href="/contact" onClick={onClose}>
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
  );
}

/* ─── Main Nav Component ─── */

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window !== "undefined") return window.scrollY > 20;
    return false;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuTimeout, setMenuTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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

  const prevPathname = useRef(pathname);
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setMobileOpen(false);
      setActiveMenu(null);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (menuTimeout) clearTimeout(menuTimeout);
    };
  }, [menuTimeout]);

  // Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  const navItems = [
    { id: "services", label: "Services", hasMega: true },
    { id: "international", label: "International", hasMega: true },
    { id: "insights", label: "Insights", hasDropdown: true },
    { id: "about", label: "About", hasDropdown: true },
  ];

  const dropdownItems: Record<string, DropdownItem[]> = {
    insights: insightsItems,
    about: aboutItems,
  };

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
          scrolled
            ? "glass border-b border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
            : "bg-white/40 backdrop-blur-sm"
        )}
      >
        <nav
          ref={navRef}
          className={clsx(
            "mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:px-8",
            scrolled ? "h-14" : "h-[72px]"
          )}
        >
          {/* Logo */}
          <Link href="/" className="group relative flex flex-col items-start">
            <span
              className={clsx(
                "font-display font-bold tracking-tight text-primary transition-all duration-500 group-hover:text-accent",
                scrolled ? "text-lg" : "text-xl"
              )}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Unitide Educations
            </span>
            <span className="mt-[3px] h-[1.5px] w-8 bg-accent transition-all duration-500 group-hover:w-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex" ref={navItemsRef}>
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.hasMega || item.hasDropdown ? handleMenuEnter(item.id) : undefined}
                onMouseLeave={item.hasMega || item.hasDropdown ? handleMenuLeave : undefined}
              >
                <Link
                  href={
                    item.id === "services"
                      ? "/what-we-do"
                      : item.id === "international"
                      ? "/international-collaboration"
                      : item.id === "insights"
                      ? "/insights"
                      : "/about"
                  }
                  data-nav-item
                  className={clsx(
                    "flex items-center gap-1 rounded-lg px-3 py-2 font-sans text-[13px] font-medium transition-colors",
                    activeMenu === item.id || isActive(
                      item.id === "services"
                        ? "/what-we-do"
                        : item.id === "international"
                        ? "/international-collaboration"
                        : `/${item.id}`
                    )
                      ? "text-accent"
                      : "text-primary hover:text-accent"
                  )}
                >
                  {item.label}
                  {(item.hasMega || item.hasDropdown) && (
                    <ChevronDown
                      className={clsx(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        activeMenu === item.id && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Mega Menu */}
                <AnimatePresence>
                  {item.hasMega && activeMenu === item.id && (
                    <motion.div
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3"
                    >
                      <div className="rounded-xl border border-border bg-white p-6 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)]">
                        {item.id === "services" && <ServicesMegaMenu />}
                        {item.id === "international" && <InternationalMegaMenu />}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.hasDropdown && activeMenu === item.id && (
                    <motion.div
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
                    >
                      <div className="rounded-xl border border-border bg-white py-2 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)]">
                        <DropdownMenu items={dropdownItems[item.id] || []} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Active Pill */}
            <ActivePill
              items={navItems.map((i) => ({
                href:
                  i.id === "services"
                    ? "/what-we-do"
                    : i.id === "international"
                    ? "/international-collaboration"
                    : i.id === "insights"
                    ? "/insights"
                    : "/about",
              }))}
              containerRef={navItemsRef}
            />

            {/* Contact */}
            <Link
              href="/contact"
              className={clsx(
                "rounded-lg px-3 py-2 font-sans text-[13px] font-medium transition-colors",
                isActive("/contact") ? "text-accent" : "text-primary hover:text-accent"
              )}
            >
              Contact
            </Link>
          </div>

          {/* Desktop CTA + Search + Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-surface/50 text-ink-muted text-xs font-medium transition-all hover:border-accent/40 hover:text-accent"
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="hidden xl:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-dim text-[10px] font-mono text-ink-muted">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </button>

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

        {/* Gradient border line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />

      {/* Search Overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Spacer */}
      <div className={clsx("transition-all duration-500", scrolled ? "h-14" : "h-[72px]")} />
    </>
  );
}
