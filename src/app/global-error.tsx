"use client";

/**
 * Last-resort boundary: catches failures in the root layout itself, so it must
 * render its own <html> and <body> and cannot rely on shared chrome or styles.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#101210",
          color: "#F7F7F2",
          fontFamily:
            "'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.75rem", margin: 0, letterSpacing: "-0.02em" }}>
            This page didn&apos;t load properly.
          </h1>
          <p style={{ color: "rgba(247,247,242,0.66)", marginTop: "0.9rem" }}>
            The problem is on our side. Please try again.
          </p>
          {error.digest ? (
            <p style={{ color: "rgba(247,247,242,0.4)", fontSize: "0.8rem" }}>
              Reference: {error.digest}
            </p>
          ) : null}
          <button
            onClick={reset}
            style={{
              marginTop: "1.6rem",
              padding: "0.85rem 1.5rem",
              borderRadius: "999px",
              border: "none",
              background: "#35E852",
              color: "#0b0b0b",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
