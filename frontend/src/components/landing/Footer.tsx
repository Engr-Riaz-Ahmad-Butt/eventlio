"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/providers/locale-provider";
import { pickLocale } from "@/lib/locale";
import { Globe, MessageCircle, X, Send } from "lucide-react";

export function Footer() {
  const { locale } = useLocale();

  const copy = pickLocale(locale, {
    en: {
      tagline: "The Business OS for Event Vendors",
      subscribeTitle: "Get Business Tips & Updates",
      subscribePlaceholder: "Enter your email",
      subscribeBtn: "Subscribe",
      rights: "© 2026 Eventlio. Made with pride in Pakistan.",
      payments: "JazzCash | Easypaisa | Bank Transfer",
      groups: [
        {
          title: "Eventlio",
          items: ["About", "Blog", "Careers", "Press"],
        },
        {
          title: "For Vendors",
          items: ["Register", "Pricing", "Features", "Dashboard Tour"],
        },
        {
          title: "For Clients",
          items: ["Browse Vendors", "How It Works", "Cities", "Reviews"],
        },
        {
          title: "Support",
          items: ["Help Center", "WhatsApp Support", "Privacy", "Terms"],
        },
      ],
    },
    "roman-ur": {
      tagline: "Event Vendors Ka Business OS",
      subscribeTitle: "Business Tips aur Updates Hasil Karein",
      subscribePlaceholder: "Apna email dein",
      subscribeBtn: "Subscribe",
      rights: "© 2026 Eventlio. Pakistan mein banaya gaya.",
      payments: "JazzCash | Easypaisa | Bank Transfer",
      groups: [
        {
          title: "Eventlio",
          items: ["About", "Blog", "Careers", "Press"],
        },
        {
          title: "For Vendors",
          items: ["Register", "Pricing", "Features", "Dashboard Tour"],
        },
        {
          title: "For Clients",
          items: ["Browse Vendors", "How It Works", "Cities", "Reviews"],
        },
        {
          title: "Support",
          items: ["Help Center", "WhatsApp Support", "Privacy", "Terms"],
        },
      ],
    },
    ur: {
      tagline: "ایونٹ وینڈرز کے لیے بزنس او ایس",
      subscribeTitle: "بزنس ٹپس اور اپ ڈیٹس حاصل کریں",
      subscribePlaceholder: "اپنا ای میل درج کریں",
      subscribeBtn: "سبسکرائب کریں",
      rights: "© 2026 ایونٹلیو۔ پاکستان میں فخر سے بنایا گیا۔",
      payments: "JazzCash | Easypaisa | Bank Transfer",
      groups: [
        {
          title: "ایونٹلیو",
          items: ["ہمارے بارے میں", "بلاگ", "کیریئرز", "پریس"],
        },
        {
          title: "وینڈرز کے لیے",
          items: ["رجسٹر کریں", "قیمتیں", "فیچرز", "ڈیش بورڈ ٹور"],
        },
        {
          title: "کلائنٹس کے لیے",
          items: ["وینڈرز براؤز کریں", "یہ کیسے کام کرتا ہے", "شہر", "ریویوز"],
        },
        {
          title: "سپورٹ",
          items: ["ہیلپ سینٹر", "واٹس ایپ سپورٹ", "پرائیوسی", "شرائط"],
        },
      ],
    },
  });

  return (
    <footer className="bg-[#0A1F17] text-white/60 pt-20 pb-10 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute bottom-0 right-0 w-full h-full pattern-islamic opacity-[0.02] pointer-events-none" />
      
      <div className="section-shell relative z-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between pb-16 border-b border-white/5">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-[var(--gold)] flex items-center justify-center text-[var(--dark)] shadow-lg">
                  <span className="font-black text-xl italic">E</span>
               </div>
               <span className="font-heading text-3xl font-bold text-white tracking-tight">Eventlio</span>
            </Link>
            <p className="mt-6 text-lg font-medium text-white/40 leading-relaxed italic">
              "{copy.tagline}"
            </p>
            <div className="mt-8 flex gap-4">
              {[Globe, MessageCircle, X, Send].map((Icon, i) => (
                <Link key={i} href="#" className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center transition-all hover:bg-[var(--gold)] hover:text-[var(--dark)] hover:border-transparent hover:-translate-y-1">
                   <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full max-w-lg">
            <h4 className="text-white font-bold mb-4">{copy.subscribeTitle}</h4>
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder={copy.subscribePlaceholder}
                className="h-16 w-full rounded-2xl border border-white/10 bg-white/5 px-6 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)]/50 focus:ring-4 focus:ring-[var(--gold)]/10 transition-all"
              />
              <Button variant="gold" className="absolute right-2 h-12 rounded-xl px-6 group">
                <span className="hidden sm:inline mr-2">{copy.subscribeBtn}</span>
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-4">
          {copy.groups.map((group) => (
            <div key={group.title}>
              <h5 className="font-black text-xs uppercase tracking-[0.3em] text-white/30 mb-8">{group.title}</h5>
              <ul className="flex flex-col gap-4">
                {group.items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-base font-medium hover:text-[var(--gold)] transition-colors inline-block">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-8 border-t border-white/5 pt-10 text-sm font-medium lg:flex-row lg:items-center lg:justify-between">
          <p className="order-2 lg:order-1">{copy.rights}</p>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4 order-1 lg:order-2">
             <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
             <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>

          <div className="flex items-center gap-3 order-3 opacity-50 grayscale hover:grayscale-0 transition-all">
             <span className="text-[10px] font-black uppercase tracking-widest">{copy.payments}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
