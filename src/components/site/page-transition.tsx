import { ViewTransition } from "react";

/**
 * Page-to-page transition: the outgoing page fades out quickly and the new
 * one rises gently into place (the keyframes live in globals.css under
 * "Page transitions"). The header and chat launcher are named separately and
 * held still, so only the content moves.
 *
 * Used from `template.tsx` files rather than the layout: templates remount on
 * navigation, which is what fires enter and exit. Browsers without the View
 * Transitions API simply swap the page, exactly as before.
 *
 * `default="none"` keeps every other update on the page — accordions, form
 * state, the chat — from triggering a transition.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
