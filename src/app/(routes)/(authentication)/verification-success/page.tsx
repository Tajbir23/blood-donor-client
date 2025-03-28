'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'


export default function VerificationSuccessPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Show a success toast
    toast.success('ইমেইল সফলভাবে যাচাই করা হয়েছে!')
    
    // Automatically redirect to login after 5 seconds
    const redirectTimer = setTimeout(() => {
      router.push('/login')
    }, 5000)
    
    return () => clearTimeout(redirectTimer)
  }, [router])
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center py-10">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            <svg className="h-16 w-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">ইমেইল যাচাইকরণ সফল হয়েছে!</h2>
        
        <p className="text-gray-600 mb-8">
          আপনার ইমেইল সফলভাবে যাচাই করা হয়েছে। আপনি এখন আপনার অ্যাকাউন্টে লগইন করতে পারেন।
        </p>
        
        <div className="flex justify-center">
          <Link 
            href="/login" 
            className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            লগইন করুন
          </Link>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          আপনি স্বয়ংক্রিয়ভাবে লগইন পেজে নিয়ে যাওয়া হবে...
        </p>
      </div>
    </div>
  )
} 