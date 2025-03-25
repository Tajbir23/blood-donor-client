import { rangpurDivisionData } from '@/lib/data/rangpur-division';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(rangpurDivisionData);
} 