export const dynamic = 'force-static';
export const revalidate = 86400;

import { Suspense } from 'react';
import LoginFormWrapper from './LoginFormWrapper';
import { generateMetadata } from '@/app/config/metadata';
import AppLogo from '@/components/ui/AppLogo';
import { APP_NAME } from '@/lib/constants/app';
import Link from 'next/link';

export const metadata = generateMetadata({
  title: 'লগইন করুন',
  description: 'বাংলাদেশের রক্তদান কমিউনিটিতে যোগ দিন। লগইন করে আপনার অ্যাকাউন্টে প্রবেশ করুন এবং রক্তদান সেবা গ্রহণ করুন।',
  path: '/login',
});

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-700 mx-auto" />
          <p className="mt-3 text-sm text-stone-400">লোড হচ্ছে…</p>
        </div>
      </div>
    }>
      <main className="min-h-screen bg-stone-50 flex flex-col justify-center py-12 px-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Brand */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <AppLogo size={56} nameClassName="font-serif text-2xl font-bold text-red-700" asLink={false} />
            </div>
            <h1 className="font-serif text-2xl font-bold text-stone-800">{APP_NAME}&#8208;এ স্বাগতম</h1>
            <p className="text-sm text-stone-500 mt-1">বাংলাদেশের রক্তদান কমিউনিটিতে যোগ দিন</p>
          </div>

          {/* Card */}
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
            <div className="h-1 bg-red-700" />
            <div className="px-6 py-8">
              <LoginFormWrapper />
            </div>
          </div>

          <p className="text-center text-sm text-stone-500 mt-6">
            নতুন ব্যবহারকারী?{' '}
            <Link href="/register" className="text-red-700 font-semibold hover:underline">রেজিস্ট্রেশন করুন</Link>
          </p>
        </div>
      </main>
    </Suspense>
  );
}
