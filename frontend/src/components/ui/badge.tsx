import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[color:rgba(27,77,62,0.14)] bg-[var(--primary-subtle)] text-[var(--primary-dark)]",
        gold:
          "border-[color:rgba(201,168,76,0.34)] bg-[var(--gold-subtle)] text-[var(--gold-dark)]",
        dark:
          "border-[color:rgba(255,255,255,0.16)] bg-white/5 text-[rgba(246,244,238,0.84)]",
        success:
          "border-[color:rgba(5,150,105,0.2)] bg-[color:rgba(5,150,105,0.12)] text-[var(--success)]",
        warning:
          "border-[color:rgba(217,119,6,0.2)] bg-[color:rgba(217,119,6,0.12)] text-[var(--warning)]",
        outline:
          "border-[color:rgba(27,77,62,0.18)] bg-white text-[var(--primary-dark)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { badgeVariants };
