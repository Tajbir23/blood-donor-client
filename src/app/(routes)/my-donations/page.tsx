'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getDonationHistory } from '@/app/actions/userAction'
import { FaTint, FaCalendarAlt, FaChevronLeft, FaChevronRight, FaUser, FaHandHoldingHeart } from 'react-icons/fa'

interface DonationRecord {
    _id: string
    donationDate: string
    recipient: string
    recipientName: string
    createdAt: string
}

interface Pagination {
    total: number
    page: number
    limit: number
    totalPages: number
}

const DonationsPage = () => {
    const [page, setPage] = useState(1)
    const limit = 10

    const { data, isLoading, isError } = useQuery({
        queryKey: ['donation-history', page],
        queryFn: async () => await getDonationHistory(page, limit),
        staleTime: 1000 * 60 * 5,
    })

    const donations: DonationRecord[] = data?.donations ?? []
    const pagination: Pagination = data?.pagination ?? { total: 0, page: 1, limit: 10, totalPages: 0 }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('bn-BD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    const getTimeSince = (dateStr: string) => {
        const date = new Date(dateStr)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        if (diffDays === 0) return 'আজ'
        if (diffDays === 1) return 'গতকাল'
        if (diffDays < 30) return `${diffDays} দিন আগে`
        const diffMonths = Math.floor(diffDays / 30)
        if (diffMonths < 12) return `${diffMonths} মাস আগে`
        const diffYears = Math.floor(diffMonths / 12)
        return `${diffYears} বছর আগে`
    }

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaTint className="text-red-500" />
                    রক্তদানের ইতিহাস
                </h1>
                <p className="text-gray-500 mt-1">আপনার সকল রক্তদানের তথ্য এখানে সংরক্ষিত আছে</p>
            </div>

            {/* Stats Summary */}
            {!isLoading && !isError && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-center gap-3">
                        <div className="bg-red-100 p-3 rounded-full">
                            <FaHandHoldingHeart className="text-red-500 text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-red-600">মোট রক্তদান</p>
                            <p className="text-2xl font-bold text-red-700">{pagination.total}</p>
                        </div>
                    </div>

                    {donations.length > 0 && (
                        <>
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center gap-3">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaCalendarAlt className="text-blue-500 text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-blue-600">সর্বশেষ রক্তদান</p>
                                    <p className="text-lg font-semibold text-blue-700">{formatDate(donations[0].donationDate)}</p>
                                </div>
                            </div>

                            <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center gap-3">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <FaUser className="text-green-500 text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-green-600">সর্বশেষ গ্রাহক</p>
                                    <p className="text-lg font-semibold text-green-700 truncate">
                                        {donations[0].recipientName || 'উল্লেখ নেই'}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Loading State */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4"></div>
                    <p className="text-gray-500">রক্তদানের ইতিহাস লোড হচ্ছে...</p>
                </div>
            )}

            {/* Error State */}
            {isError && (
                <div className="text-center py-16 bg-red-50 rounded-lg border border-red-100">
                    <FaTint className="text-red-300 text-4xl mx-auto mb-3" />
                    <p className="text-red-600 font-medium">তথ্য লোড করতে সমস্যা হয়েছে</p>
                    <p className="text-red-400 text-sm mt-1">অনুগ্রহ করে আবার চেষ্টা করুন</p>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && donations.length === 0 && (
                <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-100">
                    <FaTint className="text-gray-300 text-5xl mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600">এখনো কোনো রক্তদান করা হয়নি</h3>
                    <p className="text-gray-400 mt-1 text-sm">আপনার প্রথম রক্তদান করলে এখানে দেখা যাবে</p>
                </div>
            )}

            {/* Donation History Table */}
            {!isLoading && !isError && donations.length > 0 && (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">তারিখ</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">গ্রাহকের ধরন</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">গ্রাহকের নাম</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">সময়কাল</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {donations.map((donation, index) => (
                                    <tr key={donation._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {(pagination.page - 1) * pagination.limit + index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{formatDate(donation.donationDate)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                {donation.recipient || 'উল্লেখ নেই'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {donation.recipientName || 'উল্লেখ নেই'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {getTimeSince(donation.donationDate)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-3">
                        {donations.map((donation, index) => (
                            <div key={donation._id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                                        #{(pagination.page - 1) * pagination.limit + index + 1}
                                    </span>
                                    <span className="text-xs text-gray-400">{getTimeSince(donation.donationDate)}</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800 flex items-center gap-1.5">
                                    <FaCalendarAlt className="text-gray-400 text-xs" />
                                    {formatDate(donation.donationDate)}
                                </p>
                                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                                    <FaUser className="text-gray-400" />
                                    <span className="font-medium text-gray-700">{donation.recipientName || 'উল্লেখ নেই'}</span>
                                    <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">
                                        {donation.recipient || 'উল্লেখ নেই'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6 px-2">
                            <p className="text-sm text-gray-500">
                                মোট {pagination.total}টির মধ্যে {(pagination.page - 1) * pagination.limit + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} দেখানো হচ্ছে
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <FaChevronLeft className="text-sm" />
                                </button>
                                <span className="text-sm text-gray-600 font-medium px-2">
                                    {pagination.page} / {pagination.totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                                    disabled={page >= pagination.totalPages}
                                    className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <FaChevronRight className="text-sm" />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default DonationsPage
