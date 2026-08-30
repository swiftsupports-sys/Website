import Link from "next/link";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** The ascending-chevron mark. Lime tile on dark, inverted on light. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-8.5", className)}>
      <rect width="64" height="64" rx="16" fill="var(--color-accent)" />
      <path
        d="M18 40 L32 22 L46 40"
        fill="none"
        stroke="#0b0b0b"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 50 L32 32 L46 50"
        fill="none"
        stroke="#0b0b0b"
        strokeOpacity="0.4"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BrandLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex shrink-0 items-center gap-2.5 font-display text-[1.22rem] font-extrabold tracking-[-0.03em] transition-colors duration-300",
        className,
      )}
      aria-label={`${site.name} — home`}
    >
      <LogoMark />
      {site.name}
    </Link>
  );
}

/* Brand marks lucide does not ship. */

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9 1-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.5c-.1.2-.3.3-.1.6.1.2.6 1 1.3 1.6.9.8 1.6 1 1.9 1.2.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.6-.1l2 .9c.2.1.4.2.4.3.1.2.1.7-.1 1.3z" />
    </svg>
  );
}

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.3 8.2h4.4V24H.3zM8.4 8.2h4.2v2.2h.06c.6-1.1 2-2.3 4.2-2.3 4.5 0 5.3 2.9 5.3 6.7V24h-4.4v-7.4c0-1.8 0-4-2.5-4s-2.9 1.9-2.9 3.9V24H8.4z" />
    </svg>
  );
}
