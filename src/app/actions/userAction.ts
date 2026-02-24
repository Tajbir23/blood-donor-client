'use server'
import baseUrl from "@/lib/api/baseUrl"
import { cookies } from "next/headers"

export const updateBloodDonationDate = async (lastDonation: Date, recipient: string, recipientName: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    if(!token){
        return {success: false, message: 'Unauthorized'}
    }
    
    try {
        const response = await baseUrl('/user/update-last-donation', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.value}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lastDonation, recipient, recipientName})
        })
        return response.json()
    } catch {
        return {success: false, message: 'Internal Server Error'}
    }
}

export const searchDonors = async (searchQuery: string) => {
    const repsonse = await baseUrl(`/user/search-users?search=${searchQuery}`, {
        cache: 'no-store',
    })
    return repsonse.json()
}


export const updateProfileImage = async (formData: FormData) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    if(!token){
        return {success: false, message: 'Unauthorized'}
    }

    
        const response = await baseUrl('/user/update-profile-image', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token.value}`,
            },
            body: formData
        })
        return response.json()
    
}

export const getDonationHistory = async (page: number = 1, limit: number = 10) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    if (!token) {
        return { success: false, message: 'Unauthorized', donations: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 0 } }
    }

    try {
        const response = await baseUrl(`/user/donation-history?page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${token.value}`,
            },
        })
        return response.json()
    } catch {
        return { success: false, message: 'রক্তদানের ইতিহাস লোড করতে ব্যর্থ হয়েছে', donations: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 0 } }
    }
}

export const reportUser = async (reportedUserId: string, reason: string, category: string, description: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    if (!token) {
        return { success: false, message: 'রিপোর্ট করতে লগইন করুন' }
    }

    try {
        const response = await baseUrl('/user/report', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.value}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reportedUserId, reason, category, description })
        })
        return response.json()
    } catch {
        return { success: false, message: 'সার্ভার ত্রুটি হয়েছে' }
    }
}
