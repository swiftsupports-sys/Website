"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";

/**
 * Full-screen navigation drawer built on Radix Dialog: focus trapping, scroll
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
      <DialogPrimitive.Overlay className="fixed inset-0 z-90 bg-ink/70 backdrop-blur-sm data-[state=closed]:animate-[fade-out_250ms_ease] data-[state=open]:animate-[fade-in_250ms_ease]" />
      <DialogPrimitive.Content
        className={cn(
          "fixed inset-x-0 top-0 z-100 grid max-h-dvh grid-rows-[auto_1fr] bg-ink text-on-dark shadow-float outline-none",
          "data-[state=closed]:animate-[slide-up_400ms_var(--ease-brand)] data-[state=open]:animate-[slide-down_400ms_var(--ease-brand)]",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
