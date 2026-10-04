import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Domain } from "@/content/domains";
import type { Package } from "@/content/packages";
import type { ProcessStep } from "@/content/process";
import type { Service } from "@/content/services";
import type { Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------- feature card */

/**
 * card  — bordered white panel, for grids of distinct offerings
 * plain — no box: a blue top rule over open text, for principles and
 *         commitments that read better as columns than as tiles
 */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  variant = "card",
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  variant?: "card" | "plain";
}) {
  return (
    <article
      className={cn(
        "h-full",
        variant === "card"
          ? "rounded-lg border border-border bg-surface p-6 md:p-7"
          : "border-t-2 border-brand-blue pt-6",
      )}
    >
      {Icon ? (
        <Icon className="mb-4 size-7 text-brand-blue" strokeWidth={1.6} aria-hidden="true" />
      ) : null}
      <h3 className="h-md">{title}</h3>
      <p className="mt-2.5 text-text-body">{description}</p>
    </article>
  );
}

/* ------------------------------------------------------------ link card */

/** A card that is a link: hover tints the border and title, nothing moves. */
export function LinkCard({
  href,
  title,
  description,
  linkLabel,
}: {
  href: string;
  title: string;
  description: string;
  linkLabel: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-[border-color,box-shadow] duration-200 hover:border-brand-blue-border hover:shadow-hover md:p-8"
    >
      <h3 className="h-md transition-colors duration-200 group-hover:text-brand-blue">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-text-body">{description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 font-medium text-brand-blue">
        {linkLabel}
        <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
      </span>
    </Link>
  );
}

/* ----------------------------------------------------------- domain grid */

/**
 * Ruled grid: cells share one-pixel dividers instead of floating as separate
 * cards. `detailed` uses the long description in two columns.
 */
export function DomainGrid({
  domains,
  detailed,
}: {
  domains: Domain[];
  detailed?: boolean;
}) {
  return (
    <ul
      className={cn(
        "grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2",
        !detailed && "lg:grid-cols-4",
      )}
    >
      {domains.map((domain) => (
        <li
          key={domain.title}
          className={cn("bg-surface p-6", detailed ? "md:p-8" : "md:p-7")}
        >
          <domain.icon
            className="mb-4 size-6 text-brand-blue"
            strokeWidth={1.7}
            aria-hidden="true"
          />
          <h3 className={detailed ? "h-md" : "text-[1.0625rem] font-semibold"}>
            {domain.title}
          </h3>
          <p
            className={cn(
              "mt-2 text-text-body",
              detailed ? "text-[1rem]" : "text-[0.9375rem]",
            )}
          >
            {detailed ? domain.long : domain.short}
          </p>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------ step list */

const timelineCols: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

/**
 * Process steps.
 *
 * timeline — numbered markers joined by a thin rule (01 —— 02 —— 03), stacked
 *            on smaller screens
 * rows     — a ruled table of stages, with optional detail bullets
 */
export function StepList({
  steps,
  layout = "timeline",
  showDetails,
}: {
  steps: ProcessStep[];
  layout?: "timeline" | "rows";
  showDetails?: boolean;
}) {
  if (layout === "rows") {
    return (
      <ol className="border-t border-border">
        {steps.map((step) => (
          <li
            key={step.n}
            className="grid gap-5 border-b border-border py-8 md:grid-cols-2 md:gap-12 lg:py-10"
          >
            <div className="flex gap-5 md:gap-6">
              <span className="w-10 shrink-0 text-[1.5rem] leading-tight font-semibold text-brand-blue tabular-nums md:w-12 md:text-[1.75rem]">
                {step.n}
              </span>
              <div>
                <h3 className="h-md">{step.title}</h3>
                <p className="mt-2 text-text-body">{step.description}</p>
              </div>
            </div>

            {showDetails && step.details.length > 0 ? (
              <ul className="grid content-start gap-2.5 pl-15 md:pt-1 md:pl-0">
                {step.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3 text-text-body">
                    <Check
                      className="mt-1 size-4 shrink-0 text-brand-blue"
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className={cn("grid gap-8 lg:gap-0", timelineCols[steps.length] ?? "lg:grid-cols-4")}>
      {steps.map((step, i) => (
        <li key={step.n} className="grid grid-cols-[auto_1fr] gap-x-4 lg:block lg:pr-8">
          <div className="flex items-start lg:mb-5 lg:items-center" aria-hidden="true">
            <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-brand-blue bg-surface text-[0.9375rem] font-semibold text-brand-blue tabular-nums">
              {step.n}
            </span>
            {i < steps.length - 1 ? (
              <span className="ml-4 hidden h-px flex-1 bg-border-strong lg:-mr-8 lg:block" />
            ) : null}
          </div>
          <div className="pt-2 lg:pt-0">
            <h3 className="h-md">
              <span className="sr-only">Step {step.n}: </span>
              {step.title}
            </h3>
            <p className="mt-2 text-text-body">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* --------------------------------------------------------- service rows */

export function ServiceRows({ services }: { services: Service[] }) {
  return (
    <ul className="grid md:grid-cols-2 md:gap-x-12">
      {services.map((service) => (
        <li
          key={service.n}
          className="border-b border-border first:border-t md:nth-2:border-t"
        >
          <Link href="/services" className="group flex items-start gap-4 py-5">
            <span className="w-7 shrink-0 pt-0.5 text-[0.875rem] font-semibold text-text-secondary tabular-nums">
              {service.n}
            </span>
            <span className="flex-1">
              <span className="block font-semibold text-brand-navy transition-colors duration-200 group-hover:text-brand-blue">
                {service.title}
              </span>
              <span className="mt-1 block text-[0.9375rem] text-text-body">
                {service.short}
              </span>
            </span>
            <ArrowRight
              className="mt-1 size-4 shrink-0 text-text-secondary transition-colors duration-200 group-hover:text-brand-blue"
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------ price card */

export function PriceCard({ plan }: { plan: Package }) {
  const featured = plan.recommended;

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-lg bg-surface p-7 md:p-10",
        featured ? "border-2 border-brand-blue" : "border border-border",
      )}
    >
      <div className="flex min-h-8 flex-wrap items-center justify-between gap-3">
        <h3 className="h-md">{plan.name}</h3>
        {featured ? (
          <span className="rounded-sm bg-brand-blue-light px-2.5 py-1 text-[0.8125rem] font-semibold text-brand-blue-hover">
            Recommended
          </span>
        ) : null}
      </div>

      <p className="mt-5 text-[clamp(2.5rem,2rem+1.6vw,3.25rem)] leading-none font-semibold tracking-[-0.02em] text-brand-navy">
        {plan.price}
      </p>
      <p className="mt-4 border-b border-border pb-6 text-text-body">{plan.description}</p>

      <ul className="mt-6 mb-8 grid gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-text-body">
            <Check
              className="mt-1 size-4.5 shrink-0 text-brand-blue"
              strokeWidth={2.4}
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Button asChild block size="lg" variant={featured ? "primary" : "secondary"}>
          <Link href="/contact">{plan.cta}</Link>
        </Button>
        <p className="mt-4 text-[0.875rem] text-text-secondary">{plan.note}</p>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------ quote card */

export function QuoteCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-border bg-surface p-6 md:p-8">
      {testimonial.isPlaceholder ? (
        <span className="mb-4 self-start rounded-sm bg-muted px-2 py-0.5 text-[0.8125rem] font-medium text-text-body">
          Example placeholder
        </span>
      ) : null}

      <blockquote className="flex-1 border-l-2 border-brand-blue pl-5 text-text-body">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3.5 border-t border-border pt-5">
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-blue-light text-[0.8125rem] font-semibold text-brand-navy"
        >
          {testimonial.initials}
        </span>
        <span>
          <span className="block font-semibold text-brand-navy">{testimonial.domain}</span>
          <span className="block text-[0.875rem] text-text-secondary">
            {testimonial.context}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
