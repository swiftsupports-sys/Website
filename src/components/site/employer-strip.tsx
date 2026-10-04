import { marqueeHeading, targetEmployers } from "@/content/companies";

/**
 * Scrolling strip of employer names — plain text in ruled cells, never logos
 * (see the note in content/companies.ts).
 *
 * No JavaScript: the row is rendered twice and translated by exactly -50%, so
 * the second copy lands where the first began and the loop is seamless. The
 * duplicate is `aria-hidden` so the list is announced once, and the whole
 * thing holds still under prefers-reduced-motion.
 */
function Row({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="flex shrink-0" aria-hidden={duplicate || undefined}>
      {targetEmployers.map((name) => (
        <li
          key={name}
          className="grid min-h-18 w-44 place-items-center border-r border-border bg-surface px-3 py-4 text-center text-[0.9375rem] font-semibold tracking-[-0.01em] text-text-secondary lg:w-52 lg:text-[1rem]"
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
      className="border-b border-border bg-background py-12 md:py-16"
    >
      <div className="shell">
        <h2
          id="employers-heading"
          className="mb-8 text-center text-[1rem] font-medium tracking-normal text-text-body"
        >
          {marqueeHeading}
        </h2>
      </div>

      {/* Full-bleed so names travel the width of the viewport, with the ruled
          frame kept by a border on the track itself. */}
      <div className="border-y border-border">
        <div className="relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="animate-employer-scroll flex w-max">
            <Row />
            <Row duplicate />
          </div>
        </div>
      </div>
    </section>
  );
}
