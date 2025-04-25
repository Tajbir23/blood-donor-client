'use server'
import baseUrl from "@/lib/api/baseUrl"
import { cookies } from "next/headers"

export const updateBloodDonationDate = async (lastDonation: Date, recipient: string, recipientName: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    console.log("lastDonation, recipient, recipientName", lastDonation, recipient, recipientName)
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
    const repsonse = await baseUrl(`/user/search-users?search=${searchQuery}`)
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
