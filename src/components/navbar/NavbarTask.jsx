import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import '../navbar/NavbarTask.css'
import { Notification } from "../../service/ToastNotification";
export const NavbarTask = () => {
  const { userData ,setUserData} = useContext(UserContext)
  const [ showMenu, setShowMenu ] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const logOut = () => {//ver cuando no hay localStorage
    if(localStorage){
      localStorage.removeItem('loginData')
    setUserData({
      ...userData,
      isLogged: false
    })
    }else{
      setUserData({
        dataLogin: null,
        isLogged: false,
        allowLS: false
      })
    }
    Notification({
      message: 'Cierre de sesion exitoso',
      type: 'success'
    })
  }
  return (
    <header className="header">
      <nav className="nav">
      <span className="brand">Administrador de tareas</span>
        <div className={showMenu ? "nav-menu showMenu" : "nav-menu"}>
          <ul className="nav-list">
            <li>
              <Link to={"/home"} className="nav-item">
                Inicio
              </Link>
            </li>
            <li>
              <Link to={"/profile"} className="nav-item">
                Mi perfil
              </Link>
            </li>
          <button className="btn-log-out" onClick={logOut}>cerrar sesion</button>
          </ul>
          <FontAwesomeIcon icon={faCaretUp} className="nav-close" onClick={toggleMenu}/>
        </div>
        <FontAwesomeIcon icon={faCaretDown} className="nav-open"  onClick={toggleMenu}/>
      </nav>
    </header>
  );
};
