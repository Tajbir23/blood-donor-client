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

// ── Telegram Broadcast ────────────────────────────────────────────────────────

export interface TgBroadcastFilters {
    bloodGroup?: string;       // comma-separated, e.g. "A+,B-"
    divisionId?: string;
    districtId?: string;
    thanaId?: string;
    lastDonationFrom?: string; // ISO date string
    lastDonationTo?: string;
    neverDonated?: boolean;
    registeredFrom?: string;
    registeredTo?: string;
}

export const getTgBroadcastLocations = async (params: { divisionId?: string; districtId?: string } = {}) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return { error: 'Unauthorized' };
    const { role } = await verifyJwt() as decodedJwtType;
    if (role !== 'superAdmin') redirect('/dashboard');

    const query = new URLSearchParams();
    if (params.divisionId) query.set('divisionId', params.divisionId);
    if (params.districtId) query.set('districtId', params.districtId);

    const res = await baseUrl(`/system/dashboard/tg-broadcast/locations?${query.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });
    return await res.json();
};

export const getTgBroadcastCount = async (filters: TgBroadcastFilters) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return { error: 'Unauthorized' };
    const { role } = await verifyJwt() as decodedJwtType;
    if (role !== 'superAdmin') redirect('/dashboard');

    const query = new URLSearchParams();
    if (filters.bloodGroup)      query.set('bloodGroup',      filters.bloodGroup);
    if (filters.divisionId)      query.set('divisionId',      filters.divisionId);
    if (filters.districtId)      query.set('districtId',      filters.districtId);
    if (filters.thanaId)         query.set('thanaId',         filters.thanaId);
    if (filters.neverDonated)    query.set('neverDonated',    'true');
    if (filters.lastDonationFrom) query.set('lastDonationFrom', filters.lastDonationFrom);
    if (filters.lastDonationTo)   query.set('lastDonationTo',   filters.lastDonationTo);
    if (filters.registeredFrom)  query.set('registeredFrom',  filters.registeredFrom);
    if (filters.registeredTo)    query.set('registeredTo',    filters.registeredTo);

    const res = await baseUrl(`/system/dashboard/tg-broadcast/count?${query.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });
    return await res.json();
};

export const sendTgBroadcast = async (filters: TgBroadcastFilters, message: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return { error: 'Unauthorized' };
    const { role } = await verifyJwt() as decodedJwtType;
    if (role !== 'superAdmin') redirect('/dashboard');

    const body: Record<string, string> = { message };
    if (filters.bloodGroup)       body.bloodGroup      = filters.bloodGroup;
    if (filters.divisionId)       body.divisionId      = filters.divisionId;
    if (filters.districtId)       body.districtId      = filters.districtId;
    if (filters.thanaId)          body.thanaId         = filters.thanaId;
    if (filters.neverDonated)     body.neverDonated    = 'true';
    if (filters.lastDonationFrom) body.lastDonationFrom = filters.lastDonationFrom;
    if (filters.lastDonationTo)   body.lastDonationTo   = filters.lastDonationTo;
    if (filters.registeredFrom)   body.registeredFrom   = filters.registeredFrom;
    if (filters.registeredTo)     body.registeredTo     = filters.registeredTo;

    const res = await baseUrl('/system/dashboard/tg-broadcast', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        cache: 'no-store',
    });
    return await res.json();
};
// ─── Custom Bot Rules ─────────────────────────────────────────────────────────

export const getBotRules = async ({ page = 1, limit = 50, search = "" }: { page?: number; limit?: number; search?: string }) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return { error: 'Unauthorized' };
    const { role } = await verifyJwt() as decodedJwtType;
    if (role !== 'superAdmin') redirect('/dashboard');

    const params = new URLSearchParams({ page: String(page), limit: String(limit), search });
    const res = await baseUrl(`/system/dashboard/bot-rules?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });
    return await res.json();
};

export const addBotRule = async (data: { trigger: string; response: string; matchType: string; platform: string }) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return { error: 'Unauthorized' };
    const { role } = await verifyJwt() as decodedJwtType;
    if (role !== 'superAdmin') redirect('/dashboard');

    const res = await baseUrl('/system/dashboard/bot-rules', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        cache: 'no-store',
    });
    return await res.json();
};

export const updateBotRule = async (id: string, data: { trigger?: string; response?: string; matchType?: string; platform?: string; isActive?: boolean }) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return { error: 'Unauthorized' };
    const { role } = await verifyJwt() as decodedJwtType;
    if (role !== 'superAdmin') redirect('/dashboard');

    const res = await baseUrl(`/system/dashboard/bot-rules/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        cache: 'no-store',
    });
    return await res.json();
};

export const deleteBotRule = async (id: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return { error: 'Unauthorized' };
    const { role } = await verifyJwt() as decodedJwtType;
    if (role !== 'superAdmin') redirect('/dashboard');

    const res = await baseUrl(`/system/dashboard/bot-rules/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });
    return await res.json();
};