"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Search, Star, Sparkles } from "lucide-react";
import { mockVendors } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/providers/locale-provider";
import { pickLocale } from "@/lib/locale";

const previewVendors = mockVendors.slice(0, 3);

export function MarketplacePreview() {
  const { locale } = useLocale();

  const copy = pickLocale(locale, {
    en: {
      badge: "THE MARKETPLACE",
      title: "Find the Best Vendor in Your City",
      searchPlaceholder: "Search photographers, salons...",
      searchBtn: "Search",
      viewAll: "View All Vendors",
      startingAt: "starting from",
      reviews: "reviews",
      cities: "Rawalpindi ▾",
    },
    "roman-ur": {
      badge: "THE MARKETPLACE",
      title: "Apne Shahar Ka Best Vendor Dhundho",
      searchPlaceholder: "Photographer, salon dhundho...",
      searchBtn: "Dhundho",
      viewAll: "Saray Vendors Dekhein",
      startingAt: "se shuru",
      reviews: "reviews",
      cities: "Rawalpindi ▾",
    },
    ur: {
      badge: "مارکیٹ پلیس",
      title: "اپنے شہر کا بہترین وینڈر تلاش کریں",
      searchPlaceholder: "فوٹوگرافر، سیلون تلاش کریں...",
      searchBtn: "تلاش کریں",
      viewAll: "تمام وینڈرز دیکھیں",
      startingAt: "سے شروع",
      reviews: "ریویوز",
      cities: "راولپنڈی ▾",
    },
  });

  const categories = pickLocale(locale, {
    en: ["Photographer", "Bridal Makeup", "Salon", "Decor", "Catering", "DJ", "Mehndi", "Venue"],
    "roman-ur": ["Photographer", "Bridal Makeup", "Salon", "Decor", "Catering", "DJ", "Mehndi", "Venue"],
    ur: ["فوٹوگرافر", "برائیڈل میک اپ", "سیلون", "ڈیکور", "کیٹرنگ", "ڈی جے", "مہندی", "وینیو"],
  });

  return (
    <section id="marketplace" className="section-pad market-shell relative overflow-hidden bg-[var(--warm-white)]">
      {/* Background patterns */}
      <div className="absolute inset-0 pattern-islamic opacity-[0.03] pointer-events-none" />
      
      <div className="section-shell relative z-10">
        <div className="max-w-3xl animate-fade-in-up">
          <Badge variant="gold" className="px-4 py-1.5 flex w-fit gap-2">
            <Sparkles className="w-3 h-3 fill-[var(--gold-dark)]" />
            {copy.badge}
          </Badge>
          <h2 className="display-h1 mt-6 text-[var(--dark)]">
            {copy.title}
          </h2>
        </div>

        {/* Search Bar */}
        <div className="mt-12 rounded-[40px] border border-[color:rgba(27,77,62,0.12)] bg-white/80 backdrop-blur-md p-5 shadow-2xl animate-fade-in-up delay-100">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex h-14 items-center gap-2 rounded-[24px] border border-[color:rgba(27,77,62,0.1)] bg-gray-50/50 px-6 text-[var(--dark)] font-semibold min-w-[180px] cursor-pointer hover:bg-gray-100 transition-colors">
              <MapPin className="w-4 h-4 text-[var(--primary)]" />
              {copy.cities}
            </div>
            <div className="hidden w-px h-8 bg-gray-200 lg:block" />
            <div className="flex h-14 flex-1 items-center gap-4 rounded-[24px] border border-[color:rgba(27,77,62,0.1)] bg-gray-50/50 px-6 transition-all focus-within:border-[var(--primary)] focus-within:ring-4 focus-within:ring-[var(--primary-subtle)]">
              <Search className="h-5 w-5 text-[var(--gray-text)]" />
              <input 
                type="text"
                placeholder={copy.searchPlaceholder}
                className="bg-transparent border-none outline-none w-full text-[var(--dark)] font-medium placeholder:text-[var(--gray-text)]"
              />
            </div>
            <Button variant="gold" size="xl" className="rounded-[24px] px-10 shadow-lg shadow-gold/20">
              {copy.searchBtn}
            </Button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="scrollbar-gold mt-8 flex gap-3 overflow-x-auto pb-4 animate-fade-in-up delay-200">
          {categories.map((chip) => (
            <button
              key={chip}
              className="whitespace-nowrap rounded-full border border-[color:rgba(27,77,62,0.15)] bg-white px-6 py-2.5 text-sm font-bold text-[var(--primary-dark)] transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--dark)] hover:shadow-lg shadow-sm"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Vendor Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {previewVendors.map((vendor, idx) => (
            <article
              key={vendor.id}
              className="group overflow-hidden rounded-[36px] border border-[color:rgba(27,77,62,0.08)] bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl animate-fade-in-up"
              style={{ animationDelay: `${300 + idx * 100}ms` }}
            >
              <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${vendor.gradient}`}>
                <div className="absolute left-6 top-6 z-10">
                  <Badge variant="gold" className="shadow-lg">{vendor.badge}</Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-[100px] text-white/20 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12">
                  ✦
                </div>
                {/* Image overlay mock */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start">
                   <h3 className="font-heading text-2xl text-[var(--dark)] group-hover:text-[var(--primary)] transition-colors">
                     {vendor.name}
                   </h3>
                   <div className="flex items-center gap-1.5 text-sm font-bold">
                     <Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />
                     <span className="font-mono-ui">{vendor.rating}</span>
                   </div>
                </div>
                
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-full bg-[var(--primary-subtle)] px-4 py-1.5 text-xs font-bold text-[var(--primary-dark)] uppercase tracking-wider">
                    {vendor.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-[var(--gray-text)] font-medium">
                    <MapPin className="h-4 w-4" />
                    {vendor.city}
                  </span>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--gray-text)] font-bold mb-1">
                      {copy.startingAt}
                    </p>
                    <p className="font-mono-ui text-2xl font-black text-[var(--dark)]">
                      <span className="text-sm font-bold text-[var(--gold-dark)] mr-1">PKR</span>
                      {vendor.startingPrice.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                     <p className="text-xs text-[var(--gray-text)] font-medium">
                       {vendor.reviews} {copy.reviews}
                     </p>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <Button variant="outline" className="flex-1 rounded-2xl h-12" asChild>
                    <Link href={`/vendors/${vendor.slug}`}>View Profile</Link>
                  </Button>
                  <Button variant="gold" className="flex-1 rounded-2xl h-12 shadow-md">
                    Book Now
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All */}
        <div className="mt-16 text-center animate-fade-in-up delay-500">
          <Button variant="gold" size="xl" className="px-12 rounded-[24px] shadow-xl group" asChild>
            <Link href="/vendors">
              {copy.viewAll}
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
