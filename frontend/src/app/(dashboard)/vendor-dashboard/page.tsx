"use client";

import { motion } from "framer-motion";
import { FileText, MessageCircleMore, Plus } from "lucide-react";
import { BookingKanban } from "@/components/dashboard/BookingKanban";
import { RecentPayments } from "@/components/dashboard/RecentPayments";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

const actions = [
  { label: "Nai Booking Add", icon: Plus, color: "bg-[var(--gold)] text-[var(--dark)]" },
  { label: "WhatsApp Blast", icon: MessageCircleMore, color: "bg-[var(--whatsapp)] text-white" },
  { label: "Invoice Banao", icon: FileText, color: "bg-[var(--primary)] text-white" },
];

export default function VendorDashboardPage() {
  const { user } = useAuthStore();

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
            Aaj ki bookings, pending payments, aur upcoming events sab ek jagah. This is your business command center.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="lg">
            Generate Report
          </Button>
          <Button variant="gold" size="lg">
            Add New Package
          </Button>
        </div>
      </div>

      <StatsRow />

      <div className="space-y-5">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--gray-text)]">
            Booking Pipeline
          </p>
          <h3 className="mt-2 font-heading text-3xl text-[var(--dark)]">
            Pending se Completed tak
          </h3>
        </div>
        <BookingKanban />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <RecentPayments />
        <UpcomingEvents />
      </div>

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
