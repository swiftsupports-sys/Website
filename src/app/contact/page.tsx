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
  title: "Contact Swift Consultancy — Free IT Career Consultation",
  absoluteTitle: true,
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
        name={"Contact Swift Consultancy — Free IT Career Consultation"}
        description={"Tell us about your experience, target role, and technology domain. No resume needed to begin — book a free consultation and we will explain the right next step."}
        path={"/contact"}
        breadcrumb={"Contact"}
      />

      <PageHero
        breadcrumb="Contact"
        eyebrow="Free Consultation"
        title="Let's Build Your Career Strategy."
        intro="Tell us about your experience, desired role, technology domain, and career expectations. We will help you understand the right next step."
        note="No resume needed to begin — a short conversation is enough."
      />

      <Section tone="alt" className="border-t-0">
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-12">
          <Reveal>
            <div className="rounded-lg border border-border bg-surface p-6 md:p-10">
              <h2 className="h-lg">Request a Consultation</h2>
              <p className="mt-2.5 mb-8 border-b border-border pb-6 text-text-body">
                Share a few details and we will get back to you to confirm a time.
                Everything you send is treated confidentially.
              </p>
              <ConsultationForm />
            </div>
            {calLink ? <Scheduler calLink={calLink} /> : null}
          </Reveal>

          <Reveal>
            <Eyebrow>Direct Contact</Eyebrow>
            <h2 className="h-lg">Prefer to Reach Out Yourself?</h2>
            <p className="mt-3 mb-6 text-text-body">
              Message us on any channel below. We usually respond within one business
              day.
            </p>

            <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
              <ContactRow
                href={`mailto:${site.email}`}
                icon={<Mail className="size-5" strokeWidth={1.8} />}
                label="Email"
                value={site.email}
                note="For consultation requests and general questions"
              />
              {/* No href while unconfigured: the row stays in place but is
                  inert, rather than offering a link that goes nowhere. */}
              <ContactRow
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
              <ContactRow
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
              <ContactRow
                icon={<Clock className="size-5" strokeWidth={1.8} />}
                label="Business Hours"
                value={site.hours}
                note="Limited weekend consultation slots available"
              />
            </ul>

            <div className="mt-6 rounded-r-md border-l-[3px] border-brand-blue bg-brand-blue-light px-5 py-4 text-[0.9375rem] text-text-body">
              <strong className="text-brand-navy">Do I need to send a resume first?</strong>
              <br />
              No. Begin by booking a consultation and sharing your current profile,
              goals, target role, and expectations. We will guide you through the next
              steps.
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper">
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

function ContactRow({
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
      <span className="mt-0.5 shrink-0 text-brand-blue" aria-hidden="true">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[0.875rem] text-text-secondary">{label}</span>
        <span className="mt-0.5 block font-semibold break-words text-brand-navy transition-colors duration-200 group-hover:text-brand-blue">
          {value}
        </span>
        <span className="mt-0.5 block text-[0.875rem] text-text-body">{note}</span>
      </span>
    </>
  );

  const className = "group flex items-start gap-4 px-5 py-4.5 md:px-6";

  return (
    <li>
      {href ? (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener" } : {})}
          className={`${className} transition-colors duration-200 hover:bg-background`}
        >
          {content}
        </a>
      ) : (
        <div className={className}>{content}</div>
      )}
    </li>
  );
}
