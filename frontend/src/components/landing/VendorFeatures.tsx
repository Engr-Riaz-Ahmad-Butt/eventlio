"use client";

import { useEffect, useRef } from "react";
import {
  CalendarDays,
  ChartNoAxesCombined,
  MessageCircleMore,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { revealOnScroll } from "@/lib/gsap";

const features = [
  {
    icon: CalendarDays,
    title: "Booking Management",
    body: "Pending, confirmed, completed. Saari bookings ek nazar mein.",
  },
  {
    icon: MessageCircleMore,
    title: "WhatsApp Integration",
    body: "Nai booking? Seedha WhatsApp pe notification. Zero effort.",
  },
  {
    icon: Wallet,
    title: "Payment Tracker",
    body: "Advance aya ya nahi, baqi kitna hai. Always updated.",
  },
  {
    icon: ShieldCheck,
    title: "Reviews System",
    body: "Client trust build karein with structured feedback and proof.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Business Analytics",
    body: "Monthly kamai, top packages, best clients. Clear data.",
  },
  {
    icon: Users,
    title: "Staff & Commission",
    body: "Team add karo, kaam assign karo, commission auto track karo.",
  },
];

export function VendorFeatures() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (gridRef.current) {
      revealOnScroll(gridRef.current.querySelectorAll("[data-feature-card]"), {
        y: 60,
      });
    }
  }, []);

  return (
    <section id="features" className="section-pad bg-[var(--primary-dark)] text-white">
      <div className="section-shell">
        <div className="max-w-3xl">
          <span className="eyebrow border-[color:rgba(201,168,76,0.32)] text-[var(--gold)]">
            Vendor Features
          </span>
          <h2 className="display-h1 mt-6">Sab Kuch Ek Dashboard Mein</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/64">
            Photographers, Makeup Artists, Salons. Sab ke liye operational clarity.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {features.map((feature) => (
            <article
              key={feature.title}
              data-feature-card
              className="glass-panel rounded-[28px] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[color:rgba(201,168,76,0.4)] hover:shadow-[var(--shadow-gold)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/8 text-[var(--gold)]">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 leading-8 text-white/68">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
