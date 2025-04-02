import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaCalendarAlt, FaHospital, FaTint, FaUserShield, FaUsers } from 'react-icons/fa';
import organizationType from '@/lib/types/organizationType';

interface OrganizationsProps {
  userOrganizations: {
    count: number;
    organizations: organizationType[];
  };
  memberOforg: organizationType[];
}

const Organizations = ({ userOrganizations, memberOforg }: OrganizationsProps) => {
  // Function to render organization card to avoid duplicating code
  const renderOrganizationCard = (org: organizationType, isMember: boolean = false) => (
    <div key={org._id} className={`bg-white rounded-lg shadow-md overflow-hidden border ${isMember ? 'border-blue-100' : 'border-gray-100'} hover:shadow-lg transition-shadow`}>
      <div className="relative h-32 bg-gray-100">
        {org.logoImage && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${org.logoImage}`}
            alt={org.organizationName}
            fill
            className="object-cover object-center"
          />
        )}
        {!org.logoImage && (
          <div className="h-full flex items-center justify-center">
            <FaHospital className="text-6xl text-gray-300" />
          </div>
        )}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 ${isMember ? 'border-l-4 border-blue-500' : ''}`}>
          <h4 className="text-white font-semibold text-lg truncate">{org.organizationName}</h4>
        </div>
        
        {!org.isActive && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            অপেক্ষমান
          </div>
        )}
        {org.isBanned && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            বন্ধ করা হয়েছে
          </div>
        )}
        
        {isMember && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <FaUsers className="mr-1" size={10} />
            সদস্য
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
            {org.organizationType === 'hospital' && 'হাসপাতাল'}
            {org.organizationType === 'bloodBank' && 'ব্লাড ব্যাংক'}
            {org.organizationType === 'clinic' && 'ক্লিনিক'}
            {org.organizationType === 'ngo' && 'এনজিও'}
            {org.organizationType === 'volunteer' && 'স্বেচ্ছাসেবী সংগঠন'}
            {org.organizationType === 'other' && 'অন্যান্য'}
          </span>
          <span className="text-sm text-gray-500 flex items-center">
            <FaCalendarAlt className="mr-1 text-gray-400" size={12} />
            {org.establishmentYear}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-500 flex items-start">
            <FaMapMarkerAlt className="mr-2 mt-1 text-gray-400 shrink-0" />
            <span className="line-clamp-2">
              {org.address}
            </span>
          </p>
          
          <p className="text-sm text-gray-500 flex items-center">
            <FaPhone className="mr-2 text-gray-400 shrink-0" />
            <span>{org.phone}</span>
          </p>
          
          <p className="text-sm text-gray-500 flex items-center">
            <FaEnvelope className="mr-2 text-gray-400 shrink-0" />
            <span className="truncate max-w-[200px]">{org.email}</span>
          </p>
          
          {org.website && (
            <p className="text-sm text-gray-500 flex items-center">
              <FaGlobe className="mr-2 text-gray-400 shrink-0" />
              <a href={org.website} target="_blank" rel="noopener noreferrer" 
                 className="text-blue-500 hover:underline truncate max-w-[200px]">
                {org.website.replace(/^https?:\/\//, '')}
              </a>
            </p>
          )}
        </div>
        
        {org.hasBloodBank && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <FaTint className="text-red-500 mr-2" />
              <span className="text-sm font-medium">উপলব্ধ রক্তের গ্রুপ</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {org.availableBloodGroups && org.availableBloodGroups.map(group => (
                <span key={group} className="px-2 py-0.5 text-xs bg-red-50 text-red-600 rounded-full border border-red-100">
                  {group}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-4">
          <Link href={`/organizations/${org._id}`} 
                className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
            বিস্তারিত দেখুন
          </Link>
          
          {isMember ? (
            <Link href={`/organizations/${org._id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              সংস্থা পেইজ
            </Link>
          ) : (
            <Link href={`/organizations/${org._id}/dashboard`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              ড্যাশবোর্ড
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  // Content for when user has no organizations
  if ((!userOrganizations || !userOrganizations.organizations || userOrganizations.organizations.length === 0) && 
      (!memberOforg || memberOforg.length === 0)) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h3 className="text-xl font-medium text-gray-800 mb-4">আপনি কোন প্রতিষ্ঠানের সাথে যুক্ত নন</h3>
        <p className="text-gray-600 mb-4">আপনি নিজের প্রতিষ্ঠান যোগ করতে পারেন অথবা কোন প্রতিষ্ঠানে যোগদান করতে পারেন</p>
        <Link href="/organizations/register" className="inline-block bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
          নতুন প্রতিষ্ঠান যোগ করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* User's Organizations Section */}
      {userOrganizations && userOrganizations.organizations && userOrganizations.organizations.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaUserShield className="text-red-500 mr-2" />
              <h3 className="text-xl font-medium text-gray-800">আমার প্রতিষ্ঠানসমূহ ({userOrganizations.count})</h3>
            </div>
            <Link href="/organizations/register" className="inline-block bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm">
              নতুন প্রতিষ্ঠান যোগ করুন
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userOrganizations.organizations.map(org => renderOrganizationCard(org))}
          </div>
        </div>
      )}

      {/* Member Organizations Section */}
      {memberOforg && memberOforg.length > 0 && (
        <div className="space-y-6 mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center">
            <FaUsers className="text-blue-500 mr-2" />
            <h3 className="text-xl font-medium text-gray-800">সদস্য প্রতিষ্ঠানসমূহ ({memberOforg.length})</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {memberOforg.map(org => renderOrganizationCard(org, true))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Organizations; 