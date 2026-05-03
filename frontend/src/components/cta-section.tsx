"use client";

import { useGsapFadeUp } from "@/hooks/use-gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CtaSection() {
  const sectionRef = useGsapFadeUp<HTMLElement>({ stagger: 0.1 });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate API
    setLoading(false);
    toast.success("You're on the list! 🎉", {
      description: "We'll notify you the moment we launch.",
    });
    setEmail("");
  }

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Glow bg */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-violet-600/20 blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative">
        <div className="gsap-reveal gradient-border rounded-3xl glass-strong p-12 sm:p-16 shadow-2xl shadow-violet-900/20">
          <p className="gsap-reveal text-sm font-semibold text-violet-400 tracking-widest uppercase mb-4">
            Early Access
          </p>
          <h2 className="gsap-reveal text-4xl sm:text-5xl font-black mb-5 leading-tight">
            Be the first to{" "}
            <span className="text-gradient">experience it</span>
          </h2>
          <p className="gsap-reveal text-foreground/55 mb-10 text-lg leading-relaxed">
            Join thousands of event creators already on our waitlist. Get
            exclusive early access, founding member pricing, and priority support.
          </p>

          <form
            onSubmit={handleSubmit}
            className="gsap-reveal flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <Input
                id="waitlist-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 focus:border-violet-500 rounded-xl h-11"
                required
              />
            </div>
            <Button
              id="waitlist-submit"
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 rounded-xl h-11 px-6 font-semibold shadow-lg shadow-violet-900/30 group whitespace-nowrap"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Joining...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Join Waitlist
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <p className="gsap-reveal text-xs text-foreground/30 mt-4">
            No spam, ever. Unsubscribe any time. 🔒
          </p>
        </div>
      </div>
    </section>
  );
}
