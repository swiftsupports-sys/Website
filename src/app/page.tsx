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
  Disclaimer,
  Section,
  SectionHead,
} from "@/components/site/primitives";
import { Reveal, Stagger } from "@/components/site/reveal";
import { photos, type Photo } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { domains } from "@/content/domains";
import { faqsFor } from "@/content/faq";
import { packages, pricingDisclaimer, type Package } from "@/content/packages";
import { processSteps } from "@/content/process";
import { services } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import { JsonLd, faqJsonLd } from "@/lib/structured-data";
import {
  ArrowRight,
  FileText,
  GraduationCap,
  Mic,
  Send,
} from "lucide-react";

/**
 * Where a job search stalls, and what we do about each. This is how the free
 * consultation actually triages a candidate, so the home page leads with it
 * rather than with a general description of the company. Package names and
 * prices come from content/packages, so they cannot drift from the pricing.
 */
const situations: {
  stage: string;
  title: string;
  body: string;
  photo: Photo;
  href: string;
  plan: Package["id"];
}[] = [
  {
    stage: "No interview calls",
    title: "Your profile isn't reaching the right recruiters.",
    body: "We rebuild your resume, LinkedIn, and GitHub around your target role, then send 40+ targeted applications every working day and reach out to recruiters hiring in your domain.",
    photo: photos.resumeReview,
    href: "/services/candidate-marketing",
    plan: "marketing",
  },
  {
    stage: "Interviews, but no offers",
    title: "Your interviews aren't showing what you can do.",
    body: "Role-specific technical and behavioral training, mock interviews built from the real job description, and a briefing before every round with a debrief after it.",
    photo: photos.interviewPreparation,
    href: "/services/interview-preparation",
    plan: "training",
  },
  {
    stage: "Both — or starting fresh",
    title: "You want the whole search handled, end to end.",
    body: "Profile marketing and training together, coordinated by one dedicated consultant, with weekly strategy reviews from first application to offer stage.",
    photo: photos.trainingMentorship,
    href: "/pricing",
    plan: "complete",
  },
];

const packageById = (id: Package["id"]) => {
  const plan = packages.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown package: ${id}`);
  return plan;
};

const pillars = [
  {
    icon: FileText,
    title: "Profile Building",
    description:
      "An ATS-friendly resume, an optimized LinkedIn and GitHub, real-world projects, and a personal portfolio website.",
  },
  {
    icon: Send,
    title: "Profile Marketing",
    description:
      "40+ targeted applications every working day, plus direct outreach to recruiters hiring in your domain.",
  },
  {
    icon: GraduationCap,
    title: "Role-Specific Training",
    description:
      "Hands-on technical and behavioral training focused on exactly what your target role assesses.",
  },
  {
    icon: Mic,
    title: "Interview Support",
    description:
      "Mock interviews, job-description-based practice, and a briefing before every round — through to the offer.",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <EmployerStrip />

      {/* ------------------------------------------------- where we come in */}
      <Section tone="paper" id="about">
        <SectionHead
          eyebrow="Where We Come In"
          heading="Most US job searches stall in one of two places."
          intro="Either the applications go out and nothing comes back, or the interviews come and the offers don't. Your free consultation works out which one is holding you back — then a consultant works on exactly that, every working day."
        />

        <Stagger className="grid gap-6 md:grid-cols-3">
          {situations.map((situation) => {
            const plan = packageById(situation.plan);
            return (
              <Link
                key={situation.plan}
                href={situation.href}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-[border-color,box-shadow,transform] duration-300 ease-out-soft hover:-translate-y-1 hover:border-brand-blue-border hover:shadow-lift"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-muted">
                  <Image
                    src={situation.photo.src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
                    style={
                      situation.photo.position
                        ? { objectPosition: situation.photo.position }
                        : undefined
                    }
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-wide text-brand-blue uppercase">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-blue" />
                    {situation.stage}
                  </p>
                  <h3 className="h-md mt-3 transition-colors duration-200 group-hover:text-brand-blue">
                    {situation.title}
                  </h3>
                  <p className="mt-3 flex-1 text-text-body">{situation.body}</p>
                  <span className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-4 font-semibold text-brand-navy">
                    <span>
                      {plan.name}
                      <span className="font-medium text-text-secondary"> · {plan.price}</span>
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 text-brand-blue transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </Stagger>

        <Reveal className="mt-8 flex flex-col gap-5 rounded-lg border border-border bg-background p-6 md:mt-10 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="text-text-body">
            <strong className="font-semibold text-brand-navy">
              Not sure which one describes you?
            </strong>{" "}
            That is exactly what the free consultation is for.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button asChild>
              <Link href="/contact">Book a Free Consultation</Link>
            </Button>
            <ArrowLink href="/about">More about us</ArrowLink>
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------ why choose us */}
      <Section tone="alt" id="why">
        <SectionHead
          eyebrow="Why Choose Us"
          heading="Everything You Need to Prepare, Position, and Progress."
          intro="Four pillars that work together — a profile that gets noticed, marketing that gets it seen, and preparation that turns interviews into offers."
        />
        <Stagger className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <FeatureCard key={pillar.title} {...pillar} variant="plain" />
          ))}
        </Stagger>
      </Section>

      {/* -------------------------------------------------------- how it works */}
      <Section tone="paper" id="how-it-works">
        <SectionHead
          eyebrow="How It Works"
          heading="A Clear Path Toward Your Next Role."
          intro="Five structured stages, from your first conversation to your offer. You always know what is happening now, and what comes next."
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
          heading="Roles We Train and Market For."
          intro="From Java and Python developers to data, cloud, and QA roles — your resume, marketing, and training are tailored to the domain you are targeting."
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
          intro="Fifteen services across profile marketing, training, and mentorship — delivered one-to-one and grouped into three simple packages."
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
          intro="Get noticed, get prepared, or get both. Three straightforward packages, with every term confirmed in writing before you commit."
        />
        <Stagger className="grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((plan) => (
            <PriceCard key={plan.id} plan={plan} />
          ))}
        </Stagger>
        <Disclaimer>{pricingDisclaimer}</Disclaimer>
      </Section>

      {/* ---------------------------------------------------- success stories */}
      <Section tone="paper" id="success-stories">
        <SectionHead
          eyebrow="Success Stories"
          heading="Career Progress Starts With the Right Support."
          intro="Candidate experiences, in their own words — published anonymously by technology domain."
        />
        <Stagger className="grid gap-6 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, i) => (
            <QuoteCard key={i} testimonial={testimonial} />
          ))}
        </Stagger>
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
