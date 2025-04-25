export const dynamic = 'force-static'; // Cache UI as static
export const revalidate = 86400;

import BloodDonationModal from "@/components/modals/BloodDonationModal"
import { Metadata } from 'next'

export const generateMetadata = (): Metadata => {
  return {
    title: 'রক্তদানের তারিখ আপডেট করুন | Blood Donor',
    description: 'আপনার সর্বশেষ রক্তদানের তারিখ আপডেট করুন। নিয়মিত রক্তদান করলে সেটি আপডেট করা গুরুত্বপূর্ণ।',
    keywords: 'রক্তদান, রক্তদানের তারিখ, আপডেট রক্তদান, ব্লাড ডোনেশন, blood donation, blood donor, donate blood',
    openGraph: {
      title: 'রক্তদানের তারিখ আপডেট করুন | Blood Donor',
      description: 'আপনার সর্বশেষ রক্তদানের তারিখ আপডেট করুন। নিয়মিত রক্তদান করলে সেটি আপডেট করা গুরুত্বপূর্ণ।',
      type: 'website',
      locale: 'bn_BD',
      siteName: 'Blood Donor',
      images: [
        {
          url: '/assets/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'রক্তদানের তারিখ আপডেট করুন',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'রক্তদানের তারিখ আপডেট করুন | Blood Donor',
      description: 'আপনার সর্বশেষ রক্তদানের তারিখ আপডেট করুন। নিয়মিত রক্তদান করলে সেটি আপডেট করা গুরুত্বপূর্ণ।',
    },
    alternates: {
      canonical: 'https://blood-donor.vercel.app/update_last_donation',
    },
  }
}

const UpdateLastDonation = () => {
  return (
    <div className="container mx-auto max-w-md py-12 px-4">
      <h1 className="text-2xl font-bold text-red-700 mb-6 text-center">আপনার রক্তদানের তারিখ আপডেট করুন</h1>
      <p className="text-gray-600 mb-8 text-center">
        আপনার সর্বশেষ রক্তদানের তারিখ আপডেট করে আমাদের সাহায্য করুন আপনাকে পরবর্তী রক্তদানের জন্য সঠিক সময়ে মনে করিয়ে দিতে।
      </p>
      <BloodDonationModal isOpen={true} page={true} />
    </div>
  )
}

export default UpdateLastDonation