import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Registro from "../Register/Registro";
import Input from "../UI/Input";
import Botones from "../UI/Botones";
import Card from "../UI/Card";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

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

  useEffect(() => {
    fetch("http://localhost:8000/api/csrf/", {
      credentials: "include",
    });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleBack = () => {
    if (recuperacionPaso > 0) {
      setRecuperacionPaso(0);
    } else if (onBack) {
      onBack();
    } else {
      window.location.href = "/";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { correo, contrasena } = formData;

    try {
      const csrftoken = getCookie("csrftoken");
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        credentials: "include",
        body: JSON.stringify({ email: correo, password: contrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin();
      } else {
        setError(data.error || "Credenciales inválidas");
      }
    } catch (error) {
      setError("Error de conexión con el servidor");
    }
  };

  const handleRecuperacion = async (e) => {
    e.preventDefault();
    if (formData.correo.trim() === "") {
      setError("Ingresa tu correo electrónico");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/solicitar-reset/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.correo }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setRecuperacionPaso(2);
      } else {
        setError(data.error || "No se pudo enviar el código");
      }
    } catch (error) {
      setError("Error de conexión con el servidor");
    }
  };

  const handleCodigo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/verificar-codigo/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.correo,
            code: formData.codigo,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setRecuperacionPaso(3);
      } else {
        setError(data.error || "Código incorrecto");
      }
    } catch (error) {
      setError("Error de conexión con el servidor");
    }
  };

  const handleNuevaPass = async (e) => {
    e.preventDefault();
    const { nuevaPass, confirmPass, correo } = formData;
    if (!nuevaPass || !confirmPass || nuevaPass !== confirmPass) {
      setError("Las contraseñas no coinciden o están vacías");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/nueva-contrasena/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: correo, password: nuevaPass }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setRecuperacionPaso(4);
        setTimeout(() => (window.location.href = "/"), 2000);
      } else {
        setError(data.error || "Error al actualizar la contraseña");
      }
    } catch (error) {
      setError("Error de conexión con el servidor");
    }
  };

  if (mostrarRegistro) {
    return <Registro onVolverLogin={() => setMostrarRegistro(false)} />;
  }

  if (recuperacionPaso === 4) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
        <Card>
          <h1 className="text-2xl font-bold mb-4">
            Cambio de contraseña exitoso
          </h1>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-6xl text-pink-500"
          />
        </Card>
      </div>
    );
  }

  const renderContent = () => {
    switch (recuperacionPaso) {
      case 1:
        return (
          <>
            <h1 className="text-2xl font-bold mb-2 text-center">
              Recuperar cuenta
            </h1>
            <p className="text-sm text-center mb-4">
              Ingresa tu correo electrónico
            </p>
            <form onSubmit={handleRecuperacion} className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="Correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
              />
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <Botones type="submit">Siguiente</Botones>
            </form>
          </>
        );
      case 2:
        return (
          <>
            <h1 className="text-2xl font-bold mb-2 text-center">
              Verificación
            </h1>
            <p className="text-sm text-green-400 text-center mb-2">
              Código enviado a tu correo
            </p>
            <form onSubmit={handleCodigo} className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Código de verificación"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
              />
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <Botones type="submit">Siguiente</Botones>
            </form>
          </>
        );
      case 3:
        return (
          <>
            <h1 className="text-2xl font-bold mb-2 text-center">
              Nueva contraseña
            </h1>
            <ul className="text-sm list-disc list-inside mb-2">
              <li>Al menos una mayúscula A-Z</li>
              <li>Al menos un número 0-9</li>
            </ul>
            <form onSubmit={handleNuevaPass} className="flex flex-col gap-4">
              <Input
                type="password"
                placeholder="Nueva contraseña"
                name="nuevaPass"
                value={formData.nuevaPass}
                onChange={handleChange}
              />
              <Input
                type="password"
                placeholder="Confirmar nueva contraseña"
                name="confirmPass"
                value={formData.confirmPass}
                onChange={handleChange}
              />
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <Botones type="submit">Cambiar contraseña</Botones>
            </form>
          </>
        );
      default:
        return (
          <>
            <h1 className="text-3xl font-bold mb-2 text-center">
              Iniciar sesión
            </h1>
            <p className="text-sm text-center mb-6">
              para continuar a Riesgos Ec.
            </p>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="Correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
              />
              <Input
                type="password"
                placeholder="Contraseña"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
              />
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <Botones type="submit">Ingresar</Botones>
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
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <Card>
        <button
          onClick={handleBack}
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
