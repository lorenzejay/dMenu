import React from "react";
import "./styles.scss";

const Input = ({ type, placeholder, name, handleChange, value, ...additionalData }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={handleChange}
      value={value}
    />
  );
};

export default Input;
