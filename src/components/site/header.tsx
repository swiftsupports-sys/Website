"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Clock, Mail, Menu, X } from "lucide-react";

import { BrandLink, LinkedInIcon } from "@/components/site/brand";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { hasPhone, phonePlaceholder, primaryNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** The logo already links home, so the desktop bar leaves "Home" out. */
const desktopNav = primaryNav.filter((item) => item.href !== "/");

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  /**
   * Close the drawer whenever the route changes.
   *
   * App Router navigations are client-side, so the sheet is never unmounted —
   * without this the page changes behind a drawer that stays open with the
   * body still scroll-locked, which reads as "the menu does nothing". This
   * also covers back/forward, where no link handler runs.
   *
   * Adjusted during render rather than in an effect: React re-runs this
   * component before touching the DOM, so the drawer never paints in the
   * stale open state.
   */
  const [lastPath, setLastPath] = React.useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Utility bar — scrolls away; only the main bar below is sticky. */}
      <div className="tone-dark hidden bg-brand-navy text-[0.8125rem] text-on-dark-muted lg:block">
        <div className="shell flex h-9 items-center justify-between gap-6">
          <span>{site.tagline}</span>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="size-3.5" strokeWidth={2} aria-hidden="true" />
              {site.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-3.5" strokeWidth={2} aria-hidden="true" />
              {site.hours}
            </span>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              className="transition-colors hover:text-white"
            >
              <LinkedInIcon className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-80 border-b border-border bg-surface">
        <div className="shell flex h-[76px] items-center gap-6 lg:gap-8">
          <BrandLink />

          <nav aria-label="Primary" className="ml-auto hidden h-full items-stretch xl:flex">
            {desktopNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative flex items-center px-3 text-[0.9375rem] font-medium whitespace-nowrap text-text-primary transition-colors duration-200 hover:text-brand-blue",
                  "aria-[current=page]:text-brand-blue aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:bottom-0 aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-brand-blue",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button asChild size="sm" className="hidden xl:inline-flex">
            <Link href="/contact">Book a Free Consultation</Link>
          </Button>

          {/* Mobile / tablet */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="ml-auto grid size-11 cursor-pointer place-items-center rounded-md border border-border text-brand-navy transition-colors duration-200 hover:bg-muted xl:hidden"
            >
              <Menu className="size-5" strokeWidth={2} />
            </SheetTrigger>

            <SheetContent aria-describedby="drawer-desc">
              <div className="flex h-[76px] items-center justify-between border-b border-border px-5">
                <SheetTitle asChild>
                  <BrandLink />
                </SheetTitle>
                <SheetClose
                  aria-label="Close menu"
                  className="grid size-10 cursor-pointer place-items-center rounded-md text-brand-navy transition-colors duration-200 hover:bg-muted"
                >
                  <X className="size-5" strokeWidth={2} />
                </SheetClose>
              </div>

              <div className="overflow-y-auto px-5 py-4">
                <SheetDescription id="drawer-desc" className="sr-only">
                  Site navigation and contact details
                </SheetDescription>

                <nav aria-label="Mobile">
                  <ul>
                    {primaryNav.map((item) => (
                      <li key={item.href} className="border-b border-border">
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive(item.href) ? "page" : undefined}
                          className="flex items-center justify-between gap-4 py-3.5 text-base font-medium text-text-primary transition-colors hover:text-brand-blue aria-[current=page]:font-semibold aria-[current=page]:text-brand-blue"
                        >
                          {item.label}
                          <ChevronRight
                            className="size-4 text-text-secondary"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-6 grid gap-3">
                  <Button asChild block>
                    <Link href="/contact" onClick={() => setOpen(false)}>
                      Book a Free Consultation
                    </Link>
                  </Button>
                  <Button asChild block variant="secondary">
                    <Link href="/services" onClick={() => setOpen(false)}>
                      Explore Our Services
                    </Link>
                  </Button>
                </div>

                <div className="mt-6 grid gap-1.5 border-t border-border pt-5 text-[0.875rem] text-text-body">
                  <a
                    href={`mailto:${site.email}`}
                    className="transition-colors hover:text-brand-blue"
                  >
                    {site.email}
                  </a>
                  {hasPhone ? (
                    <a
                      href={`tel:${site.phoneHref}`}
                      className="transition-colors hover:text-brand-blue"
                    >
                      {site.phoneDisplay}
                    </a>
                  ) : (
                    <span>Phone: {phonePlaceholder}</span>
                  )}
                  <span>{site.hours}</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
