import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";

import { DomainGrid } from "@/components/site/cards";
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
import { Button } from "@/components/ui/button";
import { domains } from "@/content/domains";

export const metadata: Metadata = pageMetadata({
  title: "IT Roles We Train and Market For",
  socialTitle: "Domains",
  description:
    "Training and profile marketing for Java, Python, full-stack, data, QA, cloud and DevOps, cybersecurity, business analyst, and UI/UX roles in the US.",
  path: "/domains",
});

export default function DomainsPage() {
  return (
    <>
      <PageSchema
        name={"IT Roles We Train and Market For"}
        description={"Training and profile marketing for Java, Python, full-stack, data, QA, cloud and DevOps, cybersecurity, business analyst, and UI/UX roles in the US."}
        path={"/domains"}
        breadcrumb={"Domains"}
      />

      <PageHero
        breadcrumb="Domains"
        title="Roles We Train and Market For."
        intro="Your resume, marketing, and training are tailored to your target role. What a hiring team looks for in a data engineer is not what they look for in a Java developer — and your preparation should reflect that."
        actions={
          <HeroActions secondaryHref="/services" secondaryLabel="Explore Our Services" />
        }
      />

      <Section tone="paper">
        <SectionHead
          eyebrow="Where We Focus"
          heading="Eight Areas of Depth."
          intro="Each domain has its own tools, interview format, and evidence of competence. We train and market you for the one you are actually targeting."
        />
        <DomainGrid domains={domains} detailed />
      </Section>

      <Section tone="alt">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Tailored Preparation</Eyebrow>
            <h2 className="h-xl">The Same Process, Calibrated to Your Domain.</h2>
            <p className="lead mt-5 text-text-body">
              Domain shapes almost everything: which projects are worth building, which
              keywords matter on your resume, which interview rounds you will face, and
              what &ldquo;good&rdquo; sounds like in an answer.
            </p>
            <CheckList
              className="mt-7"
              items={[
                "Resume language drawn from real postings in your domain",
                "Real-world projects in the stack your target roles use",
                "Mock interviews that mirror the rounds you will actually face",
                "Daily applications and outreach aimed at your specialization",
              ]}
            />
            <div className="mt-8">
              <Button asChild>
                <Link href="/contact">Talk Through Your Target Role</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal>
            {/* PLACEHOLDER IMAGE */}
            <Image
              src={photos.team.src}
              alt={photos.team.alt}
              width={1200}
              height={800}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="aspect-3/2 w-full rounded-lg object-cover lg:aspect-4/3"
            />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        heading="Tell Us Where You Want to Go."
        body="Share your target domain and role during the consultation, and we will outline the preparation that fits it."
        secondary={{ href: "/services", label: "Explore Our Services" }}
      />
    </>
  );
}
