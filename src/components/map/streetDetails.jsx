import React, { useEffect, useState } from "react";
import IncidentsChart from "../charts/Incidentschart";

function StreetDetails({ street }) {
  const [riskFactors, setRiskFactors] = useState([]);

  useEffect(() => {
    // Genera factores de riesgo aleatorios para la calle seleccionada
    const riskFactorsList = [
      "Asaltos frecuentes",
      "Iluminación deficiente",
      "Alta congestión",
      "Falta de presencia policial",
      "Cruces peligrosos",
      "Zonas inseguras cercanas",
      "Poca visibilidad en la noche",
      "Accidentes frecuentes",
      "Vandalismo",
      "Robos a transeúntes",
    ];

    // Genera entre 3 y 5 factores de riesgo aleatorios
    const numFactors = Math.floor(Math.random() * 3) + 3;
    const shuffled = [...riskFactorsList].sort(() => 0.5 - Math.random());
    const selectedFactors = shuffled.slice(0, numFactors);

    setRiskFactors(selectedFactors);
  }, [street.name]); // Re-generar cuando cambia la calle

  return (
    <div id="streetDetails">
      <h4 className="mb-3">{street.name}</h4>
      <p>
        <strong>Ubicación:</strong> <span>{street.location}</span>
      </p>
      <p>
        <strong>Índice de Peligrosidad:</strong>
      </p>
      <div className="danger-meter">
        <div className="danger-fill" style={{ width: `${street.risk}%` }}></div>
      </div>
      <div className="d-flex justify-content-between">
        <span>Seguro</span>
        <span>{street.risk}%</span>
        <span>Peligroso</span>
      </div>
      <div className="mt-3">
        <p>
          <strong>Factores de riesgo:</strong>
        </p>
        <ul className="list-group">
          {riskFactors.map((factor, index) => (
            <li key={index} className="list-group-item">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {factor}
            </li>
          ))}
        </ul>
      </div>
      <div className="chart-container mt-3">
        <IncidentsChart incidents={street.incidents} />
      </div>
    </div>
  );
}

export default StreetDetails;
