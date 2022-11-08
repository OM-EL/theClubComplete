import React from "react";
import superEth from "../assets/supereth.png";
import "../scss/components/_advantageCard.scss"

const AdvantageCard = ({ image, title}) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt="super" />
      </div>
      <div className="card-content">
        <div className="card-details">
          <h4 className="card-title">{title}</h4>
        </div>
      </div>
    </div>
  );
};

export default AdvantageCard;
