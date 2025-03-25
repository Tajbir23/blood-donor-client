import { rangpurDivisionData } from "@/lib/data/rangpur-division";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest,
  { params }: { params: { districtId: string; thanaId: string } }
) {
  try {
    const { districtId, thanaId } = params;

    // Find the district
    const district = rangpurDivisionData.districts.find(d => d.id === districtId);
    
    if (!district) {
      return NextResponse.json({ error: "District not found" }, { status: 404 });
    }

    // Find the thana
    const thana = district.thanas.find(t => t.id === thanaId);
    
    if (!thana) {
      return NextResponse.json({ error: "Thana not found" }, { status: 404 });
    }

    // Return thana data
    return NextResponse.json({ thana });
  } catch (error) {
    console.error("Error fetching thana data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 