'use server'

import baseUrl from "@/lib/api/baseUrl"
import { cookies } from "next/headers"

export const roleChangeUser = async (userId: string, newRole: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    const response = await baseUrl(`/system/dashboard/role-change-user`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, newRole })
    })
    
    return response.json()
}

export const manageUser = async (userId: string, action: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    const response = await baseUrl(`/system/dashboard/manage-user`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, action })
    })
    
    return response.json()
}