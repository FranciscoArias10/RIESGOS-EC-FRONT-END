import React from "react";
import "./userMenu.css";

const UserMenu = ({ isLoggedIn, onLoginClick, onLogoutClick, onProfileClick }) => {
  return (
    <div className="user-menu">
      {!isLoggedIn ? (
        <button className="user-menu-btn" onClick={onLoginClick}>
          Iniciar Sesión
        </button>
      ) : (
        <>
          <button className="user-menu-btn" onClick={onProfileClick}>
            Ver Perfil
          </button>
          <button className="user-menu-btn logout" onClick={onLogoutClick}>
            Cerrar Sesión
          </button>
        </>
      )}
    </div>
  );
};

export default UserMenu;
