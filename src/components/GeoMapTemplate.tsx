'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { LatLngTuple, LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Dynamically load the map components with no SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Define a custom component that uses useMapEvents
const MapEventsComponent = dynamic(
  () => 
    import('react-leaflet').then((mod) => {
      // Create a wrapper component
      const MapEventsWrapper = ({ onClick }: { onClick: (e: LeafletMouseEvent) => void }) => {
        mod.useMapEvents({
          click: onClick,
        });
        return null;
      };
      return MapEventsWrapper;
    }),
  { ssr: false }
);

interface GeoMapTemplateProps {
  selectedLocation?: { lat: number; lng: number } | null;
  onLocationSelect?: (location: LatLngTuple) => void;
  height?: string;
  zoom?: number;
  allowLocationSelection?: boolean;
}

const GeoMapTemplate: React.FC<GeoMapTemplateProps> = ({
  selectedLocation,
  onLocationSelect,
  height = '400px',
  zoom = 6,
  allowLocationSelection = true,
}) => {
  // Default center is Bangladesh
  const defaultCenter: LatLngTuple = [23.8103, 90.4125]; // Dhaka, Bangladesh
  const [center, setCenter] = useState<LatLngTuple>(
    selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : defaultCenter
  );
  const [mapKey, setMapKey] = useState(0);
  const [iconLoaded, setIconLoaded] = useState(false);
  
  // Update center when selectedLocation changes
  useEffect(() => {
    if (selectedLocation) {
      setCenter([selectedLocation.lat, selectedLocation.lng]);
      setMapKey(prev => prev + 1); // Force map re-render to center properly
    }
  }, [selectedLocation]);

  // Fix Leaflet icon issues
  useEffect(() => {
    const fixLeafletIcon = async () => {
      // Dynamically import Leaflet to avoid SSR issues
      const L = await import('leaflet');
      
      // Delete default icon to avoid issues - follow TypeScript's suggestion of converting to unknown first
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      
      // Set up the default icon with proper paths
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      });
      
      setIconLoaded(true);
    };
    
    fixLeafletIcon();
  }, []);

  // Custom marker icon setup inside useEffect to avoid SSR issues
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // If we're still on the server, don't render the map
  if (!isClient) {
    return <div style={{ height, width: '100%', background: '#f0f0f0' }}></div>;
  }

  return (
    <MapContainer
      key={mapKey}
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height, width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {allowLocationSelection && onLocationSelect && (
        <MapEventsComponent 
          onClick={(e) => {
            if (allowLocationSelection && onLocationSelect) {
              onLocationSelect([e.latlng.lat, e.latlng.lng]);
            }
          }}
        />
      )}
      
      {selectedLocation && iconLoaded && (
        <Marker 
          position={[selectedLocation.lat, selectedLocation.lng]}
        >
          <Popup>
            <div>
              <p>অক্ষাংশ (Lat): {selectedLocation.lat.toFixed(6)}</p>
              <p>দ্রাঘিমাংশ (Lng): {selectedLocation.lng.toFixed(6)}</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default GeoMapTemplate; 