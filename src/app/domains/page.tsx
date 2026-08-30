import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { DomainCard } from "@/components/site/cards";
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
import { Button } from "@/components/ui/button";
import { domains } from "@/content/domains";

export const metadata: Metadata = {
  title: "Technology Domains",
  description:
    "Support across software development, QA and automation, data analytics and engineering, cloud and DevOps, cybersecurity, business analysis, and UI/UX and product roles.",
  alternates: { canonical: "/domains" },
};

export default function DomainsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Domains"
        eyebrow="Technology Domains"
        title={
          <>
            Support Across{" "}
            <span className="text-accent">High-Demand Technology Domains.</span>
          </>
        }
        intro="Your career strategy, preparation, and guidance are tailored to the expectations of your target domain. What a hiring team looks for in a data engineer is not what they look for in a security analyst — and your preparation should reflect that."
        actions={
          <HeroActions secondaryHref="/services" secondaryLabel="Explore Our Services" />
        }
      />

      <Section tone="paper">
        <SectionHead
          eyebrow="Where We Focus"
          heading="Eight Areas of Depth."
          intro="Each domain has its own vocabulary, interview format, and evidence of competence. We prepare you for the one you are actually targeting."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {domains.map((domain, i) => (
            <DomainCard key={domain.title} domain={domain} delay={i % 4} detailed />
          ))}
        </div>
      </Section>

      <Section tone="alt">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-18">
          <Reveal>
            <Eyebrow>Tailored Preparation</Eyebrow>
            <h2 className="h-xl">
              The Same Process, <Muted>Calibrated to Your Domain.</Muted>
            </h2>
            <p className="lead mt-6 text-fg-muted">
              Domain shapes almost everything: which projects are worth building, which
              keywords matter on your resume, which interview rounds you will face, and
              what &ldquo;good&rdquo; sounds like in an answer.
            </p>
            <CheckList
              className="mt-7"
              items={[
                "Resume language drawn from real postings in your domain",
                "Mock interviews that mirror the rounds you will actually face",
                "Project guidance that produces evidence, not filler",
                "Outreach aimed at recruiters hiring for your specialization",
              ]}
            />
            <div className="mt-8.5">
              <Button asChild variant="dark">
                <Link href="/contact">Talk Through Your Target Role</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="overflow-hidden rounded-(--radius-card)">
              {/* PLACEHOLDER IMAGE */}
              <Image
                src={photos.team.src}
                alt={photos.team.alt}
                width={1000}
                height={1250}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="aspect-4/5 w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        tone="paper"
        heading="Tell Us Where You Want to Go."
        body="Share your target domain and role during the consultation, and we will outline the preparation that fits it."
        secondary={{ href: "/services", label: "Explore Our Services" }}
      />
    </>
  );
}
