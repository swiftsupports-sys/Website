import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/site/cta-band";
import { InShort, LegalBody } from "@/components/site/legal";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Agreement",
  description:
    "An outline of the engagement terms between Swift Consultancy and enrolled candidates.",
  alternates: { canonical: "/service-agreement" },
};

export default function ServiceAgreementPage() {
  return (
    <>
      <PageHero
        breadcrumb="Service Agreement"
        eyebrow="Legal"
        title="Service Agreement"
        intro="An outline of the engagement terms between us and enrolled candidates. The binding version is the agreement you receive before your engagement begins."
      />

      <Section tone="paper">
        <LegalBody
          updated="30 August 2026"
          notice={
            <InShort>
              This page summarises how an engagement works. The binding document is the
              individual written agreement you receive — covering your scope, fees, and
              payment terms — which is confirmed with you before any payment is made.
            </InShort>
          }
        >
          <h2>1. Parties and Scope</h2>
          <p>
            This agreement is between Swift Consultancy (&ldquo;the Consultancy&rdquo;)
            and the enrolled candidate (&ldquo;the Candidate&rdquo;). It covers the
            career consultancy, training, preparation, candidate marketing, and
            mentorship services selected by the Candidate and recorded in the engagement
            schedule.
          </p>

          <h2>2. Services Provided</h2>
          <p>
            The Consultancy commits to working the Candidate&apos;s search actively for
            the duration of the engagement — including dedicated interview
            opportunities, candidate marketing, and recruiter networking — rather than
            ceasing after a fixed number of applications.
          </p>
          <p>Services are drawn from the following, as agreed in the engagement schedule:</p>
          <ul>
            <li>Career assessment and role guidance</li>
            <li>Resume, ATS, LinkedIn, and professional branding support</li>
            <li>Candidate marketing, opportunity positioning, and recruiter networking</li>
            <li>Job search strategy and application guidance</li>
            <li>Domain-specific training and project guidance</li>
            <li>
              Technical, HR, and behavioral interview preparation, including mock
              interviews with feedback
            </li>
            <li>Communication and workplace readiness coaching</li>
            <li>
              One-to-one mentorship, pre-placement support, and post-placement career
              guidance
            </li>
          </ul>

          <h2>3. What Is Not Included</h2>
          <ul>
            <li>
              Any guarantee of a specific job offer, a particular employer, a salary
              level, or a joining date. The Consultancy commits to dedicated interview
              opportunities, candidate marketing, and recruiter networking; the hiring
              decision itself rests with the employer.
            </li>
            <li>Immigration, visa, work authorization, legal, tax, or financial advice.</li>
            <li>
              Attending interviews, assessments, or any part of a hiring process on the
              Candidate&apos;s behalf, in any form.
            </li>
            <li>
              Misrepresenting the Candidate&apos;s experience, employment history, or
              qualifications to any party.
            </li>
          </ul>

          <h2>4. Packages and Fees</h2>
          <p>
            Two engagement models are offered, as published on the{" "}
            <Link href="/pricing" className="underline underline-offset-3">
              Pricing
            </Link>{" "}
            page:
          </p>
          <ul>
            <li>
              <strong>Base Package — $2.5K.</strong> Complete career support covering all
              core consultancy services. Placement-related charges apply after successful
              placement, as defined in the engagement schedule.
            </li>
            <li>
              <strong>Premium Package — $10K.</strong> End-to-end career support with
              priority mentorship and no post-placement charges after successful
              placement.
            </li>
          </ul>
          <p>
            Payment timing, accepted methods, applicable taxes, currency, any instalment
            arrangement, and the precise definition of a successful placement are set out
            in your individual engagement schedule. These are discussed openly during the
            consultation and confirmed in writing before any payment is made — never
            introduced afterwards.
          </p>

          <h2>5. Candidate Responsibilities</h2>
          <ul>
            <li>
              Provide accurate and complete information about experience, qualifications,
              and work authorization status.
            </li>
            <li>Participate in scheduled sessions and complete agreed preparation between them.</li>
            <li>
              Inform the Consultancy promptly about interviews, feedback, offers, and any
              change in circumstances.
            </li>
            <li>
              Approve how the profile is presented before any candidate marketing
              activity takes place.
            </li>
          </ul>

          <h2>6. Consultancy Responsibilities</h2>
          <ul>
            <li>Deliver the agreed services with reasonable skill, care, and professional judgment.</li>
            <li>Represent the Candidate&apos;s background accurately at all times.</li>
            <li>
              Keep candidate information confidential and use it only as described in the{" "}
              <Link href="/privacy-policy" className="underline underline-offset-3">
                Privacy Policy
              </Link>
              .
            </li>
            <li>Give honest assessments, including where a target role appears unrealistic.</li>
          </ul>

          <h2>7. Confidentiality</h2>
          <p>
            Each party will keep the other&apos;s confidential information private and
            use it only for the purposes of the engagement. Candidate materials are
            shared externally only with the Candidate&apos;s consent.
          </p>

          <h2>8. Term, Cancellation, and Refunds</h2>
          <p>
            The duration of your engagement, any notice period, and the cancellation and
            refund terms that apply are set out in your individual engagement schedule
            and agreed before the engagement begins. If you are unsure what applies to
            you, ask during the consultation — we would rather answer it twice than have
            it come as a surprise later.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            The Consultancy&apos;s services are advisory and preparatory. Employment
            outcomes depend on employer decisions, market conditions, and the
            Candidate&apos;s own performance. To the fullest extent permitted by law, our
            total liability in connection with an engagement is limited to the fees paid
            for that engagement, and we are not liable for indirect or consequential
            losses such as lost opportunities or lost earnings.
          </p>

          <h2>10. Governing Law and Disputes</h2>
          <p>
            This agreement is governed by the laws of the jurisdiction in which Swift
            Consultancy is established. If a concern arises, contact us first — we will
            work to resolve it directly before any formal process.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions about an engagement: {site.email} &middot; {site.phoneDisplay}.
          </p>
        </LegalBody>
      </Section>

      <CtaBand
        eyebrow="Questions First"
        heading="Ask Before You Commit."
        body="Terms, scope, and any charges that apply later are explained in the free consultation — in plain language, before anything is signed."
        secondary={{ href: "/pricing", label: "Review Packages" }}
      />
    </>
  );
}
