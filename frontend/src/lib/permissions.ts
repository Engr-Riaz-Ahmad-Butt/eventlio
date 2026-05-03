import { Role } from '@/types';

type Permission =
  | 'view_vendor_dashboard'
  | 'view_client_dashboard'
  | 'view_admin_dashboard'
  | 'manage_vendors'
  | 'manage_users'
  | 'manage_bookings'
  | 'manage_categories'
  | 'manage_payments'
  | 'manage_reviews'
  | 'create_booking'
  | 'manage_own_profile'
  | 'manage_own_packages'
  | 'manage_own_calendar';

const rolePermissions: Record<Role, Permission[]> = {
  SUPER_ADMIN: [
    'view_admin_dashboard',
    'manage_vendors',
    'manage_users',
    'manage_bookings',
    'manage_categories',
    'manage_payments',
    'manage_reviews',
  ],
  ADMIN: [
    'view_admin_dashboard',
    'manage_vendors',
    'manage_users',
    'manage_bookings',
    'manage_categories',
    'manage_reviews',
  ],
  VENDOR_OWNER: [
    'view_vendor_dashboard',
    'manage_own_profile',
    'manage_own_packages',
    'manage_own_calendar',
    'manage_bookings',
  ],
  VENDOR_STAFF: [
    'view_vendor_dashboard',
    'manage_bookings',
  ],
  CLIENT: [
    'view_client_dashboard',
    'create_booking',
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function hasRole(userRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(userRole);
}

export function getDashboardPath(role: Role): string {
  switch (role) {
    case 'SUPER_ADMIN':
    case 'ADMIN':
      return '/admin';
    case 'VENDOR_OWNER':
    case 'VENDOR_STAFF':
      return '/vendor-dashboard';
    case 'CLIENT':
      return '/client-dashboard';
    default:
      return '/';
  }
}
