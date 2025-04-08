"use client"
import { useEffect } from "react";
import { getMembers } from "@/app/actions/organization";
import { User } from "@/lib/types/userType";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaSearch, FaUserPlus, FaBan, FaEye, FaUserCog, FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import ChangeRole from "./ChangeRole";
import UpdateLastDonation from "./UpdateLastDonation";
import AddNewMember from "./AddNewMember";

const ActiveMembers = () => {
    const pathname = usePathname();
    const organizationId = pathname.split('/')[2];
    const [members, setMembers] = useState<User[]>([]);
    const [totalMembers, setTotalMembers] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [selectedMember, setSelectedMember] = useState<{ _id: string; fullName: string; role: string } | null>(null);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [selectedDonationMember, setSelectedDonationMember] = useState<{ _id: string; fullName: string; lastDonationDate?: string } | null>(null);
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['organization-active-members', organizationId, page, limit, search],
        queryFn: async () => {
            const result = await getMembers(organizationId, page, limit, search);
            return result
        }
    });

    useEffect(() => {
        if (data) {
            setMembers(data.members)
            setTotalMembers(data.totalMembers)
        }
    }, [data]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleBanMember = async (memberId: string) => {
        try {
            setActionLoading(memberId);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await refetch();
        } catch (error) {
            console.error("Failed to ban member:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleChangeRole = (member: any) => {
        setSelectedMember({
            _id: member._id,
            fullName: member.fullName,
            role: member.role || 'member'
        });
        setIsRoleModalOpen(true);
    };

    const handleRoleChangeSubmit = async (memberId: string, newRole: string) => {
        try {
            setActionLoading(memberId);
            // Implement the role change functionality here
            await new Promise(resolve => setTimeout(resolve, 1000));
            await refetch();
        } catch (error) {
            console.error("Failed to change member role:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleUpdateLastDonation = async (memberId: string, newDate: string) => {
        try {
            setActionLoading(memberId);
            // Implement the update last donation date functionality here
            await new Promise(resolve => setTimeout(resolve, 1000));
            await refetch();
        } catch (error) {
            console.error("Failed to update last donation date:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleOpenDonationModal = (member: any) => {
        setSelectedDonationMember({
            _id: member._id,
            fullName: member.fullName,
            lastDonationDate: member.lastDonationDate
        });
        setIsDonationModalOpen(true);
    };

    const handleAddMember = async (donorId: string) => {
        try {
            setActionLoading(donorId);
            // TODO: Implement the add member functionality here
            await new Promise(resolve => setTimeout(resolve, 1000));
            await refetch();
        } catch (error) {
            console.error("Failed to add member:", error);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <form onSubmit={handleSearch} className="flex-grow max-w-md">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="সদস্য খুঁজুন..."
                            className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </form>
                
                <button 
                    onClick={() => setIsAddMemberModalOpen(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
                >
                    <FaUserPlus className="mr-2" />
                    নতুন সদস্য যোগ করুন
                </button>
            </div>
            
            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse">
                            <div className="flex items-center space-x-4">
                                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : data?.members?.length ? (
                <>
                    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">সদস্য</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">যোগাযোগ</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">রক্তের গ্রুপ</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">শেষ রক্তদান</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">যোগদানের তারিখ</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">অ্যাকশন</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.members.map((member: User) => (
                                    <tr key={member._id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                                    {member.profileImageUrl ? (
                                                        <Image 
                                                            src={`${process.env.NEXT_PUBLIC_API_URL}${member.profileImageUrl}`} 
                                                            alt={member.fullName || 'Member'} 
                                                            width={40} 
                                                            height={40}
                                                            className="h-full w-full object-cover" 
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center bg-red-100 text-red-600 font-medium">
                                                            {(member.fullName || 'U')?.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{member.fullName}</div>
                                                    <div className="text-xs text-gray-500">{member.role || 'Member'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{member.email}</div>
                                            <div className="text-xs text-gray-500">{member.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 inline-flex text-sm font-semibold rounded-full bg-red-100 text-red-800">
                                                {member.bloodGroup || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="text-sm text-gray-900">
                                                    {member.lastDonationDate ? new Date(member.lastDonationDate).toLocaleDateString('bn-BD') : 'N/A'}
                                                </span>
                                                <button
                                                    onClick={() => handleOpenDonationModal(member)}
                                                    className="ml-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                                                    title="শেষ রক্তদানের তারিখ আপডেট করুন"
                                                >
                                                    <FaCalendarAlt />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(member.createdAt || Date.now()).toLocaleDateString('bn-BD')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Link 
                                                    href={`/members/${member._id}`}
                                                    className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-md transition-colors"
                                                    title="বিস্তারিত দেখুন"
                                                >
                                                    <FaEye />
                                                </Link>
                                                <button 
                                                    onClick={() => handleChangeRole(member)}
                                                    className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-md transition-colors"
                                                    title="রোল পরিবর্তন করুন"
                                                    disabled={actionLoading === member._id}
                                                >
                                                    {actionLoading === member._id ? (
                                                        <div className="h-4 w-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                                                    ) : (
                                                        <FaUserCog />
                                                    )}
                                                </button>
                                                <button 
                                                    onClick={() => handleBanMember(member._id || '')}
                                                    className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-md transition-colors"
                                                    title="বাতিল করুন"
                                                    disabled={actionLoading === member._id}
                                                >
                                                    {actionLoading === member._id ? (
                                                        <div className="h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                                    ) : (
                                                        <FaBan />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    {data.totalMembers > limit && (
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-sm text-gray-700">
                                মোট {data.totalMembers} জন সক্রিয় সদস্য
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                    className={`px-4 py-2 rounded-md transition-colors ${
                                        page === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    পূর্ববর্তী
                                </button>
                                <span className="px-4 py-2 bg-red-600 text-white rounded-md">
                                    {page}
                                </span>
                                <button
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page * limit >= (data.totalMembers || 0)}
                                    className={`px-4 py-2 rounded-md transition-colors ${
                                        page * limit >= (data.totalMembers || 0)
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    পরবর্তী
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg py-16">
                    <div className="text-6xl text-gray-300 mb-4">👥</div>
                    <h3 className="text-xl font-medium text-gray-500 mb-1">কোন সক্রিয় সদস্য পাওয়া যায়নি</h3>
                    <p className="text-gray-400">নতুন সদস্য যোগ করুন বা অপেক্ষমান সদস্যদের অনুমোদন করুন</p>
                </div>
            )}

            {/* Role Change Modal */}
            {selectedMember && (
                <ChangeRole
                    isOpen={isRoleModalOpen}
                    onClose={() => {
                        setIsRoleModalOpen(false);
                        setSelectedMember(null);
                    }}
                    member={selectedMember}
                    onRoleChange={handleRoleChangeSubmit}
                />
            )}

            {/* Last Donation Update Modal */}
            {selectedDonationMember && (
                <UpdateLastDonation
                    isOpen={isDonationModalOpen}
                    onClose={() => {
                        setIsDonationModalOpen(false);
                        setSelectedDonationMember(null);
                    }}
                    member={selectedDonationMember}
                    onUpdate={handleUpdateLastDonation}
                />
            )}

            {/* Add New Member Modal */}
            <AddNewMember
                isOpen={isAddMemberModalOpen}
                onClose={() => setIsAddMemberModalOpen(false)}
                onAddMember={handleAddMember}
            />
        </div>
    );
};

export default ActiveMembers;