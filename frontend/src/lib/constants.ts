export const APP_NAME = 'Eventlio';
export const APP_TAGLINE = 'The Operating System for Event Businesses';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const TOKEN_KEY = 'eventlio_access_token';
export const REFRESH_TOKEN_KEY = 'eventlio_refresh_token';

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  VENDOR_OWNER: 'VENDOR_OWNER',
  VENDOR_STAFF: 'VENDOR_STAFF',
  CLIENT: 'CLIENT',
} as const;

export const BOOKING_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export const BOOKING_STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  ACCEPTED: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  REJECTED: 'bg-red-500/20 text-red-400 border-red-500/30',
  CONFIRMED: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  COMPLETED: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  CANCELLED: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export const PAYMENT_STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-amber-500/20 text-amber-400',
  PARTIAL: 'bg-blue-500/20 text-blue-400',
  PAID: 'bg-emerald-500/20 text-emerald-400',
  FAILED: 'bg-red-500/20 text-red-400',
  REFUNDED: 'bg-gray-500/20 text-gray-400',
};

export const VENDOR_STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-amber-500/20 text-amber-400',
  APPROVED: 'bg-emerald-500/20 text-emerald-400',
  SUSPENDED: 'bg-red-500/20 text-red-400',
  REJECTED: 'bg-gray-500/20 text-gray-400',
};
