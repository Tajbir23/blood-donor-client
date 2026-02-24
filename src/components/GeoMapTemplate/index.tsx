'use client';

import dynamic from 'next/dynamic';
import type { MapComponentProps } from './MapComponent';

// Dynamically import the map to avoid SSR — Leaflet is browser-only
const GeoMapTemplate = dynamic<MapComponentProps>(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full bg-gray-100 rounded-lg flex items-center justify-center"
      style={{ height: '500px' }}
    >
      <p className="text-gray-500">ম্যাপ লোড হচ্ছে...</p>
    </div>
  ),
});

export type { MapComponentProps as GeoMapTemplateProps };
export default GeoMapTemplate;
