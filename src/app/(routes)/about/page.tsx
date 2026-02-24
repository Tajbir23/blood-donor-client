export const dynamic = 'force-static';
export const revalidate = 86400;

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'আমাদের সম্পর্কে | LifeDrop',
  description: 'LifeDrop – বাংলাদেশের সকল বিভাগের রক্তদাতাদের সাথে রক্তগ্রহীতাদের সংযুক্ত করা একটি সম্পূর্ণ অলাভজনক রক্তদান প্ল্যাটফর্ম।',
  openGraph: {
    title: 'আমাদের সম্পর্কে | LifeDrop',
    description: 'LifeDrop – বাংলাদেশের সকল বিভাগে রক্তদাতা খুঁজুন, জীবন বাঁচান।',
    url: 'https://blood-donor-bangladesh.vercel.app/about',
    siteName: 'LifeDrop',
  },
};

const stats = [
  { label: 'নিবন্ধিত রক্তদাতা', value: '৫,০০০+' },
  { label: 'সফল রক্তদান',         value: '১২,০০০+' },
  { label: 'জেলা কভারেজ',         value: '৬৪' },
  { label: 'সক্রিয় সংগঠন',       value: '১৫০+' },
];

const values = [
  { icon: '❤️', title: 'মানবতা',        desc: 'প্রতিটি জীবন অমূল্য। রক্তদান হলো সবচেয়ে বড় মানবিক উপহার।' },
  { icon: '🛡️', title: 'নির্ভরযোগ্যতা', desc: 'সঠিক তথ্য, দ্রুত সাড়া এবং ভেরিফাইড ডোনার – সবই নিশ্চিত।' },
  { icon: '🤝', title: 'কমিউনিটি',      desc: 'হাজারো রক্তদাতা ও সংগঠন নিয়ে গড়া শক্তিশালী কমিউনিটি।' },
  { icon: '✨', title: 'স্বচ্ছতা',      desc: 'সম্পূর্ণ অলাভজনক। কোনো লুকানো চার্জ বা বাণিজ্যিক উদ্দেশ্য নেই।' },
];

const steps = [
  { step: '০১', title: 'নিবন্ধন করুন', desc: 'রক্তদাতা হিসেবে রেজিস্ট্রেশন করুন। রক্তের গ্রুপ, অবস্থান ও যোগাযোগের তথ্য দিন।' },
  { step: '০২', title: 'রক্ত খুঁজুন',   desc: 'জরুরি প্রয়োজনে রক্তের গ্রুপ ও জেলা দিয়ে কাছের রক্তদাতা খুঁজুন।' },
  { step: '০৩', title: 'জীবন বাঁচান',  desc: 'রক্তদান করুন বা প্রয়োজনীয় রক্ত পান। প্রতিটি দান একটি জীবন বাঁচায়।' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div className="bg-red-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-300 mb-3">আমাদের সম্পর্কে</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">LifeDrop</h1>
          <p className="text-red-100 text-lg max-w-2xl mx-auto leading-relaxed">
            বাংলাদেশের সকল বিভাগ ও জেলায় রক্তদাতা এবং রক্তগ্রহীতাদের মধ্যে সেতুবন্ধন তৈরির সম্পূর্ণ অলাভজনক ডিজিটাল প্ল্যাটফর্ম।
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-stone-200">
          {stats.map(s => (
            <div key={s.label} className="flex flex-col items-center justify-center py-6 px-4 text-center">
              <span className="font-serif text-3xl font-bold text-red-700">{s.value}</span>
              <span className="text-sm text-stone-500 mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14 space-y-14">
        {/* Mission */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-red-700 rounded" />
            আমাদের লক্ষ্য
          </h2>
          <p className="text-stone-600 leading-relaxed">
            বাংলাদেশের প্রতিটি জেলায় একটি সুসংগঠিত রক্তদাতা নেটওয়ার্ক গড়ে তোলা, যাতে কোনো মানুষকে রক্তের অভাবে প্রাণ হারাতে না হয়।
            আমরা প্রযুক্তির সাহায্যে জরুরি মুহূর্তে সঠিক রক্তদাতাকে সঠিক সময়ে খুঁজে দেওয়ার চেষ্টা করি।
          </p>
        </section>

        {/* Story */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-red-700 rounded" />
            আমাদের গল্প
          </h2>
          <div className="card-classic p-6 space-y-4 text-stone-600 leading-relaxed">
            <p>
              LifeDrop-এর যাত্রা শুরু হয়েছিল একটি সহজ কিন্তু শক্তিশালী ভাবনা থেকে – রক্তের প্রয়োজনে কাউকে যেন ঘণ্টার পর ঘণ্টা ফোন করে খুঁজতে না হয়।
              বাংলাদেশের হাসপাতালগুলোতে প্রতিদিন হাজারো রোগীর রক্তের প্রয়োজন হয়।
            </p>
            <p>
              সেই সমস্যার সমাধান দিতেই আমরা তৈরি করেছি এই প্ল্যাটফর্ম, যেখানে রক্তদাতারা নিবন্ধন করতে পারেন এবং রক্তের প্রয়োজনে থাকা মানুষেরা দ্রুত ও সহজে তাদের খুঁজে পেতে পারেন।
            </p>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-red-700 rounded" />
            আমাদের মূল্যবোধ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map(v => (
              <div key={v.title} className="card-classic p-5 flex gap-4">
                <span className="text-2xl flex-shrink-0">{v.icon}</span>
                <div>
                  <h3 className="font-serif font-bold text-stone-800 mb-1">{v.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-red-700 rounded" />
            কীভাবে কাজ করে
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map(s => (
              <div key={s.step} className="card-classic p-6 text-center">
                <div className="font-serif text-5xl font-black text-red-100 mb-3">{s.step}</div>
                <h3 className="font-serif font-bold text-stone-800 mb-2">{s.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-red-700 text-white rounded-xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">আজই যোগ দিন</h2>
          <p className="text-red-100 text-sm mb-6">রক্তদাতা হিসেবে নিবন্ধন করুন এবং জীবন বাঁচানোর মিশনে অংশ নিন।</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register" className="bg-white text-red-700 font-semibold px-6 py-2.5 rounded text-sm hover:bg-red-50 transition-colors">
              রেজিস্ট্রেশন করুন
            </Link>
            <Link href="/find-blood" className="border border-white text-white font-medium px-6 py-2.5 rounded text-sm hover:bg-white/10 transition-colors">
              রক্তদাতা খুঁজুন
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
