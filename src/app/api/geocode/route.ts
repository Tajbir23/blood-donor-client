import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q) {
        return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
    }

    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5`;

        const response = await fetch(url, {
            headers: {
                // Nominatim requires a User-Agent header identifying the application
                'User-Agent': 'BloodDonorBangladesh/1.0 (studenttajbirislam@gmail.com)',
                'Accept-Language': 'bn,en',
            },
            next: { revalidate: 60 }, // cache geocode results for 60 seconds
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Geocode request failed' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('[Geocode] Nominatim proxy error:', error);
        return NextResponse.json({ error: 'Failed to fetch geocode data' }, { status: 500 });
    }
}
