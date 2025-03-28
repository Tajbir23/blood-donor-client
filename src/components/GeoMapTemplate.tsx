'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface GeoMapTemplateProps {
  selectedLocation: { lat: number; lng: number } | null;
  onLocationSelect: (location: LatLngTuple) => void;
  height?: string;
}

// Dynamically import Leaflet components
const Map = dynamic(
  async () => {
    const { MapContainer } = await import('react-leaflet');
    return MapContainer;
  },
  { ssr: false }
);

const TileLayer = dynamic(
  async () => {
    const { TileLayer } = await import('react-leaflet');
    return TileLayer;
  },
  { ssr: false }
);

// Component to handle map clicks and marker dragging
const LocationMarker = dynamic(
  async () => {
    const L = await import('leaflet');
    const { useMapEvents, Marker } = await import('react-leaflet');

    return function LocationMarkerComponent({ 
      onLocationSelect, 
      initialLocation 
    }: { 
      onLocationSelect: (location: LatLngTuple) => void;
      initialLocation: { lat: number; lng: number } | null;
    }) {
      const [position, setPosition] = useState<L.LatLng | null>(
        initialLocation ? L.default.latLng(initialLocation.lat, initialLocation.lng) : null
      );
      
      useMapEvents({
        click(e) {
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
            dragend: (e) => {
              const marker = e.target;
              const position = marker.getLatLng();
              setPosition(position);
              onLocationSelect([position.lat, position.lng]);
            },
          }}
        />
      );
    };
  },
  { ssr: false }
);

const GeoMapTemplate = ({ selectedLocation, onLocationSelect, height = '500px' }: GeoMapTemplateProps) => {
  useEffect(() => {
    (async () => {
      const L = await import('leaflet');
      // @ts-expect-error - Known issue with Leaflet types
      delete L.Icon.Default.prototype._getIconUrl;
      
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      });
    })();
  }, []);

  const initialPosition: LatLngTuple = selectedLocation 
    ? [selectedLocation.lat, selectedLocation.lng]
    : [25.7439, 89.2752]; // Default to Rangpur Division

  return (
    <Map 
      center={initialPosition} 
      zoom={13} 
      style={{ height, width: '100%', borderRadius: '8px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker 
        onLocationSelect={onLocationSelect} 
        initialLocation={selectedLocation}
      />
    </Map>
  );
};

export default dynamic(() => Promise.resolve(GeoMapTemplate), { ssr: false }); 