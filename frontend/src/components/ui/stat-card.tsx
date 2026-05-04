import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  delta: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: "gold" | "green" | "emerald" | "amber";
  deltaTone?: "positive" | "warning" | "neutral";
};

const accentClasses = {
  gold: "bg-[var(--gold-subtle)] text-[var(--gold-dark)]",
  green: "bg-[var(--primary-subtle)] text-[var(--primary-dark)]",
  emerald: "bg-[color:rgba(5,150,105,0.12)] text-[var(--success)]",
  amber: "bg-[color:rgba(217,119,6,0.12)] text-[var(--warning)]",
};

const deltaClasses = {
  positive: "bg-[color:rgba(5,150,105,0.08)] text-[var(--success)]",
  warning: "bg-[color:rgba(217,119,6,0.12)] text-[var(--warning)]",
  neutral: "bg-[color:rgba(27,77,62,0.08)] text-[var(--primary-dark)]",
};

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  accent = "green",
  deltaTone = "positive",
}: StatCardProps) {
  return (
    <Card className="rounded-[24px] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gray-text)]">
            {label}
          </p>
          <p className="font-mono-ui text-[30px] font-medium text-[var(--dark)]">
            {value}
          </p>
          <div className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium", deltaClasses[deltaTone])}>
            <ArrowUpRight className="h-3.5 w-3.5" />
            {delta}
          </div>
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl",
            accentClasses[accent],
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
