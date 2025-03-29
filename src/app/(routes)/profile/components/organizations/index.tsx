import UserOrganizations from './UserOrganizations'
import { UserOrganization } from '../../types'

interface OrganizationsProps {
  userOrganizations: UserOrganization[]
}

const Organizations = ({ userOrganizations }: OrganizationsProps) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">প্রতিষ্ঠানসমূহ</h2>
        <p className="mt-1 text-sm text-gray-500">আপনার সাথে সম্পর্কিত প্রতিষ্ঠানগুলোর তালিকা</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <UserOrganizations userOrganizations={userOrganizations} />
      </div>
    </div>
  )
}

export default Organizations 