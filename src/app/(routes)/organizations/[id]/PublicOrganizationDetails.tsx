'use client'

import { useQuery } from '@tanstack/react-query'
import { getPublicOrganizationDetails, joinOrganization } from '@/app/actions/organization'
import { useDistrict, useThana } from '@/hooks/useLocation'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
    FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt,
    FaGlobe, FaUsers, FaUserTie, FaTint, FaArrowLeft, FaIdCard,
    FaInfoCircle, FaHospital, FaAmbulance, FaHandshake, FaClock
} from 'react-icons/fa'

interface PublicOrganizationDetailsProps {
    organizationId: string
}

// Helper: organization type to Bengali
const getOrgTypeBangla = (type: string): string => {
    switch (type) {
        case 'hospital': return 'হাসপাতাল'
        case 'bloodBank': return 'ব্লাড ব্যাংক'
        case 'clinic': return 'ক্লিনিক'
        case 'ngo': return 'এনজিও'
        case 'volunteer': return 'স্বেচ্ছাসেবী সংগঠন'
        case 'other': return 'অন্যান্য'
        default: return type
    }
}

const PublicOrganizationDetails = ({ organizationId }: PublicOrganizationDetailsProps) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [joinLoading, setJoinLoading] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ['public-organization', organizationId],
        queryFn: () => getPublicOrganizationDetails(organizationId),
        staleTime: 1000 * 60 * 5,
    })

    const org = data?.organization
    const { district } = useDistrict(org?.districtId || '')
    const { thana } = useThana(org?.districtId || '', org?.thanaId || '')

    const handleJoinRequest = async () => {
        setJoinLoading(true)
        try {
            const response = await joinOrganization(organizationId)
            if (response?.success) {
                toast.success(response.message || 'যোগদান অনুরোধ সফল হয়েছে')
                queryClient.invalidateQueries({ queryKey: ['public-organization', organizationId] })
            } else {
                toast.error(response?.message || 'কিছু ভুল হয়েছে')
            }
        } catch {
            toast.error('কিছু ভুল হয়েছে, আবার চেষ্টা করুন')
        } finally {
            setJoinLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">তথ্য লোড হচ্ছে...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!data?.success || !org) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center">
                    <FaBuilding className="mx-auto text-gray-300 text-5xl mb-4" />
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">প্রতিষ্ঠান খুঁজে পাওয়া যায়নি</h2>
                    <p className="text-gray-500 mb-6">এই আইডি দিয়ে কোনো প্রতিষ্ঠান পাওয়া যায়নি অথবা প্রতিষ্ঠানটি আর সক্রিয় নেই।</p>
                    <Link href="/organizations" className="inline-flex items-center text-red-600 hover:text-red-700 font-medium">
                        <FaArrowLeft className="mr-2" /> সকল প্রতিষ্ঠান দেখুন
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            {/* Back button */}
            <button onClick={() => router.back()} className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                <FaArrowLeft className="mr-2" /> ফিরে যান
            </button>

            {/* Hero Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden flex-shrink-0">
                            {org.logoImage ? (
                                <Image
                                    src={org.logoImage}
                                    alt={org.organizationName}
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <FaBuilding className="text-red-400 text-4xl" />
                            )}
                        </div>
                        <div className="text-white text-center sm:text-left">
                            <h1 className="text-2xl md:text-3xl font-bold">{org.organizationName}</h1>
                            <p className="text-red-100 mt-1 text-lg">{getOrgTypeBangla(org.organizationType)}</p>
                            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3">
                                {org.registrationNumber && (
                                    <span className="inline-flex items-center gap-1 text-red-200 text-sm bg-white/10 px-3 py-1 rounded-full">
                                        <FaIdCard /> {org.registrationNumber}
                                    </span>
                                )}
                                <span className="inline-flex items-center gap-1 text-red-200 text-sm bg-white/10 px-3 py-1 rounded-full">
                                    <FaCalendarAlt /> প্রতিষ্ঠিত: {org.establishmentYear}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
                    <div className="py-5 text-center">
                        <FaUsers className="mx-auto text-blue-500 text-xl mb-1" />
                        <div className="text-2xl font-bold text-gray-800">{org.membersCount || 0}</div>
                        <div className="text-xs text-gray-500">সদস্য</div>
                    </div>
                    <div className="py-5 text-center">
                        <FaTint className="mx-auto text-red-500 text-xl mb-1" />
                        <div className="text-2xl font-bold text-gray-800">{org.availableBloodGroups?.length || 0}</div>
                        <div className="text-xs text-gray-500">রক্তের গ্রুপ</div>
                    </div>
                    <div className="py-5 text-center">
                        <FaHospital className="mx-auto text-green-500 text-xl mb-1" />
                        <div className="text-2xl font-bold text-gray-800">{org.hasBloodBank ? '✓' : '✗'}</div>
                        <div className="text-xs text-gray-500">ব্লাড ব্যাংক</div>
                    </div>
                </div>

                {/* Description */}
                {org.description && (
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                            <FaInfoCircle className="text-gray-400" /> পরিচিতি
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{org.description}</p>
                    </div>
                )}

                {/* Two-column detail grid */}
                <div className="grid md:grid-cols-2 gap-0 md:divide-x divide-gray-100">
                    {/* Contact */}
                    <div className="p-6 border-b md:border-b-0 border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">যোগাযোগ</h3>
                        <div className="space-y-3">
                            {org.email && (
                                <div className="flex items-center gap-3 text-gray-700">
                                    <FaEnvelope className="text-gray-400 flex-shrink-0" />
                                    <a href={`mailto:${org.email}`} className="hover:text-red-600 transition-colors">{org.email}</a>
                                </div>
                            )}
                            {org.phone && (
                                <div className="flex items-center gap-3 text-gray-700">
                                    <FaPhone className="text-gray-400 flex-shrink-0" />
                                    <a href={`tel:${org.phone}`} className="hover:text-red-600 transition-colors">{org.phone}</a>
                                </div>
                            )}
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
                                        <p className="text-sm text-gray-500 mt-0.5">
                                            {thana?.name && `${thana.name}, `}{district?.name || ''}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Representative */}
                    <div className="p-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">প্রতিনিধি</h3>
                        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <FaUserTie className="text-red-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">{org.representativeName}</p>
                                    <p className="text-sm text-gray-500">{org.representativePosition}</p>
                                </div>
                            </div>
                        </div>

                        {/* Owner */}
                        {org.owner && (
                            <div className="mt-4">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">প্রতিষ্ঠাতা</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {org.owner.profileImage ? (
                                            <Image src={org.owner.profileImage} alt={org.owner.fullName} width={40} height={40} className="w-full h-full object-cover" />
                                        ) : (
                                            <FaUserTie className="text-blue-500 text-sm" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800 text-sm">{org.owner.fullName}</p>
                                        {org.owner.bloodGroup && (
                                            <span className="text-xs text-red-600 font-medium">{org.owner.bloodGroup}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Services & Blood Groups */}
                <div className="p-6 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">সেবা সমূহ</h3>

                    <div className="flex flex-wrap gap-3 mb-5">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${org.hasBloodBank ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-400 border border-gray-200'}`}>
                            <FaHospital />
                            ব্লাড ব্যাংক {org.hasBloodBank ? '✓' : '✗'}
                        </div>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${org.providesEmergencyBlood ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-400 border border-gray-200'}`}>
                            <FaAmbulance />
                            জরুরি রক্ত সরবরাহ {org.providesEmergencyBlood ? '✓' : '✗'}
                        </div>
                    </div>

                    {org.availableBloodGroups && org.availableBloodGroups.length > 0 && (
                        <div>
                            <p className="text-sm text-gray-500 mb-3">উপলব্ধ রক্তের গ্রুপ:</p>
                            <div className="flex flex-wrap gap-2">
                                {org.availableBloodGroups.map((group: string) => (
                                    <span key={group} className="inline-flex items-center justify-center w-12 h-12 bg-red-50 text-red-700 font-bold rounded-full text-sm border-2 border-red-200 shadow-sm">
                                        {group}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Join Button & Created date */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                        <FaClock />
                        <span>যোগদান: {org.createdAt ? new Date(org.createdAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</span>
                    </div>

                    {/* Show different states based on membershipStatus */}
                    {org.membershipStatus === 'owner' ? (
                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-800 font-medium rounded-xl">
                            <FaUserTie /> আপনি এই প্রতিষ্ঠানের মালিক
                        </span>
                    ) : org.membershipStatus === 'admin' ? (
                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-800 font-medium rounded-xl">
                            <FaUserTie /> আপনি এই প্রতিষ্ঠানের পরিচালক
                        </span>
                    ) : org.membershipStatus === 'accepted' ? (
                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-800 font-medium rounded-xl">
                            <FaUsers /> আপনি ইতোমধ্যে সদস্য
                        </span>
                    ) : org.membershipStatus === 'pending' ? (
                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-100 text-yellow-800 font-medium rounded-xl">
                            <FaClock /> আপনার আবেদন অনুমোদনের অপেক্ষায়
                        </span>
                    ) : (
                        <button
                            onClick={handleJoinRequest}
                            disabled={joinLoading}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {joinLoading ? (
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <FaHandshake />
                            )}
                            যোগদান অনুরোধ পাঠান
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PublicOrganizationDetails
