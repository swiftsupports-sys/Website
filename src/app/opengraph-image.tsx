import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name} — career consultancy for US technology roles`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="8" fill="#2563EB"/>
  <path d="M18 38 L32 22 L46 38" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="square"/>
  <path d="M18 50 L32 34 L46 50" fill="none" stroke="#BFDBFE" stroke-width="6" stroke-linecap="square"/>
</svg>`;

/**
 * Social sharing card. Generated at build time so it always matches the live
 * brand colours and copy — Next also reuses this for the Twitter card.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B1F3A",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          borderTop: "8px solid #2563EB",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={56}
            height={56}
            alt=""
            src={`data:image/svg+xml;base64,${Buffer.from(mark).toString("base64")}`}
          />
          <div style={{ fontSize: 34, fontWeight: 700, color: "#fff", letterSpacing: -0.5 }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: -1.5,
              lineHeight: 1.12,
              maxWidth: 900,
              color: "#fff",
            }}
          >
            Build Your Career at Leading US Companies.
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 26,
              color: "#CBD5E1",
              maxWidth: 880,
              lineHeight: 1.45,
            }}
          >
            Candidate marketing, recruiter networking, role-specific training, interview
            preparation, and mentorship.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              background: "#2563EB",
              color: "#fff",
              fontSize: 22,
              fontWeight: 600,
              padding: "16px 30px",
              borderRadius: 6,
              display: "flex",
            }}
          >
            Book a Free Consultation
          </div>
          <div style={{ fontSize: 22, color: "#94A3B8", display: "flex" }}>
            {site.domain}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
