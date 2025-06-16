import React, { useState } from "react";
import Input from "../UI/Input";
import Botones from "../UI/Botones";
import Card from "../UI/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

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
  const [registroExitoso, setRegistroExitoso] = useState(false); // NUEVO

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
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
        setRegistroExitoso(true); // ✅ Mostrar tarjeta de éxito
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
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            onChange={handleChange}
          />
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
