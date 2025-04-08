'use server'

import baseUrl from "@/lib/api/baseUrl"
import { cookies } from "next/headers"

export const getPendingMembers = async (organizationId: string, page: number, limit: number, search: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    try {
        const response = await baseUrl(`/org_admin/pending_members/${organizationId}?page=${page}&limit=${limit}&search=${search}`, {
            headers: {
                'Authorization': `Bearer ${token?.value}`
            }
        })
        return response.json()
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Failed to get pending members"
        }
    }
}

export const manageOrgMembers = async (organizationId: string, orgJoinRequest: string, status: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    console.log(organizationId, orgJoinRequest, status, 'accepted')
    try {
        const response = await baseUrl(`/org_admin/manage_members/${organizationId}`, {
            headers: {
                'Authorization': `Bearer ${token?.value}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                orgJoinRequest,
                status
            })
        })
        return response.json()
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Failed to manage organization members"
        }
    }
}
