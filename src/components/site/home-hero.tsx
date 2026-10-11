import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Mic, Send, Users } from "lucide-react";

import { HeroMedia } from "@/components/site/hero-media";
import { ArrowLink } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { photos } from "@/lib/images";

/**
 * Shared by the still and the video so they line up exactly. Narrow screens
 * crop horizontally: 62% keeps the midtown cluster in frame beside the copy.
 * Wide screens crop vertically and sit centred, sky above, skyline below.
 */
const heroCrop = "object-[62%_center] lg:object-center";

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
        {/* Full-bleed background: a Manhattan time-lapse looping over its own
            opening frame (see HeroMedia). Stock footage, Mixkit clip 4341,
            used under the Mixkit Stock Video Free License (commercial use, no
            attribution). Replace both files together, under new names. */}
        <HeroMedia videoSrc="/videos/hero-manhattan.mp4" mediaClassName={heroCrop}>
          <Image
            src={photos.hero.src}
            alt={photos.hero.alt}
            fill
            priority
            quality={82}
            sizes="100vw"
            className={`object-cover ${heroCrop}`}
          />
        </HeroMedia>

        {/* Two passes: a left-weighted wash for headline contrast, and a lift
            from the bottom so the band below meets the photo cleanly. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(11_31_58/0.95)_0%,rgb(11_31_58/0.86)_38%,rgb(11_31_58/0.45)_68%,rgb(11_31_58/0.62)_100%),linear-gradient(to_top,rgb(11_31_58/0.75)_0%,transparent_45%)]"
        />

        <div className="shell flex min-h-[560px] flex-col justify-center py-16 md:py-24 lg:min-h-[640px]">
          {/* The copy arrives in reading order, a beat apart. */}
          <Reveal>
            <p className="mb-5 text-[0.9375rem] font-semibold tracking-wide text-brand-blue-border uppercase">
              Swift Consultancy · IT Staffing &amp; Career Consulting, USA
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="h-display max-w-[17ch]">
              Land Your Next Tech Role in the&nbsp;US.
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="lead mt-6 max-w-[56ch] text-white/80">
              We build your resume, LinkedIn, GitHub, and portfolio, apply to 40+
              matched roles for you every day, and train you to win the interview
              — with a dedicated consultant beside you from first call to offer.
            </p>
          </Reveal>

          <Reveal delay={3} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button asChild size="lg">
              <Link href="/contact">Book a Free Consultation</Link>
            </Button>
            <ArrowLink href="/services" className="text-white hover:text-white">
              Explore Our Services
            </ArrowLink>
          </Reveal>

          <Reveal delay={4}>
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
        {/* Two columns from the smallest screens, so the four points take two
            rows on a phone rather than four. Revealed as one block: the
            dividers are the list's background showing through 1px gaps. */}
        <Reveal delay={5} className="shell">
          <ul className="grid grid-cols-2 gap-px bg-white/12 lg:grid-cols-4">
            {trustPoints.map((point) => (
              <li
                key={point.label}
                className="flex items-center gap-2.5 bg-brand-navy py-4 pr-3 text-[0.875rem] leading-snug font-medium even:pl-4 sm:gap-3 sm:py-6 sm:pr-6 sm:text-[0.9375rem] sm:even:pl-6 lg:nth-3:pl-6"
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
        </Reveal>
      </section>
    </>
  );
}
