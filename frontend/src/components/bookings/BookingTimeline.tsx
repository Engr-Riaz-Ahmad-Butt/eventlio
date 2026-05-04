import type { BookingStatusHistory } from "@/types";

function formatTimelineDate(value: string) {
  return new Intl.DateTimeFormat("en-PK", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export function BookingTimeline({ history }: { history?: BookingStatusHistory[] }) {
  if (!history?.length) {
    return (
      <div className="rounded-[20px] border border-dashed border-[color:rgba(27,77,62,0.12)] bg-[var(--warm-white)] px-4 py-5 text-sm text-[var(--gray-text)]">
        Timeline will appear as soon as booking updates start coming in.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item, index) => (
        <div key={item.id} className="flex gap-4">
          <div className="flex w-5 flex-col items-center">
            <span className="mt-1 h-3 w-3 rounded-full bg-[var(--gold)]" />
            {index < history.length - 1 ? (
              <span className="mt-1 h-full w-px bg-[color:rgba(27,77,62,0.12)]" />
            ) : null}
          </div>
          <div className="min-w-0 flex-1 rounded-[20px] bg-[var(--warm-white)] px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium text-[var(--dark)]">
                {item.fromStatus ? `${formatStatus(item.fromStatus)} to ${formatStatus(item.toStatus)}` : formatStatus(item.toStatus)}
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--gray-text)]">
                {formatTimelineDate(item.createdAt)}
              </p>
            </div>
            {item.note ? <p className="mt-2 text-sm leading-6 text-[var(--gray-text)]">{item.note}</p> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
