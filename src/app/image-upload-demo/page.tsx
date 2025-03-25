'use client';

import { useState } from 'react';
import { UploadImage } from '@/app/libs';

export default function ImageUploadDemo() {
  const [imageData, setImageData] = useState<{ file: File | null; preview: string }>({
    file: null,
    preview: '',
  });

  const handleImageSelect = (file: File, previewUrl: string) => {
    setImageData({ file, preview: previewUrl });
    console.log('Selected file:', file.name, 'Size:', (file.size / 1024).toFixed(2), 'KB');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">ছবি আপলোড ডেমো (Image Upload Demo)</h1>
      
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-800">বিভিন্ন ধরনের ছবি আপলোড</h2>
            <p className="text-sm text-gray-600">Different types of image upload examples</p>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Standard upload */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">১. সাধারণ ছবি আপলোড</h3>
              <UploadImage 
                onImageSelect={handleImageSelect}
                height="200px"
                required={true}
              />
            </div>

            {/* Rounded upload */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">২. গোল ছবি আপলোড (প্রোফাইল ছবি)</h3>
              <UploadImage 
                onImageSelect={handleImageSelect}
                height="150px"
                width="150px"
                rounded={true}
                label="প্রোফাইল ছবি আপলোড করুন"
                className="mx-auto"
              />
            </div>

            {/* Smaller size with custom config */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">৩. ছোট সাইজের ছবি (1MB সীমা)</h3>
              <UploadImage 
                onImageSelect={handleImageSelect}
                height="100px"
                width="100px"
                maxSizeMB={1}
                label="আইকন আপলোড করুন"
              />
            </div>
          </div>
        </div>
        
        {imageData.preview && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium mb-3 text-gray-800 border-b pb-2">সর্বশেষ আপলোড করা ছবি</h3>
            <div className="flex items-center space-x-4">
              <img 
                src={imageData.preview} 
                alt="Selected image" 
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="text-sm text-gray-500">ফাইলের নাম:</p>
                <p className="font-medium">{imageData.file?.name || 'N/A'}</p>
                <p className="text-sm text-gray-500 mt-1">ফাইল সাইজ:</p>
                <p className="font-medium">
                  {imageData.file ? `${(imageData.file.size / 1024).toFixed(2)} KB` : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 