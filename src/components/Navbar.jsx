import React, { useState, useRef, useEffect } from "react";
import UserMenu from "./menu/UserMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar({ onLogout, isLoggedIn, onLoginClick, onProfileClick }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: "#16213E", // azul oscuro solicitado
        padding: "10px",
        position: "relative"
      }}
    >
      <div className="container-fluid d-flex align-items-center">
        {/* Branding a la izquierda */}
        <div className="navbar-brand d-flex align-items-center">
          <span className="ms-2 fs-4 fw-bold" style={{ color: "white" }}>
            <i className="fas fa-shield-alt me-2"></i>
            RIESGOSEC
          </span>
        </div>

        {/* Icono perfil alineado a la derecha */}
        <div
          className="user-profile ms-auto"
          ref={menuRef}
          style={{ position: "relative" }}
        >
          <button
            onClick={() => setMenuVisible(!menuVisible)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: "white",
              fontSize: "1.8rem"
            }}
            aria-label="Menú usuario"
          >
            <FontAwesomeIcon icon={faUser} />
          </button>

          {menuVisible && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "110%",
                backgroundColor: "white",
                borderRadius: "6px",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                minWidth: "160px",
                zIndex: 1500,
                padding: "0.5rem 0"
              }}
            >
              <UserMenu
                isLoggedIn={isLoggedIn}
                onLoginClick={() => {
                  setMenuVisible(false);
                  onLoginClick();
                }}
                onLogoutClick={() => {
                  setMenuVisible(false);
                  onLogout();
                }}
                onProfileClick={() => {
                  setMenuVisible(false);
                  onProfileClick();
                }}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
