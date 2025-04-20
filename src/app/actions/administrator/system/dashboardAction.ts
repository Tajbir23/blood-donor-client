'use server'

import { cookies } from "next/headers"
import { verifyJwt } from "../../authentication";
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
    
    const dashboardData = await baseUrl(`/system/dashboard/dashboard?timeRange=${timeRange}`)

    return await dashboardData.json()
}
