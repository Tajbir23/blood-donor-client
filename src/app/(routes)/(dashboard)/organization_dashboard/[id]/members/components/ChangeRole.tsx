"use client"

import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface ChangeRoleProps {
    isOpen: boolean;
    onClose: () => void;
    orgUserRole: string;
    member: {
        _id: string;
        fullName: string;
        role: string;
    };
    onRoleChange: (memberId: string, newRole: string) => Promise<void>;
}

// const roles = [
//     { value: "moderator", label: "মডারেটর" },
//     { value: "admin", label: "অ্যাডমিন" },
//     { value: "superAdmin", label: "সুপার অ্যাডমিন"}
// ];

const roles: { value: string; label: string }[] = [];

const ChangeRole = ({ isOpen, onClose, orgUserRole, member, onRoleChange }: ChangeRoleProps) => {
    
    const [selectedRole, setSelectedRole] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Trigger animation after component mounts
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    useEffect(() => {
        // Clear roles array first to prevent multiple entries on re-renders
        roles.length = 0;
        
        // Define role assignments based on user role
        const roleAssignments = {
            "owner": [
                { value: "moderator", label: "মডারেটর" },
                { value: "admin", label: "অ্যাডমিন" },
                { value: "superAdmin", label: "সুপার অ্যাডমিন" },
                { value: "owner", label: "মালিক" },
                { value: "member", label: "সদস্য" }
            ],
            "superAdmin": [
                { value: "moderator", label: "মডারেটর" },
                { value: "admin", label: "অ্যাডমিন" },
                { value: "member", label: "সদস্য" }
            ],
            "admin": [
                { value: "moderator", label: "মডারেটর" },
                { value: "member", label: "সদস্য" }
            ],
            "moderator": [
                { value: "member", label: "সদস্য" }
            ]
        };
        
        console.log(member)
        // Add appropriate roles based on user's role
        const assignableRoles = roleAssignments[orgUserRole as keyof typeof roleAssignments];
        if (assignableRoles) {
            roles.push(...assignableRoles);
        }
    }, [orgUserRole])
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onRoleChange(member._id, selectedRole as string);
            onClose();
        } catch (error) {
            console.error("Failed to change role:", error);
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
                            রোল পরিবর্তন করুন
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
                                নতুন রোল নির্বাচন করুন
                            </label>
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            >   
                                <option value="">রোল নির্বাচন করুন</option>
                                {roles.map((role) => (
                                    <option key={role.value} value={role.value}>
                                        {role.label}
                                    </option>
                                ))}
                            </select>
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
                                disabled={isLoading}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        পরিবর্তন হচ্ছে...
                                    </div>
                                ) : (
                                    "পরিবর্তন করুন"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangeRole; 