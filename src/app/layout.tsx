import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import ScrollToTop from "@/components/marketing/scroll-to-top";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://nwpsd.vercel.app"
  ),
  title: {
    default: "Unitide Educations — Higher Education Advisory",
    template: "%s | Unitide Educations — Higher Education Advisory",
  },
  description:
    "Unitide Educations is a premium higher-education consulting advisory firm delivering strategic guidance for university admissions, scholarship optimization, and academic career planning across India and abroad.",
  keywords: [
    "higher education consulting",
    "university admissions",
    "scholarship advisory",
    "education consulting India",
    "study abroad",
    "college admission strategy",
    "academic career planning",
    "Unitide Educations",
  ],
  authors: [{ name: "Unitide Educations Education Advisory" }],
  creator: "Unitide Educations Education Advisory",
  publisher: "Unitide Educations Education Advisory",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://nwpsd.vercel.app",
    siteName: "Unitide Educations — Higher Education Advisory",
    title: "Unitide Educations — Higher Education Advisory",
    description:
      "Premium higher-education consulting advisory delivering strategic guidance for university admissions, scholarship optimization, and academic career planning.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Unitide Educations — Higher Education Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unitide Educations — Higher Education Advisory",
    description:
      "Premium higher-education consulting advisory delivering strategic guidance for university admissions, scholarship optimization, and academic career planning.",
    images: ["/og-image.png"],
    creator: "@unitideedu",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Unitide Educations Education Advisory",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nwpsd.vercel.app",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nwpsd.vercel.app"}/logo.png`,
  description:
    "Premium higher-education consulting advisory firm delivering strategic guidance for university admissions, scholarship optimization, and academic career planning.",
  foundingDate: "2024",
  sameAs: [
    "https://twitter.com/unitideedu",
    "https://linkedin.com/company/unitide-educations",
    "https://instagram.com/unitideeducations",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <div className="noise-overlay pointer-events-none fixed inset-0 z-50 opacity-[0.03]" />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
