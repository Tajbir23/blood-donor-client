'use client'

import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import decodedJwtType from '@/lib/types/decodedJwtType';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/types/userType';
interface UpdateBloodDonationDateProps {
  Modal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
  }>;
}

interface DonationCheck {
  answered: boolean;
  expiry: string;
}

interface UserDataType {
  user: User;
}

const UpdateBloodDonationDate: React.FC<UpdateBloodDonationDateProps> = ({ Modal }) => {
  const [showModal, setShowModal] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()
  const [userData, setUserData] = useState<User>()
  
  // Check if user has already answered using direct query client access
  useEffect(() => {
    const timeOut = setTimeout(() => {
      const donationCheck = queryClient.getQueryData<DonationCheck>(['bloodDonationCheck']);
      const user = queryClient.getQueryData<UserDataType>(['user']);
      setUserData(user?.user)
      const lastDonationDate = user?.user?.lastDonationDate ? new Date(user?.user?.lastDonationDate) : null;
      const expiryDate = donationCheck ? new Date(donationCheck.expiry) : null;
      const currentDate = new Date();
  
      let shouldShow = true;
  
      // যদি lastDonationDate থাকে, তাহলে ১২০ দিনের চেক করবো
      console.log("lastDonationDate", lastDonationDate)
      if (lastDonationDate) {
        const daysDiff = Math.floor((currentDate.getTime() - lastDonationDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff <= 120) {
          shouldShow = false;
        }
      }
  
      // যদি donationCheck থাকে এবং expiryDate এখনো ভবিষ্যতের হয়
      if (expiryDate && expiryDate > currentDate) {
        shouldShow = false;
      }
  
      setShouldShow(shouldShow);
    }, 1000); // 1 সেকেন্ড পর এক্সিকিউট হবে
  
    return () => clearTimeout(timeOut); // ক্লিনআপ ফাংশন
  
  }, [queryClient]);
  

  const handleYesClick = () => {
    if(!userData){
        router.push('/login')
        return
    }
    setShowModal(true)
  }

  const handleNoClick = () => {
    // Store in query cache for 10 days
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 10)
    
    queryClient.setQueryData(['bloodDonationCheck'], {
      answered: true,
      expiry: expiryDate.toISOString()
    })
    
    setShouldShow(false)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  if (!shouldShow) return null

  return (
    <div className="flex items-center justify-around p-3 bg-red-50 border border-red-100 rounded-lg lg:py-2 lg:px-20">
      <span className="text-red-800 font-medium">আপনি কি সাম্প্রতিক সময়ে রক্তদান করেছেন?</span>
      <div className="flex gap-2">
        <button 
          className="cursor-pointer px-3 py-1 text-sm bg-green-100 hover:bg-green-200 text-green-800 border border-green-200 rounded"
          onClick={handleYesClick}
        >
          হ্যাঁ
        </button>
        <button 
          className="cursor-pointer px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-800 border border-red-200 rounded"
          onClick={handleNoClick}
        >
          না
        </button>
      </div>

      {Modal && (
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default UpdateBloodDonationDate
