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
      className="bg-[#16213E] px-4 py-2 relative"
      style={{ position: "relative" }}
    >
      <div className="container-fluid flex items-center">
        {/* Branding a la izquierda */}
        <div className="navbar-brand d-flex align-items-center">
          <span className="ms-2 fs-4 fw-bold text-white flex items-center gap-2 text-xl font-bold">
            <i className="fas fa-shield-alt"></i> RIESGOSEC
          </span>
        </div>

        {/* Icono perfil alineado a la derecha */}
        <div
          className="user-profile ml-auto relative"
          ref={menuRef}
        >
          <button
            onClick={() => setMenuVisible(!menuVisible)}
            className="bg-transparent border-none cursor-pointer text-white text-2xl"
            aria-label="Menú usuario"
          >
            <FontAwesomeIcon icon={faUser} />
          </button>

          {menuVisible && (
            <div
              className="absolute right-0 top-full bg-white rounded-md shadow-lg min-w-[160px] z-50 p-1.5"
              style={{ transformOrigin: "top right" }}
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
