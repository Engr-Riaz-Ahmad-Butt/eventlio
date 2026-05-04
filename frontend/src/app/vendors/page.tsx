"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/marketplace/SearchBar";
import { CategoryChips } from "@/components/marketplace/CategoryChips";
import { FilterSidebar } from "@/components/marketplace/FilterSidebar";
import { VendorCardSkeleton } from "@/components/marketplace/VendorCardSkeleton";
import { VendorGrid } from "@/components/marketplace/VendorGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getMarketplaceCategories,
  getMarketplaceCities,
  searchMarketplaceVendors,
} from "@/lib/marketplace";
import type {
  MarketplaceCategory,
  MarketplaceCity,
  MarketplaceSort,
  MarketplaceVendorQuery,
  MarketplaceVendorResults,
} from "@/types";

const DEFAULT_QUERY: MarketplaceVendorQuery = {
  page: 1,
  limit: 9,
  sort: "rating",
};

function VendorsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<MarketplaceCategory[]>([]);
  const [cities, setCities] = useState<MarketplaceCity[]>([]);
  const [results, setResults] = useState<MarketplaceVendorResults>({
    data: [],
    total: 0,
    page: 1,
    limit: 9,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [draftSearch, setDraftSearch] = useState("");
  const [draftCity, setDraftCity] = useState("All Cities");
  const [draftCategory, setDraftCategory] = useState("All Categories");

  const query = useMemo<MarketplaceVendorQuery>(() => {
    const page = Number(searchParams.get("page") ?? DEFAULT_QUERY.page);
    const limit = Number(searchParams.get("limit") ?? DEFAULT_QUERY.limit);

    return {
      category: searchParams.get("category") ?? undefined,
      city: searchParams.get("city") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      rating: searchParams.get("rating") ? Number(searchParams.get("rating")) : undefined,
      sort: (searchParams.get("sort") as MarketplaceSort | null) ?? DEFAULT_QUERY.sort,
      page: Number.isNaN(page) ? 1 : page,
      limit: Number.isNaN(limit) ? 9 : limit,
    };
  }, [searchParams]);

  useEffect(() => {
    Promise.all([getMarketplaceCategories(), getMarketplaceCities()]).then(
      ([categoryData, cityData]) => {
        setCategories(categoryData);
        setCities(cityData);
      },
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    searchMarketplaceVendors(query)
      .then(setResults)
      .finally(() => setLoading(false));
  }, [query]);

  const activeCategoryLabel = useMemo(() => {
    if (!query.category) return "All Categories";
    return categories.find((item) => item.slug === query.category)?.label ?? query.category;
  }, [categories, query.category]);

  useEffect(() => {
    setDraftSearch(query.search ?? "");
    setDraftCity(query.city ?? "All Cities");
    setDraftCategory(activeCategoryLabel);
  }, [activeCategoryLabel, query.city, query.search]);

  const syncQuery = (next: MarketplaceVendorQuery) => {
    const params = new URLSearchParams();
    Object.entries(next).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const categoryOptions = ["All Categories", ...categories.map((item) => item.label)];
  const cityOptions = ["All Cities", ...cities.map((item) => item.city)];

  return (
    <main className="market-shell min-h-screen pb-20 pt-28">
      <div className="section-shell">
        <div className="max-w-3xl">
          <Badge>Marketplace</Badge>
          <h1 className="display-h1 mt-6 text-[var(--dark)]">
            Browse, filter, compare, and move directly into booking.
          </h1>
          <p className="mt-4 text-lg leading-8 text-[var(--gray-text)]">
            This is the full Module 03 client flow: search vendors, narrow by city or category, open a public profile, then continue into the booking request handoff.
          </p>
        </div>

        <div className="mt-10">
          <SearchBar
            search={draftSearch}
            setSearch={setDraftSearch}
            city={draftCity}
            setCity={setDraftCity}
            category={draftCategory}
            setCategory={setDraftCategory}
            cities={cityOptions}
            categories={categoryOptions}
            onSubmit={() => {
              const match = categories.find((item) => item.label === draftCategory);
              syncQuery({
                ...query,
                search: draftSearch || undefined,
                city: draftCity === "All Cities" ? undefined : draftCity,
                category:
                  draftCategory === "All Categories"
                    ? undefined
                    : match?.slug ?? draftCategory,
                page: 1,
              });
            }}
          />
        </div>

        <div className="mt-6">
          <CategoryChips
            categories={categoryOptions}
            activeCategory={activeCategoryLabel}
            onChange={(value) => {
              const match = categories.find((item) => item.label === value);
              syncQuery({
                ...query,
                category: value === "All Categories" ? undefined : match?.slug ?? value,
                page: 1,
              });
            }}
          />
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_280px]">
          <div className="space-y-6">
            <Card>
              <CardContent className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[var(--dark)]">
                    {results.total} vendors found
                  </p>
                  <p className="mt-1 text-sm text-[var(--gray-text)]">
                    Sort and compare before moving into the booking request step.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm text-[var(--gray-text)]" htmlFor="sort">
                    Sort
                  </label>
                  <select
                    id="sort"
                    value={query.sort ?? "rating"}
                    onChange={(event) =>
                      syncQuery({
                        ...query,
                        sort: event.target.value as MarketplaceSort,
                        page: 1,
                      })
                    }
                    className="h-11 rounded-[16px] border border-[color:rgba(27,77,62,0.1)] bg-[var(--warm-white)] px-4 text-sm text-[var(--dark)]"
                  >
                    <option value="rating">Highest Rating</option>
                    <option value="price_asc">Lowest Price</option>
                    <option value="price_desc">Highest Price</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <VendorCardSkeleton key={index} />
                ))}
              </div>
            ) : results.data.length > 0 ? (
              <VendorGrid vendors={results.data} />
            ) : (
              <Card>
                <CardContent className="px-6 py-10 text-center text-[var(--gray-text)]">
                  No vendors matched these filters. Try removing a city, category, or price constraint.
                </CardContent>
              </Card>
            )}

            {results.totalPages > 1 ? (
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  variant="outline"
                  disabled={(query.page ?? 1) <= 1}
                  onClick={() => syncQuery({ ...query, page: Math.max(1, (query.page ?? 1) - 1) })}
                >
                  Prev
                </Button>
                {Array.from({ length: results.totalPages }).map((_, index) => {
                  const page = index + 1;
                  return (
                    <Button
                      key={page}
                      variant={(query.page ?? 1) === page ? "gold" : "outline"}
                      onClick={() => syncQuery({ ...query, page })}
                    >
                      {page}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  disabled={(query.page ?? 1) >= results.totalPages}
                  onClick={() =>
                    syncQuery({
                      ...query,
                      page: Math.min(results.totalPages, (query.page ?? 1) + 1),
                    })
                  }
                >
                  Next
                </Button>
              </div>
            ) : null}
          </div>

          <FilterSidebar
            categories={categories}
            cities={cities}
            values={query}
            onChange={syncQuery}
          />
        </div>
      </div>
    </main>
  );
}

export default function VendorsPage() {
  return (
    <Suspense
      fallback={
        <main className="market-shell min-h-screen px-6 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="surface-card rounded-[28px] px-6 py-16 text-center text-[var(--gray-text)]">
              Loading vendors...
            </div>
          </div>
        </main>
      }
    >
      <VendorsPageContent />
    </Suspense>
  );
}
