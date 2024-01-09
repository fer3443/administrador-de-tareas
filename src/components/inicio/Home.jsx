import React from "react";
import "../inicio/Home.css";
import { Link } from "react-router-dom";
import { NavbarTask } from "../navbar/NavbarTask";
export const Home = () => {
  return (
    <header>
      <h1>Bienvenido a su administrador de tareas!</h1>
      <NavbarTask/>
    </header>
  );
};
