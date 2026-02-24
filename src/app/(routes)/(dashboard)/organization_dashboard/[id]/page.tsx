"use client"

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getOrgDashboardStats } from '@/app/actions/organization'
import {
    FaUsers, FaTint, FaHandHoldingHeart, FaUserClock,
    FaExclamationTriangle, FaUserShield, FaChartLine,
    FaArrowRight, FaCalendarAlt, FaPhoneAlt, FaEnvelope,
    FaCog, FaFlag, FaUserPlus, FaCheckCircle
} from 'react-icons/fa'

interface Organization {
    _id: string
    organizationName: string
    organizationType: string
    logoImage?: string
    isActive: boolean
    isBanned: boolean
    owner: { _id: string; fullName: string; profileImageUrl?: string; email: string }
    establishmentYear?: string
    email?: string
    phone?: string
    hasBloodBank: boolean
    providesEmergencyBlood: boolean
    availableBloodGroups?: string[]
}

interface Stats {
    totalMembers: number
    totalDonors: number
    canDonateNow: number
    pendingRequests: number
    pendingReports: number
    totalReports: number
    totalDonationCount: number
    adminCount: number
}

interface BloodGroupStat {
    group: string
    count: number
}

interface RecentMember {
    _id: string
    fullName: string
    bloodGroup: string
    profileImageUrl?: string
    lastDonationDate?: string
    canDonate: boolean
    createdAt: string
    phone?: string
}

interface RecentDonation {
    _id: string
    fullName: string
    bloodGroup: string
    profileImageUrl?: string
    lastDonationDate: string
    totalDonationCount: number
}

interface PendingJoinRequest {
    _id: string
    userId: {
        _id: string
        fullName: string
        bloodGroup: string
        profileImageUrl?: string
        phone?: string
    }
    createdAt: string
}

interface MonthlyDonation {
    _id: { year: number; month: number }
    count: number
}

const monthNames = ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টে', 'অক্টো', 'নভে', 'ডিসে']

const bloodGroupColors: Record<string, string> = {
    'A+': 'bg-red-50 text-red-700 border-red-200',
    'A-': 'bg-rose-50 text-rose-700 border-rose-200',
    'B+': 'bg-blue-50 text-blue-700 border-blue-200',
    'B-': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'AB+': 'bg-purple-50 text-purple-700 border-purple-200',
    'AB-': 'bg-violet-50 text-violet-700 border-violet-200',
    'O+': 'bg-green-50 text-green-700 border-green-200',
    'O-': 'bg-teal-50 text-teal-700 border-teal-200',
}

const OrgDashboardPage = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [organization, setOrganization] = useState<Organization | null>(null)
    const [stats, setStats] = useState<Stats | null>(null)
    const [bloodGroupStats, setBloodGroupStats] = useState<BloodGroupStat[]>([])
    const [recentMembers, setRecentMembers] = useState<RecentMember[]>([])
    const [recentDonations, setRecentDonations] = useState<RecentDonation[]>([])
    const [pendingJoinRequests, setPendingJoinRequests] = useState<PendingJoinRequest[]>([])
    const [monthlyDonations, setMonthlyDonations] = useState<MonthlyDonation[]>([])
    const [error, setError] = useState('')

    const fetchDashboard = useCallback(async () => {
        if (!id) return
        setIsLoading(true)
        setError('')
        try {
            const data = await getOrgDashboardStats(id as string)
            if (data.success) {
                setOrganization(data.organization)
                setStats(data.stats)
                setBloodGroupStats(data.bloodGroupStats || [])
                setRecentMembers(data.recentMembers || [])
                setRecentDonations(data.recentDonations || [])
                setPendingJoinRequests(data.pendingJoinRequests || [])
                setMonthlyDonations(data.monthlyDonations || [])
            } else {
                setError(data.message || 'ড্যাশবোর্ড ডেটা লোড করতে ব্যর্থ')
            }
        } catch {
            setError('সার্ভার ত্রুটি হয়েছে')
        } finally {
            setIsLoading(false)
        }
    }, [id])

    useEffect(() => {
        fetchDashboard()
    }, [fetchDashboard])

    const formatDate = (dateStr: string) => {
        if (!dateStr) return 'N/A'
        const d = new Date(dateStr)
        return d.toLocaleDateString('bn-BD', { year: 'numeric', month: 'short', day: 'numeric' })
    }

    const getRelativeTime = (dateStr: string) => {
        const now = new Date()
        const date = new Date(dateStr)
        const diffMs = now.getTime() - date.getTime()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        if (diffDays === 0) return 'আজ'
        if (diffDays === 1) return 'গতকাল'
        if (diffDays < 7) return `${diffDays} দিন আগে`
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} সপ্তাহ আগে`
        return `${Math.floor(diffDays / 30)} মাস আগে`
    }

    // Loading skeleton
    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse space-y-6">
                    {/* Header skeleton */}
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full" />
                        <div className="space-y-2">
                            <div className="h-6 bg-gray-200 rounded w-64" />
                            <div className="h-4 bg-gray-200 rounded w-40" />
                        </div>
                    </div>
                    {/* Stats skeleton */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-gray-100 rounded-xl h-28" />
                        ))}
                    </div>
                    {/* Content skeleton */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-100 rounded-xl h-72" />
                        <div className="bg-gray-100 rounded-xl h-72" />
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                    <FaExclamationTriangle className="text-red-400 text-4xl mx-auto mb-4" />
                    <p className="text-red-600 text-lg">{error}</p>
                    <button
                        onClick={fetchDashboard}
                        className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        আবার চেষ্টা করুন
                    </button>
                </div>
            </div>
        )
    }

    const maxMonthlyCount = Math.max(...monthlyDonations.map(m => m.count), 1)

    return (
        <div className="container mx-auto px-4 py-6 pb-24 md:pb-6">
            {/* Organization Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 mb-6 text-white shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-shrink-0">
                        {organization?.logoImage ? (
                            <Image
                                src={organization.logoImage}
                                alt={organization.organizationName}
                                width={72}
                                height={72}
                                className="rounded-full border-3 border-white/30 object-cover w-[72px] h-[72px]"
                            />
                        ) : (
                            <div className="w-[72px] h-[72px] bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                                {organization?.organizationName?.charAt(0) || '?'}
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold">{organization?.organizationName}</h1>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-red-100 text-sm">
                            <span className="bg-white/20 px-3 py-1 rounded-full">{organization?.organizationType}</span>
                            {organization?.isActive && (
                                <span className="flex items-center gap-1">
                                    <FaCheckCircle className="text-green-300" /> সক্রিয়
                                </span>
                            )}
                            {organization?.hasBloodBank && (
                                <span className="flex items-center gap-1">
                                    <FaTint className="text-red-200" /> ব্লাড ব্যাংক
                                </span>
                            )}
                            {organization?.providesEmergencyBlood && (
                                <span className="flex items-center gap-1">
                                    <FaHandHoldingHeart className="text-pink-200" /> জরুরি রক্ত
                                </span>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-4 mt-2 text-red-100 text-sm">
                            {organization?.phone && (
                                <span className="flex items-center gap-1">
                                    <FaPhoneAlt className="text-xs" /> {organization.phone}
                                </span>
                            )}
                            {organization?.email && (
                                <span className="flex items-center gap-1">
                                    <FaEnvelope className="text-xs" /> {organization.email}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <Link
                            href={`/organization_dashboard/${id}/settings`}
                            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg text-sm"
                        >
                            <FaCog /> সেটিংস
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Link href={`/organization_dashboard/${id}/members`} className="group">
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all group-hover:border-red-200">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center">
                                <FaUsers className="text-blue-600 text-lg" />
                            </div>
                            <FaArrowRight className="text-gray-300 group-hover:text-red-400 transition-colors text-sm" />
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{stats?.totalMembers || 0}</p>
                        <p className="text-sm text-gray-500 mt-1">মোট সদস্য</p>
                    </div>
                </Link>

                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center">
                            <FaHandHoldingHeart className="text-green-600 text-lg" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{stats?.canDonateNow || 0}</p>
                    <p className="text-sm text-gray-500 mt-1">রক্তদানে প্রস্তুত</p>
                </div>

                <Link href={`/organization_dashboard/${id}/donations`} className="group">
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all group-hover:border-red-200">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-11 h-11 bg-red-100 rounded-xl flex items-center justify-center">
                                <FaTint className="text-red-600 text-lg" />
                            </div>
                            <FaArrowRight className="text-gray-300 group-hover:text-red-400 transition-colors text-sm" />
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{stats?.totalDonationCount || 0}</p>
                        <p className="text-sm text-gray-500 mt-1">মোট রক্তদান</p>
                    </div>
                </Link>

                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center">
                            <FaUserShield className="text-purple-600 text-lg" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{stats?.adminCount || 0}</p>
                    <p className="text-sm text-gray-500 mt-1">অ্যাডমিন/মডারেটর</p>
                </div>
            </div>

            {/* Alert Cards - Pending items */}
            {((stats?.pendingRequests || 0) > 0 || (stats?.pendingReports || 0) > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {(stats?.pendingRequests || 0) > 0 && (
                        <Link href={`/organization_dashboard/${id}/members`}>
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <FaUserClock className="text-amber-600 text-xl" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-amber-800 font-semibold">{stats?.pendingRequests} টি যোগদান অনুরোধ অপেক্ষমান</p>
                                    <p className="text-amber-600 text-sm">অনুগ্রহ করে পর্যালোচনা করুন</p>
                                </div>
                                <FaArrowRight className="text-amber-400" />
                            </div>
                        </Link>
                    )}
                    {(stats?.pendingReports || 0) > 0 && (
                        <Link href={`/organization_dashboard/${id}/reports`}>
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <FaFlag className="text-red-500 text-xl" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-red-800 font-semibold">{stats?.pendingReports} টি রিপোর্ট অপেক্ষমান</p>
                                    <p className="text-red-600 text-sm">দ্রুত সমাধান প্রয়োজন</p>
                                </div>
                                <FaArrowRight className="text-red-400" />
                            </div>
                        </Link>
                    )}
                </div>
            )}

            {/* Blood Group Distribution + Monthly Donations Chart */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Blood Group Distribution */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <FaTint className="text-red-500" />
                        রক্তের গ্রুপ বিতরণ
                    </h2>
                    <div className="grid grid-cols-4 gap-3">
                        {bloodGroupStats.map(bg => (
                            <div
                                key={bg.group}
                                className={`rounded-xl border p-3 text-center transition-transform hover:scale-105 ${bloodGroupColors[bg.group] || 'bg-gray-50 text-gray-700 border-gray-200'}`}
                            >
                                <p className="text-xl font-bold">{bg.count}</p>
                                <p className="text-sm font-medium mt-1">{bg.group}</p>
                            </div>
                        ))}
                    </div>
                    {stats && stats.totalMembers > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-500 text-center">
                                মোট {stats.totalMembers} জন সদস্যের মধ্যে {stats.totalDonors} জন রক্তদাতা
                            </p>
                        </div>
                    )}
                </div>

                {/* Monthly Donations Chart */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <FaChartLine className="text-red-500" />
                        মাসিক রক্তদান (সাম্প্রতিক ৬ মাস)
                    </h2>
                    {monthlyDonations.length > 0 ? (
                        <div className="flex items-end justify-between gap-2 h-48">
                            {monthlyDonations.map((m, idx) => {
                                const heightPercent = (m.count / maxMonthlyCount) * 100
                                return (
                                    <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                                        <span className="text-sm font-semibold text-gray-700 mb-1">{m.count}</span>
                                        <div
                                            className="w-full bg-gradient-to-t from-red-600 to-red-400 rounded-t-lg transition-all duration-500 min-h-[4px]"
                                            style={{ height: `${Math.max(heightPercent, 3)}%` }}
                                        />
                                        <span className="text-xs text-gray-500 mt-2">
                                            {monthNames[m._id.month - 1]}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-48 text-gray-400">
                            <div className="text-center">
                                <FaCalendarAlt className="text-3xl mx-auto mb-2" />
                                <p className="text-sm">এখনো কোনো রক্তদানের রেকর্ড নেই</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Members + Recent Donations */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Recent Members */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between p-5 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <FaUserPlus className="text-blue-500" />
                            সাম্প্রতিক সদস্য
                        </h2>
                        <Link
                            href={`/organization_dashboard/${id}/members`}
                            className="text-red-600 text-sm hover:text-red-700 flex items-center gap-1"
                        >
                            সব দেখুন <FaArrowRight className="text-xs" />
                        </Link>
                    </div>
                    {recentMembers.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                            {recentMembers.map(member => (
                                <div key={member._id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                                    <div className="flex-shrink-0">
                                        {member.profileImageUrl ? (
                                            <Image
                                                src={member.profileImageUrl}
                                                alt={member.fullName}
                                                width={40}
                                                height={40}
                                                className="rounded-full object-cover w-10 h-10"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-bold">
                                                {member.fullName?.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate">{member.fullName}</p>
                                        <p className="text-xs text-gray-500">যোগদান: {getRelativeTime(member.createdAt)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold bg-red-50 text-red-600 px-2 py-1 rounded-full">
                                            {member.bloodGroup}
                                        </span>
                                        {member.canDonate && (
                                            <span className="w-2 h-2 bg-green-500 rounded-full" title="রক্তদানে প্রস্তুত" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-400">
                            <FaUsers className="text-3xl mx-auto mb-2" />
                            <p className="text-sm">কোনো সদস্য নেই</p>
                        </div>
                    )}
                </div>

                {/* Recent Donations */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between p-5 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <FaTint className="text-red-500" />
                            সাম্প্রতিক রক্তদান
                        </h2>
                        <Link
                            href={`/organization_dashboard/${id}/donations`}
                            className="text-red-600 text-sm hover:text-red-700 flex items-center gap-1"
                        >
                            সব দেখুন <FaArrowRight className="text-xs" />
                        </Link>
                    </div>
                    {recentDonations.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                            {recentDonations.map(donor => (
                                <div key={donor._id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                                    <div className="flex-shrink-0">
                                        {donor.profileImageUrl ? (
                                            <Image
                                                src={donor.profileImageUrl}
                                                alt={donor.fullName}
                                                width={40}
                                                height={40}
                                                className="rounded-full object-cover w-10 h-10"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-bold">
                                                {donor.fullName?.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate">{donor.fullName}</p>
                                        <p className="text-xs text-gray-500">
                                            শেষ দান: {formatDate(donor.lastDonationDate)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold bg-red-50 text-red-600 px-2 py-1 rounded-full">
                                            {donor.bloodGroup}
                                        </span>
                                        <p className="text-xs text-gray-400 mt-1">{donor.totalDonationCount} বার</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-400">
                            <FaTint className="text-3xl mx-auto mb-2" />
                            <p className="text-sm">কোনো রক্তদানের রেকর্ড নেই</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Pending Join Requests */}
            {pendingJoinRequests.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
                    <div className="flex items-center justify-between p-5 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <FaUserClock className="text-amber-500" />
                            অপেক্ষমান যোগদান অনুরোধ
                        </h2>
                        <Link
                            href={`/organization_dashboard/${id}/members`}
                            className="text-red-600 text-sm hover:text-red-700 flex items-center gap-1"
                        >
                            সব দেখুন <FaArrowRight className="text-xs" />
                        </Link>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 p-5">
                        {pendingJoinRequests.map(req => (
                            <div key={req._id} className="flex items-center gap-3 bg-amber-50/50 border border-amber-100 rounded-xl p-3">
                                <div className="flex-shrink-0">
                                    {req.userId?.profileImageUrl ? (
                                        <Image
                                            src={req.userId.profileImageUrl}
                                            alt={req.userId.fullName}
                                            width={40}
                                            height={40}
                                            className="rounded-full object-cover w-10 h-10"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-sm font-bold">
                                            {req.userId?.fullName?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">{req.userId?.fullName}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                                            {req.userId?.bloodGroup}
                                        </span>
                                        <span className="text-xs text-gray-400">{getRelativeTime(req.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">দ্রুত কার্যক্রম</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Link
                        href={`/organization_dashboard/${id}/members`}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-center"
                    >
                        <FaUsers className="text-blue-600 text-xl" />
                        <span className="text-sm text-blue-800 font-medium">সদস্য ব্যবস্থাপনা</span>
                    </Link>
                    <Link
                        href={`/organization_dashboard/${id}/donations`}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-red-50 hover:bg-red-100 transition-colors text-center"
                    >
                        <FaTint className="text-red-600 text-xl" />
                        <span className="text-sm text-red-800 font-medium">রক্তদানের রেকর্ড</span>
                    </Link>
                    <Link
                        href={`/organization_dashboard/${id}/reports`}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors text-center"
                    >
                        <FaFlag className="text-amber-600 text-xl" />
                        <span className="text-sm text-amber-800 font-medium">রিপোর্ট দেখুন</span>
                    </Link>
                    <Link
                        href={`/organization_dashboard/${id}/settings`}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-center"
                    >
                        <FaCog className="text-gray-600 text-xl" />
                        <span className="text-sm text-gray-800 font-medium">সেটিংস</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrgDashboardPage