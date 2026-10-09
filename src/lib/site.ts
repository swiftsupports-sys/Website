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
  tagline: "IT staffing and career consulting for technology roles in the USA",
  description:
    "Swift Consultancy is an IT staffing and career consulting firm helping professionals land tech jobs in the USA — resume, LinkedIn, and portfolio building, 40+ targeted job applications daily, role-specific training, and interview preparation.",

  /**
   * Public-facing address, shown in the header, footer, contact page, and
   * structured data. Where consultation-form submissions are delivered is a
   * separate setting (CONSULTATION_INBOX) — keep that pointed at a mailbox
   * that definitely receives, so enquiries cannot go missing.
   */
  email: "contact@swiftconsultancy.us",

  /**
   * Phone and WhatsApp. Every surface checks `hasPhone` / `hasWhatsApp` and
   * shows an inert placeholder instead of a dead link if these are blanked.
   *
   * To change the number, update all three — no other file needs editing:
   *   phoneDisplay: "+1 (555) 123-4567"   as written for humans
   *   phoneHref:    "+15551234567"         digits and a leading +, for tel:
   *   whatsappNumber: "15551234567"        digits only — wa.me 404s otherwise
   */
  phoneDisplay: "+91 81800 91639",
  phoneHref: "+918180091639",
  whatsappNumber: "918180091639",
  hours: "Mon–Fri, 9:00 AM – 7:00 PM ET",

  /**
   * Verified profiles only. These are emitted as schema.org `sameAs`, which is
   * how search engines tie this site to the right "Swift Consultancy" — the
   * name is shared with unrelated businesses, so an unverified or wrong URL
   * here actively confuses the entity rather than clarifying it.
   */
  social: {
    linkedin: "https://www.linkedin.com/company/swift-consultancy-usa",
  },
} as const;

/**
 * Whether a contact number is configured. Surfaces render an inert
 * placeholder when these are false rather than a link that goes nowhere.
 */
export const hasPhone: boolean = String(site.phoneHref).length > 0;
export const hasWhatsApp: boolean = String(site.whatsappNumber).length > 0;

/** Empty string when no number is set — always guard with `hasWhatsApp`. */
export const whatsappLink = hasWhatsApp
  ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
      "Hi, I'd like to book a free career consultation.",
    )}`
  : "";

/** Shown in place of a number while none is configured. */
export const phonePlaceholder = "Available soon";

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
