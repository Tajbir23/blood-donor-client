'use server'

import baseUrl from "@/lib/api/baseUrl";
import { User } from "@/lib/types/userType"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from 'jsonwebtoken'

export const registerAsUser = async (data: User) => {
    try {
        // Check if there's a file to upload
        if (data.profileImage) {
            // Use FormData for file uploads
            const formData = new FormData();
            
            // Append the file
            formData.append('profileImage', data.profileImage);
            
            // Clone the data object without the file
            const userData = { ...data };
            // @ts-expect-error - Ignoring the type error when deleting an optional property
            delete userData.profileImage;
            
            formData.append('userData', JSON.stringify(userData));
            
            
            
            const response = await baseUrl('/user/register', {
                method: 'POST',
                body: formData
            })

            
            // if (!response.ok) {
            //     throw new Error('Failed to register');
            // }
            const user = await response.json()
            console.log(user)
            return user;
        } else {
            
        
            const response = await baseUrl('/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            

            // if (!response.ok) {
            //     throw new Error('Failed to register');
            // }
            const user = await response.json()
            console.log(user)
            return user;
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, error: 'Registration failed' };
    }
}

export const loginUser = async(formdata: {identity: string, password: string, rememberMe: boolean}) => {
    try {
        const response = await baseUrl('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        })

        const data = await response.json()

        if(!response.ok){
            if(response.status === 401){
                return { success: false, message: "পাসওয়ার্ড ভুল হয়েছে" }
            }
            if(response.status === 404){
                return { success: false, message: "ইমেইল বা ফোন নম্বর খুঁজে পাওয়া যায়নি" }
            }
            return { success: false, message: data.message || "লগইন করতে ব্যর্থ হয়েছে" }
        }

        return { success: true, user: data.user }
    } catch (error: unknown) {
        console.error("Error login user:", error)
        return {
            success: false, 
            message: error instanceof Error ? error.message : "লগইন করতে ব্যর্থ হয়েছে"
        }
    }
}

export const logoutUser = async() => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    try {
        const response = await baseUrl("/user/logout", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token?.value}`,
            }
        });

        cookieStore.delete("token");
        return await response.json();
    } catch (error) {
        return {success: false, message: error instanceof Error ? error.message : "Logout failed"};
    }
}

export const verifyJwt = async(protection: boolean = true) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if(!token && protection){
        redirect("/login");
    }

    if(!token?.value){
        return null;
    }

    try {
        const decoded = jwt.verify(token.value, process.env.NEXT_PUBLIC_JWT_TOKEN as string);
        // Ensure we return a plain serializable object
        return typeof decoded === 'object' ? Object.assign({}, decoded) : decoded;
    } catch (error) {
        console.log(error);
        cookieStore.delete("token");
        redirect("/login");
    }
}


export const forgotPassword = async(email: string) => {
    const response = await baseUrl("/user/forgot-password", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email})
    })

    return response.json()
}