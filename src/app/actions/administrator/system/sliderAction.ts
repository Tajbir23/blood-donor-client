'use server'
import baseUrl from "@/lib/api/baseUrl";
import SliderTypes from "@/lib/types/sliderTypes";
import { cookies } from "next/headers";

export const createSlider = async (data: SliderTypes) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token) {
        return { error: 'Unauthorized' }
    }

    if(data.imageFile) {
        const formData = new FormData()
        formData.append('sliderImage', data.imageFile)

        const userData = { ...data }
        delete userData.imageFile

        formData.append('sliderData', JSON.stringify(userData))

        const response = await baseUrl('/system/dashboard/create-slider', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.value}`
            },
            body: formData
        })

        const slider = await response.json()
        return slider
            
    }
}

export const getAllSliders = async (page: number, limit: number, search: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token) {
        return { error: 'Unauthorized' }
    }

    const response = await baseUrl(`/system/dashboard/get-all-sliders?page=${page}&limit=${limit}&search=${search}`, {
        cache: 'force-cache',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.value}`
        },
        next: {
            tags: ['sliders'],
            revalidate: 60 * 60 * 24
        }
    })

    const sliders = await response.json()
    return sliders
}

export const deleteSlider = async(id: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value

    if(!token){
        return {error: 'Unauthorized'}
    }

    const response = await baseUrl(`/system/dashboard/delete-slider?id=${id}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json();
    return data
}


export const toggleActiveSlider = async(id: string) => {
    const cookieStore = await cookies();
    const token = await cookieStore.get("token")?.value

    if(!token){
        return {error: "Unauthorized"}
    }

    const response = await baseUrl(`/system/dashboard/slider-active-toggle?id=${id}`,{
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json();
    return data
}