// WorldMap.js
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './WorldMap.css'; // Import CSS file for styling

const WorldMap = () => {
  return (
    <div className="map-container">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        maxZoom={5}
        className="map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};

export default WorldMap;
