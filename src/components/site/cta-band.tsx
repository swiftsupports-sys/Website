import Link from "next/link";

import { Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

/**
 * Closing conversion band, repeated at the foot of every page. One treatment
 * site-wide: a straight navy section, copy left, actions right.
 */
export function CtaBand({
  eyebrow = "Free Consultation",
  heading = "Let's Build Your Career Strategy.",
  body = "Tell us about your experience, desired role, technology domain, and career expectations. We will help you understand the right next step.",
  secondary = { href: "/pricing", label: "Review Packages" },
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="tone-dark border-b border-border-dark bg-brand-navy py-14 text-white md:py-18 lg:py-20">
      <div className="shell">
        <Reveal className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            <h2 className="h-xl max-w-[26ch]">{heading}</h2>
            <p className="mt-4 max-w-[62ch] text-[1.0625rem] text-on-dark-muted">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">Book a Free Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="secondaryDark">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
