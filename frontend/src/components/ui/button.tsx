import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--gold)] text-[var(--dark)] hover:bg-[var(--gold-light)] hover:shadow-[var(--shadow-gold)]",
        gold: "bg-[var(--gold)] text-[var(--dark)] hover:bg-[var(--gold-light)] hover:shadow-[var(--shadow-gold)]",
        outline:
          "border border-[color:rgba(27,77,62,0.18)] bg-white text-[var(--primary-dark)] hover:border-[var(--gold)] hover:text-[var(--gold-dark)]",
        secondary:
          "bg-[var(--primary)] text-white hover:bg-[var(--primary-light)]",
        ghost:
          "bg-transparent text-[var(--primary-dark)] hover:bg-[color:rgba(27,77,62,0.06)]",
        "ghost-light":
          "border border-[color:rgba(255,255,255,0.18)] bg-white/0 text-white hover:border-[var(--gold)] hover:text-[var(--gold)]",
        destructive:
          "bg-[var(--danger)] text-white hover:bg-[color:rgba(220,38,38,0.88)]",
        link: "rounded-none p-0 text-[var(--primary)] hover:text-[var(--gold-dark)]",
        whatsapp:
          "bg-[var(--whatsapp)] text-white hover:bg-[color:rgba(37,211,102,0.88)]",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-7 text-base",
        xl: "h-14 px-8 text-base",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
