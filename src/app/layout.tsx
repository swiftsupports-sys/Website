import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
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
    default: `Career Consulting for US Technology Roles | ${site.name}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "US technology career consulting",
    "tech interview preparation",
    "candidate marketing services",
    "IT career mentorship",
    "US job search guidance",
    "domain-specific technology training",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: `Career Consulting for US Technology Roles | ${site.name}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `Career Consulting for US Technology Roles | ${site.name}`,
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
