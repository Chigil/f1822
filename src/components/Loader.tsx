import React from "react";

const Loader = () => {
  return (
    <div className="d-flex h-100 w-100 justify-content-center align-items-center">
      <div
        className="spinner-border"
        style={{ width: "6rem", height: "6rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
