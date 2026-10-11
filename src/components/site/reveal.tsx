"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * Motion vocabulary for the whole site. One easing (a long, soft settle) and
 * two durations, so every entrance feels like part of the same system:
 *
 *   content — 0.6s, rises 18px
 *   image   — 0.9s, settles from 97% scale
 *
 * Staggered siblings step by 80ms, capped so a long list never makes the last
 * item wait more than about half a second.
 */
const EASE = [0.16, 1, 0.3, 1] as const;
const STEP = 0.08;
const MAX_STEPS = 6;

/** Reveal a little after the element crosses into view, not on its first pixel. */
const VIEW_MARGIN = "0px 0px -8% 0px";

const variants = {
  content: { hidden: { opacity: 0, y: 18 }, shown: { opacity: 1, y: 0, scale: 1 }, duration: 0.6 },
  image: { hidden: { opacity: 0, y: 12, scale: 0.97 }, shown: { opacity: 1, y: 0, scale: 1 }, duration: 0.9 },
} as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger index — each step delays the entrance by 80ms. */
  delay?: number;
  /** Element to render. Defaults to a div. */
  as?: "div" | "section" | "li" | "article" | "header" | "figure";
  variant?: keyof typeof variants;
};

/**
 * Shared safety net for scroll-triggered entrances.
 *
 * The hidden state is server-rendered, so anything that stops the observer
 * from reporting would leave the page blank. A `<noscript>` rule in the root
 * layout covers visitors without JavaScript, and this timer reveals anything
 * already on screen if no intersection callback has arrived.
 */
function useOnScreenFallback(ref: React.RefObject<HTMLElement | null>) {
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) setShown(true);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [ref]);

  return shown;
}

/**
 * Scroll-triggered entrance, animated once. Visitors who prefer reduced
 * motion see the content immediately, with no transition.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  variant = "content",
}: RevealProps) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15, margin: VIEW_MARGIN });
  const fallbackShown = useOnScreenFallback(ref);
  const v = variants[variant];

  // Reduced motion still renders the motion element, snapped to visible with
  // no transition. Swapping in a plain element instead would leave the
  // server-rendered `opacity: 0` in place: React does not patch mismatched
  // style attributes during hydration, so the content stayed invisible.
  const Comp = motion[as];
  const visible = reduced || inView || fallbackShown;

  return (
    <Comp
      // Gives the <noscript> rule in the root layout something to override.
      data-reveal=""
      ref={ref as React.Ref<HTMLDivElement & HTMLLIElement & HTMLElement>}
      className={className}
      initial={v.hidden}
      animate={visible ? v.shown : v.hidden}
      transition={
        reduced
          ? { duration: 0 }
          : {
              duration: v.duration,
              delay: visible ? Math.min(delay, MAX_STEPS) * STEP : 0,
              ease: EASE,
            }
      }
    >
      {children}
    </Comp>
  );
}

/**
 * A grid or list whose direct children enter one after another.
 *
 * Driven by CSS (see `[data-stagger]` in globals.css) rather than a motion
 * element per child, so cards keep their own markup and server rendering. The
 * component only reports when the group is in view and numbers the children.
 */
export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1, margin: VIEW_MARGIN });
  const fallbackShown = useOnScreenFallback(ref);

  // Each child's position drives its delay; set once on mount.
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    Array.from(el.children).forEach((child, i) => {
      (child as HTMLElement).style.setProperty("--stagger-i", String(Math.min(i, MAX_STEPS)));
    });
  }, []);

  const Comp = as as React.ElementType;

  return (
    <Comp
      ref={ref}
      className={className}
      data-stagger=""
      data-shown={inView || fallbackShown ? "" : undefined}
    >
      {children}
    </Comp>
  );
}
