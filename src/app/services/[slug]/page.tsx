import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { CtaBand } from "@/components/site/cta-band";
import { FaqList } from "@/components/site/faq-list";
import { FeatureCard, LinkCard } from "@/components/site/cards";
import { PageHero } from "@/components/site/page-hero";
import { ArrowLink, Section, SectionHead } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { servicePageBySlug, servicePages } from "@/content/service-pages";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { JsonLd, webPageJsonLd } from "@/lib/structured-data";

/** Static params: four known pages, prerendered at build time. */
export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

/** Anything outside the four known slugs 404s rather than rendering empty. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePageBySlug(slug);
  if (!page) return {};

  return pageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/services/${page.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = servicePageBySlug(slug);
  if (!page) notFound();

  const path = `/services/${page.slug}`;
  const related = page.related
    .map((s) => servicePageBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            name: page.metaTitle,
            description: page.metaDescription,
            path,
          }),
          serviceJsonLd({
            name: page.metaTitle,
            description: page.metaDescription,
            path,
            serviceType: page.serviceType,
          }),
          breadcrumbJsonLd([
            { name: "Services", path: "/services" },
            { name: page.navLabel, path },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]}
      />

      <PageHero
        breadcrumb={page.navLabel}
        eyebrow={page.eyebrow !== page.navLabel ? page.eyebrow : undefined}
        title={`${page.h1.lead} ${page.h1.accent}`}
        intro={page.intro[0]}
        actions={
          <>
            <Button asChild>
              <Link href="/contact">Book a Free Consultation</Link>
            </Button>
            <Button asChild variant="secondaryDark">
              <Link href="/services">See all services</Link>
            </Button>
          </>
        }
      />

      {/* What it is ---------------------------------------------------- */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <h2 className="h-xl">What this covers.</h2>
            {page.intro.map((paragraph, i) => (
              <p key={i} className="lead mt-5 text-text-body">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal>
            <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
              {page.includes.map((item) => (
                <li key={item.title} className="px-5 py-5 md:px-7 md:py-6">
                  <h3 className="flex items-start gap-3 text-[1.0625rem] font-semibold">
                    <Check
                      className="mt-1 size-4.5 shrink-0 text-brand-blue"
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                    {item.title}
                  </h3>
                  <p className="mt-2 pl-7.5 text-text-body">{item.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* How it works -------------------------------------------------- */}
      <Section tone="alt">
        <SectionHead
          eyebrow="How It Works"
          heading="How this runs in practice."
          intro="Stages overlap — preparation continues while a search is live, and the emphasis shifts as your situation changes."
        />
        <ol className="border-t border-border">
          {page.process.map((step) => (
            <Reveal
              as="li"
              key={step.n}
              className="flex gap-5 border-b border-border py-7 md:gap-8 md:py-8"
            >
              <span className="w-10 shrink-0 text-[1.5rem] leading-tight font-semibold text-brand-blue tabular-nums md:w-12 md:text-[1.75rem]">
                {step.n}
              </span>
              <div>
                <h3 className="h-md">{step.title}</h3>
                <p className="mt-2 max-w-[70ch] text-text-body">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Who it is for ------------------------------------------------- */}
      <Section tone="paper">
        <SectionHead
          eyebrow="Who It Is For"
          heading="Situations this fits."
          intro="If none of these describe you, say so during the consultation — a different part of the process may be the better place to start."
        />
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
          {page.audience.map((item) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.body}
              variant="plain"
            />
          ))}
        </div>
      </Section>

      {/* FAQs ----------------------------------------------------------- */}
      <Section tone="alt">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <SectionHead
            className="mb-0"
            eyebrow="Questions"
            heading="Common questions."
            intro="Anything not covered here can be asked directly during your free consultation."
          />
          <Reveal>
            <FaqList items={page.faqs} />
          </Reveal>
        </div>
      </Section>

      {/* Related services ---------------------------------------------- */}
      <Section tone="paper">
        <SectionHead
          eyebrow="Related Services"
          heading="Often combined with."
          intro="Most candidates need more than one of these. The consultation decides the balance."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {related.map((item) => (
            <Reveal key={item.slug} className="h-full">
              <LinkCard
                href={`/services/${item.slug}`}
                title={item.metaTitle}
                description={item.metaDescription}
                linkLabel={`Read about ${item.navLabel.toLowerCase()}`}
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <ArrowLink href="/how-it-works">
            See the full five-stage process
          </ArrowLink>
        </Reveal>
      </Section>

      <CtaBand
        heading="Start with a free consultation."
        body={`Tell us where you are and what you are targeting. We will tell you honestly whether ${page.navLabel.toLowerCase()} is the right place to start.`}
        secondary={{ href: "/pricing", label: "Review packages" }}
      />
    </>
  );
}
