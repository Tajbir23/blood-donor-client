import Register from "./Register"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'রক্তদান রংপুর বিভাগে যোগ দিন | নিবন্ধন করুন',
  description: 'রংপুর বিভাগের সবচেয়ে বড় রক্তদান কমিউনিটিতে নিবন্ধন করুন। আপনি ব্যক্তিগতভাবে রক্তদাতা হিসেবে অথবা প্রতিষ্ঠান হিসেবে যোগ দিতে পারেন।',
  keywords: ['রক্তদান', 'রংপুর বিভাগ', 'রক্তদাতা নিবন্ধন', 'blood donation', 'Rangpur Division', 'donor registration'],
  alternates: {
    canonical: 'https://blooddonation-rangpur.com/register',
  },
  openGraph: {
    title: 'রক্তদান রংপুর বিভাগে যোগ দিন | নিবন্ধন করুন',
    description: 'রংপুর বিভাগের সবচেয়ে বড় রক্তদান কমিউনিটিতে নিবন্ধন করুন। ব্যক্তিগত বা প্রতিষ্ঠান হিসেবে যোগ দিন।',
    url: 'https://blooddonation-rangpur.com/register',
    siteName: 'রক্তদান রংপুর বিভাগ',
    images: [
      {
        url: '/images/register-og.jpg',
        width: 1200,
        height: 630,
        alt: 'রক্তদান রংপুর বিভাগ নিবন্ধন পেজ',
      }
    ],
    locale: 'bn_BD',
    type: 'website',
  },
}

const page = () => {
  return (
    <div>
      <Register />
    </div>
  )
}

export default page
