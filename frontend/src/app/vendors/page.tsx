"use client";

import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import {
  marketplaceCategories,
  marketplaceCities,
  mockVendors,
  quickFilters,
} from "@/data/mock";
import { SearchBar } from "@/components/marketplace/SearchBar";
import { CategoryChips } from "@/components/marketplace/CategoryChips";
import { VendorGrid } from "@/components/marketplace/VendorGrid";
import { Badge } from "@/components/ui/badge";

export default function VendorsPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All Cities");
  const [category, setCategory] = useState("All Categories");

  const filtered = useMemo(() => {
    return mockVendors.filter((vendor) => {
      const matchSearch =
        search.trim().length === 0 ||
        vendor.name.toLowerCase().includes(search.toLowerCase()) ||
        vendor.description.toLowerCase().includes(search.toLowerCase());
      const matchCity = city === "All Cities" || vendor.city === city;
      const matchCategory =
        category === "All Categories" || vendor.category === category;

      return matchSearch && matchCity && matchCategory;
    });
  }, [category, city, search]);

  return (
    <main className="market-shell min-h-screen pb-20 pt-28">
      <div className="section-shell">
        <div className="max-w-3xl">
          <Badge>Marketplace</Badge>
          <h1 className="display-h1 mt-6 text-[var(--dark)]">
            Apne Event Ke Liye Best Vendor Dhundho
          </h1>
          <p className="mt-4 text-lg leading-8 text-[var(--gray-text)]">
            Search by city, compare categories, and shortlist verified Pakistani event vendors with confidence.
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
            cities={marketplaceCities}
            categories={marketplaceCategories}
          />
        </div>

        <div className="mt-6">
          <CategoryChips
            categories={["All Categories", ...marketplaceCategories]}
            activeCategory={category}
            onChange={setCategory}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {quickFilters.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[color:rgba(27,77,62,0.08)] bg-white px-4 py-2 text-sm text-[var(--gray-text)] shadow-[var(--shadow-sm)]"
            >
              {item}
            </span>
          ))}
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(201,168,76,0.24)] bg-[var(--gold-subtle)] px-4 py-2 text-sm font-medium text-[var(--gold-dark)]">
            <Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />
            Curated for Mehndi, Barat, and Walima
          </span>
        </div>

        <div className="mt-12 grid gap-8 xl:grid-cols-[1fr_280px]">
          <VendorGrid vendors={filtered} />

          <aside className="h-fit rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-sm)]">
            <h2 className="font-heading text-2xl text-[var(--dark)]">Filters</h2>
            <div className="mt-6 space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--gray-text)]">
                  Category
                </p>
                <div className="mt-3 space-y-2 text-sm text-[var(--gray-text)]">
                  {marketplaceCategories.map((item) => (
                    <label key={item} className="flex items-center justify-between">
                      <span>{item}</span>
                      <input
                        type="radio"
                        checked={category === item}
                        onChange={() => setCategory(item)}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--gray-text)]">
                  City
                </p>
                <div className="mt-3 space-y-2 text-sm text-[var(--gray-text)]">
                  {marketplaceCities.map((item) => (
                    <label key={item} className="flex items-center justify-between">
                      <span>{item}</span>
                      <input
                        type="radio"
                        checked={city === item}
                        onChange={() => setCity(item)}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
