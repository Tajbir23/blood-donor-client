'use client';

import { useState } from 'react';
import GeoMapTemplate from '@/components/GeoMapTemplate';

export default function LocationPickerPage() {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    console.log(`Selected coordinates: ${lat}, ${lng}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">অবস্থান নির্বাচক (Location Picker)</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-800">মানচিত্রে অবস্থান নির্বাচন করুন</h2>
            <p className="text-sm text-gray-600">Select a location on the map to get coordinates</p>
          </div>
          
          <div className="p-4">
            <GeoMapTemplate 
              onLocationSelect={handleLocationSelect}
              height="500px"
              initialPosition={[25.7439, 89.2752]} // Rangpur Division
            />
          </div>
        </div>
        
        {selectedLocation && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium mb-3">নির্বাচিত স্থানাঙ্ক (Selected Coordinates)</h3>
            <div className="flex gap-4">
              <div className="flex-1 p-3 bg-gray-50 rounded border">
                <p className="text-sm text-gray-500">অক্ষাংশ (Latitude)</p>
                <p className="font-mono text-lg">{selectedLocation.lat.toFixed(6)}</p>
              </div>
              <div className="flex-1 p-3 bg-gray-50 rounded border">
                <p className="text-sm text-gray-500">দ্রাঘিমাংশ (Longitude)</p>
                <p className="font-mono text-lg">{selectedLocation.lng.toFixed(6)}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                এই স্থানাঙ্ক আপনার অবস্থান, হাসপাতাল, বা অন্য কোন গুরুত্বপূর্ণ স্থানের জন্য ব্যবহার করতে পারেন।
              </p>
              <p className="text-sm text-gray-500 mt-1">
                You can use these coordinates for your location, hospital, or any other important place.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 