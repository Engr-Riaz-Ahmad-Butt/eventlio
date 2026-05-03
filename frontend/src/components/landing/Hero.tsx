"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap, countUp } from "@/lib/gsap";
import { createPhoneScene } from "@/lib/three-hero";
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

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const statsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const [canvasReady, setCanvasReady] = useState(true);
  const { locale } = useLocale();

  useEffect(() => {
    if (!rootRef.current) return;

    const context = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-badge]", { y: 30, opacity: 0, duration: 0.6 })
        .from(
          "[data-hero-word]",
          {
            y: 80,
            opacity: 0,
            stagger: 0.07,
            duration: 0.7,
          },
          "-=0.2",
        )
        .from("[data-hero-copy]", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(
          "[data-hero-cta]",
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
          },
          "-=0.2",
        )
        .from("[data-hero-proof]", { y: 15, opacity: 0, duration: 0.4 }, "-=0.1")
        .from(
          "[data-hero-visual]",
          {
            x: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.8",
        );
    }, rootRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      const cleanup = createPhoneScene(canvasRef.current);
      return cleanup;
    } catch {
      setCanvasReady(false);
    }
  }, []);

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
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <div
              data-hero-badge
              className="eyebrow border-[color:rgba(201,168,76,0.4)] text-[var(--gold)]"
            >
              {copy.badge}
            </div>

            <div className="mt-7 space-y-1">
              {copy.lines.map((line) => (
                <div
                  key={line}
                  data-hero-word
                  className={`display-hero ${line.includes(".") || line === "بکنگ" || line === "ایونٹ کو بڑھائیں۔" ? "text-[var(--gold)]" : "text-white"}`}
                >
                  {line}
                </div>
              ))}
            </div>

            <div data-hero-copy className="mt-7 max-w-2xl space-y-3 text-lg leading-8 text-white/72">
              <p>{copy.subOne}</p>
              <p>{copy.subTwo}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
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
              className="mt-10 flex flex-wrap items-center gap-5 text-sm text-white/72"
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

          <div data-hero-visual className="relative flex justify-center lg:justify-end">
            {canvasReady ? (
              <div className="relative h-[420px] w-full max-w-[420px]">
                <canvas ref={canvasRef} className="h-full w-full" />
              </div>
            ) : (
              <div className="phone-mockup relative h-[520px] w-[260px] overflow-hidden rounded-[36px] border-[6px] border-[var(--primary-light)] bg-[var(--primary)] p-5 shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
                <div className="h-11 rounded-2xl bg-[var(--gold)]/90" />
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="h-18 rounded-2xl bg-white/10" />
                  <div className="h-18 rounded-2xl bg-white/10" />
                </div>
                <div className="mt-6 space-y-3">
                  {[0, 1, 2, 3, 4].map((item) => (
                    <div key={item} className="h-10 rounded-xl bg-white/8" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
