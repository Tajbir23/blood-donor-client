import { Metadata } from 'next'
import { Suspense } from 'react'
import { defaultMetadata } from '@/app/config/metadata'

export const metadata: Metadata = {
  ...defaultMetadata,
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-stone-50">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto"></div>
            <p className="mt-4 text-stone-500 text-sm">লোড হচ্ছে…</p>
          </div>
        </div>
      }>
        {children}
      </Suspense>
    </div>
  )
} 