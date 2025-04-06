import { useEffect, useState } from "react"
import DonorCard from "./DonorCard"
import { getBloodDonors } from "@/app/actions/bloodDonation"
import { User } from "@/lib/types/userType"
import Loading from "@/app/libs/Loading"

interface ResponseDonorType {
  success: boolean
  message: string
  data: User[]
  total: number
}
const DonateBlood = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [bloodDonors, setBloodDonors] = useState<ResponseDonorType>()
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchBloodDonors = async () => {
      try {
        const response = await getBloodDonors(page, limit, search)
        if(isMounted) {
          setBloodDonors(response)
          setTotal(response.total)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchBloodDonors()

    return () => {
      isMounted = false
    }
  },[page, limit])

  if(loading) {
    return <Loading size="large" fullScreen={true} />
  }
  return (
    <div className="flex flex-col">
      {/* Search Bar */}
      <div className="mb-6 p-4">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="রক্তদাতা খুঁজুন (নাম, রক্তের গ্রুপ, এলাকা)"
            className="w-full px-4 py-2 pl-10 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button 
            onClick={() => {
              setPage(1);
              setLoading(true);
              getBloodDonors(1, limit, search).then(response => {
                setBloodDonors(response);
                setTotal(response.total);
                setLoading(false);
              });
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-600 hover:text-red-800"
          >
            <span className="bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded-md text-sm">খুঁজুন</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {bloodDonors?.data?.map((donor) => (
          <DonorCard key={donor._id} donor={donor} />
        ))}
      </div>
      
      {/* Pagination */}
      {total > 0 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button 
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md ${page === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            পূর্ববর্তী
          </button>
          
          <span className="text-gray-700">
            পৃষ্ঠা {page} / {Math.ceil(total / limit)}
          </span>
          
          <button 
            onClick={() => setPage(prev => prev + 1)}
            disabled={page >= Math.ceil(total / limit)}
            className={`px-4 py-2 rounded-md ${page >= Math.ceil(total / limit) ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            পরবর্তী
          </button>
          
          <select 
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1); // Reset to first page when changing limit
            }}
            className="ml-4 px-2 py-2 border rounded-md bg-white"
          >
            <option value={5}>5 জন</option>
            <option value={10}>10 জন</option>
            <option value={20}>20 জন</option>
            <option value={50}>50 জন</option>
          </select>
        </div>
      )}
      
      {bloodDonors?.data.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">কোন রক্তদাতা পাওয়া যায়নি</p>
        </div>
      )}
    </div>
  )
}

export default DonateBlood
