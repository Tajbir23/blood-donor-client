'use client'

import { useEffect, useState } from 'react'
import { Donation } from './types'
import ProfileHeader from './components/ProfileHeader'
import ProfileTabs from './components/ProfileTabs'
import ProfileOverview from './components/overview'
import DonationHistory from './components/donations/DonationHistory'
import Organizations from './components/organizations'
import ProfileSettings from './components/settings'
import { User } from '@/lib/types/userType'
import { useQueryClient } from '@tanstack/react-query'
import useMyOrganizations from '@/app/hooks/useMyOrganizations'
import organizationType from '@/lib/types/organizationType'

interface userQueryData {
  success: boolean;
  user: User
}

interface myOrganizationType {
  count: number,
  organizations: organizationType[]
}
const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [userData, setUserData] = useState<User>()
  const queryClient = useQueryClient()
  const {mutate: myOrganizations, data} = useMyOrganizations()
  
  useEffect(() => {
    const timeOut = setTimeout(() => {
      const user = queryClient.getQueryData<userQueryData>(['user'])
      setUserData(user?.user)
      myOrganizations()
    }, 500)
    
    return () => clearTimeout(timeOut)
  },[queryClient, myOrganizations])
  
  console.log(data)
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
  const userOrganizations: myOrganizationType = data

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
