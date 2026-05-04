// ── Roles ────────────────────────────────────────────────────────
export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'VENDOR_OWNER' | 'VENDOR_STAFF' | 'CLIENT';

// ── User ─────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  avatar?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  onboardingStep?: string | null;
  onboardingCompletedAt?: string | null;
  lastLoginAt?: string | null;
  createdAt: string;
  updatedAt: string;
  vendorProfile?: VendorProfile;
  clientProfile?: ClientProfile;
}

// ── Vendor ───────────────────────────────────────────────────────
export interface VendorProfile {
  id: string;
  userId: string;
  businessName: string;
  slug: string;
  description?: string;
  tagline?: string;
  city: string;
  address?: string;
  phone?: string;
  whatsappNumber?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  websiteUrl?: string;
  coverImage?: string;
  logo?: string;
  isVerified: boolean;
  isFeatured: boolean;
  isPublic?: boolean;
  status: 'PENDING' | 'APPROVED' | 'SUSPENDED' | 'REJECTED';
  profileCompletion?: number;
  avgRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  categories?: VendorCategory[];
  packages?: VendorPackage[];
  gallery?: VendorGallery[];
  serviceAreas?: ServiceArea[];
}

export interface ClientProfile {
  id: string;
  userId: string;
  city?: string;
  address?: string;
  phone?: string;
}

// ── Category ─────────────────────────────────────────────────────
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  isActive: boolean;
}

export interface VendorCategory {
  id: string;
  vendorId: string;
  categoryId: string;
  category?: Category;
}

// ── Packages & Gallery ───────────────────────────────────────────
export interface VendorPackage {
  id: string;
  vendorId: string;
  title: string;
  description?: string;
  price: number;
  discountPrice?: number;
  duration?: string;
  includedServices: string[];
  isActive: boolean;
}

export interface VendorGallery {
  id: string;
  vendorId: string;
  url: string;
  type: 'image' | 'video';
  caption?: string;
}

export interface ServiceArea {
  id: string;
  vendorId: string;
  city: string;
  area?: string;
}

// ── Booking ──────────────────────────────────────────────────────
export type BookingStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Booking {
  id: string;
  clientId: string;
  vendorId: string;
  packageId?: string;
  eventType?: string;
  eventDate: string;
  eventTime?: string;
  eventCity: string;
  eventLocation?: string;
  guestCount?: number;
  notes?: string;
  status: BookingStatus;
  totalAmount: number;
  advanceAmount: number;
  balanceAmount: number;
  rejectionReason?: string | null;
  cancelledBy?: string | null;
  cancelReason?: string | null;
  createdAt: string;
  updatedAt: string;
  vendor?: Pick<VendorProfile, "id" | "slug" | "businessName" | "city" | "coverImage"> & {
    category?: { name: string; slug: string } | null;
  };
  client?: { id: string; name: string; email: string };
  package?: VendorPackage | null;
  statusHistory?: BookingStatusHistory[];
}

export interface BookingStatusHistory {
  id: string;
  bookingId: string;
  fromStatus?: BookingStatus | null;
  toStatus: BookingStatus;
  changedBy: string;
  note?: string | null;
  createdAt: string;
}

// ── Payment ──────────────────────────────────────────────────────
export type PaymentStatus = 'PENDING' | 'PARTIAL' | 'PAID' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'CASH' | 'BANK_TRANSFER' | 'JAZZCASH' | 'EASYPAISA' | 'STRIPE' | 'OTHER';

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  note?: string;
  paidAt?: string;
  createdAt: string;
}

// ── Review ───────────────────────────────────────────────────────
export interface Review {
  id: string;
  clientId: string;
  vendorId: string;
  bookingId: string;
  rating: number;
  comment?: string;
  reply?: string;
  isApproved: boolean;
  createdAt: string;
  client?: ClientProfile & { user?: User };
}

// ── API Response ─────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type MarketplaceSort = "rating" | "price_asc" | "price_desc" | "newest";

export interface MarketplaceCategory {
  id: string;
  slug: string;
  label: string;
  icon?: string | null;
  count: number;
}

export interface MarketplaceCity {
  city: string;
  count: number;
}

export interface MarketplaceVendorListItem {
  id: string;
  slug: string;
  businessName: string;
  city: string;
  tagline?: string | null;
  description?: string | null;
  coverImage?: string | null;
  logo?: string | null;
  isFeatured: boolean;
  isVerified: boolean;
  avgRating: number;
  totalReviews: number;
  profileViews: number;
  createdAt: string;
  startingPrice: number;
  category: { name: string; slug: string } | null;
  categories: Array<{ name: string; slug: string }>;
}

export interface MarketplaceReview {
  id: string;
  rating: number;
  comment?: string | null;
  reply?: string | null;
  createdAt: string;
  client?: {
    name: string;
    avatar?: string | null;
  };
}

export interface MarketplaceVendorDetail extends MarketplaceVendorListItem {
  address?: string | null;
  phone?: string | null;
  whatsappNumber?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  websiteUrl?: string | null;
  serviceAreas: ServiceArea[];
  packages: Array<{
    id: string;
    title: string;
    description?: string | null;
    price: number;
    discountPrice?: number | null;
    duration?: string | null;
    includedServices: string[];
  }>;
  gallery: VendorGallery[];
  reviews: MarketplaceReview[];
}

export interface MarketplaceVendorResults {
  data: MarketplaceVendorListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface MarketplaceVendorQuery {
  category?: string;
  city?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sort?: MarketplaceSort;
  page?: number;
  limit?: number;
}

// ── Auth ─────────────────────────────────────────────────────────
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse extends AuthTokens {
  message: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  userId: string;
  email: string;
}
