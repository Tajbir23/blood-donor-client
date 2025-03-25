'use client';

import { useEffect, useState, useCallback } from 'react';
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

export interface MapComponentProps {
  selectedLocation: { lat: number; lng: number } | null;
  onLocationSelect: (location: LatLngTuple) => void;
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

const MapComponent = ({ selectedLocation, onLocationSelect }: MapComponentProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ display_name: string; lat: number; lon: number }>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Fix Leaflet icon issues
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  const initialPosition: LatLngTuple = selectedLocation 
    ? [selectedLocation.lat, selectedLocation.lng]
    : [25.7439, 89.2752]; // Default to Rangpur Division

  const searchLocation = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching location:', error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear previous timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer for debounced search
    const timer = setTimeout(() => {
      searchLocation(query);
    }, 500); // 500ms delay

    setDebounceTimer(timer);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    searchLocation(searchQuery);
  };

  const handleResultClick = (result: { lat: number; lon: number }) => {
    const location: LatLngTuple = [parseFloat(result.lat), parseFloat(result.lon)];
    onLocationSelect(location);
    setSearchResults([]);
    setSearchQuery('');
  };

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 left-4 z-[1000] w-64 bg-white rounded-lg shadow-md p-2">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                searchLocation(searchQuery);
              }
            }}
            placeholder="অবস্থান খুঁজুন..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="button"
            onClick={() => searchLocation(searchQuery)}
            disabled={isSearching}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {isSearching ? 'খুঁজছি...' : '🔍'}
          </button>
        </div>
        
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg max-h-48 overflow-y-auto">
            {searchResults.map((result, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleResultClick(result)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              >
                <div className="font-medium">{result.display_name.split(',')[0]}</div>
                <div className="text-sm text-gray-500">
                  {result.address?.city || result.address?.town || result.address?.village || ''}
                  {result.address?.state ? `, ${result.address.state}` : ''}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <MapContainer 
        center={initialPosition} 
        zoom={13} 
        style={{ height: '100%', width: '100%', borderRadius: '8px' }}
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
    </div>
  );
};

export default MapComponent; 