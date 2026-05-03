"use client";

import { useEffect, useRef } from "react";
import { MessageCircleMore, NotebookPen, Wallet } from "lucide-react";
import { gsap, revealOnScroll } from "@/lib/gsap";

const cards = [
  {
    icon: MessageCircleMore,
    title: "WhatsApp Overload",
    body: "100+ messages rozana. Koi track nahi. Booking confirm hui ya nahi, pata hi nahi chalta.",
  },
  {
    icon: NotebookPen,
    title: "Diary aur Excel",
    body: "Payment kiska aya, kiska nahi. Diary mein likha hota hai aur phir wohi system gum ho jata hai.",
  },
  {
    icon: Wallet,
    title: "Advance Ka Hisaab",
    body: "Kitna advance mila aur kitna baqi hai. Har client ka alag hisaab sar dard ban jata hai.",
  },
];

export function ProblemSection() {
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);

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

  return (
    <section className="section-pad bg-[var(--warm-white)]">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow border-[color:rgba(201,168,76,0.25)] text-[var(--gold-dark)]">
            The Problem
          </span>
          <h2 className="display-h1 mt-6 text-[var(--dark)]">
            Aaj Bhi WhatsApp Aur Diary?
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--gray-text)] sm:text-lg">
            Pakistan ke event vendors ko ye operational problems rozana face karni parti hain.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="mt-14 grid gap-6 lg:grid-cols-3"
        >
          {cards.map((card) => (
            <article
              key={card.title}
              data-problem-card
              className="surface-card rounded-[28px] border-l-[3px] border-l-[var(--danger)] p-8"
            >
              <card.icon className="h-10 w-10 text-[var(--danger)]" />
              <h3 className="mt-6 text-2xl font-semibold text-[var(--dark)]">
                {card.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-[var(--gray-text)]">
                {card.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <span className="h-px w-20 bg-[color:rgba(201,168,76,0.45)]" />
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--gold-dark)]">
            Eventlio ye sab ek jagah solve karta hai
          </p>
          <span ref={arrowRef} className="text-xl text-[var(--gold-dark)]">
            →
          </span>
        </div>
      </div>
    </section>
  );
}
