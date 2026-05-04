"use client";

import { useEffect, useRef } from "react";
import { MessageCircleMore, NotebookPen, Wallet } from "lucide-react";
import { revealOnScroll } from "@/lib/gsap";
import { useLocale } from "@/providers/locale-provider";
import { pickLocale } from "@/lib/locale";

const cards = [
  {
    icon: MessageCircleMore,
    title: {
      en: "WhatsApp Overload",
      "roman-ur": "WhatsApp Overload",
      ur: "واٹس ایپ کا دباؤ",
    },
    body: {
      en: "100+ messages every day. No clear tracking. No certainty about what booking is actually confirmed.",
      "roman-ur":
        "100+ messages rozana. Koi track nahi. Booking confirm hui ya nahi, pata hi nahi chalta.",
      ur: "روزانہ 100+ میسجز۔ کوئی واضح ٹریکنگ نہیں۔ یہ بھی معلوم نہیں ہوتا کہ کون سی بکنگ واقعی کنفرم ہوئی ہے۔",
    },
  },
  {
    icon: NotebookPen,
    title: {
      en: "Diary and Excel",
      "roman-ur": "Diary aur Excel",
      ur: "ڈائری اور ایکسل",
    },
    body: {
      en: "Payments live in scattered notes and spreadsheets that are easy to lose and hard to trust.",
      "roman-ur":
        "Payment kiska aya, kiska nahi. Diary mein likha hota hai aur phir wohi system gum ho jata hai.",
      ur: "ادائیگیاں کبھی ڈائری میں، کبھی ایکسل میں۔ یہ نظام آسانی سے بکھر جاتا ہے اور اس پر اعتماد بھی مشکل ہو جاتا ہے۔",
    },
  },
  {
    icon: Wallet,
    title: {
      en: "Advance Tracking",
      "roman-ur": "Advance Ka Hisaab",
      ur: "ایڈوانس کا حساب",
    },
    body: {
      en: "Every client has a different balance story, and manually keeping it all aligned becomes a headache.",
      "roman-ur":
        "Kitna advance mila aur kitna baqi hai. Har client ka alag hisaab sar dard ban jata hai.",
      ur: "کتنا ایڈوانس ملا اور کتنا باقی ہے، ہر کلائنٹ کا الگ حساب رکھنا ایک مستقل دردِ سر بن جاتا ہے۔",
    },
  },
];

export function ProblemSection() {
  const { locale } = useLocale();

  const copy = pickLocale(locale, {
    en: {
      eyebrow: "The Problem",
      title: "Still Running on WhatsApp and a Diary?",
      body: "Pakistan's event vendors still deal with the same operational chaos every single day.",
      solution: "Eventlio solves all of this in one place",
    },
    "roman-ur": {
      eyebrow: "Masla",
      title: "Aaj Bhi WhatsApp Aur Diary?",
      body: "Pakistan ke event vendors ko ye operational problems rozana face karni parti hain.",
      solution: "Eventlio ye sab ek jagah solve karta hai",
    },
    ur: {
      eyebrow: "مسئلہ",
      title: "کیا آج بھی واٹس ایپ اور ڈائری؟",
      body: "پاکستان کے ایونٹ وینڈرز آج بھی روزانہ انہی آپریشنل مسائل کا سامنا کرتے ہیں۔",
      solution: "ایونٹلیو یہ سب ایک ہی جگہ حل کرتا ہے",
    },
  });

  return (
    <section id="problem" className="section-pad bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-[var(--primary-subtle)] rounded-full blur-3xl opacity-50" />
      
      <div className="section-shell relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow border-[color:rgba(27,77,62,0.12)] text-[var(--primary-dark)] animate-fade-in-up">
            {copy.eyebrow}
          </span>
          <h2 className="display-h1 mt-6 text-[var(--dark)] animate-fade-in-up delay-100">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--gray-text)] sm:text-lg animate-fade-in-up delay-200">
            {copy.body}
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {cards.map((card, idx) => (
            <article
              key={card.title.en}
              className="group surface-card rounded-[32px] border-t-4 border-t-[var(--danger)] p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${300 + idx * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <card.icon className="h-7 w-7 text-[var(--danger)]" />
              </div>
              <h3 className="text-2xl font-semibold text-[var(--dark)]">
                {pickLocale(locale, card.title)}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[var(--gray-text)]">
                {pickLocale(locale, card.body)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-4 animate-fade-in-up delay-500">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--gold-dark)]">
            {copy.solution}
          </p>
          <div className="flex items-center gap-2">
             <span className="h-1 w-12 rounded-full bg-[var(--gold)]" />
             <div className="w-2 h-2 rounded-full bg-[var(--gold)] animate-ping" />
             <span className="h-1 w-12 rounded-full bg-[var(--gold)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
