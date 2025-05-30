import React, { useState, useEffect } from "react";
import Login from "./components/login/login";
import Navbar from "./components/UI/Navbar";
import Sidebar from "./components/UI/sidebar";
import Map from "./components/map/map";
import PanicButton from "./components/UI/panicmodal";
import "./index.css";

function App() {
  const [selectedStreet, setSelectedStreet] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [loading, setLoading] = useState(false);
  const [logueado, setLogueado] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const yaLogueado = localStorage.getItem("logueado");
    if (yaLogueado === "true") {
      setLogueado(true);
    }
  }, []);

  const manejarLogin = () => {
    localStorage.setItem("logueado", "true");
    setLogueado(true);
    setShowLoginModal(false);
  };

  const manejarLogout = () => {
    localStorage.removeItem("logueado");
    setLogueado(false);
  };

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

  const handlePanicClick = () => {
    alert("¡Botón de pánico presionado!");
    // Aquí puedes agregar tu lógica para manejar el reporte
  };

  return (
    <div className="main-container relative">
      {showLoginModal && (
        <div className="login-overlay">
          <Login onLogin={manejarLogin} />
        </div>
      )}

      <div className={`app-content ${showLoginModal ? "blurred" : ""}`}>
        <Navbar
          onLogout={manejarLogout}
          isLoggedIn={logueado}
          onLoginClick={abrirLoginDesdeMenu}
          onProfileClick={verPerfil}
        />

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
          </div>
        </div>

        {logueado && (
          <PanicButton onClick={handlePanicClick} />
        )}
      </div>
    </div>
  );
}

export default App;
