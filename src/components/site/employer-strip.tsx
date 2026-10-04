import { marqueeHeading, targetEmployers } from "@/content/companies";

/**
 * Static, ruled grid of employer names — plain text, never logos (see the note
 * in content/companies.ts). Static on purpose: a credibility section should be
 * read at a glance, not chased across the screen.
 */
export function EmployerStrip() {
  return (
    <section
      aria-labelledby="employers-heading"
      className="border-b border-border bg-background py-12 md:py-16"
    >
      <div className="shell">
        <h2
          id="employers-heading"
          className="mb-8 text-center text-[1rem] font-medium tracking-normal text-text-body"
        >
          {marqueeHeading}
        </h2>

        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-7">
          {targetEmployers.map((name) => (
            <li
              key={name}
              className="grid min-h-18 place-items-center bg-surface px-3 py-4 text-center text-[0.9375rem] font-semibold lg:text-[1rem] tracking-[-0.01em] text-text-secondary"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
