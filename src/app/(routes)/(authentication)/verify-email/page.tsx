'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import OtpVerification from '@/components/auth/OtpVerification'
import { verifyOtp, resendOtp } from '@/app/actions/otpActions'
import toast from 'react-hot-toast'

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const otpType = searchParams.get('otpType') || ''
  const [loading, setLoading] = useState(false)
  
  // Handle OTP verification
  const handleVerify = async (otp: string) => {
    if (!email) {
      toast.error('Email address is missing. Please try again.')
      return false
    }
    
    try {
      setLoading(true)
      const response = await verifyOtp(email, otp, otpType)
      
      if (response.success) {
        toast.success('Email verified successfully!')
        router.push('/verification-success')
        return true
      } else {
        toast.error(response.message || 'Invalid OTP. Please try again.')
        return false
      }
    } catch (error) {
      let message = 'Verification failed. Please try again.'
      if (error instanceof Error) {
        message = error.message
      }
      toast.error(message)
      return false
    } finally {
      setLoading(false)
    }
  }
  
  // Handle resending OTP
  const handleResendOtp = async () => {
    if (!email) {
      toast.error('Email address is missing. Please try again.')
      return false
    }
    
    try {
      setLoading(true)
      const response = await resendOtp(email)
      
      if (response.success) {
        toast.success('OTP resent successfully!')
        return true
      } else {
        toast.error(response.message || 'Failed to resend OTP. Please try again.')
        return false
      }
    } catch (error) {
      let message = 'Failed to resend OTP. Please try again.'
      if (error instanceof Error) {
        message = error.message
      }
      toast.error(message)
      return false
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-6">ইমেইল যাচাইকরণ</h2>
      
      {email ? (
        <OtpVerification 
          email={email}
          onVerify={handleVerify}
          onResendOtp={handleResendOtp}
          redirectUrl="/login"
          resendTimeout={60}
          loading={loading}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-700 mb-4">ইমেইল ঠিকানা পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।</p>
          <button
            onClick={() => router.push('/login')}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium"
          >
            লগইন পেজে ফিরে যান
          </button>
        </div>
      )}
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Loading...</h2>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
} 