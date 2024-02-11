import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { LogOut } from "../logOut/LogOut";
import '../navbar/NavbarTask.css'
export const NavbarTask = () => {
  const [ showMenu, setShowMenu ] = useState(false);
  // const logOut = useLogOut()
  const toggleMenu = () => {
    setShowMenu(!showMenu)
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
          <LogOut/>
          </ul>
          <FontAwesomeIcon icon={faCaretUp} className="nav-close" onClick={toggleMenu}/>
        </div>
        <FontAwesomeIcon icon={faCaretDown} className="nav-open"  onClick={toggleMenu}/>
      </nav>
    </header>
  );
};
