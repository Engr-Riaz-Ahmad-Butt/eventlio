import Link from "next/link";
import { ArrowRight, Building2, CalendarClock, Camera, MapPin, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Vendor storefronts",
    body: "Give bridal salons and makeup artists polished public profiles with packages, gallery work, and service cities.",
  },
  {
    icon: CalendarClock,
    title: "Booking-ready workflows",
    body: "Move from discovery to inquiry to paid booking with fewer back-and-forth messages.",
  },
  {
    icon: ShieldCheck,
    title: "Secure onboarding",
    body: "Role-based signup, OTP verification, and protected dashboards keep vendors and clients separated cleanly.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-6xl">
        <div className="glass rounded-[2rem] border border-white/10 p-8 sm:p-12 lg:p-16">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Eventlio</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                The event-vendor operating system for Pakistan&apos;s bridal market.
              </h1>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground/70">
              Phase 1 and 2 are live.
            </div>
          </div>

          <div className="grid gap-10 pt-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="max-w-2xl text-lg leading-8 text-foreground/70">
                Eventlio helps clients discover trusted vendors while giving business owners a cleaner way to
                manage profile setup, service packages, gallery work, and onboarding.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:from-violet-500 hover:to-indigo-500"
                >
                  Create account
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground/85 transition hover:bg-white/10"
                >
                  Sign in
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-3xl font-black text-white">10-20</p>
                  <p className="mt-2 text-sm text-foreground/65">initial vendors targeted</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-3xl font-black text-white">100+</p>
                  <p className="mt-2 text-sm text-foreground/65">bookings in first launch phase</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-3xl font-black text-white">2-sided</p>
                  <p className="mt-2 text-sm text-foreground/65">vendor and client experience</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.75rem] border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-cyan-500/10 p-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-violet-300" />
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-200/80">
                    Launch focus
                  </p>
                </div>
                <p className="mt-4 text-2xl font-bold">Bridal salons and makeup artists first.</p>
                <div className="mt-6 flex flex-wrap gap-2 text-sm text-foreground/70">
                  <span className="rounded-full border border-white/10 px-3 py-1">Bridal makeup</span>
                  <span className="rounded-full border border-white/10 px-3 py-1">Party makeup</span>
                  <span className="rounded-full border border-white/10 px-3 py-1">Salon storefronts</span>
                  <span className="rounded-full border border-white/10 px-3 py-1">Public packages</span>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-6">
                <div className="flex items-center gap-3 text-sm text-foreground/70">
                  <Camera className="h-4 w-4 text-cyan-300" />
                  <span>Portfolio gallery</span>
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm text-foreground/70">
                  <MapPin className="h-4 w-4 text-cyan-300" />
                  <span>City-based service coverage</span>
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm text-foreground/70">
                  <CalendarClock className="h-4 w-4 text-cyan-300" />
                  <span>Booking-ready vendor profiles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="glass rounded-[1.75rem] p-6">
            <feature.icon className="h-6 w-6 text-violet-300" />
            <h2 className="mt-4 text-xl font-bold">{feature.title}</h2>
            <p className="mt-3 text-sm leading-7 text-foreground/70">{feature.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
