export const dynamic = 'force-static'; // Cache UI as static
export const revalidate = 86400;

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'রক্ত অনুসন্ধান | রক্তদান বাংলাদেশ',
  description: 'বাংলাদেশের যেকোনো জেলায় রক্তের গ্রুপ অনুযায়ী রক্তদাতা খুঁজুন। জরুরি প্রয়োজনে দ্রুত রক্ত সংগ্রহের জন্য এখনই যোগাযোগ করুন।',
  keywords: ['রক্ত অনুসন্ধান', 'blood search', 'রক্তদাতা', 'বাংলাদেশ', 'blood donors', 'Bangladesh'],
  alternates: {
    canonical: 'https://blood-donor-bangladesh.vercel.app/blood-donation',
  },
};

const FindBloodPage = () => {
  return (
    <>
      {/* Schema.org structured data for Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Blood Donor Search",
            "provider": {
              "@type": "Organization",
              "name": "রক্তদান বাংলাদেশ",
              "url": "https://blood-donor-bangladesh.vercel.app"
            },
            "areaServed": {
              "@type": "State",
              "name": "Bangladesh"
            },
            "description": "বাংলাদেশের যেকোনো জেলায় রক্তের গ্রুপ অনুযায়ী রক্তদাতা খুঁজুন"
          })
        }}
      />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">রক্ত অনুসন্ধান</h1>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-lg mb-8">
            বাংলাদেশের যেকোনো জেলায় রক্তের গ্রুপ অনুযায়ী রক্তদাতা খুঁজুন।
          </p>
          
          {/* ... search form and results ... */}
        </div>
      </div>
    </>
  );
};

export default FindBloodPage; 