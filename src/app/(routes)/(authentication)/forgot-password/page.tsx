'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Loading from '@/app/libs/Loading'
import { forgotPassword } from '@/app/actions/authentication'

const ForgotPasswordPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('অনুগ্রহ করে আপনার ইমেইল ঠিকানা দিন')
      return
    }

    try {
      setLoading(true)
      // TODO: Implement forgot password API call
      const response = await forgotPassword(email)
      
      if(response.success){
        toast.success(response.message)
        router.push('/login')
      }else {
        toast.error(response.message)
      }
    } catch (error) {
      console.error('Forgot password error:', error)
      toast.error('পাসওয়ার্ড রিসেট লিংক পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            পাসওয়ার্ড ভুলে গেছেন?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            আপনার ইমেইল ঠিকানা দিন, আমরা আপনাকে ইমেইল এ নতুন পাসওয়ার্ড পাঠাবো
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                ইমেইল ঠিকানা
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="ইমেইল ঠিকানা"
                disabled={loading}
              />
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center">
              <Loading size="small" color="#ef4444" />
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300"
            >
              {loading ? 'পাঠানো হচ্ছে...' : 'পাসওয়ার্ড পাঠান'}
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/login"
              className="font-medium text-red-600 hover:text-red-500"
            >
              লগইন পেজে ফিরে যান
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
