import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name} — IT staffing and career consulting in the USA`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social sharing card. Generated at build time so it always matches the live
 * brand colours and copy — Next also reuses this for the Twitter card.
 */
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-white.svg"), "base64");

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
        <div style={{ display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img width={274} height={88} alt="" src={`data:image/svg+xml;base64,${logo}`} />
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
            Land Your Next Tech Role in the US.
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
            Resume and profile building, 40+ targeted applications daily,
            role-specific training, and interview preparation.
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
