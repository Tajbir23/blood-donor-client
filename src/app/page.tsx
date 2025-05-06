export const dynamic = 'force-static'; // Cache UI as static
export const revalidate = 86400;

import { Metadata } from 'next';
import CallToAction from '@/components/home/CallToAction';
import FindBlood from '@/components/home/FindBlood';
import Hero from '@/components/home/Hero/Hero';
import OurServices from '@/components/home/OurServices';
import RegularDonor from '@/components/home/RegularDonor';
import Script from 'next/script';

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'রক্তদান বাংলাদেশ | জীবন বাঁচাতে রক্ত দিন',
  description: 'বাংলাদেশের সকল জেলার রক্তদাতাদের সাথে সংযোগ স্থাপন করুন। জরুরি প্রয়োজনে দ্রুত ও নির্ভরযোগ্যভাবে রক্তের জন্য অনুরোধ করুন।',
  keywords: ['রক্তদান', 'বাংলাদেশ', 'blood donation', 'Bangladesh', 'blood donors', 'emergency blood', 'blood bank', 'রক্তদাতা', 'জরুরি রক্ত', 'রক্ত সংগ্রহ'],
  openGraph: {
    title: 'রক্তদান বাংলাদেশ | জীবন বাঁচাতে রক্ত দিন',
    description: 'বাংলাদেশের সকল জেলার রক্তদাতাদের সাথে সংযোগ স্থাপন করুন। জরুরি প্রয়োজনে দ্রুত ও নির্ভরযোগ্যভাবে রক্তের জন্য অনুরোধ করুন।',
    type: 'website',
    url: 'https://blood-donor-bangladesh.vercel.app',
    images: [
      {
        url: '/images/home-og.jpg',
        width: 1200,
        height: 630,
        alt: 'রক্তদান বাংলাদেশ হোম পেজ',
      },
    ],
  },
  alternates: {
    canonical: 'https://blood-donor-bangladesh.vercel.app',
  },
  other: {
    'google-site-verification': '4r6L_E636xBF3hU6OjXMUdfSnfTKiwofEtBSHhxMHRw'
  }
};

export default function Home() {
  return (
    <>
      <Script 
        id="schema-org-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "https://blood-donor-bangladesh.vercel.app",
            "name": "Blood Donor Bangladesh",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://blood-donor-bangladesh.vercel.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      {/* Hero Component */}
      <Hero />
      
      {/* Find Blood Component */}
      <FindBlood />
      
      {/* Our Services Component */}
      <OurServices />
      
      {/* Regular Donors Component */}
      <RegularDonor />
      
      {/* Call To Action Component */}
      <CallToAction />
    </>
  );
}
