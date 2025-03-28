'use client';

import { useState } from 'react';
import GeoMapTemplate from '@/components/GeoMapTemplate';
import type { LatLngTuple } from 'leaflet';

interface LocationInputProps {
  onLocationChange?: (location: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number };
  label?: string;
  mapHeight?: string;
  required?: boolean;
  width?: string;
  className?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({
  onLocationChange,
  initialLocation,
  label = 'অবস্থান নির্বাচন করুন (Select Location)',
  mapHeight = '300px',
  required = false,
  width = '100%',
  className = '',
}) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    initialLocation || null
  );

  const handleLocationSelect = (latLng: LatLngTuple) => {
    const newLocation = { lat: latLng[0], lng: latLng[1] };
    setLocation(newLocation);
    
    if (onLocationChange) {
      onLocationChange(newLocation);
    }
  };

  return (
    <div className={`space-y-2 ${className}`} style={{ width }}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="border border-gray-300 rounded-md overflow-hidden">
        <GeoMapTemplate
          selectedLocation={location}
          onLocationSelect={handleLocationSelect}
          height={mapHeight}
        />
      </div>
      
      {location && (
        <div className="flex gap-4 text-sm mt-2">
          <div className="flex-1">
            <span className="text-gray-500">অক্ষাংশ (Lat):</span>{' '}
            <span className="font-medium">{location.lat.toFixed(6)}</span>
          </div>
          <div className="flex-1">
            <span className="text-gray-500">দ্রাঘিমাংশ (Lng):</span>{' '}
            <span className="font-medium">{location.lng.toFixed(6)}</span>
          </div>
        </div>
      )}
      
      {!location && required && (
        <p className="text-sm text-amber-600">
          অনুগ্রহ করে ম্যাপে ক্লিক করে একটি অবস্থান নির্বাচন করুন
          <br />
          <span className="text-xs text-gray-500">Please select a location by clicking on the map</span>
        </p>
      )}
    </div>
  );
};

export default LocationInput; 