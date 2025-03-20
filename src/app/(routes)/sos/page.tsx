import BloodRequestForm from "@/components/Blood-Request-Form/BloodRequestForm"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'জরুরী রক্তের জন্য অনুরোধ করুন | LifeDrop - কুড়িগ্রাম জেলার সবচেয়ে বড় রক্তদান প্লাটফর্ম',
  description: 'জরুরী রক্তের প্রয়োজন হলে আমাদের প্লাটফর্মে রক্তের জন্য অনুরোধ করুন। দ্রুত এবং সহজে রক্তদাতাদের সাথে যোগাযোগ করুন।',
  keywords: ['জরুরী রক্ত', 'রক্তের অনুরোধ', 'কুড়িগ্রাম', 'রক্তদাতা', 'জীবন বাঁচান', 'রক্ত গ্রুপ'],
  openGraph: {
    title: 'জরুরী রক্তের জন্য অনুরোধ করুন | LifeDrop - কুড়িগ্রাম জেলার সবচেয়ে বড় রক্তদান প্লাটফর্ম',
    description: 'জরুরী রক্তের প্রয়োজন হলে আমাদের প্লাটফর্মে রক্তের জন্য অনুরোধ করুন। দ্রুত এবং সহজে রক্তদাতাদের সাথে যোগাযোগ করুন।',
    type: 'website',
    images: [
      {
        url: '/hero-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LifeDrop জরুরী রক্তের অনুরোধ',
      },
    ],
  },
}

const page = () => {
  return (
    <div>
      <BloodRequestForm type="sos" title="জরুরী রক্তের জন্য অনুরোধ করুন" />
    </div>
  )
}

export default page
