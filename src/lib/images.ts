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
    /**
     * Full-bleed behind the headline, so the composition matters: the subject
     * sits in the right half and the left is quiet, which is what lets the
     * scrim darken for the copy without covering a face.
     *
     * Keep that weighting if you replace it, and rename the file — the image
     * optimizer and any CDN cache per path, so reusing this name will keep
     * serving the old photograph.
     */
    src: "/images/hero-session-hd.jpg",
    alt: "A career consultant leading a session at a whiteboard",
    width: 3840,
    height: 2561,
  },
  mentorship: {
    // Pre-cropped to 4:5 to match the frame it renders in, so the browser does
    // no further cropping and both people stay in shot.
    src: "/images/mentorship-consultation.jpg",
    alt: "A career consultant talking a candidate through their plan in a one-to-one session",
    width: 1600,
    height: 2000,
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
