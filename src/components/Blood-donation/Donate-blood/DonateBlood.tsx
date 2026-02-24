'use client'
import { useEffect, useState } from "react"
import DonorCard from "./DonorCard"
import { getBloodDonors } from "@/app/actions/bloodDonation"
import { User } from "@/lib/types/userType"

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

interface ResponseDonorType {
  success: boolean
  message: string
  data: User[]
  total: number
}

const DonateBlood = ({ compact = false }: { compact?: boolean }) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12)
  const [bloodDonors, setBloodDonors] = useState<ResponseDonorType>()
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    getBloodDonors(page, limit, search)
      .then(response => {
        if (isMounted) {
          setBloodDonors(response)
          setTotal(response.total)
          setLoading(false)
        }
      })
      .catch(err => { console.error(err); if (isMounted) setLoading(false) })
    return () => { isMounted = false }
  }, [page, limit, search])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    setSearch(searchInput.trim())
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className={compact ? '' : 'min-h-screen bg-stone-50'}>
      {/* Page header — only shown when standalone */}
      {!compact && (
        <div className="bg-red-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-300 mb-2">রক্তদাতা খুঁজুন</p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">সঠিক রক্তদাতা খুঁজে নিন</h1>
            <p className="text-red-100 text-sm max-w-xl mx-auto">
              নাম, রক্তের গ্রুপ বা এলাকা দিয়ে বাংলাদেশের নিবন্ধিত রক্তদাতাদের খুঁজুন।
            </p>
          </div>
        </div>
      )}

      {/* Search form */}
      <div className={compact ? 'bg-white border-b border-stone-100 shadow-sm' : 'bg-red-700 pb-6'}>
        <div className={`max-w-4xl mx-auto px-4 ${compact ? 'py-3' : ''}`}>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="নাম, রক্তের গ্রুপ বা এলাকা..."
                className={`w-full pl-10 pr-4 py-2.5 rounded text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-300 ${compact ? 'border border-stone-200 bg-stone-50' : 'border-0 bg-white'}`}
              />
            </div>
            <button type="submit" className="px-5 py-2.5 text-sm font-semibold rounded transition-colors whitespace-nowrap bg-red-700 text-white hover:bg-red-800">
              খুঁজুন
            </button>
          </form>

          {/* Blood group quick filters */}
          <div className="flex flex-wrap gap-1.5 mt-2.5 pb-0.5">
            <span className={`text-xs font-medium self-center mr-1 ${compact ? 'text-stone-400' : 'text-red-200'}`}>দ্রুত ফিল্টার:</span>
            {BLOOD_GROUPS.map(g => (
              <button
                key={g}
                type="button"
                onClick={() => { setSearchInput(g); setSearch(g); setPage(1) }}
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border transition-colors ${
                  search === g
                    ? 'bg-red-700 text-white border-red-700'
                    : compact
                    ? 'bg-stone-50 text-stone-600 border-stone-200 hover:border-red-300 hover:text-red-700'
                    : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                }`}
              >
                {g}
              </button>
            ))}
            {search && (
              <button
                type="button"
                onClick={() => { setSearchInput(''); setSearch(''); setPage(1) }}
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border transition-colors ${compact ? 'border-stone-200 text-stone-400 hover:bg-stone-100' : 'border-white/30 bg-white/10 text-white hover:bg-white/20'}`}
              >
                ✕ মুছুন
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats row */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-stone-500">
            {loading ? 'লোড হচ্ছে…' : `মোট ${total} জন রক্তদাতা পাওয়া গেছে`}
          </p>
          <select
            value={limit}
            onChange={e => { setLimit(Number(e.target.value)); setPage(1) }}
            className="text-sm border border-stone-200 rounded px-2 py-1 bg-white text-stone-700 focus:outline-none focus:ring-1 focus:ring-red-300"
          >
            <option value={12}>১২ জন/পাতা</option>
            <option value={24}>২৪ জন/পাতা</option>
            <option value={48}>৪৮ জন/পাতা</option>
          </select>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white border border-stone-200 rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        ) : !bloodDonors?.data?.length ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-800 mb-1">কোনো রক্তদাতা পাওয়া যায়নি</h3>
            <p className="text-sm text-stone-500">অন্য গ্রুপ বা এলাকা দিয়ে খোঁজার চেষ্টা করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {bloodDonors.data.map(donor => (
              <DonorCard key={donor._id} donor={donor} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-4 py-2 text-sm border border-stone-200 rounded bg-white text-stone-600 disabled:opacity-40 hover:border-red-300 hover:text-red-700 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              পূর্ববর্তী
            </button>
            <span className="px-4 py-2 text-sm text-stone-600 bg-white border border-stone-200 rounded">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex items-center gap-1 px-4 py-2 text-sm border border-stone-200 rounded bg-white text-stone-600 disabled:opacity-40 hover:border-red-300 hover:text-red-700 transition-colors"
            >
              পরবর্তী
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DonateBlood

