'use client'
import RegAsUser from './RegAsUser'
import AppLogo from '@/components/ui/AppLogo'
import { APP_NAME } from '@/lib/constants/app'
import Link from 'next/link'

export default function Register() {
  return (
    <main className="min-h-screen bg-stone-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-3">
            <AppLogo size={56} nameClassName="font-serif text-2xl font-bold text-red-700" asLink={false} />
          </div>
          <h1 className="font-serif text-2xl font-bold text-stone-800 mt-1">{APP_NAME}&#8208;এ যোগ দিন</h1>
          <p className="text-sm text-stone-500 mt-1">রক্তদাতা হয়ে জীবন বাঁচানোর মিশনে অংশ নিন</p>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-5 py-4 mb-6 flex gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-blue-800 mb-0.5">রক্তদাতা হিসেবে নিবন্ধন করুন</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              আপনার রক্তের গ্রুপ, ঠিকানা ও যোগাযোগ তথ্য সংরক্ষণ করা হবে।
              বাংলাদেশের যেকোনো জরুরি সময় আপনার সাথে যোগাযোগ করতে পারবেন।
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
          <div className="h-1 bg-red-700" />
          <RegAsUser />
        </div>

        <p className="text-center text-sm text-stone-500 mt-6">
          আগে থেকেই অ্যাকাউন্ট আছে?{' '}
          <Link href="/login" className="text-red-700 font-semibold hover:underline">লগইন করুন</Link>
        </p>
      </div>
    </main>
  )
}
