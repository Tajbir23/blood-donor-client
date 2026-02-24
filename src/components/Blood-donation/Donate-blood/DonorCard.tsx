'use client'
import Image from 'next/image'
import { User } from '@/lib/types/userType'
import { useState } from 'react'
import ReportModal from '@/components/modals/ReportModal'

const DonorCard = ({ donor }: { donor: User }) => {
  const [isReportOpen, setIsReportOpen] = useState(false)
  const lastDonated = 'lastDonated' in donor ? donor.lastDonated as string : null
  const donationCount = 'donationCount' in donor ? donor.donationCount as number : null

  return (
    <>
      <div className="card-classic overflow-hidden flex flex-col">
        {/* Top band: blood group + avatar */}
        <div className="bg-red-700 px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-red-300 text-[10px] font-semibold uppercase tracking-widest">রক্তের গ্রুপ</p>
            <p className="font-serif text-3xl font-black text-white leading-none mt-0.5">{donor.bloodGroup}</p>
          </div>
          <div className="relative flex-shrink-0">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-red-500 bg-stone-200">
              <Image
                src={donor.profileImageUrl || '/images/dummy-image.jpg'}
                alt={donor.fullName || 'রক্তদাতা'}
                fill
                className="object-cover"
              />
            </div>
            {donor?.reportCount && donor.reportCount > 0 ? (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">!</span>
            ) : null}
          </div>
        </div>

        {/* Body */}
        <div className="px-4 pt-3 pb-2 flex-1 space-y-2">
          <h2 className="font-serif font-bold text-stone-800 text-base leading-snug">{donor.fullName}</h2>
          <div className="space-y-1.5">
            {/* Address */}
            <div className="flex items-start gap-2">
              <svg className="w-3.5 h-3.5 text-stone-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs text-stone-500 leading-snug">{donor.address || 'অনির্দিষ্ট'}</span>
            </div>
            {/* Phone */}
            {donor.phone && (
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-xs text-stone-500">{donor.phone}</span>
              </div>
            )}
            {/* Availability */}
            {lastDonated ? (
              <p className="text-xs text-stone-400">শেষ দান: {lastDonated}</p>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-[11px] font-medium border border-green-200">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                দান করতে প্রস্তুত
              </span>
            )}
            {/* Donation count */}
            {donationCount ? (
              <p className="text-xs text-stone-400">{donationCount} বার রক্তদান করেছেন</p>
            ) : null}
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 pb-4 pt-2 flex gap-2">
          <a
            href={`tel:${donor.phone}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-700 text-white text-sm font-semibold rounded hover:bg-red-800 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            কল করুন
          </a>
          <button
            onClick={() => setIsReportOpen(true)}
            className="px-3 py-2 border border-stone-200 text-stone-400 rounded hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
            title="রিপোর্ট করুন"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </button>
        </div>
      </div>

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        reportedUserId={donor._id || ''}
        reportedUserName={donor.fullName}
      />
    </>
  )
}

export default DonorCard

