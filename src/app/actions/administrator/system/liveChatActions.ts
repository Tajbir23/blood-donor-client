'use server'

import { cookies } from "next/headers"
import { verifyJwt } from "../../authentication"
import { redirect } from "next/navigation"
import baseUrl from "@/lib/api/baseUrl"
import decodedJwtType from "@/lib/types/decodedJwtType"

/**
 * সব open/closed chat tickets আনে (admin panel এর জন্য)
 */
export const getLiveChatTickets = async ({
    status = "open",
    page = 1,
    limit = 20,
}: {
    status?: string
    page?: number
    limit?: number
}) => {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) return { success: false, error: "Unauthorized" }

    const { role } = (await verifyJwt()) as decodedJwtType
    const isAdmin = role === "admin" || role === "superAdmin" || role === "moderator"
    if (!isAdmin) redirect("/")

    const res = await baseUrl(
        `/system/dashboard/live-chat/tickets?status=${status}&page=${page}&limit=${limit}`,
        {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        }
    )

    return await res.json()
}

/**
 * একটি ticket এর সব messages আনে
 */
export const getLiveChatMessages = async (ticketId: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) return { success: false, error: "Unauthorized" }

    const { role } = (await verifyJwt()) as decodedJwtType
    const isAdmin = role === "admin" || role === "superAdmin" || role === "moderator"
    if (!isAdmin) redirect("/")

    const res = await baseUrl(`/system/dashboard/live-chat/messages/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    })

    return await res.json()
}

/**
 * Ticket close করে
 */
export const closeLiveChatTicket = async (ticketId: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) return { success: false, error: "Unauthorized" }

    const { role } = (await verifyJwt()) as decodedJwtType
    const isAdmin = role === "admin" || role === "superAdmin" || role === "moderator"
    if (!isAdmin) redirect("/")

    const res = await baseUrl(`/system/dashboard/live-chat/close/${ticketId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
    })

    return await res.json()
}
