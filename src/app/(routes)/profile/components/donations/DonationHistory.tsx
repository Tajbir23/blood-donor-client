import { User } from '@/lib/types/userType'
import { Donation } from '../../types'

interface DonationHistoryProps {
  userProfile: User;
  donationHistory: Donation[];
}

const DonationHistory = ({ userProfile, donationHistory }: DonationHistoryProps) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">রক্তদানের ইতিহাস</h2>
        <p className="mt-1 text-sm text-gray-500">আপনার সর্বশেষ রক্তদান: {userProfile.lastDonationDate}</p>
      </div>
      <div className="border-t border-gray-200">
        {donationHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    তারিখ
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    স্থান
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    গ্রহণকারী
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    রক্তের গ্রুপ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donationHistory.map((donation, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.recipient}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        {donation.bloodGroup}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-4 py-5 text-center">
            <p className="text-gray-500">এখনো কোন রক্তদান করা হয়নি।</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DonationHistory 