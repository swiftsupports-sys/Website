/**
 * PLACEHOLDER PHOTOGRAPHY — stock photos from Unsplash, used under the
 * Unsplash License (free for commercial use, no attribution required). The
 * newer entries note their Unsplash photo id so the source can be traced.
 *
 * These files live in `public/images/` and are served locally — no remote
 * image host, no `remotePatterns` configuration, and nothing that can break
 * if a third party changes a URL. `next/image` handles resizing and AVIF/WebP
 * conversion at request time.
 *
 * To use your own photography: replace the files in `public/images/` under a
 * new name (the optimizer caches per path), update the paths here, and correct
 * the alt text and intrinsic dimensions below to match the new files.
 */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position for cropped frames; defaults to centre. */
  position?: string;
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
    // The opening frame of the hero video (Mixkit clip 4341), so the still
    // and the clip match exactly when the video fades in over it.
    src: "/images/hero-manhattan-poster.jpg",
    alt: "The Manhattan skyline in New York under moving clouds",
    width: 1920,
    height: 1080,
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

  /* Page banners and service pages ----------------------------------- */

  // photo-1573164713988-8665fc963095
  servicesHero: {
    src: "/images/services-tech-careers.jpg",
    alt: "Two technology professionals with laptops walking through a data centre",
    width: 2000,
    height: 1335,
    position: "62% center",
  },
  // photo-1551836022-d5d88e9218df
  interviewPreparation: {
    src: "/images/interview-preparation.jpg",
    alt: "A consultant taking notes during a one-to-one practice interview",
    width: 2000,
    height: 1333,
  },
  // photo-1586281380349-632531db7ed4
  resumeReview: {
    src: "/images/resume-review.jpg",
    alt: "A resume on a clipboard beside a laptop, ready for review",
    width: 2000,
    height: 1333,
    position: "40% center",
  },
  // photo-1551434678-e076c223a692
  candidateMarketing: {
    src: "/images/candidate-marketing.jpg",
    alt: "Two professionals working through applications at their desks",
    width: 2000,
    height: 1333,
    position: "70% center",
  },
  // photo-1531482615713-2afd69097998
  trainingMentorship: {
    src: "/images/training-mentorship.jpg",
    alt: "A mentor and a candidate working through code together on a laptop",
    width: 2000,
    height: 1333,
    position: "68% center",
  },
  // photo-1522202176988-66273c2fd55f
  successCandidates: {
    src: "/images/success-candidates.jpg",
    alt: "Three technology professionals talking and laughing around their laptops",
    width: 2000,
    height: 1333,
  },
  // photo-1573497491208-6b1acb260507
  contactConsultation: {
    src: "/images/contact-consultation.jpg",
    alt: "A consultant and a candidate in conversation at a table by the window",
    width: 2000,
    height: 1333,
  },
} as const satisfies Record<string, Photo>;
