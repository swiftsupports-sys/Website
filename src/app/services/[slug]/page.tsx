import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import { CtaBand } from "@/components/site/cta-band";
import { FaqList } from "@/components/site/faq-list";
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
        eyebrow={page.eyebrow}
        title={
          <>
            {page.h1.lead}{" "}
            <span className="text-accent">{page.h1.accent}</span>
          </>
        }
        intro={page.intro[0]}
        actions={
          <div className="flex flex-wrap gap-3.5">
            <Button asChild>
              <Link href="/contact">Book a Free Consultation</Link>
            </Button>
            <Button asChild variant="outlineDark">
              <Link href="/services">See all services</Link>
            </Button>
          </div>
        }
      />

      {/* What it is ---------------------------------------------------- */}
      <Section tone="paper">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <Reveal>
            <h2 className="h-xl">What this covers.</h2>
            {page.intro.map((paragraph, i) => (
              <p key={i} className="lead mt-5 text-fg-muted">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={1}>
            <ul className="grid gap-4">
              {page.includes.map((item) => (
                <li
                  key={item.title}
                  className="rounded-(--radius-card) border border-hair bg-white p-6"
                >
                  <h3 className="flex items-start gap-3 font-display text-[1.02rem] font-bold tracking-[-0.018em]">
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-accent"
                      strokeWidth={1.9}
                      aria-hidden="true"
                    />
                    {item.title}
                  </h3>
                  <p className="mt-2.5 pl-8 text-[0.94rem] text-fg-muted">{item.body}</p>
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
        <ol className="grid gap-3.5 md:gap-5">
          {page.process.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i}>
              <div className="grid grid-cols-[auto_1fr] items-start gap-5 rounded-(--radius-card) border border-hair bg-white p-7 transition-colors duration-400 ease-brand hover:border-ink md:gap-10 md:p-9">
                <span className="font-display text-[clamp(1.6rem,2.6vw,2.1rem)] leading-none font-extrabold tracking-[-0.05em] text-fg-faint">
                  {step.n}
                </span>
                <div>
                  <h3 className="h-md">{step.title}</h3>
                  <p className="mt-2.5 max-w-[66ch] text-[0.97rem] text-fg-muted">
                    {step.body}
                  </p>
                </div>
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
        <div className="grid gap-5 md:grid-cols-3">
          {page.audience.map((item, i) => (
            <Reveal key={item.title} delay={i} className="h-full">
              <article className="h-full rounded-(--radius-card) border border-hair bg-paper-alt p-7 md:p-9">
                <h3 className="h-md">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] text-fg-muted">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQs ----------------------------------------------------------- */}
      <Section tone="alt">
        <SectionHead
          eyebrow="Questions"
          heading="Common questions."
          intro="Anything not covered here can be asked directly during your free consultation."
        />
        <Reveal>
          <FaqList items={page.faqs} />
        </Reveal>
      </Section>

      {/* Related services ---------------------------------------------- */}
      <Section tone="paper">
        <SectionHead
          eyebrow="Related Services"
          heading="Often combined with."
          intro="Most candidates need more than one of these. The consultation decides the balance."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {related.map((item, i) => (
            <Reveal key={item.slug} delay={i} className="h-full">
              <Link
                href={`/services/${item.slug}`}
                className="group block h-full rounded-(--radius-card) border border-hair bg-white p-7 transition-[transform,box-shadow] duration-400 ease-brand hover:-translate-y-1.5 hover:shadow-card md:p-9"
              >
                <h3 className="h-md">{item.metaTitle}</h3>
                <p className="mt-3 text-[0.95rem] text-fg-muted">
                  {item.metaDescription}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-display text-[0.93rem] font-bold">
                  Read about {item.navLabel.toLowerCase()}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
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
