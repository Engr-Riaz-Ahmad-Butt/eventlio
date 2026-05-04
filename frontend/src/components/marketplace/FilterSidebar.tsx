"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { MarketplaceCategory, MarketplaceCity, MarketplaceVendorQuery } from "@/types";

type FilterSidebarProps = {
  categories: MarketplaceCategory[];
  cities: MarketplaceCity[];
  values: MarketplaceVendorQuery;
  onChange: (next: MarketplaceVendorQuery) => void;
};

function FilterForm({ categories, cities, values, onChange }: FilterSidebarProps) {
  const update = (patch: Partial<MarketplaceVendorQuery>) =>
    onChange({ ...values, ...patch, page: 1 });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--gray-text)]">
          Category
        </p>
        <div className="mt-3 space-y-2">
          <label className="flex items-center justify-between text-sm text-[var(--gray-text)]">
            <span>All Categories</span>
            <input
              type="radio"
              checked={!values.category}
              onChange={() => update({ category: undefined })}
            />
          </label>
          {categories.map((category) => (
            <label
              key={category.slug}
              className="flex items-center justify-between text-sm text-[var(--gray-text)]"
            >
              <span>
                {category.label} ({category.count})
              </span>
              <input
                type="radio"
                checked={values.category === category.slug}
                onChange={() => update({ category: category.slug })}
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--gray-text)]">
          City
        </p>
        <div className="mt-3 space-y-2">
          <label className="flex items-center justify-between text-sm text-[var(--gray-text)]">
            <span>All Cities</span>
            <input
              type="radio"
              checked={!values.city}
              onChange={() => update({ city: undefined })}
            />
          </label>
          {cities.map((city) => (
            <label
              key={city.city}
              className="flex items-center justify-between text-sm text-[var(--gray-text)]"
            >
              <span>
                {city.city} ({city.count})
              </span>
              <input
                type="radio"
                checked={values.city === city.city}
                onChange={() => update({ city: city.city })}
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--gray-text)]">
          Price Range
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min"
            value={values.minPrice ?? ""}
            onChange={(event) =>
              update({
                minPrice: event.target.value ? Number(event.target.value) : undefined,
              })
            }
            className="h-11 rounded-[16px] border border-[color:rgba(27,77,62,0.1)] bg-[var(--warm-white)] px-3 text-sm text-[var(--dark)]"
          />
          <input
            type="number"
            placeholder="Max"
            value={values.maxPrice ?? ""}
            onChange={(event) =>
              update({
                maxPrice: event.target.value ? Number(event.target.value) : undefined,
              })
            }
            className="h-11 rounded-[16px] border border-[color:rgba(27,77,62,0.1)] bg-[var(--warm-white)] px-3 text-sm text-[var(--dark)]"
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--gray-text)]">
          Rating
        </p>
        <div className="mt-3 space-y-2">
          {[5, 4, 3].map((rating) => (
            <label
              key={rating}
              className="flex items-center justify-between text-sm text-[var(--gray-text)]"
            >
              <span>{rating}+ stars</span>
              <input
                type="radio"
                checked={values.rating === rating}
                onChange={() => update({ rating })}
              />
            </label>
          ))}
          <label className="flex items-center justify-between text-sm text-[var(--gray-text)]">
            <span>Any rating</span>
            <input
              type="radio"
              checked={!values.rating}
              onChange={() => update({ rating: undefined })}
            />
          </label>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() =>
          onChange({
            sort: values.sort,
            search: values.search,
            limit: values.limit,
            page: 1,
          })
        }
      >
        Clear Filters
      </Button>
    </div>
  );
}

export function FilterSidebar(props: FilterSidebarProps) {
  return (
    <>
      <aside className="hidden h-fit rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-6 shadow-[var(--shadow-sm)] xl:block">
        <h2 className="font-heading text-2xl text-[var(--dark)]">Filters</h2>
        <div className="mt-6">
          <FilterForm {...props} />
        </div>
      </aside>

      <div className="xl:hidden">
        <Sheet>
          <SheetTrigger render={<Button variant="outline" className="w-full justify-center" />}>
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-md bg-white">
            <SheetHeader>
              <SheetTitle>Marketplace Filters</SheetTitle>
              <SheetDescription>
                Category, city, price, aur rating ke through vendors shortlist karein.
              </SheetDescription>
            </SheetHeader>
            <div className="px-4 pb-6">
              <FilterForm {...props} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
