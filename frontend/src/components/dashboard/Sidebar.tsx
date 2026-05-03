"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  CircleHelp,
  CreditCard,
  ExternalLink,
  Image,
  LayoutDashboard,
  Settings,
  UserRound,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const items = [
  { href: "/vendor-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vendor-dashboard/profile", label: "Profile & Gallery", icon: Image },
  { href: "/vendor-dashboard/packages", label: "Bookings", icon: CalendarDays },
  { href: "/vendor-dashboard/portfolio", label: "Clients", icon: Users },
  { href: "/vendor-dashboard/areas", label: "Payments", icon: CreditCard },
  { href: "/vendor-dashboard/settings", label: "Settings", icon: Settings },
  { href: "#", label: "Help", icon: CircleHelp },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <aside className="hidden w-[260px] shrink-0 flex-col border-r border-[color:rgba(201,168,76,0.12)] bg-[var(--primary-dark)] text-white lg:flex">
      <div className="border-b border-[color:rgba(201,168,76,0.12)] px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--gold)] text-[var(--dark)]">
            ✦
          </div>
          <div>
            <p className="font-heading text-2xl text-[var(--gold)]">Eventlio</p>
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">
              Vendor OS
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm font-medium transition",
                active
                  ? "border-[color:rgba(201,168,76,0.16)] bg-[color:rgba(201,168,76,0.08)] text-[var(--gold)]"
                  : "text-white/65 hover:bg-white/5 hover:text-white",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[color:rgba(201,168,76,0.12)] p-4">
        <Button variant="whatsapp" className="w-full">
          WhatsApp Support
        </Button>

        <div className="mt-4 rounded-[22px] border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:rgba(201,168,76,0.16)] text-[var(--gold)]">
              <UserRound className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-white">{user?.name ?? "Event Vendor"}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                {user?.role?.replace("_", " ") ?? "vendor"}
              </p>
            </div>
          </div>

          {user?.vendorProfile?.slug ? (
            <Link
              href={`/vendors/${user.vendorProfile.slug}`}
              target="_blank"
              className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/72 hover:text-[var(--gold)]"
            >
              View Public Page
              <ExternalLink className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
