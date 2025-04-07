'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRangpurDivision } from '@/hooks/useLocation';
import { UploadImage } from '@/app/libs';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@/lib/types/userType';
import useRegisterOrganization from '@/app/hooks/useRegisterOrganization';
import organizationType from '@/lib/types/organizationType';
import LocationSelector from '@/components/ui/location-selector';


interface UserQueryData {
  success: boolean;
  user: User;
}

const RegisterOrg = () => {
  const { division } = useRangpurDivision();
  const {mutate: registerOrganization, isPending} = useRegisterOrganization()
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<organizationType>({
    // প্রতিষ্ঠান সম্পর্কিত তথ্য
    organizationName: '',
    organizationType: '',
    establishmentYear: '',
    registrationNumber: '',
    website: '',
    description: '',
    
    // যোগাযোগের তথ্য
    email: '',
    phone: '',
    
    // ঠিকানার তথ্য
    divisionId: '',
    districtId: '',
    thanaId: '',
    address: '',
    
    // প্রতিনিধির তথ্য
    representativeName: '',
    representativePosition: 'owner',
    representativePhone: '',
    representativeEmail: '',
    
    // সেবা সম্পর্কিত তথ্য
    hasBloodBank: true,
    providesEmergencyBlood: true,
    availableBloodGroups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as string[],
    
    // লোগো/ছবি
    logoImage: null as File | null,
    logoImageUrl: '',
    
    
    // শর্তাবলী
    agreedToTerms: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = queryClient.getQueryData<UserQueryData>(['user']);
      if(user){
        setFormData(prev => ({ ...prev, representativeName: user.user.fullName, representativeEmail: user.user.email, representativePhone: user.user.phone }));
      }
    }, 1000);
    return () => clearTimeout(timer);
  },[queryClient]);
  
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      if (name === 'availableBloodGroups') {
        const bloodGroup = target.value;
        if (target.checked) {
          setFormData(prev => ({
            ...prev,
            availableBloodGroups: [...(prev.availableBloodGroups || []), bloodGroup]
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            availableBloodGroups: (prev.availableBloodGroups || []).filter(group => group !== bloodGroup)
          }));
        }
      } else {
        setFormData(prev => ({ ...prev, [name]: target.checked }));
      }
    } else if (type === 'file') {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        setFormData(prev => ({ ...prev, [name]: target.files?.[0] }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Handle district selection to update thanas
    if (name === 'districtId' && division) {
      setFormData(prev => ({ ...prev, thanaId: '' }));
    }
  };

  const handleImageSelect = (file: File, previewUrl: string) => {
    setFormData(prev => ({ ...prev, logoImage: file, logoImageUrl: previewUrl }));
  };

  const handleLocationChange = (type: string, value: string) => {
    setFormData(prev => ({ ...prev, [type]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation and submission logic
    registerOrganization(formData)
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-6">প্রতিষ্ঠান/সংগঠন হিসেবে নিবন্ধন করুন</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* প্রতিষ্ঠান সম্পর্কিত তথ্য */}
        <div className="border-l-4 border-red-500 pl-4 pb-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">প্রতিষ্ঠান সম্পর্কিত তথ্য</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-1">প্রতিষ্ঠানের নাম</label>
              <input 
                type="text" 
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700 mb-1">প্রতিষ্ঠানের ধরন</label>
              <select 
                id="organizationType"
                name="organizationType"
                value={formData.organizationType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="">প্রতিষ্ঠানের ধরন নির্বাচন করুন</option>
                <option value="hospital">হাসপাতাল</option>
                <option value="bloodBank">ব্লাড ব্যাংক</option>
                <option value="clinic">ক্লিনিক</option>
                <option value="ngo">এনজিও</option>
                <option value="volunteer">স্বেচ্ছাসেবী সংগঠন</option>
                <option value="other">অন্যান্য</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="establishmentYear" className="block text-sm font-medium text-gray-700 mb-1">প্রতিষ্ঠার বছর</label>
              <input 
                type="number" 
                id="establishmentYear"
                name="establishmentYear"
                value={formData.establishmentYear}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()}
                placeholder="উদাহরণ: ২০১০"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            
            <div>
              <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">রেজিস্ট্রেশন নম্বর</label>
              <input 
                type="text" 
                id="registrationNumber"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="উদাহরণ: RJSC-123456"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">ওয়েবসাইট (যদি থাকে)</label>
              <input 
                type="url" 
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="www.example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">প্রতিষ্ঠানের সংক্ষিপ্ত বিবরণ</label>
              <textarea 
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="প্রতিষ্ঠানের উদ্দেশ্য, সেবা ইত্যাদি সম্পর্কে লিখুন..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* যোগাযোগের তথ্য */}
        <div className="border-l-4 border-red-500 pl-4 pb-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">যোগাযোগের তথ্য</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">প্রতিষ্ঠানের ফোন নম্বর</label>
              <input 
                type="tel" 
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="০১XXXXXXXXX"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">প্রতিষ্ঠানের ইমেইল</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="organization@example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
          </div>
        </div>
        
        {/* ঠিকানা */}
        <div className="border-l-4 border-red-500 pl-4 pb-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">প্রতিষ্ঠানের ঠিকানা</h3>
          
          <LocationSelector 
            onDivisionChange={(value) => handleLocationChange('divisionId', value)}
            onDistrictChange={(value) => handleLocationChange('districtId', value)}
            onThanaChange={(value) => handleLocationChange('thanaId', value)}
            defaultDivisionId={formData.divisionId}
            defaultDistrictId={formData.districtId}
            defaultThanaId={formData.thanaId}
          />
          
          <div className="mt-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">বিস্তারিত ঠিকানা</label>
            <textarea 
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            ></textarea>
          </div>
        </div>
        
        {/* প্রতিনিধির তথ্য */}
        <div className="border-l-4 border-red-500 pl-4 pb-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">প্রতিনিধির তথ্য</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="representativeName" className="block text-sm font-medium text-gray-700 mb-1">প্রতিনিধির নাম</label>
              <input 
                type="text" 
                id="representativeName"
                name="representativeName"
                value={formData.representativeName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="representativePosition" className="block text-sm font-medium text-gray-700 mb-1">পদবি</label>
              <input 
                type="text" 
                id="representativePosition"
                name="representativePosition"
                value={formData.representativePosition}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="representativePhone" className="block text-sm font-medium text-gray-700 mb-1">প্রতিনিধির ফোন নম্বর</label>
              <input 
                type="tel" 
                id="representativePhone"
                name="representativePhone"
                value={formData.representativePhone}
                onChange={handleChange}
                placeholder="০১XXXXXXXXX"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="representativeEmail" className="block text-sm font-medium text-gray-700 mb-1">প্রতিনিধির ইমেইল</label>
              <input 
                type="email" 
                id="representativeEmail"
                name="representativeEmail"
                value={formData.representativeEmail}
                onChange={handleChange}
                placeholder="representative@example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>
        
        {/* সেবা সম্পর্কিত তথ্য */}
        <div className="border-l-4 border-red-500 pl-4 pb-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">রক্ত সম্পর্কিত সেবাসমূহ</h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="hasBloodBank"
                name="hasBloodBank"
                checked={formData.hasBloodBank}
                onChange={handleChange}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="hasBloodBank" className="ml-2 block text-sm text-gray-700">
                প্রতিষ্ঠানে ব্লাড ব্যাংক আছে
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="providesEmergencyBlood"
                name="providesEmergencyBlood"
                checked={formData.providesEmergencyBlood}
                onChange={handleChange}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="providesEmergencyBlood" className="ml-2 block text-sm text-gray-700">
                জরুরি রক্তের চাহিদা পূরণ করা হয়
              </label>
            </div>
            
            {(formData.hasBloodBank || formData.providesEmergencyBlood) && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">উপলব্ধ রক্তের গ্রুপসমূহ</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2">
                  {bloodGroups.map(group => (
                    <div key={group} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`blood-${group}`}
                        name="availableBloodGroups"
                        value={group}
                        checked={(formData.availableBloodGroups || []).includes(group)}
                        onChange={handleChange}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`blood-${group}`} className="ml-2 block text-sm text-gray-700">
                        {group}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* লোগো */}
        <div className="border-l-4 border-red-500 pl-4 pb-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">প্রতিষ্ঠানের লোগো</h3>
          
          <UploadImage 
            onImageSelect={handleImageSelect}
          />
        </div>
        
        
        {/* শর্তাবলী */}
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="agreedToTerms"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="agreedToTerms" className="ml-2 block text-sm text-gray-700">
            আমি <Link href="/terms" className="text-red-600 hover:underline">শর্তাবলী</Link> ও <Link href="/privacy" className="text-red-600 hover:underline">গোপনীয়তা নীতি</Link> পড়েছি এবং সম্মত আছি
          </label>
        </div>
        
        <div className="flex flex-col gap-4">
          <button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            disabled={!formData.agreedToTerms || isPending}
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                প্রসেসিং হচ্ছে...
              </span>
            ) : (
              'প্রতিষ্ঠান নিবন্ধন করুন'
            )}
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default RegisterOrg;
