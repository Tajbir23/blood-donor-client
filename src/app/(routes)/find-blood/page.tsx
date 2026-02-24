export const dynamic = 'force-static'; // Cache UI as static
export const revalidate = 86400;

import { Metadata } from 'next';
import DonateBlood from '@/components/Blood-donation/Donate-blood/DonateBlood';

export const metadata: Metadata = {
  title: 'রক্ত অনুসন্ধান | LifeDrop',
  description: 'বাংলাদেশের যেকোনো জেলায় রক্তের গ্রুপ অনুযায়ী রক্তদাতা খুঁজুন। জরুরি প্রয়োজনে দ্রুত রক্ত সংগ্রহের জন্য এখনই যোগাযোগ করুন।',
  keywords: ['রক্ত অনুসন্ধান', 'blood search', 'রক্তদাতা', 'বাংলাদেশ', 'blood donors', 'Bangladesh'],
  alternates: {
    canonical: 'https://blood-donor-bangladesh.vercel.app/blood-donation',
  },
};

const FindBloodPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Blood Donor Search',
            provider: {
              '@type': 'Organization',
              name: 'LifeDrop',
              url: 'https://blood-donor-bangladesh.vercel.app',
            },
            areaServed: { '@type': 'Country', name: 'Bangladesh' },
            description: 'বাংলাদেশের যেকোনো জেলায় রক্তের গ্রুপ অনুযায়ী রক্তদাতা খুঁজুন',
          })
        }}
      />
      <DonateBlood />
    </>
  );
};

export default FindBloodPage;