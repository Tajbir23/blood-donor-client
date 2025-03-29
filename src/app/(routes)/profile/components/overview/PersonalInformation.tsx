import { FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaTint, FaCalendarAlt, FaEdit } from 'react-icons/fa'
import { User } from '@/lib/types/userType'
import { useState } from 'react'
import EditDetailsModal from './EditDetailsModal';

interface PersonalInformationProps {
  userProfile: User;
}

const PersonalInformation = ({ userProfile }: PersonalInformationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white shadow rounded-lg lg:col-span-2">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">ব্যক্তিগত তথ্য</h2>
          <button 
            className="text-sm text-red-600 hover:text-red-800 flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <FaEdit className="mr-1" /> এডিট করুন
          </button>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FaUser className="mr-2 text-gray-400" /> নাম
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{userProfile.fullName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FaTint className="mr-2 text-gray-400" /> রক্তের গ্রুপ
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{userProfile.bloodGroup}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FaPhone className="mr-2 text-gray-400" /> ফোন নম্বর
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{userProfile.phone}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FaEnvelope className="mr-2 text-gray-400" /> ইমেইল
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{userProfile.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-400" /> ঠিকানা
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{userProfile.address}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-400" /> সদস্য হয়েছেন
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{userProfile.createdAt || 'N/A'}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && <EditDetailsModal userProfile={userProfile} setIsModalOpen={setIsModalOpen} />}
    </>
  )
}

export default PersonalInformation 