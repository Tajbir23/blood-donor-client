'use client'
import { useState } from "react"
import LocationSelector from "../ui/location-selector"
import { Search, Droplet, Phone, MapPin, User as UserIcon, Loader2 } from "lucide-react"
import { User } from "@/lib/types/userType";
import { findBloodDonors } from "@/app/actions/bloodDonation";


const FindBlood = () => {
  const [formData, setFormData] = useState({
    divisionId: '',
    districtId: '',
    thanaId: '',
    latitude: '',
    longitude: '',
    bloodGroup: ''
  })

  const [donors, setDonors] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleLocationChange = (type: string, value: string, latitude?: string, longitude?: string) => {
    setFormData({ ...formData, [type]: value, latitude: latitude || '', longitude: longitude || '' });
  }
  
  const handleBloodGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, bloodGroup: e.target.value });
  }
  
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setSearched(true)
    
    try {
      const data = await findBloodDonors(formData.latitude, formData.longitude, formData.bloodGroup)
      setDonors(data.donors || [])
    } catch (error) {
      console.error("Error finding blood donors:", error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className="relative py-8 sm:py-12 px-4 sm:px-6 bg-gradient-to-r from-red-50 to-white rounded-2xl shadow-lg border border-red-100 mb-8 sm:mb-16 mt-6 sm:mt-10 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-12 -right-12 w-24 sm:w-32 h-24 sm:h-32 bg-red-100 rounded-full opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600"></div>
      
      <div className="relative">
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <Droplet className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 mr-2 sm:mr-3 animate-pulse" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            জরুরি <span className="text-red-600">রক্ত খুঁজুন</span>
          </h2>
        </div>
        
        <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-7 items-end">
            <div className="md:col-span-2">
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                রক্তের গ্রুপ
              </label>
              <div className="relative">
                <select 
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleBloodGroupChange}
                  className="w-full p-2 sm:p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white appearance-none"
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
                
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white rounded-lg font-medium py-2 sm:py-3 px-3 sm:px-4 transition-all duration-300 shadow hover:shadow-lg transform hover:translate-y-[-2px] flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                    <span className="text-sm sm:text-base">খুঁজুন</span>
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-500">
            <p>নিকটতম এলাকায় সহজেই রক্তদাতা খুঁজুন এবং জীবন বাঁচাতে সাহায্য করুন</p>
          </div>
        </div>
        
        {/* Search Results Section */}
        {searched && (
          <div className="max-w-5xl mx-auto mt-6 sm:mt-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8 sm:py-12 bg-white rounded-xl shadow-md border border-gray-100">
                <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 animate-spin mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-600 font-medium">রক্তদাতা খোঁজা হচ্ছে...</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <div className="bg-red-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-red-100">
                  <h3 className="text-base sm:text-lg font-medium text-gray-800">
                    {donors.length > 0 
                      ? `${donors.length} জন রক্তদাতা পাওয়া গেছে`
                      : 'কোন রক্তদাতা পাওয়া যায়নি'}
                  </h3>
                </div>
                
                {donors.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {donors.map((donor, index) => (
                      <div key={index} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-150">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-2" />
                              <h4 className="text-sm sm:text-base font-medium text-gray-900">{donor.fullName}</h4>
                              <span className="ml-2 sm:ml-3 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                {donor.bloodGroup}
                              </span>
                            </div>
                            
                            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                              <div className="flex items-start">
                                <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mr-1.5 sm:mr-2 mt-0.5" />
                                <span>{donor.phone}</span>
                              </div>
                              
                              <div className="flex items-start">
                                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mr-1.5 sm:mr-2 mt-0.5" />
                                <span>{donor.address}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center justify-center bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mt-2 md:mt-0">
                            <span className="text-xl sm:text-2xl font-bold text-red-600">
                              {donor.distanceKm || '?'}
                            </span>
                            <span className="text-xs text-gray-500">কিলোমিটার</span>
                          </div>
                          
                          <a 
                            href={`tel:${donor.phone}`}
                            className="w-full md:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors duration-300 mt-2 md:mt-0"
                          >
                            <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                            কল করুন
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 sm:py-12 px-4 sm:px-6 text-center">
                    <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-red-50 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                      <Droplet className="h-6 w-6 sm:h-8 sm:w-8 text-red-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">কোন রক্তদাতা পাওয়া যায়নি</h3>
                    <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                      অনুগ্রহ করে ভিন্ন ব্লাড গ্রুপ বা স্থান নির্বাচন করে আবার চেষ্টা করুন।
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default FindBlood
