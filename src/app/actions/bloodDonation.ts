'use server'
import baseUrl from "@/lib/api/baseUrl";
import BloodRequestType from "@/lib/types/bloodRequestType";

export const requestForBlood = async (data: BloodRequestType) => {
    
    try {
       const response = await baseUrl("/blood_request/request", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
       }) 

    //    if(!response.ok) {
    //     throw new Error("কিছু ভুল হয়েছে")
    //    }

       return await response.json()
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "কিছু ভুল হয়েছে"
        }
    }
}

export const getBloodRequest = async (page: number, limit: number) => {
    try {
        const response = await baseUrl(`/blood_request/requests?page=${page}&limit=${limit}`, {
            cache: 'force-cache',
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            next: {
                tags: ['blood-requests'],
                revalidate: 60 * 60 * 3
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "কিছু ভুল হয়েছে"
        }
    }
}

export const getBloodDonors = async (page: number, limit: number, search: string) => {
    try {
        const response = await baseUrl(`/blood_request/donors?page=${page}&limit=${limit}&search=${search}`, {
            cache: 'force-cache',
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            next: {
                tags: ['blood-donors'],
                revalidate: 60 * 60 * 3
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "কিছু ভুল হয়েছে"
        }
    }
}

export const getLeaderboardDonors = async() => {
    try {
        const response = await baseUrl('/donor-leaderboard/highest-donor', {
            method: "GET",
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "কিছু ভুল হয়েছে"
        }
    }   
}

export const findBloodDonors = async (latitude: string, longitude: string, bloodGroup: string) => {
    console.log(latitude, longitude, bloodGroup)
    try {
        const response = await baseUrl(`/user/donor/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                latitude,
                longitude,
                bloodGroup
            })
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "কিছু ভুল হয়েছে"
        }
    }
}