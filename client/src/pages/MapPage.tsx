import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import { useState } from 'react';

const containerStyle = { width: '100%', height: '100%' };

// Phoenix default while we wait for geolocation
const defaultCenter = { lat: 33.4484, lng: -112.0740 };

export default function MapPage() {
  // 1) load Maps JS API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // 2) replace center with actual user position if allowed
  const [center, setCenter] = useState(defaultCenter);
  navigator.geolocation.getCurrentPosition(
    (pos) =>
      setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
    () => {} // ignore denied
  );

  if (loadError) return <p className="p-4 text-red-600">Map failed to load.</p>;
  if (!isLoaded) return <p className="p-4">Loading Google Maps…</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={{ disableDefaultUI: true }}
    >
      {/** children markers/components later */}
    </GoogleMap>
  );
}
