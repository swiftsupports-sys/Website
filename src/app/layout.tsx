import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { SwiftAgent } from "@/components/site/swift-agent";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { site } from "@/lib/site";

import "./globals.css";

/**
 * One family for the whole site. Plex Sans was drawn for technical
 * documentation: it reads cleanly at small sizes, holds up as a heading face
 * at 600, and has the measured, institutional tone the brand needs.
 */
const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Swift Consultancy | IT Staffing & Tech Career Consulting in the USA",
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Swift Consultancy",
    "Swift Consultancy USA",
    "Swift IT staffing",
    "IT staffing USA",
    "IT staffing and consulting",
    "IT jobs in USA",
    "tech jobs USA",
    "US IT job placement assistance",
    "job application services",
    "profile marketing for IT jobs",
    "resume writing for IT jobs",
    "LinkedIn optimization",
    "tech interview preparation",
    "mock interviews",
    "Java developer jobs USA",
    "Python developer jobs USA",
    "data analyst jobs USA",
  ],
  category: "IT staffing and career consulting",
  verification: {
    // Set these in Vercel once Google Search Console and Bing Webmaster
    // Tools hand you a verification token. Absent, no tag is emitted.
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: "Swift Consultancy | IT Staffing & Tech Career Consulting in the USA",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Swift Consultancy | IT Staffing & Tech Career Consulting in the USA",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plex.variable} h-full antialiased`}>
      <head>
        {/* Entrance animations render their hidden state on the server, so
            without JavaScript the page would be blank. Reveal it instead. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only rounded-b-md bg-brand-blue px-5 py-3 font-semibold text-white focus:not-sr-only focus:absolute focus:top-0 focus:left-4 focus:z-100"
        >
          Skip to main content
        </a>

        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
        <SwiftAgent />
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              toast: "font-sans rounded-md border border-border shadow-overlay",
            },
          }}
        />

        {/*
          One graph for the whole site: the Organization is the entity, the
          WebSite points at it as publisher, and every Service and WebPage node
          references the same @id. That gives search engines a single subject to
          attach signals to rather than several loosely related ones.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />

        {/* No-ops outside Vercel; they only report once deployed. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
