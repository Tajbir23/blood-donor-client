import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { defaultMetadata } from './config/metadata'
import './globals.css'
import Navbar from "@/components/home/Navbar/Navbar";
import EmergencyHeadline from "@/components/Emergency-headline/Emergency-headline";
import Footer from "@/components/layout/Footer";
import QueryProvider from "@/components/QueryProvider/QueryProvider";
import { Toaster } from "react-hot-toast";
import UpdateBloodDonationDate from '@/components/home/UpdateBloodDonationDate';
import BloodDonationModal from '@/components/modals/BloodDonationModal';
import { verifyJwt } from './actions/authentication';
import decodedJwtType from '@/lib/types/decodedJwtType';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = defaultMetadata

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get decoded user and ensure it's serializable
  const decodedUserRaw = await verifyJwt(false);
  // Serialize and parse to ensure we have a plain object
  const decodedUser = decodedUserRaw ? JSON.parse(JSON.stringify(decodedUserRaw)) : null;
  
  return (
    <html lang="bn" className="h-full">
      <body className={`${inter.className} h-full`}>
        <QueryProvider>
          <Navbar />
          <EmergencyHeadline />
          <UpdateBloodDonationDate Modal={BloodDonationModal} decodedUser={decodedUser as decodedJwtType} />
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
