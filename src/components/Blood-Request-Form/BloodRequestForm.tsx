'use client'
import { useState } from 'react';

interface BloodRequestFormProps {
  type: string;
  title: string
}

const BloodRequestForm: React.FC<BloodRequestFormProps> = ({type = "normal", title}) => {
  const [formData, setFormData] = useState({
    name: '',
    patientName: '',
    patientProblem: '',
    mobile: '',
    bloodGroup: '',
    location: '',
    hospitalName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(type)
    console.log(formData);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">রুগীর নাম</label>
            <input 
              type="text" 
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="রুগীর নাম" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="patientProblem" className="block text-sm font-medium text-gray-700 mb-1">রুগীর সমস্যা</label>
            <input 
              type="text" 
              id="patientProblem"
              name="patientProblem"
              value={formData.patientProblem}
              onChange={handleChange}
              placeholder="রুগীর সমস্যা" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">আপনার মোবাইল নাম্বার</label>
            <input 
              type="tel" 
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="আপনার মোবাইল নাম্বার" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">ব্লাড গ্রুপ</label>
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
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">এলাকা</label>
            <select 
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              aria-label="এলাকা নির্বাচন করুন"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            >
              <option value="">এলাকা নির্বাচন করুন</option>
              <option value="kurigram-sadar">কুড়িগ্রাম সদর</option>
              <option value="ulipur">উলিপুর</option>
              <option value="chilmari">চিলমারী</option>
              <option value="rajarhat">রাজারহাট</option>
              <option value="nageshwari">নাগেশ্বরী</option>
              <option value="bhurungamari">ভুরুঙ্গামারী</option>
              <option value="phulbari">ফুলবাড়ী</option>
              <option value="roumari">রৌমারী</option>
              <option value="char-rajibpur">চর রাজিবপুর</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">হাঁসপাতাল এর নাম</label>
          <input type="text" id='hospitalName' name='hospitalName' onChange={handleChange} value={formData.hospitalName} placeholder='হাঁসপাতালের নাম' className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500' />
        </div>
        
        <div className="mt-6">
          <button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            অনুরোধ জমা দিন
          </button>
        </div>
      </form>
      
      {type === "sos" && (
        <div className="w-full p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center mt-4">
          <h1 className="text-lg font-semibold">আপনার অনুরধটি ১০ জন রক্তদাতার কাছে পাঠানো হয়েছে</h1>
        </div>
      )}
    </div>
  );
};

export default BloodRequestForm;
