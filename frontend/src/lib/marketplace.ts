import { API_URL } from "@/lib/constants";
import {
  getVendorBySlug,
  marketplaceCategories,
  marketplaceCities,
  mockVendors,
  type MarketplaceVendor,
} from "@/data/mock";
import type {
  ApiResponse,
  MarketplaceCategory,
  MarketplaceCity,
  MarketplaceVendorDetail,
  MarketplaceVendorListItem,
  MarketplaceVendorQuery,
  MarketplaceVendorResults,
} from "@/types";

function toSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function normalizeVendor(vendor: MarketplaceVendor): MarketplaceVendorListItem {
  return {
    id: vendor.id,
    slug: vendor.slug,
    businessName: vendor.name,
    city: vendor.city,
    tagline: vendor.tagline,
    description: vendor.description,
    coverImage: vendor.gallery[0],
    logo: undefined,
    isFeatured: vendor.badge === "Featured" || vendor.badge === "Top Rated",
    isVerified: vendor.badge === "Verified" || vendor.badge === "Top Rated",
    avgRating: vendor.rating,
    totalReviews: vendor.reviews,
    profileViews: vendor.eventsDone * 12,
    createdAt: new Date().toISOString(),
    startingPrice: vendor.startingPrice,
    category: {
      name: vendor.category,
      slug: toSlug(vendor.category),
    },
    categories: [
      {
        name: vendor.category,
        slug: toSlug(vendor.category),
      },
    ],
  };
}

function normalizeVendorDetail(vendor: MarketplaceVendor): MarketplaceVendorDetail {
  return {
    ...normalizeVendor(vendor),
    address: `${vendor.city}, Pakistan`,
    phone: null,
    whatsappNumber: null,
    instagramUrl: undefined,
    facebookUrl: undefined,
    websiteUrl: undefined,
    serviceAreas: [{ id: `${vendor.id}-area`, vendorId: vendor.id, city: vendor.city }],
    packages: vendor.packages.map((pkg, index) => ({
      id: `${vendor.id}-pkg-${index}`,
      title: pkg.name,
      description: pkg.summary,
      price: pkg.price,
      discountPrice: undefined,
      duration: "Flexible",
      includedServices: [],
    })),
    gallery: vendor.gallery.map((url, index) => ({
      id: `${vendor.id}-gallery-${index}`,
      vendorId: vendor.id,
      url,
      type: "image",
      caption: `${vendor.name} gallery image ${index + 1}`,
    })),
    reviews: [
      {
        id: `${vendor.id}-review-1`,
        rating: 5,
        comment: vendor.about,
        reply: undefined,
        createdAt: new Date().toISOString(),
        client: {
          name: "Eventlio Client",
          avatar: null,
        },
      },
    ],
  };
}

function buildMockResults(query: MarketplaceVendorQuery = {}): MarketplaceVendorResults {
  let vendors = mockVendors.map(normalizeVendor);
  const minPrice = query.minPrice;
  const maxPrice = query.maxPrice;
  const rating = query.rating;

  if (query.category) {
    vendors = vendors.filter((vendor) =>
      vendor.categories.some(
        (category) =>
          category.slug === query.category || category.name === query.category,
      ),
    );
  }

  if (query.city) {
    vendors = vendors.filter((vendor) => vendor.city === query.city);
  }

  if (query.search) {
    const needle = query.search.toLowerCase();
    vendors = vendors.filter(
      (vendor) =>
        vendor.businessName.toLowerCase().includes(needle) ||
        vendor.description?.toLowerCase().includes(needle) ||
        vendor.tagline?.toLowerCase().includes(needle),
    );
  }

  if (rating !== undefined) {
    vendors = vendors.filter((vendor) => vendor.avgRating >= rating);
  }

  if (minPrice !== undefined) {
    vendors = vendors.filter((vendor) => vendor.startingPrice >= minPrice);
  }

  if (maxPrice !== undefined) {
    vendors = vendors.filter((vendor) => vendor.startingPrice <= maxPrice);
  }

  switch (query.sort) {
    case "price_asc":
      vendors.sort((a, b) => a.startingPrice - b.startingPrice);
      break;
    case "price_desc":
      vendors.sort((a, b) => b.startingPrice - a.startingPrice);
      break;
    case "newest":
      vendors.reverse();
      break;
    case "rating":
    default:
      vendors.sort((a, b) => b.avgRating - a.avgRating);
      break;
  }

  const page = query.page ?? 1;
  const limit = query.limit ?? 9;
  const total = vendors.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;

  return {
    data: vendors.slice(start, start + limit),
    total,
    page,
    limit,
    totalPages,
  };
}

function getMockCategories(): MarketplaceCategory[] {
  return marketplaceCategories.map((label, index) => ({
    id: `${label}-${index}`,
    slug: toSlug(label),
    label,
    icon: null,
    count: mockVendors.filter((vendor) => vendor.category === label).length,
  }));
}

function getMockCities(): MarketplaceCity[] {
  return marketplaceCities
    .filter((city) => city !== "All Cities")
    .map((city) => ({
      city,
      count: mockVendors.filter((vendor) => vendor.city === city).length,
    }));
}

async function requestApi<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Request failed for ${path}`);
  }
  const payload = (await response.json()) as ApiResponse<T>;
  return payload.data;
}

function toQueryString(params: MarketplaceVendorQuery = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });
  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export async function getMarketplaceCategories() {
  try {
    return await requestApi<MarketplaceCategory[]>("/marketplace/categories");
  } catch {
    return getMockCategories();
  }
}

export async function getMarketplaceCities() {
  try {
    return await requestApi<MarketplaceCity[]>("/marketplace/cities");
  } catch {
    return getMockCities();
  }
}

export async function getFeaturedVendors() {
  try {
    return await requestApi<MarketplaceVendorListItem[]>("/marketplace/featured");
  } catch {
    return buildMockResults({ limit: 6 }).data.slice(0, 6);
  }
}

export async function searchMarketplaceVendors(query: MarketplaceVendorQuery = {}) {
  try {
    return await requestApi<MarketplaceVendorResults>(
      `/marketplace/vendors${toQueryString(query)}`,
    );
  } catch {
    return buildMockResults(query);
  }
}

export async function getMarketplaceVendor(slug: string) {
  try {
    return await requestApi<MarketplaceVendorDetail>(`/marketplace/vendors/${slug}`);
  } catch {
    const vendor = getVendorBySlug(slug);
    return vendor ? normalizeVendorDetail(vendor) : null;
  }
}

export async function getRelatedMarketplaceVendors(slug: string) {
  try {
    return await requestApi<MarketplaceVendorListItem[]>(
      `/marketplace/vendors/${slug}/related`,
    );
  } catch {
    const current = getVendorBySlug(slug);
    if (!current) return [];
    return mockVendors
      .filter(
        (vendor) =>
          vendor.slug !== slug &&
          (vendor.city === current.city || vendor.category === current.category),
      )
      .slice(0, 4)
      .map(normalizeVendor);
  }
}

export async function incrementVendorProfileView(slug: string) {
  try {
    await fetch(`${API_URL}/marketplace/vendors/${slug}/view`, {
      method: "POST",
    });
  } catch {
    // Analytics should not block the profile experience.
  }
}
