'use server'
import baseUrl from "@/lib/api/baseUrl";
import organizationType from "@/lib/types/organizationType";
import { cookies } from "next/headers";

export const registerOrganization = async (organization: organizationType) => {
    const cookieStore = await cookies()
    try {
        if(organization.logoImage){
            const formData = new FormData();
            formData.append("organization", organization.logoImage);

            const organizationData = {...organization}

            // @ts-expect-error - Ignoring the type error when deleting an optional property
            delete organizationData.logoImage

            formData.append('organizationData', JSON.stringify(organizationData))

            const token = cookieStore.get('token')?.value

            
            const response = await baseUrl("/organization/register", {
                method: "POST",
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                body: formData,
            });

            return await response.json()

        }
    } catch (error) {
        console.error(error);
        return error
    }
};

export const myOrganizations = async() => {
    const cookieStore = await cookies()
    const token = await cookieStore.get("token")?.value
    try {
        const response = await baseUrl('/organization/my_organizations', {
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })

        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

export const joinOrganization = async(orgId: string) => {
    const cookieStore = await cookies()
    const token = await cookieStore.get("token")?.value
    try {
        const response = await baseUrl(`/organization/join_request/${orgId}`, {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })

        return await response.json()
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getMembers = async(organizationId: string, page?: number, limit?: number, search?: string) => {
    try {
        const response = await baseUrl(`/organization/members/${organizationId}?page=${page}&limit=${limit}&search=${search}`, {
            method: "GET",
        })

        return await response.json()

    } catch (error) {
        console.log(error)
        return error
    }
}
