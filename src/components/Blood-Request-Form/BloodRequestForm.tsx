'use client'
import React, { useState, useEffect } from 'react';
import { useRangpurDivision } from '@/hooks/useLocation';
import LocationSelector from '../ui/location-selector';
import { requestForBlood } from '@/app/actions/bloodDonation';
import BloodRequestType from '@/lib/types/bloodRequestType';
import toast from 'react-hot-toast';

interface BloodRequestFormProps {
  type: string;
  title: string;
}

const BloodRequestForm: React.FC<BloodRequestFormProps> = ({type = "normal", title}) => {
  // ডিভিশনের ডাটা ফেচ করি
  const { division, loading: loadingDivision, error: divisionError } = useRangpurDivision();
  
  // জেলা ও থানার স্টেট
  const [districts, setDistricts] = useState<Array<{id: string, name: string}>>([]);
  const [thanas, setThanas] = useState<Array<{id: string, name: string}>>([]);
  
  // হাসপাতালের স্টেট
  const [hospitals, setHospitals] = useState<Array<{id: string, name: string, location: string}>>([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  
  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Validation state
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const [formData, setFormData] = useState<BloodRequestType>({
    name: '',
    patientName: '',
    patientProblem: '',
    mobile: '',
    alternativeContact: '',
    relation: '',
    bloodGroup: '',
    bloodUnits: '1',
    urgencyLevel: 'normal',
    requiredDate: '',
    requiredTime: '',
    reason: '',
    contactPerson: '',
    contactNumber: '',
    divisionId: '',
    districtId: '',
    thanaId: '',
    hospitalId: '',
    hospitalName: '',
    hospitalWard: '',
    patientAge: '',
    patientGender: '',
    additionalInfo: '',
    latitude: '',
    longitude: '',
  });

  // ডিভিশনের ডাটা পাওয়ার পর জেলাগুলি সেট করি
  useEffect(() => {
    if (division && division.districts) {
      setDistricts(division.districts.map(d => ({ id: d.id, name: d.name })));
    }
  }, [division]);

  // জেলা পরিবর্তনের পর থানাগুলি সেট করি
  useEffect(() => {
    if (division && formData.districtId) {
      const selectedDistrict = division.districts.find(d => d.id === formData.districtId);
      if (selectedDistrict && selectedDistrict.thanas) {
        setThanas(selectedDistrict.thanas);
        
        // জেলা পরিবর্তন হলে থানা রিসেট করি
        if (formData.thanaId && !selectedDistrict.thanas.some(t => t.id === formData.thanaId)) {
          setFormData(prev => ({ ...prev, thanaId: '' }));
        }
      }
    } else {
      setThanas([]);
    }
  }, [division, formData.districtId, formData.thanaId]);

  // থানা পরিবর্তনের পর হাসপাতালগুলি ফেচ করি
  useEffect(() => {
    const fetchHospitals = async () => {
      if (formData.districtId && formData.thanaId) {
        setLoadingHospitals(true);
        try {
          // এখানে আপনার API থেকে হাসপাতালের তথ্য ফেচ করুন
          const response = await fetch(`/api/hospitals?districtId=${formData.districtId}&thanaId=${formData.thanaId}`);
          if (response.ok) {
            const data = await response.json();
            setHospitals(data);
          } else {
            console.error('হাসপাতালের তথ্য লোড করতে সমস্যা হয়েছে');
            setHospitals([]);
          }
        } catch (error) {
          console.error('হাসপাতালের তথ্য লোড করতে সমস্যা হয়েছে', error);
          setHospitals([]);
        } finally {
          setLoadingHospitals(false);
        }
      }
    };

    fetchHospitals();
  }, [formData.districtId, formData.thanaId]);

  // হাসপাতাল পরিবর্তনের সময় হাসপাতালের নাম আপডেট করি
  useEffect(() => {
    if (formData.hospitalId) {
      const selectedHospital = hospitals.find(h => h.id === formData.hospitalId);
      if (selectedHospital) {
        setFormData(prev => ({ ...prev, hospitalName: selectedHospital.name }));
      }
    }
  }, [formData.hospitalId, hospitals]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleLocationChange = (type: string, value: string, latitude?: string, longitude?: string) => {
    setFormData(prev => ({ ...prev, [type]: value }));
    
    // Save coordinates if provided
    if (latitude && longitude && type === 'thanaId') {
      setFormData(prev => ({ ...prev, latitude, longitude }));
    }
    
    if (type === 'districtId') {
      setFormData(prev => ({ ...prev, thanaId: '', hospitalId: '', hospitalName: '' }));
    } else if (type === 'thanaId') {
      setFormData(prev => ({ ...prev, hospitalId: '', hospitalName: '' }));
    }
    
    // Clear validation error when location is selected
    if (errors[type]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[type];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    // Required fields validation
    if (!formData.name.trim()) newErrors.name = 'নাম আবশ্যক';
    if (!formData.patientName.trim()) newErrors.patientName = 'রোগীর নাম আবশ্যক';
    if (!formData.patientProblem.trim()) newErrors.patientProblem = 'রোগীর সমস্যা আবশ্যক';
    if (!formData.mobile.trim()) newErrors.mobile = 'মোবাইল নম্বর আবশ্যক';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'রক্তের গ্রুপ আবশ্যক';
    if (!formData.requiredDate) newErrors.requiredDate = 'তারিখ আবশ্যক';
    if (!formData.divisionId) newErrors.divisionId = 'বিভাগ নির্বাচন করুন';
    if (!formData.districtId) newErrors.districtId = 'জেলা নির্বাচন করুন';
    if (!formData.thanaId) newErrors.thanaId = 'থানা নির্বাচন করুন';
    
    // Mobile number format validation
    const mobileRegex = /^01[3-9]\d{8}$/;
    if (formData.mobile && !mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)';
    }
    
    if (formData.alternativeContact && !mobileRegex.test(formData.alternativeContact)) {
      newErrors.alternativeContact = 'সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)';
    }
    
    // Hospital validation
    if (!formData.hospitalId && !formData.hospitalName.trim()) {
      newErrors.hospitalName = 'হাসপাতালের নাম আবশ্যক';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('ফর্মে কিছু ত্রুটি আছে, অনুগ্রহ করে সেগুলি ঠিক করুন');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("formData")
      console.log(formData)
      const response = await requestForBlood(formData);
      toast.success(response.message);
      
      // Reset form after successful submission if needed
      if (response.success) {
        // Optionally reset form
        // setFormData({...initial form state})
      }
    } catch (error) {
      toast.error('অনুরোধ প্রক্রিয়া করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।');
      console.error('Request submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to render error message
  const renderError = (field: string) => {
    return errors[field] ? (
      <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
    ) : null;
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-4 md:mb-6 text-center">{title}</h2>
      
      {divisionError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          <p>অবস্থান তথ্য লোড করতে সমস্যা হয়েছে। পৃষ্ঠাটি রিফ্রেশ করুন।</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-l-4 border-red-500 pl-4 pb-1">
          <h3 className="text-lg font-medium text-gray-800 mb-4">রোগীর তথ্য</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">রোগীর নাম <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="রোগীর নাম" 
                className={`w-full p-3 border ${errors.patientName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                required
              />
              {renderError('patientName')}
            </div>
          
            <div>
              <label htmlFor="patientProblem" className="block text-sm font-medium text-gray-700 mb-1">রোগীর সমস্যা/অপারেশন <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                id="patientProblem"
                name="patientProblem"
                value={formData.patientProblem}
                onChange={handleChange}
                placeholder="রোগের বিবরণ" 
                className={`w-full p-3 border ${errors.patientProblem ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                required
              />
              {renderError('patientProblem')}
            </div>
          
            <div>
              <label htmlFor="patientAge" className="block text-sm font-medium text-gray-700 mb-1">রোগীর বয়স</label>
              <input 
                type="number" 
                id="patientAge"
                name="patientAge"
                value={formData.patientAge}
                onChange={handleChange}
                placeholder="রোগীর বয়স" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          
            <div>
              <label htmlFor="patientGender" className="block text-sm font-medium text-gray-700 mb-1">রোগীর লিঙ্গ</label>
              <select 
                id="patientGender"
                name="patientGender"
                value={formData.patientGender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">নির্বাচন করুন</option>
                <option value="male">পুরুষ</option>
                <option value="female">মহিলা</option>
                <option value="other">অন্যান্য</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="border-l-4 border-red-500 pl-4 pb-1">
          <h3 className="text-lg font-medium text-gray-800 mb-4">রক্তের প্রয়োজন সম্পর্কিত তথ্য</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">রক্তের গ্রুপ <span className="text-red-500">*</span></label>
              <select 
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                aria-label="ব্লাড গ্রুপ বাছাই করুন"
                className={`w-full p-3 border ${errors.bloodGroup ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
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
              {renderError('bloodGroup')}
            </div>

            <div>
              <label htmlFor="bloodUnits" className="block text-sm font-medium text-gray-700 mb-1">রক্তের পরিমাণ (ব্যাগ) <span className="text-red-500">*</span></label>
              <select 
                id="bloodUnits"
                name="bloodUnits"
                value={formData.bloodUnits}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="1">১ ব্যাগ</option>
                <option value="2">২ ব্যাগ</option>
                <option value="3">৩ ব্যাগ</option>
                <option value="4">৪+ ব্যাগ</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="urgencyLevel" className="block text-sm font-medium text-gray-700 mb-1">জরুরীতার মাত্রা <span className="text-red-500">*</span></label>
              <select 
                id="urgencyLevel"
                name="urgencyLevel"
                value={formData.urgencyLevel}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="normal">সাধারণ</option>
                <option value="urgent">জরুরি</option>
                <option value="emergency">অতি জরুরি (এখনই প্রয়োজন)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="requiredDate" className="block text-sm font-medium text-gray-700 mb-1">কখন প্রয়োজন <span className="text-red-500">*</span></label>
              <input 
                type="datetime-local" 
                id="requiredDate"
                name="requiredDate"
                value={formData.requiredDate}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.requiredDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                required
              />
              {renderError('requiredDate')}
            </div>

            <div>
              <label htmlFor="requiredTime" className="block text-sm font-medium text-gray-700 mb-1">প্রয়োজনীয় সময় (ঘন্টা)</label>
              <input 
                type="time" 
                id="requiredTime"
                name="requiredTime"
                value={formData.requiredTime}
                onChange={handleChange}
                placeholder="সময় (ঐচ্ছিক)" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">রক্তের প্রয়োজনের কারণ</label>
              <input 
                type="text" 
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="রক্তের প্রয়োজনের কারণ" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>
        
        <div className="border-l-4 border-red-500 pl-4 pb-1">
          <h3 className="text-lg font-medium text-gray-800 mb-4">যোগাযোগের তথ্য</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">আপনার নাম <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="আপনার নাম" 
                className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                required
              />
              {renderError('name')}
            </div>
            
            <div>
              <label htmlFor="relation" className="block text-sm font-medium text-gray-700 mb-1">রোগীর সাথে সম্পর্ক</label>
              <input 
                type="text" 
                id="relation"
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                placeholder="রোগীর সাথে আপনার সম্পর্ক" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">প্রাথমিক মোবাইল নাম্বার <span className="text-red-500">*</span></label>
              <input 
                type="tel" 
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="০১XXXXXXXXX" 
                className={`w-full p-3 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                required
              />
              {renderError('mobile')}
            </div>
            
            <div>
              <label htmlFor="alternativeContact" className="block text-sm font-medium text-gray-700 mb-1">বিকল্প মোবাইল নাম্বার</label>
              <input 
                type="tel" 
                id="alternativeContact"
                name="alternativeContact"
                value={formData.alternativeContact}
                onChange={handleChange}
                placeholder="বিকল্প যোগাযোগের নম্বর" 
                className={`w-full p-3 border ${errors.alternativeContact ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
              />
              {renderError('alternativeContact')}
            </div>

            <div>
              <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">অন্য যোগাযোগকারী ব্যক্তির নাম</label>
              <input 
                type="text" 
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="অন্য যোগাযোগকারীর নাম" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            
            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">অন্য যোগাযোগকারীর নাম্বার</label>
              <input 
                type="tel" 
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="অন্য যোগাযোগকারীর নাম্বার" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>
        
        <div className="border-l-4 border-red-500 pl-4 pb-1">
          <h3 className="text-lg font-medium text-gray-800 mb-4">হাসপাতাল ও অবস্থান</h3>
          
          <LocationSelector 
            onDivisionChange={(value) => handleLocationChange('divisionId', value)}
            onDistrictChange={(value) => handleLocationChange('districtId', value)}
            onThanaChange={(value, lat, lng) => handleLocationChange('thanaId', value, lat, lng)}
            defaultDivisionId={formData.divisionId}
            defaultDistrictId={formData.districtId}
            defaultThanaId={formData.thanaId}
          />
          {renderError('divisionId')}
          {renderError('districtId')}
          {renderError('thanaId')}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="hospitalId" className="block text-sm font-medium text-gray-700 mb-1">হাসপাতাল <span className="text-red-500">*</span></label>
              <select 
                id="hospitalId"
                name="hospitalId"
                value={formData.hospitalId}
                onChange={handleChange}
                aria-label="হাসপাতাল নির্বাচন করুন"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                disabled={!formData.thanaId || loadingHospitals}
              >
                <option value="">হাসপাতাল নির্বাচন করুন</option>
                {hospitals.map(hospital => (
                  <option key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </option>
                ))}
              </select>
              {loadingHospitals && <p className="text-sm text-gray-500 mt-1">হাসপাতালের তথ্য লোড হচ্ছে...</p>}
              
              {/* অথবা নতুন হাসপাতাল যোগ করুন */}
              {formData.hospitalId === '' && (
                <div className="mt-2">
                  <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-1">হাসপাতালের নাম <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    id="hospitalName"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    placeholder="হাসপাতালের নাম লিখুন" 
                    className={`w-full p-3 border ${errors.hospitalName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                    required={formData.hospitalId === ''}
                  />
                  {renderError('hospitalName')}
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="hospitalWard" className="block text-sm font-medium text-gray-700 mb-1">ওয়ার্ড/কেবিন/ফ্লোর</label>
              <input 
                type="text" 
                id="hospitalWard"
                name="hospitalWard"
                value={formData.hospitalWard}
                onChange={handleChange}
                placeholder="ওয়ার্ড/কেবিন/ফ্লোর নম্বর" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">অতিরিক্ত তথ্য (যদি থাকে)</label>
          <textarea 
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            rows={3}
            placeholder="রক্তদাতাদের জন্য যেকোন সহায়ক তথ্য এখানে লিখুন" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          ></textarea>
        </div>
        
        <div className="mt-6">
          <button 
            type="submit" 
            className={`w-full ${isSubmitting ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'} text-white py-3 px-6 rounded-lg font-semibold transition-colors flex justify-center items-center`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                অনুরোধ পাঠানো হচ্ছে...
              </>
            ) : (
              type === "sos" ? "জরুরি অনুরোধ পাঠান" : "অনুরোধ জমা দিন"
            )}
          </button>
        </div>
      </form>
      
      {type === "sos" && !isSubmitting && (
        <div className="w-full p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center mt-4">
          <p className="text-lg font-semibold">আপনার অনুরধটি ১০ জন রক্তদাতার কাছে পাঠানো হয়েছে</p>
        </div>
      )}
    </div>
  );
};

export default BloodRequestForm;
