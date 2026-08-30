import type { MetadataRoute } from "next";

import { legalNav, primaryNav, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const priorities: Record<string, number> = {
    "/": 1,
    "/contact": 0.9,
    "/services": 0.9,
    "/pricing": 0.9,
  };

  return [...primaryNav, ...legalNav].map((item) => ({
    url: `${site.url}${item.href === "/" ? "" : item.href}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: priorities[item.href] ?? 0.7,
  }));
}
