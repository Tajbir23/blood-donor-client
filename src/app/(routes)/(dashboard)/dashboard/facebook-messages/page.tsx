"use client"

import { getFacebookMessages } from "@/app/actions/administrator/system/dashboardAction"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { User } from "@/lib/types/userType"
import { FaFacebook, FaChevronLeft, FaChevronRight } from "react-icons/fa"

interface UserQueryData {
    user: User
}

interface FacebookMessage {
    _id: string
    psId: string
    messageText?: string
    postback?: string
    quickReplyPayload?: string
    direction: "incoming" | "outgoing"
    botReply?: string
    createdAt: string
}

interface MessagesResponse {
    success: boolean
    data: FacebookMessage[]
    pagination: {
        total: number
        page: number
        limit: number
        totalPages: number
    }
}

const FacebookMessagesPage = () => {
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1)
    const [psIdFilter, setPsIdFilter] = useState("")
    const [directionFilter, setDirectionFilter] = useState("")
    const limit = 20

    const user = useMemo(() => {
        return queryClient.getQueryData<UserQueryData>(["user"])
    }, [queryClient])

    if (user?.user?.role !== "superAdmin") {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-red-500 font-medium">এই page শুধুমাত্র Super Admin দেখতে পারবেন।</p>
            </div>
        )
    }

    const { data, isLoading } = useQuery<MessagesResponse>({
        queryKey: ["facebook-messages", page, psIdFilter, directionFilter],
        queryFn: () => getFacebookMessages({ page, limit, psId: psIdFilter, direction: directionFilter }),
        staleTime: 1000 * 30,
    })

    const messages = data?.data || []
    const pagination = data?.pagination

    return (
        <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <FaFacebook className="text-blue-600 text-3xl" />
                <h1 className="text-2xl font-bold text-gray-800">Facebook Webhook Messages</h1>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
                <input
                    type="text"
                    placeholder="PSID দিয়ে filter করুন..."
                    value={psIdFilter}
                    onChange={(e) => { setPsIdFilter(e.target.value); setPage(1) }}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-72"
                />
                <select
                    value={directionFilter}
                    onChange={(e) => { setDirectionFilter(e.target.value); setPage(1) }}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">সব direction</option>
                    <option value="incoming">Incoming</option>
                    <option value="outgoing">Outgoing</option>
                </select>
            </div>

            {/* Stats */}
            {pagination && (
                <p className="text-sm text-gray-500 mb-4">
                    মোট <span className="font-semibold text-gray-700">{pagination.total}</span> টি message
                </p>
            )}

            {/* Table */}
            {isLoading ? (
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-lg" />
                    ))}
                </div>
            ) : messages.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <FaFacebook className="text-6xl mx-auto mb-3 text-gray-200" />
                    <p>কোনো message পাওয়া যায়নি</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl shadow">
                    <table className="w-full text-sm bg-white">
                        <thead className="bg-blue-50 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 text-left">PSID</th>
                                <th className="px-4 py-3 text-left">Message</th>
                                <th className="px-4 py-3 text-left">Postback</th>
                                <th className="px-4 py-3 text-left">Quick Reply</th>
                                <th className="px-4 py-3 text-left">Direction</th>
                                <th className="px-4 py-3 text-left">সময়</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {messages.map((msg) => (
                                <tr key={msg._id} className="hover:bg-blue-50 transition-colors">
                                    <td className="px-4 py-3 font-mono text-xs text-gray-500 max-w-[120px] truncate">
                                        {msg.psId}
                                    </td>
                                    <td className="px-4 py-3 max-w-[200px] truncate">
                                        {msg.messageText || <span className="text-gray-300">—</span>}
                                    </td>
                                    <td className="px-4 py-3 max-w-[150px] truncate text-purple-600 text-xs">
                                        {msg.postback || <span className="text-gray-300">—</span>}
                                    </td>
                                    <td className="px-4 py-3 max-w-[150px] truncate text-orange-500 text-xs">
                                        {msg.quickReplyPayload || <span className="text-gray-300">—</span>}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            msg.direction === "incoming"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-blue-100 text-blue-700"
                                        }`}>
                                            {msg.direction === "incoming" ? "↙ Incoming" : "↗ Outgoing"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                                        {new Date(msg.createdAt).toLocaleString("bn-BD", {
                                            dateStyle: "short",
                                            timeStyle: "short",
                                        })}
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
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-50"
                    >
                        <FaChevronLeft size={12} /> আগে
                    </button>
                    <span className="text-sm text-gray-600">
                        {page} / {pagination.totalPages}
                    </span>
                    <button
                        disabled={page === pagination.totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-50"
                    >
                        পরে <FaChevronRight size={12} />
                    </button>
                </div>
            )}
        </div>
    )
}

export default FacebookMessagesPage
