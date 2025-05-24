import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./login.css";

const Login = ({ onLogin, onBack }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (correo === "admin@riesgos.com" && contrasena === "123456") {
      onLogin();
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  // Función para volver a Home si no usas React Router
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = "/"; // Cambia "/" por tu ruta home real
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        {/* Icono en esquina izquierda */}
        <div className="back-icon" onClick={handleBack} title="Volver a Home">
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>

        <h2>Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <div className="login-footer">
          <p>
            ¿No tienes cuenta?{" "}
            <span
              className="login-link"
              onClick={() => alert("Ir a registro (aún no implementado)")}
            >
              Registrarse
            </span>
          </p>
          <p>
            <span
              className="login-link"
              onClick={() =>
                alert("Olvidaste tu contraseña (aún no implementado)")
              }
            >
              ¿Olvidaste tu contraseña?
            </span>
          </p>
        </div>
        {error && <p className="error">{error}</p>}
        <button onClick={handleLogin}>INGRESAR</button>
      </div>
    </div>
  );
};

export default Login;
