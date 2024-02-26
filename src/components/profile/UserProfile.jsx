import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { NavbarTask } from "../navbar/NavbarTask";
import { DeletedTask } from "../deletedTask/DeletedTask";
import { UserToUpdate } from "../updateUser/UserToUpdate";
import { useReadUserData } from "../../hooks/useReadUserData";
import { ReadUserById } from "../../service/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import "../profile/UserProfile.css";
export const UserProfile = () => {
  const {
    reload,
    setReload,
  } = useContext(UserContext);
  const { data } = useReadUserData(
    reload,
    setReload
  );
  const formatDate = (fecha) => {
    const formattedDate = new Date(fecha).toLocaleString().split(",")[0];
    return formattedDate;
  };
  const [show, setShow] = useState(false)
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
            <div className="box-name-edit">
              <h3>{data.name}</h3>
              <button title="Editar" onClick={()=>setShow(true)}>
                <FontAwesomeIcon icon={faPen} />
              </button>
            </div>
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
        <UserToUpdate show={show} setShow={setShow}/>
      </main>
    </>
  );
};
