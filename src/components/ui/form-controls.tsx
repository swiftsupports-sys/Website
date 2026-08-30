"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ label */

export function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "font-display text-[0.82rem] font-bold tracking-[-0.005em]",
        className,
      )}
      {...props}
    />
  );
}

/** Required-field marker, kept out of the accessible name. */
export function Req() {
  return (
    <span className="text-accent-deep" aria-hidden="true">
      {" *"}
    </span>
  );
}

const fieldStyles =
  "w-full rounded-[10px] border border-hair-strong bg-paper px-4 py-3.5 text-[0.95rem] transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-fg-faint hover:border-fg-faint focus:border-ink focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/20 aria-invalid:border-red-500/70 aria-invalid:ring-red-500/15";

/* ------------------------------------------------------------------ input */

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(fieldStyles, className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea className={cn(fieldStyles, "min-h-33 resize-y", className)} {...props} />
  );
}

/* ----------------------------------------------------------------- select */

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        fieldStyles,
        "flex cursor-pointer items-center justify-between gap-3 text-left data-[placeholder]:text-fg-faint",
        className,
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-4 shrink-0 opacity-70" strokeWidth={2.2} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        className={cn(
          "z-100 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-hair bg-white shadow-card",
          position === "popper" && "mt-2",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1.5">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-[0.92rem] outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-paper-alt",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="ml-auto">
        <Check className="size-4 text-accent-deep" strokeWidth={2.4} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

/* --------------------------------------------------------------- checkbox */

export function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "mt-0.5 grid size-[19px] shrink-0 cursor-pointer place-items-center rounded-[6px] border border-hair-strong bg-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/25 data-[state=checked]:border-accent-deep data-[state=checked]:bg-accent-deep aria-invalid:border-red-500/70",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <Check className="size-3 text-white" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

/* ------------------------------------------------------------------ field */

export function Field({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
}

export function FieldHint({ children }: { children: React.ReactNode }) {
  return <span className="text-[0.78rem] text-fg-faint">{children}</span>;
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <span role="alert" className="text-[0.78rem] font-medium text-red-600">
      {children}
    </span>
  );
}
