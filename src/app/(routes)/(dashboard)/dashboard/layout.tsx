import React from 'react'
import { Metadata } from 'next'
import Sidebar from '@/components/dashboard/dashboard/Sidebar'

export const metadata: Metadata = {
  title: 'Dashboard | রক্তদান বাংলাদেশ',
  description: 'System dashboard for রক্তদান বাংলাদেশ platform'
}

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  
  return (
    <div className=" bg-gray-50">
      <div>
        <div className="bg-white rounded-lg shadow-md p-6 lg:flex lg:flex-row lg:gap-4">
          <Sidebar />
          <div className="lg:m-5 lg:p-5 lg:border-l lg:border-gray-200 lg:flex-1 lg:overflow-hidden lg:shadow-md lg:shadow-gray-200 lg:rounded-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout