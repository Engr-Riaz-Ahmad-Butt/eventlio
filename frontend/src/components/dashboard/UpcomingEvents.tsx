const days = [
  { date: "12", day: "Mon", active: false },
  { date: "13", day: "Tue", active: true },
  { date: "14", day: "Wed", active: false },
  { date: "15", day: "Thu", active: false },
  { date: "16", day: "Fri", active: false },
  { date: "17", day: "Sat", active: false },
  { date: "18", day: "Sun", active: true },
];

export function UpcomingEvents() {
  return (
    <div className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-2xl text-[var(--dark)]">Upcoming Events</h3>
        <button className="text-sm font-medium text-[var(--primary)]">Open calendar</button>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-3">
        {days.map((day) => (
          <div
            key={day.date}
            className={`rounded-[20px] border p-3 text-center ${
              day.active
                ? "border-[var(--gold)] bg-[var(--gold-subtle)]"
                : "border-[color:rgba(27,77,62,0.08)] bg-[var(--warm-white)]"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--gray-text)]">{day.day}</p>
            <p className="mt-2 font-mono-ui text-xl text-[var(--dark)]">{day.date}</p>
            <div className="mt-3 flex justify-center gap-1.5">
              {day.active ? (
                <>
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
                </>
              ) : (
                <span className="h-2.5 w-2.5 rounded-full bg-[color:rgba(27,77,62,0.12)]" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[22px] bg-[var(--warm-white)] p-4">
        <p className="font-semibold text-[var(--dark)]">15 June 2026 · Barat</p>
        <p className="mt-1 text-sm text-[var(--gray-text)]">
          Sarah Ahmed · Premium Photography · Rawalpindi
        </p>
      </div>
    </div>
  );
}
