import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { BarChart, CircleCheckBig, Timer } from "lucide-react";

import { FeatureCard, StepList } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { HeroActions, PageHero } from "@/components/site/page-hero";
import { PageSchema } from "@/components/site/page-schema";
import {
  CheckList,
  Disclaimer,
  Eyebrow,
  Section,
  SectionHead,
} from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { photos } from "@/lib/images";
import { processSteps } from "@/content/process";

export const metadata: Metadata = pageMetadata({
  title: "How Our Career Consulting Process Works",
  socialTitle: "How It Works",
  description:
    "A five-stage process: career assessment, a personalized roadmap, role-specific training, candidate marketing and recruiter networking, then interview and placement guidance.",
  path: "/how-it-works",
});

const phases = [
  {
    icon: Timer,
    title: "Opening Phase",
    description:
      "Assessment, roadmap, and the first pass at your resume, profile, and positioning. This is where the direction is set.",
  },
  {
    icon: BarChart,
    title: "Build Phase",
    description:
      "Training, project work, and preparation run alongside candidate marketing and recruiter networking.",
  },
  {
    icon: CircleCheckBig,
    title: "Interview Phase",
    description:
      "Mock interviews, round-specific preparation, debriefs, and support through offer conversations and onboarding.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageSchema
        name={"How Our Career Consulting Process Works"}
        description={"A five-stage process: career assessment, a personalized roadmap, role-specific training, candidate marketing and recruiter networking, then interview and placement guidance."}
        path={"/how-it-works"}
        breadcrumb={"How It Works"}
      />

      <PageHero
        breadcrumb="How It Works"
        eyebrow="How It Works"
        title={
          <>
            A Clear Path Toward <span className="text-accent">Your Next Role.</span>
          </>
        }
        intro="Five structured stages, run in sequence but revisited whenever your situation changes. At every point you know what is happening now, what is expected of you, and what comes next."
        actions={<HeroActions />}
      />

      <Section tone="paper">
        <SectionHead
          eyebrow="The Process"
          heading="Five Stages, One Direction."
          intro="Stages overlap in practice — training continues while marketing begins, and preparation sharpens as interviews approach."
        />
        <StepList steps={processSteps} showDetails />
      </Section>

      {/* ------------------------------------------------------- expectations */}
      <Section tone="dark">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-18">
          <Reveal>
            <div className="overflow-hidden rounded-(--radius-card)">
              {/* PLACEHOLDER IMAGE */}
              <Image
                src={photos.workspace.src}
                alt={photos.workspace.alt}
                width={1200}
                height={750}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="aspect-16/10 w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={1}>
            <Eyebrow tone="dark">Working Together</Eyebrow>
            <h2 className="h-xl">What the Engagement Asks of You.</h2>
            <p className="lead mt-6 text-on-dark-muted">
              Our side of the work is structure, preparation, and visibility. Yours is
              consistency. Candidates who make steady progress tend to share the same
              habits.
            </p>
            <CheckList
              tone="dark"
              className="mt-7"
              items={[
                "Time set aside each week for preparation and practice",
                "Openness about gaps — they are far easier to work on once named",
                "Prompt updates when interviews are scheduled or feedback arrives",
                "Patience with a market that moves at its own pace",
              ]}
            />
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------------ timeline */}
      <Section tone="paper">
        <SectionHead
          eyebrow="Rhythm"
          heading="How an Engagement Usually Unfolds."
          intro="Every journey differs. The pattern below is indicative only — your consultant will set a realistic rhythm during the assessment, based on your availability and target role."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {phases.map((phase, i) => (
            <FeatureCard key={phase.title} {...phase} delay={i} tone="flat" />
          ))}
        </div>
        <Disclaimer>
          Timelines depend on your background, target role, preparation time, and hiring
          conditions. We do not promise a placement date, an interview volume, or an
          outcome.
        </Disclaimer>
      </Section>

      <CtaBand
        eyebrow="Step One"
        heading="Begin With the Career Assessment."
        body="The first conversation is free and carries no obligation. Bring your questions — including the uncomfortable ones about whether this is worth it."
      />
    </>
  );
}
