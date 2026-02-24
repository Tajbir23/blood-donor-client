'use server'

import baseUrl from "@/lib/api/baseUrl"
import { cookies } from "next/headers"

export const createBlogPost = async (organizationId: string, formData: FormData) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) return { success: false, message: 'অনুমোদিত নয়' }

    try {
        const response = await baseUrl(`/blog/create/${organizationId}`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        })
        return await response.json()
    } catch (error) {
        console.error(error)
        return { success: false, message: 'ব্লগ পোস্ট তৈরি করতে ব্যর্থ' }
    }
}

export const getOrgBlogPosts = async (organizationId: string, page: number = 1, limit: number = 10) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) return { success: false, message: 'অনুমোদিত নয়' }

    try {
        const response = await baseUrl(`/blog/org/${organizationId}?page=${page}&limit=${limit}`, {
            cache: 'no-store',
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return await response.json()
    } catch (error) {
        console.error(error)
        return { success: false, message: 'ব্লগ পোস্ট লোড করতে ব্যর্থ' }
    }
}

export const getAllBlogPosts = async (page: number = 1, limit: number = 12, search: string = '') => {
    try {
        const response = await baseUrl(`/blog/posts?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`, {
            cache: 'no-store',
            method: 'GET'
        })
        return await response.json()
    } catch (error) {
        console.error(error)
        return { success: false, message: 'ব্লগ পোস্ট লোড করতে ব্যর্থ' }
    }
}

export const getBlogPostById = async (blogId: string) => {
    try {
        const response = await baseUrl(`/blog/post/${blogId}`, {
            cache: 'no-store',
            method: 'GET'
        })
        return await response.json()
    } catch (error) {
        console.error(error)
        return { success: false, message: 'ব্লগ পোস্ট লোড করতে ব্যর্থ' }
    }
}

export const addBlogComment = async (blogId: string, content: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) return { success: false, message: 'মন্তব্য করতে লগইন করুন' }

    try {
        const response = await baseUrl(`/blog/comment/${blogId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        })
        return await response.json()
    } catch (error) {
        console.error(error)
        return { success: false, message: 'মন্তব্য যোগ করতে ব্যর্থ' }
    }
}

export const deleteBlogPost = async (blogId: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) return { success: false, message: 'অনুমোদিত নয়' }

    try {
        const response = await baseUrl(`/blog/delete/${blogId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return await response.json()
    } catch (error) {
        console.error(error)
        return { success: false, message: 'ব্লগ পোস্ট মুছতে ব্যর্থ' }
    }
}
