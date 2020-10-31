import React, { useState } from "react";

const CustomModal = ({ children, title }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <button onClick={() => setOpenModal(true)}>{title}</button>
      <div className="custom-modal" style={{ display: openModal ? "block" : "none" }}>
        <div className="modal-content">
          <span onClick={() => setOpenModal(false)}>X</span>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
