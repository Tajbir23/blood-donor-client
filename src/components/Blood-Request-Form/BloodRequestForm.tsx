'use client'
import { useState, useEffect } from 'react';
import { useRangpurDivision } from '@/hooks/useLocation';

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
  
  const [formData, setFormData] = useState({
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
    districtId: '',         
    thanaId: '',            
    hospitalId: '',         
    hospitalName: '',
    hospitalWard: '',
    patientAge: '',
    patientGender: '',
    additionalInfo: ''
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(type);
    console.log(formData);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">{title}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-l-4 border-red-500 pl-4 pb-1">
          <h3 className="text-lg font-medium text-gray-800 mb-4">রোগীর তথ্য</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
              <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">রোগীর নাম</label>
            <input 
              type="text" 
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
                placeholder="রোগীর নাম" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          
          <div>
              <label htmlFor="patientProblem" className="block text-sm font-medium text-gray-700 mb-1">রোগীর সমস্যা/অপারেশন</label>
            <input 
              type="text" 
              id="patientProblem"
              name="patientProblem"
              value={formData.patientProblem}
              onChange={handleChange}
                placeholder="রোগের বিবরণ" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
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
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">রক্তের গ্রুপ</label>
            <select 
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              aria-label="ব্লাড গ্রুপ বাছাই করুন"
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

          <div>
              <label htmlFor="bloodUnits" className="block text-sm font-medium text-gray-700 mb-1">রক্তের পরিমাণ (ব্যাগ)</label>
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
              <label htmlFor="urgencyLevel" className="block text-sm font-medium text-gray-700 mb-1">জরুরীতার মাত্রা</label>
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
              <label htmlFor="requiredDate" className="block text-sm font-medium text-gray-700 mb-1">কখন প্রয়োজন</label>
              <input 
                type="datetime-local" 
                id="requiredDate"
                name="requiredDate"
                value={formData.requiredDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="border-l-4 border-red-500 pl-4 pb-1">
          <h3 className="text-lg font-medium text-gray-800 mb-4">যোগাযোগের তথ্য</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">আপনার নাম</label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="আপনার নাম" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
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
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">প্রাথমিক মোবাইল নাম্বার</label>
              <input 
                type="tel" 
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="০১XXXXXXXXX" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>
        
        <div className="border-l-4 border-red-500 pl-4 pb-1">
          <h3 className="text-lg font-medium text-gray-800 mb-4">হাসপাতাল ও অবস্থান</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="districtId" className="block text-sm font-medium text-gray-700 mb-1">জেলা</label>
              <select 
                id="districtId"
                name="districtId"
                value={formData.districtId}
                onChange={handleChange}
                aria-label="জেলা নির্বাচন করুন"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
                disabled={loadingDivision}
              >
                <option value="">জেলা নির্বাচন করুন</option>
                {districts.map(district => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
              {loadingDivision && <p className="text-sm text-gray-500 mt-1">জেলার তথ্য লোড হচ্ছে...</p>}
              {divisionError && <p className="text-sm text-red-500 mt-1">{divisionError}</p>}
            </div>
            
            <div>
              <label htmlFor="thanaId" className="block text-sm font-medium text-gray-700 mb-1">থানা</label>
              <select 
                id="thanaId"
                name="thanaId"
                value={formData.thanaId}
                onChange={handleChange}
                aria-label="থানা নির্বাচন করুন"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
                disabled={!formData.districtId || loadingDivision}
              >
                <option value="">থানা নির্বাচন করুন</option>
                {thanas.map(thana => (
                  <option key={thana.id} value={thana.id}>
                    {thana.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="hospitalId" className="block text-sm font-medium text-gray-700 mb-1">হাসপাতাল</label>
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
                  <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-1">হাসপাতালের নাম</label>
                  <input 
                    type="text" 
                    id="hospitalName"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    placeholder="হাসপাতালের নাম লিখুন" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required={formData.hospitalId === ''}
                  />
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
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            {type === "sos" ? "জরুরি অনুরোধ পাঠান" : "অনুরোধ জমা দিন"}
          </button>
        </div>
      </form>
      
      {type === "sos" && (
        <div className="w-full p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center mt-4">
          <h1 className="text-lg font-semibold">আপনার অনুরধটি ১০ জন রক্তদাতার কাছে পাঠানো হয়েছে</h1>
        </div>
      )}
    </div>
  );
};

export default BloodRequestForm;
