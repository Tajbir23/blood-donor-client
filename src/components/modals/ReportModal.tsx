'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { reportUser } from '@/app/actions/userAction'

interface ReportModalProps {
    isOpen: boolean
    onClose: () => void
    reportedUserId: string
    reportedUserName: string
}

const REPORT_CATEGORIES = [
    { value: 'fake_donation', label: 'ভুয়া রক্তদান তথ্য' },
    { value: 'wrong_info', label: 'ভুল/বিভ্রান্তিকর তথ্য' },
    { value: 'inappropriate_behavior', label: 'অনুচিত আচরণ' },
    { value: 'spam', label: 'স্প্যাম' },
    { value: 'other', label: 'অন্যান্য' },
]

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, reportedUserId, reportedUserName }) => {
    const [category, setCategory] = useState('')
    const [reason, setReason] = useState('')
    const [description, setDescription] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!category) {
            toast.error('রিপোর্টের ধরন নির্বাচন করুন')
            return
        }
        if (!reason.trim()) {
            toast.error('রিপোর্টের কারণ লিখুন')
            return
        }

        setIsSubmitting(true)
        try {
            const result = await reportUser(reportedUserId, reason.trim(), category, description.trim())
            if (result.success) {
                toast.success(result.message || 'রিপোর্ট সফলভাবে জমা দেওয়া হয়েছে')
                setCategory('')
                setReason('')
                setDescription('')
                onClose()
            } else {
                toast.error(result.message || 'রিপোর্ট জমা দিতে ব্যর্থ')
            }
        } catch {
            toast.error('সার্ভার ত্রুটি হয়েছে')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <h2 className="text-lg font-semibold">ব্যবহারকারী রিপোর্ট করুন</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Reported user info */}
                    <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2">
                        <span className="text-gray-500 text-sm">রিপোর্ট করা হচ্ছে:</span>
                        <span className="font-medium text-gray-800">{reportedUserName}</span>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            রিপোর্টের ধরন <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                            {REPORT_CATEGORIES.map(cat => (
                                <label
                                    key={cat.value}
                                    className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                                        category === cat.value
                                            ? 'border-red-500 bg-red-50 text-red-700'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="category"
                                        value={cat.value}
                                        checked={category === cat.value}
                                        onChange={e => setCategory(e.target.value)}
                                        className="accent-red-500"
                                    />
                                    <span className="text-sm">{cat.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Reason */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            কারণ <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                            placeholder="সংক্ষেপে কারণ লিখুন..."
                            maxLength={200}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            বিস্তারিত বিবরণ (ঐচ্ছিক)
                        </label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="বিস্তারিত তথ্য লিখুন..."
                            rows={3}
                            maxLength={500}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                        />
                        <p className="text-xs text-gray-400 mt-1">{description.length}/500</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            বাতিল
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-2.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    জমা দেওয়া হচ্ছে...
                                </>
                            ) : (
                                'রিপোর্ট জমা দিন'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ReportModal
