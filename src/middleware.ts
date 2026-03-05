import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import decodedJwtType from './lib/types/decodedJwtType'

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_TOKEN!)

// Helper: verify token or return null
async function verifyToken(token: string): Promise<decodedJwtType | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as decodedJwtType
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const { pathname } = request.nextUrl

  // ── Auth pages: redirect already-logged-in users away ──────────────────────
  const isAuthPage = pathname === '/login' || pathname === '/register'
  if (isAuthPage) {
    if (token) {
      const decoded = await verifyToken(token)
      if (decoded) {
        // Redirect to home (or dashboard for admins)
        const isAdmin = decoded.role === 'admin' || decoded.role === 'superAdmin' || decoded.role === 'moderator' || decoded.role === 'owner'
        return NextResponse.redirect(new URL(isAdmin ? '/dashboard' : '/', request.url))
      }
    }
    return NextResponse.next()
  }

  // ── Protected pages: require authentication ─────────────────────────────────
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const decodedJwt = await verifyToken(token)
  if (!decodedJwt) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const isAdmin = decodedJwt.role === "admin" || decodedJwt.role === "superAdmin" || decodedJwt.role === "moderator" || decodedJwt.role === "owner";
  const isOrgAdmin = decodedJwt.orgRole?.isAdmin || false;
  const accessOrgId = decodedJwt.orgRole?.data?.map((item) => item.organizationId) || [];

  // Allow any logged-in user to access /my-donations
  if (pathname.startsWith('/my-donations')) {
    return NextResponse.next()
  }

  // Check if the user is an admin and trying to access dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (isAdmin) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (pathname.startsWith('/organization_dashboard')) {
    if (isOrgAdmin) {
      const orgId = pathname.split('/')[2];
      if (accessOrgId.includes(orgId)) {
        return NextResponse.next()
      } else {
        return NextResponse.redirect(new URL('/', request.url))
      }
    } else {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/profile',
    '/profile/:path*',
    '/dashboard',
    '/dashboard/:path*',
    '/organization_dashboard',
    '/organization_dashboard/:path*',
    '/my-donations',
  ],
}