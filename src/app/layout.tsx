export const dynamic = 'force-dynamic'; // Cache UI as static
export const revalidate = 86400;

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = defaultMetadata
export { viewport }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get decoded user and ensure it's serializable
  
  return (
    <html lang="bn" className="h-full">
      <head>
        {/* Google Analytics Script */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-ZJ4DF1GY9H" 
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZJ4DF1GY9H', { 'debug_mode': true });
          `}
        </Script>
      </head>
      <body className={`${inter.className} h-full`}>
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
                background: '#333',
                color: '#fff',
              },
              success: {
                duration: 3000,
              },
              error: {
                duration: 4000,
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  )
}
