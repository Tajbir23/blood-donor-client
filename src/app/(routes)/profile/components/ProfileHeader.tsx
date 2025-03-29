import Image from 'next/image'
import { FaMapMarkerAlt, FaExclamationTriangle } from 'react-icons/fa'
import { User } from '@/lib/types/userType'

interface ProfileHeaderProps {
  userProfile: User
}

const ProfileHeader = ({ userProfile }: ProfileHeaderProps) => {
  // Function to display location from district and thana IDs
  const getDisplayLocation = () => {
    // This would normally be a lookup to convert IDs to names
    // For now, we'll just use the address or IDs
    return `${userProfile.address}`
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-red-500 to-red-700 h-32"></div>
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="-mt-16 sm:mr-6 flex-shrink-0">
            <div className="relative h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-gray-100">
              <Image 
                src={userProfile.profileImageUrl || '/assets/default-profile.jpg'} 
                alt={userProfile.fullName}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="mt-6 sm:mt-0 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{userProfile.fullName}</h1>
                <div className="flex items-center justify-center sm:justify-start mt-1 text-gray-600">
                  <FaMapMarkerAlt className="mr-1 text-red-600" />
                  <span>{getDisplayLocation()}</span>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700">
                  {userProfile.canDonate ? 'রক্তদানের জন্য প্রস্তুত' : 'পরবর্তী রক্তদান: ' + userProfile.nextDonationDate}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-red-600 text-3xl font-bold">{userProfile.bloodGroup}</div>
                <div className="text-gray-600 text-sm mt-1">রক্তের গ্রুপ</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-red-600 text-3xl font-bold">{userProfile.totalDonations || 0}</div>
                <div className="text-gray-600 text-sm mt-1">মোট রক্তদান</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-red-600 text-3xl font-bold">{userProfile.badges?.length || 0}</div>
                <div className="text-gray-600 text-sm mt-1">অর্জন</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-4 text-center">
                <div className="text-amber-600 text-3xl font-bold flex items-center justify-center">
                  {userProfile.reportCount || 0}
                  {userProfile.reportCount && userProfile.reportCount > 0 && (
                    <FaExclamationTriangle className="ml-1 text-amber-500 text-lg" />
                  )}
                </div>
                <div className="text-gray-600 text-sm mt-1">রিপোর্ট</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader 