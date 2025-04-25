export const dynamic = 'force-static'; // Cache UI as static
export const revalidate = 86400;

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'রক্ত অনুসন্ধান | রক্তদান রংপুর বিভাগ',
  description: 'রংপুর বিভাগের যেকোনো জেলায় রক্তের গ্রুপ অনুযায়ী রক্তদাতা খুঁজুন। জরুরি প্রয়োজনে দ্রুত রক্ত সংগ্রহের জন্য এখনই যোগাযোগ করুন।',
  keywords: ['রক্ত অনুসন্ধান', 'blood search', 'রক্তদাতা', 'রংপুর বিভাগ', 'blood donors', 'Rangpur Division'],
  alternates: {
    canonical: 'https://blooddonation-rangpur.com/find-blood',
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
              "name": "রক্তদান রংপুর বিভাগ",
              "url": "https://blooddonation-rangpur.com"
            },
            "areaServed": {
              "@type": "State",
              "name": "Rangpur Division"
            },
            "description": "রংপুর বিভাগের যেকোনো জেলায় রক্তের গ্রুপ অনুযায়ী রক্তদাতা খুঁজুন"
          })
        }}
      />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">রক্ত অনুসন্ধান</h1>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-lg mb-8">
            রংপুর বিভাগের যেকোনো জেলায় রক্তের গ্রুপ অনুযায়ী রক্তদাতা খুঁজুন।
          </p>
          
          {/* ... search form and results ... */}
        </div>
      </div>
    </>
  );
};

export default FindBloodPage; 