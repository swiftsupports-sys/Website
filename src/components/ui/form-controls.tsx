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
      className={cn("text-[0.875rem] font-medium text-text-primary", className)}
      {...props}
    />
  );
}

/** Required-field marker, kept out of the accessible name. */
export function Req() {
  return (
    <span className="text-red-600" aria-hidden="true">
      {" *"}
    </span>
  );
}

const fieldStyles =
  "w-full rounded-md border border-border-strong bg-surface px-3.5 py-2.5 text-[0.9375rem] text-text-primary transition-[border-color,box-shadow] duration-200 placeholder:text-text-secondary hover:border-slate-400 focus:border-brand-blue focus:outline-none focus:ring-3 focus:ring-brand-blue/15 aria-invalid:border-red-600 aria-invalid:ring-red-600/15";

/* ------------------------------------------------------------------ input */

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(fieldStyles, "h-11", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea className={cn(fieldStyles, "min-h-32 resize-y", className)} {...props} />
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
        "flex h-11 cursor-pointer items-center justify-between gap-3 text-left data-[placeholder]:text-text-secondary",
        className,
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-4 shrink-0 text-text-secondary" strokeWidth={2} />
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
          "z-100 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-border bg-surface shadow-overlay",
          position === "popper" && "mt-1",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
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
        "relative flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-[0.9375rem] text-text-primary outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-brand-blue-light data-[highlighted]:text-brand-navy",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="ml-auto">
        <Check className="size-4 text-brand-blue" strokeWidth={2.2} />
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
        "mt-0.5 grid size-[18px] shrink-0 cursor-pointer place-items-center rounded-sm border border-border-strong bg-surface transition-colors duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-blue/25 data-[state=checked]:border-brand-blue data-[state=checked]:bg-brand-blue aria-invalid:border-red-600",
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
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      {children}
    </div>
  );
}

export function FieldHint({ children }: { children: React.ReactNode }) {
  return <span className="text-[0.8125rem] text-text-secondary">{children}</span>;
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <span role="alert" className="text-[0.8125rem] font-medium text-red-700">
      {children}
    </span>
  );
}
