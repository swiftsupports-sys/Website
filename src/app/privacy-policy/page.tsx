import type { Metadata } from "next";

import { InShort, LegalBody } from "@/components/site/legal";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How we collect, use, and protect the information you share when you contact us or work with us.",
  alternates: { canonical: "/privacy-policy" },
};

/**
 * Describes what this website actually does: no accounts, no database, no
 * uploads — the consultation form is delivered by email and nothing else is
 * stored by the site. Keep this page in step with the stack; if a tool is
 * added (a CMS, a CRM, an ads pixel), it belongs in sections 2 and 4.
 */
export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        breadcrumb="Privacy Policy"
        eyebrow="Legal"
        title="Privacy Policy"
        intro="How we collect, use, and protect the information you share when you contact us or work with us."
      />

      <Section tone="paper">
        <LegalBody
          updated="30 August 2026"
          notice={
            <InShort>
              We collect what you send us through the consultation form, use it to
              reply and to deliver the services you ask for, and never sell it. This
              website has no accounts and no database — your enquiry is delivered to
              our inbox by email and is not stored on the site.
            </InShort>
          }
        >
          <h2>1. Who We Are</h2>
          <p>
            Swift Consultancy (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
            operates {site.domain} and provides career consultancy, training,
            preparation, and mentorship services to candidates pursuing technology
            roles. You can reach us at {site.email} or {site.phoneDisplay}.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We collect only what we need in order to respond to you and deliver our
            services.
          </p>
          <ul>
            <li>
              <strong>Information you give us.</strong> Name, email address, phone or
              WhatsApp number, experience level, target technology domain, desired
              role, preferred consultation time, and anything you choose to include in
              your message.
            </li>
            <li>
              <strong>Information shared during an engagement.</strong> Resume and
              profile content, career history, preparation notes, interview feedback,
              and correspondence relating to your engagement. None of this is collected
              through this website — it is shared directly with your consultant.
            </li>
            <li>
              <strong>Technical information.</strong> We use Vercel Web Analytics and
              Speed Insights to count page views and measure loading performance. These
              are aggregated and cookieless: they do not identify you and do not track
              you across other websites.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>To respond to your consultation request and arrange a time to speak.</li>
            <li>To deliver the services set out in your service agreement.</li>
            <li>
              To present your profile to relevant hiring channels, where you have asked
              us to and agreed to it.
            </li>
            <li>
              To communicate with you about your engagement, including scheduling and
              feedback.
            </li>
            <li>To meet legal, accounting, and record-keeping obligations.</li>
          </ul>
          <p>
            We do not use your information for automated decision-making, and we do not
            run advertising or profiling on this website.
          </p>

          <h2>4. Sharing Your Information</h2>
          <p>
            We do not sell your personal information. We share it only in these
            circumstances:
          </p>
          <ul>
            <li>
              <strong>With your consent.</strong> For example, when you ask us to
              present your profile to recruiters or hiring channels as part of candidate
              marketing.
            </li>
            <li>
              <strong>With the providers that run this site.</strong> Vercel (hosting
              and analytics), Resend (delivering your consultation request to our
              inbox), and Cloudflare Turnstile (checking that the form is submitted by a
              person rather than a bot). Each processes data on our behalf.
            </li>
            <li>
              <strong>Where required by law.</strong> When we are legally obliged to
              disclose information.
            </li>
          </ul>

          <h2>5. Data Retention</h2>
          <p>
            Consultation requests arrive as email and are kept in our inbox for as long
            as needed to respond and, if you become a client, for the duration of your
            engagement and any period required for accounting or legal reasons. If you
            do not go ahead, tell us and we will delete your enquiry. Nothing is
            retained by the website itself.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            Depending on where you live, you may have rights to access, correct, delete,
            or restrict use of your personal information, and to withdraw consent. To
            exercise any of these, email {site.email}. We will respond within the
            timeframe required by applicable law, and we will not treat you differently
            for asking.
          </p>

          <h2>7. Security</h2>
          <p>
            The site is served entirely over HTTPS. It holds no candidate database, no
            login system, and no file uploads, which removes the most common places
            personal data is exposed. Your enquiry travels from the form to our email
            inbox and no further. Access to that inbox is limited to the people who need
            it. No method of transmission or storage is completely secure, and we cannot
            guarantee absolute security.
          </p>

          <h2>8. Cookies</h2>
          <p>
            This website sets no advertising or tracking cookies. Our analytics is
            cookieless. Cloudflare Turnstile may store a short-lived token in your
            browser purely to confirm that a form submission is genuine; it is not used
            to identify you or to follow you across sites.
          </p>

          <h2>9. Children&apos;s Privacy</h2>
          <p>
            Our services are intended for adults seeking professional career support. We
            do not knowingly collect personal information from children.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. The revised version will be
            posted here with an updated date. Material changes affecting existing
            candidates will be communicated directly.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions about this policy or your information: {site.email} &middot;{" "}
            {site.phoneDisplay}.
          </p>
        </LegalBody>
      </Section>
    </>
  );
}
