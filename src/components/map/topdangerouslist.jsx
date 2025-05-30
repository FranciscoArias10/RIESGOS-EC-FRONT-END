import React from "react";

function topdangerouslist({ streets, onStreetSelect, timeOfDay }) {
  const getDangerClass = (risk) => {
    if (risk >= 70) return "danger-high";
    if (risk >= 50) return "danger-medium";
    return "danger-low";
  };

  return (
    <div className="top-street-container">
      {streets.map((street, index) => (
        <div
          key={index}
          className="street-item"
          onClick={() => onStreetSelect(street)}
        >
          <div className="street-info-container">
            <span className="rank-num">{index + 1}</span>
            <span className="street-name">{street.name}</span>
          </div>
          <span
            className={`street-percentage danger-badge ${getDangerClass(
              street.risk
            )}`}
          >
            {street.risk}%
          </span>
        </div>
      ))}
    </div>
  );
}

export default topdangerouslist;
