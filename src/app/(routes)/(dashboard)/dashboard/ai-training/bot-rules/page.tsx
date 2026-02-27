"use client"

import { getBotRules, addBotRule, updateBotRule, deleteBotRule } from "@/app/actions/administrator/system/dashboardAction"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useMemo } from "react"
import { FaRobot, FaPlus, FaTrash, FaEdit, FaToggleOn, FaToggleOff, FaSearch } from "react-icons/fa"
import { User } from "@/lib/types/userType"

interface UserQueryData { user: User }

interface BotRule {
    _id: string
    trigger: string
    response: string
    matchType: "exact" | "contains" | "startsWith" | "regex"
    platform: "all" | "telegram" | "facebook"
    isActive: boolean
    addedBy: string
    createdAt: string
}

const MATCH_LABELS: Record<string, string> = {
    contains:   "যেকোনো জায়গায় থাকলে",
    exact:      "হুবহু মিললে",
    startsWith: "শুরুতে থাকলে",
    regex:      "Regex প্যাটার্ন",
}
const PLATFORM_LABELS: Record<string, string> = {
    all:      "সব প্ল্যাটফর্ম",
    telegram: "শুধু Telegram",
    facebook: "শুধু Facebook",
}

const EMPTY_FORM = { trigger: "", response: "", matchType: "contains", platform: "all" }

export default function BotRulesPage() {
    const queryClient = useQueryClient()
    const user = useMemo(() => queryClient.getQueryData<UserQueryData>(["user"]), [queryClient])

    const [search, setSearch]       = useState("")
    const [showForm, setShowForm]   = useState(false)
    const [editing, setEditing]     = useState<BotRule | null>(null)
    const [form, setForm]           = useState({ ...EMPTY_FORM })
    const [deletingId, setDel]      = useState<string | null>(null)

    if (user?.user?.role !== "superAdmin") {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-red-500 font-medium">এই page শুধুমাত্র Super Admin দেখতে পারবেন।</p>
            </div>
        )
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["bot-rules", search],
        queryFn: () => getBotRules({ search }),
        staleTime: 1000 * 30,
    })
    const rules: BotRule[] = data?.data || []

    const addMutation = useMutation({
        mutationFn: (d: typeof EMPTY_FORM) => addBotRule(d),
        onSuccess: () => { setShowForm(false); setForm({ ...EMPTY_FORM }); refetch() },
    })
    const updateMutation = useMutation({
        mutationFn: ({ id, d }: { id: string; d: Partial<BotRule> }) => updateBotRule(id, d),
        onSuccess: () => { setEditing(null); setForm({ ...EMPTY_FORM }); refetch() },
    })
    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteBotRule(id),
        onSuccess: () => { setDel(null); refetch() },
    })

    function openAdd() {
        setEditing(null)
        setForm({ ...EMPTY_FORM })
        setShowForm(true)
    }
    function openEdit(rule: BotRule) {
        setEditing(rule)
        setForm({ trigger: rule.trigger, response: rule.response, matchType: rule.matchType, platform: rule.platform })
        setShowForm(true)
    }
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!form.trigger.trim() || !form.response.trim()) return
        if (editing) {
            updateMutation.mutate({ id: editing._id, d: form })
        } else {
            addMutation.mutate(form)
        }
    }
    const isBusy = addMutation.isPending || updateMutation.isPending

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-xl">
                        <FaRobot className="text-blue-600 text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">কাস্টম Bot Rules</h1>
                        <p className="text-gray-500 text-sm">যদি user এটা লেখে → bot ওইটা বলবে</p>
                    </div>
                </div>
                <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition font-medium">
                    <FaPlus /> নতুন Rule
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-5">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                    placeholder="Trigger খুঁজুন..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {/* Add/Edit Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6 space-y-4">
                    <h2 className="font-semibold text-blue-800 text-lg">{editing ? "Rule সম্পাদনা" : "নতুন Rule যোগ করুন"}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                🎯 Trigger — User কী লিখলে?
                            </label>
                            <input
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="যেমন: রক্তের দাম কত"
                                value={form.trigger}
                                onChange={e => setForm(f => ({ ...f, trigger: e.target.value }))}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Match ধরন</label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                                    value={form.matchType}
                                    onChange={e => setForm(f => ({ ...f, matchType: e.target.value }))}
                                >
                                    {Object.entries(MATCH_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                                    value={form.platform}
                                    onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}
                                >
                                    {Object.entries(PLATFORM_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            💬 Response — Bot কী বলবে?
                        </label>
                        <textarea
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 min-h-[100px] resize-y"
                            placeholder="যেমন: রক্তদান সম্পূর্ণ বিনামূল্যে। কোনো টাকা দিতে হয় না।"
                            value={form.response}
                            onChange={e => setForm(f => ({ ...f, response: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="flex gap-3">
                        <button type="submit" disabled={isBusy}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-60">
                            {isBusy ? "সংরক্ষণ হচ্ছে..." : editing ? "আপডেট করুন" : "যোগ করুন"}
                        </button>
                        <button type="button" onClick={() => setShowForm(false)}
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition">
                            বাতিল
                        </button>
                    </div>
                </form>
            )}

            {/* List */}
            {isLoading ? (
                <div className="text-center py-12 text-gray-500">লোড হচ্ছে...</div>
            ) : rules.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <FaRobot className="text-5xl mx-auto mb-3 opacity-30" />
                    <p>কোনো rule নেই। উপরে <b>নতুন Rule</b> বোতামে ক্লিক করুন।</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {rules.map(rule => (
                        <div key={rule._id}
                            className={`bg-white border rounded-xl p-4 flex flex-col sm:flex-row sm:items-start gap-4 shadow-sm transition ${!rule.isActive ? "opacity-50" : ""}`}>
                            {/* Left: trigger → response */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{MATCH_LABELS[rule.matchType]}</span>
                                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{PLATFORM_LABELS[rule.platform]}</span>
                                    {!rule.isActive && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">বন্ধ</span>}
                                </div>
                                <p className="font-semibold text-gray-800 truncate">
                                    🎯 &ldquo;{rule.trigger}&rdquo;
                                </p>
                                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                    💬 {rule.response}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 shrink-0">
                                {/* Toggle active */}
                                <button
                                    onClick={() => updateMutation.mutate({ id: rule._id, d: { isActive: !rule.isActive } })}
                                    className="text-gray-500 hover:text-blue-600 transition text-xl"
                                    title={rule.isActive ? "বন্ধ করুন" : "চালু করুন"}
                                >
                                    {rule.isActive ? <FaToggleOn className="text-green-500" /> : <FaToggleOff />}
                                </button>

                                <button onClick={() => openEdit(rule)}
                                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                    <FaEdit />
                                </button>

                                {deletingId === rule._id ? (
                                    <div className="flex gap-1">
                                        <button onClick={() => deleteMutation.mutate(rule._id)}
                                            className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                                            {deleteMutation.isPending ? "..." : "হ্যাঁ"}
                                        </button>
                                        <button onClick={() => setDel(null)}
                                            className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">
                                            না
                                        </button>
                                    </div>
                                ) : (
                                    <button onClick={() => setDel(rule._id)}
                                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                                        <FaTrash />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
