import React from 'react';

const AdvicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-2">রক্তদানের পূর্বে ও পরে করণীয়</h1>
          <p className="text-gray-600">সুরক্ষিত ও স্বাস্থ্যকর রক্তদানের জন্য এই নির্দেশিকা অনুসরণ করুন</p>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">রক্তদানের পূর্বে করণীয়</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>রক্তদানের আগের রাতে পর্যাপ্ত পরিমাণে ঘুমান (অন্তত ৭-৮ ঘণ্টা)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>রক্তদানের ২-৩ ঘণ্টা আগে হালকা ও পুষ্টিকর খাবার গ্রহণ করুন</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>রক্তদানের আগে প্রচুর পরিমাণে পানি ও তরল পান করুন</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>আয়রন সমৃদ্ধ খাবার (যেমন: লাল মাংস, মাছ, শাকসবজি) গ্রহণ করুন</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>রক্তদানের ২৪ ঘণ্টা আগে অ্যালকোহল সেবন থেকে বিরত থাকুন</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>সিগারেট বা তামাকজাত দ্রব্য সেবন করবেন না</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">রক্তদানের পরে করণীয়</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>রক্তদানের পর কমপক্ষে ১০-১৫ মিনিট বিশ্রাম নিন</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>প্রচুর পরিমাণে তরল ও পানি পান করুন (২৪ ঘণ্টায় অন্তত ৪ লিটার)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>রক্তদানের পরের ৪-৫ ঘণ্টা ভারী কাজ বা ব্যায়াম করা থেকে বিরত থাকুন</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>সিগারেট বা অ্যালকোহল সেবন করবেন না (অন্তত ১২ ঘণ্টা)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>রক্তদানের স্থানে ব্যান্ডেজ কমপক্ষে ৪-৫ ঘণ্টা রাখুন</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>মাথা ঘোরা বা দুর্বলতা অনুভব করলে শুয়ে পড়ুন ও পা উঁচু করুন</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">রক্তদানের যোগ্যতা</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>বয়স ১৮-৬০ বছর (কিছু ক্ষেত্রে ১৬-১৭ বছর বয়সীরা অভিভাবকের সম্মতিতে দিতে পারেন)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>শারীরিক ওজন কমপক্ষে ৪৫ কেজি</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>সুস্থ ও রোগমুক্ত শরীর (জ্বর, সর্দি-কাশি বা অন্য কোনো অসুস্থতা থাকলে রক্তদান করবেন না)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>হিমোগ্লোবিনের মাত্রা পুরুষের জন্য ১২.৫ g/dL এবং মহিলাদের জন্য ১২.০ g/dL এর বেশি হতে হবে</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>সর্বশেষ রক্তদানের ৩ মাস (৯০ দিন) পূর্ণ হতে হবে</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">গুরুত্বপূর্ণ তথ্য</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>রক্তদানের পর যদি মাথা ঘোরা, বমি বমি ভাব বা অস্বস্তি অনুভব করেন, অবিলম্বে চিকিৎসক বা স্বাস্থ্যকর্মীকে জানান।</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>এই তথ্যগুলো সাধারণ নির্দেশিকা হিসেবে প্রদান করা হয়েছে। ব্যক্তিগত স্বাস্থ্য অবস্থার জন্য চিকিৎসকের পরামর্শ নিন।</p>
        </div>
      </div>
    </div>
  );
};

export default AdvicePage;