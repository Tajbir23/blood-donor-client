import { FaPlusCircle } from 'react-icons/fa'
import Link from 'next/link'
import { UserOrganization } from '../../types'
import OrganizationCard from './OrganizationCard'

interface UserOrganizationsProps {
  userOrganizations: UserOrganization[]
}

const UserOrganizations = ({ userOrganizations }: UserOrganizationsProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">আমার প্রতিষ্ঠানসমূহ</h2>
        <Link 
          href="/organizations/register"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <FaPlusCircle className="mr-2" /> নতুন প্রতিষ্ঠান যোগ করুন
        </Link>
      </div>

      {userOrganizations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userOrganizations.map((userOrg, index) => (
            <OrganizationCard key={index} userOrganization={userOrg} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <FaPlusCircle className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">কোন প্রতিষ্ঠান যোগ করা হয়নি</h3>
          <p className="mt-2 text-sm text-gray-500">
            আপনি একটি হাসপাতাল, ক্লিনিক, ব্লাড ব্যাংক বা কোন সংগঠনের সাথে সম্পর্কিত? এখানে যোগ করুন।
          </p>
          <div className="mt-6">
            <Link
              href="/organizations/register"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              প্রতিষ্ঠান যোগ করুন
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserOrganizations 