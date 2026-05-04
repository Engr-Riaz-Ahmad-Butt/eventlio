"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { SearchBar } from "@/components/marketplace/SearchBar";
import { VendorCard } from "@/components/marketplace/VendorCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getFeaturedVendors,
  getMarketplaceCategories,
  getMarketplaceCities,
} from "@/lib/marketplace";
import type { MarketplaceCategory, MarketplaceCity, MarketplaceVendorListItem } from "@/types";

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All Cities");
  const [category, setCategory] = useState("All Categories");
  const [categories, setCategories] = useState<MarketplaceCategory[]>([]);
  const [cities, setCities] = useState<MarketplaceCity[]>([]);
  const [featured, setFeatured] = useState<MarketplaceVendorListItem[]>([]);

  useEffect(() => {
    Promise.all([
      getMarketplaceCategories(),
      getMarketplaceCities(),
      getFeaturedVendors(),
    ]).then(([categoryData, cityData, featuredData]) => {
      setCategories(categoryData);
      setCities(cityData);
      setFeatured(featuredData);
    });
  }, []);

  const categoryOptions = useMemo(
    () => ["All Categories", ...categories.map((item) => item.label)],
    [categories],
  );
  const cityOptions = useMemo(
    () => ["All Cities", ...cities.map((item) => item.city)],
    [cities],
  );

  const searchHref = useMemo(() => {
    const query = new URLSearchParams();
    if (search.trim()) query.set("search", search.trim());
    if (city !== "All Cities") query.set("city", city);
    if (category !== "All Categories") {
      const match = categories.find((item) => item.label === category);
      query.set("category", match?.slug ?? category);
    }
    const suffix = query.toString();
    return `/vendors${suffix ? `?${suffix}` : ""}`;
  }, [categories, category, city, search]);

  return (
    <main className="market-shell min-h-screen pb-20 pt-28">
      <div className="section-shell space-y-16">
        <section className="rounded-[36px] border border-[color:rgba(27,77,62,0.08)] bg-[linear-gradient(135deg,var(--primary-dark),var(--primary))] px-6 py-10 text-white shadow-[var(--shadow-lg)] sm:px-10 sm:py-14">
          <div className="max-w-3xl">
            <Badge variant="gold">Marketplace</Badge>
            <h1 className="display-h1 mt-6 text-white">
              Find the right Pakistani event vendor with less back-and-forth.
            </h1>
            <p className="mt-4 text-lg leading-8 text-white/76">
              Browse by city, compare pricing, and move from discovery to booking request in one clean flow.
            </p>
          </div>

          <div className="mt-10">
            <SearchBar
              search={search}
              setSearch={setSearch}
              city={city}
              setCity={setCity}
              category={category}
              setCategory={setCategory}
              cities={cityOptions}
              categories={categoryOptions}
              onSubmit={() => (window.location.href = searchHref)}
            />
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-label">Categories</p>
              <h2 className="display-h2 mt-4 text-[var(--dark)]">Browse by service type</h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/vendors">See all vendors</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((item) => (
              <Link
                key={item.slug}
                href={`/vendors?category=${item.slug}`}
                className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--gold-dark)]">Category</p>
                <h3 className="mt-4 font-heading text-2xl text-[var(--dark)]">{item.label}</h3>
                <p className="mt-3 text-sm text-[var(--gray-text)]">{item.count} vendors available</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)]">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-label">Featured Vendors</p>
              <h2 className="display-h2 mt-4 text-[var(--dark)]">Top profiles families shortlist first</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {featured.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {cities.slice(0, 2).map((item) => (
            <div
              key={item.city}
              className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-sm)]"
            >
              <div className="flex items-center gap-3 text-[var(--primary)]">
                <MapPin className="h-5 w-5" />
                <p className="text-sm uppercase tracking-[0.24em]">{item.city}</p>
              </div>
              <h3 className="mt-4 font-heading text-3xl text-[var(--dark)]">
                {item.count}+ vendors ready to book
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--gray-text)]">
                City-first browsing makes it easier for couples and families to compare real options nearby.
              </p>
              <Button variant="gold" className="mt-6" asChild>
                <Link href={`/vendors?city=${encodeURIComponent(item.city)}`}>Browse {item.city}</Link>
              </Button>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
