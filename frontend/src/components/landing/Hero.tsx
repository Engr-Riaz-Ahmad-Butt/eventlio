"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, Calendar, CheckCircle, Clock, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { countUp } from "@/lib/gsap";
import { useLocale } from "@/providers/locale-provider";
import { pickLocale } from "@/lib/locale";

const stats = [
  { label: { en: "Vendors", "roman-ur": "Vendors", ur: "وینڈرز" }, value: 500, suffix: "+" },
  { label: { en: "Bookings", "roman-ur": "Bookings", ur: "بکنگز" }, value: 2000, suffix: "+" },
  {
    label: { en: "Revenue Tracked", "roman-ur": "Revenue Tracked", ur: "ٹریک شدہ ریونیو" },
    value: 5,
    prefix: "PKR ",
    suffix: "Cr+",
  },
];

const bookings = [
  {
    name: "Ayesha Wedding",
    vendor: "Glamour Studio",
    date: "Jun 14",
    amount: "PKR 45,000",
    status: "confirmed",
    avatar: "A",
  },
  {
    name: "Ali & Sara Nikkah",
    vendor: "Royal Decor",
    date: "Jun 22",
    amount: "PKR 80,000",
    status: "pending",
    avatar: "S",
  },
  {
    name: "Fatima Mehndi",
    vendor: "Capture Moments",
    date: "Jul 5",
    amount: "PKR 25,000",
    status: "confirmed",
    avatar: "F",
  },
];

function DashboardMockup() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto lg:mx-0 lg:ml-auto">
      {/* Glow behind card */}
      <div className="absolute -inset-4 rounded-[40px] bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.18),transparent_70%)]" />

      {/* Main dashboard card */}
      <div className="relative rounded-[28px] border border-[color:rgba(201,168,76,0.22)] bg-[color:rgba(13,43,34,0.85)] p-6 shadow-[0_40px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45 font-medium">Dashboard</p>
            <p className="text-base font-semibold text-white mt-0.5">May 2026</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-[color:rgba(201,168,76,0.15)] border border-[color:rgba(201,168,76,0.3)] px-3 py-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-[var(--gold)]" />
            <span className="text-[12px] font-semibold text-[var(--gold)]">+24% Revenue</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Bookings", value: "18", icon: Calendar },
            { label: "Pending", value: "5", icon: Clock },
            { label: "Rating", value: "4.9", icon: Star },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl bg-white/5 border border-white/8 p-3 text-center"
            >
              <Icon className="h-4 w-4 text-[var(--gold)] mx-auto mb-1.5 opacity-80" />
              <p className="text-lg font-bold text-white leading-none">{value}</p>
              <p className="text-[10px] text-white/45 mt-1 uppercase tracking-wide">{label}</p>
            </div>
          ))}
        </div>

        {/* Revenue bar */}
        <div className="mb-5 rounded-2xl bg-white/4 border border-white/8 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[12px] font-medium text-white/70">Monthly Revenue</p>
            <p className="text-[13px] font-bold text-[var(--gold)]">PKR 3.2L</p>
          </div>
          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold)]"
              style={{ width: "72%" }}
            />
          </div>
          <p className="text-[10px] text-white/35 mt-2">72% of monthly goal</p>
        </div>

        {/* Bookings list */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/45 font-medium mb-3">
            Upcoming Bookings
          </p>
          <div className="space-y-2.5">
            {bookings.map((booking) => (
              <div
                key={booking.name}
                className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/6 px-3.5 py-2.5"
              >
                <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-[var(--gold-dark)] to-[var(--primary-light)] flex items-center justify-center text-[11px] font-bold text-white">
                  {booking.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-white truncate">{booking.name}</p>
                  <p className="text-[10px] text-white/45 truncate">{booking.vendor}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] font-semibold text-[var(--gold)]">{booking.amount}</p>
                  <div className="flex items-center gap-1 justify-end mt-0.5">
                    {booking.status === "confirmed" ? (
                      <CheckCircle className="h-2.5 w-2.5 text-emerald-400" />
                    ) : (
                      <Clock className="h-2.5 w-2.5 text-amber-400" />
                    )}
                    <p className="text-[9px] text-white/40">{booking.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge — top right */}
      <div className="absolute -top-4 -right-2 rounded-2xl border border-[color:rgba(201,168,76,0.35)] bg-[color:rgba(10,31,23,0.9)] px-4 py-2.5 shadow-xl backdrop-blur-xl animate-[float_4s_ease-in-out_infinite]">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">New Inquiry</p>
        <p className="text-[12px] font-semibold text-white mt-0.5">Bridal Package — Jun 30</p>
      </div>

      {/* Floating payment badge — bottom left */}
      <div className="absolute -bottom-3 -left-3 rounded-2xl border border-emerald-500/25 bg-[color:rgba(5,150,105,0.15)] px-4 py-2.5 shadow-xl backdrop-blur-xl animate-[float_5s_ease-in-out_1s_infinite]">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          <div>
            <p className="text-[10px] text-emerald-300/70">Payment Received</p>
            <p className="text-[12px] font-semibold text-emerald-300">PKR 45,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const statsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const { locale } = useLocale();

  // Stats count-up animation (scroll-triggered, separate from entrance)
  useEffect(() => {
    statsRef.current.forEach((element, index) => {
      if (!element) return;
      countUp(
        element,
        stats[index].value,
        stats[index].prefix ?? "",
        stats[index].suffix ?? "",
      );
    });
  }, []);

  const copy = pickLocale(locale, {
    en: {
      lines: ["Manage Every", "Booking.", "Grow Every", "Event."],
      badge: "Pakistan's #1 Event Platform",
      subOne:
        "Photographers, Makeup Artists, Salons, Decorators, Caterers, DJs.",
      subTwo:
        "Everything in one platform, from bookings to payment tracking.",
      primaryCta: "Register as Vendor",
      secondaryCta: "Browse Vendors",
      joined: "200+ Vendors Already Joined",
      trusted: "Trusted in Rawalpindi, Lahore, Karachi",
    },
    "roman-ur": {
      lines: ["Manage Every", "Booking.", "Grow Every", "Event."],
      badge: "Pakistan Ka #1 Event Platform",
      subOne:
        "Photographers, Makeup Artists, Salons, Decorators, Caterers, DJs.",
      subTwo:
        "Ek platform mein saari zaroorat, bookings se payment tracking tak.",
      primaryCta: "Vendor Register Karein",
      secondaryCta: "Vendors Browse Karein",
      joined: "200+ Vendors Already Joined",
      trusted: "Trusted in Rawalpindi, Lahore, Karachi",
    },
    ur: {
      lines: ["ہر", "بکنگ", "اور ہر", "ایونٹ کو بڑھائیں۔"],
      badge: "پاکستان کا نمبر 1 ایونٹ پلیٹ فارم",
      subOne:
        "فوٹوگرافرز، میک اپ آرٹسٹس، سیلونز، ڈیکوریٹرز، کیٹررز، ڈی جیز۔",
      subTwo:
        "بکنگ سے لے کر پیمنٹ ٹریکنگ تک، سب کچھ ایک ہی پلیٹ فارم میں۔",
      primaryCta: "وینڈر کے طور پر رجسٹر کریں",
      secondaryCta: "وینڈرز براؤز کریں",
      joined: "200+ وینڈرز پہلے ہی شامل ہو چکے ہیں",
      trusted: "راولپنڈی، لاہور اور کراچی میں قابلِ اعتماد",
    },
  });

  return (
    <section
      ref={rootRef}
      className="pattern-islamic relative min-h-screen overflow-hidden bg-[var(--primary-dark)] pt-28 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(27,77,62,0.85),rgba(10,31,23,1))]" />
      <div className="section-shell relative z-10 flex min-h-screen flex-col justify-center py-16">
        <div className="grid items-center gap-12 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: Copy */}
          <div className="max-w-3xl">
            <div
              data-hero-badge
              className="eyebrow border-[color:rgba(201,168,76,0.4)] text-[var(--gold)] animate-fade-in-up"
            >
              {copy.badge}
            </div>

            <div className="mt-7 space-y-1">
              {copy.lines.map((line, idx) => (
                <div
                  key={line}
                  data-hero-word
                  className={`display-hero animate-fade-in-up ${
                    line.includes(".") || line === "بکنگ" || line === "ایونٹ کو بڑھائیں۔"
                      ? "text-[var(--gold)]"
                      : "text-white"
                  }`}
                  style={{ animationDelay: `${200 + idx * 100}ms` }}
                >
                  {line}
                </div>
              ))}
            </div>

            <div 
              data-hero-copy 
              className="mt-7 max-w-2xl space-y-3 text-lg leading-8 text-white/72 animate-fade-in-up delay-400"
            >
              <p>{copy.subOne}</p>
              <p>{copy.subTwo}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 animate-fade-in-up delay-500">
              <Button data-hero-cta variant="gold" size="xl" asChild>
                <Link href="/register">
                  {copy.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button data-hero-cta variant="ghost-light" size="xl" asChild>
                <Link href="/vendors">{copy.secondaryCta}</Link>
              </Button>
            </div>

            <div
              data-hero-proof
              className="mt-10 flex flex-wrap items-center gap-5 text-sm text-white/72 animate-fade-in-up"
              style={{ animationDelay: "600ms" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3, 4].map((item) => (
                    <span
                      key={item}
                      className="h-10 w-10 rounded-full border-2 border-[var(--primary-dark)] bg-[linear-gradient(135deg,#c9a84c,#2d6e5a)]"
                    />
                  ))}
                </div>
                <span>{copy.joined}</span>
              </div>
              <div className="font-mono-ui tracking-wide text-[var(--gold)]">
                ★★★★★
                <span className="ml-3 font-body text-white/72">{copy.trusted}</span>
              </div>
            </div>
          </div>

          {/* Right: App Dashboard Mockup */}
          <div
            data-hero-visual
            className="relative flex justify-center lg:justify-end mt-8 lg:mt-0"
            style={{
              animation: "heroVisualIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.6s both",
            }}
          >
            <DashboardMockup />
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-[color:rgba(201,168,76,0.16)] bg-[var(--primary-dark)]/95">
        <div className="section-shell grid gap-6 py-6 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border-l border-[color:rgba(201,168,76,0.16)] pl-5 first:border-l-0 first:pl-0"
            >
              <span
                ref={(element) => {
                  statsRef.current[index] = element;
                }}
                className="font-mono-ui text-[32px] font-medium text-[var(--gold)]"
              >
                0
              </span>
              <p className="mt-1 text-sm uppercase tracking-[0.24em] text-white/58">
                {pickLocale(locale, stat.label)}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
