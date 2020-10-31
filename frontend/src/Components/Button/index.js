import React from "react";
import "./styles.scss";

const Button = ({ type, handleClick, children }) => {
  return (
    <button type={type} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
