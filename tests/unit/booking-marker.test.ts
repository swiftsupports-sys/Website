import { describe, expect, it } from "vitest";

import { bookedPackage, shouldOpenBooking, visibleText } from "@/lib/agent/booking-marker";

describe("Swift Agent booking marker", () => {
  it("reads the package id from the marker", () => {
    expect(bookedPackage("Great!\n\n[[book:complete]]")).toBe("Complete Career Package");
    expect(bookedPackage("[[ book : marketing ]]")).toBe("Profile Marketing");
    expect(bookedPackage("[[BOOK:Training]]")).toBe("Training and Support");
    expect(bookedPackage("Great!\n\n[[book]]")).toBeUndefined();
    expect(bookedPackage("[[book:platinum]]")).toBeUndefined();
  });

  it("hides the marker, including one cut off mid-stream", () => {
    expect(visibleText("A form opens below.\n\n[[book:complete]]")).toBe("A form opens below.");
    for (const tail of ["[", "[[", "[[b", "[[boo", "[[book", "[[book:", "[[book:comp", "[[book]"]) {
      expect(visibleText(`Sure!\n\n${tail}`)).toBe("Sure!");
    }
    expect(visibleText("See our [Pri")).toBe("See our [Pri");
  });

  it("does not open the form when the agent is only offering a consultation", () => {
    expect(
      shouldOpenBooking("**Complete** fits you. Want to book?\n\n[[book:complete]]", "I'm a QA engineer failing interviews"),
    ).toBe(false);
    expect(shouldOpenBooking("Totally fair — the consultation is free.\n\n[[book]]", "$2K is too expensive")).toBe(false);
    expect(shouldOpenBooking("Let's talk soon.", "book me")).toBe(false);
  });

  it("opens the form when the visitor asks or agrees", () => {
    const offer = "Shall I set up your free consultation for the Complete Career Package?";
    expect(shouldOpenBooking("Great!\n\n[[book:complete]]", "Yes", offer)).toBe(true);
    expect(shouldOpenBooking("Great!\n\n[[book:complete]]", "I'm in", offer)).toBe(true);
    expect(shouldOpenBooking("Great!\n\n[[book:complete]]", "Sign me up for the complete package")).toBe(true);
    expect(shouldOpenBooking("A short form will open right below.\n\n[[book:training]]", "ok that works")).toBe(true);
  });
});
