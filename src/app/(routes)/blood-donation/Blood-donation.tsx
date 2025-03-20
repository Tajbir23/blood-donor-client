'use client'
import BloodRequest from "@/components/Blood-donation/Blood-request/BloodRequest"
import DonateBlood from "@/components/Blood-donation/Donate-blood/DonateBlood"
import BloodRequestForm from "@/components/Blood-Request-Form/BloodRequestForm"
import { useState } from "react"

const BloodDonation = () => {
  const [tab, setTab] = useState("রক্ত দান")
  
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

        {tab === "রক্ত দরকার" && <div className="p-6">
          <BloodRequestForm type="normal" title="রক্তের জন্য অনুরোধ করুন" />
        </div>}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {tab === "রক্ত দান" ? <DonateBlood /> : <BloodRequest />}
      </div>
    </div>
  )
}

export default BloodDonation
