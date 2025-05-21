import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-brand d-flex align-items-center">
          <span className="ms-2 fs-4 fw-bold" style={{ color: "white" }}>
            <i className="fas fa-map-marked-alt me-2"></i>
            Seguridad Vial Ecuador
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
