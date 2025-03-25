'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface UploadImageProps {
  onImageSelect?: (file: File, previewUrl: string) => void;
  initialImage?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
  maxSizeMB?: number;
  acceptedTypes?: string;
  label?: string;
  required?: boolean;
  className?: string;
}

const UploadImage = ({
  onImageSelect,
  initialImage = '',
  width = '100%',
  height = '200px',
  rounded = false,
  maxSizeMB = 2,
  acceptedTypes = 'image/jpeg, image/png, image/jpg',
  label = 'ছবি আপলোড করুন',
  required = false,
  className = '',
}: UploadImageProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(initialImage);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = useCallback((selectedFile: File) => {
    // Check file size (convert MB to bytes)
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (selectedFile.size > maxSizeBytes) {
      setError(`ফাইল সাইজ ${maxSizeMB}MB এর বেশি হতে পারবে না`);
      return;
    }
    
    // Check file type
    if (!acceptedTypes.includes(selectedFile.type)) {
      setError('অনুমোদিত ফাইল টাইপ: JPG, PNG');
      return;
    }
    
    setError('');
    setFile(selectedFile);
    
    // Create preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    
    // Call the callback with file and preview
    if (onImageSelect) {
      onImageSelect(selectedFile, objectUrl);
    }
    
    return () => URL.revokeObjectURL(objectUrl);
  }, [maxSizeMB, acceptedTypes, onImageSelect]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    handleFileChange(e.target.files[0]);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };
  
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };
  
  const removePicture = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setPreview('');
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    if (onImageSelect) {
      onImageSelect(null as unknown as File, '');
    }
  };
  
  // Define border-radius based on rounded prop
  const borderRadiusClass = rounded ? 'rounded-full' : 'rounded-lg';
  
  return (
    <div className={`space-y-2 ${className}`} style={{ width }}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div
        className={`border-2 border-dashed transition-colors ${
          isDragging ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50'
        } ${borderRadiusClass} overflow-hidden cursor-pointer flex flex-col items-center justify-center`}
        style={{ height, width: '100%' }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        {preview ? (
          <div className="relative w-full h-full">
            <Image
              src={preview}
              alt="Preview"
              fill
              style={{ objectFit: 'cover' }}
              className={borderRadiusClass}
            />
            <button
              type="button"
              onClick={removePicture}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="text-center p-4 flex flex-col items-center">
            <svg
              className="w-10 h-10 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <p className="text-sm text-gray-600 font-medium">ছবি আপলোড করতে ক্লিক করুন অথবা টেনে আনুন</p>
            <p className="text-xs text-gray-500 mt-1">সর্বোচ্চ ফাইল সাইজ: {maxSizeMB}MB (JPG, PNG)</p>
          </div>
        )}
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          accept={acceptedTypes}
          className="hidden"
          required={required && !file}
          aria-label={label || "Upload image"}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default UploadImage;
