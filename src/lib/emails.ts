import type { ChatTranscript } from "@/lib/agent/protocol";
import type { ConsultationInput } from "@/lib/schemas";
import { site } from "@/lib/site";

/**
 * Email bodies for the consultation form: one to the team, one confirmation
 * to the candidate. Each has an HTML version and a plain-text fallback.
 *
 * Inline styles and tables only — email clients ignore stylesheets and most
 * modern layout. Every visitor-supplied value goes through `esc`.
 */

type Enquiry = Omit<ConsultationInput, "consent" | "companyWebsite" | "turnstileToken">;

const navy = "#0b1f3a";
const blue = "#2563eb";
const muted = "#5b6474";

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function layout(title: string, inner: string) {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;color:${navy};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e3e7ee;">
        <tr><td style="background:${navy};padding:20px 28px;color:#ffffff;font-size:18px;font-weight:bold;">${esc(site.name)}</td></tr>
        <tr><td style="padding:28px;font-size:15px;line-height:1.6;">${inner}</td></tr>
        <tr><td style="padding:16px 28px;border-top:1px solid #e3e7ee;font-size:12px;color:${muted};">
          ${esc(site.name)} · <a href="${site.url}" style="color:${muted};">${esc(site.domain)}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function fields(data: Enquiry): [string, string][] {
  return [
    ["Name", data.fullName],
    ["Email", data.email],
    ["Phone / WhatsApp", data.phone],
    ["Experience level", data.experience],
    ["Target domain", data.domain],
    ["Package interest", data.packageInterest || "—"],
    ["Desired role", data.role || "—"],
    ["Preferred time", data.preferredTime || "—"],
  ];
}

/* ----------------------------------------------------------- team email */

export function teamEmail(data: Enquiry, transcript: ChatTranscript = []) {
  const subject = `New consultation request — ${data.fullName} (${data.domain})`;
  const speaker = (role: "user" | "assistant") => (role === "user" ? "Visitor" : "Swift Agent");
  // The agent writes light Markdown; emails show it as plain text.
  const plain = (text: string) =>
    text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1 ($2)");

  // The conversation that led to an agent booking, so the team can prepare.
  const chatHtml = transcript.length
    ? `<h2 style="margin:24px 0 8px;font-size:16px;">Chat with Swift Agent</h2>` +
      transcript
        .map(
          (m) =>
            `<p style="margin:0 0 10px;white-space:pre-wrap;"><strong style="color:${m.role === "user" ? blue : muted};">${speaker(m.role)}:</strong> ${esc(plain(m.content))}</p>`,
        )
        .join("")
    : "";

  const rows = fields(data)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:${muted};white-space:nowrap;vertical-align:top;">${esc(label)}</td><td style="padding:6px 0;font-weight:bold;">${esc(value)}</td></tr>`,
    )
    .join("");

  const html = layout(
    subject,
    `<h1 style="margin:0 0 16px;font-size:20px;">New consultation request</h1>
     <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:15px;">${rows}</table>
     <h2 style="margin:24px 0 8px;font-size:16px;">Career expectations / message</h2>
     <p style="margin:0;white-space:pre-wrap;">${esc(data.message || "—")}</p>
     ${chatHtml}
     <p style="margin:24px 0 0;font-size:13px;color:${muted};">Reply to this email to respond to ${esc(data.fullName)} directly.</p>`,
  );

  const text = [
    "New consultation request",
    "",
    ...fields(data).map(([label, value]) => `${`${label}:`.padEnd(19)}${value}`),
    "",
    "Career expectations / message:",
    data.message || "—",
    ...(transcript.length
      ? ["", "Chat with Swift Agent:", ...transcript.map((m) => `${speaker(m.role)}: ${plain(m.content)}`)]
      : []),
    "",
    `Received: ${new Date().toISOString()}`,
  ].join("\n");

  return { subject, html, text };
}

/* ------------------------------------------------------ candidate email */

export function confirmationEmail(data: Enquiry, replyTo: string) {
  const firstName = data.fullName.split(/\s+/)[0];
  const pkg = data.packageInterest && data.packageInterest !== "Not sure yet" ? data.packageInterest : "";
  const subject = `We've received your consultation request — ${site.name}`;

  const steps = [
    ["We review your details", "A consultant reads your background, target role, and goals before reaching out."],
    ["We confirm a time", "Within one business day, we'll contact you to schedule your free consultation."],
    ["We talk it through", "We'll discuss where you are, where you want to be, and recommend the package that fits."],
  ];

  const html = layout(
    subject,
    `<h1 style="margin:0 0 16px;font-size:20px;">Thank you, ${esc(firstName)}!</h1>
     <p style="margin:0 0 16px;">We've received your request for a free career consultation for <strong>${esc(data.domain)}</strong>${data.role ? ` (${esc(data.role)})` : ""}${pkg ? `, focused on the <strong>${esc(pkg)}</strong>` : ""}. Here's what happens next:</p>
     <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
       ${steps
         .map(
           ([title, body], i) =>
             `<tr><td style="padding:8px 14px 8px 0;vertical-align:top;color:${blue};font-weight:bold;font-size:18px;">0${i + 1}</td><td style="padding:8px 0;"><strong>${title}</strong><br><span style="color:${muted};">${body}</span></td></tr>`,
         )
         .join("")}
     </table>
     <p style="margin:0 0 16px;">In the meantime, you can review our packages and what each one includes:</p>
     <p style="margin:0 0 24px;"><a href="${site.url}/pricing" style="display:inline-block;background:${blue};color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:6px;font-weight:bold;">View Packages</a></p>
     <p style="margin:0 0 4px;">Have a question before we speak? Just reply to this email.</p>
     <p style="margin:16px 0 0;">Best regards,<br><strong>The ${esc(site.name)} Team</strong><br><a href="mailto:${esc(replyTo)}" style="color:${blue};">${esc(replyTo)}</a></p>`,
  );

  const text = [
    `Thank you, ${firstName}!`,
    "",
    `We've received your request for a free career consultation for ${data.domain}${data.role ? ` (${data.role})` : ""}${pkg ? `, focused on the ${pkg}` : ""}.`,
    "",
    "What happens next:",
    ...steps.map(([title, body], i) => `  ${i + 1}. ${title} — ${body}`),
    "",
    `Review our packages: ${site.url}/pricing`,
    "",
    "Have a question before we speak? Just reply to this email.",
    "",
    "Best regards,",
    `The ${site.name} Team`,
    replyTo,
  ].join("\n");

  return { subject, html, text };
}
