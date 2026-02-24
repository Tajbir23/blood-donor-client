'use client'

import { useQuery } from '@tanstack/react-query'
import { getOrganizationDetails } from '@/app/actions/organization'
import { updateOrganizationStatus } from '@/app/actions/administrator/system/organization'
import { useDistrict, useThana } from '@/hooks/useLocation'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import {
    FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt,
    FaGlobe, FaUsers, FaUserTie, FaTint, FaCheck, FaBan, FaExclamationTriangle,
    FaTrash, FaArrowLeft, FaClock, FaIdCard, FaInfoCircle, FaHospital,
    FaAmbulance
} from 'react-icons/fa'

interface OrganizationDetailsProps {
    organizationId: string
}

const OrganizationDetails = ({ organizationId }: OrganizationDetailsProps) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [actionLoading, setActionLoading] = useState<string | null>(null)

    const { data, isLoading, error } = useQuery({
        queryKey: ['organization-details', organizationId],
        queryFn: () => getOrganizationDetails(organizationId),
        staleTime: 1000 * 60 * 5,
    })

    const org = data?.organization
    const { district } = useDistrict(org?.districtId || '')
    const { thana } = useThana(org?.districtId || '', org?.thanaId || '')

    const handleAction = async (actionType: string) => {
        setActionLoading(actionType)
        try {
            const response = await updateOrganizationStatus(organizationId, actionType)
            if (response?.success) {
                toast.success(`সফলভাবে ${actionType === 'active' ? 'অনুমোদিত' : actionType === 'ban' ? 'নিষিদ্ধ' : actionType === 'delete' ? 'মুছে ফেলা' : 'আপডেট'} হয়েছে`)
                queryClient.invalidateQueries({ queryKey: ['organization-details', organizationId] })
                queryClient.invalidateQueries({ queryKey: ['admin_organizations'] })
                if (actionType === 'delete') {
                    router.push('/dashboard/organizations')
                }
            } else {
                toast.error(response?.message || 'কিছু ভুল হয়েছে')
            }
        } catch {
            toast.error('কিছু ভুল হয়েছে')
        } finally {
            setActionLoading(null)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">তথ্য লোড হচ্ছে...</p>
                </div>
            </div>
        )
    }

    if (error || !data?.success || !org) {
        return (
            <div className="text-center py-16">
                <FaBuilding className="mx-auto text-gray-300 text-5xl mb-4" />
                <h2 className="text-xl font-semibold text-gray-700 mb-2">প্রতিষ্ঠান খুঁজে পাওয়া যায়নি</h2>
                <p className="text-gray-500 mb-6">এই আইডি দিয়ে কোনো প্রতিষ্ঠান নেই।</p>
                <Link href="/dashboard/organizations" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    <FaArrowLeft className="mr-2" /> ফিরে যান
                </Link>
            </div>
        )
    }

    const getStatusBadge = () => {
        if (org.isBanned) return { text: 'নিষিদ্ধ', color: 'bg-red-100 text-red-800 border-red-200' }
        if (org.isActive) return { text: 'সক্রিয়', color: 'bg-green-100 text-green-800 border-green-200' }
        return { text: 'অপেক্ষমাণ', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' }
    }

    const status = getStatusBadge()
    const orgStatus = org.isBanned ? 'ban' : org.isActive ? 'active' : 'inactive'

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <FaArrowLeft className="text-gray-600" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">প্রতিষ্ঠানের বিবরণ</h1>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${status.color}`}>
                    {status.text}
                </span>
            </div>

            {/* Main Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                    <div className="flex items-center gap-5">
                        <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden flex-shrink-0">
                            {org.logoImage ? (
                                <Image
                                    src={org.logoImage}
                                    alt={org.organizationName}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <FaBuilding className="text-blue-500 text-3xl" />
                            )}
                        </div>
                        <div className="text-white">
                            <h2 className="text-2xl font-bold">{org.organizationName}</h2>
                            <p className="text-blue-100 mt-1">{org.organizationType}</p>
                            {org.registrationNumber && (
                                <p className="text-blue-200 text-sm mt-1 flex items-center gap-1">
                                    <FaIdCard /> নিবন্ধন নম্বর: {org.registrationNumber}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description */}
                {org.description && (
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                            <FaInfoCircle /> বিবরণ
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{org.description}</p>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-gray-100">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <FaUsers className="mx-auto text-blue-500 text-xl mb-2" />
                        <div className="text-2xl font-bold text-blue-700">{org.membersCount || 0}</div>
                        <div className="text-sm text-blue-600">সদস্য</div>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-4 text-center">
                        <FaClock className="mx-auto text-amber-500 text-xl mb-2" />
                        <div className="text-2xl font-bold text-amber-700">{org.pendingRequestsCount || 0}</div>
                        <div className="text-sm text-amber-600">অপেক্ষমাণ আবেদন</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                        <FaCalendarAlt className="mx-auto text-green-500 text-xl mb-2" />
                        <div className="text-2xl font-bold text-green-700">{org.establishmentYear}</div>
                        <div className="text-sm text-green-600">প্রতিষ্ঠার বছর</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <FaTint className="mx-auto text-purple-500 text-xl mb-2" />
                        <div className="text-2xl font-bold text-purple-700">{org.availableBloodGroups?.length || 0}</div>
                        <div className="text-sm text-purple-600">রক্তের গ্রুপ</div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 p-6">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">যোগাযোগের তথ্য</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-700">
                                <FaEnvelope className="text-gray-400 flex-shrink-0" />
                                <span>{org.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <FaPhone className="text-gray-400 flex-shrink-0" />
                                <span>{org.phone}</span>
                            </div>
                            {org.website && (
                                <div className="flex items-center gap-3 text-gray-700">
                                    <FaGlobe className="text-gray-400 flex-shrink-0" />
                                    <a href={org.website.startsWith('http') ? org.website : `https://${org.website}`}
                                       target="_blank" rel="noopener noreferrer"
                                       className="text-blue-600 hover:underline truncate">
                                        {org.website}
                                    </a>
                                </div>
                            )}
                            <div className="flex items-start gap-3 text-gray-700">
                                <FaMapMarkerAlt className="text-gray-400 flex-shrink-0 mt-1" />
                                <div>
                                    <span>{org.address}</span>
                                    {(district || thana) && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            {thana?.name && `${thana.name}, `}{district?.name || ''}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Representative Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">প্রতিনিধির তথ্য</h3>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <FaUserTie className="text-gray-400" />
                                <div>
                                    <p className="font-medium text-gray-800">{org.representativeName}</p>
                                    <p className="text-sm text-gray-500">{org.representativePosition}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700 text-sm">
                                <FaPhone className="text-gray-400" />
                                <span>{org.representativePhone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700 text-sm">
                                <FaEnvelope className="text-gray-400" />
                                <span>{org.representativeEmail}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services */}
                <div className="p-6 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">সেবা সম্পর্কিত তথ্য</h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${org.hasBloodBank ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                            <FaHospital />
                            ব্লাড ব্যাংক {org.hasBloodBank ? '✓' : '✗'}
                        </div>
                        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${org.providesEmergencyBlood ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                            <FaAmbulance />
                            জরুরি রক্ত সরবরাহ {org.providesEmergencyBlood ? '✓' : '✗'}
                        </div>
                    </div>
                    {org.availableBloodGroups && org.availableBloodGroups.length > 0 && (
                        <div>
                            <p className="text-sm text-gray-500 mb-2">উপলব্ধ রক্তের গ্রুপ:</p>
                            <div className="flex flex-wrap gap-2">
                                {org.availableBloodGroups.map((group: string) => (
                                    <span key={group} className="inline-flex items-center justify-center w-10 h-10 bg-red-50 text-red-700 font-bold rounded-full text-sm border border-red-200">
                                        {group}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Owner Info */}
                {org.owner && (
                    <div className="p-6 border-t border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">মালিক/প্রতিষ্ঠাতা</h3>
                        <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                                {org.owner.profileImage ? (
                                    <Image src={org.owner.profileImage} alt={org.owner.fullName} width={48} height={48} className="w-full h-full object-cover" />
                                ) : (
                                    <FaUserTie className="text-blue-500 text-lg" />
                                )}
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">{org.owner.fullName}</p>
                                <p className="text-sm text-gray-500">{org.owner.email}</p>
                                {org.owner.phone && <p className="text-sm text-gray-500">{org.owner.phone}</p>}
                                {org.owner.bloodGroup && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 mt-1">
                                        <FaTint className="mr-1" /> {org.owner.bloodGroup}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Recent Members */}
                {org.recentMembers && org.recentMembers.length > 0 && (
                    <div className="p-6 border-t border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">সাম্প্রতিক সদস্য</h3>
                        <div className="space-y-3">
                            {org.recentMembers.map((member: { _id: string; fullName: string; profileImage?: string; bloodGroup?: string; email?: string; joinedAt?: string }) => (
                                <div key={member._id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                                            {member.profileImage ? (
                                                <Image src={member.profileImage} alt={member.fullName} width={40} height={40} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-blue-600 font-bold text-sm">{member.fullName?.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 text-sm">{member.fullName}</p>
                                            <p className="text-xs text-gray-500">{member.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {member.bloodGroup && (
                                            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">{member.bloodGroup}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Metadata */}
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                    <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt />
                            <span>তৈরি: {org.createdAt ? new Date(org.createdAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaClock />
                            <span>আপডেট: {org.updatedAt ? new Date(org.updatedAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">অ্যাডমিন অ্যাকশন</h3>
                <div className="flex flex-wrap gap-3">
                    {orgStatus === 'inactive' && (
                        <ActionButton
                            label="অনুমোদন করুন"
                            icon={<FaCheck />}
                            color="green"
                            loading={actionLoading === 'active'}
                            disabled={actionLoading !== null}
                            onClick={() => handleAction('active')}
                        />
                    )}
                    {orgStatus === 'active' && (
                        <>
                            <ActionButton
                                label="নিষ্ক্রিয় করুন"
                                icon={<FaExclamationTriangle />}
                                color="yellow"
                                loading={actionLoading === 'inactive'}
                                disabled={actionLoading !== null}
                                onClick={() => handleAction('inactive')}
                            />
                            <ActionButton
                                label="নিষিদ্ধ করুন"
                                icon={<FaBan />}
                                color="red"
                                loading={actionLoading === 'ban'}
                                disabled={actionLoading !== null}
                                onClick={() => handleAction('ban')}
                            />
                        </>
                    )}
                    {orgStatus === 'ban' && (
                        <ActionButton
                            label="নিষিদ্ধ তুলুন"
                            icon={<FaCheck />}
                            color="green"
                            loading={actionLoading === 'unban'}
                            disabled={actionLoading !== null}
                            onClick={() => handleAction('unban')}
                        />
                    )}
                    <ActionButton
                        label="মুছে ফেলুন"
                        icon={<FaTrash />}
                        color="red"
                        loading={actionLoading === 'delete'}
                        disabled={actionLoading !== null}
                        onClick={() => handleAction('delete')}
                    />
                </div>
            </div>
        </div>
    )
}

// Action Button component
const ActionButton = ({ label, icon, color, loading, disabled, onClick }: {
    label: string
    icon: React.ReactNode
    color: 'green' | 'yellow' | 'red'
    loading: boolean
    disabled: boolean
    onClick: () => void
}) => {
    const colors = {
        green: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200',
        yellow: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200',
        red: 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200',
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border font-medium text-sm transition-colors
                ${colors[color]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {loading ? (
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : icon}
            {label}
        </button>
    )
}

export default OrganizationDetails
