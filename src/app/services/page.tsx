import type { Metadata } from "next";
import Link from "next/link";

import { FeatureCard } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { HeroActions, PageHero } from "@/components/site/page-hero";
import { Disclaimer, Section, SectionHead } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { serviceGroups, servicesByGroup } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Career assessment, resume and LinkedIn optimization, candidate marketing, recruiter networking, domain training, interview preparation, and one-to-one mentorship.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Services"
        eyebrow="Our Services"
        title={
          <>
            Career Services Designed{" "}
            <span className="text-accent">Around Your Goals.</span>
          </>
        }
        intro="Fifteen services across positioning, preparation, and mentorship. Engage the full journey, or concentrate on the areas where you need the most support — every service is delivered one-to-one."
        actions={<HeroActions secondaryHref="/pricing" secondaryLabel="View Packages" />}
      />

      {serviceGroups.map((group, groupIndex) => {
        const items = servicesByGroup(group.id);
        const tone = groupIndex === 1 ? "alt" : "paper";

        return (
          <Section key={group.id} tone={tone}>
            <SectionHead
              eyebrow={group.eyebrow}
              heading={group.heading}
              intro={group.intro}
            />
            <div
              className={
                items.length === 3
                  ? "grid gap-5 md:grid-cols-3"
                  : "grid gap-5 md:grid-cols-2"
              }
            >
              {items.map((service, i) => (
                <FeatureCard
                  key={service.n}
                  icon={service.icon}
                  title={service.title}
                  description={service.long}
                  delay={i % 4}
                />
              ))}
            </div>

            {groupIndex === serviceGroups.length - 1 ? (
              <>
                <Disclaimer>
                  All services are advisory and preparatory. We do not guarantee
                  interviews, offers, salaries, or placement at any specific company,
                  and we do not provide immigration or legal advice.
                </Disclaimer>
                <div className="mt-10">
                  <Button asChild variant="dark">
                    <Link href="/pricing">Review Packages</Link>
                  </Button>
                </div>
              </>
            ) : null}
          </Section>
        );
      })}

      <CtaBand
        heading="Not Sure Which Services You Need?"
        body="That is what the consultation is for. Tell us where you are and we will recommend the shortest sensible path — even if that means fewer services, not more."
        secondary={{ href: "/how-it-works", label: "See How It Works" }}
      />
    </>
  );
}
