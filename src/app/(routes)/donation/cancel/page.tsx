'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

interface CancelledTransaction {
  tran_id: string
  amount: string
  [key: string]: string | undefined
}

// Separate component that uses useSearchParams
function CancelContent() {
  const searchParams = useSearchParams()
  const [transactionDetails, setTransactionDetails] = useState<CancelledTransaction | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get all query parameters
    const params: CancelledTransaction = {
      tran_id: searchParams.get('tran_id') || '',
      amount: searchParams.get('amount') || '',
    };

    // Add any other parameters dynamically
    searchParams.forEach((value, key) => {
      if (!['tran_id', 'amount'].includes(key)) {
        params[key] = value;
      }
    });

    setTransactionDetails(params);
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-red-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="h-20 w-20 flex items-center justify-center bg-yellow-100 rounded-full mb-4">
            <AlertCircle className="h-12 w-12 text-yellow-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-yellow-600 text-center">
            অনুদান বাতিল করা হয়েছে
          </h1>
          <p className="text-gray-600 text-center mt-2">
            আপনি অনুদান প্রক্রিয়া বাতিল করেছেন
          </p>
        </div>

        {(transactionDetails?.tran_id || transactionDetails?.amount) && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              লেনদেনের বিবরণ
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {transactionDetails?.tran_id && (
                <div>
                  <p className="text-sm text-gray-500">লেনদেন আইডি</p>
                  <p className="font-medium text-gray-800">{transactionDetails.tran_id}</p>
                </div>
              )}
              
              {transactionDetails?.amount && (
                <div>
                  <p className="text-sm text-gray-500">পরিমাণ</p>
                  <p className="font-medium text-gray-800">৳{transactionDetails.amount}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-gray-500">স্ট্যাটাস</p>
                <p className="font-medium text-yellow-600">বাতিল</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-3">
            আপনার অনুদান গুরুত্বপূর্ণ!
          </h2>
          <p className="text-gray-700 mb-3">
            আপনার অনুদান আমাদের রক্তদান কার্যক্রম পরিচালনা করতে এবং জীবন বাঁচাতে সাহায্য করে। আপনি যদি পরে অনুদান করতে চান, আমরা আপনাকে স্বাগত জানাই।
          </p>
          <p className="text-gray-700">
            প্রত্যেক অনুদান মূল্যবান এবং রক্ত সংগ্রহ ও প্রদান করার জন্য আমাদের প্রয়োজনীয় সংস্থান প্রদান করে।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/donation" 
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-center"
          >
            আবার অনুদান করুন
          </Link>
          
          <Link 
            href="/" 
            className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition text-center"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  )
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-spin h-12 w-12 border-4 border-red-500 rounded-full border-t-transparent"></div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function Cancel() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CancelContent />
    </Suspense>
  );
} 