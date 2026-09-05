/**
 * Single source of truth for business details, navigation, and canonical URLs.
 *
 * These values feed the header, footer, contact page, structured data, and the
 * floating WhatsApp button — change them here and every surface follows.
 */

export const site = {
  name: "Swift Consultancy",
  shortName: "Swift",
  /** Bare domain, for display in prose. */
  domain: "swiftconsultancy.us",
  /**
   * Canonical origin — must match what the server actually serves, or every
   * canonical tag, sitemap entry, and OG URL points at a redirect.
   *
   * Vercel currently serves the apex as primary and redirects www to it. If
   * that is ever flipped in the Vercel dashboard, change this to match, or
   * every canonical URL on the site will point at a redirect.
   */
  url: "https://swiftconsultancy.us",
  tagline: "Career consultancy for US technology roles",
  description:
    "Personalized candidate marketing, recruiter networking, role-specific training, interview preparation, and mentorship for professionals targeting technology roles at leading US companies.",

  /**
   * Public-facing address, shown in the header, footer, contact page, and
   * structured data. Where consultation-form submissions are delivered is a
   * separate setting (CONSULTATION_INBOX) — keep that pointed at a mailbox
   * that definitely receives, so enquiries cannot go missing.
   */
  email: "contact@swiftconsultancy.us",
  phoneDisplay: "+91 89561 10805",
  phoneHref: "+918956110805",
  /** International format, no "+" or spaces — wa.me 404s otherwise. */
  whatsappNumber: "918956110805",
  hours: "Mon–Fri, 9:00 AM – 7:00 PM ET",

  /* PLACEHOLDER social profiles */
  social: {
    linkedin: "#",
  },
} as const;

export const whatsappLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  "Hi, I'd like to book a free career consultation.",
)}`;

export type NavItem = { href: string; label: string };

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/domains", label: "Domains" },
  { href: "/pricing", label: "Pricing" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/contact", label: "Contact" },
];

export const legalNav: NavItem[] = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/service-agreement", label: "Service Agreement" },
];

export const footerNav = {
  explore: primaryNav.slice(0, 5),
  more: primaryNav.slice(5),
};
