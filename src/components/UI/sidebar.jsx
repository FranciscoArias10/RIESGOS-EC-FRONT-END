import React, { useState } from "react";
import StreetDetails from "../map/streetDetails";
import TopDangerousList from "../map/topdangerouslist";
import { streetData } from "../map/streetData";

function sidebar({ selectedStreet, onStreetSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("morning");

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim() === "") return;

    // Buscar en todos los tiempos del día
    let foundStreet = null;

    for (const time in streetData) {
      const found = streetData[time].find((street) =>
        street.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (found) {
        foundStreet = found;
        break;
      }
    }

    if (foundStreet) {
      onStreetSelect(foundStreet);
    } else {
      // Crear una calle falsa para demo
      const fakeStreet = {
        name: searchTerm,
        location: "Ecuador",
        risk: Math.floor(Math.random() * 70) + 30,
        incidents: [
          Math.floor(Math.random() * 10) + 5,
          Math.floor(Math.random() * 10) + 5,
          Math.floor(Math.random() * 10) + 5,
          Math.floor(Math.random() * 10) + 5,
          Math.floor(Math.random() * 10) + 5,
          Math.floor(Math.random() * 10) + 5,
        ],
      };

      onStreetSelect(fakeStreet);
    }
  };

  return (
    <div className="sidebar">
      <div className="search-box">
        <h5>
          <i className="fas fa-search me-2"></i>Buscar Calle
        </h5>
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex">
            <input
              type="text"
              className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Nombre de la calle"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-r-md transition-colors flex items-center justify-center"
            >
              <i className="fas fa-search mr-1"></i>
            </button>
          </div>
        </form>

        <div className="form-text text-light">
          Escribe el nombre de una calle para conocer su índice de peligrosidad.
        </div>
      </div>

      <div className="street-info">
        <h5>
          <i className="fas fa-info-circle me-2"></i>Información de la Calle
        </h5>
        {selectedStreet ? (
          <StreetDetails street={selectedStreet} />
        ) : (
          <div id="noStreetSelected">
            <p>
              Selecciona una calle en el mapa o busca por nombre para ver su
              información.
            </p>
          </div>
        )}
      </div>

      <div className="top-dangerous">
        <h5>
          <i className="fas fa-exclamation-triangle me-2"></i>Top 10 Calles Más
          Peligrosas
        </h5>
        <div className="time-filter">
          {["morning", "afternoon", "night"].map((time) => (
            <div
              key={time}
              className={`time-btn ${timeOfDay === time ? "active" : ""}`}
              onClick={() => setTimeOfDay(time)}
            >
              {time === "morning"
                ? "Mañana"
                : time === "afternoon"
                ? "Tarde"
                : "Noche"}
            </div>
          ))}
        </div>
        <TopDangerousList
          streets={streetData[timeOfDay]}
          onStreetSelect={onStreetSelect}
          timeOfDay={timeOfDay}
        />
      </div>
    </div>
  );
}

export default sidebar;
