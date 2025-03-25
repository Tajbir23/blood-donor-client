'use client'

import { useState, useEffect } from 'react';
import { Division, District, Thana } from '@/lib/types/location';
import { fetchRangpurDivision, fetchDistrict, fetchThana } from '@/lib/api/location-service';

// বিভাগ ফেচ করার হুক
export function useRangpurDivision() {
  const [division, setDivision] = useState<Division | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDivision = async () => {
      try {
        setLoading(true);
        const data = await fetchRangpurDivision();
        setDivision(data);
        setError(null);
      } catch (err) {
        setError('বিভাগের ডাটা লোড করতে সমস্যা হয়েছে');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDivision();
  }, []);

  return { division, loading, error };
}

// জেলা ফেচ করার হুক
export function useDistrict(districtId: string) {
  const [district, setDistrict] = useState<District | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDistrict = async () => {
      try {
        setLoading(true);
        const data = await fetchDistrict(districtId);
        setDistrict(data);
        setError(null);
      } catch (err) {
        setError('জেলার ডাটা লোড করতে সমস্যা হয়েছে');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (districtId) {
      loadDistrict();
    }
  }, [districtId]);

  return { district, loading, error };
}

// থানা ফেচ করার হুক
export function useThana(districtId: string, thanaId: string) {
  const [thana, setThana] = useState<Thana | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadThana = async () => {
      try {
        setLoading(true);
        const data = await fetchThana(districtId, thanaId);
        setThana(data);
        setError(null);
      } catch (err) {
        setError('থানার ডাটা লোড করতে সমস্যা হয়েছে');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (districtId && thanaId) {
      loadThana();
    }
  }, [districtId, thanaId]);

  return { thana, loading, error };
} 