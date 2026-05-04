import { Loader2 } from "lucide-react";
import type { Booking, BookingStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { BookingStatusBadge } from "@/components/bookings/BookingStatusBadge";

const columns: Array<{
  title: string;
  key: BookingStatus;
  badge: string;
}> = [
  { title: "Pending", key: "PENDING", badge: "bg-[color:rgba(217,119,6,0.12)] text-[var(--warning)]" },
  { title: "Accepted", key: "ACCEPTED", badge: "bg-[color:rgba(37,99,235,0.12)] text-[var(--info)]" },
  { title: "Confirmed", key: "CONFIRMED", badge: "bg-[color:rgba(5,150,105,0.12)] text-[var(--success)]" },
];

type BookingKanbanProps = {
  bookings: Booking[];
  isSubmittingId?: string | null;
  onRespond: (bookingId: string, decision: "ACCEPTED" | "REJECTED") => void;
};

function formatEventDate(booking: Booking) {
  const date = new Date(booking.eventDate);
  const dateLabel = new Intl.DateTimeFormat("en-PK", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);

  return `${dateLabel} · ${booking.eventType ?? "Event"}`;
}

export function BookingKanban({ bookings, isSubmittingId, onRespond }: BookingKanbanProps) {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      {columns.map((column) => {
        const columnBookings = bookings.filter((item) => item.status === column.key);

        return (
          <div
            key={column.key}
            className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-5 shadow-[var(--shadow-sm)]"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-2xl text-[var(--dark)]">{column.title}</h3>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${column.badge}`}>
                {columnBookings.length}
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {columnBookings.length ? (
                columnBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="rounded-[22px] border border-[color:rgba(27,77,62,0.08)] border-l-4 border-l-[var(--gold)] bg-[var(--warm-white)] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[var(--dark)]">{booking.client?.name ?? "Client"}</p>
                        <p className="mt-1 text-sm text-[var(--primary-dark)]">
                          {booking.package?.title ?? "Custom package"}
                        </p>
                      </div>
                      <BookingStatusBadge status={booking.status} />
                    </div>
                    <p className="mt-2 text-sm text-[var(--gray-text)]">{formatEventDate(booking)}</p>
                    <p className="mt-1 text-sm text-[var(--gray-text)]">
                      {booking.eventCity}
                      {booking.eventTime ? ` · ${booking.eventTime}` : ""}
                    </p>
                    <p className="mt-3 font-mono-ui text-sm text-[var(--gold-dark)]">
                      PKR {booking.totalAmount.toLocaleString()} · PKR {booking.balanceAmount.toLocaleString()} balance
                    </p>
                    {column.key === "PENDING" ? (
                      <div className="mt-4 flex gap-3">
                        <Button
                          variant="gold"
                          size="sm"
                          className="flex-1"
                          disabled={isSubmittingId === booking.id}
                          onClick={() => onRespond(booking.id, "ACCEPTED")}
                        >
                          {isSubmittingId === booking.id ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          disabled={isSubmittingId === booking.id}
                          onClick={() => onRespond(booking.id, "REJECTED")}
                        >
                          Reject
                        </Button>
                      </div>
                    ) : null}
                    {booking.rejectionReason ? (
                      <p className="mt-3 text-sm text-[var(--danger)]">Reason: {booking.rejectionReason}</p>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="rounded-[20px] border border-dashed border-[color:rgba(27,77,62,0.12)] bg-[var(--warm-white)] px-4 py-8 text-center text-sm text-[var(--gray-text)]">
                  No {column.title.toLowerCase()} bookings yet.
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
