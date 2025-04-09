"use client"

import { useEffect, useState } from "react"
import { FaExclamationTriangle } from "react-icons/fa"

interface RemoveMemberProps {
    isOpen: boolean
    onClose: () => void
    member: {
        _id: string
        fullName: string
    }
    onConfirm: (memberId: string) => void
}

const RemoveMember = ({ isOpen, onClose, member, onConfirm }: RemoveMemberProps) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(isOpen)
    }, [isOpen])

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleConfirm = () => {
        onConfirm(member._id)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div 
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-50 transition-opacity ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden transform transition-all">
                <div className="p-6">
                    <div className="flex items-center justify-center mb-4 text-yellow-500">
                        <FaExclamationTriangle className="text-3xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">সদস্য রিমুভ?</h3>
                    <p className="text-center text-gray-700">
                        আপনি কি নিশ্চিত <span className="font-semibold">{member.fullName}</span> কে সংগঠন থেকে রিমুভ করতে চান?
                    </p>
                </div>
                <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors"
                    >
                        না
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
                    >
                        হ্যাঁ, রিমুভ করুন
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RemoveMember