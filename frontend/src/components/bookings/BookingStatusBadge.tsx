import { Badge } from "@/components/ui/badge";
import type { BookingStatus } from "@/types";

const labelMap: Record<BookingStatus, string> = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const variantMap: Record<BookingStatus, "warning" | "default" | "gold" | "success" | "outline"> = {
  PENDING: "warning",
  ACCEPTED: "default",
  REJECTED: "outline",
  CONFIRMED: "success",
  COMPLETED: "gold",
  CANCELLED: "outline",
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return <Badge variant={variantMap[status]}>{labelMap[status]}</Badge>;
}
