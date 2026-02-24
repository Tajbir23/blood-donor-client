import { useEffect, useState } from "react"
import BloodRequestCard from "./BloodRequestCard"
import BloodRequestType from "@/lib/types/bloodRequestType"
import { getBloodRequest } from "@/app/actions/bloodDonation"

interface BloodRequestResponse {
  data: BloodRequestType[]
  message: string
  status: number
  total: number
}

const BloodRequest = () => {
  const [bloodRequest, setBloodRequest] = useState<BloodRequestResponse>()
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    const fetchBloodRequest = async () => {
      try {
        const response = await getBloodRequest(page, limit)
        if (isMounted) {
          setBloodRequest(response)
          setTotal(response.total)
        }
      } catch (error) {
        console.error('Error fetching blood requests:', error)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchBloodRequest()
    return () => { isMounted = false }
  }, [page, limit])

  const totalPages = Math.ceil(total / limit)

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card-classic h-52 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!bloodRequest?.data.length) {
    return (
      <div className="text-center py-20">
        <svg className="w-14 h-14 text-stone-200 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-stone-400 text-sm">কোনো রক্তের অনুরোধ পাওয়া যায়নি</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-stone-500">
          মোট <span className="font-semibold text-stone-700">{total}</span> টি অনুরোধের মধ্যে {(page - 1) * limit + 1}–{Math.min(page * limit, total)} দেখাচ্ছে
        </p>
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="req-limit" className="text-stone-500">প্রতি পৃষ্ঠায়:</label>
          <select
            id="req-limit"
            value={limit}
            onChange={e => { setLimit(Number(e.target.value)); setPage(1) }}
            className="border border-stone-200 rounded px-2 py-1 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <option value="5">৫</option>
            <option value="10">১০</option>
            <option value="20">২০</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bloodRequest.data.map(request => (
          <BloodRequestCard key={request._id} request={request} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4 border-t border-stone-100">
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
          <span className="text-sm text-stone-500">{page} / {totalPages}</span>
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
  )
}

export default BloodRequest
