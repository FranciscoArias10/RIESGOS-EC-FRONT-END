import React, { useState } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Map from "./components/map";
import PanicButton from "./components/panicmodal";
import "./index.css";

function App() {
  const [selectedStreet, setSelectedStreet] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleStreetSelect = (street) => {
    setLoading(true);
    // Simular tiempo de carga
    setTimeout(() => {
      setSelectedStreet(street);
      setLoading(false);
    }, 800);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
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
