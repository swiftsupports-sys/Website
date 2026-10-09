import { packages } from "@/content/packages";

/**
 * Handling of the model's booking marker — `[[book]]`, or `[[book:ID]]` with
 * a package id — in the Swift Agent widget.
 *
 * The free model tends to append the marker whenever a consultation comes up,
 * including when it is merely offering one. So the widget only opens the form
 * when the marker is backed by something concrete: the visitor asked, the
 * visitor said yes to an offer, or the reply itself says a form is opening.
 */

const MARKER = /\[\[\s*book(?:\s*:\s*([a-z-]+))?\s*\]\]/i;
const MARKERS = /\[\[\s*book(?:\s*:\s*[a-z-]+)?\s*\]\]/gi;

/** A marker cut off mid-stream, such as "[[bo" or "[[book:comp". */
const PARTIAL_MARKER = /\[(?:\[(?:\s*b(?:o(?:o(?:k(?:\s*:\s*[a-z-]*)?\s*\]?)?)?)?)?)?$/i;

/** The visitor asked to book or to reach a person. */
const ASKS_TO_BOOK =
  /\b(book|booking|sign (me )?up|signup|register|enrol+|appointment|consult(ation)?|call me|talk to|speak (to|with)|contact (me|you)|get started|next step|human|real person|representative)\b/i;

/** A short affirmative, as in "yes please" after an offer. */
const SAYS_YES =
  /^\s*(yes|yeah|yep|yup|sure|ok(ay)?|please|go ahead|sounds good|let'?s (do it|go)|i'?m in|absolutely|definitely|of course|ready)\b/i;

/** The reply tells the visitor a form is opening. */
const ANNOUNCES_FORM = /\bform\b[^.!?\n]{0,40}\b(open|below)/i;

/** Reply text without the marker — including a partial one mid-stream. */
export function visibleText(raw: string) {
  return raw.replace(MARKERS, "").replace(PARTIAL_MARKER, "").replace(/\s+$/, "");
}

/** The package named in the reply's marker, as a display name, if any. */
export function bookedPackage(raw: string): string | undefined {
  const id = raw.match(MARKER)?.[1]?.toLowerCase();
  return packages.find((p) => p.id === id)?.name;
}

/**
 * Whether a finished reply should open the booking form.
 *
 * @param raw the full reply, marker included
 * @param visitor the visitor message it answers
 * @param previousReply the assistant message before that, if any
 */
export function shouldOpenBooking(raw: string, visitor: string, previousReply = "") {
  if (!MARKER.test(raw)) return false;
  if (ANNOUNCES_FORM.test(visibleText(raw)) || ASKS_TO_BOOK.test(visitor)) return true;
  return SAYS_YES.test(visitor) && /\b(consult|book)/i.test(previousReply);
}
