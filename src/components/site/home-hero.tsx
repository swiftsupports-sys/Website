import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Mic, Send, Users } from "lucide-react";

import { ArrowLink } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { photos } from "@/lib/images";

const trustPoints = [
  { icon: Send, label: "40+ applications daily" },
  { icon: GraduationCap, label: "Role-specific training" },
  { icon: Mic, label: "Mock interviews & support" },
  { icon: Users, label: "One-to-one mentorship" },
];

export function HomeHero() {
  return (
    <>
      <section className="tone-dark relative isolate overflow-hidden border-b border-border bg-brand-navy text-white">
        {/* PLACEHOLDER IMAGE: replace with licensed brand photography.
            Full-bleed across the whole hero. The photograph is composed with
            its subject in the right half, so the scrim below can darken the
            left for the copy without covering a face. */}
        <div className="absolute inset-0 -z-20">
          <Image
            src={photos.hero.src}
            alt={photos.hero.alt}
            fill
            priority
            quality={82}
            sizes="100vw"
            // Narrow screens crop horizontally, so anchor toward the subject;
            // wide screens crop vertically and can sit centred.
            className="object-cover object-[76%_32%] lg:object-[center_32%]"
          />
        </div>

        {/* Two passes: a left-weighted wash for headline contrast, and a lift
            from the bottom so the band below meets the photo cleanly. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(11_31_58/0.95)_0%,rgb(11_31_58/0.86)_38%,rgb(11_31_58/0.45)_68%,rgb(11_31_58/0.62)_100%),linear-gradient(to_top,rgb(11_31_58/0.75)_0%,transparent_45%)]"
        />

        <div className="shell flex min-h-[560px] flex-col justify-center py-16 md:py-24 lg:min-h-[640px]">
          <Reveal>
            <p className="mb-5 text-[0.9375rem] font-semibold tracking-wide text-brand-blue-border uppercase">
              Swift Consultancy · IT Staffing &amp; Career Consulting, USA
            </p>
            <h1 className="h-display max-w-[17ch]">
              Land Your Next Tech Role in the&nbsp;US.
            </h1>

            <p className="lead mt-6 max-w-[56ch] text-white/80">
              We build your resume, LinkedIn, GitHub, and portfolio, apply to 40+
              matched roles for you every day, and train you to win the interview
              — with a dedicated consultant beside you from first call to offer.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button asChild size="lg">
                <Link href="/contact">Book a Free Consultation</Link>
              </Button>
              <ArrowLink href="/services" className="text-white hover:text-white">
                Explore Our Services
              </ArrowLink>
            </div>

            <p className="mt-8 max-w-[56ch] border-t border-white/20 pt-5 text-[0.9375rem] text-white/70">
              For recent graduates, experienced professionals, and career switchers.
              Packages from $1K.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Differentiators — a ruled four-column band, not a row of badges. */}
      <section aria-labelledby="hero-points" className="tone-dark bg-brand-navy text-white">
        <h2 id="hero-points" className="sr-only">
          What working with us looks like
        </h2>
        {/* gap-px over a translucent fill draws the dividers at every
            breakpoint without per-item border bookkeeping. */}
        <div className="shell">
          <ul className="grid gap-px bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point) => (
              <li
                key={point.label}
                className="flex items-center gap-3 bg-brand-navy py-5 text-[0.9375rem] font-medium sm:px-6 sm:py-6 sm:odd:pl-0 lg:nth-3:pl-6"
              >
                <point.icon
                  className="size-5 shrink-0 text-brand-blue-border"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                {point.label}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
