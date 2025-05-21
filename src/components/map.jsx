import React, { useEffect, useState } from "react";
import { streetData } from "./streetData";

function map({ onStreetSelect }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Verificar si Leaflet ya está disponible
    if (!window.L) {
      // Cargar Leaflet si no está disponible
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
      link.crossOrigin = "";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
      script.crossOrigin = "";
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      // Limpiar el mapa cuando el componente se desmonte
      if (map) {
        map.remove();
      }
    };
  }, []);

  const initializeMap = () => {
    if (document.getElementById("map").innerHTML !== "") {
      return; // El mapa ya está inicializado
    }

    // Inicializar el mapa
    const mapInstance = window.L.map("map").setView([-1.8312, -78.1834], 7);

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(mapInstance);

    // Añadir marcadores para ciudades principales
    const cities = [
      { name: "Quito", lat: -0.1807, lng: -78.4678 },
      { name: "Guayaquil", lat: -2.1709, lng: -79.9223 },
      { name: "Cuenca", lat: -2.9001, lng: -79.0059 },
      { name: "Manta", lat: -0.9676, lng: -80.7089 },
      { name: "Ambato", lat: -1.2486, lng: -78.6192 },
    ];

    cities.forEach((city) => {
      const marker = window.L.marker([city.lat, city.lng]).addTo(mapInstance);
      marker.bindPopup(
        `<b>${city.name}</b><br>Haz clic para ver calles peligrosas`
      );

      marker.on("click", function () {
        // Filtrar calles por ciudad
        let cityStreets = [];
        for (const timeKey in streetData) {
          const streets = streetData[timeKey].filter(
            (s) => s.location === city.name
          );
          cityStreets = [...cityStreets, ...streets];
        }

        if (cityStreets.length > 0) {
          // Mostrar primera calle de esta ciudad
          onStreetSelect(cityStreets[0]);
        }
      });
    });

    // Evento de clic en el mapa para calles aleatorias
    mapInstance.on("click", function () {
      const randomTimeKey = ["morning", "afternoon", "night"][
        Math.floor(Math.random() * 3)
      ];
      const randomStreetIndex = Math.floor(
        Math.random() * streetData[randomTimeKey].length
      );
      const randomStreet = streetData[randomTimeKey][randomStreetIndex];

      onStreetSelect(randomStreet);
    });

    setMap(mapInstance);
  };

  return <div id="map" style={{ height: "100%", width: "100%" }}></div>;
}

export default map;
