import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import './WorldMap.css';

const containerStyle = {
  width: '80vw',
  height: '70vh',
  margin: 'auto'
};

const center = {
  lat: 20.397,
  lng: 0.644,
};

const customMapStyle = [
  // Your style JSON array goes here
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  // Add the rest of your style configuration
];


function WorldMap() {

  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [minZoom, setMinZoom] = useState(3);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey="AIzaSyD2MDobUzEQwFKWWrM-iZMjK_N6ah1Ms_I",
    libraries: ["visualization"],
  });

  const onLoad = map => {

    setMap(mapInstance);

    // Load GeoJSON data for countries
    map.data.loadGeoJson('URL_TO_YOUR_GEOJSON_DATA');

    // Apply conditional styling
    map.data.setStyle(feature => {
      const countryName = feature.getProperty('name');
      // Custom filter condition
      const isHighlighted = yourCustomFilterFunction(countryName);
      
      return {
        fillColor: isHighlighted ? '#FF0000' : '#00FF00', // Red for highlighted, green otherwise
        strokeWeight: 1,
        fillOpacity: 0.5,
      };
    });
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const updateZoom = () => {
      const width = window.innerWidth;
      let newMinZoom = 1;
      if (width < 768) {
        newMinZoom = 1;
      } else if (width >= 768 && width < 1024) {
        newMinZoom = 1;
      } else {
        newMinZoom = 1;
      }
      setMinZoom(newMinZoom);

      // Check if the map's current zoom is less than the new minimum zoom
      if (map && map.getZoom() < newMinZoom) {
        map.setZoom(newMinZoom);
      }
    };

    updateZoom();
    window.addEventListener('resize', updateZoom);

    return () => window.removeEventListener('resize', updateZoom);
  }, [map]); // Depend on 'map' to ensure it's available



  const options = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    keyboardShortcuts: false,
    minZoom,
    styles: customMapStyle,
    mapId: "20544202a17faec",
    restriction: {
      latLngBounds: {
        north: 85,
        south: -55,
        east: 170,
        west: -170,
      },
      strictBounds: true,
    },
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyD2MDobUzEQwFKWWrM-iZMjK_N6ah1Ms_I" // Replace with your Google Maps API key
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={1}
        onLoad={onLoad}
        options={options}
        ref={mapRef}
      >
        <Marker position={center} clickable={true} >
          {/* Custom InfoWindow */}
          <InfoWindow position={center}>
            <div>
              <h3>Location Title</h3>
              <p>Description of the location.</p>
              {/* Custom content without "View on Google Maps" link */}
            </div>
          </InfoWindow>
        </Marker>
        {/* Child components, like markers, info windows, etc. */}
      </GoogleMap>
    </LoadScript>
  );
}

// Example of a custom filter function
function yourCustomFilterFunction(countryName) {
  // Implement your filtering logic here
  // For example, return true if the country should be highlighted based on your criteria
  return countryName === 'United States'; // Example: Highlight the United States
}

export default React.memo(WorldMap);
