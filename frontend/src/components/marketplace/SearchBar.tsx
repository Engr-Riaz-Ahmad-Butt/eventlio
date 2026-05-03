"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  cities: string[];
  categories: string[];
};

export function SearchBar({
  search,
  setSearch,
  city,
  setCity,
  category,
  setCategory,
  cities,
  categories,
}: SearchBarProps) {
  return (
    <div className="rounded-[28px] border border-[color:rgba(27,77,62,0.08)] bg-white p-4 shadow-[var(--shadow-md)]">
      <div className="grid gap-3 xl:grid-cols-[1fr_1fr_2fr_auto]">
        <select
          value={city}
          onChange={(event) => setCity(event.target.value)}
          className="h-14 rounded-[20px] border border-[color:rgba(27,77,62,0.1)] bg-[var(--warm-white)] px-4 text-sm text-[var(--dark)]"
        >
          {cities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="h-14 rounded-[20px] border border-[color:rgba(27,77,62,0.1)] bg-[var(--warm-white)] px-4 text-sm text-[var(--dark)]"
        >
          <option value="All Categories">All Categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="flex h-14 items-center gap-3 rounded-[20px] border border-[color:rgba(27,77,62,0.1)] bg-[var(--warm-white)] px-4">
          <Search className="h-4 w-4 text-[var(--gray-text)]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Dhundho..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--gray-text)]"
          />
        </div>
        <button className="h-14 rounded-full bg-[var(--gold)] px-7 text-sm font-semibold text-[var(--dark)] transition hover:bg-[var(--gold-light)]">
          Search
        </button>
      </div>
    </div>
  );
}
