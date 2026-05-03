import { mockPayments } from "@/data/mock";

const statusMap: Record<string, string> = {
  Received: "bg-[color:rgba(5,150,105,0.12)] text-[var(--success)]",
  Pending: "bg-[color:rgba(217,119,6,0.12)] text-[var(--warning)]",
  Partial: "bg-[color:rgba(37,99,235,0.12)] text-[var(--info)]",
};

export function RecentPayments() {
  return (
    <div className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between border-b border-[color:rgba(27,77,62,0.08)] px-6 py-5">
        <h3 className="font-heading text-2xl text-[var(--dark)]">Recent Payments</h3>
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
            {mockPayments.map((payment) => (
              <tr key={payment.id} className="border-t border-[color:rgba(27,77,62,0.08)]">
                <td className="px-6 py-4 font-medium text-[var(--dark)]">{payment.client}</td>
                <td className="px-6 py-4 text-[var(--gray-text)]">{payment.event}</td>
                <td className="px-6 py-4 font-mono-ui text-[var(--dark)]">
                  PKR {payment.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-[var(--gray-text)]">{payment.type}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusMap[payment.status]}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-[var(--gray-text)]">{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
