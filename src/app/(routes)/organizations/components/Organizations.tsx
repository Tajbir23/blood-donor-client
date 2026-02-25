'use client'

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useState } from "react"
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
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ["allOrganizations", page, search],
    queryFn: async () => {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/organization/organizations?search=${encodeURIComponent(search)}&page=${page}&limit=${ITEMS_PER_PAGE}`,
        { method: "GET", headers: { "content-type": 'application/json' }, signal: controller.signal }
      )
      clearTimeout(timeoutId)
      if (!res.ok) throw new Error('Failed to fetch organizations')
      return res.json()
    },
    initialData: initialData?.organizations?.length > 0 ? initialData : undefined,
    staleTime: initialData?.organizations?.length > 0 ? 600000 : 0,
    retry: 2,
    refetchOnWindowFocus: false
  })

  const totalPages = Math.ceil((data?.totalOrganizations || 0) / ITEMS_PER_PAGE)
  const organizations: Organization[] = data?.organizations || []

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    setSearch(searchInput.trim())
  }

  const handleJoinOrganization = async (orgId: string) => {
    const response = await joinOrganization(orgId)
    toast.success(response.message)
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div className="bg-red-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-300 mb-2">রক্তদান নেটওয়ার্ক</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">রক্তদাতা সংগঠনসমূহ</h1>
          <p className="text-red-100 text-sm max-w-xl mx-auto">
            বাংলাদেশের নিবন্ধিত রক্তদান সংগঠন, হাসপাতাল ও ব্লাড ব্যাংকের তালিকা খুঁজুন এবং যোগ দিন।
          </p>
          {/* Search */}
          <form onSubmit={handleSearch} className="mt-6 max-w-lg mx-auto flex gap-2">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="সংগঠনের নাম বা এলাকা..."
                className="w-full pl-10 pr-4 py-2.5 rounded border-0 text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>
            <button type="submit" className="px-5 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded hover:bg-stone-800 transition-colors whitespace-nowrap">
              খুঁজুন
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results info */}
        {search && !isLoading && (
          <div className="mb-5 flex items-center gap-2 text-sm text-stone-600">
            <span>&ldquo;{search}&rdquo; এর জন্য {data?.totalOrganizations || 0} টি ফলাফল</span>
            <button onClick={() => { setSearch(''); setSearchInput(''); setPage(1) }} className="text-red-700 hover:underline">মুছুন</button>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-classic h-72 animate-pulse" />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="font-serif text-lg font-bold text-stone-800 mb-2">লোড করতে সমস্যা হচ্ছে</h3>
            <p className="text-stone-500 text-sm mb-4">দয়া করে আবার চেষ্টা করুন।</p>
            <button onClick={() => window.location.reload()} className="px-5 py-2 bg-red-700 text-white rounded text-sm hover:bg-red-800 transition-colors">
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && organizations.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-stone-200 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
            </svg>
            <p className="text-stone-500">কোনো সংগঠন পাওয়া যায়নি</p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !error && organizations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizations.map((org) => (
              <div key={org._id} className="card-classic overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-5 border-b border-stone-100 flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-stone-100 flex-shrink-0 bg-stone-50">
                    <Image
                      height={56} width={56}
                      src={org.logoImage || '/assets/default-org.png'}
                      alt={org.organizationName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-bold text-stone-800 truncate">{org.organizationName}</h3>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-100 rounded-full text-xs font-semibold">
                        {getOrganizationTypeBangla(org.organizationType)}
                      </span>
                      {org.hasBloodBank && (
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-semibold">
                          ব্লাড ব্যাংক
                        </span>
                      )}
                      {org.providesEmergencyBlood && (
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-xs font-semibold">
                          জরুরি রক্ত
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col gap-3">
                  {org.description && (
                    <p className="text-stone-600 text-sm line-clamp-2">{org.description}</p>
                  )}

                  <div className="space-y-1.5 text-sm text-stone-600">
                    {org.address && (
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="line-clamp-1">{org.address}</span>
                      </div>
                    )}
                    {org.phone && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-stone-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{org.phone}</span>
                      </div>
                    )}
                    {org.website && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-stone-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-red-700 hover:underline line-clamp-1">{org.website}</a>
                      </div>
                    )}
                  </div>

                  {/* Blood groups */}
                  {org.availableBloodGroups?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {org.availableBloodGroups.map(g => (
                        <span key={g} className="px-2 py-0.5 bg-red-700 text-white rounded-full text-xs font-bold">{g}</span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto pt-3 border-t border-stone-100">
                    <Link
                      href={`/organizations/${org._id}`}
                      className="flex-1 text-center py-2 rounded border border-stone-200 text-stone-700 text-sm font-semibold hover:bg-stone-50 transition-colors"
                    >
                      বিস্তারিত
                    </Link>
                    {decodedUser && (
                      <button
                        onClick={() => handleJoinOrganization(org._id)}
                        className="flex-1 py-2 rounded bg-red-700 text-white text-sm font-semibold hover:bg-red-800 transition-colors"
                      >
                        যোগ দিন
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-4 py-2 rounded border border-stone-200 text-sm text-stone-600 disabled:opacity-30 hover:bg-stone-50 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              পূর্ববর্তী
            </button>
            <span className="text-sm text-stone-500">পৃষ্ঠা {page} / {totalPages || 1}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex items-center gap-1 px-4 py-2 rounded border border-stone-200 text-sm text-stone-600 disabled:opacity-30 hover:bg-stone-50 transition-colors"
            >
              পরবর্তী
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Organizations
