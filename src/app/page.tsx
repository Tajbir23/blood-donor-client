export const dynamic = 'force-static';
export const revalidate = 3600;

import { Metadata } from 'next';
import Link from 'next/link';
import CallToAction from '@/components/home/CallToAction';
import FindBlood from '@/components/home/FindBlood';
import Hero from '@/components/home/Hero/Hero';
import OurServices from '@/components/home/OurServices';
import RegularDonor from '@/components/home/RegularDonor';
import RecentBloodRequests from '@/components/home/RecentBloodRequests';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'LifeDrop | জীবন বাঁচাতে রক্ত দিন',
  description: 'বাংলাদেশের সকল জেলার রক্তদাতাদের সাথে সংযোগ স্থাপন করুন। জরুরি প্রয়োজনে দ্রুত ও নির্ভরযোগ্যভাবে রক্তের জন্য অনুরোধ করুন।',
  keywords: ['রক্তদান', 'বাংলাদেশ', 'blood donation', 'Bangladesh', 'blood donors', 'emergency blood', 'blood bank', 'রক্তদাতা', 'জরুরি রক্ত', 'রক্ত সংগ্রহ', 'LifeDrop'],
  openGraph: {
    title: 'LifeDrop | জীবন বাঁচাতে রক্ত দিন',
    description: 'বাংলাদেশের সকল জেলার রক্তদাতাদের সাথে সংযোগ স্থাপন করুন। জরুরি প্রয়োজনে দ্রুত ও নির্ভরযোগ্যভাবে রক্তের জন্য অনুরোধ করুন।',
    type: 'website',
    url: 'https://blood-donor-bangladesh.vercel.app',
    images: [{ url: '/images/home-og.jpg', width: 1200, height: 630, alt: 'LifeDrop' }],
  },
  alternates: { canonical: 'https://blood-donor-bangladesh.vercel.app' },
  other: { 'google-site-verification': '4r6L_E636xBF3hU6OjXMUdfSnfTKiwofEtBSHhxMHRw' },
};

export default function Home() {
  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: 'https://blood-donor-bangladesh.vercel.app',
            name: 'LifeDrop',
            description: 'বাংলাদেশের রক্তদান প্ল্যাটফর্ম',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://blood-donor-bangladesh.vercel.app/find-blood?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <main>
        {/* Hero — contained for rounded corners */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <Hero />
        </div>

        {/* Quick-access strip — first thing after slider */}
        <div className="border-b border-stone-100 bg-white">
          <div className="max-w-3xl mx-auto px-4 py-5 grid grid-cols-3 gap-3">
            <Link href="/find-blood" className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 transition-colors text-center group">
              <div className="w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center group-hover:bg-red-800 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <span className="font-serif font-bold text-red-700 text-sm leading-tight">রক্তদাতা খুঁজুন</span>
              <span className="text-[11px] text-stone-400">এলাকা বা গ্রুপ দিয়ে</span>
            </Link>
            <Link href="/sos" className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors text-center group">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center group-hover:bg-amber-700 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </div>
              <span className="font-serif font-bold text-amber-700 text-sm leading-tight">SOS আবেদন</span>
              <span className="text-[11px] text-stone-400">জরুরি সাহায্য পাঠান</span>
            </Link>
            <Link href="/blood-donation" className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-colors text-center group">
              <div className="w-10 h-10 rounded-full bg-stone-700 text-white flex items-center justify-center group-hover:bg-stone-800 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
              </div>
              <span className="font-serif font-bold text-stone-800 text-sm leading-tight">রক্তের অনুরোধ</span>
              <span className="text-[11px] text-stone-400">দেখুন ও করুন</span>
            </Link>
          </div>
        </div>

        <FindBlood />
        <RecentBloodRequests />
        <OurServices />
        <RegularDonor />
        <CallToAction />
      </main>
    </>
  );
}
