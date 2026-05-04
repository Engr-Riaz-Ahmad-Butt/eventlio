"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock3, MapPin, ShieldCheck, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VendorCard } from "@/components/marketplace/VendorCard";
import { incrementVendorProfileView } from "@/lib/marketplace";
import type { MarketplaceVendorDetail, MarketplaceVendorListItem } from "@/types";

type MarketplaceProfileClientProps = {
  vendor: MarketplaceVendorDetail;
  related: MarketplaceVendorListItem[];
};

export function MarketplaceProfileClient({
  vendor,
  related,
}: MarketplaceProfileClientProps) {
  const [selectedImage, setSelectedImage] = useState(vendor.gallery[0]?.url ?? null);

  useEffect(() => {
    void incrementVendorProfileView(vendor.slug);
  }, [vendor.slug]);

  return (
    <main className="market-shell min-h-screen pb-24">
      <section
        className="relative h-[340px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(10,31,23,0.18), rgba(10,31,23,0.78)), url(${vendor.coverImage ?? vendor.gallery[0]?.url ?? ""})`,
        }}
      >
        <div className="section-shell relative flex h-full items-end pb-12 text-white">
          <div className="max-w-4xl">
            <Badge variant="gold">{vendor.isFeatured ? "Featured Vendor" : "Verified Vendor"}</Badge>
            <h1 className="display-h1 mt-5 text-white">{vendor.businessName}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/80">
              {vendor.category ? (
                <span className="rounded-full border border-white/15 px-3 py-1">
                  {vendor.category.name}
                </span>
              ) : null}
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {vendor.city}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />
                {vendor.avgRating.toFixed(1)} ({vendor.totalReviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="section-shell -mt-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <section className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-md)] sm:p-8">
              <div className="grid gap-4 sm:grid-cols-4">
                <InfoStat label="Rating" value={vendor.avgRating.toFixed(1)} mono />
                <InfoStat label="Reviews" value={String(vendor.totalReviews)} mono />
                <InfoStat label="Response" value="Fast replies" />
                <InfoStat label="Profile Views" value={`${vendor.profileViews}+`} mono />
              </div>
            </section>

            <section className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-sm)] sm:p-8">
              <h2 className="font-heading text-3xl text-[var(--dark)]">Packages</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {vendor.packages.map((pkg) => (
                  <article
                    key={pkg.id}
                    className="rounded-[24px] border border-[color:rgba(27,77,62,0.08)] bg-[var(--warm-white)] p-5"
                  >
                    <p className="text-sm uppercase tracking-[0.22em] text-[var(--gold-dark)]">
                      {pkg.title}
                    </p>
                    <p className="mt-3 font-mono-ui text-2xl text-[var(--dark)]">
                      PKR {pkg.price.toLocaleString()}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--gray-text)]">
                      {pkg.description || "Tailored package details available after booking request."}
                    </p>
                    <Button variant="gold" className="mt-5 w-full" asChild>
                      <Link href={`/bookings/request?vendor=${vendor.slug}&package=${pkg.id}`}>
                        Select Package
                      </Link>
                    </Button>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-sm)] sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-heading text-3xl text-[var(--dark)]">Gallery</h2>
                <p className="text-sm text-[var(--gray-text)]">Click any image to preview</p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {vendor.gallery.map((image) => (
                  <Dialog key={image.id}>
                    <DialogTrigger
                      render={
                        <button className="overflow-hidden rounded-[22px] text-left transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]" />
                      }
                      onClick={() => setSelectedImage(image.url)}
                    >
                      <img
                        src={image.url}
                        alt={image.caption || vendor.businessName}
                        className="h-64 w-full object-cover"
                      />
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl bg-white p-2">
                      <DialogHeader className="px-4 pt-4">
                        <DialogTitle>{vendor.businessName} Gallery</DialogTitle>
                      </DialogHeader>
                      <img
                        src={selectedImage ?? image.url}
                        alt={image.caption || vendor.businessName}
                        className="max-h-[80vh] w-full rounded-[18px] object-cover"
                      />
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-sm)] sm:p-8">
              <h2 className="font-heading text-3xl text-[var(--dark)]">About</h2>
              <p className="mt-5 leading-8 text-[var(--gray-text)]">
                {vendor.description || vendor.tagline || "Public business profile details will appear here."}
              </p>
            </section>

            <section className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-sm)] sm:p-8">
              <h2 className="font-heading text-3xl text-[var(--dark)]">Reviews</h2>
              <div className="mt-6 space-y-4">
                {vendor.reviews.length > 0 ? (
                  vendor.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-[22px] border border-[color:rgba(27,77,62,0.08)] bg-[var(--warm-white)] p-5"
                    >
                      <div className="font-mono-ui text-[var(--gold-dark)]">
                        {"★".repeat(review.rating)}
                      </div>
                      <p className="mt-3 leading-7 text-[var(--gray-text)]">
                        {review.comment || "Verified client review."}
                      </p>
                      <p className="mt-3 text-sm font-medium text-[var(--dark)]">
                        {review.client?.name || "Verified Client"}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[22px] bg-[var(--warm-white)] p-5 text-sm text-[var(--gray-text)]">
                    Reviews will appear here as soon as clients complete bookings and share feedback.
                  </div>
                )}
              </div>
            </section>

            {related.length > 0 ? (
              <section className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-sm)] sm:p-8">
                <h2 className="font-heading text-3xl text-[var(--dark)]">Related Vendors</h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {related.map((item) => (
                    <VendorCard key={item.id} vendor={item} compact />
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside
            id="booking-cta"
            className="h-fit rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-md)] lg:sticky lg:top-24"
          >
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--gray-text)]">Starting from</p>
            <p className="mt-3 font-mono-ui text-3xl text-[var(--gold-dark)]">
              PKR {vendor.startingPrice.toLocaleString()}
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--gray-text)]">
              {vendor.tagline || "Shortlist this vendor and continue into the booking request flow."}
            </p>

            <div className="mt-6 space-y-3 text-sm text-[var(--gray-text)]">
              <p className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-[var(--primary)]" />
                Response time unlocked after request starts
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--primary)]" />
                WhatsApp number stays hidden until booking is confirmed
              </p>
            </div>

            <Button variant="gold" size="xl" className="mt-8 w-full" asChild>
              <Link href={`/bookings/request?vendor=${vendor.slug}`}>
                Book Now - Start Request
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="mt-3 w-full" asChild>
              <Link href="/vendors">Back to Vendors</Link>
            </Button>
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[color:rgba(27,77,62,0.08)] bg-white/95 p-4 shadow-[var(--shadow-lg)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--gray-text)]">Starts at</p>
            <p className="truncate font-mono-ui text-lg text-[var(--gold-dark)]">
              PKR {vendor.startingPrice.toLocaleString()}
            </p>
          </div>
          <Button variant="gold" size="lg" className="min-w-[180px]" asChild>
            <Link href={`/bookings/request?vendor=${vendor.slug}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

function InfoStat({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-[22px] bg-[var(--warm-white)] p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--gray-text)]">{label}</p>
      <p className={`mt-3 ${mono ? "font-mono-ui text-2xl" : "text-sm font-semibold"} text-[var(--dark)]`}>
        {value}
      </p>
    </div>
  );
}
