import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

import { FeatureCard } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { HeroActions, PageHero } from "@/components/site/page-hero";
import { PageSchema } from "@/components/site/page-schema";
import { Disclaimer, Section, SectionHead } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { servicePages } from "@/content/service-pages";
import { serviceGroups, servicesByGroup } from "@/content/services";

export const metadata: Metadata = pageMetadata({
  title: "Career Services for Technology Professionals",
  socialTitle: "Services",
  description:
    "Fifteen one-to-one services across candidate marketing, recruiter networking, resume and LinkedIn optimization, domain training, interview preparation, and mentorship.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageSchema
        name={"Career Services for Technology Professionals"}
        description={"Fifteen one-to-one services across candidate marketing, recruiter networking, resume and LinkedIn optimization, domain training, interview preparation, and mentorship."}
        path={"/services"}
        breadcrumb={"Services"}
      />

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

      {/*
        Hub links to the four dedicated service pages. This is the main internal
        path into them, so the anchors carry the service name rather than
        "learn more" — both for readers and for the link context search engines
        use to work out what each page is about.
      */}
      <Section tone="paper">
        <SectionHead
          eyebrow="Explore in Detail"
          heading="Four areas, explained in full."
          intro="Every service below belongs to one of these. Each page covers what it includes, how it runs, who it suits, and the questions candidates ask most."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {servicePages.map((page, i) => (
            <Reveal key={page.slug} delay={i} className="h-full">
              <Link
                href={`/services/${page.slug}`}
                className="group block h-full rounded-(--radius-card) border border-hair bg-white p-7 transition-[transform,box-shadow] duration-400 ease-brand hover:-translate-y-1.5 hover:shadow-card md:p-9"
              >
                <h3 className="h-md">{page.metaTitle}</h3>
                <p className="mt-3 text-[0.95rem] text-fg-muted">
                  {page.metaDescription}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-display text-[0.93rem] font-bold">
                  {page.navLabel} in detail
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

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
                  Your engagement includes dedicated interview opportunities, candidate
                  marketing, and recruiter networking. We cannot guarantee a specific
                  offer, employer, salary, or joining date — the hiring decision belongs
                  to the employer — and we do not provide immigration or legal advice.
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
