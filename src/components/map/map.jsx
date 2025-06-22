import React, { useCallback } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { streetData } from "./streetData";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -1.8312,
  lng: -78.1834,
};

const cities = [
  { name: "Quito", lat: -0.1807, lng: -78.4678 },
  { name: "Guayaquil", lat: -2.1709, lng: -79.9223 },
  { name: "Cuenca", lat: -2.9001, lng: -79.0059 },
  { name: "Manta", lat: -0.9676, lng: -80.7089 },
  { name: "Ambato", lat: -1.2486, lng: -78.6192 },
];

export default function Map({ onStreetSelect }) {
  const handleMapClick = () => {
    const randomTimeKey = ["morning", "afternoon", "night"][
      Math.floor(Math.random() * 3)
    ];
    const streets = streetData[randomTimeKey];
    const randomStreet = streets[Math.floor(Math.random() * streets.length)];
    onStreetSelect(randomStreet);
  };

  const handleCityClick = useCallback(
    (cityName) => {
      let cityStreets = [];
      for (const timeKey in streetData) {
        const streets = streetData[timeKey].filter(
          (s) => s.location === cityName
        );
        cityStreets = [...cityStreets, ...streets];
      }
      if (cityStreets.length > 0) {
        onStreetSelect(cityStreets[0]);
      }
    },
    [onStreetSelect]
  );
  const mapOptions = {
    mapToolbar: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        onClick={handleMapClick}
        options={mapOptions}
        version="weekly"
      >
        {cities.map((city) => (
          <Marker
            key={city.name}
            position={{ lat: city.lat, lng: city.lng }}
            onClick={() => handleCityClick(city.name)}
            title={`Haz clic para ver calles peligrosas en ${city.name}`}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
