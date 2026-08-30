import type { MetadataRoute } from "next";

import { servicePages } from "@/content/service-pages";
import { legalNav, primaryNav, site } from "@/lib/site";

/**
 * Priorities reflect commercial importance, not a guess at how Google ranks.
 * Conversion pages first, service pages next, legal pages last — indexable,
 * because hiding them would weaken the trust signals they exist to provide,
 * but never competing with the pages that matter.
 */
const priorities: Record<string, number> = {
  "/": 1,
  "/contact": 0.9,
  "/services": 0.9,
  "/pricing": 0.9,
  "/about": 0.8,
  "/how-it-works": 0.8,
  "/domains": 0.7,
  "/success-stories": 0.6,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = [...primaryNav, ...legalNav].map((item) => ({
    url: `${site.url}${item.href === "/" ? "" : item.href}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: priorities[item.href] ?? 0.3,
  }));

  const services = servicePages.map((page) => ({
    url: `${site.url}/services/${page.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...pages, ...services];
}
