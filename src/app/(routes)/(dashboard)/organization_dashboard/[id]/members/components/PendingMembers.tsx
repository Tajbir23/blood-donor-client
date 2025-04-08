'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { FaSearch, FaCheck, FaTimes } from 'react-icons/fa'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import {getPendingMembers, manageOrgMembers} from '@/app/actions/administrator/organization/manageOrg'
import Link from 'next/link'
import { User } from '@/lib/types/userType'

const PendingMembers = () => {
  const pathname = usePathname()
  const organizationId = pathname.split('/')[2] // Extract organization ID from URL
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPendingMembers, setTotalPendingMembers] = useState(0)
  
  const { data, isLoading, refetch} = useQuery({
    queryKey: ['organization-pending-members', organizationId, page, limit, search],
    queryFn: async () => {
        const response = await getPendingMembers(organizationId, page, limit, search)
        setTotalPendingMembers(response.totalPendingMembers)
        return response
    },
    staleTime: 60 * 60 * 1000, // 1 hour
  })
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The search is handled by the query dependency above
  }
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  // Mock action handlers - these would call your API in a real implementation
  const handleApprove = async (memberId: string) => {
    console.log(`Approve member ${memberId}`)
    // Call your API to approve the member
    console.log(organizationId, memberId, 'accepted')
    const response = await manageOrgMembers(organizationId, memberId, 'accepted')
    if (response.success) {
      refetch()
    }
  }

  const handleReject = async (memberId: string) => {
    console.log(`Reject member ${memberId}`)
    // Call your API to reject the member
    const response = await manageOrgMembers(organizationId, memberId, 'rejected')
    if (response.success) {
      refetch()
    }
  }

  return (
    <div>
      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6 max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="অপেক্ষমান সদস্য খুঁজুন..."
            className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </form>
      
      {/* Members List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
        </div>
      ) : data?.pendingMembers?.length ? (
        <div className="space-y-4">
          {data.pendingMembers.map((member: {userId: User}) => (
            <div key={member.userId._id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  {member.userId?.profileImageUrl ? (
                    <Image 
                      src={`${process.env.NEXT_PUBLIC_API_URL}${member.userId.profileImageUrl}`}
                      alt={member.userId.fullName || 'Member'} 
                      width={48} 
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-amber-100 text-amber-600 font-medium">
                      {(member.userId?.fullName || 'U')?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{member.userId?.fullName}</div>
                  <div className="text-xs text-gray-500">{member.userId?.email}</div>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      অপেক্ষমান
                    </span>
                    {member.userId?.bloodGroup && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {member.userId.bloodGroup}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 w-full sm:w-auto">
                <button 
                  onClick={() => handleApprove(member.userId._id || '')}
                  className="flex-1 sm:flex-initial bg-green-100 hover:bg-green-200 text-green-600 font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                >
                  <FaCheck className="mr-1" /> অনুমোদন
                </button>
                <button 
                  onClick={() => handleReject(member.userId._id || '')}
                  className="flex-1 sm:flex-initial bg-red-100 hover:bg-red-200 text-red-600 font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                >
                  <FaTimes className="mr-1" /> প্রত্যাখ্যান
                </button>
                <Link 
                  href={`/members/${member.userId._id}`}
                  target="_blank"
                  className="flex-1 sm:flex-initial bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                >
                  বিস্তারিত
                </Link>
              </div>
            </div>
          ))}
          
          {/* Pagination */}
          {totalPendingMembers > limit && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-700">
                মোট {totalPendingMembers} জন অপেক্ষমান সদস্য
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    page === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  পূর্ববর্তী
                </button>
                <span className="px-4 py-2 bg-amber-500 text-white rounded-md">
                  {page}
                </span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page * limit >= (totalPendingMembers || 0)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    page * limit >= (totalPendingMembers || 0)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  পরবর্তী
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg py-16">
          <div className="text-6xl text-gray-300 mb-4">🕒</div>
          <h3 className="text-xl font-medium text-gray-500 mb-1">কোন অপেক্ষমান সদস্য নেই</h3>
          <p className="text-gray-400">সকল যোগদান অনুরোধ অনুমোদিত হয়েছে</p>
        </div>
      )}
    </div>
  )
}

export default PendingMembers