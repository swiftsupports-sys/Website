import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import type { Photo } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Navy page banner used by every page except the home page: breadcrumb,
 * heading, introduction, and optional actions. Solid colour, no ornament.
 *
 * The copy arrives in reading order — breadcrumb, heading, introduction,
 * actions — each a beat after the last.
 *
 * `eyebrow` is optional — pass it only when it adds something the breadcrumb
 * does not already say (e.g. a service page's category).
 *
 * `image` fills the banner's right half on large screens, where the copy
 * alone would leave it empty. It is omitted below that width, so on phones
 * the page content stays as close to the top as it was.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumb,
  actions,
  note,
  image,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  breadcrumb: string;
  actions?: React.ReactNode;
  note?: React.ReactNode;
  image?: Photo;
}) {
  return (
    <section className="tone-dark bg-brand-navy py-14 text-white md:py-18 lg:py-22">
      <div
        className={cn(
          "shell",
          image &&
            "lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14 xl:gap-20",
        )}
      >
        <div>
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
          </Reveal>

          <Reveal delay={1}>
            {eyebrow ? <Eyebrow tone="dark">{eyebrow}</Eyebrow> : null}
            <h1 className="h-page max-w-[24ch]">{title}</h1>
          </Reveal>

          {intro || note ? (
            <Reveal delay={2}>
              {intro ? (
                <p className="lead mt-5 max-w-[66ch] text-on-dark-muted">{intro}</p>
              ) : null}
              {note ? (
                <p className="mt-5 text-[0.9375rem] text-on-dark-subtle">{note}</p>
              ) : null}
            </Reveal>
          ) : null}

          {actions ? (
            <Reveal delay={3} className="mt-8 flex flex-wrap gap-3">
              {actions}
            </Reveal>
          ) : null}
        </div>

        {image ? (
          <Reveal variant="image" delay={2} className="hidden lg:block">
            <div className="relative aspect-4/3 overflow-hidden rounded-lg shadow-[0_32px_64px_-32px_rgb(0_0_0/0.7)] ring-1 ring-white/10">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={image.position ? { objectPosition: image.position } : undefined}
              />
            </div>
          </Reveal>
        ) : null}
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
