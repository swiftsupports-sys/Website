const VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Server-side Turnstile verification.
 *
 * Cloudflare requires the token to be validated on the server — a token that is
 * only checked in the browser proves nothing. When no secret is configured
 * (local development), verification is skipped so the form stays testable.
 */
export async function verifyTurnstile(
  token: string | undefined,
  remoteIp?: string,
): Promise<{ ok: boolean; reason?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      // Fail closed in production rather than accepting unverified traffic.
      return { ok: false, reason: "turnstile-not-configured" };
    }
    return { ok: true };
  }

  if (!token) return { ok: false, reason: "missing-token" };

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const res = await fetch(VERIFY_URL, { method: "POST", body });
    const data = (await res.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };

    return data.success
      ? { ok: true }
      : { ok: false, reason: data["error-codes"]?.join(",") ?? "verification-failed" };
  } catch {
    return { ok: false, reason: "verification-request-failed" };
  }
}
