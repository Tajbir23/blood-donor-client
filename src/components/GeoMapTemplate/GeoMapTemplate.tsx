'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { LatLngTuple } from 'leaflet';
import { MapComponentProps } from './MapComponent';


// Dynamically import the map component with no SSR
const MapComponent = dynamic<MapComponentProps>(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">ম্যাপ লোড হচ্ছে...</p>
    </div>
  ),
});

interface GeoMapTemplateProps {
  onLocationChange: (location: { lat: number; lng: number }) => void;
  required?: boolean;
  label?: string;
  width?: string;
  mapHeight?: string;
}

const GeoMapTemplate = ({
  onLocationChange,
  required = false,
  label = 'অবস্থান নির্বাচন করুন',
  width = '100%',
  mapHeight = '300px',
}: GeoMapTemplateProps) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const geoLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setSelectedLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        });
      }
    };
    geoLocation();
  }, []);

  const handleLocationSelect = (location: LatLngTuple) => {
    setSelectedLocation({ lat: location[0], lng: location[1] });
    onLocationChange({ lat: location[0], lng: location[1] });
  };

  return (
    <div className="space-y-2" style={{ width }}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative" style={{ height: mapHeight }}>
        <MapComponent
          selectedLocation={selectedLocation}
          onLocationSelect={handleLocationSelect}
        />
      </div>
    </div>
  );
};

export default GeoMapTemplate;
