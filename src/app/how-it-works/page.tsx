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
  title: "How We Help You Land an IT Job in the USA",
  socialTitle: "How It Works",
  description:
    "A five-stage process: a free career consultation, resume and profile building, daily profile marketing, role-specific training, then interview support through to the offer.",
  path: "/how-it-works",
});

const phases = [
  {
    icon: Timer,
    title: "Opening Phase",
    description:
      "Consultation, then your resume, LinkedIn, GitHub, and portfolio are built and approved. This is where the direction is set.",
  },
  {
    icon: BarChart,
    title: "Build Phase",
    description:
      "40+ daily applications and recruiter outreach begin, while role-specific training and project work run alongside.",
  },
  {
    icon: CircleCheckBig,
    title: "Interview Phase",
    description:
      "Job-description-based mock interviews, a briefing before each round, debriefs, and support through the offer and onboarding.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageSchema
        name={"How We Help You Land an IT Job in the USA"}
        description={"A five-stage process: a free career consultation, resume and profile building, daily profile marketing, role-specific training, then interview support through to the offer."}
        path={"/how-it-works"}
        breadcrumb={"How It Works"}
      />

      <PageHero
        breadcrumb="How It Works"
        title="A Clear Path Toward Your Next Role."
        intro="From your first conversation to your offer, in five structured stages. At every point you know what is happening now, what is expected of you, and what comes next."
        actions={<HeroActions />}
      />

      <Section tone="paper">
        <SectionHead
          eyebrow="The Process"
          heading="Five Stages, One Direction."
          intro="Stages overlap in practice — training runs alongside daily marketing, and preparation sharpens as interviews are scheduled."
        />
        <StepList steps={processSteps} layout="rows" showDetails />
      </Section>

      {/* ------------------------------------------------------- expectations */}
      <Section tone="alt">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            {/* PLACEHOLDER IMAGE */}
            <Image
              src={photos.workspace.src}
              alt={photos.workspace.alt}
              width={1200}
              height={750}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="aspect-16/10 w-full rounded-lg object-cover"
            />
          </Reveal>

          <Reveal>
            <Eyebrow>Working Together</Eyebrow>
            <h2 className="h-xl">What the Engagement Asks of You.</h2>
            <p className="lead mt-5 text-text-body">
              Our side of the work is structure, preparation, and visibility. Yours is
              consistency. Candidates who make steady progress tend to share the same
              habits.
            </p>
            <CheckList
              className="mt-7"
              items={[
                "Time set aside each week for training and practice",
                "Openness about gaps — they are far easier to work on once named",
                "Prompt updates when recruiters reach out or interviews are scheduled",
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
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
          {phases.map((phase) => (
            <FeatureCard key={phase.title} {...phase} variant="plain" />
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
        heading="Begin With a Free Consultation."
        body="The first conversation is free and carries no obligation. Bring your questions — including the uncomfortable ones about whether this is worth it."
      />
    </>
  );
}
