import { Skeleton } from "@/components/ui/skeleton";

export function VendorCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white shadow-[var(--shadow-sm)]">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="space-y-4 p-5">
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-6 w-1/3" />
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-11 w-full rounded-full" />
          <Skeleton className="h-11 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
