import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { defaultMetadata } from './config/metadata'
import './globals.css'
import Navbar from "@/components/home/Navbar/Navbar";
import EmergencyHeadline from "@/components/Emergency-headline/Emergency-headline";
import Footer from "@/components/layout/Footer";
import QueryProvider from "@/components/QueryProvider/QueryProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn" className="h-full">
      <body className={`${inter.className} h-full`}>
        <QueryProvider>
          <Navbar />
          <EmergencyHeadline />
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
