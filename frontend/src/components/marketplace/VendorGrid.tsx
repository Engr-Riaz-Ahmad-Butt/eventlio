import type { MarketplaceVendor } from "@/data/mock";
import { VendorCard } from "@/components/marketplace/VendorCard";

type VendorGridProps = {
  vendors: MarketplaceVendor[];
};

export function VendorGrid({ vendors }: VendorGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  );
}
