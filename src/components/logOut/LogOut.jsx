import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Notification } from "../../service/ToastNotification";
import '../navbar/NavbarTask.css'
export const LogOut = () => {
  const { userData, setUserData } = useContext(UserContext);
  const handleLogOut = () => {
    //ver cuando no hay localStorage
    const hasLocalStorage = localStorage.getItem("loginData");
    if (hasLocalStorage !== null) {
      localStorage.removeItem("loginData");
      setUserData({
        ...userData,
        isLogged: false,
      });
    } else {
      setUserData({
        dataLogin: null,
        isLogged: false,
        allowLS: false,
      });
    }
    Notification({
      message: "Cierre de sesion exitoso",
      type: "success",
    });
  };
  return (
    <button onClick={handleLogOut} className="btn-log-out">
      cerrar sesión
    </button>
  );
};
