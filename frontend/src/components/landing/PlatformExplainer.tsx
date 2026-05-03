"use client";

import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { gsap } from "@/lib/gsap";

const vendorItems = [
  "Bookings ek jagah track karein",
  "WhatsApp pe auto notification",
  "Advance payment ka hisaab",
  "Client history aur notes",
  "Monthly earnings report",
  "Staff aur commission track",
];

const clientItems = [
  "500+ verified vendors browse karein",
  "Reviews aur ratings compare karein",
  "Packages aur prices dekhein",
  "Seedha booking request karein",
  "Safe advance payment karein",
];

export function PlatformExplainer() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const context = gsap.context(() => {
      gsap.from("[data-side='vendor']", {
        x: -80,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from("[data-side='client']", {
        x: 80,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section className="section-pad">
      <div
        ref={rootRef}
        className="section-shell grid overflow-hidden rounded-[32px] border border-[color:rgba(201,168,76,0.18)] shadow-[var(--shadow-lg)] lg:grid-cols-2"
      >
        <div
          data-side="vendor"
          className="pattern-islamic bg-[var(--primary-dark)] px-8 py-12 text-white sm:px-10 lg:px-14"
        >
          <Badge variant="gold">For Vendors</Badge>
          <h2 className="display-h2 mt-6">Aap Ka Digital Business Manager</h2>
          <div className="mt-8 space-y-4">
            {vendorItems.map((item) => (
              <div key={item} className="flex items-start gap-3 text-white/78">
                <Check className="mt-1 h-5 w-5 text-[var(--gold)]" />
                <span className="leading-7">{item}</span>
              </div>
            ))}
          </div>
          <Button className="mt-10" variant="ghost-light">
            Vendor Dashboard Dekhein →
          </Button>
          <div className="mt-10 rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/55">Revenue</p>
                <p className="mt-3 font-mono-ui text-2xl text-[var(--gold)]">PKR 245K</p>
              </div>
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/55">Bookings</p>
                <p className="mt-3 font-mono-ui text-2xl text-white">12</p>
              </div>
            </div>
          </div>
        </div>

        <div
          data-side="client"
          className="bg-[var(--warm-white)] px-8 py-12 sm:px-10 lg:px-14"
        >
          <Badge>For Clients</Badge>
          <h2 className="display-h2 mt-6 text-[var(--dark)]">
            Apna Perfect Vendor Dhundho
          </h2>
          <div className="mt-8 space-y-4">
            {clientItems.map((item) => (
              <div key={item} className="flex items-start gap-3 text-[var(--gray-text)]">
                <Check className="mt-1 h-5 w-5 text-[var(--primary)]" />
                <span className="leading-7">{item}</span>
              </div>
            ))}
          </div>
          <Button className="mt-10" variant="secondary">
            Vendors Browse Karein →
          </Button>
          <div className="mt-10 rounded-[28px] border border-[color:rgba(27,77,62,0.1)] bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-[var(--gold-subtle)] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--gold-dark)]">
                  Top Rated
                </p>
                <p className="mt-3 font-heading text-xl text-[var(--dark)]">
                  Bridal Makeup
                </p>
              </div>
              <div className="rounded-2xl bg-[var(--primary-subtle)] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--primary-dark)]">
                  City Match
                </p>
                <p className="mt-3 font-heading text-xl text-[var(--dark)]">
                  Rawalpindi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
