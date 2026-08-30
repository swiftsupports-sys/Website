import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-3.5 rounded-full border font-display font-bold tracking-[-0.01em] whitespace-nowrap transition-[transform,background-color,color,border-color,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        accent:
          "border-accent bg-accent text-ink hover:bg-accent-bright hover:shadow-[0_14px_34px_rgb(53_232_82/0.32)]",
        dark: "border-ink bg-ink text-white hover:shadow-card",
        light: "border-white bg-white text-ink hover:shadow-card",
        /** Outlined button for light backgrounds. */
        outline:
          "border-hair-strong bg-transparent text-ink hover:border-ink hover:shadow-soft",
        /** Outlined button for dark backgrounds and photography. */
        outlineDark:
          "border-white/35 bg-transparent text-white hover:border-white hover:bg-white/10",
      },
      size: {
        default: "py-[15px] pr-5 pl-6 text-[0.95rem]",
        sm: "py-[11px] pr-[15px] pl-5 text-[0.87rem]",
      },
      block: {
        true: "w-full",
      },
    },
    defaultVariants: { variant: "accent", size: "default" },
  },
);

const bubbleVariants = cva(
  "grid shrink-0 place-items-center rounded-full transition-transform duration-300 ease-brand group-hover:translate-x-[3px]",
  {
    variants: {
      tone: {
        onLight: "bg-ink/10",
        onDark: "bg-white/15",
      },
      size: {
        default: "size-[30px] [&_svg]:size-[13px]",
        sm: "size-[25px] [&_svg]:size-[12px]",
      },
    },
    defaultVariants: { tone: "onDark", size: "default" },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** Render the trailing circular arrow. On by default. */
    withArrow?: boolean;
  };

/**
 * The site's single button component. The trailing arrow bubble is part of the
 * brand language, so it is included unless explicitly turned off.
 *
 * With `asChild`, the arrow is rendered *inside* the child element (usually a
 * `next/link`), which is why the label is wrapped in Radix's `Slottable`.
 */
export function Button({
  className,
  variant,
  size,
  block,
  asChild = false,
  withArrow = true,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const tone = variant === "accent" || variant === "light" ? "onLight" : "onDark";

  return (
    <Comp className={cn(buttonVariants({ variant, size, block }), className)} {...props}>
      <Slottable>{children}</Slottable>
      {withArrow ? (
        <span className={cn(bubbleVariants({ tone, size }))} aria-hidden="true">
          <ArrowRight strokeWidth={2.4} />
        </span>
      ) : null}
    </Comp>
  );
}

export { buttonVariants };
