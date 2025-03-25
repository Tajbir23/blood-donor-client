import { LatLngTuple } from 'leaflet';

export interface MapComponentProps {
  selectedLocation: { lat: number; lng: number } | null;
  onLocationSelect: (location: LatLngTuple) => void;
}

declare const MapComponent: React.FC<MapComponentProps>;
export default MapComponent; 