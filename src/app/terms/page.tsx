import type { Metadata } from "next";
import Link from "next/link";

import { LegalBody } from "@/components/site/legal";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of this website and the information published on it.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Terms of Service"
        eyebrow="Legal"
        title="Terms of Service"
        intro="The terms that govern your use of this website and the information published on it."
      />

      <Section tone="paper">
        <LegalBody updated="30 August 2026">
          <h2>1. Acceptance of These Terms</h2>
          <p>
            By accessing or using this website, you agree to these Terms of Service. If
            you do not agree, please do not use the site. Engagements for paid services
            are governed by a separate{" "}
            <Link href="/service-agreement" className="underline underline-offset-3">
              Service Agreement
            </Link>
            , which takes precedence over these terms where the two overlap.
          </p>

          <h2>2. What This Website Is</h2>
          <p>
            This is an informational website describing the career consultancy,
            training, preparation, marketing, and mentorship services offered by Swift
            Consultancy. It is not a job board, an employer portal, or a recruitment
            marketplace, and it does not provide accounts, dashboards, or candidate
            tracking.
          </p>

          <h2>3. No Guarantee of Outcomes</h2>
          <p>
            We commit to the work: preparation, positioning, visibility, dedicated
            interview opportunities, and recruiter networking, carried out
            continuously for the duration of your engagement rather than stopping
            after a fixed number of applications. Timelines described on this
            website are typical expectations, not commitments, and depend on your
            profile, your participation, and the opportunities available.
          </p>
          <p>
            We do not guarantee a specific job offer, a particular employer, a salary
            level, a joining date, or visa or work authorization outcomes. The final
            hiring decision rests entirely with the employer. Nothing on this website
            constitutes a promise of any particular result.
          </p>

          <h2>4. Not Professional Advice</h2>
          <p>
            Content on this website is general information about our services. It is not
            legal, immigration, financial, or tax advice, and it should not be relied on
            as such. Consult an appropriately qualified professional for advice on your
            particular circumstances.
          </p>

          <h2>5. Accuracy of Information You Provide</h2>
          <p>
            You agree that any information you share with us — including your
            experience, qualifications, and work history — is accurate and truthful. We
            will not knowingly misrepresent a candidate&apos;s background to any
            employer or recruiter, and we may end an engagement where a candidate asks
            us to.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            All content on this website, including text, layout, graphics, and materials
            we produce during an engagement, is owned by Swift Consultancy or its
            licensors and may not be copied, redistributed, or resold without written
            permission.
          </p>

          <h2>7. Acceptable Use</h2>
          <ul>
            <li>Do not use this site for any unlawful purpose or in breach of these terms.</li>
            <li>
              Do not attempt to disrupt, probe, or gain unauthorized access to the site
              or its infrastructure.
            </li>
            <li>
              Do not scrape, harvest, or reproduce content for commercial use without
              permission.
            </li>
            <li>Do not submit false information through the consultation form.</li>
          </ul>

          <h2>8. Third-Party Links</h2>
          <p>
            This site may link to external services such as messaging platforms. We are
            not responsible for the content, availability, or privacy practices of
            third-party sites.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Swift Consultancy is not liable for
            indirect, incidental, or consequential losses arising from use of this
            website, including lost opportunities or lost earnings. Our total liability
            in connection with this website is limited to the amount you have paid us,
            if any, for the services to which the claim relates.
          </p>

          <h2>10. Changes to These Terms</h2>
          <p>
            We may update these terms from time to time. The current version will always
            be posted on this page with the date it took effect.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These terms are governed by the laws of the jurisdiction in which Swift
            Consultancy is established. If a dispute arises, please contact us first —
            most issues are resolved in a conversation.
          </p>

          <h2>12. Contact</h2>
          <p>
            Questions about these terms: {site.email}.
          </p>
        </LegalBody>
      </Section>
    </>
  );
}
