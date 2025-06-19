import React from 'react'

export default function Botones({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={'submit'}
      onClick={onClick}
      className={`!rounded-sm bg-[#f43f5e] text-white font-semibold py-2 px-4 hover:bg-pink-600 transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}




