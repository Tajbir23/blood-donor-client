'use server'

import baseUrl from "@/lib/api/baseUrl"

export const getAllSliders = async() => {
    const response = await baseUrl('/home/slider',{
        method: 'GET'
    })
    const data = await response.json();
    return data
}