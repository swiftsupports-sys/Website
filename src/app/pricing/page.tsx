import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { FileText, ShieldCheck, Users } from "lucide-react";

import { FeatureCard, PriceCard } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { FaqList } from "@/components/site/faq-list";
import { HeroActions, PageHero } from "@/components/site/page-hero";
import { PageSchema } from "@/components/site/page-schema";
import { Disclaimer, Section, SectionHead } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { faqsFor } from "@/content/faq";
import { packages, pricingDisclaimer } from "@/content/packages";

export const metadata: Metadata = pageMetadata({
  title: "Pricing and Support Packages",
  socialTitle: "Pricing",
  description:
    "Two transparent engagement models for candidates pursuing technology roles in the US. Scope, fees, and any later charges are explained before you commit and confirmed in writing.",
  path: "/pricing",
});

const shared = [
  {
    icon: Users,
    title: "A Named Consultant",
    description:
      "You work one-to-one with someone who knows your background, in both packages. Nothing is delegated to a queue.",
  },
  {
    icon: FileText,
    title: "Written Scope",
    description:
      "What is included, what is not, and any charges that apply later are set out in your service agreement before you pay anything.",
  },
  {
    icon: ShieldCheck,
    title: "No Outcome Promises",
    description:
      "Neither package guarantees interviews, offers, salaries, or placement at any company. Both are paid for the work and the guidance.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageSchema
        name={"Pricing and Support Packages"}
        description={"Two transparent engagement models for candidates pursuing technology roles in the US. Scope, fees, and any later charges are explained before you commit and confirmed in writing."}
        path={"/pricing"}
        breadcrumb={"Pricing"}
      />

      <PageHero
        breadcrumb="Pricing"
        eyebrow="Pricing"
        title={
          <>
            Choose the Support Model{" "}
            <span className="text-accent">That Works for You.</span>
          </>
        }
        intro="Two engagement models, stated plainly. Scope, timelines, inclusions, and any charges that apply later are explained before you commit and confirmed in writing."
        actions={
          <HeroActions secondaryHref="/services" secondaryLabel="See What's Included" />
        }
      />

      <Section tone="paper">
        <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-7.5">
          {packages.map((plan, i) => (
            <PriceCard key={plan.id} plan={plan} delay={i} />
          ))}
        </div>
        <Disclaimer>{pricingDisclaimer}</Disclaimer>
      </Section>

      <Section tone="alt">
        <SectionHead
          eyebrow="Before You Decide"
          heading="What Both Packages Have in Common."
          intro="Whichever model you choose, the standard of support and the honesty of the guidance do not change."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {shared.map((item, i) => (
            <FeatureCard key={item.title} {...item} delay={i} />
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <SectionHead
          eyebrow="Pricing Questions"
          heading="The Details People Ask About."
          intro="Anything not covered here will be answered directly during your consultation, before any commitment."
        />
        <Reveal>
          <FaqList items={faqsFor("pricing")} />
        </Reveal>
      </Section>

      <CtaBand
        tone="alt"
        heading="Talk It Through Before You Commit."
        body="The consultation is free, and it is the right place to ask about scope, terms, and whether either package makes sense for your situation."
        secondary={{ href: "/service-agreement", label: "Read the Service Agreement" }}
      />
    </>
  );
}
