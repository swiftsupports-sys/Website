import * as React from "react";
import Link from "next/link";

import { Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

/**
 * Dark hero used by every page except the home page. The header sits
 * transparent over it, so the top padding accounts for the fixed bar.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumb,
  actions,
  note,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  breadcrumb: string;
  actions?: React.ReactNode;
  note?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pt-[calc(78px+clamp(3.5rem,8vw,6.5rem))] pb-[clamp(3.5rem,8vw,6.5rem)] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-42%] right-[-14%] size-[62vw] max-h-[820px] max-w-[820px] rounded-full bg-[radial-gradient(circle,rgb(53_232_82/0.13),transparent_66%)]"
      />
      <div className="shell relative">
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center gap-2.5 text-[0.83rem] text-white/50"
          >
            <Link href="/" className="transition-colors hover:text-accent">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{breadcrumb}</span>
          </nav>

          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 className="max-w-[20ch] text-[clamp(2.2rem,5.2vw,3.9rem)]">{title}</h1>

          {intro ? (
            <p className="lead mt-5.5 max-w-[64ch] text-white/75">{intro}</p>
          ) : null}

          {note ? (
            <p className="mt-6 inline-flex items-center gap-3 text-[0.9rem] text-white/70">
              <span
                aria-hidden="true"
                className="size-1.75 shrink-0 rounded-full bg-accent ring-4 ring-accent/20"
              />
              {note}
            </p>
          ) : null}

          {actions ? <div className="mt-8.5 flex flex-wrap gap-3.5">{actions}</div> : null}
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
      <Button asChild variant="outlineDark">
        <Link href={secondaryHref}>{secondaryLabel}</Link>
      </Button>
    </>
  );
}
