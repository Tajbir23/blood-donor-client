import { rangpurDivisionData } from "@/lib/data/rangpur-division";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const districtId = searchParams.get('districtId');
    const thanaId = searchParams.get('thanaId');

    if (!districtId || !thanaId) {
      return Response.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Find the district
    const district = rangpurDivisionData.districts.find(d => d.id === districtId);
    
    if (!district) {
      return Response.json(
        { error: "District not found" },
        { status: 404 }
      );
    }

    // Find the thana
    const thana = district.thanas.find(t => t.id === thanaId);
    
    if (!thana) {
      return Response.json(
        { error: "Thana not found" },
        { status: 404 }
      );
    }

    // Return thana data
    return Response.json({
      success: true,
      data: thana
    });
  } catch (error) {
    console.error("Error fetching thana data:", error);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
} 