import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

/**
 * Navy page banner used by every page except the home page: breadcrumb,
 * heading, introduction, and optional actions. Solid colour, no ornament.
 *
 * `eyebrow` is optional — pass it only when it adds something the breadcrumb
 * does not already say (e.g. a service page's category).
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumb,
  actions,
  note,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  breadcrumb: string;
  actions?: React.ReactNode;
  note?: React.ReactNode;
}) {
  return (
    <section className="tone-dark bg-brand-navy py-14 text-white md:py-18 lg:py-22">
      <div className="shell">
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1.5 text-[0.875rem] text-on-dark-subtle"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
            <span aria-current="page" className="text-on-dark-muted">
              {breadcrumb}
            </span>
          </nav>

          {eyebrow ? <Eyebrow tone="dark">{eyebrow}</Eyebrow> : null}
          <h1 className="h-page max-w-[24ch]">{title}</h1>

          {intro ? (
            <p className="lead mt-5 max-w-[66ch] text-on-dark-muted">{intro}</p>
          ) : null}

          {note ? (
            <p className="mt-5 text-[0.9375rem] text-on-dark-subtle">{note}</p>
          ) : null}

          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}

/** The two buttons that appear under most page heroes. */
export function HeroActions({
  secondaryHref = "/services",
  secondaryLabel = "Explore Our Services",
}: {
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <>
      <Button asChild>
        <Link href="/contact">Book a Free Consultation</Link>
      </Button>
      <Button asChild variant="secondaryDark">
        <Link href={secondaryHref}>{secondaryLabel}</Link>
      </Button>
    </>
  );
}
