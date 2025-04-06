'use client'

import { updateBloodDonationDate } from '@/app/actions/userAction';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react'
import toast from 'react-hot-toast';

interface BloodDonationModalProps {
  isOpen: boolean;
  onClose?: () => void;
  page?: boolean;
}

// Recipients/locations options
const RECIPIENTS = [
  { value: 'hospital', label: 'হাসপাতাল' },
  { value: 'blood_bank', label: 'ব্লাড ব্যাংক' },
  { value: 'patient', label: 'রোগীর জন্য সরাসরি' },
  { value: 'charity', label: 'রক্তদান ক্যাম্প' },
  { value: 'other', label: 'অন্যান্য' }
]

const BloodDonationModal: React.FC<BloodDonationModalProps> = ({ isOpen, onClose = () => {}, page = false }) => {
  const queryClient = useQueryClient()
  const [donationDate, setDonationDate] = useState('')
  const [recipient, setRecipient] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [error, setError] = useState('')
  

  // Get today's date in YYYY-MM-DD format for max date validation
  const today = new Date().toISOString().split('T')[0]
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    
    if (!donationDate) {
      setError('রক্তদানের তারিখ নির্বাচন করুন')
      return
    }
    
    if (!recipient) {
      setError('রক্তদানের স্থান/প্রাপক নির্বাচন করুন')
      return
    }

    const userDonationDate = new Date(donationDate)
    
    const response = await updateBloodDonationDate(userDonationDate, recipient, recipientName)
    if(response.success){
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + 120)
      
      queryClient.setQueryData(['bloodDonationCheck'], {
        answered: true,
        expiry: expiryDate.toISOString()
      })

      toast.success('রক্তদানের তথ্য সফলভাবে যোগ করা হয়েছে')
      !page && onClose()
    }else{
      setError(response.message)
    }
    
  }
  
  if (!isOpen) return null
  
  return (
    <div className={`${!page ? 'fixed' : ''} inset-0 z-50 flex items-center justify-center`}>
      {/* Backdrop */}
      {!page && <div className="fixed inset-0 bg-black/30 backdrop-blur-md" onClick={onClose}></div>}
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">রক্তদানের তথ্য যোগ করুন</h3>
          {!page && (
            <button 
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={onClose}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-2 bg-red-50 text-red-600 border border-red-100 rounded-md">
              {error}
            </div>
          )}
          
          {/* Date field */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              রক্তদানের তারিখ
            </label>
            <input
              type="date"
              max={today}
              value={donationDate}
              onChange={(e) => setDonationDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>
          
          {/* Recipient type */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              রক্তদানের স্থান/প্রাপক
            </label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              <option value="">নির্বাচন করুন</option>
              {RECIPIENTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Recipient name */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              প্রাপকের নাম/স্থানের নাম
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
              placeholder="উদাহরণ: ঢাকা মেডিকেল কলেজ হাসপাতাল"
            />
          </div>
          
          {/* Submit button */}
          <div className="flex justify-end">
            {!page && (
              <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
                বাতিল
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              সেভ করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BloodDonationModal 