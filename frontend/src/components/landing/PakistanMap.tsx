"use client";

import { Badge } from "@/components/ui/badge";

const cities = [
  { name: "Rawalpindi", vendors: "120+", status: "LIVE", x: "56%", y: "31%" },
  { name: "Islamabad", vendors: "80+", status: "LIVE", x: "58%", y: "28%" },
  { name: "Lahore", vendors: "90+", status: "LIVE", x: "63%", y: "42%" },
  { name: "Karachi", vendors: "70+", status: "LIVE", x: "42%", y: "77%" },
  { name: "Faisalabad", vendors: "30+", status: "COMING SOON", x: "59%", y: "45%" },
  { name: "Peshawar", vendors: "25+", status: "COMING SOON", x: "49%", y: "20%" },
  { name: "Multan", vendors: "20+", status: "COMING SOON", x: "55%", y: "56%" },
  { name: "Quetta", vendors: "10+", status: "COMING SOON", x: "30%", y: "48%" },
];

export function PakistanMap() {
  return (
    <section className="section-pad bg-[var(--primary-dark)] text-white">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="gold">City Rollout</Badge>
          <h2 className="display-h1 mt-6">Poore Pakistan Mein</h2>
          <p className="mt-4 text-lg text-white/66">
            Rawalpindi se shuru, poore mulk mein phelna hai.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.7fr]">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[color:rgba(27,77,62,0.35)] p-6">
            <svg
              viewBox="0 0 500 700"
              className="mx-auto h-full max-h-[540px] w-full max-w-[440px]"
            >
              <path
                d="M267 53c46 16 81 60 99 106 16 41 56 70 64 120 10 65-22 114-49 166-18 34-15 73-34 108-23 44-67 94-129 98-57 4-110-26-145-71-31-39-48-86-54-136-6-52-23-113-4-163 16-43 56-70 88-104 26-27 45-58 75-88 28-28 58-48 89-36Z"
                fill="rgba(27,77,62,0.55)"
                stroke="rgba(45,110,90,0.9)"
                strokeWidth="6"
              />
            </svg>

            {cities.map((city) => (
              <div
                key={city.name}
                className="group absolute"
                style={{ left: city.x, top: city.y }}
              >
                <span
                  className={`relative flex h-4 w-4 rounded-full ${
                    city.status === "LIVE" ? "bg-[var(--gold)]" : "bg-white"
                  }`}
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-50" />
                </span>
                <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 rounded-xl bg-[var(--dark)] px-3 py-2 text-xs text-white shadow-[var(--shadow-md)] group-hover:block">
                  {city.name} - {city.vendors} Vendors
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <div className="space-y-5">
              {cities.map((city) => (
                <div
                  key={city.name}
                  className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-white">{city.name}</p>
                    <p className="text-sm text-white/55">{city.vendors} vendors</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${
                      city.status === "LIVE"
                        ? "bg-[var(--gold)] text-[var(--dark)]"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    {city.status}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm uppercase tracking-[0.28em] text-[var(--gold)]">
              Aur expand ho raha hai...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
