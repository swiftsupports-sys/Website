import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { organizationJsonLd } from "@/lib/structured-data";
import { site } from "@/lib/site";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Career Consultancy for US Technology Roles`,
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
    title: `${site.name} — Career Consultancy for US Technology Roles`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Career Consultancy for US Technology Roles`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#101210",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} h-full antialiased`}>
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
          className="sr-only rounded-b-lg bg-accent px-5 py-3 font-display font-bold text-ink focus:not-sr-only focus:absolute focus:top-0 focus:left-4 focus:z-100"
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
              toast: "font-sans rounded-2xl border border-hair shadow-card",
            },
          }}
        />

        <script
          type="application/ld+json"
          // Organization + ProfessionalService markup for search engines.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        {/* No-ops outside Vercel; they only report once deployed. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
