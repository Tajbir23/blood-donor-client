import { Division, District, Thana } from '@/lib/types/location';

// API URL এর বেইস পাথ
const API_BASE_PATH = '/api/rangpur-division';

/**
 * রংপুর বিভাগের সকল জেলা এবং থানার ডাটা ফেচ করে
 */
export async function fetchRangpurDivision(): Promise<Division> {
  const response = await fetch(API_BASE_PATH);
  
  if (!response.ok) {
    throw new Error('বিভাগের ডাটা লোড করতে সমস্যা হয়েছে');
  }
  
  return response.json();
}

/**
 * নির্দিষ্ট জেলার ডাটা ফেচ করে
 * @param districtId - জেলার আইডি
 */
export async function fetchDistrict(districtId: string): Promise<District> {
  const response = await fetch(`${API_BASE_PATH}/${districtId}`);
  
  if (!response.ok) {
    throw new Error('জেলার ডাটা লোড করতে সমস্যা হয়েছে');
  }
  
  return response.json();
}

/**
 * নির্দিষ্ট থানার ডাটা ফেচ করে
 * @param districtId - জেলার আইডি
 * @param thanaId - থানার আইডি
 */
export async function fetchThana(districtId: string, thanaId: string): Promise<Thana> {
  const response = await fetch(`${API_BASE_PATH}/${districtId}/${thanaId}`);
  
  if (!response.ok) {
    throw new Error('থানার ডাটা লোড করতে সমস্যা হয়েছে');
  }
  
  return response.json();
} 