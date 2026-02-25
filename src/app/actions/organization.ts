'use server'
import baseUrl from "@/lib/api/baseUrl";
import { cookies } from "next/headers";

export const registerOrganization = async (formData: FormData) => {
    const cookieStore = await cookies()
    try {
        const token = cookieStore.get('token')?.value

        if (!token) {
            return { success: false, message: 'Unauthorized' }
        }

        const response = await baseUrl("/organization/register", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        return await response.json()
    } catch (error) {
        console.error(error);
        return { success: false, message: 'কিছু ভুল হয়েছে' }
    }
};

export const myOrganizations = async() => {
    const cookieStore = await cookies()
    const token = await cookieStore.get("token")?.value
    try {
        const response = await baseUrl('/organization/my_organizations', {
            cache: 'force-cache',
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${token}`
            },
            next: {
                tags: ['my_organizations'],
                revalidate: 300
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
            cache: 'no-store',
            method: "GET",
        })

        return await response.json()

    } catch (error) {
        console.log(error)
        return error
    }
}

export const getOrgDonations = async(
    organizationId: string,
    page: number = 1,
    limit: number = 10,
    search: string = "",
    bloodGroup: string = "",
    fromDate: string = "",
    toDate: string = "",
) => {
    try {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            search,
            bloodGroup,
            fromDate,
            toDate,
        });
        const response = await baseUrl(`/organization/donations/${organizationId}?${params.toString()}`, {
            method: "GET",
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return { success: false, donations: [], total: 0, totalPages: 0, currentPage: 1, bloodGroupStats: [] };
    }
}

export const getOrganizationDetails = async (organizationId: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    try {
        const response = await baseUrl(`/organization/details/${organizationId}`, {
            cache: 'no-store',
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return await response.json()
    } catch (error) {
        console.error(error)
        return { success: false, message: 'প্রতিষ্ঠানের তথ্য লোড করতে ব্যর্থ' }
    }
}

export const getPublicOrganizationDetails = async (organizationId: string) => {
    try {
        const response = await baseUrl(`/organization/public/${organizationId}`, {
            cache: 'no-store',
            method: "GET"
        })
        return await response.json()
    } catch (error) {
        console.error(error)
        return { success: false, message: 'প্রতিষ্ঠানের তথ্য লোড করতে ব্যর্থ' }
    }
}

export const getOrgDashboardStats = async (organizationId: string) => {
    const cookieStore = await cookies()
    try {
        const token = cookieStore.get('token')?.value
        if (!token) {
            return { success: false, message: 'অনুমোদিত নয়' }
        }
        const response = await baseUrl(`/organization/dashboard/${organizationId}`, {
            cache: 'no-store',
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return await response.json()
    } catch (error) {
        console.error(error)
        return { success: false, message: 'ড্যাশবোর্ড ডেটা লোড করতে ব্যর্থ' }
    }
}

export const updateOrganization = async (organizationId: string, data: Record<string, unknown>) => {
    const cookieStore = await cookies()
    try {
        const token = cookieStore.get('token')?.value
        if (!token) {
            return { success: false, message: 'অনুমোদিত নয়' }
        }
        const response = await baseUrl(`/organization/update/${organizationId}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return await response.json()
    } catch (error) {
        console.error(error)
        return { success: false, message: 'প্রতিষ্ঠানের তথ্য আপডেট করতে ব্যর্থ' }
    }
}
