import React from "react";

import "./styles.scss";
const MenuItemCard = ({ item }) => {
  return (
    <div className="card">
      <div className="card-contents">
        <div className="card-image">
          <img src={item.image} alt={item.name} />
        </div>
        <div className="card-description">
          <h2>{item.name}</h2>
          <p>{item.description}</p>

          <div className="card-price-calories">
            <p>{item.calories} calories</p>
            <p>$ {item.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
