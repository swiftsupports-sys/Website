import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name} — career consultancy for US technology roles`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#101210",
          padding: "74px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -380,
            right: -260,
            width: 900,
            height: 900,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(53,232,82,0.30), rgba(53,232,82,0) 62%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#35E852",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
              color: "#0b0b0b",
            }}
          >
            ^
          </div>
          <div style={{ fontSize: 34, fontWeight: 800, color: "#fff", letterSpacing: -1 }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Satori needs single-child text nodes, so the two-tone headline is
              split into stacked lines rather than an inline span. */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 74,
              fontWeight: 800,
              letterSpacing: -2.6,
              lineHeight: 1.08,
              maxWidth: 940,
            }}
          >
            <div style={{ color: "#fff" }}>Build Your Career at</div>
            <div style={{ color: "#35E852" }}>Leading US Companies.</div>
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 25,
              color: "rgba(244,244,241,0.68)",
              maxWidth: 860,
              lineHeight: 1.45,
            }}
          >
            Candidate marketing, recruiter networking, role-specific training, interview
            preparation, and mentorship.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              background: "#35E852",
              color: "#0b0b0b",
              fontSize: 21,
              fontWeight: 800,
              padding: "15px 30px",
              borderRadius: 999,
              display: "flex",
            }}
          >
            Book a Free Consultation
          </div>
          <div style={{ fontSize: 20, color: "rgba(244,244,241,0.5)", display: "flex" }}>
            {site.domain}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
