import React from "react";
import { toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Notification = ({ message, type }) => {
  const notify = () => {
    switch (type) {
      case "success":
        toast.success(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        break;
      case "error":
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        break;
      default:
        break
    }
  };
  return <>{notify()}</>
};
export { Notification };