import type { Metadata } from "next";
import { CircleX, FileCheck, Info } from "lucide-react";

import { FeatureCard, QuoteCard } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { HeroActions, PageHero } from "@/components/site/page-hero";
import { Disclaimer, Section, SectionHead } from "@/components/site/primitives";
import { testimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "Candidate experiences working with our career consultants. Published only with written consent — no employer names, salary figures, or invented outcomes.",
  alternates: { canonical: "/success-stories" },
};

const standards = [
  {
    icon: FileCheck,
    title: "Written Consent",
    description:
      "Nothing is published without the candidate's explicit permission, including how their name and domain appear.",
  },
  {
    icon: CircleX,
    title: "No Invented Claims",
    description:
      "We do not fabricate quotes, add employer names, invent salary figures, or edit a testimonial into something the candidate did not say.",
  },
  {
    icon: Info,
    title: "Context Included",
    description:
      "Experiences describe the support received, not guaranteed results. What worked for one candidate may not apply to another.",
  },
];

export default function SuccessStoriesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Success Stories"
        eyebrow="Success Stories"
        title={
          <>
            Career Progress Starts With{" "}
            <span className="text-accent">the Right Support.</span>
          </>
        }
        intro="Candidate experiences, in their own words. Published anonymously by technology domain, and shared with permission."
        actions={
          <HeroActions secondaryHref="/how-it-works" secondaryLabel="See How It Works" />
        }
      />

      <Section tone="paper">
        <SectionHead
          eyebrow="In Their Words"
          heading="Candidate Experiences."
          intro="We publish testimonials only with written consent, and we do not attribute outcomes to named employers or quote salary figures."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <QuoteCard key={i} testimonial={testimonial} delay={i % 3} />
          ))}
        </div>
        <Disclaimer>
          Feedback is shared with permission and published anonymously by technology
          domain. Individual experiences vary, and one candidate&apos;s experience does
          not indicate what any future candidate will achieve. We do not guarantee
          interviews, offers, salaries, or placement at any company.
        </Disclaimer>
      </Section>

      <Section tone="dark">
        <SectionHead
          tone="dark"
          eyebrow="Our Standard"
          heading="How We Handle Testimonials."
          intro="Reviews are only useful if they are real. These are the rules we hold ourselves to on this page."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {standards.map((standard, i) => (
            <FeatureCard key={standard.title} {...standard} delay={i} tone="dark" />
          ))}
        </div>
      </Section>

      <CtaBand
        tone="paper"
        heading="Start Your Career Conversation."
        body="Bring your questions and your goals. We will tell you honestly whether we can help, and what that would involve."
      />
    </>
  );
}
