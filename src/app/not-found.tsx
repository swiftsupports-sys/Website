import Link from "next/link";

import { Eyebrow } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { primaryNav } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ink pt-[calc(78px+clamp(4rem,9vw,7rem))] pb-[clamp(4rem,9vw,7rem)] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-42%] right-[-14%] size-[62vw] max-h-[820px] max-w-[820px] rounded-full bg-[radial-gradient(circle,rgb(53_232_82/0.13),transparent_66%)]"
      />
      <div className="shell relative">
        <Eyebrow tone="dark">404</Eyebrow>
        <h1 className="h-xl max-w-[18ch]">
          This Page Has Moved On to Its <span className="text-accent">Next Role.</span>
        </h1>
        <p className="lead mt-5.5 max-w-[52ch] text-white/75">
          The page you were looking for is not here. Try one of the sections below, or
          book a consultation and we will point you in the right direction.
        </p>

        <div className="mt-8.5 flex flex-wrap gap-3.5">
          <Button asChild>
            <Link href="/contact">Book a Free Consultation</Link>
          </Button>
          <Button asChild variant="outlineDark">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        <nav aria-label="Site sections" className="mt-12 flex flex-wrap gap-2.5">
          {primaryNav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-hair-dark px-4 py-2 text-[0.88rem] text-on-dark-muted transition-colors hover:border-accent hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
