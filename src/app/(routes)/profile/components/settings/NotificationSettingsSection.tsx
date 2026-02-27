'use client'

import { useState } from 'react'
import { FaBell } from 'react-icons/fa'
import ToggleSwitch from './ToggleSwitch'
import { User } from '@/lib/types/userType'
import { updateNotificationPreferences } from '@/app/actions/userAction'
import toast from 'react-hot-toast'

interface NotificationSettingsSectionProps {
  userProfile: User;
}

const NotificationSettingsSection = ({ userProfile }: NotificationSettingsSectionProps) => {
  const [saving, setSaving] = useState<string | null>(null)

  const handleToggle = async (key: 'bloodRequestNotification' | 'emailNotification', value: boolean) => {
    setSaving(key)
    try {
      const result = await updateNotificationPreferences({ [key]: value })
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message || 'আপডেট করতে ব্যর্থ হয়েছে')
      }
    } catch {
      toast.error('সার্ভার ত্রুটি হয়েছে')
    } finally {
      setSaving(null)
    }
  }

  return (
    <div>
      <h3 className="text-md font-medium text-gray-900 flex items-center">
        <FaBell className="mr-2 text-gray-400" /> নোটিফিকেশন সেটিংস
      </h3>
      <div className="mt-2 space-y-4">
        <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
          <div>
            <p className="text-sm font-medium text-gray-700">রক্তের অনুরোধ নোটিফিকেশন</p>
            <p className="text-xs text-gray-500">আপনার রক্তের গ্রুপের জন্য অনুরোধ এলে জানান</p>
          </div>
          <div className="flex items-center gap-2">
            {saving === 'bloodRequestNotification' && (
              <span className="text-xs text-gray-400">সংরক্ষণ হচ্ছে...</span>
            )}
            <ToggleSwitch
              id="blood-request-notification"
              label="রক্তের অনুরোধ নোটিফিকেশন সক্রিয় করুন"
              checked={userProfile.notificationPreferences?.bloodRequestNotification ?? true}
              disabled={saving === 'bloodRequestNotification'}
              onChange={(checked) => handleToggle('bloodRequestNotification', checked)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
          <div>
            <p className="text-sm font-medium text-gray-700">ইমেইল নোটিফিকেশন</p>
            <p className="text-xs text-gray-500">সিস্টেম আপডেট ইমেইলে পাঠান</p>
          </div>
          <div className="flex items-center gap-2">
            {saving === 'emailNotification' && (
              <span className="text-xs text-gray-400">সংরক্ষণ হচ্ছে...</span>
            )}
            <ToggleSwitch
              id="email-notification"
              label="ইমেইল নোটিফিকেশন সক্রিয় করুন"
              checked={userProfile.notificationPreferences?.emailNotification ?? true}
              disabled={saving === 'emailNotification'}
              onChange={(checked) => handleToggle('emailNotification', checked)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationSettingsSection 