import Link from "next/link";
import { Mail } from "lucide-react";

import { BrandLink, LinkedInIcon, WhatsAppIcon } from "@/components/site/brand";
import { servicePages } from "@/content/service-pages";
import {
  hasPhone,
  hasWhatsApp,
  legalNav,
  phonePlaceholder,
  site,
  whatsappLink,
  type NavItem,
} from "@/lib/site";

const companyLinks: NavItem[] = [
  { href: "/about", label: "About Us" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks: NavItem[] = [
  ...servicePages.map((page) => ({
    href: `/services/${page.slug}`,
    label: page.navLabel,
  })),
  { href: "/services", label: "All Services" },
];

const resourceLinks: NavItem[] = [
  { href: "/domains", label: "Technology Domains" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Book a Free Consultation" },
];

export function Footer() {
  return (
    <footer className="tone-dark bg-footer text-on-dark-subtle">
      <div className="shell pt-14 md:pt-16 lg:pt-20">
        <div className="grid gap-10 border-b border-border-dark pb-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12 lg:pb-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandLink tone="dark" />
            <p className="mt-5 max-w-[42ch] text-[0.9375rem] leading-relaxed">
              Swift Consultancy is an IT staffing and career consulting firm helping
              technology professionals land jobs in the USA — through profile
              building, daily job applications, recruiter outreach, role-specific
              training, and interview preparation.
            </p>

            <ul className="mt-6 grid gap-2 text-[0.9375rem]">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-brand-blue-soft"
                >
                  {site.email}
                </a>
              </li>
              {/* Rendered as plain text, not a link, until a number exists. */}
              <li>
                {hasPhone ? (
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="transition-colors hover:text-brand-blue-soft"
                  >
                    {site.phoneDisplay}
                  </a>
                ) : (
                  <span>Phone: {phonePlaceholder}</span>
                )}
              </li>
              <li>
                {hasWhatsApp ? (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener"
                    className="transition-colors hover:text-brand-blue-soft"
                  >
                    WhatsApp: {site.phoneDisplay}
                  </a>
                ) : (
                  <span>WhatsApp: {phonePlaceholder}</span>
                )}
              </li>
              <li>{site.hours}</li>
            </ul>

            <div className="mt-6 flex gap-2">
              <SocialLink href={site.social.linkedin} label="LinkedIn" external>
                <LinkedInIcon className="size-4" />
              </SocialLink>
              <SocialLink href={`mailto:${site.email}`} label="Email">
                <Mail className="size-4" strokeWidth={1.8} />
              </SocialLink>
              {/* Omitted rather than left as an icon that links nowhere. */}
              {hasWhatsApp ? (
                <SocialLink href={whatsappLink} label="WhatsApp" external>
                  <WhatsAppIcon className="size-4" />
                </SocialLink>
              ) : null}
            </div>
          </div>

          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Services" links={serviceLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
        </div>

        <div className="flex flex-col gap-4 py-6 text-[0.875rem] md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-brand-blue-soft"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: NavItem[] }) {
  return (
    <div>
      <h2 className="mb-4 text-[0.9375rem] font-semibold">{title}</h2>
      <ul className="grid gap-2.5">
        {links.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <Link
              href={item.href}
              className="text-[0.9375rem] transition-colors hover:text-brand-blue-soft"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
  external,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className="grid size-9 place-items-center rounded-md border border-border-dark text-on-dark-muted transition-colors duration-200 hover:border-brand-blue-soft hover:text-brand-blue-soft"
    >
      {children}
    </a>
  );
}
