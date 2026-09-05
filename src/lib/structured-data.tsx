import { faqsFor } from "@/content/faq";
import { canonical } from "@/lib/seo";
import { hasPhone, site } from "@/lib/site";

/**
 * Organization + WebSite markup, rendered once in the root layout.
 *
 * Typed as Organization rather than LocalBusiness/ProfessionalService: those
 * subtypes are expected to carry a verifiable street address, and inventing one
 * to satisfy a schema validator would be worse than omitting it.
 *
 * Deliberately makes no claims about ratings, employers, or placement outcomes.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: "Swift Consultancy US",
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/icon.svg`,
    caption: `${site.name} logo`,
  },
  image: `${site.url}/opengraph-image`,
  description: site.description,
  /**
   * Several unrelated businesses trade under similar names — HR firms,
   * financial advisers, recruitment agencies. This states plainly which entity
   * this domain represents so search engines have something concrete to
   * separate them by.
   */
  disambiguatingDescription:
    "A career consultancy for technology professionals pursuing roles at companies in the United States, providing candidate marketing, recruiter networking, interview preparation, domain training, and one-to-one mentorship. Not affiliated with other businesses operating under similar names in HR outsourcing, recruitment, or financial services.",
  email: site.email,
  // Omitted rather than emitted empty while no number is configured.
  ...(hasPhone ? { telephone: site.phoneDisplay } : {}),
  areaServed: { "@type": "Country", name: "United States" },
  slogan: site.tagline,
  knowsLanguage: "en",
  serviceType: [
    "Career consulting",
    "Technical interview preparation",
    "Candidate marketing",
    "Recruiter networking",
    "Technology training",
    "Career mentorship",
  ],
  knowsAbout: [
    "Software development careers",
    "Quality assurance and automation",
    "Data analytics and data engineering",
    "Cloud engineering and DevOps",
    "Cybersecurity",
    "Business analysis",
    "UI/UX and product roles",
    "Technical interview preparation",
    "Resume and ATS optimization",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: site.email,
    ...(hasPhone ? { telephone: site.phoneDisplay } : {}),
    areaServed: "US",
    availableLanguage: "English",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "19:00",
  },
  /**
   * Verified profiles only — this is the link that tells search engines which
   * "Swift Consultancy" this is. Add a profile here only once it exists, is
   * controlled by the business, and names the same company and website.
   */
  sameAs: [site.social.linkedin],
};

/** WebSite node, linked to the Organization so both resolve to one entity. */
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en-US",
};

/** FAQPage markup for the home page's question list. */
export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqsFor("general").map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

/** WebPage node for a specific route, tied to the site and organization. */
export function webPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical(path)}/#webpage`,
    url: canonical(path),
    name,
    description,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
    inLanguage: "en-US",
  };
}

/** Small helper so pages can drop a JSON-LD block in with one line. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
