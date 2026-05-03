"use client";

import { useGsapFadeUp, useGsapCounter } from "@/hooks/use-gsap";
import { TrendingUp, Users, Globe2, Award } from "lucide-react";

const stats = [
  { icon: Users, label: "Active Creators", value: 50000, suffix: "+" },
  { icon: TrendingUp, label: "Events Hosted", value: 120000, suffix: "+" },
  { icon: Globe2, label: "Countries Reached", value: 84, suffix: "" },
  { icon: Award, label: "5-Star Reviews", value: 98000, suffix: "+" },
];

function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
}: (typeof stats)[0]) {
  const countRef = useGsapCounter(value, suffix);

  return (
    <div className="gsap-reveal glass rounded-2xl p-8 flex flex-col items-center gap-3 hover:glass-strong transition-all duration-300 group">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-600/20 border border-violet-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
        <Icon className="w-6 h-6 text-violet-400" />
      </div>
      <span
        ref={countRef}
        className="text-4xl font-black text-gradient"
      >
        0{suffix}
      </span>
      <span className="text-sm text-foreground/50 font-medium text-center">{label}</span>
    </div>
  );
}

export function StatsSection() {
  const sectionRef = useGsapFadeUp<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-violet-500/50" />

      <div className="max-w-7xl mx-auto">
        <div className="gsap-reveal text-center mb-16">
          <p className="text-sm font-semibold text-violet-400 tracking-widest uppercase mb-3">
            By The Numbers
          </p>
          <h2 className="text-4xl sm:text-5xl font-black">
            Trusted by creators{" "}
            <span className="text-gradient">worldwide</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
