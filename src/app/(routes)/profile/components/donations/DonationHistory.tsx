'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { User } from '@/lib/types/userType'
import { Donation, DonationPagination } from '../../types'
import { getDonationHistory } from '@/app/actions/userAction'
import { Droplet, Calendar, User as UserIcon, Loader2 } from 'lucide-react'

interface DonationHistoryProps {
  userProfile: User;
}

interface DonationHistoryResponse {
  success: boolean;
  donations: Donation[];
  pagination: DonationPagination;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const DonationHistory = ({ userProfile }: DonationHistoryProps) => {
  const [page, setPage] = useState(1)
  const limit = 10

  const { data, isLoading } = useQuery<DonationHistoryResponse>({
    queryKey: ['donation-history', page, limit],
    queryFn: () => getDonationHistory(page, limit),
    staleTime: 1000 * 60 * 5,
  })

  const donations = data?.donations || []
  const pagination = data?.pagination || { total: 0, page: 1, limit: 10, totalPages: 0 }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900">রক্তদানের ইতিহাস</h2>
          <p className="mt-1 text-sm text-gray-500">
            সর্বশেষ রক্তদান: {userProfile.lastDonationDate ? formatDate(userProfile.lastDonationDate) : 'তথ্য নেই'}
          </p>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-2">
          <Droplet className="h-5 w-5 text-red-500" />
          <span className="text-sm font-semibold text-gray-700">মোট রক্তদান: {userProfile.totalDonationCount || 0} বার</span>
        </div>
      </div>

      <div className="border-t border-gray-200">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-red-500 animate-spin" />
            <span className="ml-3 text-gray-500">লোড হচ্ছে...</span>
          </div>
        ) : donations.length > 0 ? (
          <>
            {/* Mobile card view */}
            <div className="sm:hidden divide-y divide-gray-100">
              {donations.map((donation, index) => (
                <div key={donation._id || index} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{formatDate(donation.donationDate)}</span>
                  </div>
                  {donation.recipientName && (
                    <div className="flex items-center gap-2 mb-1">
                      <UserIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">গ্রহণকারী: {donation.recipientName}</span>
                    </div>
                  )}
                  {donation.recipient && (
                    <div className="flex items-center gap-2">
                      <Droplet className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-gray-600">{donation.recipient}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop table view */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      তারিখ
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      গ্রহণকারী
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      বিবরণ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donations.map((donation, index) => (
                    <tr key={donation._id || index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(pagination.page - 1) * pagination.limit + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(donation.donationDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {donation.recipientName || '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {donation.recipient || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-sm text-gray-700">
                  মোট <span className="font-medium">{pagination.total}</span> টি রক্তদানের মধ্যে{' '}
                  <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span>-
                  <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> দেখাচ্ছে
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`px-3 py-1 border rounded-md text-sm font-medium ${
                      page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    পূর্ববর্তী
                  </button>
                  <span className="px-3 py-1 bg-red-50 border border-red-200 rounded-md text-sm text-red-700 font-medium">
                    {page} / {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setPage(prev => prev < pagination.totalPages ? prev + 1 : prev)}
                    disabled={page >= pagination.totalPages}
                    className={`px-3 py-1 border rounded-md text-sm font-medium ${
                      page >= pagination.totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    পরবর্তী
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="py-12 text-center">
            <Droplet className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-base font-medium text-gray-700 mb-1">এখনো কোন রক্তদানের তথ্য নেই</h3>
            <p className="text-sm text-gray-500">আপনি রক্তদান করলে এখানে আপনার রক্তদানের ইতিহাস দেখতে পারবেন।</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DonationHistory