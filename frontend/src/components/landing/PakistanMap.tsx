"use client";

import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/providers/locale-provider";
import { pickLocale } from "@/lib/locale";

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
  const { locale } = useLocale();

  const copy = pickLocale(locale, {
    en: {
      badge: "City Rollout",
      title: "Across Pakistan",
      subtitle: "Starting from Rawalpindi, expanding across the nation.",
      expand: "More cities coming soon...",
      vendors: "Vendors",
    },
    "roman-ur": {
      badge: "Shehar Rollout",
      title: "Poore Pakistan Mein",
      subtitle: "Rawalpindi se shuru, poore mulk mein phelna hai.",
      expand: "Aur expand ho raha hai...",
      vendors: "Vendors",
    },
    ur: {
      badge: "شہروں کا آغاز",
      title: "پورے پاکستان میں",
      subtitle: "راولپنڈی سے آغاز، اب پورے ملک میں پھیل رہے ہیں۔",
      expand: "مزید شہر جلد آ رہے ہیں...",
      vendors: "وینڈرز",
    },
  });

  return (
    <section className="section-pad bg-[var(--primary-dark)] text-white relative overflow-hidden">
      {/* Decorative background stars or dots */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-[var(--gold)] rounded-full animate-pulse delay-500" />
      </div>

      <div className="section-shell relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="gold" className="animate-fade-in-up">{copy.badge}</Badge>
          <h2 className="display-h1 mt-6 animate-fade-in-up delay-100">{copy.title}</h2>
          <p className="mt-4 text-lg text-white/66 animate-fade-in-up delay-200">
            {copy.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.7fr]">
          {/* Map Visual */}
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[color:rgba(27,77,62,0.45)] p-10 shadow-2xl animate-fade-in-up delay-300">
            <div className="relative h-full min-h-[400px]">
              <svg
                viewBox="0 0 500 700"
                className="mx-auto h-full w-full max-w-[440px] opacity-20"
              >
                <path
                  d="M267 53c46 16 81 60 99 106 16 41 56 70 64 120 10 65-22 114-49 166-18 34-15 73-34 108-23 44-67 94-129 98-57 4-110-26-145-71-31-39-48-86-54-136-6-52-23-113-4-163 16-43 56-70 88-104 26-27 45-58 75-88 28-28 58-48 89-36Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-[var(--gold)]"
                />
              </svg>

              {cities.map((city, idx) => (
                <div
                  key={city.name}
                  className="group absolute cursor-help"
                  style={{ left: city.x, top: city.y }}
                >
                  <span
                    className={`relative flex h-5 w-5 rounded-full shadow-lg transition-transform hover:scale-150 ${
                      city.status === "LIVE" ? "bg-[var(--gold)]" : "bg-white/30"
                    }`}
                  >
                    <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-40" />
                  </span>
                  
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-20 w-40 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="bg-[var(--dark)] rounded-2xl p-3 border border-white/10 shadow-2xl text-center">
                       <p className="font-bold text-[var(--gold)]">{city.name}</p>
                       <p className="text-[10px] uppercase tracking-widest text-white/50 mt-1">
                         {city.vendors} {copy.vendors}
                       </p>
                    </div>
                    {/* Tooltip arrow */}
                    <div className="w-3 h-3 bg-[var(--dark)] border-r border-b border-white/10 rotate-45 mx-auto -mt-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* List Sidebar */}
          <div className="rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm animate-fade-in-up delay-400">
            <div className="space-y-4">
              {cities.map((city) => (
                <div
                  key={city.name}
                  className="flex items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.02] px-5 py-4 transition-colors hover:bg-white/[0.05]"
                >
                  <div>
                    <p className="font-bold text-lg text-white">{city.name}</p>
                    <p className="text-xs uppercase tracking-widest text-white/40">
                      {city.vendors} {copy.vendors}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] ${
                      city.status === "LIVE"
                        ? "bg-[var(--gold)] text-[var(--dark)] shadow-[0_0_15px_rgba(201,168,76,0.3)]"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {city.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-3">
               <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
               <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--gold)] text-center">
                 {copy.expand}
               </p>
               <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
