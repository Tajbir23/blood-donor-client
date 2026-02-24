export const dynamic = 'force-dynamic';

import type { Metadata } from 'next'
import { Hind_Siliguri, Noto_Serif_Bengali } from 'next/font/google'
import { defaultMetadata } from './config/metadata'
import { viewport } from './viewport'
import './globals.css'
import Navbar from "@/components/home/Navbar/Navbar";
import EmergencyHeadline from "@/components/Emergency-headline/Emergency-headline";
import Footer from "@/components/layout/Footer";
import QueryProvider from "@/components/QueryProvider/QueryProvider";
import { Toaster } from "react-hot-toast";
import UpdateBloodDonationDate from '@/components/home/UpdateBloodDonationDate';
import BloodDonationModal from '@/components/modals/BloodDonationModal';
import Script from 'next/script'

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = defaultMetadata
export { viewport }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn" className={`h-full ${hindSiliguri.variable} ${notoSerifBengali.variable}`}>
      <head>
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-ZJ4DF1GY9H" 
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZJ4DF1GY9H');
          `}
        </Script>
      </head>
      <body className="font-sans h-full bg-stone-50 text-stone-900 antialiased">
        <QueryProvider>
          <Navbar />
          <EmergencyHeadline />
          <UpdateBloodDonationDate Modal={BloodDonationModal} />
          {children}
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1C1917',
                color: '#fff',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
              },
              success: { duration: 3000 },
              error: { duration: 4000 },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  )
}
