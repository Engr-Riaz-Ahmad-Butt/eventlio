"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, UserCircle, Briefcase } from "lucide-react";
import { useLocale } from "@/providers/locale-provider";
import { pickLocale } from "@/lib/locale";

export function PlatformExplainer() {
  const { locale } = useLocale();

  const copy = pickLocale(locale, {
    en: {
      vendorLabel: "For Vendors",
      vendorTitle: "Your Digital Business Manager",
      vendorItems: [
        "Track bookings in one place",
        "Automatic WhatsApp notifications",
        "Advance payment visibility",
        "Client history and notes",
        "Monthly earnings reports",
      ],
      vendorCta: "See Vendor Dashboard",
      clientLabel: "For Clients",
      clientTitle: "Find Your Perfect Vendor",
      clientItems: [
        "Browse 500+ verified vendors",
        "Compare reviews and ratings",
        "View packages and prices",
        "Send direct booking requests",
        "Track safe advance payments",
      ],
      clientCta: "Browse Vendors",
      revenue: "Revenue",
      bookings: "Bookings",
      topRated: "Top Rated",
      cityMatch: "City Match",
      category: "Bridal Makeup",
      city: "Rawalpindi",
    },
    "roman-ur": {
      vendorLabel: "For Vendors",
      vendorTitle: "Aap Ka Digital Business Manager",
      vendorItems: [
        "Bookings ek jagah track karein",
        "WhatsApp pe auto notification",
        "Advance payment ka hisaab",
        "Client history aur notes",
        "Monthly earnings report",
      ],
      vendorCta: "Dashboard Dekhein",
      clientLabel: "For Clients",
      clientTitle: "Apna Perfect Vendor Dhundho",
      clientItems: [
        "500+ verified vendors browse karein",
        "Reviews aur ratings compare karein",
        "Packages aur prices dekhein",
        "Seedha booking request karein",
        "Safe advance payment karein",
      ],
      clientCta: "Vendors Browse Karein",
      revenue: "Revenue",
      bookings: "Bookings",
      topRated: "Top Rated",
      cityMatch: "City Match",
      category: "Bridal Makeup",
      city: "Rawalpindi",
    },
    ur: {
      vendorLabel: "وینڈرز کے لیے",
      vendorTitle: "آپ کا ڈیجیٹل بزنس مینیجر",
      vendorItems: [
        "تمام بکنگز ایک جگہ ٹریک کریں",
        "واٹس ایپ پر خودکار نوٹیفکیشن",
        "ایڈوانس پیمنٹ کا واضح حساب",
        "کلائنٹ ہسٹری اور نوٹس",
        "ماہانہ آمدن کی رپورٹ",
      ],
      vendorCta: "ڈیش بورڈ دیکھیں",
      clientLabel: "کلائنٹس کے لیے",
      clientTitle: "اپنا بہترین وینڈر تلاش کریں",
      clientItems: [
        "500+ تصدیق شدہ وینڈرز براؤز کریں",
        "ریویوز اور ریٹنگز کا موازنہ کریں",
        "پیکجز اور قیمتیں دیکھیں",
        "براہِ راست بکنگ ریکویسٹ بھیجیں",
        "محفوظ ایڈوانس پیمنٹ ٹریک کریں",
      ],
      clientCta: "وینڈرز براؤز کریں",
      revenue: "آمدن",
      bookings: "بکنگز",
      topRated: "اعلیٰ ریٹیڈ",
      cityMatch: "شہر میچ",
      category: "برائیڈل میک اپ",
      city: "راولپنڈی",
    },
  });

  return (
    <section className="section-pad relative overflow-hidden">
      {/* Decorative center line for desktop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gray-100 hidden lg:block" />
      
      <div className="section-shell grid gap-12 lg:grid-cols-2 lg:gap-0 overflow-hidden rounded-[48px] border border-gray-100 shadow-2xl bg-white">
        
        {/* Vendor Side */}
        <div className="relative group px-8 py-16 sm:px-12 lg:px-20 bg-[var(--primary-dark)] text-white overflow-hidden animate-fade-in-up">
          <div className="absolute top-0 left-0 w-full h-full pattern-islamic opacity-5 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3">
               <Briefcase className="w-5 h-5 text-[var(--gold)]" />
               <Badge variant="gold" className="px-4">{copy.vendorLabel}</Badge>
            </div>
            
            <h2 className="display-h2 mt-8 leading-tight">{copy.vendorTitle}</h2>
            
            <div className="mt-10 space-y-5">
              {copy.vendorItems.map((item, idx) => (
                <div key={item} className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/20 text-[var(--gold)]">
                    <Check className="h-3.5 w-3.5 stroke-[3px]" />
                  </div>
                  <span className="text-lg text-white/80 leading-relaxed font-medium">{item}</span>
                </div>
              ))}
            </div>
            
            <Button className="mt-12 rounded-2xl h-14 px-10 text-base font-bold shadow-xl shadow-black/20" variant="ghost-light">
              {copy.vendorCta}
            </Button>

            {/* Vendor UI Mockup Mini */}
            <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <div className="flex justify-between items-center mb-6">
                 <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--gold)]">Live Insights</p>
                 <Sparkles className="w-4 h-4 text-[var(--gold)] animate-pulse" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="rounded-2xl bg-white/5 p-5 border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">{copy.revenue}</p>
                  <p className="font-mono-ui text-3xl font-black text-white">245<span className="text-sm text-[var(--gold)] ml-1">K</span></p>
                </div>
                <div className="rounded-2xl bg-white/5 p-5 border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">{copy.bookings}</p>
                  <p className="font-mono-ui text-3xl font-black text-white">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Side */}
        <div className="relative group px-8 py-16 sm:px-12 lg:px-20 bg-[var(--warm-white)] text-[var(--dark)] animate-fade-in-up delay-200">
          <div className="relative z-10">
            <div className="flex items-center gap-3">
               <UserCircle className="w-5 h-5 text-[var(--primary)]" />
               <Badge className="px-4 bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]">{copy.clientLabel}</Badge>
            </div>
            
            <h2 className="display-h2 mt-8 leading-tight">{copy.clientTitle}</h2>
            
            <div className="mt-10 space-y-5">
              {copy.clientItems.map((item, idx) => (
                <div key={item} className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Check className="h-3.5 w-3.5 stroke-[3px]" />
                  </div>
                  <span className="text-lg text-[var(--gray-text)] leading-relaxed font-medium">{item}</span>
                </div>
              ))}
            </div>
            
            <Button className="mt-12 rounded-2xl h-14 px-10 text-base font-bold shadow-xl shadow-[var(--primary-subtle)]" variant="secondary">
              {copy.clientCta}
            </Button>

            {/* Client UI Mockup Mini */}
            <div className="mt-14 rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                 <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--primary)]">Top Matches</p>
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200" />)}
                 </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[var(--gold-subtle)] p-5 border border-[var(--gold)]/20 transition-transform hover:scale-105">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--gold-dark)] mb-2 font-bold">{copy.topRated}</p>
                  <p className="font-heading text-lg text-[var(--dark)]">{copy.category}</p>
                </div>
                <div className="rounded-2xl bg-[var(--primary-subtle)] p-5 border border-[var(--primary)]/20 transition-transform hover:scale-105">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--primary-dark)] mb-2 font-bold">{copy.cityMatch}</p>
                  <p className="font-heading text-lg text-[var(--dark)]">{copy.city}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
