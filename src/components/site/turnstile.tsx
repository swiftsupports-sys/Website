"use client";

import * as React from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "auto" | "light" | "dark";
          appearance?: "always" | "execute" | "interaction-only";
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

/**
 * Cloudflare Turnstile widget.
 *
 * Renders nothing when no site key is configured, so local development and
 * previews work without Cloudflare credentials.
 *
 * Setting the site key without also setting TURNSTILE_SECRET_KEY is the one
 * broken state: the widget renders and issues tokens the server has no way to
 * verify, so the action rejects every submission. Set both, or neither.
 */
export function Turnstile({
  onToken,
  resetSignal,
}: {
  onToken: (token: string) => void;
  /** Increment to reset the widget after a submission. */
  resetSignal: number;
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const widgetIdRef = React.useRef<string | undefined>(undefined);
  const [ready, setReady] = React.useState(false);
  // Held in a ref so re-renders of the parent form never re-create the widget.
  const onTokenRef = React.useRef(onToken);
  React.useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  React.useEffect(() => {
    if (!siteKey || !ready || !containerRef.current) return;
    if (widgetIdRef.current !== undefined) return;

    widgetIdRef.current = window.turnstile?.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token) => onTokenRef.current(token),
      "expired-callback": () => onTokenRef.current(""),
      "error-callback": () => onTokenRef.current(""),
      theme: "light",
    });
  }, [siteKey, ready]);

  React.useEffect(() => {
    if (resetSignal === 0 || widgetIdRef.current === undefined) return;
    window.turnstile?.reset(widgetIdRef.current);
    onTokenRef.current("");
  }, [resetSignal]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        // Not lazyOnload: the visitor cannot submit until the widget has issued
        // a token, so it should not queue behind everything else on the page.
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
      <div ref={containerRef} className="min-h-16.25" />
    </>
  );
}
