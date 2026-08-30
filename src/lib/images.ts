/**
 * PLACEHOLDER PHOTOGRAPHY.
 *
 * These files live in `public/images/` and are served locally — no remote
 * image host, no `remotePatterns` configuration, and nothing that can break
 * if a third party changes a URL. `next/image` handles resizing and AVIF/WebP
 * conversion at request time.
 *
 * To use your own photography: replace the files in `public/images/` keeping
 * the same names (or update the paths here), and correct the alt text and
 * intrinsic dimensions below to match the new files.
 */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const photos = {
  hero: {
    // Composed with the subject in the right half so the headline and CTAs on
    // the left sit over quiet background rather than across a face. Replacing
    // it? Keep that weighting, and rename the file so the optimizer cache and
    // any CDN pick the new image up.
    src: "/images/hero-session-hd.jpg",
    alt: "A career consultant leading a session at a whiteboard",
    width: 3840,
    height: 2561,
  },
  mentorship: {
    // Pre-cropped to 4:5 to match the frame it renders in, so the browser does
    // no further cropping and both people stay in shot.
    src: "/images/mentorship-session.jpg",
    alt: "A consultant and a candidate working through a career plan together at a laptop",
    width: 1000,
    height: 1250,
  },
  roadmap: {
    src: "/images/roadmap.jpg",
    alt: "A consultant and candidate reviewing a career roadmap",
    width: 1600,
    height: 1067,
  },
  workspace: {
    src: "/images/workspace.jpg",
    alt: "A workspace set up for a remote interview",
    width: 1600,
    height: 1067,
  },
  team: {
    src: "/images/team.jpg",
    alt: "Technology professionals collaborating around a shared screen",
    width: 1600,
    height: 1067,
  },
} as const satisfies Record<string, Photo>;
