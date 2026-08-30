import Image from "next/image";
import Link from "next/link";

import {
  DomainCard,
  FeatureCard,
  PriceCard,
  QuoteCard,
  ServiceRows,
  StepList,
} from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { FaqList } from "@/components/site/faq-list";
import { HomeHero } from "@/components/site/home-hero";
import {
  ArrowLink,
  CheckList,
  Disclaimer,
  Muted,
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

      {/* ------------------------------------------------------------ about */}
      <Section tone="paper" id="about">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-18">
          <Reveal>
            <p className="mb-5.5 inline-flex items-center gap-2.5 font-display text-[0.72rem] font-bold tracking-[0.16em] text-fg-muted uppercase">
              <span
                aria-hidden="true"
                className="size-2.25 rounded-[3px] bg-accent ring-4 ring-accent/20"
              />
              About Us
            </p>
            <h2 className="h-xl">
              More Than Job Search Support —{" "}
              <Muted>A Career Strategy Built Around You.</Muted>
            </h2>
            <p className="lead mt-6.5 text-fg-muted">
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
                "Honest guidance — no guarantees, no inflated promises",
              ]}
            />
            <div className="mt-8.5">
              <Button asChild variant="dark">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={2} className="relative">
            <div className="overflow-hidden rounded-(--radius-card) bg-paper-alt">
              {/* PLACEHOLDER IMAGE */}
              <Image
                src={photos.mentorship.src}
                alt={photos.mentorship.alt}
                width={1000}
                height={1250}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="aspect-4/5 w-full object-cover transition-transform duration-1000 ease-brand hover:scale-105"
              />
            </div>
            <div className="mt-4 max-w-62.5 rounded-2xl bg-ink p-6 text-white shadow-float lg:absolute lg:-right-3.5 lg:-bottom-4.5 lg:mt-0">
              <strong className="block font-display text-[1.6rem] leading-tight tracking-[-0.03em]">
                1:1 Mentorship
              </strong>
              <span className="mt-2 block text-[0.83rem] leading-snug text-on-dark-muted">
                Every engagement is led by a consultant who knows your goals and your
                target domain.
              </span>
            </div>
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
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, i) => (
            <FeatureCard key={pillar.title} {...pillar} delay={i} />
          ))}
        </div>
      </Section>

      {/* -------------------------------------------------------- how it works */}
      <Section tone="dark" id="how-it-works">
        <SectionHead
          tone="dark"
          eyebrow="How It Works"
          heading="A Clear Path Toward Your Next Role."
          intro="Five structured stages. You always know what is happening now, and what comes next."
        />
        <StepList steps={processSteps} tone="dark" />
        <Reveal className="mt-9.5">
          <Button asChild>
            <Link href="/how-it-works">See the Full Process</Link>
          </Button>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------ domains */}
      <Section tone="paper" id="domains">
        <SectionHead
          eyebrow="Technology Domains"
          heading="Support Across High-Demand Technology Domains."
          intro="Your career strategy, preparation, and guidance are tailored to the expectations of your target domain."
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {domains.map((domain, i) => (
            <DomainCard key={domain.title} domain={domain} delay={i % 4} />
          ))}
        </div>
        <Reveal className="mt-9.5">
          <ArrowLink href="/domains">Explore all domains</ArrowLink>
        </Reveal>
      </Section>

      {/* ----------------------------------------------------------- services */}
      <Section tone="alt" id="services">
        <SectionHead
          eyebrow="Our Services"
          heading="Career Services Designed Around Your Goals."
          intro="Engage the full journey, or focus on the areas where you need the most support. Every service is delivered one-to-one."
        />
        <ServiceRows services={services} />
        <Reveal className="mt-10">
          <Button asChild variant="dark">
            <Link href="/services">Explore Our Services</Link>
          </Button>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------ pricing */}
      <Section tone="paper" id="pricing">
        <SectionHead
          eyebrow="Pricing"
          heading="Choose the Support Model That Works for You."
          intro="Two straightforward engagement models. Scope, timelines, and terms are discussed openly before you commit."
        />
        <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-7.5">
          {packages.map((plan, i) => (
            <PriceCard key={plan.id} plan={plan} delay={i} />
          ))}
        </div>
        <Disclaimer>{pricingDisclaimer}</Disclaimer>
      </Section>

      {/* ---------------------------------------------------- success stories */}
      <Section tone="alt" id="success-stories">
        <SectionHead
          eyebrow="Success Stories"
          heading="Career Progress Starts With the Right Support."
          intro="Candidate experiences, in their own words — published anonymously by technology domain."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, i) => (
            <QuoteCard key={i} testimonial={testimonial} delay={i} />
          ))}
        </div>
        <Reveal className="mt-10">
          <Button asChild variant="dark">
            <Link href="/contact">Start Your Career Conversation</Link>
          </Button>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- faq */}
      <Section tone="paper" id="faq">
        <SectionHead
          eyebrow="FAQ"
          heading="Questions, Answered Plainly."
          intro="If something is not covered here, ask during your consultation — we would rather over-explain than over-promise."
        />
        <Reveal>
          <FaqList items={faqsFor("general")} />
        </Reveal>
      </Section>

      <CtaBand />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
