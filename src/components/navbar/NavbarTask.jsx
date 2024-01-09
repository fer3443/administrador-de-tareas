import React from "react";
import { Link } from "react-router-dom";
export const NavbarTask = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/profile"}>Mi perfil</Link>
        </li>
        <li>
          <Link to={"/home"}>Inicio</Link>
        </li>
      </ul>
      <div className="btn-log-out">
        <button>cerrar sesion</button>
      </div>
    </nav>
  );
};
