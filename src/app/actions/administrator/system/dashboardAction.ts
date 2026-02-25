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
        cache: 'force-cache',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        next: {
            tags: ['dashboard'],
            revalidate: 60 * 60 * 24
        }
    })

    return await dashboardData.json()
}


export const getAllUsers = async ({search, page, limit, isActive, isBanned, isVerified, allUser}: {search: string, page: number, limit: number, isActive?: boolean, isBanned?: boolean, isVerified?: boolean, allUser?: boolean}) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        logoutUser()
        redirect('/')
    }

    const { role } = await verifyJwt() as decodedJwtType

    const isAdmin = role === 'admin' || role === 'superAdmin' || role === 'moderator';

    if(!isAdmin){
        redirect('/')
    }

    const params = new URLSearchParams();
    params.set('search', search);
    params.set('page', String(page));
    params.set('limit', String(limit));
    if (isActive !== undefined) params.set('isActive', String(isActive));
    if (isBanned !== undefined) params.set('isBanned', String(isBanned));
    if (isVerified !== undefined) params.set('isVerified', String(isVerified));
    if (allUser !== undefined) params.set('allUser', String(allUser));

    const users = await baseUrl(`/system/dashboard/users?${params.toString()}`,{
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        next: {
            tags: ['users'],
        }
    })

    return await users.json()
}


export const getAllAdmins = async ({search, page, limit}: {search: string, page: number, limit: number}) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        logoutUser()
        redirect('/')
    }

    const {role} = await verifyJwt() as decodedJwtType

    const isAdmin = role === 'admin' || role === 'superAdmin';

    if(!isAdmin){
        redirect('/')
    }
    
    const admins = await baseUrl(`/system/dashboard/admins?search=${search}&page=${page}&limit=${limit}`,{
        cache: 'force-cache',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        next: {
            tags: ['admins'],
            revalidate: 60 * 60 * 24
        }
    })

    return await admins.json()
}


export const getAllModerators = async ({search, page, limit}: {search: string, page: number, limit: number}) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        logoutUser()
        redirect('/')
    }
    
    const {role} = await verifyJwt() as decodedJwtType

    const isAdmin = role === 'admin' || role === 'superAdmin';

    if(!isAdmin){
        redirect('/')
    }
    
    const moderators = await baseUrl(`/system/dashboard/moderators?search=${search}&page=${page}&limit=${limit}`,{
        cache: 'force-cache',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        next: {
            tags: ['moderators'],
            revalidate: 60 * 60 * 24
        }
    })

    return await moderators.json()

}

export const getFacebookMessages = async ({ page = 1, limit = 20, psId = '', direction = '' }: { page?: number, limit?: number, psId?: string, direction?: string }) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return { error: 'Unauthorized' };

    const { role } = await verifyJwt() as decodedJwtType;
    if (role !== 'superAdmin') redirect('/dashboard');

    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (psId) params.set('psId', psId);
    if (direction) params.set('direction', direction);

    const res = await baseUrl(`/system/dashboard/facebook-messages?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });

    return await res.json();
}

export const getTelegramMessages = async ({ page = 1, limit = 20, chatId = '', direction = '' }: { page?: number, limit?: number, chatId?: string, direction?: string }) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return { error: 'Unauthorized' };

    const { role } = await verifyJwt() as decodedJwtType;
    if (role !== 'superAdmin') redirect('/dashboard');

    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (chatId)    params.set('chatId', chatId);
    if (direction) params.set('direction', direction);

    const res = await baseUrl(`/system/dashboard/telegram-messages?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });

    return await res.json();
}

// ── AI Training ───────────────────────────────────────────────────────────────

export const getAiTrainingData = async ({ page = 1, limit = 20, search = '' }: { page?: number, limit?: number, search?: string } = {}) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return { error: 'Unauthorized' };

    const { role } = await verifyJwt() as decodedJwtType;
    if (role !== 'superAdmin') redirect('/dashboard');

    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set('search', search);

    const res = await baseUrl(`/system/dashboard/ai-training?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });
    return await res.json();
}

export const addAiTrainingData = async (payload: {
    questionText: string;
    answerText: string;
    intent: string;
    sourceMessageId?: string;
    sourcePlatform?: string;
}) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return { error: 'Unauthorized' };

    const { role } = await verifyJwt() as decodedJwtType;
    if (role !== 'superAdmin') redirect('/dashboard');

    const res = await baseUrl('/system/dashboard/ai-training', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        cache: 'no-store',
    });
    return await res.json();
}

export const deleteAiTrainingData = async (id: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return { error: 'Unauthorized' };

    const { role } = await verifyJwt() as decodedJwtType;
    if (role !== 'superAdmin') redirect('/dashboard');

    const res = await baseUrl(`/system/dashboard/ai-training/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });
    return await res.json();
}
