'use client'

import { User } from '@/lib/types/userType'
import ProfileSettingsSection from './ProfileSettingsSection'
import NotificationSettingsSection from './NotificationSettingsSection'
import AccountActionsSection from './AccountActionsSection'

interface ProfileSettingsProps {
  userProfile: User;
}

const ProfileSettings = ({ userProfile }: ProfileSettingsProps) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">অ্যাকাউন্ট সেটিংস</h2>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <div className="space-y-6">
          <ProfileSettingsSection userProfile={userProfile} />
          <NotificationSettingsSection userProfile={userProfile} />
          <AccountActionsSection />
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings 