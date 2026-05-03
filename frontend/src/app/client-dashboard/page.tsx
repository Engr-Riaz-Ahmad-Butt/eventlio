"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { CalendarDays, LogOut, Settings, UserCircle2 } from "lucide-react";

export default function ClientDashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  async function handleLogout() {
    try {
      await api.post("/auth/logout");
    } catch {}
    logout();
    router.push("/login");
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="glass rounded-[2rem] p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Client dashboard</p>
              <h1 className="mt-3 text-3xl font-black">Welcome back, {user?.name ?? "Client"}.</h1>
              <p className="mt-3 text-sm text-foreground/70">
                Your account is ready for vendor discovery and booking activity.
              </p>
            </div>
            <Button variant="outline" className="border-white/10 bg-white/5" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="glass rounded-[1.5rem] p-6">
            <UserCircle2 className="h-5 w-5 text-violet-300" />
            <h2 className="mt-4 text-lg font-bold">Profile</h2>
            <p className="mt-2 text-sm text-foreground/70">{user?.clientProfile?.city || "City not set yet"}</p>
          </div>
          <div className="glass rounded-[1.5rem] p-6">
            <CalendarDays className="h-5 w-5 text-violet-300" />
            <h2 className="mt-4 text-lg font-bold">Bookings</h2>
            <p className="mt-2 text-sm text-foreground/70">Booking flows are ready for the next module.</p>
          </div>
          <div className="glass rounded-[1.5rem] p-6">
            <Settings className="h-5 w-5 text-violet-300" />
            <h2 className="mt-4 text-lg font-bold">Account state</h2>
            <p className="mt-2 text-sm text-foreground/70">
              Onboarding {user?.onboardingCompletedAt ? "completed" : "in progress"}.
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground/80 transition hover:bg-white/10"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
