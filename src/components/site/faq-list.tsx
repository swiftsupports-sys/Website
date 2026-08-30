"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Single-open accordion. `collapsible` lets the visitor close the open item
 * rather than forcing one to always be expanded.
 */
/** Accepts anything question-and-answer shaped, so service pages can pass
 * their own FAQs without carrying the tags used to filter the shared list. */
export function FaqList({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <Accordion type="single" collapsible className="grid gap-3">
      {items.map((item, i) => (
        <AccordionItem key={item.question} value={`faq-${i}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            <p className="text-[0.97rem]">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
