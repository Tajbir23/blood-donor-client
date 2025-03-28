'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Loading from '@/app/libs/Loading'

interface OtpVerificationProps {
  email: string
  onVerify: (otp: string) => Promise<boolean>
  onResendOtp?: () => Promise<boolean>
  redirectUrl?: string
  resendTimeout?: number
  loading?: boolean
}

const OtpVerification = ({
  email,
  onVerify,
  onResendOtp,
  redirectUrl = '/login',
  resendTimeout = 60,
  loading = false
}: OtpVerificationProps) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [error, setError] = useState<string>('')
  const [countdown, setCountdown] = useState<number>(resendTimeout)
  const [canResend, setCanResend] = useState<boolean>(false)
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true)
      return
    }
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [countdown])
  
  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    if (error) setError('')
    
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    
    if (!/^\d+$/.test(pastedData)) return
    
    const digits = pastedData.split('').slice(0, 6)
    const newOtp = [...otp]
    
    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit
      }
    })
    
    setOtp(newOtp)
    
    const focusIndex = Math.min(digits.length, 5)
    inputRefs.current[focusIndex]?.focus()
  }
  
  const handleVerify = async () => {
    if (otp.some(digit => !digit)) {
      setError('অনুগ্রহ করে সম্পূর্ণ ওটিপি দিন')
      return
    }
    
    try {
      const success = await onVerify(otp.join(''))
      if (!success) {
        setError('অবৈধ ওটিপি। আবার চেষ্টা করুন।')
      }
    } catch (error) {
      console.error('Verification error:', error)
      setError('যাচাইকরণে সমস্যা হয়েছে। আবার চেষ্টা করুন।')
    }
  }
  
  const handleResendOtp = async () => {
    if (!canResend || !onResendOtp) return
    
    try {
      const success = await onResendOtp()
      if (success) {
        setCountdown(resendTimeout)
        setCanResend(false)
      } else {
        setError('ওটিপি পুনরায় পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।')
      }
    } catch (error) {
      console.error('Resend OTP error:', error)
      setError('ওটিপি পুনরায় পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।')
    }
  }
  
  return (
    <div className="border-l-4 border-red-500 pl-4 pb-2">
      <h3 className="text-lg font-medium text-gray-800 mb-4">ইমেইল যাচাইকরণ</h3>
      
      <div className="mb-4">
        <p className="text-gray-700 mb-2">
          আমরা <span className="font-medium">{email}</span> এ একটি যাচাইকরণ কোড পাঠিয়েছি।
        </p>
        <p className="text-sm text-gray-600 mb-4">
          অনুগ্রহ করে আপনার ইমেইল যাচাই করতে কোডটি নিচে লিখুন।
        </p>
        
        <div className="flex justify-center gap-2 mb-4">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el }}
              type="text"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              aria-label={`OTP digit ${index + 1}`}
              title={`OTP digit ${index + 1}`}
              className="w-12 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={loading}
            />
          ))}
        </div>
        
        {error && (
          <div className="text-red-500 text-sm text-center mb-4">
            {error}
          </div>
        )}
        
        {onResendOtp && (
          <div className="flex justify-center mb-4">
            <button
              onClick={handleResendOtp}
              disabled={!canResend || loading}
              className="cursor-pointer text-red-600 hover:text-red-700 text-sm font-medium disabled:text-gray-400"
            >
              {canResend 
                ? 'কোড পুনরায় পাঠান'
                : `পুনরায় পাঠানোর জন্য অপেক্ষা করুন (${countdown}s)`
              }
            </button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-4">
        <button 
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center disabled:bg-red-300"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loading size="small" color="#ffffff" />
              <span className="ml-2">যাচাই করা হচ্ছে...</span>
            </div>
          ) : (
            'যাচাই করুন'
          )}
        </button>
        
        <p className="text-center text-gray-600 mt-2">
          <Link href={redirectUrl} className="text-red-600 hover:underline">লগইন পেজে ফিরে যান</Link>
        </p>
      </div>
    </div>
  )
}

export default OtpVerification 