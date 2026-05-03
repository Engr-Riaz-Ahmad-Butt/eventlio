import { Banknote, CalendarDays, CreditCard, Users } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { mockStats } from "@/data/mock";

export function StatsRow() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Aaj Ki Bookings"
        value={String(mockStats.todayBookings)}
        delta="+3 from yesterday"
        icon={CalendarDays}
        accent="green"
      />
      <StatCard
        label="Is Mahine Ki Kamai"
        value={`PKR ${mockStats.monthlyRevenue.toLocaleString()}`}
        delta="+18% this month"
        icon={Banknote}
        accent="gold"
      />
      <StatCard
        label="Pending Payments"
        value={`PKR ${mockStats.pendingPayments.toLocaleString()}`}
        delta="follow-up needed"
        icon={CreditCard}
        accent="amber"
      />
      <StatCard
        label="Total Clients"
        value={String(mockStats.totalClients)}
        delta="+5 new clients"
        icon={Users}
        accent="emerald"
      />
    </div>
  );
}
