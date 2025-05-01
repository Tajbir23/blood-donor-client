'use client'
import RegAsUser from "./RegAsUser"
import Image from "next/image"

const Register = () => {
  
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with logo */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            {/* Replace with your actual logo */}
            <Image 
              src="/logo.png" 
              alt="রক্তদান বাংলাদেশ" 
              width={80} 
              height={80}
              className="h-20 w-auto"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">রক্তদান বাংলাদেশ</h1>
          <p className="text-lg text-gray-600">আপনার অ্যাকাউন্ট তৈরি করুন এবং রক্তদান সেবায় যোগ দিন</p>
        </div>
        
        {/* Info Box */}
        <div className="p-4 my-6 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h2 className="text-sm font-medium text-blue-800">
                রক্তদাতা হিসেবে নিবন্ধন করুন
              </h2>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  আপনি রক্তদাতা হিসেবে নিবন্ধন করলে, আপনার রক্তের গ্রুপ, ঠিকানা এবং যোগাযোগের তথ্য সংরক্ষণ করা হবে। বাংলাদেশের যেকোনো জেলার রক্তের প্রয়োজনে আছেন, তারা আপনার সাথে যোগাযোগ করতে পারবেন।
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Registration Form Container */}
        <section className="bg-white shadow-md rounded-lg overflow-hidden">
          <RegAsUser />
        </section>
      </div>
    </main>
  )
}

export default Register
