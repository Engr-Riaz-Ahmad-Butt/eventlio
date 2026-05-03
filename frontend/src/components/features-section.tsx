"use client";

import { useGsapFadeUp } from "@/hooks/use-gsap";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Ticket,
  BarChart3,
  Bell,
  Globe2,
  Shield,
  Palette,
} from "lucide-react";

const features = [
  {
    id: "feat-ticketing",
    icon: Ticket,
    title: "Smart Ticketing",
    description:
      "Sell unlimited ticket types with dynamic pricing, early-bird deals, and group discounts — all automatic.",
    gradient: "from-violet-500 to-purple-600",
    badge: "Popular",
    badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  },
  {
    id: "feat-analytics",
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track sales, attendance, and engagement with beautiful dashboards powered by live data.",
    gradient: "from-indigo-500 to-blue-600",
    badge: "New",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  },
  {
    id: "feat-notifications",
    icon: Bell,
    title: "Smart Reminders",
    description:
      "Automated email, push, and SMS reminders that boost show-up rates by up to 40%.",
    gradient: "from-cyan-500 to-teal-600",
    badge: null,
    badgeColor: "",
  },
  {
    id: "feat-global",
    icon: Globe2,
    title: "Global Reach",
    description:
      "Multi-currency checkout, localized pages, and 40+ payment gateways so anyone, anywhere can join.",
    gradient: "from-emerald-500 to-green-600",
    badge: null,
    badgeColor: "",
  },
  {
    id: "feat-security",
    icon: Shield,
    title: "Secure & Compliant",
    description:
      "PCI-DSS compliant payments, SOC 2 certified infrastructure, and GDPR-ready data handling.",
    gradient: "from-amber-500 to-orange-600",
    badge: null,
    badgeColor: "",
  },
  {
    id: "feat-design",
    icon: Palette,
    title: "Custom Branding",
    description:
      "White-label your event pages with your brand colours, fonts, and domain — no Eventlio branding.",
    gradient: "from-pink-500 to-rose-600",
    badge: "Pro",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  },
];

export function FeaturesSection() {
  const sectionRef = useGsapFadeUp<HTMLElement>({ stagger: 0.1, y: 24 });

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-violet-900/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="gsap-reveal text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-violet-400 tracking-widest uppercase mb-3">
            Everything You Need
          </p>
          <h2 className="text-4xl sm:text-5xl font-black mb-5">
            Powerful features,{" "}
            <span className="text-gradient">zero complexity</span>
          </h2>
          <p className="text-lg text-foreground/50 leading-relaxed">
            From ticket sales to post-event analytics — Eventlio handles every
            detail so you can focus on creating unforgettable experiences.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  id,
  icon: Icon,
  title,
  description,
  gradient,
  badge,
  badgeColor,
}: (typeof features)[0]) {
  return (
    <div
      id={id}
      className="gsap-reveal glass rounded-2xl p-7 flex flex-col gap-4 group hover:glass-strong hover:-translate-y-1 transition-all duration-300 cursor-default"
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        {badge && (
          <Badge className={`text-xs border ${badgeColor}`}>{badge}</Badge>
        )}
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-foreground/55 leading-relaxed">{description}</p>
      </div>
      <div
        className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${gradient} transition-all duration-500 rounded-full mt-auto`}
      />
    </div>
  );
}
