import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen icon. Apple touch icons must be raster, so this is generated
 * as a PNG at build time rather than served as SVG like the browser favicon.
 */
export default function AppleIcon() {
  const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <path d="M52 106 L90 62 L128 106" fill="none" stroke="#FFFFFF" stroke-width="17" stroke-linecap="square"/>
  <path d="M52 140 L90 96 L128 140" fill="none" stroke="#60A5FA" stroke-width="17" stroke-linecap="square"/>
</svg>`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0B1F3A",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={180}
          height={180}
          alt=""
          src={`data:image/svg+xml;base64,${Buffer.from(mark).toString("base64")}`}
        />
      </div>
    ),
    size,
  );
}
