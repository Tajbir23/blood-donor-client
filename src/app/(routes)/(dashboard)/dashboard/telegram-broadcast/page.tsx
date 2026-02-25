"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { FaTelegram, FaFilter, FaPaperPlane, FaUsers, FaSpinner, FaTimes } from "react-icons/fa"
import {
    getTgBroadcastLocations,
    getTgBroadcastCount,
    sendTgBroadcast,
    TgBroadcastFilters,
} from "@/app/actions/administrator/system/dashboardAction"
import { User } from "@/lib/types/userType"

interface UserQueryData { user: User }

interface LocationItem { id: string; name: string }

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

// ─── helpers ─────────────────────────────────────────────────────────────────

function filtersToPayload(f: FilterState): TgBroadcastFilters {
    const out: TgBroadcastFilters = {}
    if (f.bloodGroups.length) out.bloodGroup = f.bloodGroups.join(",")
    if (f.divisionId) out.divisionId = f.divisionId
    if (f.districtId) out.districtId = f.districtId
    if (f.thanaId)    out.thanaId    = f.thanaId
    if (f.neverDonated) out.neverDonated = true
    if (!f.neverDonated && f.lastDonationFrom) out.lastDonationFrom = f.lastDonationFrom
    if (!f.neverDonated && f.lastDonationTo)   out.lastDonationTo   = f.lastDonationTo
    if (f.registeredFrom) out.registeredFrom = f.registeredFrom
    if (f.registeredTo)   out.registeredTo   = f.registeredTo
    return out
}

interface FilterState {
    bloodGroups: string[]
    divisionId: string
    districtId: string
    thanaId: string
    neverDonated: boolean
    lastDonationFrom: string
    lastDonationTo: string
    registeredFrom: string
    registeredTo: string
}

const INIT_FILTER: FilterState = {
    bloodGroups: [],
    divisionId: "",
    districtId: "",
    thanaId: "",
    neverDonated: false,
    lastDonationFrom: "",
    lastDonationTo: "",
    registeredFrom: "",
    registeredTo: "",
}

// ─── component ───────────────────────────────────────────────────────────────

export default function TelegramBroadcastPage() {
    const queryClient = useQueryClient()
    const user = useMemo(() => queryClient.getQueryData<UserQueryData>(["user"]), [queryClient])

    // location data
    const [divisions, setDivisions] = useState<LocationItem[]>([])
    const [districts, setDistricts] = useState<LocationItem[]>([])
    const [thanas,    setThanas]    = useState<LocationItem[]>([])

    // filters
    const [filters, setFilters] = useState<FilterState>(INIT_FILTER)

    // count state
    const [count,        setCount]        = useState<number | null>(null)
    const [countLoading, setCountLoading] = useState(false)

    // message
    const [message,  setMessage]  = useState("")

    // send state
    const [sending,    setSending]    = useState(false)
    const [sendResult, setSendResult] = useState<{ success: boolean; total?: number; message?: string } | null>(null)

    // confirm modal
    const [showConfirm, setShowConfirm] = useState(false)

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // ── access guard ──────────────────────────────────────────────────────────
    if (user?.user?.role !== "superAdmin") {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-red-500 font-medium">এই page শুধুমাত্র Super Admin দেখতে পারবেন।</p>
            </div>
        )
    }

    // ── load divisions on mount ───────────────────────────────────────────────
    useEffect(() => {
        getTgBroadcastLocations({}).then(r => {
            if (r?.success) setDivisions(r.data)
        })
    }, [])

    // ── load districts when division changes ─────────────────────────────────
    useEffect(() => {
        setDistricts([])
        setThanas([])
        setFilters(f => ({ ...f, districtId: "", thanaId: "" }))
        if (!filters.divisionId) return
        getTgBroadcastLocations({ divisionId: filters.divisionId }).then(r => {
            if (r?.success) setDistricts(r.data)
        })
    }, [filters.divisionId])

    // ── load thanas when district changes ─────────────────────────────────────
    useEffect(() => {
        setThanas([])
        setFilters(f => ({ ...f, thanaId: "" }))
        if (!filters.districtId || !filters.divisionId) return
        getTgBroadcastLocations({ divisionId: filters.divisionId, districtId: filters.districtId }).then(r => {
            if (r?.success) setThanas(r.data)
        })
    }, [filters.districtId])

    // ── debounced count fetch ─────────────────────────────────────────────────
    const fetchCount = useCallback((f: FilterState) => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(async () => {
            setCountLoading(true)
            try {
                const res = await getTgBroadcastCount(filtersToPayload(f))
                if (res?.success) setCount(res.count)
            } finally {
                setCountLoading(false)
            }
        }, 600)
    }, [])

    useEffect(() => { fetchCount(filters) }, [filters, fetchCount])

    // ── handlers ──────────────────────────────────────────────────────────────
    const toggleBloodGroup = (bg: string) => {
        setFilters(f => ({
            ...f,
            bloodGroups: f.bloodGroups.includes(bg)
                ? f.bloodGroups.filter(x => x !== bg)
                : [...f.bloodGroups, bg],
        }))
    }

    const handleSendConfirm = async () => {
        setShowConfirm(false)
        setSending(true)
        setSendResult(null)
        try {
            const res = await sendTgBroadcast(filtersToPayload(filters), message)
            setSendResult(res)
        } finally {
            setSending(false)
        }
    }

    const resetAll = () => {
        setFilters(INIT_FILTER)
        setMessage("")
        setSendResult(null)
        setCount(null)
    }

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <FaTelegram className="text-blue-500 text-3xl" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Telegram Broadcast</h1>
                        <p className="text-sm text-gray-500">Filter করে Telegram user দেরকে message পাঠান</p>
                    </div>
                </div>
                <button onClick={resetAll} className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1">
                    <FaTimes /> Reset
                </button>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-800">
                <strong>কিভাবে কাজ করে:</strong> নিচের filter গুলো দিয়ে target user বেছে নিন। Message লিখে Send করুন — message গুলো background এ ধীরে ধীরে পাঠানো হবে (Telegram rate limit অনুযায়ী)। HTML formatting সাপোর্টেড: <code>&lt;b&gt;bold&lt;/b&gt;, &lt;i&gt;italic&lt;/i&gt;, &lt;a href=&quot;…&quot;&gt;link&lt;/a&gt;</code>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ── Left: Filters ── */}
                <div className="lg:col-span-2 space-y-5">

                    {/* Blood group */}
                    <FilterCard title="রক্তের গ্রুপ" icon="🩸">
                        <p className="text-xs text-gray-500 mb-2">কোনো গ্রুপ select না করলে সব group এ যাবে</p>
                        <div className="flex flex-wrap gap-2">
                            {BLOOD_GROUPS.map(bg => (
                                <button
                                    key={bg}
                                    onClick={() => toggleBloodGroup(bg)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                                        filters.bloodGroups.includes(bg)
                                            ? "bg-red-600 text-white border-red-600"
                                            : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
                                    }`}
                                >
                                    {bg}
                                </button>
                            ))}
                        </div>
                    </FilterCard>

                    {/* Location */}
                    <FilterCard title="অবস্থান" icon="📍">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">বিভাগ</label>
                                <select
                                    value={filters.divisionId}
                                    onChange={e => setFilters(f => ({ ...f, divisionId: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                >
                                    <option value="">সব বিভাগ</option>
                                    {divisions.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">জেলা</label>
                                <select
                                    value={filters.districtId}
                                    onChange={e => setFilters(f => ({ ...f, districtId: e.target.value }))}
                                    disabled={!filters.divisionId}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm disabled:opacity-50"
                                >
                                    <option value="">সব জেলা</option>
                                    {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">থানা/উপজেলা</label>
                                <select
                                    value={filters.thanaId}
                                    onChange={e => setFilters(f => ({ ...f, thanaId: e.target.value }))}
                                    disabled={!filters.districtId}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm disabled:opacity-50"
                                >
                                    <option value="">সব থানা</option>
                                    {thanas.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </FilterCard>

                    {/* Donation date */}
                    <FilterCard title="সর্বশেষ দানের তারিখ" icon="📅">
                        <div className="flex items-center gap-2 mb-3">
                            <input
                                type="checkbox"
                                id="neverDonated"
                                checked={filters.neverDonated}
                                onChange={e => setFilters(f => ({ ...f, neverDonated: e.target.checked }))}
                                className="accent-red-600"
                            />
                            <label htmlFor="neverDonated" className="text-sm text-gray-700 cursor-pointer">
                                কখনো দান করেনি (lastDonationDate নেই)
                            </label>
                        </div>
                        {!filters.neverDonated && (
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">থেকে</label>
                                    <input
                                        type="date"
                                        value={filters.lastDonationFrom}
                                        onChange={e => setFilters(f => ({ ...f, lastDonationFrom: e.target.value }))}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">পর্যন্ত</label>
                                    <input
                                        type="date"
                                        value={filters.lastDonationTo}
                                        onChange={e => setFilters(f => ({ ...f, lastDonationTo: e.target.value }))}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                    />
                                </div>
                            </div>
                        )}
                    </FilterCard>

                    {/* Registration date */}
                    <FilterCard title="Registration তারিখ" icon="📋">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">থেকে</label>
                                <input
                                    type="date"
                                    value={filters.registeredFrom}
                                    onChange={e => setFilters(f => ({ ...f, registeredFrom: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">পর্যন্ত</label>
                                <input
                                    type="date"
                                    value={filters.registeredTo}
                                    onChange={e => setFilters(f => ({ ...f, registeredTo: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                />
                            </div>
                        </div>
                    </FilterCard>

                    {/* Message */}
                    <FilterCard title="Message" icon="✉️">
                        <textarea
                            rows={6}
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder={"এখানে message লিখুন...\n\nHTML সাপোর্টেড:\n<b>bold</b>, <i>italic</i>, <a href=\"https://...\">link</a>"}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:border-blue-400"
                        />
                        <p className="text-xs text-gray-400 text-right mt-1">{message.length} chars</p>
                    </FilterCard>
                </div>

                {/* ── Right: Summary + Send ── */}
                <div className="space-y-4">
                    {/* Active filters summary */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <FaFilter className="text-blue-500" /> Active Filters
                        </h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <FilterBadge label="Blood group" value={filters.bloodGroups.join(", ") || "সব"} />
                            <FilterBadge label="বিভাগ"      value={divisions.find(d => d.id === filters.divisionId)?.name || "সব"} />
                            <FilterBadge label="জেলা"       value={districts.find(d => d.id === filters.districtId)?.name || "সব"} />
                            <FilterBadge label="থানা"       value={thanas.find(t => t.id === filters.thanaId)?.name || "সব"} />
                            {filters.neverDonated && <FilterBadge label="দান" value="কখনো করেনি" />}
                            {!filters.neverDonated && (filters.lastDonationFrom || filters.lastDonationTo) && (
                                <FilterBadge label="শেষ দান" value={`${filters.lastDonationFrom || "—"} → ${filters.lastDonationTo || "—"}`} />
                            )}
                            {(filters.registeredFrom || filters.registeredTo) && (
                                <FilterBadge label="Reg." value={`${filters.registeredFrom || "—"} → ${filters.registeredTo || "—"}`} />
                            )}
                        </ul>
                    </div>

                    {/* Count badge */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                        <FaUsers className="text-blue-400 text-3xl mx-auto mb-2" />
                        <p className="text-xs text-gray-500 mb-1">Matching Users</p>
                        {countLoading ? (
                            <FaSpinner className="animate-spin text-blue-500 text-2xl mx-auto" />
                        ) : (
                            <span className="text-4xl font-bold text-blue-600">{count ?? "—"}</span>
                        )}
                        <p className="text-xs text-gray-400 mt-1">জন user পাবেন এই message</p>
                    </div>

                    {/* Send button */}
                    <button
                        disabled={sending || !message.trim() || count === 0}
                        onClick={() => setShowConfirm(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {sending ? (
                            <><FaSpinner className="animate-spin" /> Sending…</>
                        ) : (
                            <><FaPaperPlane /> Broadcast পাঠান</>
                        )}
                    </button>

                    {/* Result */}
                    {sendResult && (
                        <div className={`rounded-xl p-4 text-sm ${sendResult.success ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}>
                            {sendResult.success
                                ? `✅ ${sendResult.total} জন user এর কাছে message পাঠানো শুরু হয়েছে (background এ চলছে)`
                                : `❌ ${sendResult.message || "কোনো সমস্যা হয়েছে"}`}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Confirm Modal ── */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-2">Broadcast confirm করুন</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            আপনি <strong>{count}</strong> জন Telegram user এর কাছে নিচের message পাঠাতে যাচ্ছেন:
                        </p>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto mb-5">
                            {message}
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                বাতিল
                            </button>
                            <button
                                onClick={handleSendConfirm}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                            >
                                ✓ হ্যাঁ, পাঠাও
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

// ─── tiny sub-components ──────────────────────────────────────────────────────

function FilterCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-700 mb-3">{icon} {title}</h3>
            {children}
        </div>
    )
}

function FilterBadge({ label, value }: { label: string; value: string }) {
    return (
        <li className="flex justify-between">
            <span className="text-gray-400">{label}:</span>
            <span className="font-medium text-right max-w-[60%] truncate" title={value}>{value}</span>
        </li>
    )
}
