'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRangpurDivision } from '@/hooks/useLocation';

const RegAsAssociation = () => {
  const { division, loading: loadingDivision } = useRangpurDivision();
  
  const [formData, setFormData] = useState({
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
    districtId: '',
    thanaId: '',
    address: '',
    
    // প্রতিনিধির তথ্য
    representativeName: '',
    representativePosition: '',
    representativePhone: '',
    representativeEmail: '',
    
    // সেবা সম্পর্কিত তথ্য
    hasBloodBank: false,
    providesEmergencyBlood: false,
    availableBloodGroups: [] as string[],
    
    // লোগো/ছবি
    logoImage: null as File | null,
    logoImageUrl: '',
    
    // অ্যাকাউন্ট নিরাপত্তা
    password: '',
    confirmPassword: '',
    
    // শর্তাবলী
    agreedToTerms: true
  });

  const [thanas, setThanas] = useState<Array<{id: string, name: string}>>([]);
  
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
            availableBloodGroups: [...prev.availableBloodGroups, bloodGroup]
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            availableBloodGroups: prev.availableBloodGroups.filter(group => group !== bloodGroup)
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
      const district = division.districts.find(d => d.id === value);
      if (district) {
        setThanas(district.thanas);
        setFormData(prev => ({ ...prev, thanaId: '' }));
      } else {
        setThanas([]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation and submission logic
    console.log(formData);
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="districtId" className="block text-sm font-medium text-gray-700 mb-1">জেলা</label>
              <select 
                id="districtId"
                name="districtId"
                value={formData.districtId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
                disabled={loadingDivision}
              >
                <option value="">জেলা নির্বাচন করুন</option>
                {division?.districts.map(district => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
              {loadingDivision && (
                <p className="text-sm text-gray-500 mt-1">লোড হচ্ছে...</p>
              )}
            </div>
            
            <div>
              <label htmlFor="thanaId" className="block text-sm font-medium text-gray-700 mb-1">থানা/উপজেলা</label>
              <select 
                id="thanaId"
                name="thanaId"
                value={formData.thanaId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
                disabled={!formData.districtId || thanas.length === 0}
              >
                <option value="">থানা নির্বাচন করুন</option>
                {thanas.map(thana => (
                  <option key={thana.id} value={thana.id}>
                    {thana.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
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
                        checked={formData.availableBloodGroups.includes(group)}
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
          
          <div>
            <label htmlFor="logoImage" className="block text-sm font-medium text-gray-700 mb-1">লোগো আপলোড করুন</label>
            <input 
              type="file" 
              id="logoImage"
              name="logoImage"
              onChange={handleChange}
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <p className="text-xs text-gray-500 mt-1">সর্বোচ্চ ফাইল সাইজ: 2MB (JPG, PNG)</p>
          </div>
        </div>
        
        {/* পাসওয়ার্ড */}
        <div className="border-l-4 border-red-500 pl-4 pb-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">অ্যাকাউন্ট নিরাপত্তা</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
              <input 
                type="password" 
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
                minLength={6}
              />
              <p className="text-xs text-gray-500 mt-1">ন্যূনতম ৬ অক্ষরের পাসওয়ার্ড দিন</p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
              <input 
                type="password" 
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
          </div>
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
            disabled={!formData.agreedToTerms}
          >
            প্রতিষ্ঠান নিবন্ধন করুন
          </button>
          
          <p className="text-center text-gray-600">
            ইতিমধ্যে একাউন্ট আছে? <Link href="/login" className="text-red-600 hover:underline">লগইন করুন</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegAsAssociation;
