import { z } from "zod";

export const bookingRequestSchema = z.object({
  vendorSlug: z.string().min(1, "Vendor is required"),
  packageId: z.string().optional(),
  eventType: z.string().min(2, "Event type is required"),
  eventDate: z.string().min(1, "Event date is required"),
  eventTime: z.string().optional(),
  eventCity: z.string().min(2, "Event city is required"),
  eventLocation: z.string().optional(),
  guestCount: z
    .string()
    .optional()
    .refine((value) => value === undefined || value === "" || Number(value) > 0, {
      message: "Guest count must be greater than 0",
    }),
  notes: z.string().optional(),
});

export type BookingRequestFormData = z.infer<typeof bookingRequestSchema>;
