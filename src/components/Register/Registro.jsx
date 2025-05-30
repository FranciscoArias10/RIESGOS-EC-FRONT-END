import React, { useState } from "react";
import Input from "../UI/Input";
import Botones from "../UI/Botones";
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

        <form  onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input type='text' name='nombre' placeholder='Ingresa tu nombre' onChange={handleChange}/>

          <Input type="text" name="apellido" placeholder="Ingresa tu apellido" onChange={handleChange}/>

          <Input type='email' name='correo' placeholder='Ingresa correo electronico' onChange={handleChange}/>

          <Input type='password' name='contraseña' placeholder='Ingresa contraseña' onChange={handleChange}/>

          <Input type='password' name='Confirmar_contraseña' placeholder='Confirma tu contraseña' onChange={handleChange}/>

          <Input label='fecha de nacimiento' type='date' onChange={handleChange}/>

          <Input type='text' name='calle' placeholder='Ingresa la calle donde vives' onChange={handleChange}/>

          <Botones >Registrarse</Botones>
        </form>
      </div>
    </div>
  );
};

export default Registro;
