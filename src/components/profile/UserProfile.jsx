import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { NavbarTask } from "../navbar/NavbarTask";
import { DeletedTask } from "../deletedTask/DeletedTask";
import { UserToUpdate } from "../updateUser/UserToUpdate";
import "../profile/UserProfile.css";
import { useReadUserData } from "../../hooks/useReadUserData";
import { ReadUserById } from "../../service/api";
export const UserProfile = () => {
  const {
    userData: { dataLogin },
    reload,
    setReload,
  } = useContext(UserContext);
  const {data} = useReadUserData(ReadUserById, dataLogin.token, reload, setReload)
  const formatDate = (fecha) => {
    const formattedDate = new Date(fecha).toLocaleString().split(",")[0];
    return formattedDate;
  };

  return (
    <>
      <main>
        <NavbarTask />
        <section className="section-profile section">
          <div className="container-profile container grid">
            <div className="box-image-profile">
              <img
                className="img-profile"
                src={data.avatar}
                alt="imagen de perfil"
              />
            </div>
            <h3>{data.name}</h3>
            <article className="profile-info">
              <h5>Info del perfil</h5>
              <hr />
              <p>Fecha de creación: {formatDate(data.createdAt)}</p>
              <p>Ultima actualización: {formatDate(data.updatedAt)}</p>
              <p>Nombre de usuario: {data.userName}</p>
            </article>
          </div>
        </section>
        <DeletedTask />
        <UserToUpdate />
      </main>
    </>
  );
};
