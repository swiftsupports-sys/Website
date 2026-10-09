/**
 * Request guards for the Swift Agent endpoints.
 *
 * `createRateLimiter` is a fixed-window limiter held in server memory.
 *
 * Best effort by design: each server instance keeps its own counts and they
 * reset on redeploy, so it caps casual abuse and runaway loops rather than a
 * determined attacker. Move to a shared store (e.g. Upstash Redis) if the
 * agent ever sees real abuse.
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function take(key: string): { ok: boolean; retryAfterSeconds: number } {
    const now = Date.now();

    // Opportunistic cleanup keeps the map from growing without bound.
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    }

    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return { ok: true, retryAfterSeconds: 0 };
    }

    if (entry.count >= limit) {
      return { ok: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
    }

    entry.count += 1;
    return { ok: true, retryAfterSeconds: 0 };
  };
}

/** The visitor's IP as reported by the hosting proxy, for rate-limit keys. */
export function clientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

/**
 * Whether a request came from this site. Browsers always send Origin on
 * cross-site POSTs, so a foreign Origin means another site is calling in.
 */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
