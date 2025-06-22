// Importaciones
import React, { useState } from "react";
import Input from "../UI/Input";
import Botones from "../UI/Botones";
import Card from "../UI/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheckCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const Registro = ({ onVolverLogin }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    fecha_nac: "",
    calle: "",
  });

  const [error, setError] = useState("");
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(""); // 👈 para mostrar mensaje personalizado

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");

    // Validación de contraseña mientras escribe
    if (name === "password") {
      validarContrasena(value);
    }
  };

  const validarContrasena = (password) => {
    if (password.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres");
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Debe incluir al menos una letra mayúscula");
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Debe incluir al menos una letra minúscula");
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Debe incluir al menos un número");
    } else {
      setPasswordError(""); // ✔️ segura
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (passwordError) {
      setError("La contraseña no es segura");
      return;
    }

    const datos = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
      fecha_nac: formData.fecha_nac,
      calle: formData.calle,
    };

    try {
      const response = await fetch("http://localhost:8000/api/registro/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      const data = await response.json();

      if (response.ok) {
        setRegistroExitoso(true);
        setTimeout(() => {
          setRegistroExitoso(false);
          onVolverLogin();
        }, 2000);
      } else {
        setError(data.error || "Ocurrió un error al registrarse");
      }
    } catch (error) {
      setError("No se pudo conectar con el servidor");
    }
  };

  if (registroExitoso) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
        <Card>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Registro exitoso
          </h1>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-6xl text-pink-500 block mx-auto"
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-[#0f1a33] text-white p-4 rounded-3xl w-[90%] max-w-md">
        <button
          onClick={onVolverLogin}
          className="text-white text-xl mb-4 hover:text-pink-400 transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="text-3xl font-bold text-center">REGÍSTRATE</h1>
        <p className="text-center text-sm mb-6">para continuar a Riesgos Ec.</p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            name="first_name"
            placeholder="Nombre"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="last_name"
            placeholder="Apellido"
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            onChange={handleChange}
          />

          {/* Contraseña */}
          {/* Contraseña */}
          <div>
            <div className="relative">
              <Input
                type={mostrarPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                onChange={handleChange}
                className="w-full pr-12 rounded-full p-2 bg-gray-200 text-gray-700 placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <FontAwesomeIcon
                  icon={mostrarPassword ? faEyeSlash : faEye}
                  style={{ color: "#000000" }}
                />
              </button>
            </div>

            {/* Mensaje de error fuera del contenedor relative para no afectar el botón */}
            {passwordError && (
              <p className="text-red-500 text-xs mt-1 pl-2">{passwordError}</p>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div className="relative">
            <Input
              type={mostrarConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              onChange={handleChange}
              className="w-full pr-12 rounded-full p-2 bg-gray-200 text-gray-700 placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => setMostrarConfirmPassword(!mostrarConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              <FontAwesomeIcon
                icon={mostrarConfirmPassword ? faEyeSlash : faEye}
                style={{ color: "#000000" }}
              />
            </button>
          </div>

          <Input
            type="date"
            name="fecha_nac"
            label="Fecha de nacimiento"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="calle"
            placeholder="Calle de residencia"
            onChange={handleChange}
          />
          <Botones type="submit">Registrarse</Botones>
        </form>
      </div>
    </div>
  );
};

export default Registro;
