import Link from "next/link";

import { Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Closing conversion band, repeated at the foot of every page. */
export function CtaBand({
  eyebrow = "Free Consultation",
  heading = "Let's Build Your Career Strategy.",
  body = "Tell us about your experience, desired role, technology domain, and career expectations. We will help you understand the right next step.",
  secondary = { href: "/pricing", label: "Review Packages" },
  tone = "alt",
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
  secondary?: { href: string; label: string };
  tone?: "paper" | "alt";
}) {
  return (
    <section className={cn("section-tight", tone === "alt" ? "bg-paper-alt" : "bg-paper")}>
      <div className="shell">
        <Reveal className="relative isolate overflow-hidden rounded-(--radius-xl2) bg-ink px-6 py-10 text-center text-white md:px-14 md:py-19">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_118%,rgb(53_232_82/0.3),transparent_62%)]"
          />
          <Eyebrow tone="dark" className="justify-center">
            {eyebrow}
          </Eyebrow>
          <h2 className="h-xl mx-auto max-w-[19ch]">{heading}</h2>
          <p className="mx-auto mt-5 max-w-[56ch] text-on-dark-muted">{body}</p>
          <div className="mt-8.5 flex flex-wrap justify-center gap-3.5">
            <Button asChild>
              <Link href="/contact">Book a Free Consultation</Link>
            </Button>
            <Button asChild variant="outlineDark">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
