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
    let ignore = false;

    const loadDivision = async () => {
      try {
        setLoading(true);
        const data = await fetchRangpurDivision();
        if (!ignore) {
          setDivision(data);
          setError(null);
        }
      } catch {
        if (!ignore) {
          setError('বিভাগের ডাটা লোড করতে সমস্যা হয়েছে');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadDivision();
    return () => { ignore = true; };
  }, []);

  return { division, loading, error };
}

// জেলা ফেচ করার হুক
export function useDistrict(districtId: string) {
  const [district, setDistrict] = useState<District | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!districtId) {
      setDistrict(null);
      setLoading(false);
      return;
    }

    let ignore = false;

    const loadDistrict = async () => {
      try {
        setLoading(true);
        const data = await fetchDistrict(districtId);
        if (!ignore) {
          setDistrict(data);
          setError(null);
        }
      } catch {
        if (!ignore) {
          setError('জেলার ডাটা লোড করতে সমস্যা হয়েছে');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadDistrict();
    return () => { ignore = true; };
  }, [districtId]);

  return { district, loading, error };
}

// থানা ফেচ করার হুক
export function useThana(districtId: string, thanaId: string) {
  const [thana, setThana] = useState<Thana | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!districtId || !thanaId) {
      setThana(null);
      setLoading(false);
      return;
    }

    let ignore = false;

    const loadThana = async () => {
      try {
        setLoading(true);
        const data = await fetchThana(districtId, thanaId);
        if (!ignore) {
          setThana(data);
          setError(null);
        }
      } catch {
        if (!ignore) {
          setError('থানার ডাটা লোড করতে সমস্যা হয়েছে');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadThana();
    return () => { ignore = true; };
  }, [districtId, thanaId]);

  return { thana, loading, error };
} 