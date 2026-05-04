"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarDays, Loader2, LogOut, MapPin, Search, Settings, ShieldCheck } from "lucide-react";
import type { Booking } from "@/types";
import { BookingStatusBadge } from "@/components/bookings/BookingStatusBadge";
import { BookingTimeline } from "@/components/bookings/BookingTimeline";
import { Button } from "@/components/ui/button";
import { cancelBooking, confirmBooking, getClientBookings } from "@/lib/bookings";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

function formatEventDate(booking: Booking) {
  return new Intl.DateTimeFormat("en-PK", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(booking.eventDate));
}

function ClientDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, logout } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActingId, setIsActingId] = useState<string | null>(null);

  async function handleLogout() {
    try {
      await api.post("/auth/logout");
    } catch {}
    logout();
    router.push("/login");
  }

  useEffect(() => {
    async function loadBookings() {
      try {
        const nextBookings = await getClientBookings();
        setBookings(nextBookings);
      } catch (error: any) {
        const message = error.response?.data?.message;
        toast.error(Array.isArray(message) ? message[0] : message || "Could not load your bookings.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadBookings();
  }, []);

  useEffect(() => {
    const bookingId = searchParams.get("booking");
    if (bookingId) {
      toast.success("Your booking request has been sent.");
    }
  }, [searchParams]);

  async function handleConfirm(bookingId: string) {
    setIsActingId(bookingId);
    try {
      const updated = await confirmBooking(bookingId, "Client confirmed the accepted booking.");
      setBookings((current) => current.map((booking) => (booking.id === updated.id ? updated : booking)));
      toast.success("Booking confirmed successfully.");
    } catch (error: any) {
      const message = error.response?.data?.message;
      toast.error(Array.isArray(message) ? message[0] : message || "Could not confirm booking.");
    } finally {
      setIsActingId(null);
    }
  }

  async function handleCancel(bookingId: string) {
    const note = window.prompt("Optional cancellation note for the vendor:") || undefined;
    setIsActingId(bookingId);
    try {
      const updated = await cancelBooking(bookingId, note);
      setBookings((current) => current.map((booking) => (booking.id === updated.id ? updated : booking)));
      toast.success("Booking cancelled.");
    } catch (error: any) {
      const message = error.response?.data?.message;
      toast.error(Array.isArray(message) ? message[0] : message || "Could not cancel booking.");
    } finally {
      setIsActingId(null);
    }
  }

  const stats = useMemo(() => {
    const confirmed = bookings.filter((booking) => booking.status === "CONFIRMED").length;
    const inProgress = bookings.filter((booking) => ["PENDING", "ACCEPTED"].includes(booking.status)).length;
    const totalSpend = bookings
      .filter((booking) => ["ACCEPTED", "CONFIRMED", "COMPLETED"].includes(booking.status))
      .reduce((sum, booking) => sum + booking.totalAmount, 0);

    return {
      confirmed,
      inProgress,
      totalSpend,
    };
  }, [bookings]);

  return (
    <main className="market-shell min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[32px] bg-[var(--primary-dark)] p-8 text-white shadow-[var(--shadow-lg)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[var(--gold-light)]">Client dashboard</p>
              <h1 className="mt-3 font-heading text-4xl">Welcome back, {user?.name ?? "Client"}.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72">
                Track every request, confirm accepted deals, aur vendor timeline ko ek clean place se manage karein.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost-light" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
              <Button variant="gold" asChild>
                <Link href="/vendors">
                  <Search className="h-4 w-4" />
                  Browse Vendors
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="surface-card rounded-[24px] p-6">
            <CalendarDays className="h-5 w-5 text-[var(--gold-dark)]" />
            <h2 className="mt-4 text-lg font-semibold text-[var(--dark)]">Confirmed Events</h2>
            <p className="mt-2 font-mono-ui text-3xl text-[var(--dark)]">{stats.confirmed}</p>
          </div>
          <div className="surface-card rounded-[24px] p-6">
            <ShieldCheck className="h-5 w-5 text-[var(--primary)]" />
            <h2 className="mt-4 text-lg font-semibold text-[var(--dark)]">Active Requests</h2>
            <p className="mt-2 font-mono-ui text-3xl text-[var(--dark)]">{stats.inProgress}</p>
          </div>
          <div className="surface-card rounded-[24px] p-6">
            <MapPin className="h-5 w-5 text-[var(--primary)]" />
            <h2 className="mt-4 text-lg font-semibold text-[var(--dark)]">Profile</h2>
            <p className="mt-2 text-sm text-[var(--gray-text)]">{user?.clientProfile?.city || "City not set yet"}</p>
          </div>
          <div className="surface-card rounded-[24px] p-6">
            <Settings className="h-5 w-5 text-[var(--primary)]" />
            <h2 className="mt-4 text-lg font-semibold text-[var(--dark)]">Expected Spend</h2>
            <p className="mt-2 font-mono-ui text-3xl text-[var(--dark)]">PKR {stats.totalSpend.toLocaleString()}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="surface-card rounded-[28px] px-6 py-16 text-center text-[var(--gray-text)]">
            Loading your booking history...
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
            <section className="surface-card rounded-[28px] p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[var(--gray-text)]">Booking history</p>
                  <h2 className="mt-2 font-heading text-3xl text-[var(--dark)]">My bookings</h2>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/vendors">Book another vendor</Link>
                </Button>
              </div>

              <div className="mt-6 space-y-5">
                {bookings.length ? (
                  bookings.map((booking) => (
                    <article key={booking.id} className="rounded-[24px] bg-[var(--warm-white)] p-5">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-heading text-2xl text-[var(--dark)]">
                              {booking.vendor?.businessName ?? "Vendor"}
                            </h3>
                            <BookingStatusBadge status={booking.status} />
                          </div>
                          <p className="text-sm text-[var(--gray-text)]">
                            {booking.eventType ?? "Event"} · {formatEventDate(booking)}
                            {booking.eventTime ? ` · ${booking.eventTime}` : ""}
                          </p>
                          <p className="text-sm text-[var(--gray-text)]">
                            {booking.eventCity}
                            {booking.eventLocation ? ` · ${booking.eventLocation}` : ""}
                          </p>
                          <p className="font-mono-ui text-lg text-[var(--gold-dark)]">
                            PKR {booking.totalAmount.toLocaleString()} total · PKR {booking.balanceAmount.toLocaleString()} remaining
                          </p>
                          {booking.notes ? <p className="text-sm leading-7 text-[var(--gray-text)]">{booking.notes}</p> : null}
                          {booking.rejectionReason ? (
                            <p className="text-sm text-[var(--danger)]">Rejection note: {booking.rejectionReason}</p>
                          ) : null}
                          {booking.cancelReason ? (
                            <p className="text-sm text-[var(--gray-text)]">Cancellation note: {booking.cancelReason}</p>
                          ) : null}
                        </div>

                        <div className="flex flex-wrap gap-3 lg:max-w-[240px] lg:justify-end">
                          {booking.status === "ACCEPTED" ? (
                            <Button
                              variant="gold"
                              size="sm"
                              disabled={isActingId === booking.id}
                              onClick={() => void handleConfirm(booking.id)}
                            >
                              {isActingId === booking.id ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                              Confirm Booking
                            </Button>
                          ) : null}
                          {["PENDING", "ACCEPTED"].includes(booking.status) ? (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={isActingId === booking.id}
                              onClick={() => void handleCancel(booking.id)}
                            >
                              Cancel Request
                            </Button>
                          ) : null}
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={booking.vendor?.slug ? `/vendor/${booking.vendor.slug}` : "/vendors"}>View Vendor</Link>
                          </Button>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-[24px] bg-[var(--warm-white)] px-5 py-10 text-center text-[var(--gray-text)]">
                    No booking requests yet. Browse vendors and send your first request.
                  </div>
                )}
              </div>
            </section>

            <section className="space-y-6">
              <div className="surface-card rounded-[28px] p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--gray-text)]">Booking timeline</p>
                <h2 className="mt-2 font-heading text-3xl text-[var(--dark)]">Latest activity</h2>
                <div className="mt-5">
                  <BookingTimeline history={bookings[0]?.statusHistory} />
                </div>
              </div>

              <div className="surface-card rounded-[28px] p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--gray-text)]">What happens next</p>
                <h2 className="mt-2 font-heading text-3xl text-[var(--dark)]">Booking flow</h2>
                <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--gray-text)]">
                  <p>1. Client request is submitted with event details.</p>
                  <p>2. Vendor accepts or rejects after checking availability.</p>
                  <p>3. Accepted requests must be confirmed by the client.</p>
                  <p>4. Contact sharing and payment workflows continue in the next module.</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ClientDashboardPage() {
  return (
    <Suspense
      fallback={
        <main className="market-shell min-h-screen px-6 py-10">
          <div className="mx-auto max-w-6xl">
            <div className="surface-card rounded-[28px] px-6 py-16 text-center text-[var(--gray-text)]">
              Loading your dashboard...
            </div>
          </div>
        </main>
      }
    >
      <ClientDashboardContent />
    </Suspense>
  );
}
