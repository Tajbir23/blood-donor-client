"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { FaSearch, FaDownload, FaFilter, FaCalendarAlt, FaTint } from 'react-icons/fa'

interface BloodDonation {
  id: number
  donorName: string
  bloodType: string
  donationDate: string
  quantity: number
  location: string
  status: string
}

const BloodDonationsPage = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [donations, setDonations] = useState<BloodDonation[]>([])
  const [searchInput, setSearchInput] = useState('')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [bloodTypeFilter, setBloodTypeFilter] = useState('')

  useEffect(() => {
    // Mock data - would be replaced with actual API call
    setTimeout(() => {
      setDonations([
        { id: 1, donorName: 'John Doe', bloodType: 'A+', donationDate: '2023-05-15', quantity: 450, location: 'Central Blood Bank', status: 'completed' },
        { id: 2, donorName: 'Jane Smith', bloodType: 'O-', donationDate: '2023-05-16', quantity: 450, location: 'Mobile Drive', status: 'completed' },
        { id: 3, donorName: 'Robert Johnson', bloodType: 'B+', donationDate: '2023-05-17', quantity: 450, location: 'Central Blood Bank', status: 'completed' },
        { id: 4, donorName: 'Sarah Williams', bloodType: 'AB+', donationDate: '2023-05-20', quantity: 450, location: 'Community Center', status: 'scheduled' },
      ])
      setIsLoading(false)
      setTotalPages(3)
    }, 1000)
  }, [id, currentPage, searchInput, dateRange, bloodTypeFilter])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    // Would trigger API call in real implementation
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Blood Donations</h1>
        <p className="text-gray-600">Track and manage blood donations from your organization members</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by donor name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </form>

          {/* Date Filter */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-gray-500" />
              <input
                type="date"
                className="border border-gray-300 rounded-md p-2 text-sm"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              />
              <span>to</span>
              <input
                type="date"
                className="border border-gray-300 rounded-md p-2 text-sm"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              />
            </div>
            <select
              value={bloodTypeFilter}
              onChange={(e) => setBloodTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="">All Blood Types</option>
              {bloodTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <button className="bg-red-100 text-red-600 p-2 rounded-md flex items-center">
              <FaFilter className="mr-2" />
              Filter
            </button>
            <button className="bg-green-100 text-green-600 p-2 rounded-md flex items-center">
              <FaDownload className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <h3 className="text-red-800 text-lg font-medium mb-1">Total Donations</h3>
            <p className="text-3xl font-bold text-red-600">142</p>
            <p className="text-red-500 text-sm">Units collected</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="text-blue-800 text-lg font-medium mb-1">This Month</h3>
            <p className="text-3xl font-bold text-blue-600">28</p>
            <p className="text-blue-500 text-sm">↑ 12% from last month</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <h3 className="text-green-800 text-lg font-medium mb-1">Active Donors</h3>
            <p className="text-3xl font-bold text-green-600">87</p>
            <p className="text-green-500 text-sm">Regular donors</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <h3 className="text-purple-800 text-lg font-medium mb-1">Upcoming</h3>
            <p className="text-3xl font-bold text-purple-600">12</p>
            <p className="text-purple-500 text-sm">Scheduled donations</p>
          </div>
        </div>

        {/* Blood Type Inventory */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Blood Type Inventory</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {bloodTypes.map(type => (
              <div key={type} className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center mb-2">
                  <FaTint className={`text-red-600 mr-1 ${type.includes('-') ? 'opacity-50' : ''}`} />
                  <span className="text-lg font-bold">{type}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {Math.floor(Math.random() * 50) + 10} units
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">Loading donations...</td>
                </tr>
              ) : donations.length > 0 ? (
                donations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{donation.donorName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaTint className={`mr-1 text-red-600 ${donation.bloodType.includes('-') ? 'opacity-50' : ''}`} />
                        <span className="font-medium">{donation.bloodType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{new Date(donation.donationDate).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{donation.quantity} ml</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{donation.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(donation.status)}`}>
                        {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-red-600 hover:text-red-900 mr-3">View</button>
                      <button className="text-gray-600 hover:text-gray-900">Certificate</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">No donations found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === index + 1 ? 'z-10 bg-red-50 border-red-500 text-red-600' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BloodDonationsPage