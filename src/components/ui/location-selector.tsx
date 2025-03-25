'use client'

import { useState, useEffect } from 'react';
import { useRangpurDivision } from '@/hooks/useLocation';

interface LocationSelectorProps {
  onDistrictChange: (districtId: string) => void;
  onThanaChange: (thanaId: string) => void;
  defaultDistrictId?: string;
  defaultThanaId?: string;
}

export default function LocationSelector({
  onDistrictChange,
  onThanaChange,
  defaultDistrictId,
  defaultThanaId
}: LocationSelectorProps) {
  const { division, loading, error } = useRangpurDivision();
  const [selectedDistrict, setSelectedDistrict] = useState<string>(defaultDistrictId || '');
  const [selectedThana, setSelectedThana] = useState<string>(defaultThanaId || '');
  const [thanas, setThanas] = useState<{ id: string; name: string }[]>([]);

  // জেলা পরিবর্তন হলে থানা আপডেট করে
  useEffect(() => {
    if (division && selectedDistrict) {
      const district = division.districts.find(d => d.id === selectedDistrict);
      if (district) {
        setThanas(district.thanas);
        if (!district.thanas.some(t => t.id === selectedThana)) {
          setSelectedThana('');
          onThanaChange('');
        }
      }
    }
  }, [division, selectedDistrict, selectedThana, onThanaChange]);

  // জেলা পরিবর্তন হ্যান্ডলার
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDistrictId = e.target.value;
    setSelectedDistrict(newDistrictId);
    onDistrictChange(newDistrictId);
    setSelectedThana('');
    onThanaChange('');
  };

  // থানা পরিবর্তন হ্যান্ডলার
  const handleThanaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newThanaId = e.target.value;
    setSelectedThana(newThanaId);
    onThanaChange(newThanaId);
  };

  if (loading) return <p>লোড হচ্ছে...</p>;
  if (error) return <p className="text-red-500">ত্রুটি: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
          জেলা
        </label>
        <select
          id="district"
          name="district"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          aria-label="জেলা নির্বাচন করুন"
        >
          <option value="">জেলা নির্বাচন করুন</option>
          {division?.districts.map(district => (
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