"use client";

import { useGsapFadeUp } from "@/hooks/use-gsap";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: "t-1",
    name: "Sophia Chen",
    role: "Event Director @ TechWorld",
    initials: "SC",
    gradient: "from-violet-500 to-indigo-600",
    text: "Eventlio cut our setup time by 70%. The ticketing system is flawless and the analytics helped us double our next event's attendance.",
    stars: 5,
  },
  {
    id: "t-2",
    name: "Marcus Rivera",
    role: "Festival Producer",
    initials: "MR",
    gradient: "from-pink-500 to-rose-600",
    text: "I've tried every platform out there. Nothing comes close to Eventlio's design and how smooth the attendee experience is. It's genuinely fun to use.",
    stars: 5,
  },
  {
    id: "t-3",
    name: "Aisha Okafor",
    role: "Community Manager @ StartupHub",
    initials: "AO",
    gradient: "from-emerald-500 to-teal-600",
    text: "The automated reminders alone improved our show-up rate by 38%. The customer support team is phenomenal — they feel like a true partner.",
    stars: 5,
  },
];

export function TestimonialsSection() {
  const sectionRef = useGsapFadeUp<HTMLElement>({ stagger: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="gsap-reveal text-center mb-16">
          <p className="text-sm font-semibold text-violet-400 tracking-widest uppercase mb-3">
            Social Proof
          </p>
          <h2 className="text-4xl sm:text-5xl font-black">
            Loved by <span className="text-gradient">creators</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              id={t.id}
              className="gsap-reveal glass rounded-2xl p-7 flex flex-col gap-5 hover:glass-strong hover:-translate-y-1 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-violet-400/40 fill-violet-400/20" />
              <p className="text-sm text-foreground/70 leading-relaxed flex-1">{t.text}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback
                      className={`bg-gradient-to-br ${t.gradient} text-white text-sm font-bold`}
                    >
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-foreground/50">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
