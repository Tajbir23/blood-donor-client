"use client"

import { getAiTrainingData, deleteAiTrainingData } from "@/app/actions/administrator/system/dashboardAction"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { User } from "@/lib/types/userType"
import { FaBrain, FaTrash, FaChevronLeft, FaChevronRight, FaSearch, FaPlus } from "react-icons/fa"
import AiTrainModal from "@/components/dashboard/ai/AiTrainModal"

interface UserQueryData { user: User }

interface TrainingEntry {
    _id: string
    questionText: string
    answerText: string
    intent: string
    sourcePlatform?: string
    sourceMessageId?: string
    addedBy: string
    createdAt: string
}

interface TrainingResponse {
    success: boolean
    data: TrainingEntry[]
    pagination: { total: number; page: number; limit: number; totalPages: number }
}

const INTENT_COLORS: Record<string, string> = {
    FIND_BLOOD:      "bg-red-100 text-red-700",
    REGISTER_DONOR:  "bg-green-100 text-green-700",
    UPDATE_DONATION: "bg-blue-100 text-blue-700",
    REQUEST_BLOOD:   "bg-orange-100 text-orange-700",
    BLOOD_INFO:      "bg-purple-100 text-purple-700",
    GREET:           "bg-yellow-100 text-yellow-700",
    HELP:            "bg-gray-100 text-gray-700",
    UNKNOWN:         "bg-pink-100 text-pink-700",
}

const PLATFORM_ICONS: Record<string, string> = {
    telegram: "🛩️ Telegram",
    facebook: "📘 Facebook",
}

const AiTrainingPage = () => {
    const queryClient = useQueryClient()
    const [page, setPage]         = useState(1)
    const [search, setSearch]     = useState("")
    const [modalOpen, setModal]   = useState(false)
    const [deletingId, setDel]    = useState<string | null>(null)
    const limit = 20

    const user = useMemo(() => queryClient.getQueryData<UserQueryData>(["user"]), [queryClient])

    if (user?.user?.role !== "superAdmin") {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-red-500 font-medium">এই page শুধুমাত্র Super Admin দেখতে পারবেন।</p>
            </div>
        )
    }

    const { data, isLoading, refetch } = useQuery<TrainingResponse>({
        queryKey: ["ai-training", page, search],
        queryFn: () => getAiTrainingData({ page, limit, search }),
        staleTime: 1000 * 30,
    })

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteAiTrainingData(id),
        onSuccess: () => { setDel(null); refetch() },
    })

    const entries     = data?.data || []
    const pagination  = data?.pagination

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <FaBrain className="text-purple-600 text-3xl" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">AI Training Data</h1>
                        <p className="text-sm text-gray-500">Bot user দের message ব্যবহার করে AI কে train করুন</p>
                    </div>
                </div>
                <button
                    onClick={() => setModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700"
                >
                    <FaPlus /> নতুন Training Data
                </button>
            </div>

            {/* Info banner */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6 text-sm text-purple-800">
                <strong>কিভাবে কাজ করে:</strong> Bot user কোনো message পাঠালে সেই message কে training data হিসেবে যোগ করুন। AI সেই প্রশ্নের উত্তর শিখে নেবে এবং model retrain হবে (background এ চলবে)।
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1 max-w-sm">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                        type="text"
                        placeholder="প্রশ্ন, উত্তর বা intent দিয়ে খুঁজুন..."
                        value={search}
                        onChange={e => { setSearch(e.target.value); setPage(1) }}
                        className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>
                {pagination && (
                    <p className="text-sm text-gray-500">
                        মোট <span className="font-semibold text-gray-700">{pagination.total}</span> টি entry
                    </p>
                )}
            </div>

            {/* Table */}
            {isLoading ? (
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-lg" />
                    ))}
                </div>
            ) : entries.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <FaBrain className="text-6xl mx-auto mb-3 text-gray-200" />
                    <p>কোনো training data পাওয়া যায়নি।</p>
                    <p className="text-sm mt-1">Facebook বা Telegram message page থেকে training data যোগ করুন।</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl shadow">
                    <table className="w-full text-sm bg-white">
                        <thead className="bg-purple-50 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 text-left">প্রশ্ন</th>
                                <th className="px-4 py-3 text-left">উত্তর</th>
                                <th className="px-4 py-3 text-left">Intent</th>
                                <th className="px-4 py-3 text-left">Platform</th>
                                <th className="px-4 py-3 text-left">তারিখ</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {entries.map(entry => (
                                <tr key={entry._id} className="hover:bg-purple-50 transition-colors">
                                    <td className="px-4 py-3 max-w-[220px]">
                                        <p className="line-clamp-2 text-gray-800">{entry.questionText}</p>
                                    </td>
                                    <td className="px-4 py-3 max-w-[260px]">
                                        <p className="line-clamp-2 text-gray-600">{entry.answerText}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${INTENT_COLORS[entry.intent] || "bg-gray-100 text-gray-700"}`}>
                                            {entry.intent}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-gray-500">
                                        {entry.sourcePlatform ? PLATFORM_ICONS[entry.sourcePlatform] || entry.sourcePlatform : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                                        {new Date(entry.createdAt).toLocaleString("bn-BD", { dateStyle: "short", timeStyle: "short" })}
                                    </td>
                                    <td className="px-4 py-3">
                                        {deletingId === entry._id ? (
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500">নিশ্চিত?</span>
                                                <button
                                                    onClick={() => deleteMutation.mutate(entry._id)}
                                                    disabled={deleteMutation.isPending}
                                                    className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                                                >
                                                    {deleteMutation.isPending ? "…" : "হ্যাঁ"}
                                                </button>
                                                <button onClick={() => setDel(null)} className="text-xs px-2 py-1 border rounded text-gray-500 hover:bg-gray-50">না</button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setDel(entry._id)}
                                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-6">
                    <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-50">
                        <FaChevronLeft size={12} /> আগে
                    </button>
                    <span className="text-sm text-gray-600">{page} / {pagination.totalPages}</span>
                    <button disabled={page === pagination.totalPages} onClick={() => setPage(p => p + 1)}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-50">
                        পরে <FaChevronRight size={12} />
                    </button>
                </div>
            )}

            {/* Add Modal */}
            <AiTrainModal
                isOpen={modalOpen}
                onClose={() => setModal(false)}
                onSuccess={() => refetch()}
            />
        </div>
    )
}

export default AiTrainingPage
