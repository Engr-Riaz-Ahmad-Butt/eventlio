"use client";

import { useEffect, useRef } from "react";
import { marketTestimonials } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { revealOnScroll } from "@/lib/gsap";

export function Testimonials() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (gridRef.current) {
      revealOnScroll(gridRef.current.querySelectorAll("[data-testimonial-card]"));
    }
  }, []);

  return (
    <section className="section-pad bg-[var(--primary)] text-white">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="gold">Vendors Kya Kehtay Hain</Badge>
          <h2 className="display-h1 mt-6">Real Vendors, Real Results</h2>
        </div>

        <div ref={gridRef} className="mt-14 grid gap-6 lg:grid-cols-3">
          {marketTestimonials.map((item) => (
            <article
              key={item.name}
              data-testimonial-card
              className="rounded-[28px] bg-white p-8 text-[var(--dark)] shadow-[var(--shadow-md)]"
            >
              <div className="text-5xl leading-none text-[var(--gold)]">“</div>
              <p className="mt-5 text-base italic leading-8 text-[var(--gray-text)]">
                {item.quote}
              </p>
              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-subtle)] font-semibold text-[var(--primary-dark)]">
                    {item.name
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-[var(--gray-text)]">{item.role}</p>
                  </div>
                </div>
                <div className="font-mono-ui text-[var(--gold-dark)]">★★★★★</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
