"use client";

import { useGsapHeroTimeline, useGsapParallax } from "@/hooks/use-gsap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CalendarDays, Sparkles, Star } from "lucide-react";
import Link from "next/link";

const floatingCards = [
  {
    id: "float-card-1",
    title: "Web3 Summit 2025",
    date: "Jun 14",
    attendees: 2400,
    tag: "Tech",
    color: "from-violet-500 to-indigo-600",
    position: "top-10 left-0 -translate-x-8 lg:-translate-x-16",
  },
  {
    id: "float-card-2",
    title: "Creative Design Conf",
    date: "Jul 2",
    attendees: 890,
    tag: "Design",
    color: "from-pink-500 to-rose-600",
    position: "bottom-20 right-0 translate-x-8 lg:translate-x-16",
  },
  {
    id: "float-card-3",
    title: "AI & ML Workshop",
    date: "Aug 8",
    attendees: 350,
    tag: "AI",
    color: "from-cyan-500 to-blue-600",
    position: "top-40 right-4 translate-x-0",
  },
];

export function HeroSection() {
  const heroRef = useGsapHeroTimeline<HTMLElement>();
  const bgRef = useGsapParallax<HTMLDivElement>(0.4);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated background blobs */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-indigo-600/20 blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-[80px]" />
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Badge */}
        <div className="hero-badge flex justify-center mb-6">
          <Badge className="glass border-violet-500/40 text-violet-300 px-4 py-2 text-sm gap-2">
            <Sparkles className="w-3.5 h-3.5 fill-violet-400 text-violet-400" />
            Now in Public Beta — Join 50K+ event creators
          </Badge>
        </div>

        {/* Heading */}
        <h1 className="hero-heading text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-none mb-6">
          <span className="text-foreground">The Future of</span>
          <br />
          <span className="text-gradient text-glow">Event Discovery</span>
        </h1>

        {/* Subheading */}
        <p className="hero-sub max-w-2xl mx-auto text-lg sm:text-xl text-foreground/60 leading-relaxed mb-10">
          Create stunning events, sell tickets globally, and engage your audience — all from one beautifully designed platform built for the modern creator.
        </p>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            id="hero-get-started"
            size="lg"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 shadow-2xl shadow-violet-900/40 px-8 py-6 text-base font-semibold rounded-xl group"
            asChild
          >
            <Link href="#signup">
              Start for Free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            id="hero-explore"
            size="lg"
            variant="outline"
            className="glass border-white/20 hover:bg-white/10 px-8 py-6 text-base font-semibold rounded-xl"
            asChild
          >
            <Link href="#discover">
              <CalendarDays className="w-4 h-4 mr-2" />
              Explore Events
            </Link>
          </Button>
        </div>

        {/* Social proof */}
        <div className="hero-cta flex items-center justify-center gap-3 mt-8 text-sm text-foreground/50">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-background bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span>Loved by 50,000+ creators</span>
        </div>
      </div>

      {/* Floating event cards */}
      {floatingCards.map((card) => (
        <FloatingCard key={card.id} {...card} />
      ))}
    </section>
  );
}

function FloatingCard({
  id,
  title,
  date,
  attendees,
  tag,
  color,
  position,
}: (typeof floatingCards)[0]) {
  return (
    <div
      id={id}
      className={`hero-image hidden xl:block absolute ${position} glass-strong rounded-2xl p-4 w-52 shadow-2xl hover:-translate-y-1 transition-transform duration-300 animate-[float_6s_ease-in-out_infinite]`}
      style={{ animationDelay: `${Math.random() * 2}s` }}
    >
      <div className={`h-1.5 w-10 rounded-full bg-gradient-to-r ${color} mb-3`} />
      <p className="text-sm font-semibold text-foreground truncate">{title}</p>
      <p className="text-xs text-foreground/50 mt-1">{date} · {attendees.toLocaleString()} attending</p>
      <Badge className={`mt-2 text-[10px] bg-gradient-to-r ${color} border-0 text-white`}>{tag}</Badge>
    </div>
  );
}
