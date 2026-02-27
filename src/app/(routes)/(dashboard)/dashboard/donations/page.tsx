'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllDonationsAdmin } from '@/app/actions/administrator/system/dashboardAction'
import LoadingSkelaton from '../components/LoadingSkelaton'
import { FaSearch, FaChevronLeft, FaChevronRight, FaTint, FaCalendarAlt, FaUser } from 'react-icons/fa'

interface DonationItem {
  _id: string
  donationDate: string
  recipient: string
  recipientName: string
  createdAt: string
  donor: {
    _id: string
    fullName: string
    email: string
    phone: string
    bloodGroup: string
    image: string
    totalDonationCount: number
  }
}

const BLOOD_GROUPS = ['all', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const DonationsPage = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const limit = 10
  const [bloodGroup, setBloodGroup] = useState('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-donations', page, limit, bloodGroup, startDate, endDate],
    queryFn: () => getAllDonationsAdmin({
      search,
      page,
      limit,
      bloodGroup: bloodGroup !== 'all' ? bloodGroup : undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined
    }),
    staleTime: 1000 * 60 * 5,
  })

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    refetch()
  }

  const handleBloodGroupChange = (group: string) => {
    setBloodGroup(group)
    setPage(1)
  }

  const handleClearFilters = () => {
    setSearch('')
    setBloodGroup('all')
    setStartDate('')
    setEndDate('')
    setPage(1)
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return <LoadingSkelaton />
  }

  const donations: DonationItem[] = data?.donations || []
  const totalPages: number = data?.totalPages || 1
  const totalDonations: number = data?.totalDonations || 0

  return (
    <div className="mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaTint className="text-red-500" />
          রক্তদান ব্যবস্থাপনা
        </h1>
        <p className="text-gray-500 mt-1">মোট রক্তদান: {totalDonations} টি</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6 space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="নাম, ইমেইল, ফোন বা প্রাপকের নাম দিয়ে খুঁজুন..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            খুঁজুন
          </button>
        </form>

        {/* Filter Row */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Blood Group Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">রক্তের গ্রুপ:</span>
            <div className="flex flex-wrap gap-1">
              {BLOOD_GROUPS.map((group) => (
                <button
                  key={group}
                  onClick={() => handleBloodGroupChange(group)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    bloodGroup === group
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-red-400 hover:text-red-600'
                  }`}
                >
                  {group === 'all' ? 'সকল' : group}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-400" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => { setStartDate(e.target.value); setPage(1) }}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
            <span className="text-gray-400">-</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => { setEndDate(e.target.value); setPage(1) }}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>

          {/* Clear Filters */}
          {(search || bloodGroup !== 'all' || startDate || endDate) && (
            <button
              onClick={handleClearFilters}
              className="px-4 py-1.5 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            >
              ফিল্টার মুছুন
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      {donations.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <FaTint className="mx-auto text-4xl text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">কোনো রক্তদানের তথ্য পাওয়া যায়নি</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    দাতা
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    রক্তের গ্রুপ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    রক্তদানের তারিখ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    প্রাপক
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    যোগাযোগ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    মোট দান
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donations.map((donation) => (
                  <tr key={donation._id} className="hover:bg-gray-50 transition-colors">
                    {/* Donor Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {donation.donor?.image ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={donation.donor.image}
                              alt={donation.donor.fullName}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                              <FaUser className="text-red-500" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {donation.donor?.fullName || 'অজানা'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {donation.donor?.email || '-'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Blood Group */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">
                        {donation.donor?.bloodGroup || '-'}
                      </span>
                    </td>

                    {/* Donation Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {formatDate(donation.donationDate)}
                    </td>

                    {/* Recipient */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {donation.recipientName || donation.recipient || '-'}
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {donation.donor?.phone || '-'}
                    </td>

                    {/* Total Donations */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                        {donation.donor?.totalDonationCount || 0} বার
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  আগের
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  পরের
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    মোট <span className="font-medium">{totalDonations}</span> টি রক্তদানের মধ্যে{' '}
                    <span className="font-medium">{(page - 1) * limit + 1}</span> -{' '}
                    <span className="font-medium">{Math.min(page * limit, totalDonations)}</span> দেখানো হচ্ছে
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <FaChevronLeft className="h-4 w-4" />
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum: number
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (page <= 3) {
                        pageNum = i + 1
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = page - 2 + i
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === pageNum
                              ? 'z-10 bg-red-50 border-red-500 text-red-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <FaChevronRight className="h-4 w-4" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DonationsPage
