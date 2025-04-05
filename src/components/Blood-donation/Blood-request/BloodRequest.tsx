import { useEffect, useState } from "react"
import BloodRequestCard from "./BloodRequestCard"
import BloodRequestType from "@/lib/types/bloodRequestType"
import Loading from "@/app/libs/Loading"
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
    let isMounted = true;
    
    const fetchBloodRequest = async () => {
      try {
        const response = await getBloodRequest(page, limit);
        if (isMounted) {
          setBloodRequest(response);
          setTotal(response.total);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching blood requests:", error);
          setLoading(false);
        }
      }
    };
    
    fetchBloodRequest();
    
    return () => {
      isMounted = false;
    };
  }, [page, limit]);

  if(loading){
    return <Loading size="large" fullScreen={true} />
  }
  return (
    <div className="space-y-6">
      {bloodRequest?.data.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">কোন রক্তের অনুরোধ পাওয়া যায়নি</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {bloodRequest?.data.map((request) => (
              <BloodRequestCard 
                key={request._id} 
                request={request} 
              />
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <div className="text-sm text-gray-600">
              {total > 0 && (
                <span>মোট {total} টি অনুরোধের মধ্যে {(page - 1) * limit + 1}-{Math.min(page * limit, total)} দেখাচ্ছে</span>
              )}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded border bg-white disabled:opacity-50"
              >
                পূর্ববর্তী
              </button>
              
              <span className="px-3 py-1 bg-gray-100 rounded border">
                {page}
              </span>
              
              <button
                onClick={() => setPage(prev => prev + 1)}
                disabled={page * limit >= total}
                className="px-3 py-1 rounded border bg-white disabled:opacity-50"
              >
                পরবর্তী
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <label htmlFor="limit" className="text-sm">প্রতি পৃষ্ঠায়:</label>
              <select
                id="limit"
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default BloodRequest
