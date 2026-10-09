import { clientIp, createRateLimiter, sameOrigin } from "@/lib/agent/guards";
import { transcriptSchema, type BookingResponse } from "@/lib/agent/protocol";
import { deliverConsultation } from "@/lib/consultation-delivery";
import { consultationSchema, isHoneypotFilled } from "@/lib/schemas";
import { site } from "@/lib/site";

/**
 * Consultation requests from the Swift Agent booking form. Same validation
 * and delivery as the contact page, so the team receives identical emails;
 * the details go straight to email and are never sent to the AI model.
 */

/** Per-IP cap on bookings — each one sends two emails. */
const bookingLimit = createRateLimiter({ limit: 3, windowMs: 60 * 60_000 });

export async function POST(request: Request) {
  if (!sameOrigin(request)) return reply(403, { ok: false, message: "Not allowed." });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply(400, { ok: false, message: "Invalid request." });
  }

  // Honeypot first — the schema would reject it, which tells a bot it was
  // caught. Accept silently instead, and send nothing.
  if (isHoneypotFilled(body)) return reply(200, { ok: true });

  const parsed = consultationSchema.safeParse(body);
  if (!parsed.success) {
    return reply(400, {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Please check your details and try again.",
    });
  }

  if (!bookingLimit(clientIp(request)).ok) {
    return reply(429, {
      ok: false,
      message: `You've sent a few requests already — please email us at ${site.email} and we'll take it from there.`,
    });
  }

  // The chat is context for the team, not a requirement: a malformed one is
  // dropped rather than failing the booking.
  const transcript = transcriptSchema.safeParse((body as { transcript?: unknown }).transcript);
  const result = await deliverConsultation(
    parsed.data,
    "agent",
    transcript.success ? transcript.data : [],
  );
  return result.ok ? reply(200, { ok: true }) : reply(502, { ok: false, message: result.message });
}

function reply(status: number, body: BookingResponse) {
  return Response.json(body, { status });
}
