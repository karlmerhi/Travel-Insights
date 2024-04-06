import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CountryMap = ({ countries, filters }) => {
  const [activeCountries, setActiveCountries] = useState([]);

  const handleCountryClick = (event, feature) => {
    const { properties } = feature;
    const countryName = properties.name;

    if (activeCountries.includes(countryName)) {
      setActiveCountries(activeCountries.filter((country) => country !== countryName));
    } else {
      setActiveCountries([...activeCountries, countryName]);
    }
  };

  const getCountryStyle = (feature) => {
    const { properties } = feature;
    const countryName = properties.name;

    let fillColor = '#ccc';
    if (activeCountries.includes(countryName)) {
      fillColor = '#ff0000'; // Highlight the selected countries
    } else if (filters.some((filter) => properties[filter])) {
      fillColor = '#00ff00'; // Highlight the countries that match the filters
    }

    return {
      fillColor,
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7,
    };
  };

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={countries} style={getCountryStyle} onEachFeature={handleCountryClick} />
    </MapContainer>
  );
};

export default CountryMap;