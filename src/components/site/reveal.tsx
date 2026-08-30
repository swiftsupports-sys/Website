"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger index — each step delays the entrance by 90ms. */
  delay?: number;
  /** Element to render. Defaults to a div. */
  as?: "div" | "section" | "li" | "article" | "header";
};

const hidden = { opacity: 0, y: 26 };
const shown = { opacity: 1, y: 0 };

/**
 * Scroll-triggered entrance, animated once.
 *
 * The hidden state is server-rendered, so anything that stops the observer
 * from reporting would leave the page blank. Two safety nets prevent that:
 * a `<noscript>` rule in the root layout (see layout.tsx) covers visitors
 * without JavaScript, and the timer below reveals anything already on screen
 * if no intersection callback has arrived. Visitors who prefer reduced motion
 * skip the animation entirely.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [fallbackShown, setFallbackShown] = React.useState(false);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
      if (onScreen) setFallbackShown(true);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const Comp = motion[as];
  const visible = inView || fallbackShown;

  return (
    <Comp
      // Gives the <noscript> rule in the root layout something to override.
      data-reveal=""
      ref={ref as React.Ref<HTMLDivElement & HTMLLIElement>}
      className={className}
      initial={hidden}
      animate={visible ? shown : hidden}
      transition={{
        duration: 0.8,
        delay: visible ? delay * 0.09 : 0,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      {children}
    </Comp>
  );
}
