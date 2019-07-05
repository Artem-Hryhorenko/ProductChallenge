import React from "react";

const Toast = msg => {
  return (
    <div className="d-flex justify-content-center bg-success">
      <span className="display-3">{msg}</span>
    </div>
  );
};

export default Toast;
