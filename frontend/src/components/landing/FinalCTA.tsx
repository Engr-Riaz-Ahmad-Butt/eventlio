"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { MessageCircleMore } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { gsap } from "@/lib/gsap";
import { useLocale } from "@/providers/locale-provider";
import { pickLocale } from "@/lib/locale";

export function FinalCTA() {
  const rootRef = useRef<HTMLElement | null>(null);
  const { locale } = useLocale();

  useEffect(() => {
    if (!rootRef.current) return;

    const context = gsap.context(() => {
      gsap.from("[data-cta-content]", {
        scale: 0.94,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.to("[data-cta-button]", {
        y: -4,
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: "power1.inOut",
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  const copy = pickLocale(locale, {
    en: {
      badge: "Free Trial - 3 Months Free",
      title: "Start Today.",
      accent: "See the Difference Tomorrow.",
      body:
        "3 months free. No credit card required. 5 minute setup. And if you do not love it, no questions asked.",
      cta: "Start Free Trial",
      proof: "No credit card  |  Cancel anytime  |  WhatsApp support",
      whatsapp: "Message us on +92 300 1234567",
    },
    "roman-ur": {
      badge: "Free Trial - 3 Mahine Free",
      title: "Aaj Shuru Karein.",
      accent: "Kal Se Fark Dikhega.",
      body:
        "3 mahine free. Credit card nahi chahiye. 5 minute setup. Aur agar pasand na aye, no questions asked.",
      cta: "Free Trial Shuru Karein",
      proof: "No credit card  |  Cancel anytime  |  WhatsApp support",
      whatsapp: "+92 300 1234567 pe message karein",
    },
    ur: {
      badge: "فری ٹرائل - 3 ماہ مفت",
      title: "آج ہی شروع کریں۔",
      accent: "کل سے فرق نظر آئے گا۔",
      body:
        "3 ماہ مفت۔ کریڈٹ کارڈ کی ضرورت نہیں۔ 5 منٹ میں سیٹ اپ۔ اور اگر پسند نہ آئے تو کوئی سوال نہیں۔",
      cta: "فری ٹرائل شروع کریں",
      proof: "کریڈٹ کارڈ نہیں  |  کبھی بھی منسوخ کریں  |  واٹس ایپ سپورٹ",
      whatsapp: "+92 300 1234567 پر میسج کریں",
    },
  });

  return (
    <section
      ref={rootRef}
      className="pattern-islamic section-pad overflow-hidden bg-[linear-gradient(180deg,var(--primary-dark),var(--primary))] text-white"
    >
      <div className="section-shell">
        <div
          data-cta-content
          className="mx-auto max-w-4xl rounded-[34px] border border-white/10 bg-white/5 px-6 py-14 text-center backdrop-blur-sm sm:px-12"
        >
          <Badge variant="gold">{copy.badge}</Badge>
          <h2 className="display-h1 mt-8 text-white">
            {copy.title}
            <span className="block text-[var(--gold)]">{copy.accent}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/72">
            {copy.body}
          </p>
          <Button data-cta-button variant="gold" size="xl" className="mt-10" asChild>
            <Link href="/register">{copy.cta}</Link>
          </Button>
          <p className="mt-5 text-sm text-white/62">{copy.proof}</p>

          <div className="mt-8 flex items-center justify-center gap-3 text-[var(--whatsapp)]">
            <MessageCircleMore className="h-5 w-5" />
            <a href="https://wa.me/923001234567" className="font-medium hover:text-white">
              {copy.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
