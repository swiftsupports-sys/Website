import Groq from "groq-sdk";

import { AGENT_SYSTEM_PROMPT } from "@/lib/agent/knowledge";
import {
  MAX_HISTORY,
  agentRequestSchema,
  type AgentChatMessage,
  type AgentErrorBody,
  type AgentEvent,
} from "@/lib/agent/protocol";
import { clientIp, createRateLimiter, sameOrigin } from "@/lib/agent/guards";

/**
 * Swift Agent — the site's chat assistant.
 *
 * POST { messages } → a stream of newline-delimited AgentEvent JSON. Runs on
 * Groq's free tier (an open model; GROQ_MODEL overrides the default) and
 * answers from the site's own content (lib/agent/knowledge.ts). Bookings go
 * through /api/agent/book, never through the model.
 */

export const maxDuration = 30;

const DEFAULT_MODEL = "openai/gpt-oss-120b";

/** Per-IP cap; the free tier's daily quota is shared by every visitor. */
const chatLimit = createRateLimiter({ limit: 20, windowMs: 10 * 60_000 });

// One retry, and a per-attempt timeout, so a busy free tier fails over to the
// contact buttons well inside maxDuration instead of timing out mid-reply.
let client: Groq | null = null;
const getClient = () => (client ??= new Groq({ maxRetries: 1, timeout: 20_000 }));

export async function POST(request: Request) {
  // Refusing foreign origins stops other sites spending this agent's quota.
  if (!sameOrigin(request)) {
    return errorResponse(403, { error: "forbidden", message: "Not allowed." });
  }

  if (!process.env.GROQ_API_KEY) {
    return errorResponse(503, { error: "offline", message: "Swift Agent is offline right now." });
  }

  const limit = chatLimit(clientIp(request));
  if (!limit.ok) {
    return errorResponse(
      429,
      {
        error: "rate_limited",
        message: "You're sending messages quickly — please wait a few minutes and try again.",
      },
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, { error: "invalid", message: "Invalid request." });
  }

  const parsed = agentRequestSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(400, {
      error: "invalid",
      message: parsed.error.issues[0]?.message ?? "Invalid request.",
    });
  }

  const history = trimHistory(parsed.data.messages);
  const model = process.env.GROQ_MODEL || DEFAULT_MODEL;
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: AgentEvent) => {
        try {
          controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
        } catch {
          // The visitor closed the widget; nothing left to deliver to.
        }
      };

      try {
        const completion = await getClient().chat.completions.create(
          {
            model,
            messages: [{ role: "system", content: AGENT_SYSTEM_PROMPT }, ...history],
            stream: true,
            temperature: 0.3,
            max_completion_tokens: 700,
            // gpt-oss reasons before answering; keep that short (it counts
            // against the daily token quota) and out of the reply stream.
            ...(model.startsWith("openai/gpt-oss")
              ? { reasoning_effort: "low" as const, include_reasoning: false }
              : {}),
          },
          { signal: request.signal },
        );

        let wroteText = false;
        for await (const chunk of completion) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) {
            wroteText = true;
            send({ t: "text", v: delta });
          }
        }

        if (!wroteText) {
          send({ t: "error", v: "Sorry — I didn't catch that. Could you rephrase your question?" });
        }
      } catch (error) {
        if (!request.signal.aborted) {
          console.error("[agent] request failed:", error);
          send(friendlyError(error));
        }
      } finally {
        send({ t: "done" });
        try {
          controller.close();
        } catch {
          // Already closed by a disconnect.
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}

/** Keeps the most recent turns, starting on a visitor message. */
function trimHistory(messages: AgentChatMessage[]): AgentChatMessage[] {
  const recent = messages.slice(-MAX_HISTORY);
  const firstUser = recent.findIndex((m) => m.role === "user");
  return recent.slice(firstUser);
}

function friendlyError(error: unknown): AgentEvent {
  // 429 here usually means the free tier's daily allowance is used up.
  if (error instanceof Groq.RateLimitError) {
    return {
      t: "error",
      v: "Swift Agent has reached its limit for now. Our team is happy to help directly:",
      contact: true,
    };
  }
  if (error instanceof Groq.APIError && error.status !== undefined && error.status >= 500) {
    return {
      t: "error",
      v: "Swift Agent is very busy right now. Please try again in a minute, or reach our team directly:",
      contact: true,
    };
  }
  return {
    t: "error",
    v: "Sorry — something went wrong on our side. Please try again, or reach our team directly:",
    contact: true,
  };
}

function errorResponse(status: number, body: AgentErrorBody, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}
