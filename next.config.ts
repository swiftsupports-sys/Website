import type { NextConfig } from "next";

/**
 * Baseline security headers for a public marketing site.
 *
 * A Content-Security-Policy is deliberately not set here: Next injects inline
 * bootstrap scripts, so a useful policy needs per-request nonces from
 * middleware. Adding one with 'unsafe-inline' would look protective while
 * allowing exactly what CSP exists to stop. See README for the nonce recipe.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    // All photography is served from /public/images, so no remote hosts are
    // allowed through the optimizer.
    formats: ["image/avif", "image/webp"],
    // 75 is the default; 82 is used for the hero, which is the LCP image and
    // the first thing a visitor judges the brand on.
    qualities: [75, 82],
  },
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
