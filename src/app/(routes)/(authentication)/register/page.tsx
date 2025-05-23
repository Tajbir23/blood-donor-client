export const dynamic = 'force-static'; // Cache UI as static
export const revalidate = 86400;

import Register from "./Register"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "নিবন্ধন করুন | রক্তদান বাংলাদেশ",
  description: "বাংলাদেশের রক্তদান কমিউনিটিতে যোগ দিন। একটি অ্যাকাউন্ট তৈরি করুন এবং রক্তদান সেবা দিন বা গ্রহণ করুন।",
  keywords: "রক্তদান, বাংলাদেশ, নিবন্ধন, রেজিস্ট্রেশন, রক্তদাতা, ব্লাড ডোনেশন, blood donation, Bangladesh, registration",
  alternates: {
    canonical: 'https://blood-donor-bangladesh.vercel.app/register',
  },
  openGraph: {
    title: "নিবন্ধন করুন | রক্তদান বাংলাদেশ",
    description: "বাংলাদেশের রক্তদান কমিউনিটিতে যোগ দিন। আপনার অ্যাকাউন্ট তৈরি করুন।",
    url: 'https://blood-donor-bangladesh.vercel.app/register',
    siteName: 'রক্তদান বাংলাদেশ',
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "রক্তদান বাংলাদেশ",
      },
    ],
    locale: 'bn_BD',
    type: 'website',
  },
}

export default function RegisterPage() {
  return <Register />;
}
