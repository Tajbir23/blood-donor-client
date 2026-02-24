'use client'
import DonateBlood from "@/components/Blood-donation/Donate-blood/DonateBlood"
import BloodRequest from "@/components/Blood-donation/Blood-request/BloodRequest"
import BloodRequestForm from "@/components/Blood-Request-Form/BloodRequestForm"
import { useState } from "react"

const TABS = [
  { id: 'donors', label: 'রক্তদাতা খুঁজুন' },
  { id: 'requests', label: 'রক্তের অনুরোধ সমূহ' },
  { id: 'request', label: 'অনুরোধ করুন' },
]

const BloodDonation = () => {
  const [activeTab, setActiveTab] = useState('donors')

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Header */}
      <div className="bg-red-700 text-white py-7">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-red-300 mb-1">রক্তদান সেবা</p>
          <h1 className="font-serif text-2xl md:text-3xl font-bold">রক্তদান ও রক্তের অনুরোধ</h1>
          <p className="text-red-200 text-sm mt-1.5">
            রক্তদাতা খুঁজুন · অনুরোধ দেখুন · জরুরি সাহায্য নিন
          </p>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="border-b border-stone-200 bg-white sticky top-14 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-6 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-red-700 text-red-700'
                  : 'border-transparent text-stone-500 hover:text-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'donors' && <DonateBlood compact />}
      {activeTab === 'requests' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <BloodRequest />
        </div>
      )}
      {activeTab === 'request' && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <BloodRequestForm type="normal" title="রক্তের জন্য অনুরোধ করুন" />
        </div>
      )}
    </div>
  )
}

export default BloodDonation
