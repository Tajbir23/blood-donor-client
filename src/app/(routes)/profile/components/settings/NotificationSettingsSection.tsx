import { FaBell } from 'react-icons/fa'
import ToggleSwitch from './ToggleSwitch'

const NotificationSettingsSection = () => {
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
          <ToggleSwitch 
            id="blood-request-notification"
            label="রক্তের অনুরোধ নোটিফিকেশন সক্রিয় করুন"
            defaultChecked={true}
          />
        </div>

        <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
          <div>
            <p className="text-sm font-medium text-gray-700">ইমেইল নোটিফিকেশন</p>
            <p className="text-xs text-gray-500">সিস্টেম আপডেট ইমেইলে পাঠান</p>
          </div>
          <ToggleSwitch 
            id="email-notification"
            label="ইমেইল নোটিফিকেশন সক্রিয় করুন"
            defaultChecked={true}
          />
        </div>
      </div>
    </div>
  )
}

export default NotificationSettingsSection 