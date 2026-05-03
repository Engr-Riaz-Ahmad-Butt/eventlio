"use client";

import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useLocale } from "@/providers/locale-provider";
import { pickLocale } from "@/lib/locale";

export function PlatformExplainer() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { locale } = useLocale();

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

  const copy = pickLocale(locale, {
    en: {
      vendorLabel: "For Vendors",
      vendorTitle: "Your Digital Business Manager",
      vendorItems: [
        "Track bookings in one place",
        "Automatic WhatsApp notifications",
        "Advance payment visibility",
        "Client history and notes",
        "Monthly earnings reports",
        "Staff and commission tracking",
      ],
      vendorCta: "See Vendor Dashboard →",
      clientLabel: "For Clients",
      clientTitle: "Find Your Perfect Vendor",
      clientItems: [
        "Browse 500+ verified vendors",
        "Compare reviews and ratings",
        "View packages and prices",
        "Send direct booking requests",
        "Track safe advance payments",
      ],
      clientCta: "Browse Vendors →",
      revenue: "Revenue",
      bookings: "Bookings",
      topRated: "Top Rated",
      cityMatch: "City Match",
      category: "Bridal Makeup",
      city: "Rawalpindi",
    },
    "roman-ur": {
      vendorLabel: "For Vendors",
      vendorTitle: "Aap Ka Digital Business Manager",
      vendorItems: [
        "Bookings ek jagah track karein",
        "WhatsApp pe auto notification",
        "Advance payment ka hisaab",
        "Client history aur notes",
        "Monthly earnings report",
        "Staff aur commission track",
      ],
      vendorCta: "Vendor Dashboard Dekhein →",
      clientLabel: "For Clients",
      clientTitle: "Apna Perfect Vendor Dhundho",
      clientItems: [
        "500+ verified vendors browse karein",
        "Reviews aur ratings compare karein",
        "Packages aur prices dekhein",
        "Seedha booking request karein",
        "Safe advance payment karein",
      ],
      clientCta: "Vendors Browse Karein →",
      revenue: "Revenue",
      bookings: "Bookings",
      topRated: "Top Rated",
      cityMatch: "City Match",
      category: "Bridal Makeup",
      city: "Rawalpindi",
    },
    ur: {
      vendorLabel: "وینڈرز کے لیے",
      vendorTitle: "آپ کا ڈیجیٹل بزنس مینیجر",
      vendorItems: [
        "تمام بکنگز ایک جگہ ٹریک کریں",
        "واٹس ایپ پر خودکار نوٹیفکیشن",
        "ایڈوانس پیمنٹ کا واضح حساب",
        "کلائنٹ ہسٹری اور نوٹس",
        "ماہانہ آمدن کی رپورٹ",
        "اسٹاف اور کمیشن ٹریکنگ",
      ],
      vendorCta: "وینڈر ڈیش بورڈ دیکھیں ←",
      clientLabel: "کلائنٹس کے لیے",
      clientTitle: "اپنا بہترین وینڈر تلاش کریں",
      clientItems: [
        "500+ تصدیق شدہ وینڈرز براؤز کریں",
        "ریویوز اور ریٹنگز کا موازنہ کریں",
        "پیکجز اور قیمتیں دیکھیں",
        "براہِ راست بکنگ ریکویسٹ بھیجیں",
        "محفوظ ایڈوانس پیمنٹ ٹریک کریں",
      ],
      clientCta: "وینڈرز براؤز کریں ←",
      revenue: "آمدن",
      bookings: "بکنگز",
      topRated: "اعلیٰ ریٹیڈ",
      cityMatch: "شہر میچ",
      category: "برائیڈل میک اپ",
      city: "راولپنڈی",
    },
  });

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
          <Badge variant="gold">{copy.vendorLabel}</Badge>
          <h2 className="display-h2 mt-6">{copy.vendorTitle}</h2>
          <div className="mt-8 space-y-4">
            {copy.vendorItems.map((item) => (
              <div key={item} className="flex items-start gap-3 text-white/78">
                <Check className="mt-1 h-5 w-5 text-[var(--gold)]" />
                <span className="leading-7">{item}</span>
              </div>
            ))}
          </div>
          <Button className="mt-10" variant="ghost-light">
            {copy.vendorCta}
          </Button>
          <div className="mt-10 rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/55">{copy.revenue}</p>
                <p className="mt-3 font-mono-ui text-2xl text-[var(--gold)]">PKR 245K</p>
              </div>
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/55">{copy.bookings}</p>
                <p className="mt-3 font-mono-ui text-2xl text-white">12</p>
              </div>
            </div>
          </div>
        </div>

        <div
          data-side="client"
          className="bg-[var(--warm-white)] px-8 py-12 sm:px-10 lg:px-14"
        >
          <Badge>{copy.clientLabel}</Badge>
          <h2 className="display-h2 mt-6 text-[var(--dark)]">{copy.clientTitle}</h2>
          <div className="mt-8 space-y-4">
            {copy.clientItems.map((item) => (
              <div key={item} className="flex items-start gap-3 text-[var(--gray-text)]">
                <Check className="mt-1 h-5 w-5 text-[var(--primary)]" />
                <span className="leading-7">{item}</span>
              </div>
            ))}
          </div>
          <Button className="mt-10" variant="secondary">
            {copy.clientCta}
          </Button>
          <div className="mt-10 rounded-[28px] border border-[color:rgba(27,77,62,0.1)] bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-[var(--gold-subtle)] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--gold-dark)]">
                  {copy.topRated}
                </p>
                <p className="mt-3 font-heading text-xl text-[var(--dark)]">{copy.category}</p>
              </div>
              <div className="rounded-2xl bg-[var(--primary-subtle)] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--primary-dark)]">
                  {copy.cityMatch}
                </p>
                <p className="mt-3 font-heading text-xl text-[var(--dark)]">{copy.city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
