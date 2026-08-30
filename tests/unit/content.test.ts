import { describe, expect, it } from "vitest";

import { domains } from "@/content/domains";
import { faqs, faqsFor } from "@/content/faq";
import { servicePages } from "@/content/service-pages";
import { packages } from "@/content/packages";
import { processSteps } from "@/content/process";
import { services, serviceGroups, servicesByGroup } from "@/content/services";
import { legalNav, primaryNav } from "@/lib/site";

describe("site content", () => {
  it("publishes all fifteen services across the three groups", () => {
    expect(services).toHaveLength(15);
    const grouped = serviceGroups.flatMap((group) => servicesByGroup(group.id));
    expect(grouped).toHaveLength(services.length);
  });

  it("numbers services sequentially", () => {
    expect(services.map((s) => s.n)).toEqual(
      Array.from({ length: 15 }, (_, i) => String(i + 1).padStart(2, "0")),
    );
  });

  it("covers the eight advertised technology domains", () => {
    expect(domains).toHaveLength(8);
    expect(domains.map((d) => d.title)).toContain("Other Technology Domains");
  });

  it("describes a five-stage process", () => {
    expect(processSteps).toHaveLength(5);
    expect(processSteps.map((s) => s.n)).toEqual(["01", "02", "03", "04", "05"]);
  });

  it("offers exactly one recommended package", () => {
    expect(packages).toHaveLength(2);
    expect(packages.filter((p) => p.recommended)).toHaveLength(1);
  });

  it("states plainly what is and is not guaranteed", () => {
    const answer = faqs.find((f) => f.question.includes("guarantee job placement"))?.answer ?? "";
    // The commitment is to the work the consultancy controls...
    expect(answer).toMatch(/interview opportunities/i);
    expect(answer).toMatch(/recruiter networking/i);
    // ...and it must still disclaim the part the employer controls.
    expect(answer).toMatch(/cannot honestly guarantee/i);
    expect(answer).toMatch(/offer, employer, salary, or joining date/i);
  });

  it("never promises a specific job, offer, or employer", () => {
    // "We guarantee our work" is fine. Guaranteeing an outcome is not.
    const banned = /guarantee[sd]?s+(yous+)?(as+)?(job|offer|placement|employment|salary)/i;
    const offenders = faqs.filter((f) => banned.test(f.answer));
    expect(offenders.map((f) => f.question)).toEqual([]);
  });

  it("splits FAQ entries between the home and pricing pages", () => {
    expect(faqsFor("general").length).toBeGreaterThan(0);
    expect(faqsFor("pricing").length).toBeGreaterThan(0);
  });

  it("keeps navigation hrefs unique and rooted", () => {
    const hrefs = [...primaryNav, ...legalNav].map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    hrefs.forEach((href) => expect(href.startsWith("/")).toBe(true));
  });
});

describe("service pages", () => {
  it("have unique slugs", () => {
    const slugs = servicePages.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("only link to service pages that exist", () => {
    const slugs = new Set(servicePages.map((p) => p.slug));
    for (const page of servicePages) {
      for (const related of page.related) {
        expect(slugs.has(related), `${page.slug} -> ${related}`).toBe(true);
      }
    }
  });

  it("never link to themselves as related", () => {
    for (const page of servicePages) {
      expect(page.related).not.toContain(page.slug);
    }
  });

  it("keep meta titles and descriptions within sensible SERP limits", () => {
    for (const page of servicePages) {
      // Titles get " — Swift Consultancy" appended by the layout template.
      expect(page.metaTitle.length, page.slug).toBeLessThanOrEqual(45);
      expect(page.metaDescription.length, page.slug).toBeGreaterThan(70);
      expect(page.metaDescription.length, page.slug).toBeLessThanOrEqual(200);
    }
  });

  it("promise no outcomes anywhere in their copy", () => {
    const banned = /guarantee[sd]?s+(yous+)?(as+)?(job|offer|placement|employment|salary)|assured placement|100% placement/i;
    for (const page of servicePages) {
      const prose = [
        ...page.intro,
        ...page.includes.flatMap((i) => [i.title, i.body]),
        ...page.process.flatMap((s) => [s.title, s.body]),
        ...page.audience.flatMap((a) => [a.title, a.body]),
        ...page.faqs.flatMap((f) => [f.question, f.answer]),
      ].join(" ");
      expect(prose, page.slug).not.toMatch(banned);
    }
  });
});
