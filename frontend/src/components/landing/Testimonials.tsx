"use client";

import { useLocale } from "@/providers/locale-provider";
import { pickLocale } from "@/lib/locale";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Raza",
    role: { en: "Photographer, Rawalpindi", "roman-ur": "Photographer, Rawalpindi", ur: "فوٹوگرافر، راولپنڈی" },
    quote: {
      en: "I used to track bookings on WhatsApp. Now on Eventlio, advances, dates, and clients are all clearly visible in one place.",
      "roman-ur": "Pehle main WhatsApp pe booking track karta tha. Ab Eventlio pe advance, dates, aur clients sab ek jagah clear dikhte hain.",
      ur: "پہلے میں واٹس ایپ پر بکنگ ٹریک کرتا تھا۔ اب ایونٹلیو پر ایڈوانس، تاریخیں اور کلائنٹس سب ایک ہی جگہ واضح طور پر نظر آتے ہیں۔",
    },
  },
  {
    name: "Sana Fatima",
    role: { en: "Makeup Artist, Lahore", "roman-ur": "Makeup Artist, Lahore", ur: "میک اپ آرٹسٹ، لاہور" },
    quote: {
      en: "During peak season, it was confusing to know which client confirmed. Eventlio made the whole system easy.",
      "roman-ur": "Season ke time pe kis client ne confirm kiya, kis ne nahi, sab confuse hota tha. Eventlio ne poora system easy kar diya.",
      ur: "سیزن کے دوران یہ سمجھنا مشکل ہوتا تھا کہ کس کلائنٹ نے کنفرم کیا ہے۔ ایونٹلیو نے پورے نظام کو آسان بنا دیا ہے۔",
    },
  },
  {
    name: "Hassan Ali",
    role: { en: "Salon Owner, Karachi", "roman-ur": "Salon Owner, Karachi", ur: "سیلون مالک، کراچی" },
    quote: {
      en: "Our team handles bookings and payments much better now. We're also getting new leads from the platform.",
      "roman-ur": "Hamari team bookings aur payments dono ko better handle kar rahi hai. Aur naye leads bhi platform se mil rahe hain.",
      ur: "ہماری ٹیم اب بکنگز اور پیمنٹس کو بہتر طریقے سے سنبھال رہی ہے۔ ہمیں پلیٹ فارم سے نئی لیڈز بھی مل رہی ہیں۔",
    },
  },
];

export function Testimonials() {
  const { locale } = useLocale();

  const copy = pickLocale(locale, {
    en: {
      badge: "Testimonials",
      title: "Real Vendors, Real Results",
      subtitle: "Join hundreds of professionals who have transformed their event business operations.",
    },
    "roman-ur": {
      badge: "Vendors Kya Kehtay Hain",
      title: "Real Vendors, Real Results",
      subtitle: "Hazaron professionals jo apne business ko modern bana chukay hain.",
    },
    ur: {
      badge: "وینڈرز کے تاثرات",
      title: "اصلی وینڈرز، اصلی نتائج",
      subtitle: "ان سینکڑوں پیشہ ور افراد میں شامل ہوں جنہوں نے اپنے ایونٹ بزنس کو جدید بنایا ہے۔",
    },
  });

  return (
    <section id="testimonials" className="section-pad bg-[var(--primary)] text-white relative overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute top-10 right-10 opacity-20">
         <Quote className="w-32 h-32 rotate-12" />
      </div>
      
      <div className="section-shell relative z-10">
        <div className="mx-auto max-w-3xl text-center animate-fade-in-up">
          <Badge variant="gold" className="animate-fade-in-up">{copy.badge}</Badge>
          <h2 className="display-h1 mt-6 text-white">{copy.title}</h2>
          <p className="mt-4 text-lg text-white/70">
            {copy.subtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item, idx) => (
            <article
              key={item.name}
              className="group rounded-[40px] bg-white/5 border border-white/10 p-10 text-white shadow-2xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:bg-white/10 animate-fade-in-up"
              style={{ animationDelay: `${200 + idx * 100}ms` }}
            >
              <div className="flex gap-1 mb-6">
                 {[1,2,3,4,5].map(s => (
                   <span key={s} className="text-[var(--gold)] text-lg">★</span>
                 ))}
              </div>
              
              <p className="text-lg leading-relaxed italic text-white/90">
                "{pickLocale(locale, item.quote)}"
              </p>
              
              <div className="mt-10 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold)] font-black text-[var(--dark)] text-xl shadow-lg">
                  {item.name[0]}
                </div>
                <div>
                  <p className="font-bold text-lg text-white">{item.name}</p>
                  <p className="text-sm font-medium text-white/50">{pickLocale(locale, item.role)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
