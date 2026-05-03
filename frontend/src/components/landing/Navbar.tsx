"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "@/lib/gsap";

const links = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#vendors", label: "For Vendors" },
  { href: "#blog", label: "Blog" },
];

function StarMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-[var(--gold)]"
    >
      <path d="m12 1.5 2.4 5.1 5.6.5-4.2 3.8 1.2 5.4L12 13.8 7 16.3l1.2-5.4L4 7.1l5.6-.5L12 1.5Z" />
    </svg>
  );
}

export function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[color:rgba(13,43,34,0.92)] shadow-[var(--shadow-md)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="section-shell flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <StarMark />
            <span className="font-heading text-2xl font-semibold text-[var(--gold)]">
              Eventlio
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-[15px] text-white/80 hover:text-[var(--gold)]"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button className="rounded-full border border-[color:rgba(201,168,76,0.45)] px-4 py-2 text-sm font-medium text-[var(--gold)]">
              EN | اردو
            </button>
            <Button variant="ghost-light" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="gold" asChild>
              <Link href="/register">Start Free Trial</Link>
            </Button>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
            onClick={() => setOpen((state) => !state)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <div
        ref={panelRef}
        className="fixed inset-y-0 right-0 z-[60] w-full translate-x-full bg-[var(--primary-dark)] px-6 py-6 lg:hidden"
      >
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

        <div className="mt-16 flex flex-col gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-2xl font-medium text-[var(--gold)]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3">
          <Button variant="ghost-light" size="lg" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="gold" size="lg" asChild>
            <Link href="/register">Start Free Trial</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
