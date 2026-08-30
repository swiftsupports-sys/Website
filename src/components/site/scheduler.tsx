"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

/**
 * Optional Cal.com booking embed.
 *
 * Renders nothing unless NEXT_PUBLIC_CAL_LINK is set (e.g. "swift/consultation"),
 * so the contact page works fine before a scheduling account exists. The embed
 * script is only fetched once a visitor opts in by clicking — booking is a
 * minority path, and this keeps a third-party bundle off the critical path for
 * everyone who just uses the form.
 */
export function Scheduler({ calLink }: { calLink: string }) {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const slot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !slot.current) return;

    const frame = document.createElement("iframe");
    frame.src = `https://cal.com/${calLink}?embed=true&theme=light`;
    frame.title = "Consultation booking calendar";
    frame.loading = "lazy";
    frame.className = "h-[620px] w-full rounded-(--radius-lg) border-0 bg-white";
    frame.onerror = () => setFailed(true);

    const node = slot.current;
    node.replaceChildren(frame);
    return () => node.replaceChildren();
  }, [open, calLink]);

  return (
    <div className="mt-7 rounded-(--radius-xl2) border border-hair bg-white p-6 shadow-soft md:p-8">
      <h2 className="h-sm font-display font-extrabold">Rather Pick a Time Now?</h2>
      <p className="mt-2.5 text-[0.93rem] text-fg-muted">
        Choose a slot that suits you and we will confirm it by email. The form is
        still the best route if you would like us to read your background first.
      </p>

      {open ? (
        <>
          <div ref={slot} className="mt-5" aria-live="polite" />
          {failed ? (
            <p className="mt-3 text-[0.85rem] text-fg-muted">
              The calendar could not load. Please use the form or email us instead.
            </p>
          ) : null}
        </>
      ) : (
        <Button className="mt-5" variant="outline" onClick={() => setOpen(true)}>
          <CalendarDays className="size-4.5" strokeWidth={1.9} aria-hidden="true" />
          Open the booking calendar
        </Button>
      )}
    </div>
  );
}
