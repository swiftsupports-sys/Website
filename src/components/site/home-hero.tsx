import Image from "next/image";
import Link from "next/link";
import { BarChart, Globe, ShieldCheck, Users } from "lucide-react";

import { ArrowLink } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { photos } from "@/lib/images";

const trustPoints = [
  { icon: Users, label: "One-to-one guidance" },
  { icon: Globe, label: "US technology market focus" },
  { icon: BarChart, label: "Domain-specific preparation" },
  { icon: ShieldCheck, label: "Transparent packages" },
];

export function HomeHero() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div className="shell grid lg:min-h-[620px] lg:grid-cols-2">
          <div className="flex flex-col justify-center py-14 md:py-20 lg:py-24 lg:pr-14">
            <Reveal>
              <h1 className="h-display max-w-[18ch]">
                Build Your Career at Leading US&nbsp;Companies.
              </h1>

              <p className="lead mt-6 max-w-[54ch] text-text-body">
                Get personalized candidate marketing, recruiter networking,
                role-specific training, interview preparation, and mentorship designed
                to help you move confidently toward your next technology role.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button asChild size="lg">
                  <Link href="/contact">Book a Free Consultation</Link>
                </Button>
                <ArrowLink href="/services">Explore Our Services</ArrowLink>
              </div>

              <p className="mt-8 border-t border-border pt-5 text-[0.9375rem] text-text-secondary">
                Personalized support for experienced and aspiring technology
                professionals.
              </p>
            </Reveal>
          </div>
        </div>

        {/* PLACEHOLDER IMAGE: replace with licensed brand photography.
            Full-bleed to the right edge on desktop; stacked below the copy on
            smaller screens. */}
        <div className="relative aspect-16/10 bg-muted lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-1/2">
          <Image
            src={photos.hero.src}
            alt={photos.hero.alt}
            fill
            priority
            quality={82}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[70%_35%]"
          />
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
