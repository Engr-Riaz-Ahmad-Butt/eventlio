import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const roleRouteMap: Record<string, string[]> = {
  VENDOR_OWNER: ['/vendor-dashboard', '/onboarding/vendor'],
  VENDOR_STAFF: ['/vendor-dashboard'],
  CLIENT: ['/client-dashboard', '/onboarding/client'],
  ADMIN: ['/admin'],
  SUPER_ADMIN: ['/admin'],
};

// Routes only accessible when NOT logged in
const authRoutes = ['/login', '/register', '/verify-otp', '/forgot-password', '/reset-password'];

function decodeJwt(token: string): Record<string, any> | null {
  try {
    const payload = token.split('.')[1];
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(normalized);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

function isTokenValid(token: string): boolean {
  const payload = decodeJwt(token);
  if (!payload?.exp) return false;
  return payload.exp * 1000 > Date.now();
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for JWT in cookies (set by client-side code)
  // For SSR/middleware, we rely on a cookie-based approach
  const token = request.cookies.get('eventlio_access_token')?.value;
  const tokenPayload = token ? decodeJwt(token) : null;
  const hasValidToken = token ? isTokenValid(token) : false;

  // Redirect authenticated users away from auth pages
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (hasValidToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  const isProtected = Object.values(roleRouteMap).flat().some((route) => pathname.startsWith(route));

  if (isProtected && !hasValidToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('eventlio_access_token');
    response.cookies.delete('eventlio_refresh_token');
    return response;
  }

  if (isProtected && tokenPayload?.role) {
    const allowedPrefixes = roleRouteMap[tokenPayload.role] ?? [];
    const isAllowed = allowedPrefixes.some((route) => pathname.startsWith(route));

    if (!isAllowed) {
      switch (tokenPayload.role) {
        case 'CLIENT':
          return NextResponse.redirect(new URL('/client-dashboard', request.url));
        case 'VENDOR_OWNER':
        case 'VENDOR_STAFF':
          return NextResponse.redirect(new URL('/vendor-dashboard', request.url));
        case 'ADMIN':
        case 'SUPER_ADMIN':
          return NextResponse.redirect(new URL('/admin', request.url));
        default:
          return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|api|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
