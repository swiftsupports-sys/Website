"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import {
  consultationSchema,
  type ConsultationResult,
} from "@/lib/schemas";
import { site } from "@/lib/site";
import { verifyTurnstile } from "@/lib/turnstile";

/**
 * Handles a consultation request: validate → verify the visitor → email the
 * team. Server Actions are reachable by direct POST, so every check here runs
 * regardless of what the browser did.
 *
 * No database, no account, no resume upload — the enquiry is delivered by
 * email and nothing is stored by the site.
 */
export async function submitConsultation(
  raw: unknown,
): Promise<ConsultationResult> {
  const parsed = consultationSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      message:
        "Some details did not look right. Please review the form and try again.",
    };
  }

  const data = parsed.data;

  // Honeypot: silently accept so bots do not learn they were caught.
  if (data.companyWebsite) return { ok: true };

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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONSULTATION_INBOX ?? site.email;
  const from = process.env.CONSULTATION_FROM;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "production") {
      console.error("[consultation] email delivery is not configured");
      return {
        ok: false,
        message: `Our form is temporarily unavailable. Please email us directly at ${site.email}.`,
      };
    }

    // Local development without credentials: log and report demo mode so the
    // flow can be exercised end to end.
    console.info("[consultation] demo mode — enquiry not sent:", {
      ...data,
      turnstileToken: undefined,
    });
    return { ok: true, demo: true };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Consultation request — ${data.fullName} (${data.domain})`,
      text: buildEmailBody(data),
    });

    if (error) {
      console.error("[consultation] resend error:", error);
      return {
        ok: false,
        message: `We could not send your request. Please email us directly at ${site.email}.`,
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("[consultation] unexpected error:", error);
    return {
      ok: false,
      message: `Something went wrong on our side. Please email us directly at ${site.email}.`,
    };
  }
}

function buildEmailBody(data: {
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  domain: string;
  role?: string;
  preferredTime?: string;
  message?: string;
}) {
  return [
    "New consultation request",
    "",
    `Name:              ${data.fullName}`,
    `Email:             ${data.email}`,
    `Phone / WhatsApp:  ${data.phone}`,
    `Experience level:  ${data.experience}`,
    `Target domain:     ${data.domain}`,
    `Desired role:      ${data.role || "—"}`,
    `Preferred time:    ${data.preferredTime || "—"}`,
    "",
    "Career expectations / message:",
    data.message || "—",
    "",
    `Received: ${new Date().toISOString()}`,
  ].join("\n");
}
