'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { XCircle } from 'lucide-react'

interface FailedTransaction {
  tran_id: string
  amount: string
  error_message?: string
  [key: string]: string | undefined
}

// Separate component that uses useSearchParams
function FailedContent() {
  const searchParams = useSearchParams()
  const [transactionDetails, setTransactionDetails] = useState<FailedTransaction | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get all query parameters
    const params: FailedTransaction = {
      tran_id: searchParams.get('tran_id') || '',
      amount: searchParams.get('amount') || '',
      error_message: searchParams.get('error_message') || 'লেনদেনটি ব্যর্থ হয়েছে'
    };

    // Add any other parameters dynamically
    searchParams.forEach((value, key) => {
      if (!['tran_id', 'amount', 'error_message'].includes(key)) {
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
          <div className="h-20 w-20 flex items-center justify-center bg-red-100 rounded-full mb-4">
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-red-600 text-center">
            অনুদান প্রক্রিয়াকরণ ব্যর্থ হয়েছে
          </h1>
          <p className="text-gray-600 text-center mt-2">
            আপনার পেমেন্ট প্রক্রিয়া করার সময় একটি সমস্যা দেখা দিয়েছে।
          </p>
        </div>

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
            
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">ত্রুটির কারণ</p>
              <p className="font-medium text-red-600">
                {transactionDetails?.error_message || 'লেনদেনটি ব্যর্থ হয়েছে'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-3">
            আপনি যা করতে পারেন
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>আবার চেষ্টা করুন। কখনও কখনও অস্থায়ী সমস্যার কারণে লেনদেন ব্যর্থ হতে পারে।</li>
            <li>আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন।</li>
            <li>আপনার পেমেন্ট পদ্ধতি পরীক্ষা করুন এবং পর্যাপ্ত টাকা আছে কিনা নিশ্চিত করুন।</li>
            <li>অন্য কোন পেমেন্ট পদ্ধতি ব্যবহার করে দেখুন।</li>
            <li>যদি সমস্যা চলতে থাকে, আমাদের সাথে যোগাযোগ করুন।</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/donation" 
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-center"
          >
            আবার চেষ্টা করুন
          </Link>
          
          <Link 
            href="/contact" 
            className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition text-center"
          >
            সাহায্য নিন
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
export default function Failed() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <FailedContent />
    </Suspense>
  );
} 