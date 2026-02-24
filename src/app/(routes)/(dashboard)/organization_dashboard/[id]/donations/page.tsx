"use client"

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { FaSearch, FaFilter, FaCalendarAlt, FaTint, FaUser } from 'react-icons/fa'
import { getOrgDonations } from '@/app/actions/organization'
import Image from 'next/image'

interface DonationRecord {
  _id: string
  fullName: string
  bloodGroup: string
  lastDonationDate: string
  donationCount: number
  profileImageUrl?: string
  districtId?: string
  thanaId?: string
}

interface BloodGroupStat {
  _id: string
  count: number
}

const BloodDonationsPage = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [donations, setDonations] = useState<DonationRecord[]>([])
  const [searchInput, setSearchInput] = useState('')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [bloodTypeFilter, setBloodTypeFilter] = useState('')
  const [bloodGroupStats, setBloodGroupStats] = useState<BloodGroupStat[]>([])
  const [error, setError] = useState('')

  const fetchDonations = useCallback(async () => {
    if (!id) return
    setIsLoading(true)
    setError('')
    try {
      const data = await getOrgDonations(
        id as string,
        currentPage,
        10,
        searchInput,
        bloodTypeFilter,
        dateRange.from,
        dateRange.to,
      )
      if (data.success) {
        setDonations(data.donations || [])
        setTotalPages(data.totalPages || 1)
        setTotal(data.total || 0)
        setBloodGroupStats(data.bloodGroupStats || [])
      } else {
        setError('ডোনেশন তথ্য লোড করতে ব্যর্থ হয়েছে')
      }
    } catch {
      setError('সার্ভার ত্রুটি হয়েছে, পরে আবার চেষ্টা করুন')
    } finally {
      setIsLoading(false)
    }
  }, [id, currentPage, searchInput, bloodTypeFilter, dateRange.from, dateRange.to])

  useEffect(() => {
    fetchDonations()
  }, [fetchDonations])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchDonations()
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  const getStatCount = (bg: string) => {
    const stat = bloodGroupStats.find(s => s._id === bg)
    return stat ? stat.count : 0
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">রক্তদানের ইতিহাস</h1>
        <p className="text-gray-600">আপনার সংগঠনের সদস্যদের রক্তদানের রেকর্ড</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="নাম, রক্তের গ্রুপ বা ফোন দিয়ে খুঁজুন..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </form>

          {/* Date Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" />
              <input
                type="date"
                className="border border-gray-300 rounded-md p-2 text-sm"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              />
              <span>থেকে</span>
              <input
                type="date"
                className="border border-gray-300 rounded-md p-2 text-sm"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              />
            </div>
            <select
              value={bloodTypeFilter}
              onChange={(e) => { setBloodTypeFilter(e.target.value); setCurrentPage(1); }}
              className="border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="">সব রক্তের গ্রুপ</option>
              {bloodTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => { setSearchInput(''); setDateRange({ from: '', to: '' }); setBloodTypeFilter(''); setCurrentPage(1); }}
              className="bg-gray-100 text-gray-600 p-2 rounded-md flex items-center gap-1 text-sm"
            >
              <FaFilter className="mr-1" />
              রিসেট
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <h3 className="text-red-800 text-sm font-medium mb-1">মোট দাতা</h3>
            <p className="text-3xl font-bold text-red-600">{isLoading ? '...' : total}</p>
            <p className="text-red-500 text-xs">রেকর্ডকৃত</p>
          </div>
          {bloodGroupStats.slice(0, 3).map(stat => (
            <div key={stat._id} className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-blue-800 text-sm font-medium mb-1">{stat._id}</h3>
              <p className="text-3xl font-bold text-blue-600">{stat.count}</p>
              <p className="text-blue-500 text-xs">মোট দান</p>
            </div>
          ))}
        </div>

        {/* Blood Group Inventory */}
        <div className="mb-2">
          <h3 className="text-base font-medium text-gray-800 mb-3">রক্তের গ্রুপ অনুযায়ী দান</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {bloodTypes.map(type => (
              <div key={type} className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center mb-1">
                  <FaTint className="text-red-500 mr-1 text-xs" />
                  <span className="font-bold text-sm">{type}</span>
                </div>
                <div className="text-xs text-gray-500">{getStatCount(type)} বার</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {/* Donations Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">দাতা</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">রক্তের গ্রুপ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">শেষ দানের তারিখ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">মোট দান</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">এলাকা</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                      লোড হচ্ছে...
                    </div>
                  </td>
                </tr>
              ) : donations.length > 0 ? (
                donations.map((donor) => (
                  <tr key={donor._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {donor.profileImageUrl ? (
                          <Image
                            src={donor.profileImageUrl}
                            alt={donor.fullName}
                            width={36}
                            height={36}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                            <FaUser className="text-gray-400 text-sm" />
                          </div>
                        )}
                        <span className="font-medium text-gray-900">{donor.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaTint className="mr-1 text-red-600 text-sm" />
                        <span className="font-semibold text-red-700">{donor.bloodGroup}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {donor.lastDonationDate
                        ? new Date(donor.lastDonationDate).toLocaleDateString('bn-BD')
                        : 'অজানা'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        {donor.donationCount || 0} বার
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                      {donor.thanaId && donor.districtId
                        ? `${donor.thanaId}, ${donor.districtId}`
                        : '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    কোনো রক্তদানের রেকর্ড পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <p className="text-sm text-gray-700">
              পেজ <span className="font-medium">{currentPage}</span> / <span className="font-medium">{totalPages}</span> (মোট {total} জন)
            </p>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                আগে
              </button>
              {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                const pageNum = index + 1
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === pageNum ? 'z-10 bg-red-50 border-red-500 text-red-600' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                পরে
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}

export default BloodDonationsPage
