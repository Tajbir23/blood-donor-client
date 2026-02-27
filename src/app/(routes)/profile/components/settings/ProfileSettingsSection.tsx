'use client'

import { useState } from 'react'
import { FaUser, FaLock, FaEdit, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa'
import { User } from '@/lib/types/userType'
import { changePassword, updateProfile } from '@/app/actions/userAction'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import LocationSelector from '@/components/ui/location-selector'
import LocationInput from '@/components/LocationInput'

interface ProfileSettingsSectionProps {
  userProfile: User;
}

const ProfileSettingsSection = ({ userProfile }: ProfileSettingsSectionProps) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const queryClient = useQueryClient()

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [profileData, setProfileData] = useState({
    fullName: userProfile.fullName || '',
    phone: userProfile.phone || '',
    bloodGroup: userProfile.bloodGroup || '',
    address: userProfile.address || '',
    districtId: userProfile.districtId || '',
    thanaId: userProfile.thanaId || '',
    divisionId: '',
    latitude: userProfile.latitude || 0,
    longitude: userProfile.longitude || 0
  })

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('নতুন পাসওয়ার্ড মিলছে না')
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে')
      return
    }

    setPasswordLoading(true)
    try {
      const result = await changePassword(passwordData.currentPassword, passwordData.newPassword)
      if (result.success) {
        toast.success(result.message)
        setShowPasswordModal(false)
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      } else {
        toast.error(result.message)
      }
    } catch {
      toast.error('পাসওয়ার্ড পরিবর্তন করতে ব্যর্থ হয়েছে')
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileLoading(true)
    try {
      const { divisionId, ...dataToSend } = profileData
      void divisionId
      const result = await updateProfile(dataToSend)
      if (result.success) {
        toast.success(result.message)
        setShowEditModal(false)
        queryClient.invalidateQueries({ queryKey: ['user'] })
      } else {
        toast.error(result.message)
      }
    } catch {
      toast.error('প্রোফাইল আপডেট করতে ব্যর্থ হয়েছে')
    } finally {
      setProfileLoading(false)
    }
  }

  const handleLocationChange = (location: { lat: number; lng: number }) => {
    setProfileData(prev => ({ ...prev, latitude: location.lat, longitude: location.lng }))
  }

  const handleLocationSelectChange = (type: string, value: string) => {
    setProfileData(prev => ({ ...prev, [type]: value }))
  }

  return (
    <div>
      <h3 className="text-md font-medium text-gray-900 flex items-center">
        <FaUser className="mr-2 text-gray-400" /> প্রোফাইল সেটিংস
      </h3>
      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button 
          onClick={() => setShowEditModal(true)}
          className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm text-gray-600 flex items-center">
            <FaEdit className="mr-2 text-gray-400" /> প্রোফাইল আপডেট করুন
          </span>
          <span className="text-red-600">→</span>
        </button>
        <button 
          onClick={() => setShowPasswordModal(true)}
          className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm text-gray-600 flex items-center">
            <FaLock className="mr-2 text-gray-400" /> পাসওয়ার্ড পরিবর্তন করুন
          </span>
          <span className="text-red-600">→</span>
        </button>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowPasswordModal(false)}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <form onSubmit={handlePasswordChange}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <FaLock className="mr-2 text-red-500" /> পাসওয়ার্ড পরিবর্তন
                    </h3>
                    <button type="button" onClick={() => setShowPasswordModal(false)} className="text-gray-400 hover:text-gray-500">
                      <FaTimes />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">বর্তমান পাসওয়ার্ড</label>
                      <div className="relative mt-1">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          id="currentPassword"
                          required
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          placeholder="বর্তমান পাসওয়ার্ড লিখুন"
                        />
                        <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                          {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">নতুন পাসওয়ার্ড</label>
                      <div className="relative mt-1">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          id="newPassword"
                          required
                          minLength={6}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          placeholder="নতুন পাসওয়ার্ড লিখুন (কমপক্ষে ৬ অক্ষর)"
                        />
                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                          {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">নতুন পাসওয়ার্ড নিশ্চিত করুন</label>
                      <div className="relative mt-1">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          required
                          minLength={6}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          placeholder="নতুন পাসওয়ার্ড আবার লিখুন"
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                        <p className="mt-1 text-xs text-red-500">পাসওয়ার্ড মিলছে না</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {passwordLoading ? 'পরিবর্তন হচ্ছে...' : 'পাসওয়ার্ড পরিবর্তন করুন'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    বাতিল
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowEditModal(false)}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleProfileUpdate}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <FaEdit className="mr-2 text-red-500" /> প্রোফাইল সম্পাদনা
                    </h3>
                    <button type="button" onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-500">
                      <FaTimes />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">নাম</label>
                      <input
                        type="text"
                        id="fullName"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">রক্তের গ্রুপ</label>
                      <select
                        id="bloodGroup"
                        value={profileData.bloodGroup}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bloodGroup: e.target.value }))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">ফোন নম্বর</label>
                      <input
                        type="tel"
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">ঠিকানা</label>
                      <textarea
                        id="address"
                        rows={2}
                        value={profileData.address}
                        onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">অবস্থান</label>
                      <LocationSelector
                        onDivisionChange={(value) => handleLocationSelectChange('divisionId', value)}
                        onDistrictChange={(value) => handleLocationSelectChange('districtId', value)}
                        onThanaChange={(value) => handleLocationSelectChange('thanaId', value)}
                        defaultDivisionId={profileData.divisionId}
                        defaultDistrictId={profileData.districtId}
                        defaultThanaId={profileData.thanaId}
                      />
                    </div>
                    <LocationInput
                      onLocationChange={handleLocationChange}
                      width="100%"
                      mapHeight="200px"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {profileLoading ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    বাতিল
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileSettingsSection 