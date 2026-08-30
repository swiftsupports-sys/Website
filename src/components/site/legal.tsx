import * as React from "react";

/**
 * Shared shell for the three legal pages. Keeps the prose measure, spacing,
 * and callout treatment identical across them.
 *
 * `notice` is optional: pass a short summary box where one helps the reader,
 * or omit it entirely.
 */
export function LegalBody({
  updated,
  notice,
  children,
}: {
  updated: string;
  notice?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[78ch] [&_h2]:mt-12 [&_h2]:mb-3.5 [&_h2]:text-[1.4rem] [&_h2:first-of-type]:mt-0 [&_h3]:mt-7 [&_h3]:mb-2.5 [&_h3]:text-[1.06rem] [&_li]:text-fg-muted [&_p]:mb-3.5 [&_p]:text-fg-muted [&_ul]:mb-4 [&_ul]:grid [&_ul]:list-disc [&_ul]:gap-2.25 [&_ul]:pl-5.5">
      <p className="text-[0.86rem] text-fg-faint">Last updated: {updated}</p>

      {notice ? (
        <div className="my-6 rounded-r-[10px] border-l-[3px] border-accent bg-paper-alt px-5.5 py-4.5 text-[0.93rem] text-fg-muted">
          {notice}
        </div>
      ) : null}

      {children}
    </div>
  );
}

/** Short plain-language summary shown above a policy. */
export function InShort({ children }: { children: React.ReactNode }) {
  return (
    <>
      <strong className="text-fg">In short.</strong> {children}
    </>
  );
}
