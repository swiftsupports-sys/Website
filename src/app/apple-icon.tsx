import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen icon. Apple touch icons must be raster, so this is generated
 * as a PNG at build time rather than served as SVG like the browser favicon.
 * iOS rounds the corners itself, so the tile is a plain white square.
 */
export default async function AppleIcon() {
  const mark = await readFile(join(process.cwd(), "public/brand/logo-mark.svg"), "base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width={148} height={148} alt="" src={`data:image/svg+xml;base64,${mark}`} />
      </div>
    ),
    size,
  );
}
