'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRangpurDivision } from '@/hooks/useLocation';
import LocationInput from '@/components/LocationInput';
import { UploadImage } from '@/app/libs';
import { useFingerprint } from '@/app/actions/fingerprint';
import { User } from '@/lib/types/userType';
import useRegisterAsUser from '@/app/hooks/useRegisterAsUser';
import { useRouter } from 'next/navigation';
import Loading from '@/app/libs/Loading';

const RegAsUser = () => {
  const router = useRouter()
  const {mutate: registerAsUser, isPending, data} = useRegisterAsUser()
  const { division, loading: loadingDivision } = useRangpurDivision();
  const { fingerprint } = useFingerprint();
  const [locationError, setLocationError] = useState<string>('');

  const [formData, setFormData] = useState<User>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    bloodGroup: '',
    gender: '',
    lastDonationDate: '',
    canDonate: true,
    districtId: '',
    thanaId: '',
    address: '',
    profileImage: null as File | null,
    profileImageUrl: '',
    latitude: 0,
    longitude: 0,
    agreedToTerms: true,
    fingerprint: {
      visitorId: '',
      userAgent: '',
      language: '',
      colorDepth: 0,
      deviceMemory: 0,
      hardwareConcurrency: 0,
      screenResolution: [0, 0],
      availableScreenResolution: [0, 0],
      timezoneOffset: 0,
      timezone: '',
      sessionStorage: false,
      localStorage: false,
      indexedDb: false,
      cpuClass: '',
      platform: '',
      plugins: [],
      canvas: '',
      webgl: '',
      webglVendorAndRenderer: '',
      adBlockUsed: false,
      fonts: [],
      audio: '',
      deviceId: '',
    }
  });

  // Update formData when fingerprint changes
  useEffect(() => {
    if (fingerprint) {
      setFormData(prev => ({
        ...prev,
        fingerprint
      }));
    }
  }, [fingerprint]);

  const [thanas, setThanas] = useState<Array<{id: string, name: string}>>([]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
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

  const handleLocationChange = (location: { lat: number, lng: number }) => {
    setFormData(prev => ({ ...prev, latitude: location.lat, longitude: location.lng }));
    if (location.lat !== 0 && location.lng !== 0) {
      setLocationError('');
    }
  };

  const handleImageSelect = (file: File, previewUrl: string) => {
    setFormData(prev => ({ 
      ...prev, 
      profileImage: file,
      profileImageUrl: previewUrl
    }));
  };

  const validateLocation = (): boolean => {
    if (formData.latitude === 0 || formData.longitude === 0) {
      setLocationError('অনুগ্রহ করে আপনার অবস্থান নির্বাচন করুন');
      return false;
    }
    return true;
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate location
    if (!validateLocation()) {
      // Scroll to location section
      document.getElementById('location-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    // Form validation and submission logic
     await registerAsUser(formData);
    if(data.success){
      router.push("/")
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-6">ব্যবহারকারী হিসেবে নিবন্ধন করুন</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ব্যক্তিগত তথ্য */}
        <div className="border-l-4 border-red-500 pl-4 pb-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">ব্যক্তিগত তথ্য</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">পূর্ণ নাম</label>
              <input 
                type="text" 
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">জন্ম তারিখ</label>
              <input 
                type="date" 
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">লিঙ্গ</label>
              <select 
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="">নির্বাচন করুন</option>
                <option value="male">পুরুষ</option>
                <option value="female">মহিলা</option>
                <option value="other">অন্যান্য</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">রক্তের গ্রুপ</label>
              <select 
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="">ব্লাড গ্রুপ বাছাই করুন</option>
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
          </div>
          
          <div className="mt-4">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="canDonate"
                name="canDonate"
                checked={formData.canDonate}
                onChange={handleChange}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="canDonate" className="ml-2 block text-sm text-gray-700">
                আমি রক্তদাতা হিসেবে নিবন্ধন করতে চাই
              </label>
            </div>
            
            {formData.canDonate && (
              <div className="mt-3">
                <label htmlFor="lastDonationDate" className="block text-sm font-medium text-gray-700 mb-1">সর্বশেষ রক্তদানের তারিখ (জানা থাকলে)</label>
                <input 
                  type="date" 
                  id="lastDonationDate"
                  name="lastDonationDate"
                  value={formData.lastDonationDate}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            )}
          </div>
        </div>
        
        {/* যোগাযোগের তথ্য */}
        <div className="border-l-4 border-red-500 pl-4 pb-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">যোগাযোগের তথ্য</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">মোবাইল নম্বর</label>
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">ইমেইল (ঐচ্ছিক)</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>
        
        {/* ঠিকানা */}
        <div className="border-l-4 border-red-500 pl-4 pb-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">ঠিকানা</h3>
          
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
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* প্রোফাইল ছবি */}
        <div className="border-l-4 border-red-500 pl-4 pb-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">প্রোফাইল ছবি (ঐচ্ছিক)</h3>
          
          <div className="max-w-xs mx-auto">
            <UploadImage 
              onImageSelect={handleImageSelect}
              height="180px"
              width="180px"
              rounded={true}
              label="প্রোফাইল ছবি আপলোড করুন"
              className="mx-auto"
              maxSizeMB={2}
            />
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
        
        {/* Location Input */}
        <div id="location-section" className="border-l-4 border-red-500 pl-4 pb-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">অবস্থান (Location)</h3>
          <div className="space-y-4">
            <LocationInput
              onLocationChange={handleLocationChange}
              required={true}
              width="100%"
              mapHeight="250px"
            />
            {locationError && (
              <div className="text-red-500 text-sm mt-1">
                {locationError}
              </div>
            )}
            <p className="text-xs text-gray-500">
              আপনার সঠিক অবস্থান নির্বাচন করুন যাতে রক্তের প্রয়োজনে আপনাকে সহজে খুঁজে পাওয়া যায়।
            </p>
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
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center disabled:bg-red-300"
            disabled={!formData.agreedToTerms || isPending}
          >
            {isPending ? (
              <div className="flex items-center justify-center">
                <Loading size="small" color="#ffffff" />
                <span className="ml-2">নিবন্ধন হচ্ছে...</span>
              </div>
            ) : (
              'নিবন্ধন করুন'
            )}
          </button>
          
          <p className="text-center text-gray-600">
            ইতিমধ্যে একাউন্ট আছে? <Link href="/login" className="text-red-600 hover:underline">লগইন করুন</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegAsUser;
