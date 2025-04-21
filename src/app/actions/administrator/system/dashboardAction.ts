'use server'

import { cookies } from "next/headers"
import { logoutUser, verifyJwt } from "../../authentication";
import { redirect } from "next/navigation";
import decodedJwtType from "@/lib/types/decodedJwtType";
import baseUrl from "@/lib/api/baseUrl";


export const getDashboardData = async (timeRange: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return { error: 'Unauthorized' };
    }

    const { role } = await verifyJwt() as decodedJwtType
    
    const isAdmin = role === 'admin' || role === 'superAdmin' || role === 'moderator';

    if(!isAdmin){
        redirect('/')
    }
    
    const dashboardData = await baseUrl(`/system/dashboard/dashboard?timeRange=${timeRange}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return await dashboardData.json()
}


export const getAllUsers = async ({search, page, limit}: {search: string, page: number, limit: number}) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        logoutUser()
        redirect('/')
    }

    const { role } = await verifyJwt() as decodedJwtType

    console.log("line 43", role)

    const isAdmin = role === 'admin' || role === 'superAdmin' || role === 'moderator';

    if(!isAdmin){
        redirect('/')
    }

    const users = await baseUrl(`/system/dashboard/users?search=${search}&page=${page}&limit=${limit}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return await users.json()
}