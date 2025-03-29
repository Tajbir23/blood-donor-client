import { FaUser } from 'react-icons/fa'
import Link from 'next/link'

const ProfileSettingsSection = () => {
  return (
    <div>
      <h3 className="text-md font-medium text-gray-900 flex items-center">
        <FaUser className="mr-2 text-gray-400" /> প্রোফাইল সেটিংস
      </h3>
      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href="/profile/edit" className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100">
          <span className="text-sm text-gray-600">প্রোফাইল আপডেট করুন</span>
          <span className="text-red-600">→</span>
        </Link>
        <Link href="/profile/password" className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100">
          <span className="text-sm text-gray-600">পাসওয়ার্ড পরিবর্তন করুন</span>
          <span className="text-red-600">→</span>
        </Link>
      </div>
    </div>
  )
}

export default ProfileSettingsSection 