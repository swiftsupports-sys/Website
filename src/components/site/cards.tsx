import * as React from "react";
import Link from "next/link";
import { ArrowRight, CircleCheck, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import type { Domain } from "@/content/domains";
import type { Package } from "@/content/packages";
import type { ProcessStep } from "@/content/process";
import type { Service } from "@/content/services";
import type { Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------ value card */

export function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
  tone = "light",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  tone?: "light" | "dark" | "flat";
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={cn(
          "group relative h-full overflow-hidden rounded-(--radius-card) border p-6 transition-[transform,box-shadow,border-color] duration-400 ease-brand hover:-translate-y-1.5 hover:shadow-card md:p-8",
          "before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:origin-left before:scale-x-0 before:bg-accent before:transition-transform before:duration-500 before:ease-brand hover:before:scale-x-100",
          tone === "dark"
            ? "border-hair-dark bg-ink-soft text-on-dark"
            : tone === "flat"
              ? "border-transparent bg-paper-alt"
              : "border-hair bg-white hover:border-transparent",
        )}
      >
        <span
          className={cn(
            "mb-5.5 grid size-13.5 place-items-center rounded-[15px] transition-[background-color,color,transform] duration-400 ease-brand group-hover:-rotate-6 group-hover:bg-accent group-hover:text-ink",
            tone === "dark" ? "bg-white/8 text-white" : "bg-paper-alt text-ink",
            tone === "flat" && "bg-white",
          )}
        >
          <Icon className="size-6" strokeWidth={1.7} aria-hidden="true" />
        </span>
        <h3 className="h-md mb-2.5">{title}</h3>
        <p
          className={cn(
            "text-[0.95rem]",
            tone === "dark" ? "text-on-dark-muted" : "text-fg-muted",
          )}
        >
          {description}
        </p>
      </article>
    </Reveal>
  );
}

/* ---------------------------------------------------------- domain card */

export function DomainCard({
  domain,
  delay = 0,
  detailed,
}: {
  domain: Domain;
  delay?: number;
  detailed?: boolean;
}) {
  if (detailed) {
    return (
      <FeatureCard
        icon={domain.icon}
        title={domain.title}
        description={domain.long}
        delay={delay}
      />
    );
  }

  return (
    <Reveal delay={delay} className="h-full">
      <article className="group flex h-full min-h-46 flex-col gap-3.5 rounded-2xl border border-hair bg-white p-6 transition-[transform,box-shadow] duration-400 ease-brand hover:-translate-y-1.5 hover:shadow-card">
        <span className="grid size-11 place-items-center rounded-xl border border-hair text-ink transition-colors duration-400 group-hover:border-accent group-hover:bg-accent">
          <domain.icon className="size-5.25" strokeWidth={1.7} aria-hidden="true" />
        </span>
        <h3 className="text-[1.04rem] font-extrabold tracking-[-0.015em]">
          {domain.title}
        </h3>
        <p className="mt-auto text-[0.88rem] text-fg-muted">{domain.short}</p>
      </article>
    </Reveal>
  );
}

/* ------------------------------------------------------------ step list */

export function StepList({
  steps,
  tone = "light",
  showDetails,
}: {
  steps: ProcessStep[];
  tone?: "light" | "dark";
  showDetails?: boolean;
}) {
  return (
    <ol className="grid gap-3.5 md:gap-5">
      {/* The <li> is the animated wrapper and the inner element is a plain div:
          nesting an <li> inside an <li> is invalid HTML and breaks hydration,
          and the split keeps the hover transform off motion's inline style. */}
      {steps.map((step, i) => (
        <Reveal as="li" key={step.n} delay={i}>
          <div
            className={cn(
              "group grid grid-cols-[auto_1fr] items-start gap-5 rounded-(--radius-card) border p-6 transition-[background-color,border-color,transform] duration-400 ease-brand md:grid-cols-[auto_1fr_auto] md:gap-10 md:p-9",
              tone === "dark"
                ? "border-hair-dark bg-ink-soft hover:border-accent hover:bg-accent"
                : "border-hair bg-white hover:translate-x-1.5 hover:border-ink hover:bg-ink",
            )}
          >
            <span
              className={cn(
                "min-w-15 font-display text-[clamp(1.6rem,2.6vw,2.1rem)] leading-none font-extrabold tracking-tighter transition-colors duration-400",
                tone === "dark"
                  ? "text-fg-faint group-hover:text-ink"
                  : "text-fg-faint group-hover:text-accent",
              )}
            >
              {step.n}
            </span>

            <div>
              <h3
                className={cn(
                  "h-md mb-2.5 transition-colors duration-400",
                  tone === "dark" ? "text-white group-hover:text-ink" : "group-hover:text-white",
                )}
              >
                {step.title}
              </h3>
              <p
                className={cn(
                  "max-w-[66ch] text-[0.97rem] transition-colors duration-400",
                  tone === "dark"
                    ? "text-on-dark-muted group-hover:text-ink/80"
                    : "text-fg-muted group-hover:text-on-dark-muted",
                )}
              >
                {step.description}
              </p>

              {showDetails ? (
                <ul className="mt-4 grid gap-2.5">
                  {step.details.map((detail) => (
                    <li
                      key={detail}
                      className={cn(
                        "flex items-start gap-3 text-[0.9rem] transition-colors duration-400",
                        tone === "dark"
                          ? "text-on-dark-muted group-hover:text-ink/80"
                          : "text-fg-muted group-hover:text-on-dark-muted",
                      )}
                    >
                      <CircleCheck
                        className={cn(
                          "mt-0.5 size-4.5 shrink-0 text-accent transition-colors duration-400",
                          tone === "dark" && "group-hover:text-ink",
                        )}
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <span
              className={cn(
                "hidden size-12 place-items-center rounded-[14px] transition-[background-color,color] duration-400 md:grid",
                tone === "dark"
                  ? "bg-white/8 text-white group-hover:bg-ink/12 group-hover:text-ink"
                  : "bg-paper-alt text-ink group-hover:bg-accent",
              )}
            >
              <step.icon className="size-5.5" strokeWidth={1.7} aria-hidden="true" />
            </span>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/* --------------------------------------------------------- service rows */

export function ServiceRows({ services }: { services: Service[] }) {
  return (
    <Reveal className="grid md:grid-cols-2 md:gap-x-12 lg:gap-x-18">
      {services.map((service) => (
        <Link
          key={service.n}
          href="/services"
          className="group relative flex items-start gap-4.5 border-b border-hair py-5.5 transition-[padding] duration-300 ease-brand hover:pl-4.5"
        >
          <span className="absolute -inset-x-3.5 inset-y-0 rounded-2xl bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative min-w-6.5 pt-1 font-display text-[0.78rem] font-bold tracking-[0.06em] text-fg-faint">
            {service.n}
          </span>
          <span className="relative">
            <span className="block font-display text-[1.03rem] font-bold tracking-[-0.018em]">
              {service.title}
            </span>
            <span className="mt-1 block text-[0.9rem] text-fg-muted">
              {service.short}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="relative ml-auto grid size-7.5 shrink-0 -translate-x-1.5 place-items-center self-center rounded-full bg-paper-alt opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:bg-accent group-hover:opacity-100"
          >
            <ArrowRight className="size-3" strokeWidth={2.4} />
          </span>
        </Link>
      ))}
    </Reveal>
  );
}

/* ------------------------------------------------------------ price card */

export function PriceCard({ plan, delay = 0 }: { plan: Package; delay?: number }) {
  const featured = plan.recommended;

  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={cn(
          "relative flex h-full flex-col rounded-(--radius-xl2) border p-7 transition-[transform,box-shadow] duration-400 ease-brand hover:-translate-y-1.5 md:p-11",
          featured
            ? "border-ink bg-ink text-on-dark hover:shadow-float"
            : "border-hair bg-white hover:shadow-card",
        )}
      >
        {featured ? (
          <span className="absolute top-5.5 right-5.5 rounded-full bg-accent px-3.5 py-1.75 font-display text-[0.68rem] font-extrabold tracking-[0.12em] text-ink uppercase">
            Recommended
          </span>
        ) : null}

        <p
          className={cn(
            "font-display text-[0.78rem] font-bold tracking-[0.15em] uppercase",
            featured ? "text-accent" : "text-fg-faint",
          )}
        >
          {plan.name}
        </p>
        <p className="mt-4.5 mb-1.5 font-display text-[clamp(3rem,5.4vw,4.1rem)] leading-none font-extrabold tracking-tighter">
          {plan.price}
        </p>
        <p
          className={cn(
            "mb-6.5 border-b pb-6.5 text-[0.96rem]",
            featured ? "border-hair-dark text-on-dark-muted" : "border-hair text-fg-muted",
          )}
        >
          {plan.description}
        </p>

        <ul className="mb-7.5 grid gap-3.75">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className={cn(
                "flex items-start gap-3.5 text-[0.95rem]",
                featured ? "text-on-dark-muted" : "text-fg-muted",
              )}
            >
              <CircleCheck
                className="mt-0.5 size-5 shrink-0 text-accent"
                strokeWidth={1.9}
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <Button asChild block variant={featured ? "accent" : "outline"}>
            <Link href="/contact">{plan.cta}</Link>
          </Button>
          <p
            className={cn(
              "mt-4 text-[0.82rem] leading-relaxed",
              featured ? "text-white/50" : "text-fg-faint",
            )}
          >
            {plan.note}
          </p>
        </div>
      </article>
    </Reveal>
  );
}

/* ------------------------------------------------------------ quote card */

export function QuoteCard({
  testimonial,
  delay = 0,
}: {
  testimonial: Testimonial;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="flex h-full flex-col gap-4.5 rounded-(--radius-card) border border-hair bg-white p-7 transition-[transform,box-shadow] duration-400 ease-brand hover:-translate-y-1.5 hover:shadow-card md:p-9">
        <span
          aria-hidden="true"
          className="h-5.5 font-display text-5xl leading-[0.6] text-accent"
        >
          &ldquo;
        </span>

        {testimonial.isPlaceholder ? (
          <span className="self-start rounded-full bg-paper-alt px-2.75 py-1.25 font-display text-[0.66rem] font-bold tracking-widest text-fg-faint uppercase">
            Example placeholder
          </span>
        ) : null}

        <p className="flex-1 text-[1rem] leading-[1.68] text-fg-muted">
          {testimonial.quote}
        </p>

        <div className="flex items-center gap-3.5 border-t border-hair pt-5">
          <span
            aria-hidden="true"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-paper-alt font-display text-[0.95rem] font-extrabold text-fg-faint"
          >
            {testimonial.initials}
          </span>
          <span>
            <strong className="block font-display text-[0.95rem] tracking-[-0.01em]">
              {testimonial.domain}
            </strong>
            <span className="block text-[0.82rem] text-fg-faint">
              {testimonial.context}
            </span>
          </span>
        </div>
      </article>
    </Reveal>
  );
}
