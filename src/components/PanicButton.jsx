export default function PanicButton({ onClick }) {
  return (
    <button id="panicButton" onClick={onClick} title="Botón de Pánico">
      <i className="fas fa-exclamation-circle"></i>
    </button>
  );
}
