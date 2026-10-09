"use server";

import { headers } from "next/headers";

import { deliverConsultation } from "@/lib/consultation-delivery";
import {
  consultationSchema,
  isHoneypotFilled,
  type ConsultationResult,
} from "@/lib/schemas";
import { verifyTurnstile } from "@/lib/turnstile";

/**
 * Handles a consultation request: validate → verify the visitor → email the
 * team → send the candidate a confirmation. Server Actions are reachable by
 * direct POST, so every check here runs regardless of what the browser did.
 *
 * No database, no account, no resume upload — the enquiry is delivered by
 * email and nothing is stored by the site.
 */
export async function submitConsultation(
  raw: unknown,
): Promise<ConsultationResult> {
  // Honeypot first — the schema would reject it, which tells a bot it was
  // caught. Accept silently instead, and send nothing.
  if (isHoneypotFilled(raw)) return { ok: true };

  const parsed = consultationSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      message:
        "Some details did not look right. Please review the form and try again.",
    };
  }

  const data = parsed.data;

  const headerList = await headers();
  const remoteIp =
    headerList.get("cf-connecting-ip") ??
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim();

  const turnstile = await verifyTurnstile(data.turnstileToken, remoteIp);
  if (!turnstile.ok) {
    console.error("[consultation] turnstile rejected:", turnstile.reason);
    return {
      ok: false,
      message:
        "We could not verify your browser session. Please refresh the page and try again.",
    };
  }

  return deliverConsultation(data, "form");
}
