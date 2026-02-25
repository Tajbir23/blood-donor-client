"use client"

import { useState } from "react"
import { FaBrain, FaTimes } from "react-icons/fa"
import { addAiTrainingData } from "@/app/actions/administrator/system/dashboardAction"

const INTENTS = [
    { value: "FIND_BLOOD",      label: "🔍 FIND_BLOOD – রক্তদাতা খোঁজা" },
    { value: "REGISTER_DONOR",  label: "📝 REGISTER_DONOR – ডোনার নিবন্ধন" },
    { value: "UPDATE_DONATION", label: "🔄 UPDATE_DONATION – ডোনেশন আপডেট" },
    { value: "REQUEST_BLOOD",   label: "🩺 REQUEST_BLOOD – রক্তের আবেদন" },
    { value: "BLOOD_INFO",      label: "ℹ️ BLOOD_INFO – রক্তদান তথ্য" },
    { value: "GREET",           label: "👋 GREET – অভিবাদন" },
    { value: "HELP",            label: "❓ HELP – সাহায্য" },
    { value: "UNKNOWN",         label: "❔ UNKNOWN – অজানা" },
]

interface Props {
    isOpen: boolean
    onClose: () => void
    initialQuestion?: string
    sourceMessageId?: string
    sourcePlatform?: "telegram" | "facebook"
    onSuccess?: () => void
}

const AiTrainModal = ({ isOpen, onClose, initialQuestion = "", sourceMessageId, sourcePlatform, onSuccess }: Props) => {
    const [question, setQuestion] = useState(initialQuestion)
    const [answer,   setAnswer]   = useState("")
    const [intent,   setIntent]   = useState("BLOOD_INFO")
    const [loading,  setLoading]  = useState(false)
    const [result,   setResult]   = useState<{ ok: boolean; msg: string } | null>(null)

    const handleSubmit = async () => {
        if (!question.trim() || !answer.trim()) {
            setResult({ ok: false, msg: "প্রশ্ন এবং উত্তর দুটোই দিতে হবে।" })
            return
        }
        setLoading(true)
        setResult(null)
        try {
            const res = await addAiTrainingData({
                questionText:    question.trim(),
                answerText:      answer.trim(),
                intent,
                sourceMessageId,
                sourcePlatform,
            })
            if (res?.success) {
                setResult({ ok: true, msg: "✅ Training data সফলভাবে যোগ হয়েছে! Model retrain শুরু হয়েছে।" })
                setAnswer("")
                onSuccess?.()
                setTimeout(onClose, 1800)
            } else {
                setResult({ ok: false, msg: res?.message || "সমস্যা হয়েছে।" })
            }
        } catch {
            setResult({ ok: false, msg: "Network error।" })
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b">
                    <div className="flex items-center gap-2">
                        <FaBrain className="text-purple-600 text-xl" />
                        <h2 className="text-lg font-bold text-gray-800">AI কে Train করুন</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FaTimes />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">
                    {/* Question */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            প্রশ্ন (Bot User এর Message)
                        </label>
                        <textarea
                            rows={2}
                            value={question}
                            onChange={e => setQuestion(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                            placeholder="User যা জিজ্ঞেস করেছেন..."
                        />
                    </div>

                    {/* Intent */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Intent (এই message টি কোন বিভাগের?)
                        </label>
                        <select
                            value={intent}
                            onChange={e => setIntent(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            {INTENTS.map(i => (
                                <option key={i.value} value={i.value}>{i.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Answer */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            উত্তর (AI যেভাবে এই প্রশ্নের উত্তর দেবে)
                        </label>
                        <textarea
                            rows={4}
                            value={answer}
                            onChange={e => setAnswer(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                            placeholder="AI এর উত্তর এখানে লিখুন..."
                        />
                    </div>

                    {/* Result message */}
                    {result && (
                        <p className={`text-sm font-medium rounded-lg px-3 py-2 ${result.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                            {result.msg}
                        </p>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-5 border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                    >
                        বাতিল
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-5 py-2 text-sm rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50"
                    >
                        {loading ? "সংরক্ষণ হচ্ছে…" : "🤖 Train করুন"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AiTrainModal
