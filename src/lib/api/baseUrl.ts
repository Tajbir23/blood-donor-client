'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const baseUrl = async(path: string, options = {}) => {
    const cookieStore = await cookies()
    try {
       
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
            cache: 'force-cache',
            ...options,
            credentials: 'include'
        })


        const token = res.headers.get("set-cookie")?.split(";")[0]?.split("=")[1]

        if(token){
            cookieStore.set('token', token, {
                httpOnly: true,
                secure: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 30,
                sameSite: 'strict'
            })
        }
        

        if(res.status === 401){
            cookieStore.delete('token')
            redirect('/login')
        }

        return res
    } catch (error) {
        throw error
    }
}

export default baseUrl