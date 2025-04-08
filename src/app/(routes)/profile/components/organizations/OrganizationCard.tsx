import Image from 'next/image'
import Link from 'next/link'
import { FaBuilding, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUserTie } from 'react-icons/fa'
import { UserOrganization } from '../../types'

interface OrganizationCardProps {
  userOrganization: UserOrganization
}

const OrganizationCard = ({ userOrganization }: OrganizationCardProps) => {
  const { organization, role, joinedAt } = userOrganization
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 h-16 flex items-center justify-center">
        <div className="relative h-24 w-24 rounded-full border-4 border-white overflow-hidden bg-white -mb-16">
          {organization.logoImageUrl ? (
            <Image 
              src={organization.logoImageUrl} 
              alt={organization.organizationName}
              fill
              className="object-contain p-1"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-100">
              <FaBuilding className="text-3xl text-gray-400" />
            </div>
          )}
        </div>
      </div>
      
      <div className="pt-16 px-4 pb-4">
        <h3 className="text-lg font-medium text-center text-gray-900 mb-2">
          {organization.organizationName}
        </h3>
        
        <div className="flex items-center justify-center text-sm text-gray-500 mb-3">
          <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
            {role}
          </span>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-1 text-gray-400" />
            <span>যোগদান: {joinedAt}</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-start">
            <FaMapMarkerAlt className="mt-1 mr-2 text-gray-400" />
            <span className="text-gray-600">{organization.address}</span>
          </div>
          <div className="flex items-center">
            <FaPhone className="mr-2 text-gray-400" />
            <span className="text-gray-600">{organization.phone}</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2 text-gray-400" />
            <span className="text-gray-600">{organization.email}</span>
          </div>
          {organization.representativeName && (
            <div className="flex items-center">
              <FaUserTie className="mr-2 text-gray-400" />
              <span className="text-gray-600">{organization.representativeName} ({organization.representativePosition})</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-between">
          {organization.hasBloodBank && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ব্লাড ব্যাংক
            </span>
          )}
          {organization.providesEmergencyBlood && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              জরুরি রক্ত
            </span>
          )}
        </div>
        
        <div className="mt-4">
          <Link 
            href={`/organization/${organization._id}`}
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            বিস্তারিত দেখুন
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrganizationCard 