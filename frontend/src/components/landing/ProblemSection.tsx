"use client";

import { useEffect, useRef } from "react";
import { MessageCircleMore, NotebookPen, Wallet } from "lucide-react";
import { gsap, revealOnScroll } from "@/lib/gsap";
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
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);
  const { locale } = useLocale();

  useEffect(() => {
    if (cardsRef.current) {
      revealOnScroll(cardsRef.current.querySelectorAll("[data-problem-card]"), {
        y: 50,
      });
    }

    if (arrowRef.current) {
      gsap.fromTo(
        arrowRef.current,
        { x: -10, opacity: 0.6 },
        {
          x: 12,
          opacity: 1,
          scrollTrigger: {
            trigger: arrowRef.current,
            start: "top 90%",
            once: true,
          },
          duration: 0.9,
          ease: "power2.out",
        },
      );
    }
  }, []);

  const copy = pickLocale(locale, {
    en: {
      eyebrow: "The Problem",
      title: "Still Running on WhatsApp and a Diary?",
      body: "Pakistan's event vendors still deal with the same operational chaos every single day.",
      solution: "Eventlio solves all of this in one place",
    },
    "roman-ur": {
      eyebrow: "The Problem",
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
    <section className="section-pad bg-[var(--warm-white)]">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow border-[color:rgba(201,168,76,0.25)] text-[var(--gold-dark)]">
            {copy.eyebrow}
          </span>
          <h2 className="display-h1 mt-6 text-[var(--dark)]">{copy.title}</h2>
          <p className="mt-4 text-base leading-8 text-[var(--gray-text)] sm:text-lg">
            {copy.body}
          </p>
        </div>

        <div ref={cardsRef} className="mt-14 grid gap-6 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title.en}
              data-problem-card
              className="surface-card rounded-[28px] border-l-[3px] border-l-[var(--danger)] p-8"
            >
              <card.icon className="h-10 w-10 text-[var(--danger)]" />
              <h3 className="mt-6 text-2xl font-semibold text-[var(--dark)]">
                {pickLocale(locale, card.title)}
              </h3>
              <p className="mt-4 text-base leading-8 text-[var(--gray-text)]">
                {pickLocale(locale, card.body)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <span className="h-px w-20 bg-[color:rgba(201,168,76,0.45)]" />
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--gold-dark)]">
            {copy.solution}
          </p>
          <span ref={arrowRef} className="text-xl text-[var(--gold-dark)]">
            →
          </span>
        </div>
      </div>
    </section>
  );
}
