"use client";

import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { revealOnScroll } from "@/lib/gsap";

const rows = [
  ["Vendor Dashboard", "✓", "✗", "✓", "✓"],
  ["Client Marketplace", "✓", "✓", "✗", "✗"],
  ["WhatsApp Integration", "✓", "✗", "✗", "✗"],
  ["JazzCash / Easypaisa", "✓", "✗", "✗", "✗"],
  ["Pakistan Cities", "✓", "✓", "✗", "✗"],
  ["Urdu Language", "✓", "Partial", "✗", "✗"],
  ["Booking Management", "✓", "✗", "✓", "✓"],
  ["Payment Tracking", "✓", "✗", "✓", "✓"],
  ["Monthly Price (PKR)", "1,500-5K", "Free*", "10,000+", "9,000+"],
  ["Setup Difficulty", "Easy", "Easy", "Medium", "Complex"],
];

export function ComparisonTable() {
  const tableRef = useRef<HTMLTableSectionElement | null>(null);

  useEffect(() => {
    if (tableRef.current) {
      revealOnScroll(tableRef.current.querySelectorAll("tr"), { x: -20, y: 0 });
    }
  }, []);

  return (
    <section className="section-pad bg-[var(--primary-dark)] text-white">
      <div className="section-shell">
        <Badge variant="gold">Why Eventlio</Badge>
        <h2 className="display-h1 mt-6 max-w-3xl">Kyun Eventlio? Kyun Nahi Doosray?</h2>

        <div className="mt-12 overflow-hidden rounded-[30px] border border-[color:rgba(201,168,76,0.18)] bg-white/5">
          <div className="overflow-x-auto scrollbar-gold">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-sm uppercase tracking-[0.22em] text-white/56">
                  <th className="px-6 py-5">Feature</th>
                  <th className="bg-[var(--gold)] px-6 py-5 text-[var(--dark)]">Eventlio ✦</th>
                  <th className="px-6 py-5">Shadiyana</th>
                  <th className="px-6 py-5">HoneyBook</th>
                  <th className="px-6 py-5">Dubsado</th>
                </tr>
              </thead>
              <tbody ref={tableRef}>
                {rows.map((row) => (
                  <tr
                    key={row[0]}
                    className="border-b border-white/8 text-sm text-white/78 transition hover:bg-[color:rgba(201,168,76,0.06)]"
                  >
                    {row.map((cell, index) => (
                      <td
                        key={`${row[0]}-${index}`}
                        className={`px-6 py-4 ${
                          index === 1 ? "font-semibold text-[var(--gold)]" : ""
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
