'use client';

import { useState, useEffect, useRef } from 'react';
import GeoMapTemplate from '@/components/GeoMapTemplate';
import type { LatLngTuple } from 'leaflet';
import { FaSearch, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';

interface LocationInputProps {
  onLocationChange?: (location: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number };
  label?: string;
  mapHeight?: string;
  required?: boolean;
  width?: string;
  className?: string;
}

interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleLocationSelect = (latLng: LatLngTuple) => {
    const newLocation = { lat: latLng[0], lng: latLng[1] };
    setLocation(newLocation);
    
    if (onLocationChange) {
      onLocationChange(newLocation);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery + ', Bangladesh'
        )}&limit=5`
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data: SearchResult[] = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching location:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = (result: SearchResult) => {
    const newLocation = { 
      lat: parseFloat(result.lat), 
      lng: parseFloat(result.lon) 
    };
    setLocation(newLocation);
    
    if (onLocationChange) {
      onLocationChange(newLocation);
    }
    
    setShowResults(false);
    setSearchQuery(result.display_name.split(',')[0]); // Set the first part of the address in the search input
  };

  // Click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debounce search
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (searchQuery.trim()) {
      searchTimeout.current = setTimeout(() => {
        handleSearch();
      }, 500);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchQuery]);

  return (
    <div className={`space-y-2 ${className}`} style={{ width }}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div ref={searchContainerRef} className="relative mb-16">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="অবস্থান খুঁজুন (Search location)"
            className="w-full p-2 pl-10 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            onFocus={() => {
              if (searchResults.length > 0) {
                setShowResults(true);
              }
            }}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery('')}
              type="button"
            >
              <FaTimes />
            </button>
          )}
        </div>
        
        {showResults && searchResults.length > 0 && (
          <div 
            ref={resultsRef}
            className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-[1000]"
          >
            {searchResults.map((result) => (
              <button
                key={result.place_id}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-start space-x-2"
                onClick={() => handleSelectSearchResult(result)}
                type="button"
              >
                <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">{result.display_name.split(',')[0]}</p>
                  <p className="text-xs text-gray-500 truncate">{result.display_name}</p>
                </div>
              </button>
            ))}
          </div>
        )}
        
        {isSearching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {showResults && searchResults.length === 0 && searchQuery && !isSearching && (
          <div className="absolute z-[1000] w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3">
            <p className="text-sm text-gray-500">কোন ফলাফল পাওয়া যায়নি। মানচিত্রে ক্লিক করে অবস্থান নির্বাচন করুন।</p>
            <p className="text-xs text-gray-400">No results found. Please click on the map to select location.</p>
          </div>
        )}
      </div>
      
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