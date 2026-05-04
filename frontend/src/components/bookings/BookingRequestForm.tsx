"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarDays, Loader2, MapPin, ShieldCheck } from "lucide-react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { bookingRequestSchema, type BookingRequestFormData } from "@/schemas/booking.schema";
import type { MarketplaceVendorDetail } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type BookingRequestFormProps = {
  vendor: MarketplaceVendorDetail;
  preselectedPackageId?: string;
};

export function BookingRequestForm({
  vendor,
  preselectedPackageId,
}: BookingRequestFormProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultPackage =
    preselectedPackageId && vendor.packages.some((item) => item.id === preselectedPackageId)
      ? preselectedPackageId
      : vendor.packages[0]?.id;

const selectedPackage = useMemo(
    () => vendor.packages.find((item) => item.id === defaultPackage),
    [defaultPackage, vendor.packages],
  );

  const eventTypes = ["Mehndi", "Barat", "Walima", "Engagement", "Birthday", "Corporate"];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingRequestFormData>({
    resolver: zodResolver(bookingRequestSchema),
    defaultValues: {
      vendorSlug: vendor.slug,
      packageId: defaultPackage,
      eventType: "Barat",
      eventCity: vendor.city,
    },
  });

  const watchedPackageId = watch("packageId");
  const activePackage =
    vendor.packages.find((item) => item.id === watchedPackageId) ?? selectedPackage;

  async function onSubmit(values: BookingRequestFormData) {
    if (!isAuthenticated || !user) {
      router.push(`/login?redirect=${encodeURIComponent(`/bookings/request?vendor=${vendor.slug}`)}`);
      return;
    }

    if (user.role !== "CLIENT") {
      toast.error("Only client accounts can create booking requests.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post("/bookings/request", {
        ...values,
        guestCount:
          values.guestCount === undefined || values.guestCount === ""
            ? undefined
            : Number(values.guestCount),
      });
      const booking = response.data.data;
      toast.success("Booking request sent successfully.");
      router.push(`/client-dashboard?booking=${booking.id}`);
    } catch (error: any) {
      const message = error.response?.data?.message;
      toast.error(Array.isArray(message) ? message[0] : message || "Could not create booking request.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="market-shell min-h-screen px-6 py-28">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[32px] border border-[color:rgba(27,77,62,0.08)] bg-white p-8 shadow-[var(--shadow-lg)] sm:p-10">
          <p className="section-label">Module 04</p>
          <h1 className="display-h2 mt-4 text-[var(--dark)]">Create a booking request</h1>
          <p className="mt-4 leading-8 text-[var(--gray-text)]">
            Fill in your event details and send a clean request to the vendor. Contact details remain protected until the booking is properly accepted and confirmed.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <input type="hidden" {...register("vendorSlug")} />

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="packageId">Package</Label>
                <select
                  id="packageId"
                  {...register("packageId")}
                  className="h-12 w-full rounded-[16px] border border-[color:rgba(27,77,62,0.1)] bg-[var(--warm-white)] px-4 text-sm text-[var(--dark)]"
                >
                  {vendor.packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title} - PKR {pkg.price.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <select
                  id="eventType"
                  {...register("eventType")}
                  className="h-12 w-full rounded-[16px] border border-[color:rgba(27,77,62,0.1)] bg-[var(--warm-white)] px-4 text-sm text-[var(--dark)]"
                >
                  {eventTypes.map((eventType) => (
                    <option key={eventType} value={eventType}>
                      {eventType}
                    </option>
                  ))}
                </select>
                {errors.eventType ? <p className="text-xs text-red-500">{errors.eventType.message}</p> : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input id="eventDate" type="date" {...register("eventDate")} />
                {errors.eventDate ? <p className="text-xs text-red-500">{errors.eventDate.message}</p> : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventTime">Event Time</Label>
                <Input id="eventTime" type="time" {...register("eventTime")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestCount">Guest Count</Label>
                <Input id="guestCount" type="number" min={1} placeholder="300" {...register("guestCount")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventCity">Event City</Label>
                <Input id="eventCity" placeholder="Rawalpindi" {...register("eventCity")} />
                {errors.eventCity ? <p className="text-xs text-red-500">{errors.eventCity.message}</p> : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventLocation">Event Location</Label>
                <Input id="eventLocation" placeholder="Venue / street / hall" {...register("eventLocation")} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes for the vendor</Label>
              <Textarea
                id="notes"
                rows={6}
                placeholder="Mehndi, Barat, Walima details, family preferences, coverage needs, timing notes..."
                {...register("notes")}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="gold" size="xl" type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {isSubmitting ? "Sending Request..." : "Send Booking Request"}
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link href={`/vendor/${vendor.slug}`}>Back to Vendor</Link>
              </Button>
            </div>
          </form>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[32px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-md)]">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--gold-dark)]">Selected Vendor</p>
            <h2 className="mt-4 font-heading text-3xl text-[var(--dark)]">{vendor.businessName}</h2>
            <div className="mt-4 space-y-3 text-sm text-[var(--gray-text)]">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--primary)]" />
                {vendor.city}
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[var(--primary)]" />
                {vendor.category?.name ?? "Event Vendor"}
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--primary)]" />
                WhatsApp remains hidden until booking is accepted
              </p>
            </div>
          </div>

          <div className="rounded-[32px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-md)]">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--gold-dark)]">Current Package</p>
            <h3 className="mt-4 font-heading text-2xl text-[var(--dark)]">
              {activePackage?.title ?? "No package selected"}
            </h3>
            <p className="mt-3 font-mono-ui text-3xl text-[var(--gold-dark)]">
              PKR {(activePackage?.price ?? vendor.startingPrice).toLocaleString()}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--gray-text)]">
              {activePackage?.description || "The final event discussion can continue after the vendor reviews your request."}
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
