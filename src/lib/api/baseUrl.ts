'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    headers?: HeadersInit
    body?: BodyInit | null
    cache?: RequestCache
    credentials?: RequestCredentials
    mode?: RequestMode
    redirect?: RequestRedirect
    referrer?: string
    referrerPolicy?: ReferrerPolicy
    integrity?: string
    keepalive?: boolean
    signal?: AbortSignal | null
    next?: {
      revalidate?: number
      tags?: string[]
    }
  }

const baseUrl = async(path: string, options: FetchOptions = {}) => {
    const cookieStore = await cookies()
    try {
       
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
            cache: options.cache || 'no-store',
            ...options,
            credentials: 'include',
            next: options.next
        })


        const token = res.headers.get("set-cookie")?.split(";")[0]?.split("=")[1]

        if(token){
            cookieStore.set('token', token, {
                httpOnly: true,
                secure: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 30,
                sameSite: 'strict'
            })
        }
        

        if(res.status === 401){
            cookieStore.delete('token')
            redirect('/login')
        }

        return res
    } catch (error) {
        throw error
    }
}

export default baseUrl