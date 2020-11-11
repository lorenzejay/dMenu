import React from "react";
import "./styles.scss";

const Form = ({ title, children, handleSubmit }) => {
  return (
    <form className="form-default" onSubmit={handleSubmit}>
      <h1>{title}</h1>
      {children}
    </form>
  );
};

export default Form;
