import Link from "next/link";

const footerLinks = {
  services: [
    { label: "Internationalization Strategy", href: "/what-we-do/internationalization-strategy" },
    { label: "MoU Compliance", href: "/what-we-do/mou-compliance" },
    { label: "Accreditation Support", href: "/what-we-do/accreditation-support" },
    { label: "Branding & Admissions", href: "/what-we-do/branding-admissions" },
    { label: "FHEI & Twinning Setup", href: "/what-we-do/fhei-twinning-setup" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Regulation Tracker", href: "/insights" },
    { label: "How We Work", href: "/how-we-work" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-surface-alt bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-accent">Unitide</span>
              <span className="text-xl font-light">Educations</span>
            </Link>
            <p className="mt-4 text-sm text-white/60">
              The execution partner for Indian higher-ed internationalization.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Services</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Resources</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Unitide Educations. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-xs text-white/40 transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-white/40 transition-colors hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
