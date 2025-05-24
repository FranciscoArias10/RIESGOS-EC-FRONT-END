import React, { useState, useEffect } from "react";
import Login from "./components/login/login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar";
import Map from "./components/map";
import PanicButton from "./components/panicmodal";
import "./index.css";
import Registro from './components/Registro';

function App() {
  const [selectedStreet, setSelectedStreet] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleStreetSelect = (street) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedStreet(street);
      setLoading(false);
    }, 800);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const abrirLoginDesdeMenu = () => {
    setShowLoginModal(true);
  };

  const verPerfil = () => {
    alert("Funcionalidad de 'Ver Perfil' aún no implementada.");
  };

  return (
    <div className="main-container">
      <Navbar />

        <div className="content-area">
          {loading && (
            <div className="loading-overlay" id="loadingOverlay">
              <div className="loader"></div>
            </div>
          )}

          <button className="mobile-toggle" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </button>

          {showSidebar && (
            <Sidebar
              selectedStreet={selectedStreet}
              onStreetSelect={handleStreetSelect}
            />
          )}

          <div id="map-container" className="bg-red-500">
            <Map onStreetSelect={handleStreetSelect} />
            <div className="date-indicator">
              <i className="fas fa-calendar-alt"></i>{" "}
              <span>{new Date().toLocaleDateString("es-ES")}</span>
              <span className="data-update-badge">
                <i className="fas fa-sync-alt"></i> Actualizado
              </span>
            </div>
          </div>
        </div>

      <PanicButton
        onReportSubmit={(risk) => {
          if (selectedStreet) {
            setSelectedStreet({ ...selectedStreet, risk });
          }
        }}
      />
    </div>
  );
}

export default App;
