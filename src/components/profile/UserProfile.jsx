import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { NavbarTask } from "../navbar/NavbarTask";
import { DeletedTask } from "../deletedTask/DeletedTask";
import "../profile/UserProfile.css";
import { TaskToUpdate } from "../updateTask/TaskToUpdate";

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
              <img className="img-profile" src={user.avatar} alt="imagen de perfil" />
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
        <DeletedTask/>
      </main>
    </>
  );
};
