'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '@/app/actions/administrator/system/dashboardAction'
import { FaEye, FaLock, FaUnlock, FaTrash } from 'react-icons/fa'
import Link from 'next/link'
import { User } from '@/lib/types/userType'

const UsersPage = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['dashboard-users', page, limit],
    queryFn: () => getAllUsers({ search, page, limit }),
    staleTime: 1000 * 60 * 5,
  })

  const handleAction = async (userId: string, action: 'block' | 'unblock' | 'delete') => {
    // Implement action handlers here
    console.log(`Action ${action} for user ${userId}`)
    // After successful action, refetch the data
    refetch()
    setActiveDropdown(null)
  }

  const toggleDropdown = (userId: string) => {
    setActiveDropdown(activeDropdown === userId ? null : userId)
  }

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    if (activeDropdown) {
      setActiveDropdown(null)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1) // Reset to first page on new search
  }

  const handleSearchSubmit = () => {
    refetch()
  }

  if(isLoading){
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[...Array(7)].map((_, index) => (
                    <th key={index} className="px-6 py-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                        <div className="ml-4">
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </td>
                    {[...Array(5)].map((_, cellIndex) => (
                      <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="mx-auto px-4 py-8" onClick={handleClickOutside}>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">ব্যবহারকারী তালিকা</h1>
        <div className="relative w-full sm:w-auto flex">
          <input
            type="text"
            placeholder="অনুসন্ধান করুন..."
            className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={search}
            onChange={handleSearch}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
          />
          <button 
            onClick={handleSearchSubmit}
            className="px-4 py-2 bg-red-500 text-white rounded-r-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            খুঁজুন
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg">
        <div className="overflow-x-auto lg:overflow-visible">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">নাম</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ইমেইল</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ফোন</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">রক্তের গ্রুপ</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ঠিকানা</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">অবস্থা</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.users?.map((user: User) => (
                <tr key={user._id} className={user.isBanned ? 'bg-red-50' : user.isActive ? '' : 'bg-gray-50'}>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-full object-cover" 
                          src={`${process.env.NEXT_PUBLIC_API_URL}${user.profileImageUrl}` || '/placeholder-avatar.png'} 
                          alt={user.fullName} 
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                        <div className="text-xs text-gray-500">{user.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 max-w-[150px] truncate">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{user.phone}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      {user.bloodGroup}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 max-w-[120px]">
                    {user.address ? (
                      <span className="truncate block">{user.address}</span>
                    ) : (
                      <span className="text-gray-400">অনির্দিষ্ট</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {user.isBanned ? (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        নিষিদ্ধ
                      </span>
                    ) : user.isActive ? (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        সক্রিয়
                      </span>
                    ) : (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        নিষ্ক্রিয়
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">
                    <div className="relative">
                      <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(user._id as string);
                        }}
                      >
                        <span className="sr-only">পদক্ষেপ</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                      {activeDropdown === user._id && (
                        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" 
                             onClick={(e) => e.stopPropagation()}
                             style={{ maxHeight: '300px', overflowY: 'auto' }}>
                          <div className="py-1" role="menu" aria-orientation="vertical">
                            <Link 
                              href={`/user/${user._id}`}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <FaEye className="mr-2" /> বিস্তারিত দেখুন
                            </Link>
                            {user.isBanned ? (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAction(user._id as string, 'unblock');
                                }}
                                className="flex w-full items-center px-4 py-2 text-sm text-green-700 hover:bg-gray-100"
                              >
                                <FaUnlock className="mr-2" /> অবরোধ মুক্ত করুন
                              </button>
                            ) : (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAction(user._id as string, 'block');
                                }}
                                className="flex w-full items-center px-4 py-2 text-sm text-orange-700 hover:bg-gray-100"
                              >
                                <FaLock className="mr-2" /> অবরোধ করুন
                              </button>
                            )}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAction(user._id as string, 'delete');
                              }}
                              className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                            >
                              <FaTrash className="mr-2" /> মুছে ফেলুন
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {data?.totalPages > 1 && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex justify-between w-full sm:w-auto gap-2">
              <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`relative inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md ${
                  page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                পূর্ববর্তী
              </button>
              <button
                onClick={() => setPage(prev => prev < (data?.totalPages || 1) ? prev + 1 : prev)}
                disabled={page >= (data?.totalPages || 1)}
                className={`relative inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md ${
                  page >= (data?.totalPages || 1) ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                পরবর্তী
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div>
                <p className="text-sm text-gray-700">
                  মোট <span className="font-medium">{data?.totalUsers || 0}</span> জন ব্যবহারকারী
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-1">
                {Array.from({ length: data?.totalPages || 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPage(idx + 1)}
                    className={`relative inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md ${
                      page === idx + 1
                        ? 'z-10 bg-red-50 border-red-500 text-red-600'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UsersPage