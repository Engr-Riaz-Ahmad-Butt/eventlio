import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import type { MarketplaceVendorListItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type VendorCardProps = {
  vendor: MarketplaceVendorListItem;
  compact?: boolean;
};

export function VendorCard({ vendor, compact = false }: VendorCardProps) {
  const initials = vendor.businessName
    .split(" ")
    .slice(0, 2)
    .map((item) => item[0])
    .join("");
  const categoryLabel = vendor.category?.name ?? vendor.categories[0]?.name ?? "Vendor";

  return (
    <article className="group overflow-hidden rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
      <div
        className="relative h-44 bg-[radial-gradient(circle_at_top,_rgba(201,168,76,0.3),_transparent_42%),linear-gradient(135deg,var(--primary),var(--primary-light))]"
        style={
          vendor.coverImage
            ? {
                backgroundImage: `linear-gradient(180deg, rgba(10,31,23,0.18), rgba(10,31,23,0.65)), url(${vendor.coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="absolute left-4 top-4">
          <Badge variant="gold">
            {vendor.isFeatured ? "Featured" : vendor.isVerified ? "Verified" : "Vendor"}
          </Badge>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-[84px] text-white/12">
          ✦
        </div>
        <div className="absolute -bottom-6 left-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--gold)] bg-white font-semibold text-[var(--primary-dark)]">
          {initials}
        </div>
      </div>

      <div className={`px-5 pb-5 pt-8 ${compact ? "sm:pb-4" : ""}`}>
        <h3 className="font-heading text-2xl text-[var(--dark)]">{vendor.businessName}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-[var(--primary-subtle)] px-3 py-1 text-[var(--primary-dark)]">
            {categoryLabel}
          </span>
          <span className="flex items-center gap-1 text-[var(--gray-text)]">
            <MapPin className="h-4 w-4" />
            {vendor.city}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1">
          <Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />
          <span className="font-mono-ui text-sm text-[var(--dark)]">{vendor.avgRating.toFixed(1)}</span>
          <span className="text-xs text-[var(--gray-text)]">({vendor.totalReviews} reviews)</span>
        </div>

        <p className="mt-4 text-sm leading-7 text-[var(--gray-text)]">
          {vendor.description || vendor.tagline || "Premium event vendor profile."}
        </p>

        <div className="mt-4 font-mono-ui text-xl font-medium text-[var(--gold-dark)]">
          PKR {vendor.startingPrice.toLocaleString()}
          <span className="ml-2 font-body text-sm font-normal text-[var(--gray-text)]">
            se shuru
          </span>
        </div>

        <div className="mt-5 flex gap-3">
          <Button variant="outline" className="flex-1" asChild>
            <Link href={`/vendor/${vendor.slug}`}>View Profile</Link>
          </Button>
          <Button variant="gold" className="flex-1" asChild>
            <Link href={`/bookings/request?vendor=${vendor.slug}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
