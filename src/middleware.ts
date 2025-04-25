import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import decodedJwtType from './lib/types/decodedJwtType'

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_TOKEN!)
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value

  if(!token){
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const {payload} = await jwtVerify(token, secret)
    const decodedJwt = payload as unknown as decodedJwtType

    const isAdmin = decodedJwt.role === "admin" || decodedJwt.role === "superAdmin" || decodedJwt.role === "moderator" || decodedJwt.role === "owner";
    const isOrgAdmin = decodedJwt.orgRole?.isAdmin || false;
    const accessOrgId = decodedJwt.orgRole?.data?.map((item) => item.organizationId) || [];

    // Check if the user is an admin and trying to access dashboard routes
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      console.log("line 24",isAdmin)
      if (isAdmin) {
        return NextResponse.next()
      } else {
        // Redirect non-admin users trying to access dashboard
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
    
    if(request.nextUrl.pathname.startsWith('/organization_dashboard')){
      console.log("line 34 organization dashboard")
      console.log(decodedJwt)
      if(isOrgAdmin){
        const orgId = request.nextUrl.pathname.split('/')[2];
        if(accessOrgId.includes(orgId)){
          return NextResponse.next()
        }else{
          return NextResponse.redirect(new URL('/', request.url))
        }
      }else{
        return NextResponse.redirect(new URL('/', request.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    // If token verification fails, redirect to login
    console.log("line 55",error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/profile',
    '/profile/:path*',
    '/dashboard',
    '/dashboard/:path*',
    '/organization_dashboard',
    '/organization_dashboard/:path*'
  ],
}