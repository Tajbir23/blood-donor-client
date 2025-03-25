'use client'
import { useState } from "react"
import RegAsUser from "./RegAsUser"
import RegAsAssociation from "./RegAsAssociation"
import Image from "next/image"

const Register = () => {
  const [registerAs, setRegisterAs] = useState<string>("user")
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with logo */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            {/* Replace with your actual logo */}
            <Image 
              src="/logo.png" 
              alt="রক্তদান রংপুর বিভাগ" 
              width={80} 
              height={80}
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">রক্তদান রংপুর বিভাগ</h1>
          <p className="text-lg text-gray-600">আপনার অ্যাকাউন্ট তৈরি করুন এবং রক্তদান সেবায় যোগ দিন</p>
        </div>
        
        {/* Registration type selection tabs */}
        <div className="bg-white rounded-t-lg shadow-sm mb-0">
          <div className="grid grid-cols-2 border-b border-gray-200">
            <button
              onClick={() => setRegisterAs("user")}
              className={`py-4 text-center text-md font-medium rounded-tl-lg transition-colors
                ${registerAs === "user" 
                  ? "bg-red-600 text-white" 
                  : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                }`}
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>ব্যক্তিগত অ্যাকাউন্ট</span>
              </div>
            </button>
            
            <button
              onClick={() => setRegisterAs("association")}
              className={`py-4 text-center text-md font-medium rounded-tr-lg transition-colors
                ${registerAs === "association" 
                  ? "bg-red-600 text-white" 
                  : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                }`}
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>প্রতিষ্ঠান/সংগঠন</span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Info Box */}
        <div className="p-4 my-6 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                {registerAs === "user" ? (
                  "রক্তদাতা হিসেবে নিবন্ধন করুন"
                ) : (
                  "হাসপাতাল, ক্লিনিক বা স্বেচ্ছাসেবী সংগঠন হিসেবে নিবন্ধন করুন"
                )}
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  {registerAs === "user" ? (
                    "আপনি রক্তদাতা হিসেবে নিবন্ধন করলে, আপনার রক্তের গ্রুপ, ঠিকানা এবং যোগাযোগের তথ্য সংরক্ষণ করা হবে। রংপুর বিভাগে যারা রক্তের প্রয়োজনে আছেন, তারা আপনার সাথে যোগাযোগ করতে পারবেন।"
                  ) : (
                    "প্রতিষ্ঠান হিসেবে নিবন্ধন করে আপনি রংপুর বিভাগে রক্ত সংগ্রহ, রক্তদান ক্যাম্প আয়োজন এবং জরুরি রক্তের চাহিদা পূরণে সহায়তা করতে পারবেন।"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Registration Form Container */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {registerAs === "user" ? <RegAsUser /> : <RegAsAssociation />}
        </div>
      </div>
    </div>
  )
}

export default Register
