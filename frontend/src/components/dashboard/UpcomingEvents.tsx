import type { Booking } from "@/types";

type UpcomingEventsProps = {
  bookings: Booking[];
};

function buildWeekDays(bookings: Booking[]) {
  const today = new Date();
  const start = new Date(today);
  start.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, index) => {
    const current = new Date(start);
    current.setDate(start.getDate() + index);
    const count = bookings.filter((booking) => {
      const eventDate = new Date(booking.eventDate);
      return eventDate.toDateString() === current.toDateString();
    }).length;

    return {
      date: current,
      count,
      active: count > 0,
    };
  });
}

function formatCalendarDate(value: Date) {
  return new Intl.DateTimeFormat("en-PK", {
    month: "short",
    day: "numeric",
  }).format(value);
}

export function UpcomingEvents({ bookings }: UpcomingEventsProps) {
  const focusedBookings = bookings
    .filter((booking) => ["ACCEPTED", "CONFIRMED", "COMPLETED"].includes(booking.status))
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

  const days = buildWeekDays(focusedBookings);
  const nextBooking = focusedBookings[0];

  return (
    <div className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-2xl text-[var(--dark)]">Upcoming Events</h3>
        <button className="text-sm font-medium text-[var(--primary)]">Next 7 days</button>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-3">
        {days.map((day) => (
          <div
            key={day.date.toISOString()}
            className={`rounded-[20px] border p-3 text-center ${
              day.active
                ? "border-[var(--gold)] bg-[var(--gold-subtle)]"
                : "border-[color:rgba(27,77,62,0.08)] bg-[var(--warm-white)]"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--gray-text)]">
              {new Intl.DateTimeFormat("en-PK", { weekday: "short" }).format(day.date)}
            </p>
            <p className="mt-2 font-mono-ui text-xl text-[var(--dark)]">
              {new Intl.DateTimeFormat("en-PK", { day: "numeric" }).format(day.date)}
            </p>
            <div className="mt-3 flex justify-center gap-1.5">
              {day.count ? (
                Array.from({ length: Math.min(day.count, 3) }).map((_, index) => (
                  <span key={index} className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
                ))
              ) : (
                <span className="h-2.5 w-2.5 rounded-full bg-[color:rgba(27,77,62,0.12)]" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[22px] bg-[var(--warm-white)] p-4">
        {nextBooking ? (
          <>
            <p className="font-semibold text-[var(--dark)]">
              {formatCalendarDate(new Date(nextBooking.eventDate))} · {nextBooking.eventType ?? "Event"}
            </p>
            <p className="mt-1 text-sm text-[var(--gray-text)]">
              {nextBooking.client?.name ?? "Client"} · {nextBooking.package?.title ?? "Custom package"} · {nextBooking.eventCity}
            </p>
          </>
        ) : (
          <p className="text-sm text-[var(--gray-text)]">
            As soon as bookings are accepted or confirmed, your next event strip will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
