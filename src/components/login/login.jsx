import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Registro from "../Register/Registro";
import Input from "../UI/Input";
import Botones from "../UI/Botones";
import Card from "../UI/Card";  

const Login = ({ onLogin, onBack }) => {
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
    codigo: "",
    nuevaPass: "",
    confirmPass: "",
  });
  const [error, setError] = useState("");
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [recuperacionPaso, setRecuperacionPaso] = useState(0);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { correo, contrasena } = formData;
    if (correo === "admin@riesgos.com" && contrasena === "123456") {
      onLogin();
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  const handleBack = () => {
    if (onBack) onBack();
    else window.location.href = "/";
  };

  const handleRecuperacion = (e) => {
    e.preventDefault();
    if (formData.correo.trim() === "") {
      setError("Ingresa tu correo electrónico");
      return;
    }
    setError("");
    setRecuperacionPaso(2);
  };

  const handleCodigo = (e) => {
    e.preventDefault();
    if (formData.codigo.trim() === "") {
      setError("Ingresa el código de verificación");
      return;
    }
    setError("");
    setRecuperacionPaso(3);
  };

  const handleNuevaPass = (e) => {
    e.preventDefault();
    const { nuevaPass, confirmPass } = formData;
    if (nuevaPass.trim() === "" || confirmPass.trim() === "" || nuevaPass !== confirmPass) {
      setError("Las contraseñas no coinciden o están vacías");
      return;
    }
    setError("");
    setRecuperacionPaso(4);
    setTimeout(() => window.location.href = "/", 2000);
  };

  if (mostrarRegistro) {
    return <Registro onVolverLogin={() => setMostrarRegistro(false)} />;
  }

  if (recuperacionPaso === 4) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
        <Card>
          <h1 className="text-2xl font-bold mb-4">Cambio de contraseña exitoso</h1>
          <FontAwesomeIcon icon={faCheckCircle} className="text-6xl text-pink-500" />
        </Card>
      </div>
    );
  }

  const renderContent = () => {
    switch (recuperacionPaso) {
      case 1:
        return (
          <>
            <h1 className="text-2xl font-bold mb-2 text-center">Recuperar cuenta</h1>
            <p className="text-sm text-center mb-4">Ingresa tu correo electrónico</p>
            <form onSubmit={handleRecuperacion} className="flex flex-col gap-4">
              <Input type="email" placeholder="Correo" name="correo" value={formData.correo} onChange={handleChange} />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Botones type="submit">Siguiente</Botones>
            </form>
          </>
        );
      case 2:
        return (
          <>
            <h1 className="text-2xl font-bold mb-2 text-center">Verificación</h1>
            <p className="text-sm text-green-400 text-center mb-2">Código enviado a tu correo</p>
            <form onSubmit={handleCodigo} className="flex flex-col gap-4">
              <Input type="text" placeholder="Código de verificación" name="codigo" value={formData.codigo} onChange={handleChange} />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Botones type="submit">Siguiente</Botones>
            </form>
          </>
        );
      case 3:
        return (
          <>
            <h1 className="text-2xl font-bold mb-2 text-center">Nueva contraseña</h1>
            <ul className="text-sm list-disc list-inside mb-2">
              <li>Al menos una mayúscula A-Z</li>
              <li>Al menos un número 0-9</li>
            </ul>
            <form onSubmit={handleNuevaPass} className="flex flex-col gap-4">
              <Input type="password" placeholder="Nueva contraseña" name="nuevaPass" value={formData.nuevaPass} onChange={handleChange} />
              <Input type="password" placeholder="Confirmar nueva contraseña" name="confirmPass" value={formData.confirmPass} onChange={handleChange} />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Botones type="submit">Cambiar contraseña</Botones>
            </form>
          </>
        );
      default:
        return (
          <>
            <h1 className="text-3xl font-bold mb-2 text-center">Iniciar sesión</h1>
            <p className="text-sm text-center mb-6">para continuar a Riesgos Ec.</p>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <Input type="email" placeholder="Correo" name="correo" value={formData.correo} onChange={handleChange} />
              <Input type="password" placeholder="Contraseña" name="contrasena" value={formData.contrasena} onChange={handleChange} />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Botones type="submit">Ingresar</Botones>
            </form>
            <div className="mt-4 text-center text-sm">
              <p>
                ¿No tienes cuenta?{" "}
                <span className="cursor-pointer text-pink-400 hover:underline" onClick={() => setMostrarRegistro(true)}>
                  Registrarse
                </span>
              </p>
              <p className="mt-2">
                <span className="cursor-pointer text-pink-400 hover:underline" onClick={() => setRecuperacionPaso(1)}>
                  ¿Olvidaste tu contraseña?
                </span>
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <Card>
        <button
          onClick={() => (recuperacionPaso === 0 ? handleBack() : setRecuperacionPaso(0))}
          className="text-white text-xl mb-4 hover:text-pink-400 transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {renderContent()}
      </Card>
    </div>
  );
};

export default Login;
