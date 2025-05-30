import React, { useState } from "react";

function panicmodal({ onReportSubmit }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = () => {
    setShowModal(true);
    setError("");
  };

  const closeModal = () => {
    setShowModal(false);
    setTitle("");
    setDescription("");
    setFiles([]);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validación del lado del cliente
    if (!title.trim() || !description.trim()) {
      setError(
        "Por favor ingrese tanto el título como la descripción del reporte."
      );
      return;
    }

    if (title.trim().length < 5) {
      setError("El título debe tener al menos 5 caracteres.");
      return;
    }

    if (description.trim().length < 10) {
      setError("La descripción debe tener al menos 10 caracteres.");
      return;
    }

    // Confirmación
    if (!window.confirm("¿Está seguro de enviar este reporte de emergencia?")) {
      return;
    }

    // Preparar los datos del formulario
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    for (let i = 0; i < files.length; i++) {
      formData.append("media", files[i]);
    }

    setIsSubmitting(true);

    // Simulando envío AJAX
    // En un caso real, usaríamos fetch o axios para enviar los datos
    setTimeout(() => {
      // Simular una respuesta exitosa
      const newRisk = Math.floor(Math.random() * 20) + 80; // Riesgo alto (80-100)
      onReportSubmit(newRisk);

      alert("Reporte enviado con éxito. Nivel de peligro actualizado.");
      closeModal();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      {/* Botón de Pánico */}
      <button id="panicButton" title="Botón de Pánico" onClick={openModal}>
        <i className="fas fa-exclamation-circle"></i>
      </button>

      {/* Modal de Pánico */}
      {showModal && (
        <div id="panicModal" style={{ display: "flex" }}>
          <div className="modal-content">
            <h5>Reporte de Emergencia</h5>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="panicTitle"
                placeholder="Título del reporte"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <textarea
                id="panicDesc"
                rows="3"
                placeholder="Descripción del incidente"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>

              <input
                type="file"
                id="panicFiles"
                className="file-input"
                accept="image/*,video/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
              />

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  id="panicCancel"
                  className="btn btn-secondary btn-sm"
                  onClick={closeModal}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  id="panicSubmit"
                  className="btn btn-danger btn-sm ms-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default panicmodal;
