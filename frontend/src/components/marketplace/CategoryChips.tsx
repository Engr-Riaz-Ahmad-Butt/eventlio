type CategoryChipsProps = {
  categories: string[];
  activeCategory: string;
  onChange: (value: string) => void;
};

export function CategoryChips({
  categories,
  activeCategory,
  onChange,
}: CategoryChipsProps) {
  return (
    <div className="scrollbar-gold flex gap-3 overflow-x-auto pb-2">
      {categories.map((category) => {
        const active = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              active
                ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                : "border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
