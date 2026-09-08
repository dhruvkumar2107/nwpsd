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
    process.env.NEXT_PUBLIC_SITE_URL || "https://nyaysaathis.com"
  ),
  title: {
    default: "Nyay Saathis — Higher Education Advisory",
    template: "%s | Nyay Saathis — Higher Education Advisory",
  },
  description:
    "Nyay Saathis is a premium higher-education consulting advisory firm delivering strategic guidance for university admissions, scholarship optimization, and academic career planning across India and abroad.",
  keywords: [
    "higher education consulting",
    "university admissions",
    "scholarship advisory",
    "education consulting India",
    "study abroad",
    "college admission strategy",
    "academic career planning",
    "Nyay Saathis",
  ],
  authors: [{ name: "Nyay Saathis Education Advisory" }],
  creator: "Nyay Saathis Education Advisory",
  publisher: "Nyay Saathis Education Advisory",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://nyaysaathis.com",
    siteName: "Nyay Saathis — Higher Education Advisory",
    title: "Nyay Saathis — Higher Education Advisory",
    description:
      "Premium higher-education consulting advisory delivering strategic guidance for university admissions, scholarship optimization, and academic career planning.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nyay Saathis — Higher Education Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyay Saathis — Higher Education Advisory",
    description:
      "Premium higher-education consulting advisory delivering strategic guidance for university admissions, scholarship optimization, and academic career planning.",
    images: ["/og-image.png"],
    creator: "@nyaysaathis",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
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
  name: "Nyay Saathis Education Advisory",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nyaysaathis.com",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nyaysaathis.com"}/logo.png`,
  description:
    "Premium higher-education consulting advisory firm delivering strategic guidance for university admissions, scholarship optimization, and academic career planning.",
  foundingDate: "2024",
  sameAs: [
    "https://twitter.com/nyaysaathis",
    "https://linkedin.com/company/nyaysaathis",
    "https://instagram.com/nyaysaathis",
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
