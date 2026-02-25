'use client'

import { useEffect, useState } from 'react'
import ProfileHeader from './components/ProfileHeader'
import ProfileTabs from './components/ProfileTabs'
import ProfileOverview from './components/overview'
import DonationHistory from './components/donations/DonationHistory'
import Organizations from './components/organizations'
import ProfileSettings from './components/settings'
import { User } from '@/lib/types/userType'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import organizationType from '@/lib/types/organizationType'
import { logoutUser } from '@/app/actions/authentication'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { myOrganizations } from '@/app/actions/organization'

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
  const router = useRouter()
  const queryClient = useQueryClient()
  // const {mutate: myOrganizations, data} = useMyOrganizations()
  
  const {data: myOrganizationsData, refetch: refetchMyOrganizations} = useQuery({
    queryKey: ["my_organizations"],
    queryFn:async() => await myOrganizations(),
    staleTime: 1000 * 60 * 5
  })
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
    profileImageUrl: userData?.profileImageUrl ? `${userData.profileImageUrl}` : '/images/dummy-image.jpg',
    bloodGroup: userData?.bloodGroup ?? "",
    phone: userData?.phone ?? '',
    email: userData?.email ?? '',
    districtId: userData?.districtId ?? '',
    thanaId: userData?.thanaId ?? '',
    address: userData?.address ?? '',
    lastDonationDate: userData?.lastDonationDate ?? '',
    totalDonationCount: userData?.totalDonationCount ?? 0,
    badges: userData?.badges ?? [],
    nextDonationDate: userData?.nextDonationDate ?? '',
    canDonate: userData?.canDonate ?? false,
    createdAt: userData?.createdAt ?? '',
    birthDate: userData?.birthDate ?? '',
    gender: userData?.gender ?? '',
    latitude: userData?.latitude ?? 0,
    longitude: userData?.longitude ?? 0,
    agreedToTerms: true,
    profileImage: null,
    reportCount: userData?.reportCount ?? 0, // Number of times this user has been reported
    organizationId: userData?.organizationId ?? []
  }

  const handleLogout = async() => {
    const data = await logoutUser();
    if(data.success){
      toast.success(data.message)
      queryClient.clear()
      router.push("/")
    }
  }
  // Sample organization data
  const userOrganizations: myOrganizationType = myOrganizationsData

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <ProfileHeader userProfile={userProfile} onLogout={handleLogout} />

        {/* Profile Tabs */}
        <div className="mt-6">
          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'overview' && <ProfileOverview userProfile={userProfile} />}
            {activeTab === 'donations' && <DonationHistory userProfile={userProfile} />}
            {activeTab === 'organizations' && <Organizations userOrganizations={userOrganizations} memberOforg={userProfile.organizationId || []} refetchMyOrganizations={refetchMyOrganizations} />}
            {activeTab === 'settings' && <ProfileSettings />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
