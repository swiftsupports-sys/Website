import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * The SC monogram and two-weight wordmark, served as outlined SVG from
 * public/brand so it renders identically everywhere and never depends on a
 * web font. `dark` is the variant drawn for navy surfaces.
 *
 * The files' viewBox is 1235 × 397, so width and height keep that ratio.
 */
const logoSrc = {
  light: "/brand/logo.svg",
  dark: "/brand/logo-white.svg",
} as const;

/** Full logo, linking home. */
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
      className={cn("flex shrink-0 items-center", className)}
      aria-label={`${site.name} — home`}
    >
      <Image
        src={logoSrc[tone]}
        alt=""
        width={143}
        height={46}
        priority={priority}
        unoptimized
        className="h-11 w-auto md:h-12"
      />
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
