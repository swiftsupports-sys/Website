import { z } from "zod";

/**
 * Wire format between the Swift Agent widget and /api/agent.
 *
 * The browser sends the visible conversation as plain text; the server
 * streams back newline-delimited JSON events. Bookings never go through the
 * model: when a reply carries a booking marker (see lib/agent/booking-marker),
 * the widget opens a form that posts straight to /api/agent/book, so a
 * visitor's contact details are not sent to the AI provider.
 */

/** Longest single visitor message, mirrored by the widget's textarea. */
export const MAX_USER_MESSAGE = 1000;

/**
 * Most turns sent per request; older ones are dropped, oldest first. Kept
 * small because the free model tier is metered in tokens per minute.
 */
export const MAX_HISTORY = 8;

export const agentRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(4000),
      }),
    )
    .min(1)
    .max(60)
    .refine((m) => m[m.length - 1].role === "user", "The last message must be from the visitor.")
    .refine(
      (m) => m.every((x) => x.role !== "user" || x.content.length <= MAX_USER_MESSAGE),
      `Messages are limited to ${MAX_USER_MESSAGE} characters.`,
    ),
});

export type AgentChatMessage = z.infer<typeof agentRequestSchema>["messages"][number];

export type AgentEvent =
  /** A chunk of the assistant's reply. */
  | { t: "text"; v: string }
  /** The reply failed; `v` is safe to show. `contact` offers WhatsApp/email. */
  | { t: "error"; v: string; contact?: boolean }
  | { t: "done" };

/** Body of a non-streaming error response (4xx/5xx). */
export type AgentErrorBody = {
  error: "offline" | "rate_limited" | "invalid" | "forbidden";
  message: string;
};

/**
 * The visible chat, sent with an agent booking so the team sees what the
 * visitor asked before they call. Capped so a booking stays one email.
 */
export const transcriptSchema = z
  .array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string().max(2000),
    }),
  )
  .max(20);

export type ChatTranscript = z.infer<typeof transcriptSchema>;

/** Response from /api/agent/book. */
export type BookingResponse = { ok: true } | { ok: false; message: string };
