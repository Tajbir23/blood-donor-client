import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import baseUrl from '@/lib/api/baseUrl'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 })
    }

    const response = await baseUrl('/user/me', {
      cache: 'force-cache',
      headers: {
        'Authorization': `Bearer ${token.value}`
      },
      next: {
        revalidate: 60 * 60 * 24,
        tags: ['user']
      }
    })

    if (!response.ok) {
      return NextResponse.json({ success: false, message: 'Failed to fetch user' }, { status: response.status })
    }

    const newToken = response.headers.get("set-cookie")?.split(";")[0]?.split("=")[1]

        if(newToken){
            cookieStore.set('token', newToken, {
                httpOnly: true,
                secure: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 30,
                sameSite: 'strict'
            })
        }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 