"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { CalendarCheck, CircleCheck, Mail, RotateCcw, SendHorizontal, Square, X } from "lucide-react";

import { WhatsAppIcon } from "@/components/site/brand";
import { Button } from "@/components/ui/button";
import {
  Checkbox,
  Field,
  FieldError,
  Input,
  Label,
  Req,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form-controls";
import { bookedPackage, shouldOpenBooking, visibleText } from "@/lib/agent/booking-marker";
import {
  MAX_USER_MESSAGE,
  type AgentChatMessage,
  type AgentErrorBody,
  type AgentEvent,
  type BookingResponse,
  type ChatTranscript,
} from "@/lib/agent/protocol";
import {
  consultationSchema,
  experienceLevels,
  packageInterests,
  targetDomains,
} from "@/lib/schemas";
import { hasWhatsApp, site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Swift Agent — floating chat assistant, mounted once in the root layout so a
 * conversation survives page navigation. Questions go to /api/agent; bookings
 * go through an inline form to /api/agent/book, never through the model.
 */

type Item = {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** Shown in the window but never sent to the model (greeting, notices). */
  local?: boolean;
  error?: boolean;
  /** Offer WhatsApp and email buttons under this message. */
  contact?: boolean;
  /** A booking form card, and whether it has been submitted. */
  booking?: "open" | "sent";
  /** Package to preselect in that form — the one the agent recommended. */
  pkg?: string;
};

const STORAGE_KEY = "swift-agent:v2";

const WELCOME: Item = {
  id: "welcome",
  role: "assistant",
  local: true,
  content:
    "Hi, I'm **Swift Agent** — I help tech professionals land jobs in the US. Tell me the role you're aiming for and I'll point you to the right package, or ask me anything.",
};

const BOOK_LABEL = "Book a free consultation";
const BOOK_INTRO =
  "Great — share a few details below and our team will reach out within one business day to set up your free consultation.";

const SUGGESTIONS = [
  "Which package is right for me?",
  "How soon could I start getting interviews?",
  "What's in the Complete Career Package?",
  BOOK_LABEL,
];

/** Set once the proactive greeting has shown, so it appears once per visit. */
const TEASER_KEY = "swift-agent:teaser";

const newId = () => Math.random().toString(36).slice(2, 10);

export function SwiftAgent() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const restoredRef = useRef(false);
  const titleId = useId();
  const pathname = usePathname();
  const [teaser, setTeaser] = useState<string | null>(null);

  // A one-time greeting per visit, sooner on the pages where visitors compare
  // packages. Skipped entirely when storage is unavailable, so it can never
  // reappear on every page.
  useEffect(() => {
    if (open) return;
    try {
      if (sessionStorage.getItem(TEASER_KEY)) return;
    } catch {
      return;
    }
    const comparing = /^\/(pricing|services)/.test(pathname);
    const timer = window.setTimeout(
      () => {
        try {
          sessionStorage.setItem(TEASER_KEY, "1");
        } catch {
          /* shown once anyway */
        }
        setTeaser(
          comparing
            ? "Not sure which package fits you? I can help you choose in under a minute."
            : "Looking for a tech job in the US? Tell me your goal and I'll suggest the right package.",
        );
      },
      comparing ? 12_000 : 30_000,
    );
    return () => window.clearTimeout(timer);
  }, [pathname, open]);

  // Restore this tab's conversation the first time the chat opens. Storage can
  // be unavailable (private mode, blocked site data) — it starts fresh then.
  function openChat() {
    if (!restoredRef.current) {
      restoredRef.current = true;
      try {
        const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null") as Item[] | null;
        if (Array.isArray(saved) && saved.length > 0) setItems(saved);
      } catch {
        /* start fresh */
      }
    }
    setTeaser(null);
    setOpen(true);
  }

  // Saved only after the restore, so the greeting never overwrites a chat.
  useEffect(() => {
    if (streaming || !restoredRef.current) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* not persisted */
    }
  }, [items, streaming]);

  // Keep the latest message in view as text streams in.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [items, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const patchLast = (patch: (item: Item) => Item) =>
    setItems((prev) => {
      const next = prev.slice();
      next[next.length - 1] = patch(next[next.length - 1]);
      return next;
    });

  /** Adds a booking form to the chat, unless one is already waiting. */
  function openBooking(fromVisitor = false, pkg?: string) {
    setItems((prev) => {
      if (prev.some((i) => i.booking === "open")) return prev;
      return [
        ...prev,
        ...(fromVisitor
          ? [
              { id: newId(), role: "user" as const, local: true, content: BOOK_LABEL },
              { id: newId(), role: "assistant" as const, local: true, content: BOOK_INTRO },
            ]
          : []),
        { id: newId(), role: "assistant", local: true, content: "", booking: "open", pkg },
      ];
    });
  }

  const markBooked = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, booking: "sent" } : i)));

  /** The visible conversation, sent with a booking as context for the team. */
  const transcript = (): ChatTranscript =>
    items
      .filter((i) => !i.local && !i.error && !i.booking && i.content.trim())
      .slice(-16)
      .map((i) => ({ role: i.role, content: i.content.slice(0, 2000) }));

  async function send(text: string) {
    const content = text.trim().slice(0, MAX_USER_MESSAGE);
    if (!content || streaming) return;

    const userItem: Item = { id: newId(), role: "user", content };
    const previousReply =
      [...items].reverse().find((i) => i.role === "assistant" && !i.booking)?.content ?? "";
    const history: AgentChatMessage[] = [...items, userItem]
      .filter((i) => !i.local && !i.error && i.content.trim())
      .map((i) => ({ role: i.role, content: i.content }));

    setItems((prev) => [...prev, userItem, { id: newId(), role: "assistant", content: "" }]);
    setInput("");
    resizeInput(true);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;
    let raw = "";

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const body = (await res.json().catch(() => null)) as AgentErrorBody | null;
        patchLast((i) => ({
          ...i,
          local: true,
          contact: true,
          error: body?.error !== "offline",
          content:
            body?.error === "offline"
              ? "Swift Agent is offline at the moment, but our team is happy to help directly — reach us below and we'll get back to you within one business day."
              : (body?.message ?? "Sorry — I couldn't reach the server. Please try again."),
        }));
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newline: number;
        while ((newline = buffer.indexOf("\n")) >= 0) {
          const line = buffer.slice(0, newline).trim();
          buffer = buffer.slice(newline + 1);
          if (!line) continue;

          const event = JSON.parse(line) as AgentEvent;
          if (event.t === "text") {
            raw += event.v;
            const shown = visibleText(raw);
            patchLast((i) => ({ ...i, content: shown }));
          } else if (event.t === "error") {
            const shown = visibleText(raw);
            patchLast((i) => ({
              ...i,
              local: true,
              error: !shown,
              contact: event.contact,
              content: shown ? `${shown}\n\n${event.v}` : event.v,
            }));
          }
        }
      }

      // The model asked for the booking form: open it under this reply.
      if (shouldOpenBooking(raw, content, previousReply)) {
        if (!visibleText(raw)) patchLast((i) => ({ ...i, content: BOOK_INTRO }));
        openBooking(false, bookedPackage(raw));
      }
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        // Stopped by the visitor: keep what arrived, drop an empty bubble.
        setItems((prev) => {
          const last = prev[prev.length - 1];
          return last?.role === "assistant" && !last.content ? prev.slice(0, -1) : prev;
        });
      } else {
        patchLast((i) => ({
          ...i,
          local: true,
          error: true,
          content: "Sorry — the connection dropped. Please try again.",
        }));
      }
    } finally {
      abortRef.current = null;
      setStreaming(false);
    }
  }

  function reset() {
    abortRef.current?.abort();
    setItems([WELCOME]);
    setInput("");
    inputRef.current?.focus();
  }

  function resizeInput(clear = false) {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    if (!clear) el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  }

  const last = items[items.length - 1];
  const waiting = streaming && last?.role === "assistant" && !last.content;
  const showSuggestions = !items.some((i) => i.role === "user");
  const bookingOpen = items.some((i) => i.booking === "open");

  return (
    <>
      {!open ? (
        <button
          ref={launcherRef}
          type="button"
          onClick={openChat}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label="Open Swift Agent chat"
          className="fixed right-4 bottom-4 z-75 flex items-center gap-2.5 rounded-md border border-brand-blue bg-brand-blue p-2.5 font-medium text-white shadow-overlay transition-colors duration-200 hover:border-brand-blue-hover hover:bg-brand-blue-hover sm:right-6 sm:bottom-6 sm:py-2.5 sm:pr-4 sm:pl-3"
        >
          <Image src="/brand/logo-mark-white.svg" alt="" width={30} height={30} unoptimized className="size-7.5" />
          <span className="hidden text-[0.9375rem] sm:inline">Ask Swift Agent</span>
        </button>
      ) : null}

      {teaser && !open ? (
        <div
          role="status"
          className="fixed right-4 bottom-36 z-75 w-[min(19rem,calc(100vw-2rem))] rounded-lg border border-border bg-surface shadow-overlay sm:right-6 sm:bottom-40"
        >
          <button
            type="button"
            onClick={openChat}
            className="flex w-full items-start gap-3 rounded-lg p-3.5 pr-10 text-left text-[0.9375rem] leading-snug text-text-body transition-colors hover:bg-brand-blue-light"
          >
            <Image src="/brand/logo-mark.svg" alt="" width={32} height={32} unoptimized className="size-8 shrink-0" />
            <span>
              <span className="block font-semibold text-brand-navy">Swift Agent</span>
              {teaser}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setTeaser(null)}
            className="absolute top-2 right-2 grid size-7 place-items-center rounded-md text-text-secondary hover:bg-muted hover:text-brand-navy"
            aria-label="Dismiss"
          >
            <X className="size-4" strokeWidth={2} />
          </button>
        </div>
      ) : null}

      {open ? (
        <section
          role="dialog"
          aria-labelledby={titleId}
          className="fixed inset-0 z-95 flex flex-col bg-surface sm:inset-auto sm:right-6 sm:bottom-6 sm:h-[min(680px,calc(100dvh-3rem))] sm:w-[400px] sm:overflow-hidden sm:rounded-lg sm:border sm:border-border sm:shadow-overlay"
        >
          {/* Header */}
          <header className="flex items-center gap-3 bg-brand-navy px-4 pt-[max(0.875rem,env(safe-area-inset-top))] pb-3.5 text-white">
            <Image src="/brand/logo-mark-white.svg" alt="" width={36} height={36} unoptimized className="size-9" />
            <div className="min-w-0 flex-1">
              <h2 id={titleId} className="text-base leading-tight font-semibold text-white">
                Swift Agent
              </h2>
              <p className="text-[0.8125rem] text-white/70">AI assistant · {site.name}</p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="grid size-9 place-items-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Start a new chat"
              title="New chat"
            >
              <RotateCcw className="size-4.5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={close}
              className="grid size-9 place-items-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X className="size-5" strokeWidth={2} />
            </button>
          </header>

          {/* Messages */}
          <div
            ref={listRef}
            aria-live="polite"
            aria-busy={streaming}
            className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-muted/40 px-4 py-4"
          >
            {items.map((item) => {
              if (item.booking) {
                return (
                  <BookingCard
                    key={item.id}
                    sent={item.booking === "sent"}
                    initialPackage={item.pkg}
                    getTranscript={transcript}
                    onSent={() => markBooked(item.id)}
                  />
                );
              }
              if (item.role === "user") {
                return (
                  <div key={item.id} className="flex justify-end">
                    <p className="max-w-[85%] rounded-lg rounded-br-sm bg-brand-blue px-3.5 py-2.5 text-[0.9375rem] leading-relaxed break-words whitespace-pre-wrap text-white">
                      {item.content}
                    </p>
                  </div>
                );
              }
              if (!item.content) return null;
              return (
                <div key={item.id} className="flex flex-col items-start gap-2">
                  <div
                    className={cn(
                      "max-w-[90%] rounded-lg rounded-bl-sm border bg-surface px-3.5 py-2.5 text-[0.9375rem] leading-relaxed break-words text-text-body",
                      item.error ? "border-red-200 bg-red-50 text-red-900" : "border-border",
                    )}
                  >
                    <RichText text={item.content} onNavigate={() => window.innerWidth < 640 && close()} />
                  </div>
                  {item.contact ? <ContactButtons /> : null}
                </div>
              );
            })}

            {waiting ? (
              <div
                className="flex w-fit items-center gap-1.5 rounded-lg rounded-bl-sm border border-border bg-surface px-3.5 py-3.5"
                aria-label="Swift Agent is typing"
              >
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="size-1.5 rounded-full bg-text-secondary motion-safe:animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            ) : null}

            {showSuggestions ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => (s === BOOK_LABEL ? openBooking(true) : send(s))}
                    className="rounded-full border border-brand-blue-border bg-surface px-3 py-1.5 text-left text-[0.875rem] font-medium text-brand-blue-hover transition-colors hover:bg-brand-blue-light"
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border bg-surface px-3 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          >
            {!bookingOpen && !showSuggestions ? (
              <button
                type="button"
                onClick={() => openBooking(true)}
                className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-brand-blue-border px-3 py-1 text-[0.8125rem] font-medium text-brand-blue-hover transition-colors hover:bg-brand-blue-light"
              >
                <CalendarCheck className="size-3.5" strokeWidth={2} aria-hidden="true" />
                {BOOK_LABEL}
              </button>
            ) : null}
            <div className="flex items-end gap-2">
              <label htmlFor={`${titleId}-input`} className="sr-only">
                Message Swift Agent
              </label>
              <textarea
                id={`${titleId}-input`}
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={MAX_USER_MESSAGE}
                onChange={(e) => {
                  setInput(e.target.value);
                  resizeInput();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask about packages, roles, or booking…"
                className="max-h-32 min-h-11 flex-1 resize-none rounded-md border border-border-strong bg-surface px-3.5 py-2.5 text-[0.9375rem] text-brand-navy placeholder:text-text-secondary focus:border-brand-blue focus:outline-none"
              />
              {streaming ? (
                <button
                  type="button"
                  onClick={() => abortRef.current?.abort()}
                  className="grid size-11 shrink-0 place-items-center rounded-md border border-border-strong bg-surface text-brand-navy transition-colors hover:bg-brand-blue-light"
                  aria-label="Stop generating"
                >
                  <Square className="size-4 fill-current" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="grid size-11 shrink-0 place-items-center rounded-md bg-brand-blue text-white transition-colors hover:bg-brand-blue-hover disabled:opacity-50"
                  aria-label="Send message"
                >
                  <SendHorizontal className="size-5" strokeWidth={2} />
                </button>
              )}
            </div>
            <p className="mt-2 text-center text-[0.75rem] leading-snug text-text-secondary">
              AI assistant — it can make mistakes. Please don&apos;t share passwords or payment details.
            </p>
          </form>
        </section>
      ) : null}
    </>
  );
}

/* ------------------------------------------------------------ booking */

type BookingFields = {
  packageInterest: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  domain: string;
  role: string;
  /** Honeypot — hidden from people, filled by bots. */
  companyWebsite: string;
};

const EMPTY_BOOKING: BookingFields = {
  packageInterest: "",
  fullName: "",
  email: "",
  phone: "",
  experience: "",
  domain: "",
  role: "",
  companyWebsite: "",
};

/**
 * The consultation form, inside the chat. Validated with the contact page's
 * schema and posted straight to the team with the chat for context — the AI
 * never sees these details.
 */
function BookingCard({
  sent,
  initialPackage,
  getTranscript,
  onSent,
}: {
  sent: boolean;
  initialPackage?: string;
  getTranscript: () => ChatTranscript;
  onSent: () => void;
}) {
  const [values, setValues] = useState<BookingFields>({
    ...EMPTY_BOOKING,
    packageInterest: initialPackage ?? "",
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const uid = useId();

  if (sent) {
    return (
      <div className="flex items-start gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-[0.875rem] text-emerald-900">
        <CircleCheck className="mt-0.5 size-4.5 shrink-0" strokeWidth={2.2} aria-hidden="true" />
        <span>
          <strong className="block font-semibold">Consultation request sent</strong>
          Our team will reach out within one business day. A confirmation email is on its way to you.
        </span>
      </div>
    );
  }

  const set = (key: keyof BookingFields) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (sending) return;

    const parsed = consultationSchema.safeParse({
      ...values,
      packageInterest: values.packageInterest || undefined,
      role: values.role || undefined,
      companyWebsite: values.companyWebsite || undefined,
      consent,
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      return;
    }

    setErrors({});
    setServerError("");
    setSending(true);
    try {
      const res = await fetch("/api/agent/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, transcript: getTranscript() }),
      });
      const body = (await res.json().catch(() => null)) as BookingResponse | null;
      if (body?.ok) onSent();
      else setServerError(body?.message ?? "Something went wrong. Please try again.");
    } catch {
      setServerError("We couldn't reach the server. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const id = (name: string) => `${uid}-${name}`;

  return (
    <form
      onSubmit={submit}
      noValidate
      aria-label="Book a free consultation"
      className="space-y-3 rounded-lg border border-brand-blue-border bg-surface p-4"
    >
      <p className="flex items-center gap-2 font-semibold text-brand-navy">
        <CalendarCheck className="size-4.5 text-brand-blue" strokeWidth={2} aria-hidden="true" />
        Book your free consultation
      </p>

      <Field>
        <Label htmlFor={id("package")}>Package you&apos;re interested in</Label>
        <Select value={values.packageInterest} onValueChange={set("packageInterest")}>
          <SelectTrigger id={id("package")}>
            <SelectValue placeholder="Select a package" />
          </SelectTrigger>
          <SelectContent>
            {packageInterests.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <Label htmlFor={id("name")}>
          Full name
          <Req />
        </Label>
        <Input
          id={id("name")}
          autoComplete="name"
          value={values.fullName}
          onChange={(e) => set("fullName")(e.target.value)}
          aria-invalid={!!errors.fullName}
        />
        <FieldError>{errors.fullName}</FieldError>
      </Field>

      <Field>
        <Label htmlFor={id("email")}>
          Email
          <Req />
        </Label>
        <Input
          id={id("email")}
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => set("email")(e.target.value)}
          aria-invalid={!!errors.email}
        />
        <FieldError>{errors.email}</FieldError>
      </Field>

      <Field>
        <Label htmlFor={id("phone")}>
          Phone / WhatsApp
          <Req />
        </Label>
        <Input
          id={id("phone")}
          type="tel"
          autoComplete="tel"
          placeholder="+1 (000) 000-0000"
          value={values.phone}
          onChange={(e) => set("phone")(e.target.value)}
          aria-invalid={!!errors.phone}
        />
        <FieldError>{errors.phone}</FieldError>
      </Field>

      <Field>
        <Label htmlFor={id("experience")}>
          Experience level
          <Req />
        </Label>
        <Select value={values.experience} onValueChange={set("experience")}>
          <SelectTrigger id={id("experience")} aria-invalid={!!errors.experience}>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            {experienceLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError>{errors.experience}</FieldError>
      </Field>

      <Field>
        <Label htmlFor={id("domain")}>
          Target domain
          <Req />
        </Label>
        <Select value={values.domain} onValueChange={set("domain")}>
          <SelectTrigger id={id("domain")} aria-invalid={!!errors.domain}>
            <SelectValue placeholder="Select a domain" />
          </SelectTrigger>
          <SelectContent>
            {targetDomains.map((domain) => (
              <SelectItem key={domain} value={domain}>
                {domain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError>{errors.domain}</FieldError>
      </Field>

      <Field>
        <Label htmlFor={id("role")}>Desired role</Label>
        <Input
          id={id("role")}
          placeholder="e.g. Java Developer"
          value={values.role}
          onChange={(e) => set("role")(e.target.value)}
        />
      </Field>

      {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <input
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={(e) => set("companyWebsite")(e.target.value)}
        />
      </div>

      <div>
        <label className="flex items-start gap-2.5 text-[0.875rem] text-text-body">
          <Checkbox
            checked={consent}
            onCheckedChange={(v) => {
              setConsent(v === true);
              setErrors((e) => ({ ...e, consent: undefined }));
            }}
            aria-invalid={!!errors.consent}
          />
          You may contact me about my free consultation.
        </label>
        <FieldError>{errors.consent}</FieldError>
      </div>

      {serverError ? (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-[0.875rem] text-red-800">
          {serverError}
        </p>
      ) : null}

      <Button type="submit" block disabled={sending}>
        {sending ? "Sending…" : "Request free consultation"}
      </Button>
      <p className="text-center text-[0.75rem] text-text-secondary">
        Your details and this chat go straight to our team — not to the AI.
      </p>
    </form>
  );
}

/* ------------------------------------------------------------ pieces */

function ContactButtons() {
  return (
    <div className="flex flex-wrap gap-2">
      {hasWhatsApp ? (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-[0.875rem] font-medium text-brand-navy hover:bg-brand-blue-light"
        >
          <WhatsAppIcon className="size-4.5 text-[#128C7E]" />
          WhatsApp {site.phoneDisplay}
        </a>
      ) : null}
      <a
        href={`mailto:${site.email}`}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-[0.875rem] font-medium text-brand-navy hover:bg-brand-blue-light"
      >
        <Mail className="size-4.5 text-brand-blue" strokeWidth={1.8} />
        {site.email}
      </a>
    </div>
  );
}

/**
 * Renders the small Markdown subset the agent is asked to use — paragraphs,
 * "- " bullets, **bold**, and [label](href) links — as React elements, so no
 * model output is ever injected as HTML. Only site paths, https, and mailto
 * links become anchors.
 */
function RichText({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  const blocks = text.split(/\n{2,}/).filter((b) => b.trim());

  return (
    <div className="space-y-2">
      {blocks.map((block, bi) => {
        const lines = block.split("\n").filter((l) => l.trim());
        const bullets = lines.every((l) => /^\s*[-*•]\s+/.test(l));
        const numbered = lines.every((l) => /^\s*\d+[.)]\s+/.test(l));

        if (bullets || numbered) {
          const List = numbered ? "ol" : "ul";
          return (
            <List key={bi} className={cn("space-y-1 pl-5", numbered ? "list-decimal" : "list-disc")}>
              {lines.map((l, li) => (
                <li key={li}>{inline(l.replace(/^\s*([-*•]|\d+[.)])\s+/, ""), onNavigate)}</li>
              ))}
            </List>
          );
        }

        return (
          <p key={bi}>
            {lines.map((l, li) => (
              <Fragment key={li}>
                {li > 0 ? <br /> : null}
                {inline(l, onNavigate)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function inline(text: string, onNavigate: () => void): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) out.push(text.slice(lastIndex, match.index));
    const key = `${match.index}`;

    if (match[1] !== undefined) {
      out.push(
        <strong key={key} className="font-semibold text-brand-navy">
          {match[1]}
        </strong>,
      );
    } else {
      const [, , label, href] = match;
      const linkClass = "font-medium text-brand-blue underline underline-offset-2 hover:text-brand-blue-hover";
      if (href.startsWith("/") && !href.startsWith("//")) {
        out.push(
          <Link key={key} href={href} onClick={onNavigate} className={linkClass}>
            {label}
          </Link>,
        );
      } else if (href.startsWith("https://") || href.startsWith("mailto:")) {
        out.push(
          <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {label}
          </a>,
        );
      } else {
        out.push(label);
      }
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) out.push(text.slice(lastIndex));
  return out;
}
