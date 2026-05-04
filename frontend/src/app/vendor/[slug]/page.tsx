import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketplaceProfileClient } from "@/components/marketplace/MarketplaceProfileClient";
import {
  getMarketplaceVendor,
  getRelatedMarketplaceVendors,
} from "@/lib/marketplace";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vendor = await getMarketplaceVendor(slug);

  if (!vendor) {
    return {
      title: "Vendor Not Found | Eventlio",
    };
  }

  return {
    title: `${vendor.businessName} | Eventlio`,
    description:
      vendor.description ||
      vendor.tagline ||
      `Browse packages and reviews for ${vendor.businessName} on Eventlio.`,
  };
}

export default async function VendorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [vendor, related] = await Promise.all([
    getMarketplaceVendor(slug),
    getRelatedMarketplaceVendors(slug),
  ]);

  if (!vendor) {
    notFound();
  }

  return <MarketplaceProfileClient vendor={vendor} related={related} />;
}
