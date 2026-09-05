import Link from "next/link";
import { Mail } from "lucide-react";

import { LinkedInIcon, LogoMark, WhatsAppIcon } from "@/components/site/brand";
import {
  footerNav,
  hasPhone,
  hasWhatsApp,
  legalNav,
  phonePlaceholder,
  site,
  whatsappLink,
} from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-on-dark">
      <div className="shell pt-14 md:pt-23">
        <div className="grid gap-8 border-b border-hair-dark pb-10 md:grid-cols-2 md:pb-16 lg:grid-cols-[1.5fr_repeat(3,1fr)] lg:gap-14">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2.5 font-display text-[1.24rem] font-extrabold tracking-[-0.03em] text-white"
            >
              <LogoMark />
              {site.name}
            </Link>
            <p className="mt-5 max-w-[40ch] text-[0.93rem] text-on-dark-muted">
              A career consultancy for technology professionals targeting roles at
              leading US companies. We provide preparation, positioning, and
              mentorship, with dedicated interview opportunities and recruiter
              networking.
            </p>
            <div className="mt-6 flex gap-2.5">
              <SocialLink href={site.social.linkedin} label="LinkedIn" external>
                <LinkedInIcon className="size-4.5" />
              </SocialLink>
              <SocialLink href={`mailto:${site.email}`} label="Email">
                <Mail className="size-4.5" strokeWidth={1.8} />
              </SocialLink>
              {/* Omitted rather than left as an icon that links nowhere. */}
              {hasWhatsApp ? (
                <SocialLink href={whatsappLink} label="WhatsApp" external>
                  <WhatsAppIcon className="size-4.5" />
                </SocialLink>
              ) : null}
            </div>
          </div>

          <FooterColumn title="Explore">
            {footerNav.explore.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="More">
            {footerNav.more.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
            <FooterLink href="/#faq">FAQ</FooterLink>
          </FooterColumn>

          <FooterColumn title="Contact">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-[0.93rem] text-on-dark-muted transition-colors hover:text-accent"
              >
                {site.email}
              </a>
            </li>
            {/* Rendered as plain text, not a link, until a number exists. */}
            <li>
              {hasPhone ? (
                <a
                  href={`tel:${site.phoneHref}`}
                  className="text-[0.93rem] text-on-dark-muted transition-colors hover:text-accent"
                >
                  {site.phoneDisplay}
                </a>
              ) : (
                <span className="text-[0.93rem] text-on-dark-muted">
                  Phone: {phonePlaceholder}
                </span>
              )}
            </li>
            <li>
              {hasWhatsApp ? (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener"
                  className="text-[0.93rem] text-on-dark-muted transition-colors hover:text-accent"
                >
                  WhatsApp: {site.phoneDisplay}
                </a>
              ) : (
                <span className="text-[0.93rem] text-on-dark-muted">
                  WhatsApp: {phonePlaceholder}
                </span>
              )}
            </li>
            <li className="text-[0.93rem] text-on-dark-muted">{site.hours}</li>
          </FooterColumn>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-3.5 py-6.5 text-[0.85rem] text-white/50">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <nav aria-label="Legal" className="flex flex-wrap gap-5">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-accent"
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

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-5 font-display text-[0.76rem] font-bold tracking-[0.14em] text-white/50 uppercase">
        {title}
      </h4>
      <ul className="grid gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[0.93rem] text-on-dark-muted transition-colors hover:text-accent"
      >
        {children}
      </Link>
    </li>
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
      className="grid size-10 place-items-center rounded-full border border-hair-dark transition-[background-color,border-color,transform,color] duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-ink"
    >
      {children}
    </a>
  );
}
