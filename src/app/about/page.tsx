import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import {
  Briefcase,
  CalendarCheck,
  GraduationCap,
  Repeat,
  ShieldCheck,
  Target,
  Users,
  X,
} from "lucide-react";

import { FeatureCard } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { HeroActions, PageHero } from "@/components/site/page-hero";
import { PageSchema } from "@/components/site/page-schema";
import {
  CheckList,
  Eyebrow,
  Section,
  SectionHead,
} from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { photos } from "@/lib/images";

export const metadata: Metadata = pageMetadata({
  title: "About Swift Consultancy | IT Staffing & Career Consulting USA",
  absoluteTitle: true,
  socialTitle: "About Us",
  description:
    "Swift Consultancy helps technology professionals land roles in the United States through resume and profile building, daily profile marketing, role-specific training, and interview preparation.",
  path: "/about",
});

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
      "You have delivered real work, but your resume, interview preparation, or market visibility has not kept pace with your experience.",
  },
  {
    icon: Repeat,
    title: "Career Switchers",
    description:
      "You are moving into a new technology domain and need a credible story, the right skills, and preparation that closes the gap.",
  },
  {
    icon: GraduationCap,
    title: "Recent Graduates",
    description:
      "You have the degree and the drive, and now need real-world projects, a strong profile, and interview practice to land your first role.",
  },
];

const limits = [
  "We do not guarantee a specific offer, employer, salary, or joining date — the hiring decision belongs to the employer.",
  "We do not claim partnerships with or placement at named companies.",
  "We do not misrepresent your experience to any employer or recruiter.",
  "We do not provide immigration, visa, or legal advice.",
  "We do not attend interviews on a candidate's behalf, in any form.",
];

export default function AboutPage() {
  return (
    <>
      <PageSchema
        name={"About Swift Consultancy"}
        description={"Swift Consultancy helps technology professionals land roles in the United States through resume and profile building, daily profile marketing, role-specific training, and interview preparation."}
        path={"/about"}
        breadcrumb={"About Us"}
      />

      <PageHero
        breadcrumb="About Us"
        title="More Than Job Search Support — A Career Strategy Built Around You."
        intro="We work closely with every candidate to understand their experience, strengths, and target role — then build their profile, market it every day, and train them to perform in the interview. One team, one plan, from first conversation to offer."
        actions={<HeroActions />}
      />

      {/* ------------------------------------------------------- our approach */}
      <Section tone="paper">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Our Approach</Eyebrow>
            <h2 className="h-xl">We Start With Your Situation, Not a Template.</h2>
            <p className="lead mt-5 text-text-body">
              Two candidates with the same job title rarely need the same plan. One may
              need to rebuild how their experience is presented; another may need depth
              in a specific technology, or simply the confidence to handle a panel
              interview well.
            </p>
            <p className="mt-4 text-text-body">
              So we begin with an honest assessment — what you have done, what you are
              aiming for, and the distance between the two. Everything after that is
              built on what we find, and revised as you progress.
            </p>
            <CheckList
              className="mt-7"
              items={[
                "A dedicated consultant who stays with you throughout",
                "A profile, marketing plan, and training matched to your target role",
                "Weekly reports and feedback you can act on, not vague encouragement",
              ]}
            />
          </Reveal>

          <Reveal>
            {/* PLACEHOLDER IMAGE */}
            <Image
              src={photos.roadmap.src}
              alt={photos.roadmap.alt}
              width={1200}
              height={800}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="aspect-3/2 w-full rounded-lg object-cover lg:aspect-4/3"
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
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle) => (
            <FeatureCard key={principle.title} {...principle} variant="plain" />
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------------- audiences */}
      <Section tone="paper">
        <SectionHead
          eyebrow="Who We Work With"
          heading="Professionals at Different Points on the Same Path."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {audiences.map((audience) => (
            <FeatureCard key={audience.title} {...audience} />
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------- what we don't */}
      <Section tone="alt">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal>
            <Eyebrow>Clarity First</Eyebrow>
            <h2 className="h-xl">What We Do Not Do.</h2>
            <p className="lead mt-5 text-text-body">
              Being clear about our limits is part of being useful. If any of the
              following is what you are looking for, we are not the right fit — and we
              will say so early.
            </p>
          </Reveal>

          <Reveal>
            <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
              {limits.map((limit) => (
                <li key={limit} className="flex items-start gap-4 px-5 py-4 md:px-6">
                  <X
                    className="mt-1 size-4.5 shrink-0 text-text-secondary"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                  <span className="text-text-body">{limit}</span>
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
