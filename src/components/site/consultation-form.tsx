"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { CircleCheck } from "lucide-react";

import { Turnstile } from "@/components/site/turnstile";
import { Button } from "@/components/ui/button";
import {
  Checkbox,
  Field,
  FieldError,
  FieldHint,
  Input,
  Label,
  Req,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui/form-controls";
import { submitConsultation } from "@/app/actions/consultation";
import {
  consultationSchema,
  consultationTimes,
  experienceLevels,
  targetDomains,
  type ConsultationInput,
} from "@/lib/schemas";

export function ConsultationForm() {
  const [sent, setSent] = React.useState<{ demo: boolean } | null>(null);

  // Remounting on success gives a pristine form — values, errors, and the
  // Radix select state all start clean if the visitor sends another request.
  if (sent) {
    return <SentPanel demo={sent.demo} onReset={() => setSent(null)} />;
  }

  return <FormBody onSent={setSent} />;
}

function SentPanel({ demo, onReset }: { demo: boolean; onReset: () => void }) {
  const ref = React.useRef<HTMLDivElement>(null);

  // The panel is much shorter than the form it replaces, so without this the
  // visitor can be left looking at the empty space where the form used to be.
  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ref.current?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "center",
    });
  }, []);

  return (
    <div ref={ref} className="py-4 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent/15 text-accent-deep">
        <CircleCheck className="size-7" strokeWidth={1.8} aria-hidden="true" />
      </span>
      <h3 className="h-md mt-5" role="status">
        Request received
      </h3>
      <p className="mx-auto mt-3 max-w-[46ch] text-fg-muted">
        Thank you — a consultant will review your details and contact you to
        confirm a time, usually within one business day.
      </p>
      {demo ? (
        <p className="mx-auto mt-3 max-w-[46ch] text-[0.84rem] text-fg-faint">
          Demo mode: add email credentials to deliver submissions.
        </p>
      ) : null}
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button type="button" variant="outline" onClick={onReset}>
          Send another request
        </Button>
        <Button asChild variant="dark">
          <Link href="/how-it-works">See What Happens Next</Link>
        </Button>
      </div>
    </div>
  );
}

function FormBody({ onSent }: { onSent: (state: { demo: boolean }) => void }) {
  const [pending, startTransition] = React.useTransition();
  const [resetSignal, setResetSignal] = React.useState(0);
  const [status, setStatus] = React.useState<{
    tone: "ok" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    // Every field is listed so `reset()` after a successful submit returns the
    // whole form — including the Radix selects and checkbox — to its blank state.
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      role: "",
      message: "",
      consent: false,
      companyWebsite: "",
      turnstileToken: "",
    },
  });

  const onSubmit = (values: ConsultationInput) => {
    startTransition(async () => {
      const result = await submitConsultation(values);

      if (result.ok) {
        toast.success("Consultation request sent");
        reset();
        onSent({ demo: result.demo === true });
      } else {
        setStatus({ tone: "error", message: result.message });
        toast.error("We could not send your request");
      }

      setResetSignal((n) => n + 1);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <Label htmlFor="fullName">
            Full Name
            <Req />
          </Label>
          <Input
            id="fullName"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          <FieldError>{errors.fullName?.message}</FieldError>
        </Field>

        <Field>
          <Label htmlFor="email">
            Email Address
            <Req />
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError>{errors.email?.message}</FieldError>
        </Field>

        <Field>
          <Label htmlFor="phone">
            Phone / WhatsApp Number
            <Req />
          </Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (000) 000-0000"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          <FieldError>{errors.phone?.message}</FieldError>
        </Field>

        <Field>
          <Label htmlFor="experience">
            Current Experience Level
            <Req />
          </Label>
          <Controller
            control={control}
            name="experience"
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger id="experience" aria-invalid={!!errors.experience}>
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
            )}
          />
          <FieldError>{errors.experience?.message}</FieldError>
        </Field>

        <Field>
          <Label htmlFor="domain">
            Target Technology Domain
            <Req />
          </Label>
          <Controller
            control={control}
            name="domain"
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger id="domain" aria-invalid={!!errors.domain}>
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
            )}
          />
          <FieldError>{errors.domain?.message}</FieldError>
        </Field>

        <Field>
          <Label htmlFor="role">Desired Job Role</Label>
          <Input
            id="role"
            placeholder="e.g. Backend Engineer, Data Analyst"
            {...register("role")}
          />
          <FieldHint>A title or a description — whichever you are clearer on.</FieldHint>
        </Field>

        <Field className="sm:col-span-2">
          <Label htmlFor="preferredTime">Preferred Consultation Time</Label>
          <Controller
            control={control}
            name="preferredTime"
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger id="preferredTime">
                  <SelectValue placeholder="No preference — suggest a time" />
                </SelectTrigger>
                <SelectContent>
                  {consultationTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldHint>
            Consultations run Mon–Fri, 9:00 AM – 7:00 PM ET. Weekend slots are limited.
          </FieldHint>
        </Field>

        <Field className="sm:col-span-2">
          <Label htmlFor="message">Career Expectations / Message</Label>
          <Textarea
            id="message"
            placeholder="Where are you now, where would you like to be, and what has been the hardest part of the search so far?"
            {...register("message")}
          />
          <FieldError>{errors.message?.message}</FieldError>
        </Field>

        {/* Honeypot — hidden from people, tempting to bots. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="companyWebsite">Company website</label>
          <input
            id="companyWebsite"
            tabIndex={-1}
            autoComplete="off"
            {...register("companyWebsite")}
          />
        </div>

        <Field className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <Controller
              control={control}
              name="consent"
              render={({ field }) => (
                <Checkbox
                  id="consent"
                  checked={field.value === true}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                  aria-invalid={!!errors.consent}
                />
              )}
            />
            <Label htmlFor="consent" className="text-[0.86rem] font-normal text-fg-muted">
              I agree to be contacted about my consultation request and have read the{" "}
              <Link href="/privacy-policy" className="underline underline-offset-3">
                Privacy Policy
              </Link>
              .<Req />
            </Label>
          </div>
          <FieldError>{errors.consent?.message}</FieldError>
        </Field>
      </div>

      <div className="mt-5">
        <Turnstile
          resetSignal={resetSignal}
          onToken={(token) => setValue("turnstileToken", token)}
        />
      </div>

      <div className="mt-6">
        <Button type="submit" block disabled={pending}>
          {pending ? "Sending…" : "Request a Free Consultation"}
        </Button>

        <p className="mt-3.5 text-[0.82rem] text-fg-faint">
          Fields marked * are required. We do not share your details with third parties
          without your consent.
        </p>

        {status ? (
          <p
            role="status"
            aria-live="polite"
            className={
              status.tone === "ok"
                ? "mt-4 rounded-[10px] border border-accent/40 bg-accent/10 px-4.5 py-3.5 text-[0.92rem]"
                : "mt-4 rounded-[10px] border border-red-500/35 bg-red-500/8 px-4.5 py-3.5 text-[0.92rem]"
            }
          >
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
