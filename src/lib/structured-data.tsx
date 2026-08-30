import { faqsFor } from "@/content/faq";
import { site } from "@/lib/site";

/**
 * Organization + ProfessionalService markup, rendered once in the root layout.
 *
 * Deliberately makes no claims about ratings, employers, or placement outcomes.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.email,
  telephone: site.phoneDisplay,
  areaServed: { "@type": "Country", name: "United States" },
  serviceType: [
    "Career consulting",
    "Interview preparation",
    "Candidate marketing",
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
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "19:00",
  },
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

/** Small helper so pages can drop a JSON-LD block in with one line. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
