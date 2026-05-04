"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/providers/locale-provider";
import { pickLocale } from "@/lib/locale";

const stepsByLocale: Record<
  "en" | "roman-ur" | "ur",
  {
    title: string;
    label: string;
    vendorTab: string;
    clientTab: string;
    vendor: [string, string][];
    client: [string, string][];
  }
> = {
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
};

export function HowItWorks() {
  const [active, setActive] = useState<"vendor" | "client">("vendor");
  const { locale } = useLocale();

  const copy = pickLocale(locale, stepsByLocale);
  const steps = active === "vendor" ? copy.vendor : copy.client;

  return (
    <section id="how-it-works" className="section-pad bg-[color:rgba(232,245,233,0.28)] relative">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center animate-fade-in-up">
          <Badge variant="gold">{copy.label}</Badge>
          <h2 className="display-h1 mt-6 text-[var(--dark)]">{copy.title}</h2>
        </div>

        <div className="mt-10 flex justify-center animate-fade-in-up delay-100">
          <div className="inline-flex rounded-full border border-gray-100 bg-white p-1.5 shadow-lg">
            {[
              ["vendor", copy.vendorTab],
              ["client", copy.clientTab],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setActive(value as "vendor" | "client")}
                className={`rounded-full px-8 py-2.5 text-sm font-black transition-all duration-300 ${
                  active === value
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : "text-[var(--gray-text)] hover:text-[var(--dark)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="mx-auto mt-14 max-w-4xl rounded-[40px] border border-gray-100 bg-white px-8 py-12 shadow-2xl sm:px-12 animate-fade-in-up delay-200"
        >
          <div className="relative">
            <div className="absolute left-[20px] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-[var(--gold)] via-[var(--gold)]/20 to-transparent sm:block" />
            <div className="space-y-10">
              {steps.map(([title, body], index) => (
                <div key={title} className="relative flex gap-6 sm:gap-10 group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] font-mono-ui text-base font-black text-[var(--dark)] shadow-lg shadow-gold/20 group-hover:scale-125 transition-transform">
                    {index + 1}
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-2xl font-bold text-[var(--dark)] group-hover:text-[var(--primary)] transition-colors">{title}</h3>
                    <p className="mt-3 leading-relaxed text-lg text-[var(--gray-text)]">{body}</p>
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
