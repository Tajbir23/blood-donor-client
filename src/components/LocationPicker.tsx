'use client';

import { useState } from 'react';
import GeoMapTemplate from './GeoMapTemplate';
import type { LatLngTuple } from 'leaflet';

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number } | null;
  height?: string;
}

const LocationPicker = ({ onLocationSelect, initialLocation = null, height }: LocationPickerProps) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(initialLocation);

  const handleLocationSelect = (location: LatLngTuple) => {
    const newLocation = { lat: location[0], lng: location[1] };
    setSelectedLocation(newLocation);
    onLocationSelect(newLocation);
  };

  return (
    <GeoMapTemplate
      selectedLocation={selectedLocation}
      onLocationSelect={handleLocationSelect}
      height={height}
    />
  );
};

export default LocationPicker;