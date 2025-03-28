'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icon issues in Next.js
const fixLeafletIcon = () => {
  // @ts-expect-error - Known issue with Leaflet types
  delete L.Icon.Default.prototype._getIconUrl;
  
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
};

interface GeoMapTemplateProps {
  selectedLocation: { lat: number; lng: number } | null;
  onLocationSelect: (location: LatLngTuple) => void;
  height?: string;
}

// Component to handle map view updates
const ChangeView = ({ center }: { center: LatLngTuple }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

// Component to handle map clicks and marker dragging
const LocationMarker = ({ 
  onLocationSelect, 
  initialLocation 
}: { 
  onLocationSelect: (location: LatLngTuple) => void;
  initialLocation: { lat: number; lng: number } | null;
}) => {
  const [position, setPosition] = useState<L.LatLng | null>(
    initialLocation ? L.latLng(initialLocation.lat, initialLocation.lng) : null
  );
  
  useMapEvents({
    click(e: L.LeafletMouseEvent) {
      setPosition(e.latlng);
      onLocationSelect([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <Marker 
      position={position} 
      interactive={true}
      draggable={true}
      eventHandlers={{
        dragend: (e: L.LeafletEvent) => {
          const marker = e.target as L.Marker;
          const position = marker.getLatLng();
          setPosition(position);
          onLocationSelect([position.lat, position.lng]);
        },
      }}
    />
  );
};

const GeoMapTemplate = ({ selectedLocation, onLocationSelect, height = '500px' }: GeoMapTemplateProps) => {
  // Fix Leaflet icon issues
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  const initialPosition: LatLngTuple = selectedLocation 
    ? [selectedLocation.lat, selectedLocation.lng]
    : [25.7439, 89.2752]; // Default to Rangpur Division

  return (
    <MapContainer 
      center={initialPosition} 
      zoom={13} 
      style={{ height, width: '100%', borderRadius: '8px' }}
    >
      <ChangeView center={initialPosition} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker 
        onLocationSelect={onLocationSelect} 
        initialLocation={selectedLocation}
      />
    </MapContainer>
  );
};

export type { GeoMapTemplateProps };
export default GeoMapTemplate; 