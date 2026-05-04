import api from "@/lib/api";
import type { Booking } from "@/types";

export type RespondBookingInput = {
  bookingId: string;
  decision: "ACCEPTED" | "REJECTED";
  note?: string;
};

export async function getClientBookings() {
  const response = await api.get("/bookings/me");
  return response.data.data as Booking[];
}

export async function getVendorBookings() {
  const response = await api.get("/bookings/vendor/me");
  return response.data.data as Booking[];
}

export async function respondToBooking({ bookingId, decision, note }: RespondBookingInput) {
  const response = await api.patch(`/bookings/${bookingId}/respond`, {
    decision,
    note,
  });
  return response.data.data as Booking;
}

export async function confirmBooking(bookingId: string, note?: string) {
  const response = await api.patch(`/bookings/${bookingId}/confirm`, {
    note,
  });
  return response.data.data as Booking;
}

export async function cancelBooking(bookingId: string, note?: string) {
  const response = await api.patch(`/bookings/${bookingId}/cancel`, {
    note,
  });
  return response.data.data as Booking;
}
