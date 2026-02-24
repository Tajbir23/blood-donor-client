export const dynamic = 'force-static';
export const revalidate = 86400;

const AdvicePage = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div className="bg-red-700 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-300 mb-2">স্বাস্থ্য নির্দেশিকা</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">রক্তদানের পূর্বে ও পরে করণীয়</h1>
          <p className="text-red-100 text-sm">সুরক্ষিত ও স্বাস্থ্যকর রক্তদানের জন্য এই নির্দেশিকা অনুসরণ করুন।</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* Before */}
        <div className="card-classic p-6">
          <h2 className="font-serif text-xl font-bold text-red-700 mb-4 pb-2 border-b border-stone-100">রক্তদানের পূর্বে করণীয়</h2>
          <ul className="space-y-3 text-stone-700 text-sm">
            {[
              'রক্তদানের আগের রাতে পর্যাপ্ত পরিমাণে ঘুমান (অন্তত ৭-৮ ঘণ্টা)',
              'রক্তদানের ২-৩ ঘণ্টা আগে হালকা ও পুষ্টিকর খাবার গ্রহণ করুন',
              'রক্তদানের আগে প্রচুর পরিমাণে পানি ও তরল পান করুন',
              'আয়রন সমৃদ্ধ খাবার (যেমন: লাল মাংস, মাছ, শাকসবজি) গ্রহণ করুন',
              'রক্তদানের ২৪ ঘণ্টা আগে অ্যালকোহল সেবন থেকে বিরত থাকুন',
              'সিগারেট বা তামাকজাত দ্রব্য সেবন করবেন না',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* After */}
        <div className="card-classic p-6">
          <h2 className="font-serif text-xl font-bold text-red-700 mb-4 pb-2 border-b border-stone-100">রক্তদানের পরে করণীয়</h2>
          <ul className="space-y-3 text-stone-700 text-sm">
            {[
              'রক্তদানের পর কমপক্ষে ১০-১৫ মিনিট বিশ্রাম নিন',
              'প্রচুর পরিমাণে তরল ও পানি পান করুন (২৪ ঘণ্টায় অন্তত ৪ লিটার)',
              'রক্তদানের পরের ৪-৫ ঘণ্টা ভারী কাজ বা ব্যায়াম করা থেকে বিরত থাকুন',
              'সিগারেট বা অ্যালকোহল সেবন করবেন না (অন্তত ১২ ঘণ্টা)',
              'রক্তদানের স্থানে ব্যান্ডেজ কমপক্ষে ৪-৫ ঘণ্টা রাখুন',
              'মাথা ঘোরা বা দুর্বলতা অনুভব করলে শুয়ে পড়ুন ও পা উঁচু করুন',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Eligibility */}
        <div className="card-classic p-6">
          <h2 className="font-serif text-xl font-bold text-red-700 mb-4 pb-2 border-b border-stone-100">রক্তদানের যোগ্যতা</h2>
          <ul className="space-y-3 text-stone-700 text-sm">
            {[
              'বয়স ১৮-৬০ বছর (কিছু ক্ষেত্রে ১৬-১৭ বছর বয়সীরা অভিভাবকের সম্মতিতে দিতে পারেন)',
              'শারীরিক ওজন কমপক্ষে ৪৫ কেজি',
              'সুস্থ ও রোগমুক্ত শরীর (জ্বর, সর্দি-কাশি বা অন্য কোনো অসুস্থতা থাকলে রক্তদান করবেন না)',
              'হিমোগ্লোবিনের মাত্রা পুরুষের জন্য ১২.৫ g/dL এবং মহিলাদের জন্য ১২.০ g/dL এর বেশি হতে হবে',
              'সর্বশেষ রক্তদানের ৩ মাস (৯০ দিন) পূর্ণ হতে হবে',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Warning */}
        <div className="border-l-4 border-red-700 bg-red-50 p-4 rounded-r">
          <div className="flex gap-3">
            <svg className="h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-red-800 mb-1">গুরুত্বপূর্ণ তথ্য</h3>
              <p className="text-sm text-red-700">রক্তদানের পর যদি মাথা ঘোরা, বমি বমি ভাব বা অস্বস্তি অনুভব করেন, অবিলম্বে চিকিৎসক বা স্বাস্থ্যকর্মীকে জানান।</p>
            </div>
          </div>
        </div>

        <p className="text-center text-stone-400 text-xs pb-4">এই তথ্যগুলো সাধারণ নির্দেশিকা হিসেবে প্রদান করা হয়েছে। ব্যক্তিগত স্বাস্থ্য অবস্থার জন্য চিকিৎসকের পরামর্শ নিন।</p>
      </div>
    </div>
  );
};

export default AdvicePage;