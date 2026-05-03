"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Search, Star } from "lucide-react";
import { mockVendors } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const previewVendors = mockVendors.slice(0, 3);

export function MarketplacePreview() {
  return (
    <section className="section-pad market-shell">
      <div className="section-shell">
        <div className="max-w-3xl">
          <Badge>THE MARKETPLACE</Badge>
          <h2 className="display-h1 mt-6 text-[var(--dark)]">
            Apne Shahar Ka Best Vendor Dhundho
          </h2>
        </div>

        <div className="mt-10 rounded-[30px] border border-[color:rgba(27,77,62,0.08)] bg-white p-4 shadow-[var(--shadow-md)]">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex h-15 items-center rounded-[22px] border border-[color:rgba(27,77,62,0.1)] px-5 text-[var(--gray-text)]">
              Rawalpindi ▾
            </div>
            <div className="hidden w-px bg-[var(--gray-border)] lg:block" />
            <div className="flex h-15 flex-1 items-center gap-3 rounded-[22px] border border-[color:rgba(27,77,62,0.1)] px-5">
              <Search className="h-5 w-5 text-[var(--gray-text)]" />
              <span className="text-[var(--gray-text)]">Photographer dhundho...</span>
            </div>
            <Button variant="gold" size="xl">
              Dhundho
            </Button>
          </div>
        </div>

        <div className="scrollbar-gold mt-6 flex gap-3 overflow-x-auto pb-2">
          {["Photographer", "Bridal Makeup", "Salon", "Decor", "Catering", "DJ", "Mehndi", "Venue"].map((chip) => (
            <button
              key={chip}
              className="rounded-full border border-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {previewVendors.map((vendor) => (
            <article
              key={vendor.id}
              className="overflow-hidden rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
            >
              <div className={`relative h-44 bg-gradient-to-br ${vendor.gradient}`}>
                <div className="absolute left-4 top-4">
                  <Badge variant="gold">{vendor.badge}</Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-[84px] text-white/15">
                  ✦
                </div>
              </div>
              <div className="px-5 pb-5 pt-6">
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
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />
                  <span className="font-mono-ui">{vendor.rating}</span>
                  <span className="text-[var(--gray-text)]">({vendor.reviews} reviews)</span>
                </div>
                <div className="mt-4 font-mono-ui text-xl font-medium text-[var(--gold-dark)]">
                  PKR {vendor.startingPrice.toLocaleString()}
                  <span className="ml-2 font-body text-sm font-normal text-[var(--gray-text)]">
                    se shuru
                  </span>
                </div>
                <div className="mt-5 flex gap-3">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/vendors/${vendor.slug}`}>View Profile</Link>
                  </Button>
                  <Button variant="gold" className="flex-1">
                    Book Now →
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="gold" asChild>
            <Link href="/vendors">
              View All Vendors
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
