import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import type { MarketplaceVendor } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type VendorCardProps = {
  vendor: MarketplaceVendor;
};

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
      <div className={`relative h-44 bg-gradient-to-br ${vendor.gradient}`}>
        <div className="absolute left-4 top-4">
          <Badge variant="gold">{vendor.badge}</Badge>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-[84px] text-white/12">
          ✦
        </div>
        <div className="absolute -bottom-6 left-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--gold)] bg-white font-semibold text-[var(--primary-dark)]">
          {vendor.name
            .split(" ")
            .slice(0, 2)
            .map((item) => item[0])
            .join("")}
        </div>
      </div>

      <div className="px-5 pb-5 pt-8">
        <h3 className="font-heading text-2xl text-[var(--dark)]">{vendor.name}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-[var(--primary-subtle)] px-3 py-1 text-[var(--primary-dark)]">
            {vendor.category}
          </span>
          <span className="flex items-center gap-1 text-[var(--gray-text)]">
            <MapPin className="h-4 w-4" />
            {vendor.city}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1">
          <Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />
          <span className="font-mono-ui text-sm text-[var(--dark)]">{vendor.rating}</span>
          <span className="text-xs text-[var(--gray-text)]">({vendor.reviews} reviews)</span>
        </div>

        <p className="mt-4 text-sm leading-7 text-[var(--gray-text)]">{vendor.description}</p>

        <div className="mt-4 font-mono-ui text-xl font-medium text-[var(--gold-dark)]">
          PKR {vendor.startingPrice.toLocaleString()}
          <span className="ml-2 font-body text-sm font-normal text-[var(--gray-text)]">
            se shuru
          </span>
        </div>

        <div className="mt-5 flex gap-3">
          <Button variant="outline" className="flex-1" asChild>
            <Link href={`/vendors/${vendor.slug}`}>Profile Dekho</Link>
          </Button>
          <Button variant="gold" className="flex-1">
            Book Now →
          </Button>
        </div>
      </div>
    </article>
  );
}
