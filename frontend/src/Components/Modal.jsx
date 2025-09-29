import React from "react";

const Modal = ({ Message, bgColor }) => {
  return (
    <div
      className={`bg-${bgColor} text-richBlack fixed bottom-4 right-4 p-4 rounded z-10 shadow`}
    >
      <p>{Message}</p>
    </div>
  );
};

export default Modal;
