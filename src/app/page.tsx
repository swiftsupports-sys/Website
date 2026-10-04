import Image from "next/image";
import Link from "next/link";

import {
  DomainGrid,
  FeatureCard,
  PriceCard,
  QuoteCard,
  ServiceRows,
  StepList,
} from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { EmployerStrip } from "@/components/site/employer-strip";
import { FaqList } from "@/components/site/faq-list";
import { HomeHero } from "@/components/site/home-hero";
import {
  ArrowLink,
  CheckList,
  Disclaimer,
  Eyebrow,
  Section,
  SectionHead,
} from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { photos } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { domains } from "@/content/domains";
import { faqsFor } from "@/content/faq";
import { packages, pricingDisclaimer } from "@/content/packages";
import { processSteps } from "@/content/process";
import { services } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import { JsonLd, faqJsonLd } from "@/lib/structured-data";
import {
  GraduationCap,
  Mic,
  Network,
  Send,
} from "lucide-react";

const pillars = [
  {
    icon: Send,
    title: "Candidate Marketing",
    description:
      "Professionally position your experience, skills, resume, and LinkedIn presence for relevant technology opportunities.",
  },
  {
    icon: Network,
    title: "Recruiter Networking",
    description:
      "Leverage targeted outreach and recruiter networking to increase visibility with relevant hiring channels.",
  },
  {
    icon: Mic,
    title: "Interview Preparation",
    description:
      "Prepare for technical, behavioral, HR, and managerial interviews through guided practice and detailed feedback.",
  },
  {
    icon: GraduationCap,
    title: "Training & Mentorship",
    description:
      "Strengthen domain knowledge, practical skills, communication, and career decision-making with personalized support.",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <EmployerStrip />

      {/* ------------------------------------------------------------ about */}
      <Section tone="paper" id="about">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>About Us</Eyebrow>
            <h2 className="h-xl">
              More Than Job Search Support — A Career Strategy Built Around You.
            </h2>
            <p className="lead mt-5 text-text-body">
              We work closely with candidates to understand their experience,
              strengths, career goals, and target roles. From professional branding
              and role-specific preparation to recruiter networking and interview
              support, our process is designed to help candidates present themselves
              with confidence in the US technology job market.
            </p>
            <CheckList
              className="mt-7"
              items={[
                "A strategy shaped by your experience level and target role",
                "Preparation aligned to how US technology teams actually hire",
                "Committed interview opportunities and recruiter networking, worked continuously",
              ]}
            />
            <div className="mt-8">
              <Button asChild variant="secondary">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal>
            <figure>
              {/* PLACEHOLDER IMAGE */}
              <Image
                src={photos.mentorship.src}
                alt={photos.mentorship.alt}
                width={1000}
                height={1250}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="aspect-4/5 w-full rounded-lg object-cover sm:aspect-4/3 lg:aspect-1/1"
              />
              <figcaption className="mt-5 border-l-2 border-brand-blue pl-4">
                <strong className="block font-semibold text-brand-navy">
                  1:1 Mentorship
                </strong>
                <span className="mt-1 block text-[0.9375rem] text-text-body">
                  Every engagement is led by a consultant who knows your goals and your
                  target domain.
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------ why choose us */}
      <Section tone="alt" id="why">
        <SectionHead
          eyebrow="Why Choose Us"
          heading="Everything You Need to Prepare, Position, and Progress."
          intro="Four pillars that work together — so your profile, your preparation, and your visibility all point in the same direction."
        />
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <FeatureCard key={pillar.title} {...pillar} variant="plain" />
          ))}
        </div>
      </Section>

      {/* -------------------------------------------------------- how it works */}
      <Section tone="paper" id="how-it-works">
        <SectionHead
          eyebrow="How It Works"
          heading="A Clear Path Toward Your Next Role."
          intro="Five structured stages. You always know what is happening now, and what comes next."
        />
        <StepList steps={processSteps} />
        <Reveal className="mt-12">
          <Button asChild>
            <Link href="/how-it-works">See the Full Process</Link>
          </Button>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------ domains */}
      <Section tone="alt" id="domains">
        <SectionHead
          eyebrow="Technology Domains"
          heading="Support Across High-Demand Technology Domains."
          intro="Your career strategy, preparation, and guidance are tailored to the expectations of your target domain."
        />
        <DomainGrid domains={domains} />
        <Reveal className="mt-8">
          <ArrowLink href="/domains">Explore all domains</ArrowLink>
        </Reveal>
      </Section>

      {/* ----------------------------------------------------------- services */}
      <Section tone="paper" id="services">
        <SectionHead
          eyebrow="Our Services"
          heading="Career Services Designed Around Your Goals."
          intro="Engage the full journey, or focus on the areas where you need the most support. Every service is delivered one-to-one."
        />
        <ServiceRows services={services} />
        <Reveal className="mt-10">
          <Button asChild variant="secondary">
            <Link href="/services">Explore Our Services</Link>
          </Button>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------ pricing */}
      <Section tone="alt" id="pricing">
        <SectionHead
          eyebrow="Pricing"
          heading="Choose the Support Model That Works for You."
          intro="Two straightforward engagement models. Scope, timelines, and terms are discussed openly before you commit."
        />
        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {packages.map((plan) => (
            <PriceCard key={plan.id} plan={plan} />
          ))}
        </div>
        <Disclaimer>{pricingDisclaimer}</Disclaimer>
      </Section>

      {/* ---------------------------------------------------- success stories */}
      <Section tone="paper" id="success-stories">
        <SectionHead
          eyebrow="Success Stories"
          heading="Career Progress Starts With the Right Support."
          intro="Candidate experiences, in their own words — published anonymously by technology domain."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, i) => (
            <QuoteCard key={i} testimonial={testimonial} />
          ))}
        </div>
        <Reveal className="mt-10">
          <Button asChild>
            <Link href="/contact">Start Your Career Conversation</Link>
          </Button>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- faq */}
      <Section tone="alt" id="faq">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <SectionHead
            className="mb-0"
            eyebrow="FAQ"
            heading="Questions, Answered Plainly."
            intro="If something is not covered here, ask during your consultation — we would rather over-explain than over-promise."
          />
          <Reveal>
            <FaqList items={faqsFor("general")} />
          </Reveal>
        </div>
      </Section>

      <CtaBand />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
