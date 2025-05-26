import React, { useState } from "react";

const Registro = ({ onVolverLogin }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
    ingresafechanac: "",
    calle: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.contrasena !== formData.confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }
    alert("¡Registro exitoso!");
    console.log(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-[#0f1a33] text-white p-4 rounded-3xl w-[90%] max-w-md">
        <button
          onClick={onVolverLogin}
          className="text-white text-xl mb-4 hover:text-pink-400 transition"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1 className="text-3xl font-bold text-center">REGÍSTRATE</h1>
        <p className="text-center text-sm mb-6">para continuar a Riesgos Ec.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="rounded-full p-2 bg-gray-200 text-gray-700 placeholder-gray-500"
            type="text"
            name="nombre"
            placeholder="Ingresa tu nombre"
            onChange={handleChange}
          />
          <input
            className="rounded-full p-2 bg-gray-200 text-gray-700 placeholder-gray-500"
            type="text"
            name="apellido"
            placeholder="Ingresa tu apellido"
            onChange={handleChange}
          />
          <input
            className="rounded-full p-2 bg-gray-200 text-gray-700 placeholder-gray-500"
            type="email"
            name="correo"
            placeholder="Ingresar correo electronico"
            onChange={handleChange}
          />
          <input
            className="rounded-full p-2 bg-gray-200 text-gray-700 placeholder-gray-500"
            type="password"
            name="contrasena"
            placeholder="Ingresar contraseña"
            onChange={handleChange}
          />
          <input
            className="rounded-full p-2 bg-gray-200 text-gray-700 placeholder-gray-500"
            type="password"
            name="confirmarContrasena"
            placeholder="Confirmar contraseña"
            onChange={handleChange}
          />
          <input
            className="rounded-full p-2 bg-gray-200 text-gray-700 placeholder-gray-500"
            type="date"
            name="ingresafechanac"
            placeholder="Fecha de nacimiento : DD/MM/AA"
            onChange={handleChange}
          />
          <input
            className="rounded-full p-2 bg-gray-200 text-gray-700 placeholder-gray-500"
            type="text"
            name="calle"
            placeholder="Ingresa la calle donde vives "
            onChange={handleChange}
          />

          <button
            type="submit"
            className="custom-rounded bg-[#f43f5e] text-white font-semibold py-3 hover:bg-pink-600 transition"
          >
            REGISTRARSE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
