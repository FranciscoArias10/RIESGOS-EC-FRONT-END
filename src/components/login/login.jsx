import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Registro from "../Register/Registro";
import "./login.css";

const Login = ({ onLogin, onBack }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [recuperacionPaso, setRecuperacionPaso] = useState(0);
  const [codigo, setCodigo] = useState("");
  const [nuevaPass, setNuevaPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

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

  const handleRecuperacion = (e) => {
    e.preventDefault();
    if (correo.trim() === "") {
      setError("Ingresa tus datos");
    } else {
      setError("");
      setRecuperacionPaso(2);
    }
  };

  const handleCodigo = (e) => {
    e.preventDefault();
    if (codigo.trim() === "") {
      setError("Ingresa tus datos");
    } else {
      setError("");
      setRecuperacionPaso(3);
    }
  };

  const handleNuevaPass = (e) => {
    e.preventDefault();
    if (
      nuevaPass.trim() === "" ||
      confirmPass.trim() === "" ||
      nuevaPass !== confirmPass
    ) {
      setError("Las contraseñas no coinciden o están vacías");
    } else {
      setError("");
      setRecuperacionPaso(4);
      setTimeout(() => {
        window.location.href = "/"; // ir al home
      }, 2000); // 2 segundos antes de redirigir
    }
  };

  if (mostrarRegistro) {
    return <Registro onVolverLogin={() => setMostrarRegistro(false)} />;
  }

  // Vista de éxito
  if (recuperacionPaso === 4) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
        <div className="bg-[#0f1a33] text-white p-6 rounded-3xl text-center w-[90%] max-w-md">
          <h1 className="text-2xl font-bold mb-4">Cambio de contraseña con éxito</h1>
          <FontAwesomeIcon icon={faCheckCircle} className="text-6xl text-pink-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-[#0f1a33] text-white p-4 rounded-3xl w-[90%] max-w-md">
        <button
          onClick={() =>
            recuperacionPaso === 0
              ? handleBack()
              : setRecuperacionPaso(0)
          }
          className="text-white text-xl mb-4 hover:text-pink-400 transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        {recuperacionPaso === 0 && (
          <>
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
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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
                  onClick={() => setRecuperacionPaso(1)}
                >
                  ¿Olvidaste tu contraseña?
                </span>
              </p>
            </div>
          </>
        )}

        {recuperacionPaso === 1 && (
          <>
            <h1 className="text-2xl font-bold text-center mb-2">
              Recuperación de la cuenta
            </h1>
            <p className="text-center text-sm mb-4">
              Ingresa tu correo electrónico para recuperar la cuenta
            </p>
            <form onSubmit={handleRecuperacion} className="flex flex-col gap-4">
              <input
                className="rounded-full p-2 bg-gray-200 text-gray-700 placeholder-gray-500"
                type="email"
                placeholder="Introduce tu correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button
                type="submit"
                className="custom-rounded bg-[#f43f5e] text-white font-semibold py-3 hover:bg-pink-600 transition"
              >
                Siguiente
              </button>
            </form>
          </>
        )}

        {recuperacionPaso === 2 && (
          <>
            <h1 className="text-2xl font-bold text-center mb-2">
              Recuperación de la cuenta
            </h1>
            <p className="text-center text-sm text-green-400 mb-2">
              Se acaba de enviar un correo con el código de verificación
            </p>
            <form onSubmit={handleCodigo} className="flex flex-col gap-4">
              <input
                className="rounded-full p-2 bg-gray-200 text-gray-700 placeholder-gray-500"
                type="text"
                placeholder="Introduce el código de verificación"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button
                type="submit"
                className="custom-rounded bg-[#f43f5e] text-white font-semibold py-3 hover:bg-pink-600 transition"
              >
                Siguiente
              </button>
            </form>
          </>
        )}

        {recuperacionPaso === 3 && (
          <>
            <h1 className="text-2xl font-bold text-center mb-2">
              Recuperación de la cuenta
            </h1>
            <p className="text-center text-sm mb-2">
              Introduce la nueva contraseña dos veces, cumpliendo con las siguientes
              restricciones:
            </p>
            <ul className="text-sm list-disc list-inside mb-2">
              <li>Al menos una mayúscula A-Z</li>
              <li>Al menos un número 0-9</li>
            </ul>
            <form onSubmit={handleNuevaPass} className="flex flex-col gap-4">
              <input
                className="rounded-full p-2 bg-gray-200 text-gray-700 placeholder-gray-500"
                type="password"
                placeholder="Nueva contraseña"
                value={nuevaPass}
                onChange={(e) => setNuevaPass(e.target.value)}
              />
              <input
                className="rounded-full p-2 bg-gray-200 text-gray-700 placeholder-gray-500"
                type="password"
                placeholder="Confirmar nueva contraseña"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button
                type="submit"
                className="custom-rounded bg-[#f43f5e] text-white font-semibold py-3 hover:bg-pink-600 transition"
              >
                Cambiar contraseña
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
