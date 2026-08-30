"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "overflow-hidden rounded-2xl border border-hair bg-white transition-[border-color,box-shadow] duration-300 ease-brand data-[state=open]:border-ink data-[state=open]:shadow-soft",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 cursor-pointer items-center gap-4 px-5 py-5.5 text-left font-display text-[1.02rem] font-bold tracking-[-0.015em] transition-colors duration-300 hover:text-accent-deep sm:px-7",
          className,
        )}
        {...props}
      >
        <span className="flex-1">{children}</span>
        <span
          aria-hidden="true"
          className="grid size-8 shrink-0 place-items-center rounded-full bg-paper-alt transition-colors duration-300 group-data-[state=open]:bg-accent"
        >
          <Plus
            className="size-3.5 transition-transform duration-300 ease-brand group-data-[state=open]:rotate-45"
            strokeWidth={2.4}
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-[accordion-up_300ms_var(--ease-brand)] data-[state=open]:animate-[accordion-down_300ms_var(--ease-brand)]"
      {...props}
    >
      <div className={cn("max-w-[78ch] px-5 pb-6 text-fg-muted sm:px-7", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
