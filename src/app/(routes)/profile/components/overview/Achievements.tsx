import { FaTint } from 'react-icons/fa'
import { User } from '@/lib/types/userType'

interface AchievementsProps {
  userProfile: User;
}

const Achievements = ({ userProfile }: AchievementsProps) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">অর্জনসমূহ</h2>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        {userProfile.badges && userProfile.badges.length > 0 ? (
          <ul className="space-y-3">
            {userProfile.badges.map((badge, index) => (
              <li key={index} className="flex items-center bg-red-50 p-3 rounded-lg">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <FaTint className="h-5 w-5 text-red-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{badge}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">এখনো কোন অর্জন নেই। রক্তদান করে অর্জন অনলক করুন।</p>
        )}
      </div>
    </div>
  )
}

export default Achievements 