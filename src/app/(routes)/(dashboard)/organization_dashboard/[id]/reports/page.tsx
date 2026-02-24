"use client"

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { getOrgReports, updateReportStatus } from '@/app/actions/administrator/organization/manageOrg'
import Image from 'next/image'
import toast from 'react-hot-toast'
import {
    FaSearch, FaFilter, FaExclamationTriangle, FaUser, FaEnvelope,
    FaPhone, FaTint, FaChevronDown, FaChevronUp, FaClock,
    FaCheckCircle, FaTimesCircle, FaEye, FaFlag, FaStickyNote
} from 'react-icons/fa'

interface ReportedUser {
    _id: string
    fullName: string
    email: string
    phone: string
    bloodGroup: string
    profileImageUrl?: string
    reportCount: number
}

interface ReporterUser {
    _id: string
    fullName: string
    email: string
    profileImageUrl?: string
}

interface Report {
    _id: string
    reportedUserId: ReportedUser
    reporterUserId: ReporterUser
    organizationId: string
    reason: string
    category: string
    description: string
    status: 'pending' | 'reviewed' | 'resolved' | 'dismissed'
    adminNote: string
    createdAt: string
    updatedAt: string
}

interface Stats {
    pending: number
    reviewed: number
    resolved: number
    dismissed: number
    total: number
}

const categoryLabels: Record<string, string> = {
    fake_donation: 'ভুয়া রক্তদান',
    inappropriate_behavior: 'অনুচিত আচরণ',
    spam: 'স্প্যাম',
    wrong_info: 'ভুল তথ্য',
    other: 'অন্যান্য'
}

const statusLabels: Record<string, string> = {
    pending: 'অপেক্ষমান',
    reviewed: 'পর্যালোচিত',
    resolved: 'সমাধান হয়েছে',
    dismissed: 'বাতিল'
}

const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800 border-amber-200',
    reviewed: 'bg-blue-100 text-blue-800 border-blue-200',
    resolved: 'bg-green-100 text-green-800 border-green-200',
    dismissed: 'bg-gray-100 text-gray-600 border-gray-200'
}

const statusIcons: Record<string, React.ReactNode> = {
    pending: <FaClock className="text-amber-500" />,
    reviewed: <FaEye className="text-blue-500" />,
    resolved: <FaCheckCircle className="text-green-500" />,
    dismissed: <FaTimesCircle className="text-gray-400" />
}

const OrgReportsPage = () => {
    const { id } = useParams()
    const [reports, setReports] = useState<Report[]>([])
    const [stats, setStats] = useState<Stats>({ pending: 0, reviewed: 0, resolved: 0, dismissed: 0, total: 0 })
    const [isLoading, setIsLoading] = useState(true)
    const [searchInput, setSearchInput] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)
    const [expandedReport, setExpandedReport] = useState<string | null>(null)
    const [adminNotes, setAdminNotes] = useState<Record<string, string>>({})
    const [updatingId, setUpdatingId] = useState<string | null>(null)

    const fetchReports = useCallback(async () => {
        if (!id) return
        setIsLoading(true)
        try {
            const data = await getOrgReports(id as string, currentPage, 10, statusFilter, searchInput)
            if (data.success) {
                setReports(data.reports || [])
                setTotalPages(data.totalPages || 1)
                setTotal(data.total || 0)
                setStats(data.stats || { pending: 0, reviewed: 0, resolved: 0, dismissed: 0, total: 0 })
            }
        } catch {
            toast.error('রিপোর্ট লোড করতে সমস্যা হয়েছে')
        } finally {
            setIsLoading(false)
        }
    }, [id, currentPage, statusFilter, searchInput])

    useEffect(() => {
        fetchReports()
    }, [fetchReports])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setCurrentPage(1)
    }

    const handleStatusUpdate = async (reportId: string, newStatus: string) => {
        setUpdatingId(reportId)
        try {
            const note = adminNotes[reportId] || ''
            const result = await updateReportStatus(reportId, newStatus, note)
            if (result.success) {
                toast.success(result.message || 'স্ট্যাটাস আপডেট হয়েছে')
                await fetchReports()
            } else {
                toast.error(result.message || 'আপডেট করতে ব্যর্থ হয়েছে')
            }
        } catch {
            toast.error('সার্ভার ত্রুটি')
        } finally {
            setUpdatingId(null)
        }
    }

    const toggleExpand = (reportId: string) => {
        setExpandedReport(prev => prev === reportId ? null : reportId)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                    <FaFlag className="text-red-500" />
                    সদস্য রিপোর্ট
                </h1>
                <p className="text-gray-600">আপনার সংগঠনের সদস্যদের বিরুদ্ধে ব্যবহারকারীদের রিপোর্ট</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">মোট রিপোর্ট</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 shadow-sm">
                    <p className="text-xs text-amber-600 mb-1">অপেক্ষমান</p>
                    <p className="text-2xl font-bold text-amber-700">{stats.pending}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 shadow-sm">
                    <p className="text-xs text-blue-600 mb-1">পর্যালোচিত</p>
                    <p className="text-2xl font-bold text-blue-700">{stats.reviewed}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100 shadow-sm">
                    <p className="text-xs text-green-600 mb-1">সমাধান হয়েছে</p>
                    <p className="text-2xl font-bold text-green-700">{stats.resolved}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">বাতিল</p>
                    <p className="text-2xl font-bold text-gray-600">{stats.dismissed}</p>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <form onSubmit={handleSearch} className="flex-1">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="সদস্যের নাম, ইমেইল বা ফোন দিয়ে খুঁজুন..."
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </form>
                    <div className="flex items-center gap-2">
                        <FaFilter className="text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="">সব স্ট্যাটাস</option>
                            <option value="pending">অপেক্ষমান</option>
                            <option value="reviewed">পর্যালোচিত</option>
                            <option value="resolved">সমাধান হয়েছে</option>
                            <option value="dismissed">বাতিল</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Reports List */}
            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-pulse">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                                </div>
                                <div className="h-8 bg-gray-200 rounded w-24" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : reports.length > 0 ? (
                <div className="space-y-4">
                    {reports.map((report) => {
                        const isExpanded = expandedReport === report._id
                        const reported = report.reportedUserId
                        const reporter = report.reporterUserId

                        return (
                            <div key={report._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200">
                                {/* Report Header - always visible */}
                                <div
                                    className="p-5 cursor-pointer hover:bg-gray-50/50 transition-colors"
                                    onClick={() => toggleExpand(report._id)}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        {/* Reported User */}
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 ring-2 ring-red-100">
                                                {reported?.profileImageUrl ? (
                                                    <Image
                                                        src={reported.profileImageUrl}
                                                        alt={reported.fullName}
                                                        width={48}
                                                        height={48}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-600 font-bold text-lg">
                                                        {reported?.fullName?.charAt(0) || '?'}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-gray-800 truncate">{reported?.fullName || 'অজানা'}</p>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <FaTint className="text-red-400 text-xs" />
                                                    <span>{reported?.bloodGroup || 'N/A'}</span>
                                                    {reported?.reportCount > 1 && (
                                                        <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">
                                                            {reported.reportCount} বার রিপোর্টেড
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Category & Status */}
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                                                {categoryLabels[report.category] || report.category}
                                            </span>
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${statusColors[report.status]}`}>
                                                {statusIcons[report.status]}
                                                {statusLabels[report.status]}
                                            </span>
                                            {isExpanded ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
                                        </div>
                                    </div>

                                    {/* Brief reason */}
                                    <p className="mt-2 text-sm text-gray-600 line-clamp-1">
                                        <FaExclamationTriangle className="inline text-amber-400 mr-1" />
                                        {report.reason}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        {new Date(report.createdAt).toLocaleDateString('bn-BD', {
                                            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                    </p>
                                </div>

                                {/* Expanded Details */}
                                {isExpanded && (
                                    <div className="border-t border-gray-100 bg-gray-50/50">
                                        <div className="p-5 space-y-5">
                                            {/* Two column: reported user + reporter */}
                                            <div className="grid md:grid-cols-2 gap-5">
                                                {/* Reported User Details */}
                                                <div className="bg-white rounded-lg p-4 border border-gray-100">
                                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">রিপোর্টকৃত সদস্য</h4>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                                            <FaUser className="text-gray-400 flex-shrink-0" />
                                                            <span>{reported?.fullName}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                                            <FaEnvelope className="text-gray-400 flex-shrink-0" />
                                                            <span className="truncate">{reported?.email}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                                            <FaPhone className="text-gray-400 flex-shrink-0" />
                                                            <span>{reported?.phone}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                                            <FaTint className="text-red-400 flex-shrink-0" />
                                                            <span>{reported?.bloodGroup}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <FaFlag className="text-red-400 flex-shrink-0" />
                                                            <span className="text-red-600 font-medium">মোট রিপোর্ট: {reported?.reportCount || 0}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Reporter Details */}
                                                <div className="bg-white rounded-lg p-4 border border-gray-100">
                                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">রিপোর্টকারী</h4>
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                                            {reporter?.profileImageUrl ? (
                                                                <Image
                                                                    src={reporter.profileImageUrl}
                                                                    alt={reporter.fullName}
                                                                    width={40}
                                                                    height={40}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold">
                                                                    {reporter?.fullName?.charAt(0) || '?'}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-800 text-sm">{reporter?.fullName}</p>
                                                            <p className="text-xs text-gray-500">{reporter?.email}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Report Reason & Description */}
                                            <div className="bg-white rounded-lg p-4 border border-gray-100">
                                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">রিপোর্টের কারণ</h4>
                                                <p className="text-sm text-gray-800 font-medium mb-1">{report.reason}</p>
                                                {report.description && (
                                                    <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                        {report.description}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Admin Note */}
                                            {report.adminNote && (
                                                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                                                    <h4 className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                                                        <FaStickyNote /> অ্যাডমিন নোট
                                                    </h4>
                                                    <p className="text-sm text-blue-800">{report.adminNote}</p>
                                                </div>
                                            )}

                                            {/* Action Section */}
                                            <div className="bg-white rounded-lg p-4 border border-gray-100">
                                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">অ্যাকশন</h4>

                                                {/* Admin note input */}
                                                <div className="mb-4">
                                                    <textarea
                                                        placeholder="অ্যাডমিন নোট লিখুন (ঐচ্ছিক)..."
                                                        className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                                                        rows={2}
                                                        value={adminNotes[report._id] || ''}
                                                        onChange={(e) => setAdminNotes(prev => ({ ...prev, [report._id]: e.target.value }))}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                </div>

                                                {/* Status buttons */}
                                                <div className="flex flex-wrap gap-2">
                                                    {report.status !== 'reviewed' && (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleStatusUpdate(report._id, 'reviewed'); }}
                                                            disabled={updatingId === report._id}
                                                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                                        >
                                                            <FaEye /> পর্যালোচিত
                                                        </button>
                                                    )}
                                                    {report.status !== 'resolved' && (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleStatusUpdate(report._id, 'resolved'); }}
                                                            disabled={updatingId === report._id}
                                                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                                        >
                                                            <FaCheckCircle /> সমাধান
                                                        </button>
                                                    )}
                                                    {report.status !== 'dismissed' && (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleStatusUpdate(report._id, 'dismissed'); }}
                                                            disabled={updatingId === report._id}
                                                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                                                        >
                                                            <FaTimesCircle /> বাতিল
                                                        </button>
                                                    )}
                                                    {report.status !== 'pending' && (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleStatusUpdate(report._id, 'pending'); }}
                                                            disabled={updatingId === report._id}
                                                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50"
                                                        >
                                                            <FaClock /> অপেক্ষমান
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <FaFlag className="mx-auto text-gray-300 text-5xl mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-1">কোনো রিপোর্ট পাওয়া যায়নি</h3>
                    <p className="text-gray-400 text-sm">
                        {statusFilter ? 'এই ফিল্টারে কোনো রিপোর্ট নেই' : 'আপনার সংগঠনের সদস্যদের বিরুদ্ধে কোনো রিপোর্ট নেই'}
                    </p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        পেজ <span className="font-medium">{currentPage}</span> / <span className="font-medium">{totalPages}</span> (মোট {total} রিপোর্ট)
                    </p>
                    <nav className="inline-flex rounded-lg shadow-sm -space-x-px">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 rounded-l-lg border border-gray-200 bg-white text-sm ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            আগে
                        </button>
                        {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                            const pageNum = i + 1
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`px-4 py-2 border border-gray-200 text-sm ${currentPage === pageNum ? 'bg-red-50 border-red-500 text-red-600 font-medium z-10' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {pageNum}
                                </button>
                            )
                        })}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-2 rounded-r-lg border border-gray-200 bg-white text-sm ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            পরে
                        </button>
                    </nav>
                </div>
            )}
        </div>
    )
}

export default OrgReportsPage
