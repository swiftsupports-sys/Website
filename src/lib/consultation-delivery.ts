import { Resend } from "resend";

import type { ChatTranscript } from "@/lib/agent/protocol";
import { confirmationEmail, teamEmail } from "@/lib/emails";
import type { ConsultationInput, ConsultationResult } from "@/lib/schemas";
import { site } from "@/lib/site";

/** Where enquiries land unless CONSULTATION_INBOX overrides it. */
const TEAM_INBOX = "team@swiftconsultancy.us";

/**
 * Emails a validated consultation request to the team, then sends the
 * candidate a confirmation. Shared by the contact form and Swift Agent, so
 * both channels deliver identical emails. Callers validate and verify first.
 *
 * Server-only: reads secrets from the environment.
 */
export async function deliverConsultation(
  data: ConsultationInput,
  source: "form" | "agent",
  transcript: ChatTranscript = [],
): Promise<ConsultationResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONSULTATION_INBOX || TEAM_INBOX;
  const from = process.env.CONSULTATION_FROM;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "production") {
      console.error(`[consultation:${source}] email delivery is not configured`);
      return {
        ok: false,
        message: `Our form is temporarily unavailable. Please email us directly at ${site.email}.`,
      };
    }

    // Local development without credentials: log and report demo mode so the
    // flow can be exercised end to end.
    console.info(`[consultation:${source}] demo mode — enquiry not sent:`, {
      ...data,
      turnstileToken: undefined,
      transcriptMessages: transcript.length,
    });
    return { ok: true, demo: true };
  }

  const resend = new Resend(apiKey);

  try {
    const team = teamEmail(data, transcript);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: source === "agent" ? `${team.subject} · via Swift Agent` : team.subject,
      html: team.html,
      text: team.text,
    });

    if (error) {
      console.error(`[consultation:${source}] resend error:`, error);
      return {
        ok: false,
        message: `We could not send your request. Please email us directly at ${site.email}.`,
      };
    }
  } catch (error) {
    console.error(`[consultation:${source}] unexpected error:`, error);
    return {
      ok: false,
      message: `Something went wrong on our side. Please email us directly at ${site.email}.`,
    };
  }

  // The team already has the enquiry, so a failed confirmation is logged
  // rather than reported to the visitor as a failed submission.
  try {
    const confirmation = confirmationEmail(data, to);
    const { error } = await resend.emails.send({
      from,
      to: data.email,
      replyTo: to,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
    if (error) console.error(`[consultation:${source}] confirmation email error:`, error);
  } catch (error) {
    console.error(`[consultation:${source}] confirmation email failed:`, error);
  }

  return { ok: true };
}
