import React, { useState, useEffect } from "react";
import Card from "./Card"; // tu Card sin onBack ni botón flecha
import Botones from "../UI/Botones";

function PanicModal({ onReportSubmit }) {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // para mostrar mensaje éxito
  const [tipoIncidente, setTipoIncidente] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [file, setFile] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = () => {
    setShowModal(true);
    setError("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUbicacion({
            latitud: position.coords.latitude,
            longitud: position.coords.longitude,
          });
        },
        () => {
          setError("No se pudo obtener la ubicación.");
        }
      );
    } else {
      setError("Geolocalización no soportada por el navegador.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTipoIncidente("");
    setDescripcion("");
    setFile(null);
    setUbicacion(null);
    setError("");
    setIsSubmitting(false);
  };

  // Cuando showSuccess es true, desaparece el modal luego de 3 segundos
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        closeModal();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!tipoIncidente) {
      setError("Seleccione un tipo de incidente.");
      return;
    }

    if (!ubicacion) {
      setError("No se detectó la ubicación.");
      return;
    }

    const formData = new FormData();
    formData.append("tipo_incidente", tipoIncidente);
    formData.append("descripcion", descripcion);
    formData.append("latitud", ubicacion.latitud);
    formData.append("longitud", ubicacion.longitud);

    if (file) {
      formData.append("imagen", file);
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/api/reporte/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al enviar el reporte.");
      }

      const data = await response.json();
      onReportSubmit && onReportSubmit(data);
      // Mostrar mensaje de éxito en modal
      setShowSuccess(true);
      setIsSubmitting(false);
    } catch (err) {
      setError(err.message || "Ocurrió un error al enviar el reporte.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        id="panicButton"
        title="Botón de Pánico"
        onClick={openModal}
        className="btn btn-danger"
      >
        <i className="fas fa-exclamation-circle"></i>
      </button>
        
      {showModal && (
        <Card maxWidth="max-w-sm">
          {showSuccess ? (
            <div className="text-center text-white text-lg font-semibold py-8">
              Reporte enviado correctamente ✓ 
            </div>
          ) : (
            <>
              <h5 className="text-xl font-semibold mb-4 text-white">
                Reporte de Emergencia
              </h5>

              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="tipoIncidente"
                  className="block font-medium text-white"
                >
                  Tipo de incidente:
                </label>
                <select
                  id="tipoIncidente"
                  className="form-select w-full mb-3"
                  value={tipoIncidente}
                  onChange={(e) => setTipoIncidente(e.target.value)}
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="Robo">Robo</option>
                  <option value="Homicidio">Homicidio</option>
                  <option value="Extorsion">Extorsion</option>
                  <option value="Secuestro">Secuestro</option>
                </select>

                <label
                  htmlFor="panicDesc"
                  className="block font-medium mt-2 text-white"
                >
                  Descripción del incidente (opcional):
                </label>
                <textarea
                  id="panicDesc"
                  rows="3"
                  placeholder="Ej: Persona sospechosa rondando la zona..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full p-2 rounded-md bg-gray-200 text-gray-900 placeholder-gray-500"
                ></textarea>

                <label
                  htmlFor="panicFiles"
                  className="block font-medium mt-2 text-white"
                >
                  Subir imagen (opcional):
                </label>
                <input
                  type="file"
                  id="panicFiles"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full p-2 rounded-md bg-gray-200 text-gray-900 placeholder-gray-500"
                />

                <div className="flex justify-end gap-3 mt-4">
                  <Botones
                    type="button"
                    onClick={closeModal}
                    disabled={isSubmitting}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </Botones>
                  <Botones
                    type="submit"
                    disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar"}
                  </Botones>
                </div>
              </form>
            </>
          )}
        </Card>
      )}
    </>
  );
}

export default PanicModal;
