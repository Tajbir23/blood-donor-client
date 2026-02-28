'use server'

import getRefreshToken from "@/app/actions/getRefreshToken"
import { cookies } from "next/headers"

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

const MAX_RETRIES = 2
const TIMEOUT_MS = 15000 // 15s — Vercel serverless limit safe

const baseUrl = async(path: string, options: FetchOptions = {}, _retryCount = 0): Promise<Response> => {
    const cookieStore = await cookies()

    // AbortController for timeout — connection hang হলে নিজে cancel করবে
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

    try {
        // Merge headers: keep user-provided headers + add server secret for VPN bypass
        const mergedHeaders = new Headers(options.headers || {});
        if (process.env.SERVER_SECRET_KEY) {
            mergedHeaders.set('X-Server-Key', process.env.SERVER_SECRET_KEY);
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
            cache: options.cache || 'no-store',
            ...options,
            headers: mergedHeaders,
            credentials: 'include',
            signal: options.signal || controller.signal,
            next: options.next
        })

        clearTimeout(timeoutId)

        // Extract token from set-cookie header
        // Format: "token=eyJhbG...abc==; Path=/; HttpOnly; Secure; SameSite=Lax"
        // Must handle JWT tokens that contain '=' (base64 padding)
        const setCookieHeader = res.headers.get("set-cookie")
        const tokenMatch = setCookieHeader?.match(/^token=([^;]+)/)
        const token = tokenMatch?.[1]

        if(token){
            cookieStore.set('token', token, {
                httpOnly: true,
                secure: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 30,
                sameSite: 'lax'
            })
        }
        

        if(res.status === 401){
            await getRefreshToken()
        }

        return res
    } catch (error: any) {
        clearTimeout(timeoutId)

        // Retry on network/timeout errors (not on 4xx/5xx — those already returned a Response)
        const isRetryable = error?.name === 'AbortError'
            || error?.message?.includes('fetch failed')
            || error?.message?.includes('ECONNRESET')
            || error?.message?.includes('ETIMEDOUT')
            || error?.message?.includes('Connection closed')

        if (isRetryable && _retryCount < MAX_RETRIES) {
            // Exponential backoff: 500ms, 1000ms
            await new Promise(r => setTimeout(r, 500 * (_retryCount + 1)))
            return baseUrl(path, options, _retryCount + 1)
        }

        throw error
    }
}

export default baseUrl