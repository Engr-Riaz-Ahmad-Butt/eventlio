"use client";

import { useState } from "react";
import { Check, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type PlanFeature = [string, boolean];

type Plan = {
  name: string;
  price: number;
  subtitle: string;
  featured: boolean;
  features: PlanFeature[];
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: 1500,
    subtitle: "Shuruat ke liye perfect",
    featured: false,
    features: [
      ["20 bookings/month", true],
      ["Vendor profile + marketplace listing", true],
      ["WhatsApp notifications", true],
      ["Basic payment tracking", true],
      ["Customer reviews", true],
      ["Analytics", false],
      ["Staff management", false],
    ],
  },
  {
    name: "Professional",
    price: 3000,
    subtitle: "Sabse zyada popular",
    featured: true,
    features: [
      ["Unlimited bookings", true],
      ["Full dashboard", true],
      ["WhatsApp notifications", true],
      ["Advanced payment tracking", true],
      ["Business analytics", true],
      ["Gallery management (20 photos)", true],
      ["Staff management", false],
    ],
  },
  {
    name: "Business",
    price: 5000,
    subtitle: "Growing businesses ke liye",
    featured: false,
    features: [
      ["Everything in Professional", true],
      ["Staff & commission tracking", true],
      ["Featured listing", true],
      ["Multiple team members", true],
      ["Priority WhatsApp support", true],
      ["Unlimited gallery photos", true],
      ["Advanced reports", true],
    ],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="section-pad bg-[var(--warm-white)]">
      <div className="section-shell">
        <div className="rounded-[26px] bg-[var(--gold)] px-6 py-4 text-center text-sm font-semibold text-[var(--dark)] shadow-[var(--shadow-sm)]">
          Pehle 3 Mahine Bilkul Free - Credit Card Nahi Chahiye
        </div>

        <div className="mt-8 flex flex-col items-center text-center">
          <Badge variant="gold">Pricing</Badge>
          <h2 className="display-h1 mt-6 text-[var(--dark)]">Simple, Seedha Pricing</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--gray-text)]">
            Pakistan ke vendors ke liye affordable plans with room to grow.
          </p>

          <div className="mt-8 inline-flex items-center rounded-full border border-[color:rgba(27,77,62,0.12)] bg-white p-1 shadow-[var(--shadow-sm)]">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={`rounded-full px-5 py-2 text-sm font-semibold ${
                !yearly ? "bg-[var(--primary)] text-white" : "text-[var(--gray-text)]"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={`rounded-full px-5 py-2 text-sm font-semibold ${
                yearly ? "bg-[var(--primary)] text-white" : "text-[var(--gray-text)]"
              }`}
            >
              Yearly
            </button>
            <span className="ml-2 rounded-full bg-[var(--gold-subtle)] px-3 py-1 text-xs font-semibold text-[var(--gold-dark)]">
              2 mahine free
            </span>
          </div>
        </div>

        <div className="mt-14 grid gap-6 xl:grid-cols-3">
          {plans.map((plan) => {
            const price = yearly ? plan.price * 10 : plan.price;

            return (
              <article
                key={plan.name}
                className={`relative rounded-[30px] border bg-white p-8 shadow-[var(--shadow-md)] transition hover:-translate-y-1 ${
                  plan.featured
                    ? "border-[var(--gold)] ring-2 ring-[color:rgba(201,168,76,0.14)]"
                    : "border-[color:rgba(27,77,62,0.08)]"
                }`}
              >
                {plan.featured ? (
                  <span className="absolute right-5 top-5 rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--dark)]">
                    Sabse Pasand
                  </span>
                ) : null}

                <h3 className="font-heading text-3xl text-[var(--dark)]">{plan.name}</h3>
                <p className="mt-2 text-[var(--gray-text)]">{plan.subtitle}</p>
                <div className="mt-6">
                  <span className="font-mono-ui text-4xl font-medium text-[var(--dark)]">
                    PKR {price.toLocaleString()}
                  </span>
                  <span className="ml-2 text-[var(--gray-text)]">/{yearly ? "year" : "month"}</span>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map(([feature, enabled]) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      {enabled ? (
                        <Check className="mt-0.5 h-4 w-4 text-[var(--success)]" />
                      ) : (
                        <Lock className="mt-0.5 h-4 w-4 text-[var(--gray-text)]" />
                      )}
                      <span className={enabled ? "text-[var(--dark)]" : "text-[var(--gray-text)]"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.featured ? "gold" : "outline"}
                  size="xl"
                  className="mt-10 w-full"
                >
                  Free Trial Shuru
                </Button>
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-center text-sm text-[var(--gray-text)]">
          Koi bhi plan mein pehle 3 mahine free. Uske baad cancel karo, koi charge nahi.
          <div className="mt-3 font-medium text-[var(--primary-dark)]">
            JazzCash | Easypaisa | Bank Transfer supported
          </div>
        </div>
      </div>
    </section>
  );
}
