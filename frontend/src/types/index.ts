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
  createdAt: string;
  updatedAt: string;
  vendor?: VendorProfile;
  client?: ClientProfile;
  package?: VendorPackage;
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
