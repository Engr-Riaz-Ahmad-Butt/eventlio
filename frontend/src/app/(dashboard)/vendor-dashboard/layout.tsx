"use client";

import { Bell, Menu, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useAuthStore } from "@/store/auth-store";

const labels: Record<string, string> = {
  "/vendor-dashboard": "Dashboard",
  "/vendor-dashboard/profile": "Profile & Gallery",
  "/vendor-dashboard/packages": "Bookings",
  "/vendor-dashboard/portfolio": "Clients",
  "/vendor-dashboard/areas": "Payments",
};

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-[var(--warm-white)] lg:flex">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[color:rgba(27,77,62,0.08)] bg-white/90 px-5 shadow-[var(--shadow-sm)] backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:rgba(27,77,62,0.08)] text-[var(--primary-dark)] lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--gray-text)]">
                Vendor Workspace
              </p>
              <h1 className="font-heading text-2xl text-[var(--dark)]">
                {labels[pathname] ?? "Dashboard"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[color:rgba(27,77,62,0.08)] text-[var(--primary-dark)]">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
            </button>
            <div className="hidden rounded-full bg-[color:rgba(37,211,102,0.14)] px-4 py-2 text-sm font-medium text-[var(--whatsapp)] sm:block">
              WhatsApp Connected
            </div>
            <div className="flex items-center gap-3 rounded-full border border-[color:rgba(27,77,62,0.08)] bg-[var(--warm-white)] px-3 py-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-subtle)] text-[var(--primary-dark)]">
                <UserRound className="h-4 w-4" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-[var(--dark)]">{user?.name ?? "Vendor User"}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--gray-text)]">
                  {user?.vendorProfile?.businessName ?? "Eventlio Vendor"}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="section-shell py-8">{children}</div>
      </main>
    </div>
  );
}
