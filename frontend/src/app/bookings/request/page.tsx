import { notFound } from "next/navigation";
import { BookingRequestForm } from "@/components/bookings/BookingRequestForm";
import { getMarketplaceVendor } from "@/lib/marketplace";

export default async function BookingRequestPage({
  searchParams,
}: {
  searchParams: Promise<{ vendor?: string; package?: string }>;
}) {
  const params = await searchParams;
  const vendorSlug = params.vendor;

  if (!vendorSlug) {
    notFound();
  }

  const vendor = await getMarketplaceVendor(vendorSlug);

  if (!vendor) {
    notFound();
  }

  return <BookingRequestForm vendor={vendor} preselectedPackageId={params.package} />;
}
