'use client'

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

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
}

interface OrganizationsProps {
  initialData: {
    organizations: Organization[];
    totalOrganizations: number;
  }
}

const ITEMS_PER_PAGE = 10

const Organizations = ({ initialData }: OrganizationsProps) => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ["allOrganizations", page, search],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/organization/organizations?search=${search}&page=${page}&limit=${ITEMS_PER_PAGE}`,
        {
          method: "GET",
          headers: {
            "content-type": 'application/json'
          }
        }
      )
      return res.json()
    },
    initialData,
    staleTime: 60000, // 1 minute
  })

  const totalPages = Math.ceil((data?.totalOrganizations || 0) / ITEMS_PER_PAGE)
  const organizations = data?.organizations || []

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading organizations</div>

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
          <div key={org._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 relative rounded-full overflow-hidden">
                <Image
                  height={100}
                  width={100}
                  src={org.logoImage || '/assets/default-org.png'}
                  alt={org.organizationName}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{org.organizationName}</h3>
                <p className="text-gray-600">{org.organizationType}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-700">{org.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {org.availableBloodGroups.map((group: string) => (
                  <span key={group} className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                    {group}
                  </span>
                ))}
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
