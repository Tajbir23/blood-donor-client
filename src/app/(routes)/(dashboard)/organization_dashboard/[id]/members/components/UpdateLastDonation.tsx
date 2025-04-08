"use client"

import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface UpdateLastDonationProps {
    isOpen: boolean;
    onClose: () => void;
    member: {
        _id: string;
        fullName: string;
        lastDonationDate?: string;
    };
    onUpdate: (memberId: string, newDate: string) => Promise<void>;
}

const UpdateLastDonation = ({ isOpen, onClose, member, onUpdate }: UpdateLastDonationProps) => {
    const [selectedDate, setSelectedDate] = useState(member.lastDonationDate || '');
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onUpdate(member._id, selectedDate);
            onClose();
        } catch (error) {
            console.error("Failed to update last donation date:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                    isVisible ? 'opacity-30' : 'opacity-0'
                }`}
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div 
                    className={`relative transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all duration-300 ${
                        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                    }`}
                    style={{ width: '100%', maxWidth: '24rem' }}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                            শেষ রক্তদানের তারিখ আপডেট করুন
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 transition-colors"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                সদস্যের নাম
                            </label>
                            <div className="text-sm text-gray-900 bg-gray-50 p-2 rounded-md">
                                {member.fullName}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                শেষ রক্তদানের তারিখ
                            </label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                max={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                            >
                                বাতিল
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading || !selectedDate}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        আপডেট হচ্ছে...
                                    </div>
                                ) : (
                                    "আপডেট করুন"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateLastDonation; 