import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-container"
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        id="modal-content"
        className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
