"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "@/lib/gsap";
import { pickLocale } from "@/lib/locale";
import { useLocale, type AppLocale } from "@/providers/locale-provider";

const links = [
  {
    href: "#features",
    label: { en: "Features", "roman-ur": "Features", ur: "فیچرز" },
  },
  {
    href: "#pricing",
    label: { en: "Pricing", "roman-ur": "Pricing", ur: "قیمت" },
  },
  {
    href: "#how-it-works",
    label: {
      en: "How It Works",
      "roman-ur": "Kaise Kaam Karta Hai",
      ur: "یہ کیسے کام کرتا ہے",
    },
  },
  {
    href: "#vendors",
    label: {
      en: "For Vendors",
      "roman-ur": "Vendors Ke Liye",
      ur: "وینڈرز کے لیے",
    },
  },
  {
    href: "#blog",
    label: { en: "Blog", "roman-ur": "Blog", ur: "بلاگ" },
  },
];

const localeLabels: Record<AppLocale, string> = {
  en: "EN",
  "roman-ur": "Roman",
  ur: "اردو",
};

const localeFullLabels: Record<AppLocale, string> = {
  en: "English",
  "roman-ur": "Roman Urdu",
  ur: "اردو",
};

const allLocales: AppLocale[] = ["en", "roman-ur", "ur"];

function StarMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-[var(--gold)]">
      <path d="m12 1.5 2.4 5.1 5.6.5-4.2 3.8 1.2 5.4L12 13.8 7 16.3l1.2-5.4L4 7.1l5.6-.5L12 1.5Z" />
    </svg>
  );
}

/** Desktop compact pill language switcher */
function DesktopLangSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center rounded-full border border-[color:rgba(201,168,76,0.5)] bg-[color:rgba(10,31,23,0.8)] p-1">
      {allLocales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLocale(item)}
          title={localeFullLabels[item]}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
            locale === item
              ? "bg-[var(--gold)] text-[var(--dark)] shadow-sm"
              : "text-[var(--gold)] hover:bg-[color:rgba(201,168,76,0.12)]"
          }`}
        >
          {localeLabels[item]}
        </button>
      ))}
    </div>
  );
}

/** Mobile full language picker */
function MobileLangPicker() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="rounded-2xl border border-[color:rgba(201,168,76,0.2)] bg-white/4 p-4">
      <p className="text-[10px] uppercase tracking-[0.28em] text-white/40 font-medium mb-3">
        Language / زبان
      </p>
      <div className="flex flex-col gap-2">
        {allLocales.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setLocale(item)}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-left transition-all ${
              locale === item
                ? "bg-[var(--gold)] text-[var(--dark)]"
                : "text-white/70 hover:bg-white/8 hover:text-white"
            }`}
          >
            <Globe className="h-4 w-4 shrink-0" />
            {localeFullLabels[item]}
            {locale === item && (
              <span className="ml-auto text-[10px] font-bold uppercase tracking-wide opacity-60">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!panelRef.current) return;
    gsap.to(panelRef.current, {
      x: open ? "0%" : "100%",
      duration: 0.45,
      ease: "power2.out",
    });
  }, [open]);

  const labels = pickLocale(locale, {
    en: { login: "Login", trial: "Start Free Trial" },
    "roman-ur": { login: "Login", trial: "Free Trial Shuru Karein" },
    ur: { login: "لاگ اِن", trial: "فری ٹرائل شروع کریں" },
  });

  return (
    <>
      {/* ── Sticky header ── */}
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[color:rgba(13,43,34,0.96)] shadow-[0_4px_24px_rgba(0,0,0,0.3)] backdrop-blur-xl border-b border-[color:rgba(201,168,76,0.12)]"
            : "bg-[color:rgba(10,31,23,0.55)] backdrop-blur-md"
        }`}
      >
        <div className="section-shell flex h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <StarMark />
            <span className="font-heading text-2xl font-semibold text-[var(--gold)]">
              Eventlio
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-[14px] text-white/75 hover:text-[var(--gold)] transition-colors"
              >
                {pickLocale(locale, link.label)}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop right: Language pill + CTAs */}
          <div className="hidden items-center gap-3 lg:flex shrink-0">
            {/* ✅ Language toggle — always visible */}
            <DesktopLangSwitcher />

            <div className="w-px h-5 bg-white/15 mx-1" />

            <Button variant="ghost-light" size="sm" asChild>
              <Link href="/login">{labels.login}</Link>
            </Button>
            <Button variant="gold" size="sm" asChild>
              <Link href="/register">{labels.trial}</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:rgba(201,168,76,0.4)] text-[var(--gold)] lg:hidden hover:bg-[color:rgba(201,168,76,0.12)] transition-colors"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* ── Mobile slide-in panel ── */}
      <div
        ref={panelRef}
        className="fixed inset-y-0 right-0 z-[60] w-full translate-x-full bg-[var(--primary-dark)] px-6 py-6 lg:hidden overflow-y-auto"
      >
        {/* Panel top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StarMark />
            <span className="font-heading text-2xl text-[var(--gold)]">Eventlio</span>
          </div>
          <button
            type="button"
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="mt-10 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3.5 text-xl font-medium text-white/80 hover:bg-white/5 hover:text-[var(--gold)] transition-colors"
            >
              {pickLocale(locale, link.label)}
            </Link>
          ))}
        </nav>

        {/* Language selector */}
        <div className="mt-8">
          <MobileLangPicker />
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3">
          <Button variant="ghost-light" size="lg" asChild>
            <Link href="/login" onClick={() => setOpen(false)}>
              {labels.login}
            </Link>
          </Button>
          <Button variant="gold" size="lg" asChild>
            <Link href="/register" onClick={() => setOpen(false)}>
              {labels.trial}
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
