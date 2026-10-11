"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The home hero's background: a still image, with a muted looping video laid
 * over it where the video is worth its cost.
 *
 * The still (passed as `children`, a priority `next/image`) is the opening
 * frame of the clip. It paints first and stays as the LCP element; the video
 * fades in only once it is actually playing, so there is no blank moment and
 * no visible jump. Phones, data-saver connections, and visitors who prefer
 * reduced motion get the still alone.
 *
 * A pause button is offered whenever the video runs (WCAG 2.2.2: motion that
 * starts automatically and lasts over five seconds must be pausable), and the
 * clip also pauses itself while the hero is scrolled out of view.
 */

const VIDEO_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(VIDEO_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function videoAllowed() {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection?.saveData;
  return window.matchMedia(VIDEO_QUERY).matches && saveData !== true;
}

export function HeroMedia({
  children,
  videoSrc,
  mediaClassName,
}: {
  children: React.ReactNode;
  videoSrc: string;
  /** object-position classes, shared with the still so the two line up. */
  mediaClassName?: string;
}) {
  // False on the server and during hydration, so the markup always matches.
  const enabled = React.useSyncExternalStore(subscribe, videoAllowed, () => false);

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const pausedByVisitor = React.useRef(false);
  const [playing, setPlaying] = React.useState(false);
  const [paused, setPaused] = React.useState(false);

  // Off screen, nobody is watching: pause, and resume on return unless the
  // visitor paused it themselves.
  React.useEffect(() => {
    const video = videoRef.current;
    if (!enabled || !video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
      else if (!pausedByVisitor.current) video.play().catch(() => {});
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [enabled]);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByVisitor.current = false;
      setPaused(false);
      video.play().catch(() => {});
    } else {
      pausedByVisitor.current = true;
      setPaused(true);
      video.pause();
    }
  }

  return (
    <>
      {/* Settles in with a slow, slight zoom-out on load (globals.css). */}
      <div className="animate-hero-settle absolute inset-0 -z-20">
        {children}
        {enabled ? (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setPlaying(true)}
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out",
              playing ? "opacity-100" : "opacity-0",
              mediaClassName,
            )}
          />
        ) : null}
      </div>

      {enabled ? (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? "Play background video" : "Pause background video"}
          className="absolute right-4 bottom-4 z-10 grid size-10 cursor-pointer place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20 sm:right-6 sm:bottom-6"
        >
          {paused ? (
            <Play className="size-4 fill-current" strokeWidth={0} aria-hidden="true" />
          ) : (
            <Pause className="size-4 fill-current" strokeWidth={0} aria-hidden="true" />
          )}
        </button>
      ) : null}
    </>
  );
}
