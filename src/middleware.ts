import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/rangpur-division')) {
    // Handle the request here
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/rangpur-division/:path*',
} 