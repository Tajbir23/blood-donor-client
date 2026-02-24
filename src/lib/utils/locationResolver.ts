import { rangpurDivisionData } from '@/lib/data/rangpur-division';

/**
 * Server-side location resolution from static data.
 * No API calls — directly reads from the bundled rangpur-division data.
 */

export function getDistrictName(districtId: string): string | null {
    if (!districtId) return null;
    const district = rangpurDivisionData.districts.find(d => d.id === districtId);
    return district?.name || null;
}

export function getThanaName(districtId: string, thanaId: string): string | null {
    if (!districtId || !thanaId) return null;
    const district = rangpurDivisionData.districts.find(d => d.id === districtId);
    if (!district) return null;
    const thana = district.thanas.find(t => t.id === thanaId);
    return thana?.name || null;
}

export function getLocationString(districtId: string, thanaId: string): string {
    const district = getDistrictName(districtId);
    const thana = getThanaName(districtId, thanaId);
    if (thana && district) return `${thana}, ${district}`;
    if (district) return district;
    return '';
}
