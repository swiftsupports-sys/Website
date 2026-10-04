"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

/** A divided list rather than a stack of cards: one rule between questions. */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-border", className)}
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
          "group flex flex-1 cursor-pointer items-center gap-4 py-5 text-left text-[1.0625rem] font-semibold text-brand-navy transition-colors duration-200 hover:text-brand-blue",
          className,
        )}
        {...props}
      >
        <span className="flex-1">{children}</span>
        <ChevronDown
          aria-hidden="true"
          className="size-5 shrink-0 text-text-secondary transition-transform duration-200 group-hover:text-brand-blue group-data-[state=open]:rotate-180"
          strokeWidth={2}
        />
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
      className="overflow-hidden data-[state=closed]:animate-[accordion-up_200ms_var(--ease-brand)] data-[state=open]:animate-[accordion-down_200ms_var(--ease-brand)]"
      {...props}
    >
      <div className={cn("max-w-[72ch] pb-6 text-text-body", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
