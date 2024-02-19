import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { NavbarTask } from "../navbar/NavbarTask";
import { DeletedTask } from "../deletedTask/DeletedTask";
import { UserToUpdate } from "../updateUser/UserToUpdate";
import "../profile/UserProfile.css";
import { ReadUserById } from "../../service/api";
export const UserProfile = () => {
  const {
    userData: { dataLogin },
    reload,
    setReload,
  } = useContext(UserContext);
  const [user, setUser] = useState([]);
  const formatDate = (fecha) => {
    const formattedDate = new Date(fecha).toLocaleString().split(",")[0];
    return formattedDate;
  };
  useEffect(() => {
    ReadUserById({
      token: dataLogin.token,
    })
      .then(({ readedUser }) => {
        setUser(readedUser);
        setReload(false);
        console.log(readedUser)
      })
      .catch((err) => console.log(err));
  }, [reload]);

  return (
    <>
      <main>
        <NavbarTask />
        <section className="section-profile section">
          <div className="container-profile container grid">
            <div className="box-image-profile">
              <img
                className="img-profile"
                src={user.avatar}
                alt="imagen de perfil"
              />
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
        <DeletedTask />
        <UserToUpdate />
      </main>
    </>
  );
};
