import Link from "next/link";
import { Button } from "@/components/ui/button";

const groups = [
  {
    title: "Eventlio",
    items: ["About", "Blog", "Careers", "Press"],
  },
  {
    title: "For Vendors",
    items: ["Register", "Pricing", "Features", "Dashboard Tour"],
  },
  {
    title: "For Clients",
    items: ["Browse Vendors", "How It Works", "Cities", "Reviews"],
  },
  {
    title: "Support",
    items: ["Help Center", "WhatsApp Support", "Privacy", "Terms"],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--dark)] text-white/70">
      <div className="section-shell py-16">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-heading text-3xl text-[var(--gold)]">Eventlio</p>
            <p className="mt-2 text-sm uppercase tracking-[0.24em] text-white/55">
              The Business OS for Event Vendors
            </p>
          </div>
          <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <input
              placeholder="Updates ke liye email dein"
              className="h-12 flex-1 rounded-full border border-white/10 bg-white/5 px-5 text-white placeholder:text-white/35"
            />
            <Button variant="gold" size="lg">
              Subscribe
            </Button>
          </div>
        </div>

        <div className="grid gap-10 py-10 sm:grid-cols-2 xl:grid-cols-4">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="font-semibold text-white">{group.title}</p>
              <div className="mt-4 flex flex-col gap-3">
                {group.items.map((item) => (
                  <Link key={item} href="#" className="hover:text-[var(--gold)]">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-sm xl:flex-row xl:items-center xl:justify-between">
          <p>© 2026 Eventlio. Made in Pakistan.</p>
          <div className="flex gap-5">
            {["Instagram", "Facebook", "WhatsApp", "LinkedIn"].map((item) => (
              <Link key={item} href="#" className="hover:text-white">
                {item}
              </Link>
            ))}
          </div>
          <p>JazzCash | Easypaisa | Bank Transfer</p>
        </div>
      </div>
    </footer>
  );
}
