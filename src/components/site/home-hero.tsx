import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { photos } from "@/lib/images";
import { BarChart, Globe, ShieldCheck, Users } from "lucide-react";

const trustPoints = [
  { icon: Users, label: "One-to-one guidance" },
  { icon: Globe, label: "US technology market focus" },
  { icon: BarChart, label: "Domain-specific preparation" },
  { icon: ShieldCheck, label: "Transparent packages" },
];

export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[min(94vh,880px)] items-end overflow-hidden bg-ink pt-[calc(78px+2.5rem)] pb-10 text-white md:pb-16">
      {/* PLACEHOLDER IMAGE: replace with licensed brand photography */}
      <div className="absolute inset-0 -z-20 bg-[#0d0d0d]">
        <Image
          src={photos.hero.src}
          alt={photos.hero.alt}
          fill
          priority
          sizes="100vw"
          // Narrow viewports crop horizontally, so anchor toward the right to
          // keep the subject in frame; wide viewports crop vertically and can
          // sit centred.
          className="animate-hero-pan object-cover object-[78%_30%] lg:object-[center_30%]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(103deg,rgb(9_9_9/0.94)_0%,rgb(11_11_11/0.82)_40%,rgb(11_11_11/0.36)_74%,rgb(11_11_11/0.54)_100%),linear-gradient(to_top,rgb(9_9_9/0.86)_0%,transparent_46%)]"
      />

      {/* The right side is deliberately left to the photograph — the hero's
          only calls to action are the two buttons below. */}
      <div className="shell">
        <Reveal>
          <h1 className="h-display max-w-[17ch]">
            Build Your Career at{" "}
            <span className="text-accent">Leading US&nbsp;Companies.</span>
          </h1>
        </Reveal>

        <Reveal delay={1}>
          <p className="lead mt-6.5 max-w-[58ch] text-white/80">
            Get personalized candidate marketing, recruiter networking,
            role-specific training, interview preparation, and mentorship designed to
            help you move confidently toward your next technology role.
          </p>
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <Button asChild>
              <Link href="/contact">Book a Free Consultation</Link>
            </Button>
            <Button asChild variant="outlineDark">
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>

          <p className="mt-6.5 inline-flex items-center gap-3 text-[0.9rem] text-white/70">
            <span
              aria-hidden="true"
              className="size-1.75 shrink-0 rounded-full bg-accent ring-4 ring-accent/20"
            />
            Personalized support for experienced and aspiring technology
            professionals.
          </p>
        </Reveal>

        <Reveal delay={3} className="mt-12 md:mt-20">
          <p className="font-display text-[0.76rem] font-bold tracking-[0.14em] text-white/55 uppercase">
            What working with us looks like
          </p>
          <ul className="mt-5 grid gap-3.5 sm:grid-cols-[repeat(2,max-content)] sm:gap-y-4 sm:gap-x-14">
            {trustPoints.map((point) => (
              <li
                key={point.label}
                className="flex items-center gap-2.5 font-display text-[1rem] font-bold tracking-[-0.02em] text-white/90"
              >
                <point.icon
                  className="size-4.75 shrink-0 text-accent"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                {point.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
