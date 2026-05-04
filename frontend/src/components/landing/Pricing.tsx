"use client";

import { useState } from "react";
import { Check, Lock, Zap, Shield, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/providers/locale-provider";
import { pickLocale } from "@/lib/locale";

type PlanFeature = {
  label: { en: string; "roman-ur": string; ur: string };
  enabled: boolean;
};

type Plan = {
  name: { en: string; "roman-ur": string; ur: string };
  price: number;
  subtitle: { en: string; "roman-ur": string; ur: string };
  featured: boolean;
  icon: any;
  features: PlanFeature[];
};

const plans: Plan[] = [
  {
    name: { en: "Starter", "roman-ur": "Starter", ur: "اسٹارٹر" },
    price: 1500,
    subtitle: { en: "Perfect for beginners", "roman-ur": "Shuruat ke liye perfect", ur: "آغاز کے لیے بہترین" },
    featured: false,
    icon: Zap,
    features: [
      { label: { en: "20 bookings/month", "roman-ur": "20 bookings/month", ur: "20 بکنگز فی مہینہ" }, enabled: true },
      { label: { en: "Vendor profile + marketplace", "roman-ur": "Vendor profile + marketplace", ur: "وینڈر پروفائل + مارکیٹ پلیس" }, enabled: true },
      { label: { en: "WhatsApp notifications", "roman-ur": "WhatsApp notifications", ur: "واٹس ایپ نوٹیفکیشنز" }, enabled: true },
      { label: { en: "Basic payment tracking", "roman-ur": "Basic payment tracking", ur: "بنیادی پیمنٹ ٹریکنگ" }, enabled: true },
      { label: { en: "Customer reviews", "roman-ur": "Customer reviews", ur: "گاہکوں کے ریویوز" }, enabled: true },
      { label: { en: "Advanced Analytics", "roman-ur": "Advanced Analytics", ur: "ایڈوانسڈ اینالیٹکس" }, enabled: false },
    ],
  },
  {
    name: { en: "Professional", "roman-ur": "Professional", ur: "پروفیشنل" },
    price: 3000,
    subtitle: { en: "Most popular choice", "roman-ur": "Sabse zyada popular", ur: "سب سے مقبول انتخاب" },
    featured: true,
    icon: Shield,
    features: [
      { label: { en: "Unlimited bookings", "roman-ur": "Unlimited bookings", ur: "لامحدود بکنگز" }, enabled: true },
      { label: { en: "Full dashboard access", "roman-ur": "Full dashboard access", ur: "مکمل ڈیش بورڈ رسائی" }, enabled: true },
      { label: { en: "WhatsApp integration", "roman-ur": "WhatsApp integration", ur: "واٹس ایپ انٹیگریشن" }, enabled: true },
      { label: { en: "Advanced payment tracking", "roman-ur": "Advanced payment tracking", ur: "ایڈوانسڈ پیمنٹ ٹریکنگ" }, enabled: true },
      { label: { en: "Business analytics", "roman-ur": "Business analytics", ur: "بزنس اینالیٹکس" }, enabled: true },
      { label: { en: "Staff management", "roman-ur": "Staff management", ur: "اسٹاف مینجمنٹ" }, enabled: false },
    ],
  },
  {
    name: { en: "Business", "roman-ur": "Business", ur: "بزنس" },
    price: 5000,
    subtitle: { en: "For growing businesses", "roman-ur": "Growing businesses ke liye", ur: "بڑھتے ہوئے کاروبار کے لیے" },
    featured: false,
    icon: Crown,
    features: [
      { label: { en: "Everything in Professional", "roman-ur": "Everything in Professional", ur: "پروفیشنل کی تمام خصوصیات" }, enabled: true },
      { label: { en: "Staff & commission tracking", "roman-ur": "Staff & commission tracking", ur: "اسٹاف اور کمیشن ٹریکنگ" }, enabled: true },
      { label: { en: "Featured listing", "roman-ur": "Featured listing", ur: "نمایاں لسٹنگ" }, enabled: true },
      { label: { en: "Multiple team members", "roman-ur": "Multiple team members", ur: "متعدد ٹیم ممبرز" }, enabled: true },
      { label: { en: "Priority support", "roman-ur": "Priority support", ur: "ترجیحی سپورٹ" }, enabled: true },
      { label: { en: "Unlimited gallery", "roman-ur": "Unlimited gallery", ur: "لامحدود گیلری" }, enabled: true },
    ],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const { locale } = useLocale();

  const copy = pickLocale(locale, {
    en: {
      promo: "First 3 Months Free - No Credit Card Required",
      badge: "Pricing",
      title: "Simple, Transparent Pricing",
      subtitle: "Affordable plans built for Pakistan's event vendors with room to grow.",
      monthly: "Monthly",
      yearly: "Yearly",
      save: "2 months free",
      cta: "Start Free Trial",
      popular: "MOST POPULAR",
      perMonth: "/month",
      perYear: "/year",
      jazzcash: "JazzCash | Easypaisa | Bank Transfer supported",
      cancel: "First 3 months are free on any plan. Cancel anytime.",
    },
    "roman-ur": {
      promo: "Pehle 3 Mahine Bilkul Free - Credit Card Nahi Chahiye",
      badge: "Pricing",
      title: "Simple, Seedha Pricing",
      subtitle: "Pakistan ke vendors ke liye affordable plans with room to grow.",
      monthly: "Monthly",
      yearly: "Yearly",
      save: "2 mahine free",
      cta: "Free Trial Shuru",
      popular: "SABSE PASAND",
      perMonth: "/month",
      perYear: "/year",
      jazzcash: "JazzCash | Easypaisa | Bank Transfer supported",
      cancel: "Pehle 3 mahine free hain. Kabhi bhi cancel karein.",
    },
    ur: {
      promo: "پہلے 3 ماہ بالکل مفت - کسی کریڈٹ کارڈ کی ضرورت نہیں",
      badge: "قیمتیں",
      title: "سادہ اور شفاف قیمتیں",
      subtitle: "پاکستان کے ایونٹ وینڈرز کے لیے سستے پلانز جو آپ کے کاروبار کے ساتھ بڑھ سکتے ہیں۔",
      monthly: "ماہانہ",
      yearly: "سالانہ",
      save: "2 ماہ مفت",
      cta: "فری ٹرائل شروع کریں",
      popular: "سب سے مقبول",
      perMonth: "/فی مہینہ",
      perYear: "/فی سال",
      jazzcash: "JazzCash | Easypaisa | Bank Transfer supported",
      cancel: "کسی بھی پلان پر پہلے 3 ماہ مفت ہیں۔ کسی بھی وقت کینسل کریں۔",
    },
  });

  return (
    <section id="pricing" className="section-pad bg-[var(--warm-white)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <div className="section-shell">
        <div className="mx-auto max-w-fit rounded-full bg-[var(--gold)] px-8 py-3 text-center text-sm font-bold text-[var(--dark)] shadow-xl animate-fade-in-up">
          {copy.promo}
        </div>

        <div className="mt-12 flex flex-col items-center text-center">
          <Badge variant="gold" className="animate-fade-in-up delay-100">{copy.badge}</Badge>
          <h2 className="display-h1 mt-6 text-[var(--dark)] animate-fade-in-up delay-200">{copy.title}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--gray-text)] animate-fade-in-up delay-300">
            {copy.subtitle}
          </p>

          <div className="mt-10 inline-flex items-center rounded-full border border-gray-200 bg-white p-1.5 shadow-lg animate-fade-in-up delay-400">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={`rounded-full px-8 py-2.5 text-sm font-bold transition-all duration-300 ${
                !yearly ? "bg-[var(--primary)] text-white shadow-md" : "text-[var(--gray-text)] hover:text-[var(--dark)]"
              }`}
            >
              {copy.monthly}
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={`rounded-full px-8 py-2.5 text-sm font-bold transition-all duration-300 ${
                yearly ? "bg-[var(--primary)] text-white shadow-md" : "text-[var(--gray-text)] hover:text-[var(--dark)]"
              }`}
            >
              {copy.yearly}
            </button>
            <span className="ml-3 rounded-full bg-[var(--gold-subtle)] px-4 py-1 text-[10px] font-black uppercase tracking-wider text-[var(--gold-dark)] border border-[var(--gold)]">
              {copy.save}
            </span>
          </div>
        </div>

        <div className="mt-16 grid gap-8 xl:grid-cols-3">
          {plans.map((plan, idx) => {
            const price = yearly ? plan.price * 10 : plan.price;
            const Icon = plan.icon;

            return (
              <article
                key={plan.name.en}
                className={`relative rounded-[40px] border bg-white p-10 transition-all duration-500 hover:-translate-y-3 animate-fade-in-up ${
                  plan.featured
                    ? "border-[var(--gold)] shadow-2xl ring-1 ring-[var(--gold)]"
                    : "border-gray-100 shadow-xl"
                }`}
                style={{ animationDelay: `${500 + idx * 100}ms` }}
              >
                {plan.featured ? (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[var(--gold)] px-6 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-[var(--dark)] shadow-lg">
                    {copy.popular}
                  </div>
                ) : null}

                <div className="flex items-center justify-between">
                   <div className={`flex h-14 w-14 items-center justify-center rounded-[20px] ${plan.featured ? "bg-[var(--gold)] text-[var(--dark)]" : "bg-gray-50 text-[var(--primary)]"}`}>
                      <Icon className="h-7 w-7" />
                   </div>
                   <h3 className="font-heading text-2xl text-[var(--dark)]">{pickLocale(locale, plan.name)}</h3>
                </div>

                <p className="mt-6 text-sm font-medium text-[var(--gray-text)]">{pickLocale(locale, plan.subtitle)}</p>
                
                <div className="mt-8">
                  <span className="text-sm font-bold text-[var(--gold-dark)] mr-2">PKR</span>
                  <span className="font-mono-ui text-5xl font-black text-[var(--dark)]">
                    {price.toLocaleString()}
                  </span>
                  <span className="ml-2 text-sm font-bold text-[var(--gray-text)]">
                    {yearly ? copy.perYear : copy.perMonth}
                  </span>
                </div>

                <ul className="mt-10 space-y-5 border-t border-gray-50 pt-10">
                  {plan.features.map((feature) => (
                    <li key={feature.label.en} className="flex items-start gap-4 text-sm font-medium">
                      <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${feature.enabled ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-300"}`}>
                        {feature.enabled ? (
                          <Check className="h-3 w-3 stroke-[3px]" />
                        ) : (
                          <Lock className="h-3 w-3 stroke-[3px]" />
                        )}
                      </div>
                      <span className={feature.enabled ? "text-[var(--dark)]" : "text-gray-400"}>
                        {pickLocale(locale, feature.label)}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.featured ? "gold" : "outline"}
                  size="xl"
                  className="mt-12 w-full rounded-2xl h-14 font-black shadow-lg"
                >
                  {copy.cta}
                </Button>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center animate-fade-in-up delay-700">
          <p className="text-sm font-bold text-[var(--gray-text)]">
            {copy.cancel}
          </p>
          <div className="rounded-2xl border border-gray-100 bg-gray-50/50 px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--primary-dark)] shadow-sm">
            {copy.jazzcash}
          </div>
        </div>
      </div>
    </section>
  );
}
