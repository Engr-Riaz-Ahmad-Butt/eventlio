import { mockBookings } from "@/data/mock";
import { Button } from "@/components/ui/button";

const columns = [
  { title: "Pending", key: "pending", badge: "bg-[color:rgba(217,119,6,0.12)] text-[var(--warning)]" },
  { title: "Confirmed", key: "confirmed", badge: "bg-[color:rgba(5,150,105,0.12)] text-[var(--success)]" },
  { title: "Completed", key: "completed", badge: "bg-[color:rgba(27,77,62,0.08)] text-[var(--primary-dark)]" },
];

export function BookingKanban() {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      {columns.map((column) => {
        const bookings = mockBookings.filter((item) => item.status === column.key);

        return (
          <div
            key={column.key}
            className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-5 shadow-[var(--shadow-sm)]"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-2xl text-[var(--dark)]">{column.title}</h3>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${column.badge}`}>
                {bookings.length}
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-[22px] border border-[color:rgba(27,77,62,0.08)] border-l-4 border-l-[var(--gold)] bg-[var(--warm-white)] p-4"
                >
                  <p className="font-semibold text-[var(--dark)]">{booking.client}</p>
                  <p className="mt-1 text-sm text-[var(--primary-dark)]">{booking.package}</p>
                  <p className="mt-2 text-sm text-[var(--gray-text)]">
                    {booking.date} · {booking.event}
                  </p>
                  <p className="mt-3 font-mono-ui text-sm text-[var(--gold-dark)]">
                    PKR {booking.amount.toLocaleString()} · {booking.advance.toLocaleString()} advance
                  </p>
                  {column.key === "pending" ? (
                    <div className="mt-4 flex gap-3">
                      <Button variant="gold" size="sm" className="flex-1">
                        Accept
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Reject
                      </Button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
