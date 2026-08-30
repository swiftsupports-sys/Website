"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Route-level error boundary. Static marketing pages rarely throw, but a failed
 * server action or a hydration fault should still land somewhere branded rather
 * than on the stock Next.js error screen.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="bg-ink py-32 text-white md:py-44">
      <div className="shell text-center">
        <p className="font-display text-[0.76rem] font-bold tracking-[0.16em] text-accent uppercase">
          Something went wrong
        </p>
        <h1 className="h-xl mx-auto mt-5 max-w-[18ch]">
          This page didn&apos;t load properly.
        </h1>
        <p className="lead mx-auto mt-5 max-w-[52ch] text-white/70">
          The problem is on our side, not yours. Try again — and if it keeps
          happening, email us and we will pick the conversation up there.
        </p>
        {error.digest ? (
          <p className="mt-4 text-[0.78rem] text-white/40">
            Reference: {error.digest}
          </p>
        ) : null}
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <Button onClick={reset}>Try again</Button>
          <Button asChild variant="outlineDark">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
