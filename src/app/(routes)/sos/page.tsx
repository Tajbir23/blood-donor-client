export const dynamic = 'force-static';
export const revalidate = 86400;

import BloodRequestForm from "@/components/Blood-Request-Form/BloodRequestForm"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'জরুরী রক্তের জন্য অনুরোধ করুন | LifeDrop',
  description: 'জরুরী রক্তের প্রয়োজন হলে LifeDrop-এ রক্তের জন্য অনুরোধ করুন। দ্রুত এবং সহজে বাংলাদেশের যেকোনো জেলার রক্তদাতাদের সাথে যোগাযোগ করুন।',
  keywords: ['জরুরী রক্ত', 'রক্তের অনুরোধ', 'বাংলাদেশ', 'রক্তদাতা', 'জীবন বাঁচান', 'রক্ত গ্রুপ', 'LifeDrop'],
  openGraph: {
    title: 'জরুরী রক্তের জন্য অনুরোধ করুন | LifeDrop',
    description: 'জরুরী রক্তের প্রয়োজন হলে আমাদের প্লাটফর্মে রক্তের জন্য অনুরোধ করুন। দ্রুত এবং সহজে রক্তদাতাদের সাথে যোগাযোগ করুন।',
    type: 'website',
    images: [
      {
        url: '/hero-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LifeDrop জরুরী রক্তের অনুরোধ',
      },
    ],
  },
}

const page = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div className="bg-red-700 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-300 mb-2">জরুরী সেবা</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">জরুরী রক্তের জন্য অনুরোধ</h1>
          <p className="text-red-100 text-sm max-w-xl mx-auto">
            জরুরী রক্তের প্রয়োজন হলে নিচের ফর্মটি পূরণ করুন। আমরা দ্রুত আপনার কাছের রক্তদাতাদের সাথে যোগাযোগ করব।
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <BloodRequestForm type="sos" title="জরুরী রক্তের জন্য অনুরোধ করুন" />
      </div>
    </div>
  )
}

export default page
