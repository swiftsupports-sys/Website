import { describe, expect, it } from "vitest";

import { consultationSchema } from "@/lib/schemas";

const valid = {
  fullName: "Alex Rivera",
  email: "alex@example.com",
  phone: "+1 (555) 010-2030",
  experience: "5–8 years",
  domain: "Cloud Engineering & DevOps",
  role: "Platform Engineer",
  preferredTime: "Weekday morning (ET)",
  message: "Looking to move into a platform role.",
  consent: true,
  companyWebsite: "",
} as const;

describe("consultationSchema", () => {
  it("accepts a complete, well-formed request", () => {
    const result = consultationSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("accepts a minimal request without the optional fields", () => {
    const { role, preferredTime, message, ...minimal } = valid;
    void role;
    void preferredTime;
    void message;
    expect(consultationSchema.safeParse(minimal).success).toBe(true);
  });

  it("rejects an invalid email address", () => {
    const result = consultationSchema.safeParse({ ...valid, email: "alex.example.com" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/valid email/i);
    }
  });

  it("rejects a phone number containing letters", () => {
    const result = consultationSchema.safeParse({ ...valid, phone: "call me" });
    expect(result.success).toBe(false);
  });

  it("requires consent to be given", () => {
    const result = consultationSchema.safeParse({ ...valid, consent: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/confirm/i);
    }
  });

  it("rejects an unknown experience level", () => {
    const result = consultationSchema.safeParse({ ...valid, experience: "20 years" });
    expect(result.success).toBe(false);
  });

  it("rejects a filled honeypot field", () => {
    const result = consultationSchema.safeParse({
      ...valid,
      companyWebsite: "https://spam.example",
    });
    expect(result.success).toBe(false);
  });

  it("trims surrounding whitespace from text fields", () => {
    const result = consultationSchema.safeParse({
      ...valid,
      fullName: "  Alex Rivera  ",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.fullName).toBe("Alex Rivera");
  });
});
