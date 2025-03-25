'use client'
import BloodRequest from "@/components/Blood-donation/Blood-request/BloodRequest"
import DonateBlood from "@/components/Blood-donation/Donate-blood/DonateBlood"
import BloodRequestForm from "@/components/Blood-Request-Form/BloodRequestForm"
import { useState } from "react"

const BloodDonation = () => {
    const [tab, setTab] = useState("রক্ত দান")
  const [isFormMinimized, setIsFormMinimized] = useState(true)
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-8">রক্তদান সেবা</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="flex w-full items-center border-b">
          <button 
            className={`w-1/2 py-4 font-medium text-lg transition-colors duration-200 ${
              tab === "রক্ত দান" 
                ? "bg-red-600 text-white" 
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`} 
            onClick={() => setTab("রক্ত দান")}
          >
            রক্তদাতা
          </button>
          <button 
            className={`w-1/2 py-4 font-medium text-lg transition-colors duration-200 ${
              tab === "রক্ত দরকার" 
                ? "bg-red-600 text-white" 
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`} 
            onClick={() => setTab("রক্ত দরকার")}
          >
            রক্ত দরকার
          </button>
        </div>

        {tab === "রক্ত দরকার" && (
          <div className="p-6">
            <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              {/* Header - Always visible */}
              <div 
                className={`p-4 flex justify-between items-center cursor-pointer transition-colors duration-200 ${isFormMinimized ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-red-600'} text-white`}
                onClick={() => setIsFormMinimized(!isFormMinimized)}
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <h2 className="text-xl font-semibold">রক্তের জন্য অনুরোধ করুন</h2>
                </div>
                <button 
                  className="focus:outline-none bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-1 transition-all duration-200"
                  aria-label={isFormMinimized ? "ফর্ম এক্সপ্যান্ড করুন" : "ফর্ম মিনিমাইজ করুন"}
                >
                  {isFormMinimized ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Minimized state */}
              {isFormMinimized ? (
                <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">জরুরি রক্তের প্রয়োজন?</h3>
                      <p className="text-gray-600 mb-2">রংপুর বিভাগে রক্তদাতাদের সাথে সংযোগ স্থাপন করতে অনুরোধ ফর্ম পূরণ করুন</p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          দ্রুত প্রতিক্রিয়া
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          সহজ প্রক্রিয়া
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          নিখরচায়
                        </span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setIsFormMinimized(false)}
                      className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      অনুরোধ ফর্ম খুলুন
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  {/* Form close button in corner when expanded */}
                  <button
                    onClick={() => setIsFormMinimized(true)}
                    className="absolute right-4 top-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-1 z-10 transition-colors duration-200"
                    aria-label="Close form"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Pass the unchanged BloodRequestForm component */}
                  <BloodRequestForm 
                    type="normal" 
                    title="রক্তের জন্য অনুরোধ করুন" 
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {tab === "রক্ত দান" ? <DonateBlood /> : <BloodRequest />}
      </div>
    </div>
  )
}

export default BloodDonation
