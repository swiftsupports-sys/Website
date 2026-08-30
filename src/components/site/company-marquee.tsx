import { marqueeHeading, targetEmployers } from "@/content/companies";

/**
 * Continuously scrolling strip of employer names.
 *
 * No JavaScript: the track is rendered twice and translated by exactly -50%,
 * so the second copy lands where the first began and the loop is seamless.
 * `aria-hidden` on the duplicate keeps screen readers from reading the list
 * twice, and the whole thing stops moving under prefers-reduced-motion.
 */
function Track({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-x-14 pr-14 md:gap-x-20 md:pr-20"
      aria-hidden={duplicate || undefined}
    >
      {targetEmployers.map((name) => (
        <li
          key={name}
          className="font-display text-lg font-bold tracking-[-0.02em] whitespace-nowrap text-fg-faint transition-colors duration-300 hover:text-fg md:text-xl"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

export function CompanyMarquee() {
  return (
    <section
      aria-label="Employers candidates commonly target"
      className="border-y border-hair bg-paper-alt py-9 md:py-11"
    >
      <p className="shell mb-7 text-center font-display text-[0.72rem] font-bold tracking-[0.16em] text-fg-muted uppercase">
        {marqueeHeading}
      </p>

      {/* Edge fade so names emerge and disappear rather than being clipped. */}
      <div className="relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max">
          <Track />
          <Track duplicate />
        </div>
      </div>

    </section>
  );
}
