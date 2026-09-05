"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { BrandLink } from "@/components/site/brand";
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

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Every page opens on a dark hero, so the bar starts transparent and only
  // switches to the frosted light treatment once the visitor scrolls.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-80 flex h-[78px] items-center border-b border-transparent transition-[background-color,height,box-shadow,border-color] duration-400 ease-brand",
        scrolled &&
          "h-[70px] border-hair bg-paper/85 shadow-[0_8px_34px_rgb(16_18_16/0.06)] backdrop-blur-md",
      )}
    >
      <div className="shell flex items-center gap-4 lg:gap-8">
        <BrandLink className={scrolled ? "text-ink" : "text-white"} />

        <nav
          aria-label="Primary"
          className="ml-auto hidden items-center gap-0.5 xl:flex"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative rounded-full px-3 py-2 text-[0.89rem] font-medium whitespace-nowrap transition-colors duration-300",
                "after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-sm after:bg-accent after:transition-transform after:duration-300 after:ease-brand hover:after:scale-x-100 aria-[current=page]:after:scale-x-100",
                scrolled
                  ? "text-fg-muted hover:text-ink aria-[current=page]:font-semibold aria-[current=page]:text-ink"
                  : "text-white/80 hover:text-white aria-[current=page]:font-semibold aria-[current=page]:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button asChild size="sm" className="ml-1.5 hidden xl:inline-flex">
          <Link href="/contact">Book a Free Consultation</Link>
        </Button>

        {/* Mobile / tablet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className="ml-auto grid size-11.5 cursor-pointer place-items-center rounded-[13px] bg-accent text-ink transition-transform duration-300 hover:scale-105 xl:hidden"
          >
            <Menu className="size-5" strokeWidth={2.2} />
          </SheetTrigger>

          <SheetContent aria-describedby="drawer-desc">
            <div className="flex h-[78px] items-center justify-between border-b border-hair-dark px-(--spacing-gutter)">
              <SheetTitle asChild>
                <BrandLink className="text-white" />
              </SheetTitle>
              <SheetClose
                aria-label="Close menu"
                className="grid size-11.5 cursor-pointer place-items-center rounded-[13px] border border-hair-dark text-white transition-colors hover:bg-white/10"
              >
                <X className="size-5" strokeWidth={2.2} />
              </SheetClose>
            </div>

            <div className="overflow-y-auto px-(--spacing-gutter) py-8">
              <SheetDescription id="drawer-desc" className="sr-only">
                Site navigation and contact details
              </SheetDescription>

              <nav aria-label="Mobile" className="grid">
                {primaryNav.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between gap-4 border-b border-hair-dark py-3 font-display text-[clamp(1.4rem,5.4vw,1.9rem)] font-bold tracking-[-0.03em]",
                      "aria-[current=page]:text-accent",
                    )}
                  >
                    {item.label}
                    <span className="font-sans text-[0.72rem] font-medium text-fg-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="mt-8 grid gap-3.5">
                <Button asChild block>
                  <Link href="/contact">Book a Free Consultation</Link>
                </Button>
                <Button asChild block variant="outlineDark">
                  <Link href="/services">Explore Our Services</Link>
                </Button>
              </div>

              <div className="mt-7 grid gap-1.5 text-[0.9rem] text-on-dark-muted">
                <a href={`mailto:${site.email}`}>{site.email}</a>
                {hasPhone ? (
                  <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
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
  );
}
