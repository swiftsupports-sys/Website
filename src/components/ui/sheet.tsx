"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";

/**
 * Right-hand navigation drawer built on Radix Dialog: focus trapping, scroll
 * locking, and Escape handling come for free.
 */
export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetTitle = DialogPrimitive.Title;
export const SheetDescription = DialogPrimitive.Description;

export function SheetContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-90 bg-brand-navy/50 data-[state=closed]:animate-[fade-out_200ms_ease] data-[state=open]:animate-[fade-in_200ms_ease]" />
      <DialogPrimitive.Content
        className={cn(
          "fixed inset-y-0 right-0 z-100 grid h-dvh w-full max-w-sm grid-rows-[auto_1fr] border-l border-border bg-surface text-text-primary shadow-overlay outline-none",
          "data-[state=closed]:animate-[drawer-out_220ms_var(--ease-brand)] data-[state=open]:animate-[drawer-in_220ms_var(--ease-brand)]",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
