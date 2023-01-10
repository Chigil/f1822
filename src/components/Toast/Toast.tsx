import React, { useRef } from "react";
import "./Toast.css";

const Toast = ({
                 data,
                 deleteToast,
                 id,
               }: {
  data: any;
  deleteToast: (id: number) => void;
  id: number;
}) => {
  const removeToast = (id: number) => {
    if (that && that.current) {
      that.current.classList.add("toast-up-fade-out");
      that.current.ontransitionend = (event) => {
        if (event.propertyName === "transform") {
          deleteToast(id);
          if (that && that.current)
            that.current.classList.remove("toast-up-fade-out");
        }
      };
    }
  };
  const that = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={that}
      className={`toast-up alert alert-${
        data.type === "error" ? "danger" : data.type
      }`}
      style={{
        fontSize: data.fontSize,
        padding: data.fontSize,
      }}
    >
      {data.message}
      <button
        type="button"
        className="btn btn-close ms-2"
        aria-label="Close"
        onClick={(event) => removeToast(id)}
      ></button>
    </div>
  );
};

export default Toast;