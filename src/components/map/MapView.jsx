import { useEffect, useRef } from "react";
import L from "leaflet";

export default function MapView({ onStreetSelect }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([-1.8312, -78.1834], 7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    // DEMO: click para simular calle seleccionada
    map.on("click", () => {
      const street = {
        name: "Av. Amazonas",
        location: "Quito",
        risk: 85,
        incidents: [10, 15, 20, 18, 22, 25],
      };
      onStreetSelect(street);
    });

    return () => {
      map.remove();
    };
  }, [onStreetSelect]);

  return (
    <div id="map" ref={mapRef} style={{ height: "100%", width: "100%" }} />
  );
}
