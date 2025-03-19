

const OurServices = () => {
  return (
    <section className="py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">আমাদের সেবাসমূহ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 dark:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">জরুরি SOS ফিচার</h3>
            <p className="text-gray-600 dark:text-gray-300">
              জরুরি অবস্থায় নিকটবর্তী রক্তদাতাদের কাছে দ্রুত অনুরোধ পাঠাতে পারবেন। SMS এবং ইমেইল এর মাধ্যমে রক্তদাতারা বিজ্ঞপ্তি পাবেন।
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 dark:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">ভেরিফাইড ডোনার সিস্টেম</h3>
            <p className="text-gray-600 dark:text-gray-300">
              ভেরিফাইড রক্তদাতাদের একটি বিশাল নেটওয়ার্ক। মেডিকেল রিপোর্ট যাচাইয়ের মাধ্যমে নিশ্চিত করা হয় রক্তদাতাদের স্বাস্থ্যগত যোগ্যতা।
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 dark:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">ব্লাড ক্যাম্প ব্যবস্থাপনা</h3>
            <p className="text-gray-600 dark:text-gray-300">
              স্বেচ্ছাসেবী সংস্থাগুলো ব্লাড ক্যাম্প আয়োজন করতে পারবে এবং ব্যবহারকারীরা সহজেই রেজিস্ট্রেশন করতে পারবেন।
            </p>
          </div>
        </div>
      </section>
  )
}

export default OurServices
