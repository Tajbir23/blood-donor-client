'use server'

import baseUrl from "@/lib/api/baseUrl"

export const getAllSliders = async() => {
    const response = await baseUrl('/home/slider',{
        cache: 'force-cache',
        method: 'GET',
        next: {
            tags: ['sliders'],
            revalidate: 60 * 60 * 24
        }
    })
    const data = await response.json();
    return data
}