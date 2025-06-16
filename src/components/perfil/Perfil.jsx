import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../UI/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// Función para obtener el token CSRF de las cookies
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

const Perfil = ({ onBack, onPerfilActualizado }) => {
  const [datos, setDatos] = useState({
    first_name: "",
    last_name: "",
    calle: "",
    fecha_nac: "",
    email: "",
    password: "",
    foto: null,
    foto_url: "",
  });

  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/csrf/", { withCredentials: true });

    axios
      .get("http://localhost:8000/api/perfil/", { withCredentials: true })
      .then((res) => {
        setDatos((prev) => ({
          ...prev,
          ...res.data,
          foto_url: res.data.foto,
        }));
      })
      .catch((err) => {
        console.error("Error al obtener perfil:", err);
        alert("No se pudo cargar el perfil");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setDatos((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in datos) {
      if (key !== "foto_url" && datos[key] !== null && datos[key] !== "") {
        formData.append(key, datos[key]);
      }
    }

    try {
      await axios.put("http://localhost:8000/api/perfil/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        withCredentials: true,
      });

      alert("Perfil actualizado correctamente");
      setModoEdicion(false);

      if (typeof onPerfilActualizado === "function") {
        onPerfilActualizado(); // ✅ notifica al App que refresque avatar
      }
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      alert("Error al actualizar el perfil");
    }
  };

  const urlImagen = datos.foto_url
    ? datos.foto_url.startsWith("http")
      ? datos.foto_url
      : `http://localhost:8000${datos.foto_url}`
    : "/default-avatar.png";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <Card maxWidth="max-w-2xl">
        <button
          onClick={onBack}
          className="text-white text-xl mb-4 hover:text-pink-400 transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center justify-center mb-6">
            <img
              src={urlImagen}
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full object-cover border border-gray-300 mb-2"
            />
            <h2 className="text-xl font-semibold">
              {datos.first_name} {datos.last_name}
            </h2>
            <p className="text-sm text-gray-400">{datos.email}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-1">Nombre:</label>
              <input
                name="first_name"
                value={datos.first_name}
                onChange={handleChange}
                readOnly={!modoEdicion}
                className={`w-full p-2 rounded border ${
                  modoEdicion
                    ? "bg-white text-black"
                    : "bg-gray-100 text-gray-500"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Apellido:</label>
              <input
                name="last_name"
                value={datos.last_name}
                onChange={handleChange}
                readOnly={!modoEdicion}
                className={`w-full p-2 rounded border ${
                  modoEdicion
                    ? "bg-white text-black"
                    : "bg-gray-100 text-gray-500"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Calle:</label>
              <input
                name="calle"
                value={datos.calle}
                onChange={handleChange}
                readOnly={!modoEdicion}
                className={`w-full p-2 rounded border ${
                  modoEdicion
                    ? "bg-white text-black"
                    : "bg-gray-100 text-gray-500"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Fecha de Nacimiento:</label>
              <input
                type="date"
                name="fecha_nac"
                value={datos.fecha_nac}
                onChange={handleChange}
                disabled={!modoEdicion}
                className={`w-full p-2 rounded border ${
                  modoEdicion
                    ? "bg-white text-black"
                    : "bg-gray-100 text-gray-500"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Correo electrónico:</label>
              <input
                type="email"
                name="email"
                value={datos.email}
                onChange={handleChange}
                readOnly={!modoEdicion}
                className={`w-full p-2 rounded border ${
                  modoEdicion
                    ? "bg-white text-black"
                    : "bg-gray-100 text-gray-500"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Nueva contraseña:</label>
              <input
                type="password"
                name="password"
                value={datos.password}
                onChange={handleChange}
                readOnly={!modoEdicion}
                className={`w-full p-2 rounded border ${
                  modoEdicion
                    ? "bg-white text-black"
                    : "bg-gray-100 text-gray-500"
                }`}
              />
            </div>
          </div>

          {modoEdicion && (
            <>
              <div>
                <label className="block text-sm mb-1">Foto de perfil:</label>
                <input
                  type="file"
                  name="foto"
                  accept="image/*"
                  onChange={handleChange}
                  className="text-white"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Guardar Cambios
                </button>
              </div>
            </>
          )}

          {!modoEdicion && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setModoEdicion(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Editar
              </button>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};

export default Perfil;
