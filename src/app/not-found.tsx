import Link from "next/link";

import { Eyebrow } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { primaryNav } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="section bg-surface">
      <div className="shell">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="h-page max-w-[22ch]">
          This Page Has Moved On to Its Next Role.
        </h1>
        <p className="lead mt-5 max-w-[56ch] text-text-body">
          The page you were looking for is not here. Try one of the sections below, or
          book a consultation and we will point you in the right direction.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/contact">Book a Free Consultation</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        <nav aria-label="Site sections" className="mt-12 max-w-3xl border-t border-border pt-8">
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
            {primaryNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-medium text-brand-blue underline-offset-4 transition-colors hover:text-brand-blue-hover hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
