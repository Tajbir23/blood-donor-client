'use client'

import { useState } from 'react'
import { FaCog, FaTrash, FaDownload, FaTimes, FaExclamationTriangle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { deleteAccount } from '@/app/actions/userAction'
import { logoutUser } from '@/app/actions/authentication'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

const AccountActionsSection = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (confirmText !== 'DELETE') {
      toast.error('অনুগ্রহ করে "DELETE" লিখুন')
      return
    }

    if (!deletePassword) {
      toast.error('পাসওয়ার্ড দিন')
      return
    }

    setDeleteLoading(true)
    try {
      const result = await deleteAccount(deletePassword)
      if (result.success) {
        toast.success(result.message)
        await logoutUser()
        queryClient.clear()
        router.push('/')
      } else {
        toast.error(result.message)
      }
    } catch {
      toast.error('অ্যাকাউন্ট ডিলিট করতে ব্যর্থ হয়েছে')
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleDownloadData = () => {
    toast.success('ডাটা ডাউনলোড শীঘ্রই আসছে')
  }

  return (
    <div>
      <h3 className="text-md font-medium text-gray-900 flex items-center">
        <FaCog className="mr-2 text-gray-400" /> অ্যাকাউন্ট অ্যাকশন
      </h3>
      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button 
          onClick={handleDownloadData}
          className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm text-gray-600 flex items-center">
            <FaDownload className="mr-2 text-gray-400" /> ডাটা ডাউনলোড করুন
          </span>
          <span className="text-red-600">→</span>
        </button>
        <button 
          onClick={() => setShowDeleteModal(true)}
          className="flex justify-between items-center px-4 py-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
        >
          <span className="text-sm text-red-600 flex items-center">
            <FaTrash className="mr-2" /> অ্যাকাউন্ট ডিলিট করুন
          </span>
          <span className="text-red-600">→</span>
        </button>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowDeleteModal(false)}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <form onSubmit={handleDeleteAccount}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-red-600 flex items-center">
                      <FaExclamationTriangle className="mr-2" /> অ্যাকাউন্ট ডিলিট
                    </h3>
                    <button type="button" onClick={() => setShowDeleteModal(false)} className="text-gray-400 hover:text-gray-500">
                      <FaTimes />
                    </button>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-red-700 font-medium mb-2">সতর্কতা!</p>
                    <ul className="text-xs text-red-600 space-y-1 list-disc list-inside">
                      <li>এই কাজটি অপরিবর্তনীয়</li>
                      <li>আপনার সমস্ত তথ্য স্থায়ীভাবে মুছে যাবে</li>
                      <li>রক্তদানের ইতিহাস মুছে যাবে</li>
                      <li>এই অ্যাকাউন্ট পুনরুদ্ধার করা সম্ভব হবে না</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="confirmDelete" className="block text-sm font-medium text-gray-700">
                        নিশ্চিত করতে <span className="font-bold text-red-600">DELETE</span> লিখুন
                      </label>
                      <input
                        type="text"
                        id="confirmDelete"
                        required
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder='এখানে "DELETE" লিখুন'
                      />
                    </div>
                    <div>
                      <label htmlFor="deletePassword" className="block text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
                      <div className="relative mt-1">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="deletePassword"
                          required
                          value={deletePassword}
                          onChange={(e) => setDeletePassword(e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          placeholder="আপনার পাসওয়ার্ড দিন"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                  <button
                    type="submit"
                    disabled={deleteLoading || confirmText !== 'DELETE'}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleteLoading ? 'ডিলিট হচ্ছে...' : 'অ্যাকাউন্ট ডিলিট করুন'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteModal(false)
                      setDeletePassword('')
                      setConfirmText('')
                    }}
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

export default AccountActionsSection 