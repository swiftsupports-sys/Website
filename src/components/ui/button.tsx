import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md border text-center font-medium transition-colors duration-200 ease-brand disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Main call to action. */
        primary:
          "border-brand-blue bg-brand-blue text-white hover:border-brand-blue-hover hover:bg-brand-blue-hover",
        /** Outlined button for light backgrounds. */
        secondary:
          "border-border-strong bg-surface text-brand-navy hover:border-brand-blue-border hover:bg-brand-blue-light",
        /** Outlined button for navy backgrounds. */
        secondaryDark:
          "border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10",
      },
      size: {
        default: "min-h-11 px-5 py-2 text-[0.9375rem]",
        sm: "min-h-10 px-4 py-2 text-[0.875rem]",
        lg: "min-h-12 px-6 py-2.5 text-base",
      },
      block: {
        true: "w-full",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** Render a small trailing arrow. Off by default. */
    withArrow?: boolean;
  };

/**
 * The site's single button component: rectangular, 6px radius, colour-only
 * hover. With `asChild` the styles (and optional arrow) are applied to the
 * child element — usually a `next/link` — which is why the label is wrapped
 * in Radix's `Slottable`.
 */
export function Button({
  className,
  variant,
  size,
  block,
  asChild = false,
  withArrow = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={cn(buttonVariants({ variant, size, block }), className)} {...props}>
      <Slottable>{children}</Slottable>
      {withArrow ? (
        <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
      ) : null}
    </Comp>
  );
}

export { buttonVariants };
