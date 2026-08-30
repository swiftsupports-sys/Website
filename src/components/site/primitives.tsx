import * as React from "react";
import Link from "next/link";
import { ArrowRight, CircleCheck, Info } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------- section */

type Tone = "paper" | "alt" | "dark";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-fg",
  alt: "bg-paper-alt text-fg",
  dark: "bg-ink text-on-dark",
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
        "mb-5.5 inline-flex items-center gap-2.5 font-display text-[0.72rem] font-bold tracking-[0.16em] uppercase",
        tone === "dark" ? "text-on-dark-muted" : "text-fg-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="size-2.25 rounded-[3px] bg-accent ring-4 ring-accent/20"
      />
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
  eyebrow: string;
  heading: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-10 md:mb-16",
        intro && "grid items-end gap-6 md:grid-cols-[1.15fr_0.85fr] md:gap-12",
        className,
      )}
    >
      <div>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2 className="h-xl">{heading}</h2>
      </div>
      {intro ? (
        <p
          className={cn(
            "lead",
            tone === "dark" ? "text-on-dark-muted" : "text-fg-muted",
          )}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}

/** Second half of a two-tone heading, e.g. "Bold part <Muted>quiet part</Muted>". */
export function Muted({ children }: { children: React.ReactNode }) {
  return <span className="font-extrabold text-fg-faint">{children}</span>;
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
    <ul className={cn("grid gap-3.5", className)}>
      {items.map((item, i) => (
        <li
          key={i}
          className={cn(
            "flex items-start gap-3.5 text-[0.97rem]",
            tone === "dark" ? "text-on-dark-muted" : "text-fg-muted",
          )}
        >
          <CircleCheck
            className="mt-0.5 size-5.25 shrink-0 text-accent"
            strokeWidth={1.9}
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
        "mt-8 flex items-start gap-3.5 rounded-2xl border border-dashed p-5 text-[0.9rem] md:mt-10",
        tone === "dark"
          ? "border-hair-dark bg-ink-soft text-on-dark-muted"
          : "border-hair-strong bg-paper-alt text-fg-muted",
      )}
    >
      <Info className="mt-0.5 size-5 shrink-0 text-fg-faint" strokeWidth={1.8} aria-hidden="true" />
      <span>{children}</span>
    </Reveal>
  );
}

/* ------------------------------------------------------------ arrow link */

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
        "group inline-flex items-center gap-2.5 border-b-[1.5px] border-transparent pb-0.5 font-display text-[0.93rem] font-bold transition-colors duration-300 hover:border-current",
        className,
      )}
    >
      {children}
      <ArrowRight
        className="size-3.5 transition-transform duration-300 ease-brand group-hover:translate-x-1"
        strokeWidth={2.2}
        aria-hidden="true"
      />
    </Link>
  );
}
