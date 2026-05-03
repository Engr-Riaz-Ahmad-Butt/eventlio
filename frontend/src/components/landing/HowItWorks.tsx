"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { gsap } from "@/lib/gsap";
import { useLocale } from "@/providers/locale-provider";
import { pickLocale } from "@/lib/locale";

const stepsByLocale = {
  en: {
    title: "Simple. Fast. WhatsApp.",
    label: "How It Works",
    vendorTab: "For Vendors",
    clientTab: "For Clients",
    vendor: [
      ["Register and Build a Profile", "Set up your business in minutes. Add photos, packages, and prices."],
      ["Receive a Booking Request", "The client sends a request and you get a direct WhatsApp alert."],
      ["Accept the Request", "Confirm with one click and send an automatic confirmation."],
      ["Finalize with the Client", "Share details after intent is clear and close the deal with confidence."],
      ["Track Everything in Dashboard", "Payments, bookings, and upcoming events stay organized."],
    ],
    client: [
      ["Choose a City and Category", "Start with the right location and service type."],
      ["Compare Vendor Profiles", "Review ratings, pricing, gallery, and response times."],
      ["Send a Booking Request", "Reach out without endless back and forth."],
      ["Pay the Advance", "Use tracked advances for more confidence."],
      ["Enjoy the Event", "Better coordination leads to a smoother event day."],
    ],
  },
  "roman-ur": {
    title: "Simple. Fast. WhatsApp.",
    label: "How It Works",
    vendorTab: "Vendor Ke Liye",
    clientTab: "Client Ke Liye",
    vendor: [
      ["Register & Profile Banao", "2 minute mein apna business setup. Photos, packages, prices add karo."],
      ["Booking Request Aye", "Client request karta hai. Aap ko WhatsApp pe seedha notification aata hai."],
      ["Accept Karo", "Ek click mein confirm. Client ko automatic confirmation message jata hai."],
      ["Client Se Deal Karo", "Aap ka number share tab hota hai jab deal genuine ho. Details finalize karo."],
      ["Dashboard Mein Track Karo", "Payment track karo, upcoming events dekho, sab organized."],
    ],
    client: [
      ["City aur Category Choose Karo", "Apne shahar aur service type ke hisaab se shortlist banao."],
      ["Vendor Profiles Compare Karo", "Reviews, pricing, gallery aur response time ek nazar mein dekho."],
      ["Booking Request Bhejo", "Seedha request bhejo without endless back and forth."],
      ["Advance Payment Karo", "Secure payment tracking ke saath booking confidence milta hai."],
      ["Event Ka Maza Lo!", "Better coordination, better communication, better event outcome."],
    ],
  },
  ur: {
    title: "سادہ۔ تیز۔ واٹس ایپ۔",
    label: "یہ کیسے کام کرتا ہے",
    vendorTab: "وینڈرز کے لیے",
    clientTab: "کلائنٹس کے لیے",
    vendor: [
      ["رجسٹر کریں اور پروفائل بنائیں", "چند منٹ میں اپنا بزنس سیٹ اپ کریں۔ تصاویر، پیکجز اور قیمتیں شامل کریں۔"],
      ["بکنگ ریکویسٹ وصول کریں", "کلائنٹ ریکویسٹ بھیجتا ہے اور آپ کو فوراً واٹس ایپ الرٹ ملتا ہے۔"],
      ["منظور کریں", "ایک کلک میں کنفرم کریں اور خودکار تصدیق بھیجیں۔"],
      ["کلائنٹ سے تفصیل طے کریں", "جب نیت واضح ہو تو تفصیل شیئر کریں اور اعتماد کے ساتھ ڈیل مکمل کریں۔"],
      ["ڈیش بورڈ میں سب کچھ ٹریک کریں", "پیمنٹ، بکنگز اور آنے والے ایونٹس سب منظم رہتے ہیں۔"],
    ],
    client: [
      ["شہر اور کیٹیگری منتخب کریں", "صحیح مقام اور سروس ٹائپ سے تلاش شروع کریں۔"],
      ["وینڈر پروفائلز کا موازنہ کریں", "ریٹنگ، قیمت، گیلری اور ریسپانس ٹائم دیکھیں۔"],
      ["بکنگ ریکویسٹ بھیجیں", "غیر ضروری بار بار بات چیت کے بغیر رابطہ کریں۔"],
      ["ایڈوانس پیمنٹ کریں", "ٹریک شدہ ایڈوانس کے ساتھ زیادہ اعتماد حاصل کریں۔"],
      ["ایونٹ انجوائے کریں", "بہتر کوآرڈینیشن بہتر ایونٹ ڈے بناتی ہے۔"],
    ],
  },
} as const;

export function HowItWorks() {
  const [active, setActive] = useState<"vendor" | "client">("vendor");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { locale } = useLocale();

  useEffect(() => {
    if (!rootRef.current) return;

    const context = gsap.context(() => {
      gsap.from("[data-step-item]", {
        x: -30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 78%",
          once: true,
        },
      });
    }, rootRef);

    return () => context.revert();
  }, [active]);

  const copy = pickLocale(locale, stepsByLocale);
  const steps = active === "vendor" ? copy.vendor : copy.client;

  return (
    <section id="how-it-works" className="section-pad bg-[color:rgba(232,245,233,0.28)]">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <Badge>{copy.label}</Badge>
          <h2 className="display-h1 mt-6 text-[var(--dark)]">{copy.title}</h2>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-[color:rgba(27,77,62,0.1)] bg-white p-1 shadow-[var(--shadow-sm)]">
            {[
              ["vendor", copy.vendorTab],
              ["client", copy.clientTab],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setActive(value as "vendor" | "client")}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  active === value
                    ? "bg-[var(--gold-subtle)] text-[var(--gold-dark)]"
                    : "text-[var(--gray-text)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={rootRef}
          className="mx-auto mt-14 max-w-4xl rounded-[30px] border border-[color:rgba(27,77,62,0.08)] bg-white px-6 py-8 shadow-[var(--shadow-md)] sm:px-10"
        >
          <div className="relative">
            <div className="absolute left-[18px] top-2 hidden h-[calc(100%-1rem)] w-px bg-[linear-gradient(180deg,var(--gold),rgba(201,168,76,0.1))] sm:block" />
            <div className="space-y-8">
              {steps.map(([title, body], index) => (
                <div key={title} data-step-item className="relative flex gap-4 sm:gap-6">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] font-mono-ui text-sm font-medium text-[var(--dark)]">
                    {index + 1}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-semibold text-[var(--dark)]">{title}</h3>
                    <p className="mt-2 leading-8 text-[var(--gray-text)]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
