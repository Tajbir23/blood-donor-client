'use client'
import baseUrl from '@/lib/api/baseUrl';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface DonationFormData {
  amount: string;
  donor_name: string;
  donor_email: string;
  donor_phone: string;
}

const SslCommerz: React.FC = () => {
  const [formData, setFormData] = useState<DonationFormData>({
    amount: '',
    donor_name: '',
    donor_email: '',
    donor_phone: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation errors when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    // Required fields validation
    if (!formData.amount.trim()) newErrors.amount = 'অনুদানের পরিমাণ আবশ্যক';
    if (!formData.donor_name.trim()) newErrors.donor_name = 'দাতার নাম আবশ্যক';
    if (!formData.donor_email.trim()) newErrors.donor_email = 'ইমেইল আবশ্যক';
    if (!formData.donor_phone.trim()) newErrors.donor_phone = 'মোবাইল নম্বর আবশ্যক';
    
    // Amount validation
    const amountNum = Number(formData.amount);
    if (formData.amount && (isNaN(amountNum) || amountNum <= 0)) {
      newErrors.amount = 'অনুগ্রহ করে একটি বৈধ অনুদানের পরিমাণ দিন';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.donor_email && !emailRegex.test(formData.donor_email)) {
      newErrors.donor_email = 'অনুগ্রহ করে একটি বৈধ ইমেইল দিন';
    }
    
    // Phone validation
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (formData.donor_phone && !phoneRegex.test(formData.donor_phone)) {
      newErrors.donor_phone = 'অনুগ্রহ করে একটি বৈধ মোবাইল নম্বর দিন (01XXXXXXXXX)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('ফর্মে কিছু ত্রুটি আছে, অনুগ্রহ করে সেগুলি ঠিক করুন');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual payment gateway integration
      console.log('Processing payment with data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('অনুদানের জন্য আপনাকে ধন্যবাদ! পেমেন্ট গেটওয়েতে নেয়া হচ্ছে...');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/donation`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      

      const data = await response.json()
      console.log(data)
      const url = data.url
      if(url){
        window.location.href = url
      }
      // TODO: Redirect to SSLCommerz payment gateway
      // window.location.href = paymentUrl;
    } catch (error) {
      toast.error('পেমেন্ট প্রক্রিয়া করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।');
      console.error('Payment processing error:', error);
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
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-6">অর্থ অনুদান করুন</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            অনুদানের পরিমাণ (টাকা) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">৳</span>
            </div>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="অনুদানের পরিমাণ"
              className={`w-full pl-7 p-3 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
              min="1"
              required
            />
          </div>
          {renderError('amount')}
        </div>
        
        <div>
          <label htmlFor="donor_name" className="block text-sm font-medium text-gray-700 mb-1">
            দাতার নাম <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="donor_name"
            name="donor_name"
            value={formData.donor_name}
            onChange={handleChange}
            placeholder="আপনার নাম"
            className={`w-full p-3 border ${errors.donor_name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
            required
          />
          {renderError('donor_name')}
        </div>
        
        <div>
          <label htmlFor="donor_email" className="block text-sm font-medium text-gray-700 mb-1">
            ইমেইল <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="donor_email"
            name="donor_email"
            value={formData.donor_email}
            onChange={handleChange}
            placeholder="আপনার ইমেইল"
            className={`w-full p-3 border ${errors.donor_email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
            required
          />
          {renderError('donor_email')}
        </div>
        
        <div>
          <label htmlFor="donor_phone" className="block text-sm font-medium text-gray-700 mb-1">
            মোবাইল নম্বর <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="donor_phone"
            name="donor_phone"
            value={formData.donor_phone}
            onChange={handleChange}
            placeholder="01XXXXXXXXX"
            className={`w-full p-3 border ${errors.donor_phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
            required
          />
          {renderError('donor_phone')}
        </div>
        
        <div className="pt-4">
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
                প্রক্রিয়া করা হচ্ছে...
              </>
            ) : (
              'অনুদান করুন'
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>আপনার অনুদান রক্তদান কার্যক্রম চালিয়ে যেতে সাহায্য করবে।</p>
        <div className="flex justify-center mt-4 space-x-2">
          <img src="/sslcommerz-logo.png" alt="SSLCommerz" className="h-8" />
          <img src="/payment-cards.png" alt="Payment Methods" className="h-8" />
        </div>
      </div>
    </div>
  );
};

export default SslCommerz;

