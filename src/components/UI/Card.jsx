import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Card = ({ children, onBack, maxWidth = "max-w-md" }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className={`bg-[#0f1a33] text-white p-6 rounded-3xl w-[90%] ${maxWidth} shadow-xl`}>
        {onBack && (
          <button
            onClick={onBack}
            className="text-white text-xl mb-4 hover:text-pink-400 transition"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Card;
