import { FaCog } from 'react-icons/fa'

const AccountActionsSection = () => {
  return (
    <div>
      <h3 className="text-md font-medium text-gray-900 flex items-center">
        <FaCog className="mr-2 text-gray-400" /> অ্যাকাউন্ট অ্যাকশন
      </h3>
      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100">
          <span className="text-sm text-gray-600">ডাটা ডাউনলোড করুন</span>
          <span className="text-red-600">→</span>
        </button>
        <button className="flex justify-between items-center px-4 py-3 bg-red-50 rounded-lg hover:bg-red-100">
          <span className="text-sm text-red-600">অ্যাকাউন্ট ডিলিট করুন</span>
          <span className="text-red-600">→</span>
        </button>
      </div>
    </div>
  )
}

export default AccountActionsSection 