import type { Metadata } from 'next'
import SslCommerz from "./components/SslCommerz"

export const metadata: Metadata = {
  title: 'অনুদান করুন | রক্তদান কার্যক্রমে সাহায্য করুন',
  description: 'আপনার অর্থ অনুদানের মাধ্যমে রক্তদান কার্যক্রম পরিচালনা এবং জীবন বাঁচাতে সাহায্য করুন। নিরাপদ SSLCommerz পেমেন্ট সিস্টেম ব্যবহার করে অনুদান করুন।',
  keywords: 'রক্তদান অনুদান, অর্থ দান, রক্তদান সাহায্য, বাংলাদেশ, রক্ত সংগ্রহ, অনলাইন ডোনেশন',
  openGraph: {
    title: 'অনুদান করুন | রক্তদান কার্যক্রমে সাহায্য করুন',
    description: 'আপনার অর্থ অনুদানের মাধ্যমে রক্তদান কার্যক্রম পরিচালনা এবং জীবন বাঁচাতে সাহায্য করুন।',
    type: 'website',
    locale: 'bn_BD',
    url: 'https://your-domain.com/donation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'অর্থ অনুদান | রক্তদান কার্যক্রম সাহায্য',
    description: 'আপনার অনুদান রক্তদান কার্যক্রম পরিচালনা করতে সাহায্য করবে।',
  }
}

const DonationPage = () => {
  return (
    <div>
      <SslCommerz />
    </div>
  )
}

export default DonationPage
