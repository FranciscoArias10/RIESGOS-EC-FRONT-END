import React from "react";

const UserMenu = ({ isLoggedIn, onLoginClick, onLogoutClick, onProfileClick }) => {
  return (
    <div className="flex flex-col gap-1 p-2 bg-gray-100 rounded-md w-full box-border">
      {!isLoggedIn ? (
        <button
          className="bg-none border-none px-3 py-2 w-full text-left cursor-pointer font-semibold text-base text-gray-800 rounded-sm
                     transition-colors duration-200 hover:bg-[#0F3460] hover:text-white"
          onClick={onLoginClick}
        >
          Iniciar Sesión
        </button>
      ) : (
        <>
          <button
            className="bg-none border-none px-3 py-2 w-full text-left cursor-pointer font-semibold text-base text-gray-800 rounded-sm
                       transition-colors duration-200 hover:bg-[#0F3460] hover:text-white"
            onClick={onProfileClick}
          >
            Ver Perfil
          </button>
          <button
            className="bg-none border-none px-3 py-2 w-full text-left cursor-pointer font-semibold text-base text-red-600 rounded-sm
                       transition-colors duration-200 hover:bg-[#c82333] hover:text-white"
            onClick={onLogoutClick}
          >
            Cerrar Sesión
          </button>
        </>
      )}
    </div>
  );
};

export default UserMenu;
