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

export const manageOrgMembers = async (organizationId: string, userId: string, status: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    
    try {
        const response = await baseUrl(`/org_admin/manage_members/${organizationId}`, {
            headers: {
                'Authorization': `Bearer ${token?.value}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                userId,
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

export const addMember = async (organizationId: string, memberId: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    console.log(organizationId, memberId, 'add member')
    try {
        const response = await baseUrl(`/org_admin/add_member/${organizationId}`, {
            headers: {
                'Authorization': `Bearer ${token?.value}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                memberId
            })
        })
        return response.json()
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Failed to add member"
        }
    }
}

export const updateLastDonationDate = async (organizationId: string, userId: string, lastDonationDate: Date, recipient: string, recipientName: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    console.log(organizationId, userId, lastDonationDate, recipient, recipientName, 'update last donation date')
    try {
        const response = await baseUrl(`/org_admin/update_last_donation/${organizationId}`, {
            headers: {
                'Authorization': `Bearer ${token?.value}`,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                userId,
                lastDonationDate,
                recipient,
                recipientName
            })
        })
        return response.json()
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Failed to update last donation date"
        }
    }
}

export const roleChange = async(userId: string, targetRole:string, organizationId: string) => {
    const cookieStore = await cookies()
    const token = await cookieStore.get("token")?.value

    const response = await baseUrl(`/org_admin/manage_role/${organizationId}`,{
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            targetRole
        })
    })
    const data = await response.json()
    return data
}

export const removeMember = async(organizationId: string, userId: string) => {
    const cookieStore = await cookies();
    const token = await cookieStore.get("token")?.value

    const response = await baseUrl(`/org_admin/remove_member/${organizationId}`,{
        method: "POST",
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({userId})
    })

    const data = await response.json()
    return data
}