import { NextResponse } from 'next/server';

// এই ডাটাটি আসলে ডাটাবেস থেকে আসবে
const hospitalData = [
  { id: 'kgh', name: 'কুড়িগ্রাম জেনারেল হাসপাতাল', districtId: 'kurigram', thanaId: 'kurigram-sadar' },
  { id: 'kmch', name: 'কুড়িগ্রাম মেডিকেল কলেজ হাসপাতাল', districtId: 'kurigram', thanaId: 'kurigram-sadar' },
  { id: 'uph', name: 'উলিপুর হাসপাতাল', districtId: 'kurigram', thanaId: 'ulipur' },
  { id: 'chh', name: 'চিলমারী হাসপাতাল', districtId: 'kurigram', thanaId: 'chilmari' },
  { id: 'rh', name: 'রাজারহাট হাসপাতাল', districtId: 'kurigram', thanaId: 'rajarhat' },
  { id: 'nh', name: 'নাগেশ্বরী হাসপাতাল', districtId: 'kurigram', thanaId: 'nageshwari' },
  { id: 'bh', name: 'ভুরুঙ্গামারী হাসপাতাল', districtId: 'kurigram', thanaId: 'bhurungamari' },
  { id: 'ph', name: 'ফুলবাড়ী হাসপাতাল', districtId: 'kurigram', thanaId: 'phulbari' },
  { id: 'roh', name: 'রৌমারী হাসপাতাল', districtId: 'kurigram', thanaId: 'roumari' },
  { id: 'crh', name: 'চর রাজিবপুর হাসপাতাল', districtId: 'kurigram', thanaId: 'char-rajibpur' },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const districtId = searchParams.get('districtId');
  const thanaId = searchParams.get('thanaId');
  
  let filteredHospitals = [...hospitalData];
  
  if (districtId) {
    filteredHospitals = filteredHospitals.filter(h => h.districtId === districtId);
  }
  
  if (thanaId) {
    filteredHospitals = filteredHospitals.filter(h => h.thanaId === thanaId);
  }
  
  // সিমুলেটেড ডিলে
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(filteredHospitals);
} 