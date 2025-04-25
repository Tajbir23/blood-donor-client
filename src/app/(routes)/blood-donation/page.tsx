export const dynamic = 'force-static'; // Cache UI as static
export const revalidate = 86400;

import BloodDonation from "./Blood-donation"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'রক্তদান সেবা | LifeDrop - কুড়িগ্রাম জেলার সবচেয়ে বড় রক্তদান প্লাটফর্ম',
  description: 'রক্তদান করুন এবং জীবন বাঁচান। আমাদের প্লাটফর্মে রক্তদাতা হিসেবে রেজিস্ট্রেশন করুন অথবা জরুরি প্রয়োজনে রক্তের জন্য অনুরোধ করুন।',
  keywords: ['রক্তদান', 'ব্লাড ডোনেশন', 'কুড়িগ্রাম', 'রক্তদাতা', 'জীবন বাঁচান', 'রক্ত গ্রুপ'],
  openGraph: {
    title: 'রক্তদান সেবা | LifeDrop - কুড়িগ্রাম জেলার সবচেয়ে বড় রক্তদান প্লাটফর্ম',
    description: 'রক্তদান করুন এবং জীবন বাঁচান। আমাদের প্লাটফর্মে রক্তদাতা হিসেবে রেজিস্ট্রেশন করুন অথবা জরুরি প্রয়োজনে রক্তের জন্য অনুরোধ করুন।',
    type: 'website',
    images: [
      {
        url: '/hero-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LifeDrop রক্তদান সেবা',
      },
    ],
  },
}

const BloodDonationPage = () => {
  return (
    <div>
      <BloodDonation />
    </div>
  )
}
export default BloodDonationPage

