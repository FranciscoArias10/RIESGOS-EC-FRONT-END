import React, { useState, useEffect } from "react";
import Login from "./components/login/login";
import Navbar from "./components/UI/Navbar";
import Sidebar from "./components/UI/sidebar";
import Map from "./components/map/map";
import PanicButton from "./components/UI/panicmodal";
import "./index.css";
import Perfil from "./components/perfil/perfil";
function App() {
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [selectedStreet, setSelectedStreet] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [loading, setLoading] = useState(false);
  const [logueado, setLogueado] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [refreshFoto, setRefreshFoto] = useState(false); // NUEVO

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
    setRefreshFoto((prev) => !prev); //  fuerza carga de imagen
  };

  const manejarLogout = () => {
    localStorage.removeItem("logueado");
    setLogueado(false);
    setMostrarPerfil(false);
    setRefreshFoto((prev) => !prev); // reset avatar
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
    setMostrarPerfil(true);
  };

  const cerrarPerfil = () => {
    setMostrarPerfil(false);
  };

  const handlePanicClick = () => {
    alert("¡Botón de pánico presionado!");
  };

  return (
    <div className="main-container relative">
      {/* Modal de Login */}
      {showLoginModal && (
        <div className="login-overlay">
          <Login onLogin={manejarLogin} />
        </div>
      )}

      {/* Modal de Perfil */}
      {mostrarPerfil && (
        <div className="login-overlay">
          <Perfil
            onBack={cerrarPerfil}
            onPerfilActualizado={() => setRefreshFoto((prev) => !prev)} //  para actualizar avatar
          />
        </div>
      )}

      <div
        className={`app-content ${
          showLoginModal || mostrarPerfil ? "blurred" : ""
        }`}
      >
        <Navbar
          onLogout={manejarLogout}
          isLoggedIn={logueado}
          onLoginClick={abrirLoginDesdeMenu}
          onProfileClick={verPerfil}
          refreshFoto={refreshFoto} //  pasamos prop
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

          <div id="map-container" className="bg-gray-500">
            <Map onStreetSelect={handleStreetSelect} />
          </div>
        </div>

        {logueado && !mostrarPerfil && (
          <PanicButton onClick={handlePanicClick} />
        )}
      </div>
    </div>
  );
}

export default App;
