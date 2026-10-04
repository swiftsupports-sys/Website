import { marqueeHeading, targetEmployers } from "@/content/companies";

/**
 * Scrolling strip of employer names — plain text, never logos (see the note in
 * content/companies.ts).
 *
 * No JavaScript: the row is rendered twice and translated by exactly -50%, so
 * the second copy lands where the first began and the loop is seamless. The
 * duplicate is `aria-hidden` so the list is announced once, and the whole
 * thing holds still under prefers-reduced-motion.
 */
function Row({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-x-12 pr-12 md:gap-x-16 md:pr-16"
      aria-hidden={duplicate || undefined}
    >
      {targetEmployers.map((name) => (
        <li
          key={name}
          className="text-[1.0625rem] font-semibold tracking-[-0.01em] whitespace-nowrap text-text-secondary transition-colors duration-200 hover:text-brand-navy lg:text-lg"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

export function EmployerStrip() {
  return (
    <section
      aria-labelledby="employers-heading"
      className="border-b border-border bg-background py-9 md:py-11"
    >
      <div className="shell">
        <h2
          id="employers-heading"
          className="mb-6 text-center text-[0.9375rem] font-medium text-text-secondary"
        >
          {marqueeHeading}
        </h2>
      </div>

      {/* Full-bleed, so names travel the width of the viewport and fade out at
          each edge rather than being clipped against it. */}
      <div className="relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="animate-employer-scroll flex w-max">
          <Row />
          <Row duplicate />
        </div>
      </div>
    </section>
  );
}
