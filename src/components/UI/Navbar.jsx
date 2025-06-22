// Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import UserMenu from "../menu/userMenu";
import axios from "axios";

function Navbar({
  onLogout,
  isLoggedIn,
  onLoginClick,
  onProfileClick,
  refreshFoto,
}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [fotoUrl, setFotoUrl] = useState("/1177568.png"); // imagen default
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

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get("http://localhost:8000/api/perfil/", { withCredentials: true })
        .then((res) => {
          const urlCompleta = res.data.foto
            ? res.data.foto.startsWith("http")
              ? res.data.foto + "?t=" + new Date().getTime()
              : `http://localhost:8000${
                  res.data.foto
                }?t=${new Date().getTime()}`
            : "/1177568.png";
          setFotoUrl(urlCompleta);
        })
        .catch((err) => {
          console.error("Error al obtener imagen de perfil:", err);
          setFotoUrl("/1177568.png");
        });
    } else {
      setFotoUrl("/1177568.png");
    }
  }, [isLoggedIn, refreshFoto]);

  return (
    <nav className="bg-[#16213E] px-4 py-2 relative">
      <div className="container-fluid flex items-center justify-between">
        <div className="navbar-brand d-flex align-items-center">
          <span className="ms-2 fs-4 fw-bold text-white flex items-center gap-2 text-xl font-bold">
            <i className="fas fa-shield-alt"></i> RIESGOSEC
          </span>
        </div>

        <div className="user-profile relative" ref={menuRef}>
          <button
            onClick={() => setMenuVisible(!menuVisible)}
            className="flex items-center gap-2 bg-transparent border-none cursor-pointer text-white"
            aria-label="Menú usuario"
          >
            <img
              src={fotoUrl}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover border"
            />
          </button>

          {menuVisible && (
            <div className="absolute right-0 top-full bg-white rounded-md shadow-lg min-w-[160px] z-50 p-1.5">
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

