import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Registro from "../Register/Registro";
import "./login.css";

const Login = ({ onLogin, onBack }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (correo === "admin@riesgos.com" && contrasena === "123456") {
      onLogin();
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = "/";
    }
  };

  if (mostrarRegistro) {
    return <Registro onVolverLogin={() => setMostrarRegistro(false)} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-[#0f1a33] text-white p-4 rounded-3xl w-[90%] max-w-md">
        <button
          onClick={handleBack}
          className="text-white text-xl mb-4 hover:text-pink-400 transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="text-3xl font-bold text-center">INICIAR SESIÓN</h1>
        <p className="text-center text-sm mb-6">para continuar a Riesgos Ec.</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            className="rounded-full p-2 bg-gray-200 text-gray-700 placeholder-gray-500"
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <input
            className="rounded-full p-2 bg-gray-200 text-gray-700 placeholder-gray-500"
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="custom-rounded bg-[#f43f5e] text-white font-semibold py-3 hover:bg-pink-600 transition"
          >
            INGRESAR
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p>
            ¿No tienes cuenta?{" "}
            <span
              className="cursor-pointer text-pink-400 hover:underline"
              onClick={() => setMostrarRegistro(true)}
            >
              Registrarse
            </span>
          </p>
          <p className="mt-2">
            <span
              className="cursor-pointer text-pink-400 hover:underline"
              onClick={() =>
                alert("Olvidaste tu contraseña (aún no implementado)")
              }
            >
              ¿Olvidaste tu contraseña?
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
