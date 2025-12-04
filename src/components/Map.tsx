import { useState, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { useTheme } from "next-themes";
import logo from "@/assets/logo.png";

const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: 9.05795,
  lng: 7.47214,
};

// This is the JSON style object you copied from the Styling Wizard
const darkMapStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#d59563" }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#d59563" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{ "color": "#263c3f" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#6b9a76" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#38414e" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [{ "color": "#212a37" }]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#9ca5b3" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{ "color": "#746855" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{ "color": "#1f2835" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#f3d19c" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#17263c" }]
  }
];

export function Map() {
  const { theme } = useTheme();
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // If no key or something is wrong, just show a nice message
  if (!apiKey) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Map integration coming soon, in shaa Allah.
      </div>
    );
  }

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const mapOptions = useMemo(() => ({
    disableDefaultUI: true,
    zoomControl: true,
    styles: theme === "dark" ? darkMapStyle : []
  }), [theme]);

  if (loadError) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Map is temporarily unavailable. We’ll fix this soon, in shaa Allah.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="p-4 text-sm text-muted-foreground">Loading map…</div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      options={mapOptions}
    >
      <MarkerF
        position={center}
        title="Az-Zaudah Academy"
        onClick={() => setInfoWindowOpen(true)}
        icon={{
          url: logo,
          scaledSize: new window.google.maps.Size(40, 40),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(20, 20),
        }}
      />

      {infoWindowOpen && (
        <InfoWindowF
          position={center}
          onCloseClick={() => setInfoWindowOpen(false)}
        >
          <div>
            <h3 className="font-semibold text-sm">Az-Zaudah Academy</h3>
            <p className="m-0 text-xs">
              20 Gwani str, Zone 4, Wuse, Abuja, Nigeria
            </p>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}