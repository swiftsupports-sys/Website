import type { Metadata } from "next";

import { site } from "@/lib/site";

/**
 * Central SEO helpers. Every page builds its metadata through `pageMetadata`
 * so canonical URLs, Open Graph, and Twitter cards can never drift apart or be
 * forgotten on a new route.
 */

/** Absolute URL for a route path. `/` collapses to the bare origin. */
export function canonical(path: string): string {
  if (path === "/") return site.url;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  /** Page title without the brand suffix — the layout template appends it. */
  title: string;
  description: string;
  /** Route path, e.g. "/services/interview-preparation". */
  path: string;
  /** Set false for pages that should stay out of the index. */
  index?: boolean;
  /** Overrides the title used in the social card, when the SERP title is terse. */
  socialTitle?: string;
  /**
   * Bypass the layout's `%s — Swift Consultancy` template. Use when the title
   * already contains the brand, so it does not appear twice.
   */
  absoluteTitle?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  index = true,
  socialTitle,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const url = canonical(path);
  const ogTitle = `${socialTitle ?? title} — ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url,
      title: ogTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
    robots: index
      ? undefined
      : { index: false, follow: true, googleBot: { index: false, follow: true } },
  };
}

/* -------------------------------------------------------------------------- */
/* JSON-LD builders                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Breadcrumb markup. Mirrors the breadcrumb trail already visible in the page
 * hero — structured data must describe what a visitor can actually see.
 */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: canonical(item.path),
      }),
    ),
  };
}

/**
 * Service markup for a single service page. `provider` points back at the
 * Organization node so search engines resolve them as one entity rather than
 * two unrelated things that happen to share a name.
 */
export function serviceJsonLd({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical(path)}/#service`,
    name,
    description,
    serviceType,
    url: canonical(path),
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    audience: {
      "@type": "Audience",
      audienceType: "Technology professionals seeking roles in the United States",
    },
  };
}
