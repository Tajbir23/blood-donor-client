'use client'

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import decodedJwtType from '../../../../lib/types/decodedJwtType';
import Link from "next/link"
import { joinOrganization } from "@/app/actions/organization"
import toast from "react-hot-toast"

interface Organization {
  _id: string;
  organizationName: string;
  organizationType: string;
  description: string;
  availableBloodGroups: string[];
  hasBloodBank: boolean;
  providesEmergencyBlood: boolean;
  districtId: string;
  thanaId: string;
  logoImage: string;
  isActive: boolean;
  address?: string;
  website?: string;
  phone?: string;
  representativeName?: string;
}

interface OrganizationsProps {
  initialData: {
    organizations: Organization[];
    totalOrganizations: number;
  },
  decodedUser: decodedJwtType
}

const ITEMS_PER_PAGE = 10

// Helper function to convert organization type to Bengali
const getOrganizationTypeBangla = (type: string): string => {
  switch(type) {
    case 'hospital': return 'হাসপাতাল';
    case 'bloodBank': return 'ব্লাড ব্যাংক';
    case 'clinic': return 'ক্লিনিক';
    case 'ngo': return 'এনজিও';
    case 'volunteer': return 'স্বেচ্ছাসেবী সংগঠন';
    case 'other': return 'অন্যান্য';
    default: return type;
  }
};

const Organizations = ({ initialData, decodedUser }: OrganizationsProps) => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data, isLoading: isQueryLoading, error: queryError } = useQuery({
    queryKey: ["allOrganizations", page, search],
    queryFn: async () => {
      setIsLoading(true)
      setError(null)
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/organization/organizations?search=${search}&page=${page}&limit=${ITEMS_PER_PAGE}`,
          {
            method: "GET",
            headers: {
              "content-type": 'application/json'
            },
            signal: controller.signal
          }
        )

        clearTimeout(timeoutId)

        if (!res.ok) {
          throw new Error('Failed to fetch organizations')
        }

        return res.json()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    initialData,
    staleTime: 600000, // 10 minutes
    retry: 2, // Retry failed requests twice
    refetchOnWindowFocus: false // Don't refetch when window regains focus
  })

  const totalPages = Math.ceil((data?.totalOrganizations || 0) / ITEMS_PER_PAGE)
  const organizations = data?.organizations || []

  if (isLoading || isQueryLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    )
  }

  if (error || queryError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">একটি ত্রুটি ঘটেছে</h3>
          <p className="text-gray-600 mb-4">সংগঠনগুলি লোড করতে সমস্যা হচ্ছে। দয়া করে আবার চেষ্টা করুন।</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    )
  }

  const handleJoinOrganization = async(orgId: string) => {
    
    const response = await joinOrganization(orgId)
    toast.success(response.message)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="সংগঠন খুঁজুন..."
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Organizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org: Organization) => (
          <div key={org._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Organization Header */}
            <div className="bg-red-50 p-4 border-b">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-red-200">
                  <Image
                    height={100}
                    width={100}
                    src={org.logoImage ? `${process.env.NEXT_PUBLIC_API_URL}${org.logoImage}` : '/assets/default-org.png'}
                    alt={org.organizationName}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{org.organizationName}</h3>
                  <div className="flex items-center mt-1">
                    <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">
                      {getOrganizationTypeBangla(org.organizationType)}
                    </span>
                    {org.hasBloodBank && (
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                        ব্লাড ব্যাংক আছে
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Organization Details */}
            <div className="p-4">
              {/* Description */}
              <p className="text-gray-700 text-sm mb-3">{org.description}</p>
              
              {/* Info Grid */}
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="text-gray-500 w-24">ঠিকানা:</span>
                  <span className="text-gray-800">{org.address || 'উল্লেখ করা হয়নি'}</span>
                </div>
                {org.website && (
                  <div className="flex">
                    <span className="text-gray-500 w-24">ওয়েবসাইট:</span>
                    <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">{org.website}</a>
                  </div>
                )}
                <div className="flex">
                  <span className="text-gray-500 w-24">যোগাযোগ:</span>
                  <span className="text-gray-800">{org.phone || 'উল্লেখ করা হয়নি'}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-24">প্রতিনিধি:</span>
                  <span className="text-gray-800">{org.representativeName || 'উল্লেখ করা হয়নি'}</span>
                </div>
              </div>
              
              {/* Blood Groups */}
              {org.availableBloodGroups && org.availableBloodGroups.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-1">উপলব্ধ রক্তের গ্রুপ:</p>
                  <div className="flex flex-wrap gap-2">
                    {org.availableBloodGroups.map((group: string) => (
                      <span key={group} className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">
                        {group}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="mt-4 flex gap-3 pt-3 border-t">
                <Link 
                  href={`/organizations/${org._id}`} 
                  className="flex-1 text-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded transition-colors text-sm"
                >
                  বিস্তারিত দেখুন
                </Link>
                {decodedUser && <button onClick={() => handleJoinOrganization(org._id)}
                  className="cursor-pointer flex-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors text-sm"
                >
                  অংশগ্রহণ করুন
                </button>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center space-x-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
          aria-label="Previous Page"
        >
          <FaChevronLeft />
        </button>
        <span className="text-gray-600">
          পৃষ্ঠা {page} / {totalPages || 1}
        </span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
          aria-label="Next Page"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  )
}

export default Organizations
