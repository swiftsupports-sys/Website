import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * The SC monogram (square SVG from public/brand) beside the name set on one
 * line, "Swift" bold and "Consultancy" regular — the same two-weight split as
 * the original stacked logo. `dark` is the variant drawn for navy surfaces.
 * The name is live text in the brand face (Sora, loaded in the root layout),
 * so it stays sharp at every size.
 *
 * The full stacked lockup (logo.svg / logo-white.svg) is still in
 * public/brand for print and social use.
 */
const markSrc = {
  light: "/brand/logo-mark.svg",
  dark: "/brand/logo-mark-white.svg",
} as const;

/** Logo mark and one-line name, linking home. */
export function BrandLink({
  className,
  tone = "light",
  priority = false,
}: {
  className?: string;
  tone?: "light" | "dark";
  /** Set on the instance visible above the fold (the site header). */
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("flex shrink-0 items-center gap-2.5", className)}
      aria-label={`${site.name} — home`}
    >
      <Image
        src={markSrc[tone]}
        alt=""
        width={44}
        height={44}
        priority={priority}
        unoptimized
        className="size-9 sm:size-10 md:size-11"
      />
      <span
        className={cn(
          "font-brand text-[1.0625rem] leading-none font-normal tracking-[-0.02em] whitespace-nowrap sm:text-lg md:text-xl",
          tone === "dark" ? "text-white" : "text-brand-navy",
        )}
      >
        <span className="font-bold">Swift</span> Consultancy
      </span>
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
