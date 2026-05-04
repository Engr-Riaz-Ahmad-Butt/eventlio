"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Loader2, MessageCircleMore, Plus, RefreshCcw } from "lucide-react";
import type { Booking } from "@/types";
import { BookingTimeline } from "@/components/bookings/BookingTimeline";
import { BookingKanban } from "@/components/dashboard/BookingKanban";
import { RecentPayments } from "@/components/dashboard/RecentPayments";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { Button } from "@/components/ui/button";
import { getVendorBookings, respondToBooking } from "@/lib/bookings";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

const actions = [
  { label: "Nai Booking Add", icon: Plus, color: "bg-[var(--gold)] text-[var(--dark)]" },
  { label: "WhatsApp Blast", icon: MessageCircleMore, color: "bg-[var(--whatsapp)] text-white" },
  { label: "Invoice Banao", icon: FileText, color: "bg-[var(--primary)] text-white" },
];

function formatEventDate(booking: Booking) {
  return new Intl.DateTimeFormat("en-PK", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(booking.eventDate));
}

export default function VendorDashboardPage() {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubmittingId, setIsSubmittingId] = useState<string | null>(null);

  async function loadBookings(mode: "initial" | "refresh" = "initial") {
    if (mode === "initial") {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }

    try {
      const nextBookings = await getVendorBookings();
      setBookings(nextBookings);
    } catch (error: any) {
      const message = error.response?.data?.message;
      toast.error(Array.isArray(message) ? message[0] : message || "Could not load vendor bookings.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    void loadBookings();
  }, []);

  async function handleRespond(bookingId: string, decision: "ACCEPTED" | "REJECTED") {
    const note =
      decision === "REJECTED"
        ? window.prompt("Optional rejection reason for the client:") || undefined
        : "Vendor accepted the booking request.";

    setIsSubmittingId(bookingId);
    try {
      const updated = await respondToBooking({ bookingId, decision, note });
      setBookings((current) => current.map((booking) => (booking.id === updated.id ? updated : booking)));
      toast.success(decision === "ACCEPTED" ? "Booking accepted." : "Booking rejected.");
    } catch (error: any) {
      const message = error.response?.data?.message;
      toast.error(Array.isArray(message) ? message[0] : message || "Could not update booking.");
    } finally {
      setIsSubmittingId(null);
    }
  }

  const latestBookings = useMemo(
    () =>
      [...bookings]
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 3),
    [bookings],
  );

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--gold-dark)]">
            Assalam-o-alaikum
          </p>
          <h2 className="mt-2 font-heading text-4xl text-[var(--dark)]">
            {user?.vendorProfile?.businessName || user?.name || "Eventlio Vendor"}
          </h2>
          <p className="mt-2 max-w-2xl text-[var(--gray-text)]">
            Aaj ki bookings, pending confirmations, aur upcoming events sab ek jagah. This is your business command center.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="lg" onClick={() => void loadBookings("refresh")} disabled={isRefreshing}>
            {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            Refresh
          </Button>
          <Button variant="gold" size="lg">
            Add New Package
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white px-6 py-16 text-center text-[var(--gray-text)] shadow-[var(--shadow-sm)]">
          Loading booking dashboard...
        </div>
      ) : (
        <>
          <StatsRow bookings={bookings} />

          <div className="space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--gray-text)]">
                Booking Pipeline
              </p>
              <h3 className="mt-2 font-heading text-3xl text-[var(--dark)]">
                Pending se Confirmed tak
              </h3>
            </div>
            <BookingKanban bookings={bookings} isSubmittingId={isSubmittingId} onRespond={handleRespond} />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <RecentPayments bookings={bookings} />
            <UpcomingEvents bookings={bookings} />
          </div>

          <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-sm)]">
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--gray-text)]">Recent activity</p>
              <h3 className="mt-2 font-heading text-3xl text-[var(--dark)]">Latest booking updates</h3>
              <div className="mt-5 space-y-4">
                {latestBookings.length ? (
                  latestBookings.map((booking) => (
                    <div key={booking.id} className="rounded-[22px] bg-[var(--warm-white)] p-4">
                      <p className="font-semibold text-[var(--dark)]">{booking.client?.name ?? "Client"}</p>
                      <p className="mt-1 text-sm text-[var(--gray-text)]">
                        {booking.eventType ?? "Event"} · {formatEventDate(booking)} · {booking.eventCity}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="rounded-[20px] bg-[var(--warm-white)] px-4 py-6 text-sm text-[var(--gray-text)]">
                    New requests will appear here as soon as clients start booking.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-sm)]">
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--gray-text)]">Booking timeline</p>
              <h3 className="mt-2 font-heading text-3xl text-[var(--dark)]">Most recent workflow</h3>
              <div className="mt-5">
                <BookingTimeline history={latestBookings[0]?.statusHistory} />
              </div>
            </div>
          </section>
        </>
      )}

      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.08 }}
            className={`flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold shadow-[var(--shadow-md)] ${action.color}`}
          >
            <action.icon className="h-4 w-4" />
            {action.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
