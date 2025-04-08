"use client"

import { useState, useEffect } from "react";
import { FaSearch, FaTimes, FaUserPlus } from "react-icons/fa";
import Image from "next/image";
import { searchDonors } from "@/app/actions/userAction";

interface AddNewMemberProps {
    isOpen: boolean;
    onClose: () => void;
    onAddMember: (donorId: string) => Promise<void>;
}

interface Donor {
    _id: string;
    fullName: string;
    bloodGroup: string;
    profileImageUrl?: string;
}

const AddNewMember = ({ isOpen, onClose, onAddMember }: AddNewMemberProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [donors, setDonors] = useState<Donor[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    useEffect(() => {
        const fetchDonors = async () => {
            const response = await searchDonors(searchQuery)
            setDonors(response.donors)
        }
        fetchDonors()
    },[searchQuery])

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // TODO: Implement actual API call to search donors
            // const response = await searchDonors(searchQuery);
            const response = await searchDonors(searchQuery)
            setDonors(response.donors)
            
        } catch (error) {
            console.error("Failed to search donors:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddMember = async (donorId: string) => {
        try {
            await onAddMember(donorId);
            onClose();
        } catch (error) {
            console.error("Failed to add member:", error);
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
                    style={{ width: '100%', maxWidth: '32rem' }}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                            নতুন সদস্য যোগ করুন
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 transition-colors"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="mb-6">
                        <div className="relative flex">
                            <input
                                type="text"
                                placeholder="রক্তদাতা খুঁজুন..."
                                className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <button
                                type="submit"
                                className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                            >
                                <FaSearch className="mr-2" />
                                খুঁজুন
                            </button>
                        </div>
                    </form>

                    {/* Results */}
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {isLoading ? (
                            <div className="space-y-4">
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg animate-pulse">
                                        <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : donors?.length > 0 ? (
                            donors.map((donor) => (
                                <div key={donor._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                            {donor.profileImageUrl ? (
                                                <Image 
                                                    src={`${process.env.NEXT_PUBLIC_API_URL}${donor.profileImageUrl}`}
                                                    alt={donor.fullName}
                                                    width={48}
                                                    height={48}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center bg-red-100 text-red-600 font-medium">
                                                    {donor.fullName.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{donor.fullName}</div>
                                            <div className="text-sm text-gray-500">রক্তের গ্রুপ: {donor.bloodGroup}</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleAddMember(donor._id)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                                    >
                                        <FaUserPlus />
                                        <span>যোগ করুন</span>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl text-gray-300 mb-4">👥</div>
                                <h3 className="text-lg font-medium text-gray-500 mb-1">কোন রক্তদাতা পাওয়া যায়নি</h3>
                                <p className="text-gray-400">অন্য নামে খুঁজুন</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewMember; 