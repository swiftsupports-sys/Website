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
    <section className="section bg-surface">
      <div className="shell text-center">
        <p className="text-[0.9375rem] font-semibold text-brand-blue">Something went wrong</p>
        <h1 className="h-page mx-auto mt-3 max-w-[22ch]">
          This page didn&apos;t load properly.
        </h1>
        <p className="lead mx-auto mt-5 max-w-[52ch] text-text-body">
          The problem is on our side, not yours. Try again — and if it keeps
          happening, email us and we will pick the conversation up there.
        </p>
        {error.digest ? (
          <p className="mt-4 text-[0.8125rem] text-text-secondary">
            Reference: {error.digest}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button asChild variant="secondary">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
