'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useLoginUser from '@/app/hooks/useLoginUser'
import Loading from '@/app/libs/Loading'

const LoginForm = () => {
  const {mutate: loginUser, isPending, data} = useLoginUser()
  const router = useRouter()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    identity: '',
    password: '',
    rememberMe: true
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  useEffect(() => {
    if (data?.success) {
      setTimeout(() => {
        router.push("/")
      }, 100)
    }
  }, [data, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await loginUser(formData)
    } catch (err) {
      console.log(err)
      setError('লগইন করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।')
    }
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="identity" className="block text-sm font-medium text-gray-700">
              ইমেইল বা ফোন নম্বর
            </label>
            <div className="mt-1">
              <input
                id="identity"
                name="identity"
                type="text"
                autoComplete="username"
                required
                value={formData.identity}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="আপনার ইমেইল বা ফোন নম্বর লিখুন"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              পাসওয়ার্ড
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                আমাকে মনে রাখুন
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-red-600 hover:text-red-500">
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                bg-red-600 hover:bg-red-700 disabled:bg-red-300
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors`}
            >
              {isPending ? (
                <div className="flex items-center justify-center">
                  <Loading size="small" color="#ffffff" />
                  <span className="ml-2">লগইন হচ্ছে...</span>
                </div>
              ) : (
                'লগইন করুন'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">অথবা</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                একাউন্ট নেই?{' '}
                <Link href="/register" className="font-medium text-red-600 hover:text-red-500">
                  নিবন্ধন করুন
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
