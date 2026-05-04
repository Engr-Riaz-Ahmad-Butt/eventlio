import { Banknote, CalendarDays, CreditCard, Users } from "lucide-react";
import type { Booking } from "@/types";
import { StatCard } from "@/components/ui/stat-card";

type StatsRowProps = {
  bookings: Booking[];
};

export function StatsRow({ bookings }: StatsRowProps) {
  const now = new Date();
  const todayBookings = bookings.filter((booking) => {
    const eventDate = new Date(booking.eventDate);
    return eventDate.toDateString() === now.toDateString();
  }).length;

  const monthKey = `${now.getFullYear()}-${now.getMonth()}`;
  const monthlyRevenue = bookings
    .filter((booking) => {
      const eventDate = new Date(booking.eventDate);
      return (
        `${eventDate.getFullYear()}-${eventDate.getMonth()}` === monthKey &&
        ["ACCEPTED", "CONFIRMED", "COMPLETED"].includes(booking.status)
      );
    })
    .reduce((sum, booking) => sum + booking.totalAmount, 0);

  const pendingPayments = bookings
    .filter((booking) => ["ACCEPTED", "CONFIRMED", "COMPLETED"].includes(booking.status))
    .reduce((sum, booking) => sum + booking.balanceAmount, 0);

  const totalClients = new Set(bookings.map((booking) => booking.client?.id).filter(Boolean)).size;
  const acceptedCount = bookings.filter((booking) => booking.status === "ACCEPTED").length;
  const confirmedCount = bookings.filter((booking) => booking.status === "CONFIRMED").length;
  const pendingCount = bookings.filter((booking) => booking.status === "PENDING").length;

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Aaj Ki Bookings"
        value={String(todayBookings)}
        delta={`${pendingCount} pending requests`}
        icon={CalendarDays}
        accent="green"
        deltaTone={pendingCount > 0 ? "neutral" : "positive"}
      />
      <StatCard
        label="Is Mahine Ki Kamai"
        value={`PKR ${monthlyRevenue.toLocaleString()}`}
        delta={`${confirmedCount} confirmed events`}
        icon={Banknote}
        accent="gold"
      />
      <StatCard
        label="Pending Payments"
        value={`PKR ${pendingPayments.toLocaleString()}`}
        delta={`${acceptedCount} accepted deals need follow-up`}
        icon={CreditCard}
        accent="amber"
        deltaTone={acceptedCount > 0 ? "warning" : "positive"}
      />
      <StatCard
        label="Total Clients"
        value={String(totalClients)}
        delta={`${bookings.length} booking records`}
        icon={Users}
        accent="emerald"
        deltaTone="neutral"
      />
    </div>
  );
}
