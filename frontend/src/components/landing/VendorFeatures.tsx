"use client";

import { CheckCircle2, CloudLightning, Globe, LayoutDashboard, ShieldCheck, Users, Wallet } from "lucide-react";
import { useLocale } from "@/providers/locale-provider";
import { pickLocale } from "@/lib/locale";

const featureItems = [
  {
    icon: LayoutDashboard,
    title: {
      en: "Booking Management",
      "roman-ur": "Booking Management",
      ur: "بکنگ مینجمنٹ",
    },
    body: {
      en: "Pending, confirmed, completed. All your bookings in one clear view.",
      "roman-ur": "Pending, confirmed, completed. Saari bookings ek nazar mein.",
      ur: "زیرِ التواء، کنفرم شدہ، اور مکمل۔ اپنی تمام بکنگز کو ایک واضح نظر میں دیکھیں۔",
    },
  },
  {
    icon: CloudLightning,
    title: {
      en: "WhatsApp Integration",
      "roman-ur": "WhatsApp Integration",
      ur: "واٹس ایپ انٹیگریشن",
    },
    body: {
      en: "New booking? Get an instant WhatsApp notification. Zero effort coordination.",
      "roman-ur": "Nai booking? Seedha WhatsApp pe notification. Zero effort coordination.",
      ur: "نئی بکنگ؟ فوری واٹس ایپ نوٹیفکیشن حاصل کریں۔ بغیر کسی محنت کے کوآرڈینیشن۔",
    },
  },
  {
    icon: Wallet,
    title: {
      en: "Payment Tracker",
      "roman-ur": "Payment Tracker",
      ur: "پیمنٹ ٹریکر",
    },
    body: {
      en: "Track advance payments, pending balances, and total revenue automatically.",
      "roman-ur": "Advance aya ya nahi, baqi kitna hai. Always updated revenue tracking.",
      ur: "ایڈوانس پیمنٹ، باقی واجبات اور کل آمدنی کا خودکار حساب رکھیں۔",
    },
  },
  {
    icon: ShieldCheck,
    title: {
      en: "Reviews & Reputation",
      "roman-ur": "Reviews & Reputation",
      ur: "ریویوز اور ساکھ",
    },
    body: {
      en: "Build client trust with verified reviews and structured feedback profiles.",
      "roman-ur": "Client trust build karein with verified reviews aur structured profiles.",
      ur: "تصدیق شدہ ریویوز اور منظم فیڈ بیک پروفائلز کے ساتھ کلائنٹ کا اعتماد جیتیں۔",
    },
  },
  {
    icon: Globe,
    title: {
      en: "Marketplace Presence",
      "roman-ur": "Marketplace Presence",
      ur: "مارکیٹ پلیس موجودگی",
    },
    body: {
      en: "Get discovered by clients in your city. Premium SEO-optimized vendor profile.",
      "roman-ur": "Apne shahar ke clients ko nazar aayein. Premium SEO-optimized profiles.",
      ur: "اپنے شہر کے کلائنٹس کے ذریعے دریافت ہوں۔ پریمیم SEO آپٹیمائزڈ وینڈر پروفائل۔",
    },
  },
  {
    icon: Users,
    title: {
      en: "Staff & Commission",
      "roman-ur": "Staff & Commission",
      ur: "اسٹاف اور کمیشن",
    },
    body: {
      en: "Add team members, assign tasks, and track commissions automatically.",
      "roman-ur": "Team add karo, kaam assign karo, aur commission auto track karo.",
      ur: "ٹیم ممبرز شامل کریں، کام تفویض کریں اور خودکار طور پر کمیشن ٹریک کریں۔",
    },
  },
];

export function VendorFeatures() {
  const { locale } = useLocale();

  const copy = pickLocale(locale, {
    en: {
      eyebrow: "Vendor Features",
      title: "Everything in One Dashboard",
      subtitle: "The all-in-one operational platform built specifically for Pakistan's event industry professionals.",
    },
    "roman-ur": {
      eyebrow: "Vendor Features",
      title: "Sab Kuch Ek Dashboard Mein",
      subtitle: "Pakistan ki event industry ke liye khaas banaya gaya operational platform.",
    },
    ur: {
      eyebrow: "وینڈر فیچرز",
      title: "سب کچھ ایک ہی ڈیش بورڈ میں",
      subtitle: "پاکستان کی ایونٹ انڈسٹری کے پیشہ ور افراد کے لیے خاص طور پر بنایا گیا آپریشنل پلیٹ فارم۔",
    },
  });

  return (
    <section id="features" className="section-pad bg-[var(--primary-dark)] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/20 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[var(--gold)] rounded-full blur-[120px] opacity-10" />
      
      <div className="section-shell relative z-10">
        <div className="max-w-3xl animate-fade-in-up">
          <span className="eyebrow border-[color:rgba(201,168,76,0.32)] text-[var(--gold)]">
            {copy.eyebrow}
          </span>
          <h2 className="display-h1 mt-6">{copy.title}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/64">
            {copy.subtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featureItems.map((item, idx) => (
            <article
              key={item.title.en}
              className="glass-panel rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[color:rgba(201,168,76,0.5)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group animate-fade-in-up"
              style={{ animationDelay: `${200 + idx * 100}ms` }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-[var(--dark)] transition-all duration-300">
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="mt-8 text-2xl font-bold text-white group-hover:text-[var(--gold)] transition-colors">
                {pickLocale(locale, item.title)}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/60 group-hover:text-white/80 transition-colors">
                {pickLocale(locale, item.body)}
              </p>
              
              <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                <span>Explore Feature</span>
                <CheckCircle2 className="w-3 h-3" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
