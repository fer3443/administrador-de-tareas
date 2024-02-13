import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { NavbarTask } from "../navbar/NavbarTask";
import { DeletedTask } from "../deletedTask/DeletedTask";
import "../profile/UserProfile.css";

export const UserProfile = () => {
  const {
    userData: { dataLogin: {user} },
  } = useContext(UserContext);
  const formatDate = (fecha) => {
    const formattedDate = new Date(fecha).toLocaleString().split(',')[0]
    return formattedDate
  }
  return (
    <>
      <main>
        <NavbarTask />
        <section className="section-profile section">
          <div className="container-profile container grid">
            <div className="box-image-profile">
              <img className="img-profile" src="https://cdn.playbuzz.com/cdn/913253cd-5a02-4bf2-83e1-18ff2cc7340f/c56157d5-5d8e-4826-89f9-361412275c35.jpg" alt="imagen de perfil" />
            </div>
            <h3>{user.name}</h3>
            <article className="profile-info">
              <h5>Info del perfil</h5>
              <hr />
              <p>Fecha de creación: {formatDate(user.createdAt)}</p>
              <p>Ultima actualización: {formatDate(user.updatedAt)}</p>
              <p>Nombre de usuario: {user.userName}</p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
};
