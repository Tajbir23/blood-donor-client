'use client'

import { useEffect, useState } from 'react'
import { Donation, UserOrganization } from './types'
import ProfileHeader from './components/ProfileHeader'
import ProfileTabs from './components/ProfileTabs'
import ProfileOverview from './components/overview'
import DonationHistory from './components/donations/DonationHistory'
import Organizations from './components/organizations'
import ProfileSettings from './components/settings'
import { User } from '@/lib/types/userType'
import { useQueryClient } from '@tanstack/react-query'

interface userQueryData {
  success: boolean;
  user: User
}
const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [userData, setUserData] = useState<User>()
  const queryClient = useQueryClient()
  
  useEffect(() => {
    const timeOut = setTimeout(() => {
      const user = queryClient.getQueryData<userQueryData>(['user'])
      setUserData(user?.user)
    }, 500)
    
    return () => clearTimeout(timeOut)
  },[queryClient])
  
  
  // This would come from your user data fetch
  const userProfile: User = {
    fullName: userData?.fullName ?? 'Profile Name',
    profileImageUrl: userData?.profileImageUrl ? `${process.env.NEXT_PUBLIC_API_URL}${userData.profileImageUrl}` : '/assets/profile-placeholder.jpg',
    bloodGroup: userData?.bloodGroup ?? "",
    phone: userData?.phone ?? '',
    email: userData?.email ?? '',
    districtId: userData?.districtId ?? '',
    thanaId: userData?.thanaId ?? '',
    address: userData?.address ?? '',
    lastDonationDate: userData?.lastDonationDate ?? '',
    totalDonationCount: userData?.totalDonationCount ?? 0,
    badges: ['প্রথম রক্তদান', 'নিয়মিত দাতা', 'জীবন রক্ষাকারী'],
    nextDonationDate: userData?.nextDonationDate ?? '',
    canDonate: userData?.canDonate ?? false,
    createdAt: userData?.createdAt ?? '',
    birthDate: userData?.birthDate ?? '',
    gender: userData?.gender ?? '',
    password: '', // Required by type but not shown in UI
    confirmPassword: '', // Required by type but not shown in UI
    latitude: userData?.latitude ?? 0,
    longitude: userData?.longitude ?? 0,
    agreedToTerms: true,
    profileImage: null,
    reportCount: userData?.reportCount ?? 0 // Number of times this user has been reported
  }

  const donationHistory: Donation[] = [
    { date: '১০ মার্চ, ২০২৩', location: 'রংপুর মেডিকেল কলেজ হাসপাতাল', recipient: 'শামীমা বেগম', bloodGroup: 'B+' },
    { date: '১২ ডিসেম্বর, ২০২২', location: 'আদর্শ হাসপাতাল, রংপুর', recipient: 'রফিক আলী', bloodGroup: 'B+' },
    { date: '০৫ সেপ্টেম্বর, ২০২২', location: 'শিশু হাসপাতাল, রংপুর', recipient: 'তাসনিম আক্তার', bloodGroup: 'B+' },
    { date: '১৮ জুন, ২০২২', location: 'ডক্টরস ক্লিনিক, রংপুর', recipient: 'আরিফ হোসেন', bloodGroup: 'B+' },
    { date: '২২ ফেব্রুয়ারি, ২০২২', location: 'রংপুর মেডিকেল কলেজ হাসপাতাল', recipient: 'কামরুল হাসান', bloodGroup: 'B+' },
  ]

  // Sample organization data
  const userOrganizations: UserOrganization[] = [
    {
      organization: {
        _id: '1',
        organizationName: 'রংপুর মেডিকেল কলেজ হাসপাতাল',
        organizationType: 'হাসপাতাল',
        establishmentYear: '1976',
        registrationNumber: 'REG123456',
        website: 'https://rmch.gov.bd',
        description: 'রংপুর মেডিকেল কলেজ হাসপাতাল উত্তর বাংলাদেশের অন্যতম বড় সরকারি হাসপাতাল।',
        email: 'info@rmch.gov.bd',
        phone: '0521-63388',
        districtId: 'rangpur',
        thanaId: 'rangpur-sadar',
        address: 'মেডিকেল ক্যাম্পাস, ধাপ, রংপুর-৫৪০০',
        representativeName: 'ডা. আসাদুজ্জামান',
        representativePosition: 'অধ্যক্ষ',
        representativePhone: '0521-63389',
        representativeEmail: 'principal@rmch.gov.bd',
        hasBloodBank: true,
        providesEmergencyBlood: true,
        availableBloodGroups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        logoImage: null,
        logoImageUrl: '/assets/org-logo-1.png',
        agreedToTerms: true,
        isBanned: false,
        banReason: '',
        isActive: true,
        createdAt: '2020-01-01',
        updatedAt: '2023-05-10'
      },
      role: 'এডমিন',
      joinedAt: '১০ জানুয়ারি, ২০২১'
    },
    {
      organization: {
        _id: '2',
        organizationName: 'লাইফ সেভার ব্লাড ডোনারস ক্লাব',
        organizationType: 'সংগঠন',
        establishmentYear: '2015',
        registrationNumber: 'NGO78901',
        website: 'https://lifesaversbd.org',
        description: 'স্বেচ্ছাসেবী সংগঠন যারা জরুরি রক্তদানে সহায়তা করে থাকে।',
        email: 'contact@lifesaversbd.org',
        phone: '01712-345678',
        districtId: 'rangpur',
        thanaId: 'rangpur-sadar',
        address: 'কলেজ রোড, রংপুর',
        representativeName: 'কামাল হোসেন',
        representativePosition: 'সভাপতি',
        representativePhone: '01712-345679',
        representativeEmail: 'president@lifesaversbd.org',
        hasBloodBank: false,
        providesEmergencyBlood: true,
        availableBloodGroups: ['A+', 'B+', 'AB+', 'O+'],
        logoImage: null,
        logoImageUrl: '/assets/org-logo-2.png',
        agreedToTerms: true,
        isBanned: false,
        banReason: '',
        isActive: true,
        createdAt: '2015-03-15',
        updatedAt: '2023-01-20'
      },
      role: 'সদস্য',
      joinedAt: '০৫ মার্চ, ২০২০'
    }
  ]

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <ProfileHeader userProfile={userProfile} />

        {/* Profile Tabs */}
        <div className="mt-6">
          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'overview' && <ProfileOverview userProfile={userProfile} />}
            {activeTab === 'donations' && <DonationHistory userProfile={userProfile} donationHistory={donationHistory} />}
            {activeTab === 'organizations' && <Organizations userOrganizations={userOrganizations} />}
            {activeTab === 'settings' && <ProfileSettings />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
