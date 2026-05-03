"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { gsap } from "@/lib/gsap";

const vendorSteps = [
  ["Register & Profile Banao", "2 minute mein apna business setup. Photos, packages, prices add karo."],
  ["Booking Request Aye", "Client request karta hai. Aap ko WhatsApp pe seedha notification aata hai."],
  ["Accept Karo", "Ek click mein confirm. Client ko automatic confirmation message jata hai."],
  ["Client Se Deal Karo", "Aap ka number share tab hota hai jab deal genuine ho. Details finalize karo."],
  ["Dashboard Mein Track Karo", "Payment track karo, upcoming events dekho, sab organized."],
];

const clientSteps = [
  ["City aur Category Choose Karo", "Apne shahar aur service type ke hisaab se shortlist banao."],
  ["Vendor Profiles Compare Karo", "Reviews, pricing, gallery aur response time ek nazar mein dekho."],
  ["Booking Request Bhejo", "Seedha request bhejo without endless back and forth."],
  ["Advance Payment Karo", "Secure payment tracking ke saath booking confidence milta hai."],
  ["Event Ka Maza Lo!", "Better coordination, better communication, better event outcome."],
];

export function HowItWorks() {
  const [active, setActive] = useState<"vendor" | "client">("vendor");
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const context = gsap.context(() => {
      gsap.from("[data-step-item]", {
        x: -30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 78%",
          once: true,
        },
      });
    }, rootRef);

    return () => context.revert();
  }, [active]);

  const steps = active === "vendor" ? vendorSteps : clientSteps;

  return (
    <section id="how-it-works" className="section-pad bg-[color:rgba(232,245,233,0.28)]">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <Badge>How It Works</Badge>
          <h2 className="display-h1 mt-6 text-[var(--dark)]">Simple. Fast. WhatsApp.</h2>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-[color:rgba(27,77,62,0.1)] bg-white p-1 shadow-[var(--shadow-sm)]">
            {[
              ["vendor", "Vendor Ke Liye"],
              ["client", "Client Ke Liye"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setActive(value as "vendor" | "client")}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  active === value
                    ? "bg-[var(--gold-subtle)] text-[var(--gold-dark)]"
                    : "text-[var(--gray-text)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={rootRef}
          className="mx-auto mt-14 max-w-4xl rounded-[30px] border border-[color:rgba(27,77,62,0.08)] bg-white px-6 py-8 shadow-[var(--shadow-md)] sm:px-10"
        >
          <div className="relative">
            <div className="absolute left-[18px] top-2 hidden h-[calc(100%-1rem)] w-px bg-[linear-gradient(180deg,var(--gold),rgba(201,168,76,0.1))] sm:block" />
            <div className="space-y-8">
              {steps.map(([title, body], index) => (
                <div key={title} data-step-item className="relative flex gap-4 sm:gap-6">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] font-mono-ui text-sm font-medium text-[var(--dark)]">
                    {index + 1}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-semibold text-[var(--dark)]">{title}</h3>
                    <p className="mt-2 leading-8 text-[var(--gray-text)]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
