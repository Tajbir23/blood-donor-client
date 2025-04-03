'use client'

import { useState, useEffect, useCallback } from 'react';
import { bangladeshGeoData } from './bangladesh-geo-data';

interface LocationSelectorProps {
  onDivisionChange?: (divisionId: string) => void;
  onDistrictChange: (districtId: string) => void;
  onThanaChange: (thanaId: string, latitude: string, longitude: string) => void;
  defaultDivisionId?: string;
  defaultDistrictId?: string;
  defaultThanaId?: string;
}

export default function LocationSelector({
  onDivisionChange,
  onDistrictChange,
  onThanaChange,
  defaultDivisionId = '',
  defaultDistrictId = '',
  defaultThanaId = ''
}: LocationSelectorProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDivision, setSelectedDivision] = useState<string>(defaultDivisionId);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(defaultDistrictId);
  const [selectedThana, setSelectedThana] = useState<string>(defaultThanaId);
  
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>([]);
  const [thanas, setThanas] = useState<{ id: string; name: string; latitude?: string; longitude?: string }[]>([]);


  // Initial data loading effect
  useEffect(() => {
    setLoading(false);
    
    // Initialize districts if defaultDivisionId is provided
    if (defaultDivisionId) {
      const divisionData = bangladeshGeoData.divisions.find(d => d.id === defaultDivisionId);
      if (divisionData) {
        setDistricts(divisionData.districts);
      }
    }
    
    // Initialize thanas if both defaultDivisionId and defaultDistrictId are provided
    if (defaultDivisionId && defaultDistrictId) {
      const divisionData = bangladeshGeoData.divisions.find(d => d.id === defaultDivisionId);
      if (divisionData) {
        const districtData = divisionData.districts.find(d => d.id === defaultDistrictId);
        if (districtData) {
          setThanas(districtData.thanas);
        }
      }
    }
  }, [defaultDivisionId, defaultDistrictId]); // Run only on mount and prop changes

  // Division change effect - update districts
  useEffect(() => {
    if (!selectedDivision) {
      setDistricts([]);
      return;
    }
    
    const divisionData = bangladeshGeoData.divisions.find(d => d.id === selectedDivision);
    if (divisionData) {
      setDistricts(divisionData.districts);
    } else {
      setDistricts([]);
    }
  }, [selectedDivision]); // Only depend on selectedDivision

  // District change effect - update thanas
  useEffect(() => {
    if (!selectedDivision || !selectedDistrict) {
      setThanas([]);
      return;
    }
    
    const divisionData = bangladeshGeoData.divisions.find(d => d.id === selectedDivision);
    if (divisionData) {
      const districtData = divisionData.districts.find(d => d.id === selectedDistrict);
      if (districtData) {
        setThanas(districtData.thanas);
      } else {
        setThanas([]);
      }
    } else {
      setThanas([]);
    }
  }, [selectedDivision, selectedDistrict]); // Only depend on selected values

  // Handle division changes and reset child selections
  const handleDivisionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDivisionId = e.target.value;
    setSelectedDivision(newDivisionId);
    setSelectedDistrict('');
    setSelectedThana('');
    
    // Call external handlers after state updates
    if (onDivisionChange) onDivisionChange(newDivisionId);
    onDistrictChange('');
    onThanaChange('', '', '');
  }, [onDivisionChange, onDistrictChange, onThanaChange]);

  // Handle district changes and reset thana
  const handleDistrictChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDistrictId = e.target.value;
    setSelectedDistrict(newDistrictId);
    setSelectedThana('');
    
    // Call external handlers after state updates
    onDistrictChange(newDistrictId);
    onThanaChange('', '', '');
  }, [onDistrictChange, onThanaChange]);

  // Handle thana changes
  const handleThanaChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newThanaId = e.target.value;
    setSelectedThana(newThanaId);
    
    // Find the thana to get its coordinates
    const selectedThanaData = thanas.find(thana => thana.id === newThanaId);
    const latitude = selectedThanaData?.latitude || '';
    const longitude = selectedThanaData?.longitude || '';
    
    // Call external handler
    onThanaChange(newThanaId, latitude, longitude);
  }, [onThanaChange, thanas]);

  if (loading) return <p>লোড হচ্ছে...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label htmlFor="division" className="block text-sm font-medium text-gray-700 mb-1">
          বিভাগ
        </label>
        <select
          id="division"
          name="division"
          value={selectedDivision}
          onChange={handleDivisionChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          aria-label="বিভাগ নির্বাচন করুন"
        >
          <option value="">বিভাগ নির্বাচন করুন</option>
          {bangladeshGeoData.divisions.map(division => (
            <option key={division.id} value={division.id}>
              {division.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
          জেলা
        </label>
        <select
          id="district"
          name="district"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          disabled={!selectedDivision}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:text-gray-500"
          aria-label="জেলা নির্বাচন করুন"
        >
          <option value="">জেলা নির্বাচন করুন</option>
          {districts.map(district => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="thana" className="block text-sm font-medium text-gray-700 mb-1">
          থানা
        </label>
        <select
          id="thana"
          name="thana"
          value={selectedThana}
          onChange={handleThanaChange}
          disabled={!selectedDistrict}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:text-gray-500"
          aria-label="থানা নির্বাচন করুন"
        >
          <option value="">থানা নির্বাচন করুন</option>
          {thanas.map(thana => (
            <option key={thana.id} value={thana.id}>
              {thana.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
} 