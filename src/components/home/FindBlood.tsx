'use client'
import { useState } from "react"
import LocationSelector from "../ui/location-selector"
import { Search, Droplet } from "lucide-react"

const FindBlood = () => {
  const [formData, setFormData] = useState({
    divisionId: '',
    districtId: '',
    thanaId: '',
    latitude: '',
    longitude: '',
    bloodGroup: ''
  })

  const handleLocationChange = (type: string, value: string, latitude?: string, longitude?: string) => {
    setFormData({ ...formData, [type]: value, latitude: latitude || '', longitude: longitude || '' });
  }
  
  const handleBloodGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, bloodGroup: e.target.value });
  }
  
  return (
    <section className="relative py-12 px-6 bg-gradient-to-r from-red-50 to-white rounded-2xl shadow-lg border border-red-100 mb-16 mt-10 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-100 rounded-full opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600"></div>
      
      <div className="relative">
        <div className="flex items-center justify-center mb-8">
          <Droplet className="h-8 w-8 text-red-500 mr-3 animate-pulse" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            জরুরি <span className="text-red-600">রক্ত খুঁজুন</span>
          </h2>
        </div>
        
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <form className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
            <div className="md:col-span-2">
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-2">
                রক্তের গ্রুপ
              </label>
              <div className="relative">
                <select 
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleBloodGroupChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white appearance-none"
                >
                  <option value="">সকল রক্তের গ্রুপ</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-red-500 text-lg font-bold">
                    <Droplet className="h-5 w-5" />
                  </span>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-4">
              <LocationSelector 
                className="flex-1"
                onDivisionChange={(value) => handleLocationChange('divisionId', value)}
                onDistrictChange={(value) => handleLocationChange('districtId', value)}
                onThanaChange={(value, lat, lng) => handleLocationChange('thanaId', value, lat, lng)}
                defaultDivisionId={formData.divisionId}
                defaultDistrictId={formData.districtId}
                defaultThanaId={formData.thanaId}
              />
            </div>
            
            <div className="md:col-span-1">
              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium py-3 px-4 transition-all duration-300 shadow hover:shadow-lg transform hover:translate-y-[-2px] flex items-center justify-center"
              >
                <Search className="h-5 w-5 mr-2" />
                <span>খুঁজুন</span>
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>নিকটতম এলাকায় সহজেই রক্তদাতা খুঁজুন এবং জীবন বাঁচাতে সাহায্য করুন</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FindBlood
