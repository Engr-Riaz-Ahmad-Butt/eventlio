"use client";

import Link from "next/link";
import { MessageCircleMore, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/providers/locale-provider";
import { pickLocale } from "@/lib/locale";

export function FinalCTA() {
  const { locale } = useLocale();

  const copy = pickLocale(locale, {
    en: {
      badge: "Free Trial - 3 Months Free",
      title: "Start Today.",
      accent: "See the Difference Tomorrow.",
      body:
        "3 months free. No credit card required. 5 minute setup. And if you do not love it, no questions asked.",
      cta: "Start Free Trial",
      proof: "No credit card  |  Cancel anytime  |  WhatsApp support",
      whatsapp: "Message us on WhatsApp",
    },
    "roman-ur": {
      badge: "Free Trial - 3 Mahine Free",
      title: "Aaj Shuru Karein.",
      accent: "Kal Se Fark Dikhega.",
      body:
        "3 mahine free. Credit card nahi chahiye. 5 minute setup. Aur agar pasand na aye, no questions asked.",
      cta: "Free Trial Shuru Karein",
      proof: "No credit card  |  Cancel anytime  |  WhatsApp support",
      whatsapp: "Hamein WhatsApp karein",
    },
    ur: {
      badge: "فری ٹرائل - 3 ماہ مفت",
      title: "آج ہی شروع کریں۔",
      accent: "کل سے فرق نظر آئے گا۔",
      body:
        "3 ماہ مفت۔ کریڈٹ کارڈ کی ضرورت نہیں۔ 5 منٹ میں سیٹ اپ۔ اور اگر پسند نہ آئے تو کوئی سوال نہیں۔",
      cta: "فری ٹرائل شروع کریں",
      proof: "کریڈٹ کارڈ نہیں  |  کبھی بھی منسوخ کریں  |  واٹس ایپ سپورٹ",
      whatsapp: "ہمیں واٹس ایپ کریں",
    },
  });

  return (
    <section className="pattern-islamic section-pad overflow-hidden bg-[linear-gradient(180deg,var(--primary-dark),var(--primary))] text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.1),transparent)] opacity-40 pointer-events-none" />
      
      <div className="section-shell relative z-10">
        <div
          className="mx-auto max-w-5xl rounded-[48px] border border-white/10 bg-white/5 px-8 py-20 text-center backdrop-blur-md shadow-2xl animate-fade-in-up"
        >
          <div className="flex justify-center mb-8">
             <div className="w-20 h-20 rounded-full bg-[var(--gold)] flex items-center justify-center text-[var(--dark)] shadow-2xl shadow-gold/20 animate-bounce">
                <Rocket className="w-10 h-10" />
             </div>
          </div>
          
          <Badge variant="gold" className="px-6 py-1.5 text-xs font-black animate-fade-in-up delay-100">{copy.badge}</Badge>
          
          <h2 className="display-h1 mt-8 text-white animate-fade-in-up delay-200">
            {copy.title}
            <span className="block text-[var(--gold)] mt-2">{copy.accent}</span>
          </h2>
          
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-white/70 animate-fade-in-up delay-300">
            {copy.body}
          </p>
          
          <div className="mt-12 flex flex-col items-center gap-6 animate-fade-in-up delay-400">
            <Button variant="gold" size="xl" className="rounded-2xl px-12 h-16 text-lg font-black shadow-2xl shadow-gold/20 group" asChild>
              <Link href="/register">
                {copy.cta}
              </Link>
            </Button>
            <p className="text-sm font-bold tracking-widest text-white/40 uppercase">
              {copy.proof}
            </p>
          </div>

          <div className="mt-12 pt-12 border-t border-white/5 animate-fade-in-up delay-500">
            <div className="flex items-center justify-center gap-4 text-[var(--gold)] group cursor-pointer hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[var(--gold)] group-hover:text-[var(--dark)] transition-all">
                <MessageCircleMore className="h-5 w-5" />
              </div>
              <a href="https://wa.me/923001234567" className="font-bold text-lg">
                {copy.whatsapp}: <span className="underline">+92 300 1234567</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
