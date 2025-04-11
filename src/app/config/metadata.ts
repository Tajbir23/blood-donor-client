import { Metadata } from 'next'

const defaultMetadata: Metadata = {
  metadataBase: new URL('https://blood-donor-rangpur.vercel.app'),
  title: {
    default: 'রক্তদান রংপুর বিভাগ',
    template: '%s | রক্তদান রংপুর বিভাগ'
  },
  description: 'রংপুর বিভাগের রক্তদান কমিউনিটিতে যোগ দিন। রক্তদাতা খুঁজুন, রক্তদান করুন, জীবন বাঁচান।',
  keywords: [
    'রক্তদান',
    'রংপুর',
    'ব্লাড ডোনেশন',
    'রক্তদাতা',
    'রক্তদান সেবা',
    'blood donation',
    'rangpur',
    'blood donor',
    'blood bank',
    'bangladesh'
  ],
  authors: [{ name: 'রক্তদান রংপুর বিভাগ' }],
  creator: 'রক্তদান রংপুর বিভাগ',
  publisher: 'রক্তদান রংপুর বিভাগ',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    siteName: 'রক্তদান রংপুর বিভাগ',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'রক্তদান রংপুর বিভাগ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'রক্তদান রংপুর বিভাগ',
    description: 'রংপুর বিভাগের রক্তদান কমিউনিটিতে যোগ দিন। রক্তদাতা খুঁজুন, রক্তদান করুন, জীবন বাঁচান।',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '4r6L_E636xBF3hU6OjXMUdfSnfTKiwofEtBSHhxMHRw',
  },
  alternates: {
    canonical: 'https://blood-donor-rangpur.vercel.app',
  },
}

export function generateMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string
  description: string
  path: string
  noIndex?: boolean
}): Metadata {
  const url = `https://blood-donor-rangpur.vercel.app${path}`
  
  return {
    ...defaultMetadata,
    title,
    description,
    robots: noIndex ? { index: false, follow: false } : defaultMetadata.robots,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  }
}

export { defaultMetadata } 