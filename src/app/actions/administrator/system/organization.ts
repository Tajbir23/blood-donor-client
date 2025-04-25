"use server"
import baseUrl from "@/lib/api/baseUrl"
import { cookies } from "next/headers"

export const getAllOrganizations = async (search: string, page: number, status: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    try {
        const response = await baseUrl(`/system/organizations/all_organizations?search=${search}&page=${page}&status=${status}`, {
            cache: 'force-cache',
            headers: {
                'Authorization': `Bearer ${token?.value}`
            },
            next: {
                tags: ['organizations'],
                revalidate: 60 * 60 * 24
            }
        })
        return response.json()
    } catch (error) {
        console.log(error)
        return null
    }
}

export const updateOrganizationStatus = async (organizationId: string, status: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    try {
        const response = await baseUrl(`/system/organizations/update_organization_status/${organizationId}`, {  
            cache: 'force-cache',
            headers: {
                'Authorization': `Bearer ${token?.value}`,
                'Content-Type': 'application/json'
            },
            next: {
                tags: ['organizations'],
                revalidate: 60 * 60 * 24
            },
            method: 'PUT',
            body: JSON.stringify({ status })
        })
        return response.json()
    } catch (error) {
        console.log(error)
        return null
    }
}






