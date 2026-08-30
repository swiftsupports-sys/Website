import { z } from "zod";

export const experienceLevels = [
  "Student or recent graduate",
  "0–2 years",
  "2–5 years",
  "5–8 years",
  "8–12 years",
  "12+ years",
  "Changing careers into technology",
] as const;

export const targetDomains = [
  "Software Development",
  "Quality Assurance & Automation",
  "Data Analytics & Data Engineering",
  "Cloud Engineering & DevOps",
  "Cybersecurity",
  "Business Analysis",
  "UI/UX and Product Roles",
  "Other / Not sure yet",
] as const;

export const consultationTimes = [
  "No preference — suggest a time",
  "Weekday morning (ET)",
  "Weekday afternoon (ET)",
  "Weekday evening (ET)",
  "Weekend",
] as const;

/**
 * Shared by the client form and the server action, so validation cannot drift
 * between the two. The server re-runs this on every submission — the client
 * pass is a convenience, not a control.
 */
export const consultationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "That name is longer than we can store."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a reachable phone or WhatsApp number.")
    .max(30, "That number looks too long.")
    .regex(/^[+()\-\s\d.]+$/, "Use digits, spaces, and + ( ) - only."),
  experience: z.enum(experienceLevels, {
    errorMap: () => ({ message: "Please select your experience level." }),
  }),
  domain: z.enum(targetDomains, {
    errorMap: () => ({ message: "Please select a target domain." }),
  }),
  role: z.string().trim().max(120, "Please keep the role title shorter.").optional(),
  preferredTime: z.enum(consultationTimes).optional(),
  message: z
    .string()
    .trim()
    .max(2000, "Please keep your message under 2000 characters.")
    .optional(),
  // Boolean rather than z.literal(true) so the form can default it to false
  // and still type-check; the refinement is what actually requires consent.
  consent: z.boolean().refine((value) => value === true, {
    message: "Please confirm we may contact you.",
  }),
  /** Anti-spam honeypot — real visitors never see or fill this. */
  companyWebsite: z.string().max(0).optional(),
  turnstileToken: z.string().optional(),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;

export type ConsultationResult =
  | { ok: true; demo?: boolean }
  | { ok: false; message: string };
