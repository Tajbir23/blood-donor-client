import { useRangpurDivision } from "@/hooks/useLocation";
import { useState } from "react";
import { FaTimes } from "react-icons/fa"
import { User } from "@/lib/types/userType";
import LocationInput from "@/components/LocationInput";
import LocationSelector from '@/components/ui/location-selector';

interface EditDetailsModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
  userProfile: User;
}

const EditDetailsModal = ({ setIsModalOpen, userProfile }: EditDetailsModalProps) => {
    const { division, loading: loadingDivision } = useRangpurDivision();
    const [formData, setFormData] = useState({
        fullName: userProfile.fullName,
        bloodGroup: userProfile.bloodGroup,
        phone: userProfile.phone,
        address: userProfile.address,
        divisionId: '',
        districtId: userProfile.districtId || '',
        thanaId: userProfile.thanaId || '',
        latitude: userProfile.latitude || 0,
        longitude: userProfile.longitude || 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleLocationChange = (location: { lat: number, lng: number }) => {
      setFormData(prev => ({ ...prev, latitude: location.lat, longitude: location.lng }));
    };

    const handleLocationSelectChange = (type: string, value: string) => {
        setFormData(prev => ({ ...prev, [type]: value }));
    };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">প্রোফাইল সম্পাদনা করুন</h3>
                      <button 
                        className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={() => setIsModalOpen(false)}
                        aria-label="Close modal"
                        title="Close"
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <div className="mt-4">
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">নাম</label>
                          <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            defaultValue={userProfile.fullName}
                          />
                        </div>
                        <div>
                          <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">রক্তের গ্রুপ</label>
                          <select
                            id="bloodGroup"
                            name="bloodGroup"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            defaultValue={userProfile.bloodGroup}
                          >
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">ফোন নম্বর</label>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            defaultValue={userProfile.phone}
                          />
                        </div>
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700">ঠিকানা</label>
                          <textarea
                            name="address"
                            id="address"
                            rows={3}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            defaultValue={userProfile.address}
                          />
                        </div>
                        <div className="my-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">অবস্থান</label>
                          <LocationSelector 
                            onDivisionChange={(value) => handleLocationSelectChange('divisionId', value)}
                            onDistrictChange={(value) => handleLocationSelectChange('districtId', value)}
                            onThanaChange={(value) => handleLocationSelectChange('thanaId', value)}
                            defaultDivisionId={formData.divisionId}
                            defaultDistrictId={formData.districtId}
                            defaultThanaId={formData.thanaId}
                          />
                        </div>
                        
                        <LocationInput
                            onLocationChange={handleLocationChange}
                            width="100%"
                            mapHeight="250px"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  সংরক্ষণ করুন
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  বাতিল করুন
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default EditDetailsModal
