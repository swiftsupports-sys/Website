import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, Info } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------- section */

type Tone = "paper" | "alt" | "dark";

/**
 * paper — white surface
 * alt   — the off-white page background, ruled top and bottom so adjacent
 *         sections separate cleanly
 * dark  — navy
 */
const toneClass: Record<Tone, string> = {
  paper: "bg-surface text-text-primary",
  alt: "border-y border-border bg-background text-text-primary",
  dark: "tone-dark bg-brand-navy text-on-dark",
};

export function Section({
  tone = "paper",
  tight,
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & { tone?: Tone; tight?: boolean }) {
  return (
    <section
      className={cn(tight ? "section-tight" : "section", toneClass[tone], className)}
      {...props}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

/* --------------------------------------------------------------- eyebrow */

/** Short section label: sentence case, brand blue, no ornament. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-3 text-[0.9375rem] font-semibold",
        tone === "dark" ? "text-brand-blue-border" : "text-brand-blue",
        className,
      )}
    >
      {children}
    </p>
  );
}

/* ----------------------------------------------------------- section head */

export function SectionHead({
  eyebrow,
  heading,
  intro,
  tone = "light",
  className,
}: {
  eyebrow?: string;
  heading: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-3xl md:mb-12", className)}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2 className="h-xl">{heading}</h2>
      {intro ? (
        <p
          className={cn(
            "lead mt-4",
            tone === "dark" ? "text-on-dark-muted" : "text-text-body",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------- checklist */

export function CheckList({
  items,
  tone = "light",
  className,
}: {
  items: React.ReactNode[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-3", className)}>
      {items.map((item, i) => (
        <li
          key={i}
          className={cn(
            "flex items-start gap-3",
            tone === "dark" ? "text-on-dark-muted" : "text-text-body",
          )}
        >
          <Check
            className={cn(
              "mt-1 size-4.5 shrink-0",
              tone === "dark" ? "text-brand-blue-border" : "text-brand-blue",
            )}
            strokeWidth={2.4}
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------ disclaimer */

export function Disclaimer({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <Reveal
      className={cn(
        "mt-8 flex items-start gap-3 rounded-md border p-4 text-[0.875rem] md:mt-10 md:px-5",
        tone === "dark"
          ? "border-border-dark text-on-dark-muted"
          : "border-border bg-surface text-text-body",
      )}
    >
      <Info
        className={cn(
          "mt-0.5 size-4.5 shrink-0",
          tone === "dark" ? "text-on-dark-subtle" : "text-text-secondary",
        )}
        strokeWidth={2}
        aria-hidden="true"
      />
      <span>{children}</span>
    </Reveal>
  );
}

/* ------------------------------------------------------------ arrow link */

/** Plain text link with a small trailing arrow. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 font-medium text-brand-blue underline-offset-4 transition-colors duration-200 hover:text-brand-blue-hover hover:underline",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
    </Link>
  );
}
