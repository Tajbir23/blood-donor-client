'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/dashboard/organization_dashboard/Sidebar';
interface OrganizationDashboardLayoutProps {
  children: ReactNode;
}

const OrganizationDashboardLayout = ({ children }: OrganizationDashboardLayoutProps) => {


  

  return (
    <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6 md:p-8 pb-20 md:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default OrganizationDashboardLayout;
