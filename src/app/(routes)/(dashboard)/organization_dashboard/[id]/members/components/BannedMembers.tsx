'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { FaSearch, FaUserShield, FaExclamationTriangle } from 'react-icons/fa'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { getMembers } from '@/app/actions/organization'
import { User } from '@/lib/types/userType'

const BannedMembers = () => {
  const pathname = usePathname()
  const organizationId = pathname.split('/')[2] // Extract organization ID from URL
  
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  
  const { data, isLoading } = useQuery({
    queryKey: ['banned-members', organizationId, page, limit, search],
    queryFn: async () => {
      // Get all members and filter for banned members only
      const result = await getMembers(organizationId, page, limit, search);
      if (result) {
        // Filter for banned members only
        return {
          ...result,
          members: result.members.filter((member: User) => member.isBanned)
        };
      }
      return { members: [], totalMembers: 0 };
    }
  })
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleRestore = (memberId: string) => {
    console.log(`Restore member ${memberId}`)
    // Call your API to restore the member
  }

  return (
    <div>
      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6 max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="নিষিদ্ধ সদস্য খুঁজুন..."
            className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </form>
      
      {/* Members List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
        </div>
      ) : data?.members?.length ? (
        <>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  এই তালিকা শুধুমাত্র নিষিদ্ধ সদস্যদের দেখাচ্ছে। এরা কোন সংগঠন কার্যক্রমে অংশগ্রহণ করতে পারবেন না।
                </p>
              </div>
            </div>
          </div>
        
          <div className="grid gap-4 sm:grid-cols-2">
            {data.members.map((member: User) => (
              <div key={member._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 relative overflow-hidden">
                {/* Banned Banner */}
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 transform rotate-45 translate-x-6 translate-y-2 w-28 text-center">
                  নিষিদ্ধ
                </div>
                
                <div className="flex items-start pt-2">
                  <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-gray-200">
                    {member.profileImageUrl ? (
                      <Image 
                        src={typeof member.profileImageUrl === 'string' ? member.profileImageUrl : '/images/default-avatar.png'} 
                        alt={member.fullName || 'Member'} 
                        width={56} 
                        height={56}
                        className="h-full w-full object-cover grayscale" 
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500 font-medium grayscale">
                        {(member.fullName || 'U')?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="text-md font-medium text-gray-700">{member.fullName}</div>
                    <div className="text-xs text-gray-500 mb-2">{member.email}</div>
                    
                    {member.bloodGroup && (
                      <div className="mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {member.bloodGroup}
                        </span>
                      </div>
                    )}
                    
                  </div>
                </div>
                
                <div className="border-t border-gray-100 mt-4 pt-3">
                  <button 
                    onClick={() => handleRestore(member._id || '')}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                  >
                    <FaUserShield className="mr-2" /> পুনরায় সক্রিয় করুন
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {data.totalMembers > limit && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-700">
                মোট {data.totalMembers} জন নিষিদ্ধ সদস্য
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
                <span className="px-4 py-2 bg-gray-800 text-white rounded-md">
                  {page}
                </span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page * limit >= (data.totalMembers || 0)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    page * limit >= (data.totalMembers || 0)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  পরবর্তী
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg py-16">
          <div className="text-6xl text-gray-300 mb-4">🛡️</div>
          <h3 className="text-xl font-medium text-gray-500 mb-1">কোন নিষিদ্ধ সদস্য নেই</h3>
          <p className="text-gray-400">আপনার সংগঠনে কোন সদস্য নিষিদ্ধ করা হয়নি</p>
        </div>
      )}
    </div>
  )
}

export default BannedMembers 