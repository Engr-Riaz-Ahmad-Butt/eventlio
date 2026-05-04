import type { Booking } from "@/types";

const statusMap = {
  Received: "bg-[color:rgba(5,150,105,0.12)] text-[var(--success)]",
  Pending: "bg-[color:rgba(217,119,6,0.12)] text-[var(--warning)]",
  Partial: "bg-[color:rgba(37,99,235,0.12)] text-[var(--info)]",
} as const;

type RecentPaymentsProps = {
  bookings: Booking[];
};

function getPaymentSummary(booking: Booking) {
  if (booking.balanceAmount <= 0) {
    return { type: "Final", status: "Received" as const, amount: booking.totalAmount };
  }

  if (booking.advanceAmount > 0) {
    return { type: "Advance", status: "Partial" as const, amount: booking.advanceAmount };
  }

  return { type: "Advance", status: "Pending" as const, amount: booking.totalAmount };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-PK", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function RecentPayments({ bookings }: RecentPaymentsProps) {
  const rows = [...bookings]
    .filter((booking) => ["ACCEPTED", "CONFIRMED", "COMPLETED"].includes(booking.status))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6);

  return (
    <div className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between border-b border-[color:rgba(27,77,62,0.08)] px-6 py-5">
        <h3 className="font-heading text-2xl text-[var(--dark)]">Payment Follow-up</h3>
        <button className="text-sm font-medium text-[var(--primary)] hover:text-[var(--gold-dark)]">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-[11px] uppercase tracking-[0.24em] text-[var(--gray-text)]">
            <tr>
              {["Client", "Event", "Amount", "Type", "Status", "Date"].map((header) => (
                <th key={header} className="px-6 py-4 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((booking) => {
                const payment = getPaymentSummary(booking);

                return (
                  <tr key={booking.id} className="border-t border-[color:rgba(27,77,62,0.08)]">
                    <td className="px-6 py-4 font-medium text-[var(--dark)]">{booking.client?.name ?? "Client"}</td>
                    <td className="px-6 py-4 text-[var(--gray-text)]">{booking.eventType ?? "Event"}</td>
                    <td className="px-6 py-4 font-mono-ui text-[var(--dark)]">
                      PKR {payment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-[var(--gray-text)]">{payment.type}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusMap[payment.status]}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[var(--gray-text)]">{formatDate(booking.updatedAt)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-[var(--gray-text)]">
                  Payment tracking will populate here as soon as bookings move forward.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
