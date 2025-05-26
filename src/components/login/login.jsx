import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./login.css";

const Login = ({ onLogin, onBack }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [view, setView] = useState("login"); // 'login' o 'recovery'
  const [recoveryStep, setRecoveryStep] = useState("email"); // 'email' o 'code'
  const [infoMessage, setInfoMessage] = useState("");

  const handleLogin = () => {
    if (correo === "admin@riesgos.com" && contrasena === "123456") {
      onLogin();
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  const handleRecovery = () => {
    if (!correo) {
      setError("Primero debes ingresar el correo.");
      return;
    }
    setError("");
    setInfoMessage(
      `Se acaba de enviar un correo electrónico con un código de verificación a ${correo}`
    );
    setRecoveryStep("code");
  };

  const handleBack = () => {
    if (view === "recovery") {
      // Si está en recuperación, vuelve al login
      setView("login");
      setRecoveryStep("email");
      setCorreo("");
      setInfoMessage("");
      setError("");
    } else if (onBack) {
      onBack();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <div className="back-icon" onClick={handleBack} title="Volver">
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>

        {view === "login" ? (
          <>
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
            {error && <p className="error">{error}</p>}
            <button onClick={handleLogin}>INGRESAR</button>
            <div className="login-footer">
              <p>
                ¿No tienes cuenta?{" "}
                <span
                  className="login-link"
                  onClick={() =>
                    alert("Ir a registro (aún no implementado)")
                  }
                >
                  Registrarse
                </span>
              </p>
              <p>
                <span
                  className="login-link"
                  onClick={() => {
                    setView("recovery");
                    setCorreo("");
                    setError("");
                    setInfoMessage("");
                    setRecoveryStep("email");
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </span>
              </p>
            </div>
          </>
        ) : (
          <>
            <h2>Recuperación de la cuenta</h2>
            {infoMessage && (
              <p style={{ color: "#38bdf8", marginBottom: "1rem" }}>
                {infoMessage}
              </p>
            )}
            <input
              type={recoveryStep === "email" ? "email" : "text"}
              placeholder={
                recoveryStep === "email"
                  ? "Correo"
                  : "Introduce el código de verificación"
              }
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <button onClick={handleRecovery}>
              {recoveryStep === "email" ? "Siguiente" : "Verificar"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
