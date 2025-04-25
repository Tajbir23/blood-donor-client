'use client'

import { useState } from 'react'
import { FaUsers, FaTint, FaHospital } from 'react-icons/fa'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import { useQuery } from '@tanstack/react-query'
import { getDashboardData } from '@/app/actions/administrator/system/dashboardAction'
import Link from 'next/link'
import Image from 'next/image'

// TypeScript interfaces
interface DonationRecord {
  _id: string;
  donationDate: string;
  recipient: string;
  recipientName: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface BloodInventoryItem {
  bloodGroup: string;
  units: number;
  status: string;
}

interface FormattedDonation {
  id: string;
  donor: string;
  bloodGroup: string;
  date: string;
  location: string;
}

interface TopOrganization {
  _id: string;
  organizationName: string;
  organizationType: string;
  description: string;
  logoImage: string;
  memberCount: number;
  donations: number;
  rating: number;
}

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7days')

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', timeRange],
    queryFn: async () => await getDashboardData(timeRange),
    staleTime: 1000 * 60 * 60 * 24
  })

  // Format recent donations for display
  const formatRecentDonations = () => {
    if (!data?.recentDonations || data.recentDonations.length === 0) return []
    
    return data.recentDonations.map((donation: DonationRecord) => {
      // Format the date
      const date = new Date(donation.donationDate)
      const formattedDate = new Intl.DateTimeFormat('bn-BD', {
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
      }).format(date)
      
      // Determine location based on recipient type
      const location = donation.recipient === 'hospital' 
        ? donation.recipientName !== 'উল্লেখ নেই' ? donation.recipientName : 'হাসপাতাল'
        : 'ব্যক্তিগত'
      
      // For demonstration, assign blood groups based on index
      // In a real app, this would come from user data
      const bloodGroups = ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-']
      const bloodGroup = bloodGroups[Math.floor(Math.random() * 4)]
      
      return {
        id: donation._id.substring(0, 8),
        donor: 'রক্তদাতা', // Placeholder as donor name isn't in the donation record
        bloodGroup,
        date: formattedDate,
        location
      }
    })
  }

  // Skeleton loading component
  const SkeletonLoading = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
      
      {/* Stats Overview Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="rounded-full bg-gray-200 p-3 mr-4 h-12 w-12 animate-pulse"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
          <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
        </div>
      </div>
      
      {/* Additional Skeleton Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="mt-2 h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
                  <div className="mt-1 h-3 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-start">
                  <div className="rounded-full h-8 w-8 bg-gray-200 mr-3 animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-1 animate-pulse"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (isLoading) {
    return <SkeletonLoading />
  }

  // Extract data from API response
  const stats = {
    totalDonors: data?.statistics?.totalDonors || 0,
    activeDonors: data?.statistics?.totalActiveDonors || 0,
    totalDonations: data?.statistics?.totalDonationCount || 0,
    thisMonthDonations: data?.statistics?.thisMonthDonations || 0,
    organizations: data?.totalOrganizations || 0,
  }

  // Blood inventory data
  const bloodInventory = data?.bloodInventory?.inventory || []

  // Data for blood type distribution chart
  const bloodDistributionData = {
    labels: data?.bloodInventory?.bloodDistributionData?.labels || [],
    datasets: [
      {
        data: data?.bloodInventory?.bloodDistributionData?.data || [],
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
        ],
        borderWidth: 1,
      },
    ],
  }

  // Data for donations chart
  const donationsChartData = {
    labels: data?.donationsChartData?.labels || [],
    datasets: [
      {
        label: 'রক্তদান সংখ্যা',
        data: data?.donationsChartData?.data || [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  // Recent donations
  const recentDonations = formatRecentDonations()

  // Top organizations from API
  const topOrganizations = data?.topOrgs?.map((org: TopOrganization) => ({
    _id: org._id,
    name: org.organizationName,
    type: org.organizationType === 'volunteer' ? 'স্বেচ্ছাসেবী' : 'হাসপাতাল',
    description: org.description || 'কোন বিবরণ নেই',
    logo: `${org.logoImage}` || '/placeholder-logo.png',
  })) || [];

  // Add placeholder data if no organizations
  if (topOrganizations.length === 0) {
    topOrganizations.push({
      name: 'রক্তদান সমিতি রংপুর',
      type: 'স্বেচ্ছাসেবী',
      description: 'রক্তদান সেবা প্রদানকারী সংগঠন',
      logo: '/placeholder-logo.png',
    });
  }

    return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">ড্যাশবোর্ড</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-red-100 p-3 mr-4">
            <FaUsers className="text-red-600 text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">মোট রক্তদাতা</p>
            <p className="text-2xl font-bold text-gray-800">{stats.totalDonors}</p>
            <p className="text-xs text-green-600">সক্রিয়: {stats.activeDonors}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <FaTint className="text-blue-600 text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">মোট রক্তদান</p>
            <p className="text-2xl font-bold text-gray-800">{stats.totalDonations}</p>
            <p className="text-xs text-green-600">এই মাসে: {stats.thisMonthDonations}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <FaHospital className="text-purple-600 text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">সংগঠন</p>
            <p className="text-2xl font-bold text-gray-800">{stats.organizations}</p>
            <p className="text-xs text-gray-500">সক্রিয় সংগঠন</p>
          </div>
        </div>
      </div>
      
      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Blood Distribution Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">রক্তদাতা বিতরণ</h2>
          <div className="h-64">
            <Doughnut 
              data={bloodDistributionData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  }
                }
              }} 
            />
          </div>
        </div>
        
        {/* Donations Chart */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">রক্তদান সংখ্যা</h2>
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === '7days' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setTimeRange('7days')}
              >
                ৭ দিন
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === '6months' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setTimeRange('6months')}
              >
                ৬ মাস
              </button>
            </div>
          </div>
          <div className="h-64">
            <Bar 
              data={donationsChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                }
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Blood Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
        {/* Blood Inventory */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">রক্তের মজুদ</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-4 gap-4">
              {bloodInventory.map((item: BloodInventoryItem) => (
                <div key={item.bloodGroup} className="text-center">
                  <div className={`
                    w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold
                    ${item.status === 'critical' ? 'bg-red-500' : 
                      item.status === 'low' ? 'bg-orange-500' : 
                      item.status === 'medium' ? 'bg-amber-500' : 'bg-green-500'}
                  `}>
                    {item.bloodGroup}
                  </div>
                  <p className="mt-2 font-semibold">{item.units} ইউনিট</p>
                  <p className="text-xs text-gray-500">
                    {item.status === 'critical' ? 'সংকটজনক' : 
                     item.status === 'low' ? 'কম' : 
                     item.status === 'medium' ? 'মধ্যম' : 'পর্যাপ্ত'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Donations & Top Organizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Donations */}
        <div className="bg-white rounded-lg shadow overflow-hidden lg:col-span-2">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">সাম্প্রতিক রক্তদান</h2>
          </div>
          {recentDonations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">আইডি</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">রক্তদাতা</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">রক্তের গ্রুপ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">তারিখ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">স্থান</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentDonations.map((donation: FormattedDonation, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{donation.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.donor}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          {donation.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center">
              <p className="text-gray-500">কোন রক্তদান রেকর্ড পাওয়া যায়নি</p>
            </div>
          )}
        </div>
        
        {/* Top Organizations */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">শীর্ষ সংগঠন</h2>
          </div>
          <div className="p-6">
            <div className="grid gap-4">
              {topOrganizations.map((org: { _id: string, name: string, type: string, description: string, logo: string }, index: number) => (
                <div key={index} className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 mr-3">
                      {org.logo && <Image height={100} width={100} src={org.logo} alt={org.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm truncate">{org.name}</h3>
                      <span className="inline-block px-1.5 py-0.5 text-xs bg-red-50 text-red-600 rounded-full">{org.type}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 mb-2 line-clamp-1">{org.description}</p>
                  <Link 
                    href={`/organizations/${org._id}`} 
                    className="inline-flex items-center text-xs font-medium text-red-600 hover:text-red-800"
                  >
                    বিস্তারিত
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard