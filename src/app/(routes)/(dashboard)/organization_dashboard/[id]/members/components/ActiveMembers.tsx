"use client"
import { getMembers } from "@/app/actions/organization";
import { User } from "@/lib/types/userType";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaSearch, FaUserPlus, FaBan, FaEye, FaCalendarAlt, FaUserCog } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import UpdateLastDonation from "./UpdateLastDonation";
import AddNewMember from "./AddNewMember";
import ChangeRole from "./ChangeRole";
import RemoveMember from "./RemoveMember";
import { addMember, removeMember, roleChange, updateLastDonationDate } from "@/app/actions/administrator/organization/manageOrg";
import toast from "react-hot-toast";

const ActiveMembers = ({orgUserRole}: {orgUserRole: string}) => {
    const pathname = usePathname();
    const organizationId = pathname.split('/')[2];
    
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [search, setSearch] = useState<string>("");
    
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [selectedDonationMember, setSelectedDonationMember] = useState<User>();
    const [selectedRoleMember, setSelectedRoleMember] = useState<User>();
    const [selectedRemoveMember, setSelectedRemoveMember] = useState<User>();
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['organization-active-members', organizationId, page, limit, search],
        queryFn: async () => {
            const result = await getMembers(organizationId, page, limit, search);
            return result
        }
    });


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1); // Reset to first page when searching
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        // Scroll to top when changing pages
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleOpenDonationModal = (member: User) => {
        setSelectedDonationMember(member);
        setIsDonationModalOpen(true);
    };

    const handleOpenRoleModal = (member: User) => {
        setSelectedRoleMember(member);
        setIsRoleModalOpen(true);
    };

    const handleOpenRemoveModal = (member: User) => {
        setSelectedRemoveMember(member);
        setIsRemoveModalOpen(true);
    };

    const handleUpdateLastDonation = async (memberId: string, newDate: string, recipient: string, recipientName: string) => {
        try {
            setActionLoading(memberId);
            const userDonationDate = new Date(newDate)
            console.log(memberId, userDonationDate)
            
            const response = await updateLastDonationDate(organizationId, memberId, userDonationDate, recipient, recipientName)
            if (response.success) {
                toast.success(response.message);
                await refetch();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Failed to update last donation date:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleRoleChange = async (memberId: string, newRole: string) => {
        console.log(memberId, newRole)
        try {
            setActionLoading(memberId);
            const data = await roleChange(memberId, newRole, organizationId)
            if(data.success){
                toast.success(`${data.message}`)
                await refetch();
            }else {
                toast.error(`${data.message}`)
            }
        } catch (error) {
            console.error("Failed to change role:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleAddMember = async (donorId: string) => {
        try {
            setActionLoading(donorId);
            // TODO: Implement the add member functionality here
            const response = await addMember(organizationId, donorId);
            if (response.success) {
                toast.success(response.message);
                await refetch();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Failed to add member:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleRemoveMember = async (memberId: string) => {
        try {
            setActionLoading(memberId);
            // TODO: Implement the ban functionality here
            const data = await removeMember(organizationId, memberId)
            if(data.success) {
                await refetch();
                toast.success("সদস্য সফলভাবে রিমুভ করা হয়েছে");
            }else {
                toast.error(`${data.message}`)
            }
        } catch (error) {
            console.error("Failed to ban member:", error);
            toast.error("সদস্য রিমুভ করা যায়নি");
        } finally {
            setActionLoading(null);
        }
    };

    // Calculate pagination information
    const totalPages = data?.totalPages;
    console.log(totalPages)
    const showingFrom = data?.members?.length ? (page - 1) * limit + 1 : 0;
    const showingTo = data?.members?.length ? Math.min(page * limit, data.totalMembers) : 0;

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
                                                            src={`${member.profileImageUrl}`} 
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
                                                    onClick={() => handleOpenDonationModal(member)}
                                                    className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-md transition-colors"
                                                    title="শেষ রক্তদানের তারিখ আপডেট করুন"
                                                    disabled={actionLoading === member._id}
                                                >
                                                    {actionLoading === member._id ? (
                                                        <div className="h-4 w-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                                                    ) : (
                                                        <FaCalendarAlt />
                                                    )}
                                                </button>
                                                <button 
                                                    onClick={() => handleOpenRoleModal(member)}
                                                    className="bg-purple-100 hover:bg-purple-200 text-purple-600 p-2 rounded-md transition-colors"
                                                    title="রোল পরিবর্তন করুন"
                                                    disabled={actionLoading === member._id}
                                                >
                                                    {actionLoading === member._id ? (
                                                        <div className="h-4 w-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                                                    ) : (
                                                        <FaUserCog />
                                                    )}
                                                </button>
                                                <button 
                                                    onClick={() => handleOpenRemoveModal(member)}
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
                    
                    {/* Enhanced Pagination */}
                    {data.totalMembers > 0 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                            <div className="text-sm text-gray-700">
                                <span className="font-medium">{showingFrom}</span> থেকে <span className="font-medium">{showingTo}</span> দেখানো হচ্ছে, মোট <span className="font-medium">{data.totalMembers}</span> জন সক্রিয় সদস্য
                            </div>
                            <div className="flex flex-wrap justify-center gap-2">
                                <button
                                    onClick={() => handlePageChange(1)}
                                    disabled={page === 1}
                                    className={`px-3 py-1 rounded-md transition-colors ${
                                        page === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    প্রথম
                                </button>
                                <button
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                    className={`px-3 py-1 rounded-md transition-colors ${
                                        page === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    পূর্ববর্তী
                                </button>
                                
                                {/* Page Numbers */}
                                {[...Array(totalPages)].map((_, index) => {
                                    const pageNumber = index + 1;
                                    // Show current page, first page, last page, and pages around current page
                                    if (
                                        pageNumber === 1 || 
                                        pageNumber === totalPages || 
                                        (pageNumber >= page - 1 && pageNumber <= page + 1)
                                    ) {
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => handlePageChange(pageNumber)}
                                                className={`px-3 py-1 rounded-md transition-colors ${
                                                    page === pageNumber
                                                        ? 'bg-red-600 text-white'
                                                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                                }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    } else if (
                                        (pageNumber === page - 2 && page > 3) || 
                                        (pageNumber === page + 2 && page < totalPages - 2)
                                    ) {
                                        // Show ellipsis
                                        return <span key={pageNumber} className="px-2 py-1">...</span>;
                                    }
                                    return null;
                                })}
                                
                                <button
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page >= totalPages}
                                    className={`px-3 py-1 rounded-md transition-colors ${
                                        page >= totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    পরবর্তী
                                </button>
                                <button
                                    onClick={() => handlePageChange(totalPages)}
                                    disabled={page >= totalPages}
                                    className={`px-3 py-1 rounded-md transition-colors ${
                                        page >= totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    শেষ
                                </button>
                            </div>
                            
                            {/* Page Size Selector */}
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">প্রতি পৃষ্ঠায়:</span>
                                <select 
                                    value={limit}
                                    onChange={(e) => {
                                        setLimit(Number(e.target.value));
                                        setPage(1); // Reset to first page when changing limit
                                    }}
                                    className="border border-gray-200 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    {[5, 10, 25, 50].map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
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

            {/* Last Donation Update Modal */}
            {selectedDonationMember && (
                <UpdateLastDonation
                    isOpen={isDonationModalOpen}
                    onClose={() => {
                        setIsDonationModalOpen(false);
                        setSelectedDonationMember(undefined);
                    }}
                    member={{
                        _id: selectedDonationMember._id || '',
                        fullName: selectedDonationMember.fullName,
                        lastDonationDate: selectedDonationMember.lastDonationDate
                    }}
                    onUpdate={handleUpdateLastDonation}
                />
            )}

            {/* Role Change Modal */}
            {selectedRoleMember && (
                <ChangeRole
                    isOpen={isRoleModalOpen}
                    onClose={() => {
                        setIsRoleModalOpen(false);
                        setSelectedRoleMember(undefined);
                    }}
                    orgUserRole={orgUserRole}
                    member={{
                        _id: selectedRoleMember._id || '',
                        fullName: selectedRoleMember.fullName,
                        role: selectedRoleMember.role || 'member'
                    }}
                    onRoleChange={handleRoleChange}
                />
            )}

            {/* Add New Member Modal */}
            <AddNewMember
                isOpen={isAddMemberModalOpen}
                onClose={() => setIsAddMemberModalOpen(false)}
                onAddMember={handleAddMember}
            />

            {/* Remove Member Modal */}
            {selectedRemoveMember && (
                <RemoveMember
                    isOpen={isRemoveModalOpen}
                    onClose={() => {
                        setIsRemoveModalOpen(false);
                        setSelectedRemoveMember(undefined);
                    }}
                    member={{
                        _id: selectedRemoveMember._id || '',
                        fullName: selectedRemoveMember.fullName
                    }}
                    onConfirm={handleRemoveMember}
                />
            )}
        </div>
    );
};

export default ActiveMembers;