import { Metadata } from 'next';
import Blogs from '@/components/home/Blogs';
import CallToAction from '@/components/home/CallToAction';
import FindBlood from '@/components/home/FindBlood';
import Hero from '@/components/home/Hero/Hero';
import OurServices from '@/components/home/OurServices';
import RegularDonor from '@/components/home/RegularDonor';

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'রক্তদান রংপুর বিভাগ | জীবন বাঁচাতে রক্ত দিন',
  description: 'রংপুর বিভাগের সকল জেলার রক্তদাতাদের সাথে সংযোগ স্থাপন করুন। জরুরি প্রয়োজনে দ্রুত ও নির্ভরযোগ্যভাবে রক্তের জন্য অনুরোধ করুন।',
  keywords: ['রক্তদান', 'রংপুর বিভাগ', 'blood donation', 'Rangpur Division', 'blood donors', 'emergency blood', 'blood bank', 'রক্তদাতা', 'জরুরি রক্ত', 'রক্ত সংগ্রহ'],
  openGraph: {
    title: 'রক্তদান রংপুর বিভাগ | জীবন বাঁচাতে রক্ত দিন',
    description: 'রংপুর বিভাগের সকল জেলার রক্তদাতাদের সাথে সংযোগ স্থাপন করুন। জরুরি প্রয়োজনে দ্রুত ও নির্ভরযোগ্যভাবে রক্তের জন্য অনুরোধ করুন।',
    type: 'website',
    url: 'https://blooddonation-rangpur.com',
    images: [
      {
        url: '/images/home-og.jpg',
        width: 1200,
        height: 630,
        alt: 'রক্তদান রংপুর বিভাগ হোম পেজ',
      },
    ],
  },
  alternates: {
    canonical: 'https://blooddonation-rangpur.com',
  },
  other: {
    'google-site-verification': '4r6L_E636xBF3hU6OjXMUdfSnfTKiwofEtBSHhxMHRw'
  }
};

export default function Home() {
  return (
    <main>
      {/* Schema.org structured data for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "রক্তদান রংপুর বিভাগ",
            "url": "https://blooddonation-rangpur.com",
            "logo": "https://blooddonation-rangpur.com/logo.png",
            "description": "রংপুর বিভাগের সবচেয়ে বড় রক্তদাতা নেটওয়ার্ক",
            "sameAs": [
              "https://facebook.com/blooddonationrangpur",
              "https://twitter.com/rangpurblooddonation",
              "https://instagram.com/blooddonationrangpur"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Rangpur Division",
              "addressCountry": "Bangladesh"
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
      
      {/* Blogs Component */}
      <Blogs />
    </main>
  );
}
