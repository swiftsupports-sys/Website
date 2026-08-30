import type { Metadata } from "next";
import Image from "next/image";
import {
  Briefcase,
  CalendarCheck,
  CircleX,
  GraduationCap,
  Repeat,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

import { FeatureCard } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { HeroActions, PageHero } from "@/components/site/page-hero";
import {
  CheckList,
  Eyebrow,
  Muted,
  Section,
  SectionHead,
} from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { photos } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "A career strategy built around your experience, strengths, and target technology role in the US market — with honest positioning and transparent terms.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    icon: Target,
    title: "Honest Positioning",
    description:
      "We represent your experience accurately. Nothing is invented, inflated, or reframed into something you cannot defend in an interview.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Terms",
    description:
      "Scope, fees, and conditions are explained before you commit and confirmed in writing. No surprises later in the engagement.",
  },
  {
    icon: Users,
    title: "Personal Attention",
    description:
      "You work with a consultant who knows your background, not a queue. Sessions are one-to-one and scheduled around your commitments.",
  },
  {
    icon: CalendarCheck,
    title: "Realistic Expectations",
    description:
      "We will tell you when a target looks out of reach today, and what would need to change for it to become realistic.",
  },
];

const audiences = [
  {
    icon: Briefcase,
    title: "Experienced Professionals",
    description:
      "You have delivered real work, but your profile, interview preparation, or market visibility has not kept pace with your experience.",
  },
  {
    icon: Repeat,
    title: "Career Switchers",
    description:
      "You are moving into a new technology domain and need a credible story, the right skills, and preparation that closes the gap.",
  },
  {
    icon: GraduationCap,
    title: "Aspiring Professionals",
    description:
      "You are early in your journey and want structured guidance on what to learn, how to present it, and how hiring actually works.",
  },
];

const limits = [
  "We do not guarantee jobs, offers, interviews, or salaries.",
  "We do not claim partnerships with or placement at named companies.",
  "We do not misrepresent your experience to any employer or recruiter.",
  "We do not provide immigration, visa, or legal advice.",
  "We do not attend interviews on a candidate's behalf, in any form.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="About Us"
        eyebrow="About Us"
        title={
          <>
            More Than Job Search Support —{" "}
            <span className="text-accent">A Career Strategy Built Around You.</span>
          </>
        }
        intro="We work closely with candidates to understand their experience, strengths, career goals, and target roles. From professional branding and role-specific preparation to recruiter networking and interview support, our process is designed to help candidates present themselves with confidence in the US technology job market."
        actions={<HeroActions />}
      />

      {/* ------------------------------------------------------- our approach */}
      <Section tone="paper">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-18">
          <Reveal className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3.5">
              {/* PLACEHOLDER IMAGES */}
              <div className="col-span-2 overflow-hidden rounded-(--radius-card)">
                <Image
                  src={photos.roadmap.src}
                  alt={photos.roadmap.alt}
                  width={1000}
                  height={563}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="aspect-video w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-(--radius-card)">
                <Image
                  src={photos.workspace.src}
                  alt={photos.workspace.alt}
                  width={700}
                  height={700}
                  sizes="(max-width: 1024px) 50vw, 22vw"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-(--radius-card)">
                <Image
                  src={photos.team.src}
                  alt={photos.team.alt}
                  width={700}
                  height={700}
                  sizes="(max-width: 1024px) 50vw, 22vw"
                  className="aspect-square w-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={1} className="order-1 lg:order-2">
            <Eyebrow>Our Approach</Eyebrow>
            <h2 className="h-xl">
              We Start With Your Situation, <Muted>Not a Template.</Muted>
            </h2>
            <p className="lead mt-6 text-fg-muted">
              Two candidates with the same job title rarely need the same plan. One may
              need to rebuild how their experience is presented; another may need depth
              in a specific technology, or simply the confidence to handle a panel
              interview well.
            </p>
            <p className="mt-4 text-fg-muted">
              So we begin with an honest assessment — what you have done, what you are
              aiming for, and the distance between the two. Everything after that is
              built on what we find, and revised as you progress.
            </p>
            <CheckList
              className="mt-7"
              items={[
                "A named consultant who stays with you throughout",
                "Preparation matched to your target domain and level",
                "Written feedback you can act on, not vague encouragement",
              ]}
            />
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------- principles */}
      <Section tone="alt">
        <SectionHead
          eyebrow="What We Stand For"
          heading="Principles We Hold To."
          intro="A career decision deserves straight answers. These are the commitments we make to every candidate we work with."
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {principles.map((principle, i) => (
            <FeatureCard key={principle.title} {...principle} delay={i} />
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------------- audiences */}
      <Section tone="paper">
        <SectionHead
          eyebrow="Who We Work With"
          heading={
            <span className="max-w-[24ch]">
              Professionals at Different Points on the Same Path.
            </span>
          }
        />
        <div className="grid gap-5 md:grid-cols-3">
          {audiences.map((audience, i) => (
            <FeatureCard key={audience.title} {...audience} delay={i} tone="flat" />
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------- what we don't */}
      <Section tone="dark">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-18">
          <Reveal>
            <Eyebrow tone="dark">Clarity First</Eyebrow>
            <h2 className="h-xl">What We Do Not Do.</h2>
            <p className="lead mt-6 text-on-dark-muted">
              Being clear about our limits is part of being useful. If any of the
              following is what you are looking for, we are not the right fit — and we
              will say so early.
            </p>
          </Reveal>

          <Reveal delay={1}>
            <ul className="grid gap-3.5">
              {limits.map((limit) => (
                <li
                  key={limit}
                  className="flex items-start gap-3.5 text-[0.97rem] text-on-dark-muted"
                >
                  <CircleX
                    className="mt-0.5 size-5.25 shrink-0 text-accent"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  {limit}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <CtaBand secondary={{ href: "/how-it-works", label: "See How It Works" }} />
    </>
  );
}
