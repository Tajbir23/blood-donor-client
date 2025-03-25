import { rangpurDivisionData } from '@/lib/data/rangpur-division';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { districtId: string } }
) {
  const districtId = params.districtId;
  
  const district = rangpurDivisionData.districts.find(
    district => district.id === districtId
  );
  
  if (!district) {
    return NextResponse.json(
      { error: "জেলা পাওয়া যায়নি" },
      { status: 404 }
    );
  }
  
  return NextResponse.json(district);
} 