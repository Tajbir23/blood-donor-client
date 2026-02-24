"use client"

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { getOrganizationDetails, updateOrganization } from '@/app/actions/organization'
import { updateOrgCover } from '@/app/actions/administrator/organization/manageOrg'
import {
    FaCog, FaBuilding, FaEnvelope, FaPhone, FaGlobe,
    FaMapMarkerAlt, FaTint, FaUserTie, FaSave, FaCamera,
    FaSpinner, FaExclamationTriangle, FaCheckCircle, FaInfoCircle,
    FaHospital, FaAmbulance, FaEdit, FaTimes
} from 'react-icons/fa'

interface Organization {
    _id: string
    organizationName: string
    organizationType: string
    establishmentYear: string
    registrationNumber?: string
    website?: string
    description: string
    email: string
    phone: string
    districtId: string
    thanaId: string
    address: string
    representativeName: string
    representativePosition: string
    representativePhone: string
    representativeEmail: string
    hasBloodBank: boolean
    providesEmergencyBlood: boolean
    availableBloodGroups: string[]
    logoImage: string
    isActive: boolean
    isBanned: boolean
    banReason?: string
    owner: { _id: string; fullName: string; email: string }
    createdAt?: string
}

const orgTypes = [
    'ব্লাড ব্যাংক',
    'হাসপাতাল',
    'ক্লিনিক',
    'এনজিও',
    'স্বেচ্ছাসেবী সংগঠন',
    'শিক্ষা প্রতিষ্ঠান',
    'সরকারি প্রতিষ্ঠান',
    'অন্যান্য'
]

const allBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const OrgSettingsPage = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isUploadingLogo, setIsUploadingLogo] = useState(false)
    const [organization, setOrganization] = useState<Organization | null>(null)
    const [error, setError] = useState('')
    const [editSection, setEditSection] = useState<string | null>(null)

    // Form states
    const [formData, setFormData] = useState({
        organizationName: '',
        organizationType: '',
        description: '',
        website: '',
        email: '',
        phone: '',
        address: '',
        representativeName: '',
        representativePosition: '',
        representativePhone: '',
        representativeEmail: '',
        hasBloodBank: false,
        providesEmergencyBlood: false,
        availableBloodGroups: [] as string[],
    })

    const fetchOrganization = useCallback(async () => {
        if (!id) return
        setIsLoading(true)
        setError('')
        try {
            const data = await getOrganizationDetails(id as string)
            if (data.success && data.organization) {
                const org = data.organization
                setOrganization(org)
                setFormData({
                    organizationName: org.organizationName || '',
                    organizationType: org.organizationType || '',
                    description: org.description || '',
                    website: org.website || '',
                    email: org.email || '',
                    phone: org.phone || '',
                    address: org.address || '',
                    representativeName: org.representativeName || '',
                    representativePosition: org.representativePosition || '',
                    representativePhone: org.representativePhone || '',
                    representativeEmail: org.representativeEmail || '',
                    hasBloodBank: org.hasBloodBank || false,
                    providesEmergencyBlood: org.providesEmergencyBlood || false,
                    availableBloodGroups: org.availableBloodGroups || [],
                })
            } else {
                setError(data.message || 'প্রতিষ্ঠানের তথ্য লোড করতে ব্যর্থ')
            }
        } catch {
            setError('সার্ভার ত্রুটি হয়েছে')
        } finally {
            setIsLoading(false)
        }
    }, [id])

    useEffect(() => {
        fetchOrganization()
    }, [fetchOrganization])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const toggleBloodGroup = (bg: string) => {
        setFormData(prev => ({
            ...prev,
            availableBloodGroups: prev.availableBloodGroups.includes(bg)
                ? prev.availableBloodGroups.filter(g => g !== bg)
                : [...prev.availableBloodGroups, bg]
        }))
    }

    const handleSaveSection = async (section: string) => {
        if (!id) return
        setIsSaving(true)

        let updates: Record<string, unknown> = {}

        switch (section) {
            case 'basic':
                updates = {
                    organizationName: formData.organizationName,
                    organizationType: formData.organizationType,
                    description: formData.description,
                    website: formData.website,
                }
                break
            case 'contact':
                updates = {
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                }
                break
            case 'representative':
                updates = {
                    representativeName: formData.representativeName,
                    representativePosition: formData.representativePosition,
                    representativePhone: formData.representativePhone,
                    representativeEmail: formData.representativeEmail,
                }
                break
            case 'services':
                updates = {
                    hasBloodBank: formData.hasBloodBank,
                    providesEmergencyBlood: formData.providesEmergencyBlood,
                    availableBloodGroups: formData.availableBloodGroups,
                }
                break
        }

        try {
            const result = await updateOrganization(id as string, updates)
            if (result.success) {
                toast.success(result.message || 'সফলভাবে আপডেট হয়েছে')
                setEditSection(null)
                await fetchOrganization()
            } else {
                toast.error(result.message || 'আপডেট করতে ব্যর্থ')
            }
        } catch {
            toast.error('সার্ভার ত্রুটি')
        } finally {
            setIsSaving(false)
        }
    }

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !id) return

        if (file.size > 5 * 1024 * 1024) {
            toast.error('ছবির সাইজ ৫MB এর কম হতে হবে')
            return
        }

        setIsUploadingLogo(true)
        try {
            const result = await updateOrgCover(id as string, file)
            if (result.success) {
                toast.success('লোগো সফলভাবে আপডেট হয়েছে')
                await fetchOrganization()
            } else {
                toast.error(result.message || 'লোগো আপডেট করতে ব্যর্থ')
            }
        } catch {
            toast.error('লোগো আপলোড করতে ব্যর্থ')
        } finally {
            setIsUploadingLogo(false)
        }
    }

    const cancelEdit = () => {
        if (organization) {
            setFormData({
                organizationName: organization.organizationName || '',
                organizationType: organization.organizationType || '',
                description: organization.description || '',
                website: organization.website || '',
                email: organization.email || '',
                phone: organization.phone || '',
                address: organization.address || '',
                representativeName: organization.representativeName || '',
                representativePosition: organization.representativePosition || '',
                representativePhone: organization.representativePhone || '',
                representativeEmail: organization.representativeEmail || '',
                hasBloodBank: organization.hasBloodBank || false,
                providesEmergencyBlood: organization.providesEmergencyBlood || false,
                availableBloodGroups: organization.availableBloodGroups || [],
            })
        }
        setEditSection(null)
    }

    // Loading
    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-48" />
                    <div className="bg-gray-100 rounded-xl h-40" />
                    <div className="bg-gray-100 rounded-xl h-64" />
                    <div className="bg-gray-100 rounded-xl h-48" />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                    <FaExclamationTriangle className="text-red-400 text-4xl mx-auto mb-4" />
                    <p className="text-red-600 text-lg">{error}</p>
                    <button
                        onClick={fetchOrganization}
                        className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        আবার চেষ্টা করুন
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-6 pb-24 md:pb-6 max-w-4xl">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <FaCog className="text-gray-600" />
                    প্রতিষ্ঠান সেটিংস
                </h1>
                <p className="text-gray-500 mt-1">আপনার প্রতিষ্ঠানের তথ্য ও সেটিংস পরিচালনা করুন</p>
            </div>

            {/* Status Banners */}
            {organization?.isBanned && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                    <FaExclamationTriangle className="text-red-500 text-xl flex-shrink-0" />
                    <div>
                        <p className="text-red-800 font-semibold">প্রতিষ্ঠান নিষিদ্ধ করা হয়েছে</p>
                        {organization.banReason && (
                            <p className="text-red-600 text-sm mt-1">কারণ: {organization.banReason}</p>
                        )}
                    </div>
                </div>
            )}
            {!organization?.isActive && !organization?.isBanned && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                    <FaInfoCircle className="text-amber-500 text-xl flex-shrink-0" />
                    <div>
                        <p className="text-amber-800 font-semibold">প্রতিষ্ঠান এখনো সক্রিয় হয়নি</p>
                        <p className="text-amber-600 text-sm mt-1">অ্যাডমিন অনুমোদনের অপেক্ষায় আছে</p>
                    </div>
                </div>
            )}

            {/* Logo Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">প্রতিষ্ঠানের লোগো</h2>
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        {organization?.logoImage ? (
                            <Image
                                src={organization.logoImage}
                                alt={organization.organizationName}
                                width={100}
                                height={100}
                                className="rounded-xl object-cover w-[100px] h-[100px] border-2 border-gray-200"
                            />
                        ) : (
                            <div className="w-[100px] h-[100px] bg-gray-100 rounded-xl flex items-center justify-center text-3xl font-bold text-gray-400">
                                {organization?.organizationName?.charAt(0) || '?'}
                            </div>
                        )}
                        <label className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            {isUploadingLogo ? (
                                <FaSpinner className="text-white text-xl animate-spin" />
                            ) : (
                                <FaCamera className="text-white text-xl" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="hidden"
                                disabled={isUploadingLogo}
                            />
                        </label>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">লোগো পরিবর্তন করতে ছবির উপর ক্লিক করুন</p>
                        <p className="text-xs text-gray-400 mt-1">সর্বোচ্চ ৫MB, JPG/PNG/WebP</p>
                    </div>
                </div>
            </div>

            {/* Basic Info Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <FaBuilding className="text-blue-500" />
                        মৌলিক তথ্য
                    </h2>
                    {editSection !== 'basic' ? (
                        <button
                            onClick={() => setEditSection('basic')}
                            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                        >
                            <FaEdit /> সম্পাদনা
                        </button>
                    ) : (
                        <button
                            onClick={cancelEdit}
                            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                        >
                            <FaTimes /> বাতিল
                        </button>
                    )}
                </div>
                <div className="p-6 space-y-4">
                    {editSection === 'basic' ? (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">প্রতিষ্ঠানের নাম</label>
                                <input
                                    type="text"
                                    name="organizationName"
                                    value={formData.organizationName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">প্রতিষ্ঠানের ধরণ</label>
                                <select
                                    name="organizationType"
                                    value={formData.organizationType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                >
                                    {orgTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">বিবরণ</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ওয়েবসাইট (ঐচ্ছিক)</label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                />
                            </div>
                            <button
                                onClick={() => handleSaveSection('basic')}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                                সংরক্ষণ করুন
                            </button>
                        </>
                    ) : (
                        <div className="space-y-3">
                            <InfoRow label="প্রতিষ্ঠানের নাম" value={organization?.organizationName} />
                            <InfoRow label="ধরণ" value={organization?.organizationType} />
                            <InfoRow label="প্রতিষ্ঠার বছর" value={organization?.establishmentYear} />
                            {organization?.registrationNumber && (
                                <InfoRow label="রেজিস্ট্রেশন নম্বর" value={organization.registrationNumber} />
                            )}
                            <InfoRow label="বিবরণ" value={organization?.description} />
                            {organization?.website && (
                                <InfoRow label="ওয়েবসাইট" value={organization.website} isLink />
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Contact Info Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <FaEnvelope className="text-green-500" />
                        যোগাযোগের তথ্য
                    </h2>
                    {editSection !== 'contact' ? (
                        <button
                            onClick={() => setEditSection('contact')}
                            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                        >
                            <FaEdit /> সম্পাদনা
                        </button>
                    ) : (
                        <button
                            onClick={cancelEdit}
                            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                        >
                            <FaTimes /> বাতিল
                        </button>
                    )}
                </div>
                <div className="p-6 space-y-4">
                    {editSection === 'contact' ? (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ফোন নম্বর</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ঠিকানা</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={2}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                                />
                            </div>
                            <button
                                onClick={() => handleSaveSection('contact')}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                                সংরক্ষণ করুন
                            </button>
                        </>
                    ) : (
                        <div className="space-y-3">
                            <InfoRow label="ইমেইল" value={organization?.email} icon={<FaEnvelope className="text-gray-400" />} />
                            <InfoRow label="ফোন" value={organization?.phone} icon={<FaPhone className="text-gray-400" />} />
                            <InfoRow label="ঠিকানা" value={organization?.address} icon={<FaMapMarkerAlt className="text-gray-400" />} />
                        </div>
                    )}
                </div>
            </div>

            {/* Representative Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <FaUserTie className="text-purple-500" />
                        প্রতিনিধির তথ্য
                    </h2>
                    {editSection !== 'representative' ? (
                        <button
                            onClick={() => setEditSection('representative')}
                            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                        >
                            <FaEdit /> সম্পাদনা
                        </button>
                    ) : (
                        <button
                            onClick={cancelEdit}
                            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                        >
                            <FaTimes /> বাতিল
                        </button>
                    )}
                </div>
                <div className="p-6 space-y-4">
                    {editSection === 'representative' ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">প্রতিনিধির নাম</label>
                                    <input
                                        type="text"
                                        name="representativeName"
                                        value={formData.representativeName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">পদবী</label>
                                    <input
                                        type="text"
                                        name="representativePosition"
                                        value={formData.representativePosition}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ফোন নম্বর</label>
                                    <input
                                        type="tel"
                                        name="representativePhone"
                                        value={formData.representativePhone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
                                    <input
                                        type="email"
                                        name="representativeEmail"
                                        value={formData.representativeEmail}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => handleSaveSection('representative')}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                                সংরক্ষণ করুন
                            </button>
                        </>
                    ) : (
                        <div className="space-y-3">
                            <InfoRow label="নাম" value={organization?.representativeName} />
                            <InfoRow label="পদবী" value={organization?.representativePosition} />
                            <InfoRow label="ফোন" value={organization?.representativePhone} icon={<FaPhone className="text-gray-400" />} />
                            <InfoRow label="ইমেইল" value={organization?.representativeEmail} icon={<FaEnvelope className="text-gray-400" />} />
                        </div>
                    )}
                </div>
            </div>

            {/* Services Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <FaTint className="text-red-500" />
                        সেবা ও রক্তের গ্রুপ
                    </h2>
                    {editSection !== 'services' ? (
                        <button
                            onClick={() => setEditSection('services')}
                            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                        >
                            <FaEdit /> সম্পাদনা
                        </button>
                    ) : (
                        <button
                            onClick={cancelEdit}
                            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                        >
                            <FaTimes /> বাতিল
                        </button>
                    )}
                </div>
                <div className="p-6 space-y-4">
                    {editSection === 'services' ? (
                        <>
                            <div className="flex flex-col gap-4">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="hasBloodBank"
                                        checked={formData.hasBloodBank}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                    />
                                    <span className="flex items-center gap-2 text-gray-700">
                                        <FaHospital className="text-red-500" /> ব্লাড ব্যাংক আছে
                                    </span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="providesEmergencyBlood"
                                        checked={formData.providesEmergencyBlood}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                    />
                                    <span className="flex items-center gap-2 text-gray-700">
                                        <FaAmbulance className="text-red-500" /> জরুরি রক্ত সরবরাহ করা হয়
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">সংগৃহীত রক্তের গ্রুপ</label>
                                <div className="grid grid-cols-4 gap-3">
                                    {allBloodGroups.map(bg => (
                                        <button
                                            key={bg}
                                            type="button"
                                            onClick={() => toggleBloodGroup(bg)}
                                            className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                                                formData.availableBloodGroups.includes(bg)
                                                    ? 'bg-red-600 text-white border-red-600 shadow-md'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-red-300'
                                            }`}
                                        >
                                            {bg}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => handleSaveSection('services')}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                                সংরক্ষণ করুন
                            </button>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-3">
                                <ServiceBadge
                                    icon={<FaHospital />}
                                    label="ব্লাড ব্যাংক"
                                    active={organization?.hasBloodBank || false}
                                />
                                <ServiceBadge
                                    icon={<FaAmbulance />}
                                    label="জরুরি রক্ত সরবরাহ"
                                    active={organization?.providesEmergencyBlood || false}
                                />
                            </div>
                            {organization?.availableBloodGroups && organization.availableBloodGroups.length > 0 && (
                                <div>
                                    <p className="text-sm text-gray-500 mb-2">সংগৃহীত রক্তের গ্রুপ</p>
                                    <div className="flex flex-wrap gap-2">
                                        {organization.availableBloodGroups.map(bg => (
                                            <span key={bg} className="bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-red-200">
                                                {bg}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Organization Info (Read-only) */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <FaInfoCircle className="text-gray-500" />
                        প্রতিষ্ঠানের স্থিতি
                    </h2>
                </div>
                <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-600">স্থিতি</span>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                            organization?.isBanned
                                ? 'bg-red-100 text-red-700'
                                : organization?.isActive
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-amber-100 text-amber-700'
                        }`}>
                            {organization?.isBanned ? (
                                <><FaExclamationTriangle /> নিষিদ্ধ</>
                            ) : organization?.isActive ? (
                                <><FaCheckCircle /> সক্রিয়</>
                            ) : (
                                <><FaInfoCircle /> অপেক্ষমান</>
                            )}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-t border-gray-50">
                        <span className="text-sm text-gray-600">মালিক</span>
                        <span className="text-sm text-gray-800 font-medium">{organization?.owner?.fullName}</span>
                    </div>
                    {organization?.createdAt && (
                        <div className="flex items-center justify-between py-2 border-t border-gray-50">
                            <span className="text-sm text-gray-600">তৈরির তারিখ</span>
                            <span className="text-sm text-gray-800">
                                {new Date(organization.createdAt).toLocaleDateString('bn-BD', {
                                    year: 'numeric', month: 'long', day: 'numeric'
                                })}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// Helper components
function InfoRow({ label, value, icon, isLink }: { label: string; value?: string; icon?: React.ReactNode; isLink?: boolean }) {
    if (!value) return null
    return (
        <div className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
            {icon && <span className="mt-0.5">{icon}</span>}
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                {isLink ? (
                    <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                        <FaGlobe className="text-xs" /> {value}
                    </a>
                ) : (
                    <p className="text-sm text-gray-800">{value}</p>
                )}
            </div>
        </div>
    )
}

function ServiceBadge({ icon, label, active }: { icon: React.ReactNode; label: string; active: boolean }) {
    return (
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border ${
            active
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-gray-50 text-gray-400 border-gray-200 line-through'
        }`}>
            {icon} {label}
            {active && <FaCheckCircle className="text-green-500 text-xs" />}
        </span>
    )
}

export default OrgSettingsPage
