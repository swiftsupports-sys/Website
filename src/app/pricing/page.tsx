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
  title: "Pricing — IT Job Support Packages from $1K",
  socialTitle: "Pricing",
  description:
    "Three transparent packages for candidates pursuing technology roles in the US: profile marketing, training and support, or both together. Scope and fees are explained before you commit and confirmed in writing.",
  path: "/pricing",
});

const shared = [
  {
    icon: Users,
    title: "A Named Consultant",
    description:
      "You work one-to-one with someone who knows your background, in every package. Nothing is delegated to a queue.",
  },
  {
    icon: FileText,
    title: "Written Scope",
    description:
      "What is included, what is not, and every fee is set out in your service agreement before you pay anything.",
  },
  {
    icon: ShieldCheck,
    title: "Honest About the Limits",
    description:
      "Every package is built to improve your chances. None can guarantee a specific offer, employer, salary, or joining date — that decision belongs to the employer.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageSchema
        name={"Pricing — IT Job Support Packages from $1K"}
        description={"Three transparent packages for candidates pursuing technology roles in the US: profile marketing, training and support, or both together. Scope and fees are explained before you commit and confirmed in writing."}
        path={"/pricing"}
        breadcrumb={"Pricing"}
      />

      <PageHero
        breadcrumb="Pricing"
        title="Choose the Support Model That Works for You."
        intro="Three packages, stated plainly. Scope, timelines, inclusions, and fees are explained before you commit and confirmed in writing."
        actions={
          <HeroActions secondaryHref="/services" secondaryLabel="See What's Included" />
        }
      />

      <Section tone="paper">
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((plan) => (
            <PriceCard key={plan.id} plan={plan} />
          ))}
        </div>
        <div>
          <Disclaimer>{pricingDisclaimer}</Disclaimer>
        </div>
      </Section>

      <Section tone="alt">
        <SectionHead
          eyebrow="Before You Decide"
          heading="What Every Package Includes."
          intro="Whichever model you choose, the standard of support and the honesty of the guidance do not change."
        />
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
          {shared.map((item) => (
            <FeatureCard key={item.title} {...item} variant="plain" />
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <SectionHead
            className="mb-0"
            eyebrow="Pricing Questions"
            heading="The Details People Ask About."
            intro="Anything not covered here will be answered directly during your consultation, before any commitment."
          />
          <Reveal>
            <FaqList items={faqsFor("pricing")} />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        heading="Talk It Through Before You Commit."
        body="The consultation is free, and it is the right place to ask about scope, terms, and which package makes sense for your situation."
        secondary={{ href: "/service-agreement", label: "Read the Service Agreement" }}
      />
    </>
  );
}
