import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { CalendarDays, Clock, Mail, MessageSquare, Phone, Search } from "lucide-react";

import { WhatsAppIcon } from "@/components/site/brand";
import { StepList } from "@/components/site/cards";
import { ConsultationForm } from "@/components/site/consultation-form";
import { PageHero } from "@/components/site/page-hero";
import { PageSchema } from "@/components/site/page-schema";
import { Scheduler } from "@/components/site/scheduler";
import { Eyebrow, Section, SectionHead } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import {
  hasPhone,
  hasWhatsApp,
  phonePlaceholder,
  site,
  whatsappLink,
} from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Book a Free Career Consultation",
  socialTitle: "Contact",
  description:
    "Tell us about your experience, target role, and technology domain. No resume needed to begin — book a free consultation and we will explain the right next step.",
  path: "/contact",
});

const nextSteps = [
  {
    n: "01",
    title: "We Review Your Request",
    description:
      "A consultant reads your background, target role, and expectations before replying — so the first conversation is not spent repeating what you already wrote.",
    details: [],
    icon: Search,
  },
  {
    n: "02",
    title: "We Confirm a Time",
    description:
      "We propose a slot that fits your preference and time zone, and send the details along with anything worth thinking about beforehand.",
    details: [],
    icon: CalendarDays,
  },
  {
    n: "03",
    title: "We Talk It Through",
    description:
      "A focused conversation about where you are, where you want to be, and the most sensible path between the two — including whether you need us at all.",
    details: [],
    icon: MessageSquare,
  },
];

export default function ContactPage() {
  // Optional: set NEXT_PUBLIC_CAL_LINK to offer self-service booking alongside
  // the form. Absent, the page simply omits the calendar.
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK;

  return (
    <>
      <PageSchema
        name={"Book a Free Career Consultation"}
        description={"Tell us about your experience, target role, and technology domain. No resume needed to begin — book a free consultation and we will explain the right next step."}
        path={"/contact"}
        breadcrumb={"Contact"}
      />

      <PageHero
        breadcrumb="Contact"
        eyebrow="Free Consultation"
        title={
          <>
            Let&apos;s Build <span className="text-accent">Your Career Strategy.</span>
          </>
        }
        intro="Tell us about your experience, desired role, technology domain, and career expectations. We will help you understand the right next step."
        note="No resume needed to begin — a short conversation is enough."
      />

      <Section tone="paper">
        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <div className="rounded-(--radius-xl2) border border-hair bg-white p-6 shadow-soft md:p-11">
              <h2 className="h-lg">Request a Consultation</h2>
              <p className="mt-3 mb-7 text-fg-muted">
                Share a few details and we will get back to you to confirm a time.
                Everything you send is treated confidentially.
              </p>
              <ConsultationForm />
            </div>
            {calLink ? <Scheduler calLink={calLink} /> : null}
          </Reveal>

          <Reveal delay={1}>
            <Eyebrow>Direct Contact</Eyebrow>
            <h2 className="h-lg">Prefer to Reach Out Yourself?</h2>
            <p className="mt-3.5 mb-6.5 text-fg-muted">
              Message us on any channel below. We usually respond within one business
              day.
            </p>

            
            <div className="grid gap-3.5">
              <ContactCard
                href={`mailto:${site.email}`}
                icon={<Mail className="size-5" strokeWidth={1.8} />}
                label="Email"
                value={site.email}
                note="For consultation requests and general questions"
              />
              {/* No href while unconfigured: the card stays in place but is
                  inert, rather than offering a link that goes nowhere. */}
              <ContactCard
                href={hasPhone ? `tel:${site.phoneHref}` : undefined}
                icon={<Phone className="size-5" strokeWidth={1.8} />}
                label="Phone"
                value={hasPhone ? site.phoneDisplay : phonePlaceholder}
                note={
                  hasPhone
                    ? "Mon–Fri during business hours"
                    : "In the meantime, email us or use the form"
                }
              />
              <ContactCard
                href={hasWhatsApp ? whatsappLink : undefined}
                external={hasWhatsApp}
                icon={<WhatsAppIcon className="size-5" />}
                label="WhatsApp"
                value={hasWhatsApp ? site.phoneDisplay : phonePlaceholder}
                note={
                  hasWhatsApp
                    ? "Quickest way to reach a consultant"
                    : "In the meantime, email us or use the form"
                }
              />
              <ContactCard
                icon={<Clock className="size-5" strokeWidth={1.8} />}
                label="Business Hours"
                value={site.hours}
                note="Limited weekend consultation slots available"
              />
            </div>

            <div className="mt-7 rounded-r-[10px] border-l-[3px] border-accent bg-paper-alt px-5.5 py-4.5 text-[0.93rem] text-fg-muted">
              <strong className="text-fg">Do I need to send a resume first?</strong>
              <br />
              No. Begin by booking a consultation and sharing your current profile,
              goals, target role, and expectations. We will guide you through the next
              steps.
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="alt">
        <SectionHead
          eyebrow="After You Submit"
          heading="What Happens Next."
          intro="No obligation at any point. If we are not the right fit, we will say so and point you somewhere more useful."
        />
        <StepList steps={nextSteps} />
      </Section>
    </>
  );
}

function ContactCard({
  href,
  external,
  icon,
  label,
  value,
  note,
}: {
  href?: string;
  external?: boolean;
  icon: React.ReactNode;
  label: string;
  value: string;
  note: string;
}) {
  const content = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-paper-alt transition-colors duration-400 group-hover:bg-accent">
        {icon}
      </span>
      <span>
        <span className="block font-display text-[0.78rem] font-bold tracking-[0.1em] text-fg-faint uppercase">
          {label}
        </span>
        <span className="mt-1.25 block font-display text-[1.02rem] font-bold tracking-[-0.02em]">
          {value}
        </span>
        <span className="mt-0.75 block text-[0.84rem] text-fg-muted">{note}</span>
      </span>
    </>
  );

  const className =
    "group flex items-start gap-4 rounded-2xl border border-hair bg-white px-6 py-5.5 transition-[transform,border-color] duration-400 ease-brand";

  if (!href) return <div className={className}>{content}</div>;

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className={`${className} hover:translate-x-1.5 hover:border-ink`}
    >
      {content}
    </a>
  );
}
