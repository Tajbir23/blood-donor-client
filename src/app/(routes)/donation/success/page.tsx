'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

interface TransactionDetails {
  tran_id: string
  amount: string
  status?: string
  [key: string]: string | undefined
}

// Separate component that uses useSearchParams
function SuccessContent() {
  const searchParams = useSearchParams()
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get all query parameters
    const params: TransactionDetails = {
      tran_id: searchParams.get('tran_id') || '',
      amount: searchParams.get('amount') || '',
      status: searchParams.get('status') || 'VALID'
    };

    // Add any other parameters dynamically
    searchParams.forEach((value, key) => {
      if (!['tran_id', 'amount', 'status'].includes(key)) {
        params[key] = value;
      }
    });

    setTransactionDetails(params);
    setLoading(false);

    // You can optionally verify the transaction with your backend here
    // const verifyTransaction = async () => {
    //   try {
    //     const response = await fetch(`/api/verify-payment?tran_id=${params.tran_id}`);
    //     const data = await response.json();
    //     // Update with verified data if needed
    //   } catch (error) {
    //     console.error('Error verifying transaction:', error);
    //   }
    // };
    // verifyTransaction();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-red-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!transactionDetails?.tran_id) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">অবৈধ লেনদেন</h1>
        <p className="text-gray-600 mb-6">কোন বৈধ লেনদেন তথ্য পাওয়া যায়নি।</p>
        <Link 
          href="/donation" 
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="h-20 w-20 flex items-center justify-center bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-600 text-center">
            অনুদান সফলভাবে সম্পন্ন হয়েছে!
          </h1>
          <p className="text-gray-600 text-center mt-2">
            আপনার অনুদানের জন্য আন্তরিক ধন্যবাদ!
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            লেনদেনের বিবরণ
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">লেনদেন আইডি</p>
              <p className="font-medium text-gray-800">{transactionDetails.tran_id}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">পরিমাণ</p>
              <p className="font-medium text-gray-800">৳{transactionDetails.amount}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">স্ট্যাটাস</p>
              <p className="font-medium text-green-600">
                {transactionDetails.status || 'সফল'}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">তারিখ</p>
              <p className="font-medium text-gray-800">
                {new Date().toLocaleDateString('bn-BD')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-3">
            আপনার অনুদান কীভাবে সাহায্য করবে
          </h2>
          <p className="text-gray-700">
            আপনার অনুদান রক্তদান কার্যক্রম পরিচালনা করতে এবং আরও বেশি মানুষকে সাহায্য করতে ব্যবহৃত হবে। এটি রক্তদাতাদের জন্য প্রয়োজনীয় সরঞ্জাম, প্রশিক্ষণ এবং সচেতনতা বাড়াতে সাহায্য করবে।
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
export default function Success() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SuccessContent />
    </Suspense>
  );
}