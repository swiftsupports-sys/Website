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
          background: "#F8FAFC",
          color: "#1E293B",
          fontFamily:
            "'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.75rem",
              margin: 0,
              letterSpacing: "-0.01em",
              color: "#0B1F3A",
              fontWeight: 600,
            }}
          >
            This page didn&apos;t load properly.
          </h1>
          <p style={{ color: "#475569", marginTop: "0.9rem" }}>
            The problem is on our side. Please try again.
          </p>
          {error.digest ? (
            <p style={{ color: "#64748B", fontSize: "0.8rem" }}>
              Reference: {error.digest}
            </p>
          ) : null}
          <button
            onClick={reset}
            style={{
              marginTop: "1.6rem",
              padding: "0.85rem 1.5rem",
              borderRadius: "6px",
              border: "none",
              background: "#2563EB",
              color: "#FFFFFF",
              fontWeight: 500,
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
